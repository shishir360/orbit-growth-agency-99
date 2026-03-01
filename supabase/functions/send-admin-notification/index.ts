import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "shishirmd681@gmail.com";

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

const VALID_TYPES = ['booking', 'contact'] as const;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    // Input validation
    if (!type || !VALID_TYPES.includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid notification type. Must be "booking" or "contact".' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!data || typeof data !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid data object' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and sanitize individual fields
    const safeData: Record<string, string> = {};
    const allowedFields = ['name', 'email', 'phone', 'date', 'time', 'meeting_platform', 'notes', 'source', 'message', 'company'];
    for (const field of allowedFields) {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] !== 'string' || data[field].length > 2000) {
          return new Response(
            JSON.stringify({ error: `Invalid ${field}` }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        safeData[field] = escapeHtml(data[field]);
      }
    }

    console.log(`Processing ${type} notification`);

    let emailSubject = "";
    let emailHtml = "";

    if (type === 'booking') {
      emailSubject = `🔔 নতুন বুকিং: ${safeData.name || 'Unknown'}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; }
              .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 40px 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .urgent-badge { background: #fecaca; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 20px; }
              .content { padding: 30px; }
              .info-box { background: #fef2f2; border-left: 5px solid #ef4444; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .info-item { margin: 12px 0; font-size: 16px; }
              .info-item strong { color: #991b1b; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="urgent-badge">🚨 জরুরি - নতুন বুকিং</div>
                <h1>নতুন অ্যাপার্টমেন্ট বুকিং রিকোয়েস্ট!</h1>
              </div>
              <div class="content">
                <div class="info-box">
                  <h2 style="color: #991b1b; margin-top: 0;">বুকিং বিস্তারিত:</h2>
                  <div class="info-item"><strong>👤 নাম:</strong> ${safeData.name || 'N/A'}</div>
                  <div class="info-item"><strong>📧 ইমেইল:</strong> ${safeData.email || 'N/A'}</div>
                  <div class="info-item"><strong>📱 ফোন:</strong> ${safeData.phone || 'N/A'}</div>
                  <div class="info-item"><strong>📅 তারিখ:</strong> ${safeData.date || 'N/A'}</div>
                  <div class="info-item"><strong>🕐 সময়:</strong> ${safeData.time || 'N/A'}</div>
                  <div class="info-item"><strong>💻 মিটিং প্ল্যাটফর্ম:</strong> ${safeData.meeting_platform || 'N/A'}</div>
                  ${safeData.notes ? `<div class="info-item"><strong>📝 নোট:</strong> ${safeData.notes}</div>` : ''}
                </div>
                <center>
                  <a href="https://www.lunexomedia.com/admin-dashboard/bookings" class="cta-button">
                    এখনই অ্যাডমিন প্যানেলে যান →
                  </a>
                </center>
              </div>
              <div class="footer">এটি একটি স্বয়ংক্রিয় নোটিফিকেশন ইমেইল | Lunexo Media</div>
            </div>
          </body>
        </html>
      `;
    } else if (type === 'contact') {
      emailSubject = `🔔 নতুন কন্টাক্ট: ${safeData.name || 'Unknown'}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; }
              .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 40px 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .urgent-badge { background: #dbeafe; color: #1e40af; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 20px; }
              .content { padding: 30px; }
              .info-box { background: #eff6ff; border-left: 5px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .info-item { margin: 12px 0; font-size: 16px; }
              .info-item strong { color: #1e40af; }
              .message-box { background: #f9fafb; border: 2px solid #e5e7eb; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="urgent-badge">📬 নতুন মেসেজ</div>
                <h1>নতুন কন্টাক্ট ফর্ম সাবমিশন!</h1>
              </div>
              <div class="content">
                <div class="info-box">
                  <h2 style="color: #1e40af; margin-top: 0;">যোগাযোগ বিস্তারিত:</h2>
                  <div class="info-item"><strong>👤 নাম:</strong> ${safeData.name || 'N/A'}</div>
                  <div class="info-item"><strong>📧 ইমেইল:</strong> ${safeData.email || 'N/A'}</div>
                  ${safeData.phone ? `<div class="info-item"><strong>📱 ফোন:</strong> ${safeData.phone}</div>` : ''}
                  ${safeData.company ? `<div class="info-item"><strong>🏢 কোম্পানি:</strong> ${safeData.company}</div>` : ''}
                </div>
                ${safeData.message ? `
                <div class="message-box">
                  <h3 style="margin-top: 0; color: #374151;">💬 মেসেজ:</h3>
                  <p style="margin: 0; line-height: 1.6;">${safeData.message}</p>
                </div>
                ` : ''}
                <center>
                  <a href="https://www.lunexomedia.com/admin-dashboard/contact-submissions" class="cta-button">
                    এখনই অ্যাডমিন প্যানেলে যান →
                  </a>
                </center>
              </div>
              <div class="footer">এটি একটি স্বয়ংক্রিয় নোটিফিকেশন ইমেইল | Lunexo Media</div>
            </div>
          </body>
        </html>
      `;
    }

    // Send email notification
    try {
      const { error: emailError } = await resend.emails.send({
        from: "Lunexo Admin Alerts <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: emailSubject,
        html: emailHtml,
      });

      if (emailError) {
        console.error("Email error:", emailError);
      } else {
        console.log("Admin email notification sent successfully");
      }
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
