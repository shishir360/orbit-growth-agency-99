import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendInvoiceRequest {
  invoiceId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { invoiceId }: SendInvoiceRequest = await req.json();

    console.log('Fetching invoice data for ID:', invoiceId);

    // Fetch invoice with client and items
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select(`
        *,
        clients (*)
      `)
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      console.error('Error fetching invoice:', invoiceError);
      throw new Error('Invoice not found');
    }

    const { data: items, error: itemsError } = await supabase
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('display_order');

    if (itemsError) {
      console.error('Error fetching invoice items:', itemsError);
      throw itemsError;
    }

    const { data: companyInfo } = await supabase
      .from('company_info')
      .select('*')
      .limit(1)
      .single();

    const client = invoice.clients;
    
    if (!client?.email) {
      throw new Error('Client email not found');
    }

    console.log('Sending invoice email to:', client.email);

    // Build invoice items HTML
    const itemsHtml = items?.map((item: any) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 0; text-align: left;">${item.description}</td>
        <td style="padding: 12px 0; text-align: right;">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right;">$${Number(item.unit_price).toFixed(2)}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: 600;">$${Number(item.amount).toFixed(2)}</td>
      </tr>
    `).join('') || '';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            ${companyInfo?.logo ? `<img src="${companyInfo.logo}" alt="${companyInfo.company_name}" style="height: 50px; margin-bottom: 20px;">` : ''}
            <h1 style="color: white; margin: 0; font-size: 28px;">Invoice ${invoice.invoice_number}</h1>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">
            <p style="color: #374151; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
              Dear ${client.name},
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Thank you for your business. Please find your invoice details below.
            </p>

            <!-- Invoice Summary -->
            <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
              <div style="margin-bottom: 12px;">
                <span style="color: #6b7280; font-size: 14px;">Invoice Number:</span>
                <span style="color: #111827; font-size: 14px; font-weight: 600; float: right;">${invoice.invoice_number}</span>
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: #6b7280; font-size: 14px;">Issue Date:</span>
                <span style="color: #111827; font-size: 14px; font-weight: 600; float: right;">${new Date(invoice.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: #6b7280; font-size: 14px;">Due Date:</span>
                <span style="color: #111827; font-size: 14px; font-weight: 600; float: right;">${new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div style="border-top: 2px solid #e5e7eb; margin-top: 15px; padding-top: 15px;">
                <span style="color: #111827; font-size: 18px; font-weight: 700;">Total Amount:</span>
                <span style="color: #667eea; font-size: 24px; font-weight: 700; float: right;">$${Number(invoice.total).toFixed(2)}</span>
              </div>
            </div>

            <!-- Invoice Items -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <thead>
                <tr style="border-bottom: 2px solid #111827;">
                  <th style="padding: 12px 0; text-align: left; font-size: 14px; font-weight: 600; color: #111827;">Description</th>
                  <th style="padding: 12px 0; text-align: right; font-size: 14px; font-weight: 600; color: #111827;">Qty</th>
                  <th style="padding: 12px 0; text-align: right; font-size: 14px; font-weight: 600; color: #111827;">Price</th>
                  <th style="padding: 12px 0; text-align: right; font-size: 14px; font-weight: 600; color: #111827;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Totals -->
            <div style="margin-left: auto; width: 300px; margin-bottom: 30px;">
              <div style="padding: 8px 0; display: flex; justify-content: space-between; font-size: 14px;">
                <span style="color: #6b7280;">Subtotal:</span>
                <span style="color: #111827; font-weight: 600;">$${Number(invoice.subtotal).toFixed(2)}</span>
              </div>
              <div style="padding: 8px 0; display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                <span style="color: #6b7280;">Tax (${invoice.tax_rate}%):</span>
                <span style="color: #111827; font-weight: 600;">$${Number(invoice.tax_amount).toFixed(2)}</span>
              </div>
              <div style="padding: 12px 0; display: flex; justify-content: space-between; font-size: 18px; border-bottom: 2px solid #111827;">
                <span style="color: #111827; font-weight: 700;">Total:</span>
                <span style="color: #667eea; font-weight: 700;">$${Number(invoice.total).toFixed(2)}</span>
              </div>
            </div>

            ${invoice.notes ? `
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 14px; font-weight: 600;">Notes:</h3>
                <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 20px; white-space: pre-wrap;">${invoice.notes}</p>
              </div>
            ` : ''}

            <p style="color: #374151; font-size: 14px; line-height: 22px; margin-bottom: 10px;">
              Payment Terms: ${invoice.payment_terms || 'Net 30'}
            </p>
            <p style="color: #6b7280; font-size: 14px; line-height: 22px;">
              If you have any questions about this invoice, please contact us.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              ${companyInfo?.company_name || 'Your Company'}
            </p>
            ${companyInfo?.email ? `<p style="color: #6b7280; font-size: 12px; margin: 5px 0;">${companyInfo.email}</p>` : ''}
            ${companyInfo?.phone ? `<p style="color: #6b7280; font-size: 12px; margin: 5px 0;">${companyInfo.phone}</p>` : ''}
            ${companyInfo?.website ? `<p style="color: #6b7280; font-size: 12px; margin: 5px 0;">${companyInfo.website}</p>` : ''}
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Invoice <onboarding@resend.dev>',
      to: [client.email],
      subject: `Invoice ${invoice.invoice_number} from ${companyInfo?.company_name || 'Your Company'}`,
      html: emailHtml,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Invoice email sent successfully',
      emailId: emailResponse.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-invoice-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
