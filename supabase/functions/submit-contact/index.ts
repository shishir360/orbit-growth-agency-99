import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { name, email, phone, company, message }: ContactRequest = await req.json();

    console.log("Received contact submission from:", email);

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Save to database
    const { data: submission, error: dbError } = await supabaseClient
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        company,
        message,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Contact submission saved:", submission.id);

    // Send email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            h1 { margin: 0; }
            h2 { color: #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
              
              <div class="info-box">
                <h2>Your Submission Details:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                <p><strong>Message:</strong><br>${message}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>

              <p>If you need immediate assistance, please don't hesitate to call us or send another message.</p>
              
              <p>Best regards,<br>Our Team</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [email],
      subject: "We Received Your Message - Thank You!",
      html: customerEmailHtml,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the request if email fails, just log it
    } else {
      console.log("Confirmation email sent to:", email);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully",
        submissionId: submission.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
