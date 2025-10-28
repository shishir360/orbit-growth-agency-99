import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paymentDetails, clientInfo } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }

    console.log('Generating invoice with AI...', { paymentDetails, clientInfo });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Invoice Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a professional invoice generator. Generate structured invoice data based on payment information provided. 
            Return ONLY valid JSON with this structure:
            {
              "items": [
                {
                  "description": "Service/Product description",
                  "quantity": 1,
                  "unit_price": 0,
                  "amount": 0
                }
              ],
              "notes": "Professional invoice notes",
              "payment_terms": "Net 30"
            }`
          },
          {
            role: 'user',
            content: `Generate invoice items from this payment information:
            Payment Details: ${paymentDetails}
            Client Info: ${JSON.stringify(clientInfo)}
            
            Please create appropriate line items with descriptions, quantities, and prices.`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI Response:', data);

    const aiContent = data.choices?.[0]?.message?.content;
    if (!aiContent) {
      throw new Error('No content in AI response');
    }

    // Extract JSON from the response
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    const invoiceData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiContent);

    return new Response(
      JSON.stringify(invoiceData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in generate-invoice-ai:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});