import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  name: string;
  email: string;
  pdfUrl: string;
  pdfTitle: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, pdfUrl, pdfTitle }: EmailRequest = await req.json();

    console.log("Sending PDF email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Your Company <onboarding@resend.dev>",
      to: [email],
      subject: `Here's your free eBook: ${pdfTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Hi ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for downloading <strong>${pdfTitle}</strong>! We're excited to share this with you.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            Click the button below to download your free eBook:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}" 
               style="background-color: #FFD84D; 
                      color: #000000; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      font-weight: bold; 
                      font-size: 18px;
                      display: inline-block;">
              Download Your Free eBook
            </a>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            We hate SPAM and promise to keep your email address safe.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-pdf-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
