import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const escapeHtml = (str: string) =>
  str.replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;')
     .replace(/'/g, '&#039;');

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, pdfUrl, pdfTitle } = await req.json();

    // Input validation
    if (!name || typeof name !== 'string' || name.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Invalid name' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!email || typeof email !== 'string' || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!pdfTitle || typeof pdfTitle !== 'string' || pdfTitle.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Invalid PDF title' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!pdfUrl || typeof pdfUrl !== 'string' || pdfUrl.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Invalid PDF URL' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    // Validate URL format and restrict to known domains
    try {
      const url = new URL(pdfUrl);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return new Response(
        JSON.stringify({ error: 'PDF URL must be a valid HTTP/HTTPS URL' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const safeName = escapeHtml(name);
    const safePdfTitle = escapeHtml(pdfTitle);
    const safePdfUrl = escapeHtml(pdfUrl);

    console.log("Sending PDF email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Your Company <onboarding@resend.dev>",
      to: [email],
      subject: `Here's your free eBook: ${safePdfTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Hi ${safeName}!</h1>
          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for downloading <strong>${safePdfTitle}</strong>! We're excited to share this with you.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            Click the button below to download your free eBook:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${safePdfUrl}" 
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
            &copy; ${new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-pdf-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
