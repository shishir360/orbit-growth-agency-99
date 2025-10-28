import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceRequest {
  paymentDetails: string;
  clientInfo?: {
    name?: string;
    email?: string;
    company?: string;
  };
}

const InvoiceRequestSchema = z.object({
  paymentDetails: z.string().trim().min(1, "Payment details required").max(2000, "Payment details too long"),
  clientInfo: z.object({
    name: z.string().max(100).optional(),
    email: z.string().email().max(255).optional(),
    company: z.string().max(100).optional(),
  }).optional()
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    
    // Validate input
    let validatedData: InvoiceRequest;
    try {
      validatedData = InvoiceRequestSchema.parse(requestBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ error: "Invalid input data", details: error.errors }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      throw error;
    }

    const { paymentDetails, clientInfo } = validatedData;
    
    // Sanitize payment details to prevent prompt injection
    const sanitizedDetails = paymentDetails
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .substring(0, 2000);
    
    console.log('Generating AI invoice with validated details');

    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const prompt = `Based on the following payment information, generate a detailed invoice structure.

Payment Details: ${sanitizedDetails}
${clientInfo ? `Client Info: ${JSON.stringify(clientInfo)}` : ''}

Please provide a JSON response with the following structure:
{
  "items": [
    {
      "description": "Service/Product description",
      "quantity": 1,
      "unit_price": 0.00,
      "amount": 0.00
    }
  ],
  "notes": "Additional notes or payment details",
  "payment_terms": "Net 30"
}

Extract all relevant details from the payment information provided. Be precise with amounts and descriptions.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-app.lovable.dev',
        'X-Title': 'Invoice Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional accounting assistant that helps generate accurate invoice details from payment information. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenRouter response received');
    
    const aiResponse = data.choices[0].message.content;
    
    // Extract JSON from the response (in case it's wrapped in markdown)
    let invoiceData;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        invoiceData = JSON.parse(jsonMatch[0]);
      } else {
        invoiceData = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Failed to parse AI response as JSON');
    }

    console.log('Generated invoice data:', invoiceData);

    return new Response(
      JSON.stringify(invoiceData),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Error in generate-invoice-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});