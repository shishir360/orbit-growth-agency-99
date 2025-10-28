import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "shishirmd681@gmail.com";
const ADMIN_PHONE = "+8801339731664"; // WhatsApp number

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'booking' | 'contact';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: NotificationRequest = await req.json();

    console.log(`Processing ${type} notification:`, data);

    let emailSubject = "";
    let emailHtml = "";
    let whatsappMessage = "";

    if (type === 'booking') {
      emailSubject = `🔔 নতুন বুকিং: ${data.name}`;
      whatsappMessage = `🔔 *নতুন অ্যাপার্টমেন্ট বুকিং!*\n\n` +
        `👤 নাম: ${data.name}\n` +
        `📧 ইমেইল: ${data.email}\n` +
        `📱 ফোন: ${data.phone}\n` +
        `📅 তারিখ: ${data.date}\n` +
        `🕐 সময়: ${data.time}\n` +
        `💻 প্ল্যাটফর্ম: ${data.meeting_platform}\n` +
        (data.notes ? `📝 নোট: ${data.notes}\n` : '') +
        `\n✅ এখনই চেক করুন: https://www.lunexomedia.com/admin-dashboard/bookings`;

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
                <p style="font-size: 18px; color: #ef4444; font-weight: bold;">একটি নতুন বুকিং এসেছে যা আপনার অবিলম্বে মনোযোগ প্রয়োজন।</p>
                
                <div class="info-box">
                  <h2 style="color: #991b1b; margin-top: 0;">বুকিং বিস্তারিত:</h2>
                  <div class="info-item"><strong>👤 নাম:</strong> ${data.name}</div>
                  <div class="info-item"><strong>📧 ইমেইল:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
                  <div class="info-item"><strong>📱 ফোন:</strong> <a href="tel:${data.phone}">${data.phone}</a></div>
                  <div class="info-item"><strong>📅 তারিখ:</strong> ${data.date}</div>
                  <div class="info-item"><strong>🕐 সময়:</strong> ${data.time}</div>
                  <div class="info-item"><strong>💻 মিটিং প্ল্যাটফর্ম:</strong> ${data.meeting_platform}</div>
                  ${data.notes ? `<div class="info-item"><strong>📝 নোট:</strong> ${data.notes}</div>` : ''}
                  <div class="info-item"><strong>⏰ সাবমিট করা হয়েছে:</strong> ${new Date().toLocaleString('bn-BD')}</div>
                </div>

                <p><strong>পরবর্তী পদক্ষেপ:</strong></p>
                <ul>
                  <li>অ্যাডমিন প্যানেলে বিস্তারিত দেখুন</li>
                  <li>মিটিং লিংক প্রস্তুত করুন</li>
                  <li>গ্রাহককে যথাসময়ে যোগাযোগ করুন</li>
                </ul>

                <center>
                  <a href="https://www.lunexomedia.com/admin-dashboard/bookings" class="cta-button">
                    এখনই অ্যাডমিন প্যানেলে যান →
                  </a>
                </center>
              </div>
              <div class="footer">
                এটি একটি স্বয়ংক্রিয় নোটিফিকেশন ইমেইল | Lunexo Media
              </div>
            </div>
          </body>
        </html>
      `;
    } else if (type === 'contact') {
      emailSubject = `🔔 নতুন কন্টাক্ট: ${data.name}`;
      whatsappMessage = `🔔 *নতুন কন্টাক্ট ফর্ম সাবমিশন!*\n\n` +
        `👤 নাম: ${data.name}\n` +
        `📧 ইমেইল: ${data.email}\n` +
        (data.phone ? `📱 ফোন: ${data.phone}\n` : '') +
        (data.company ? `🏢 কোম্পানি: ${data.company}\n` : '') +
        `💬 মেসেজ: ${data.message}\n` +
        `\n✅ এখনই চেক করুন: https://www.lunexomedia.com/admin-dashboard/contact-submissions`;

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
                <p style="font-size: 18px; color: #3b82f6; font-weight: bold;">একজন নতুন গ্রাহক আপনার সাথে যোগাযোগ করতে চাচ্ছেন।</p>
                
                <div class="info-box">
                  <h2 style="color: #1e40af; margin-top: 0;">যোগাযোগ বিস্তারিত:</h2>
                  <div class="info-item"><strong>👤 নাম:</strong> ${data.name}</div>
                  <div class="info-item"><strong>📧 ইমেইল:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
                  ${data.phone ? `<div class="info-item"><strong>📱 ফোন:</strong> <a href="tel:${data.phone}">${data.phone}</a></div>` : ''}
                  ${data.company ? `<div class="info-item"><strong>🏢 কোম্পানি:</strong> ${data.company}</div>` : ''}
                  <div class="info-item"><strong>⏰ সাবমিট করা হয়েছে:</strong> ${new Date().toLocaleString('bn-BD')}</div>
                </div>

                <div class="message-box">
                  <h3 style="margin-top: 0; color: #374151;">💬 মেসেজ:</h3>
                  <p style="margin: 0; line-height: 1.6;">${data.message}</p>
                </div>

                <p><strong>পরবর্তী পদক্ষেপ:</strong></p>
                <ul>
                  <li>২৪ ঘণ্টার মধ্যে উত্তর দিন</li>
                  <li>অ্যাডমিন প্যানেলে স্ট্যাটাস আপডেট করুন</li>
                  <li>গ্রাহক সম্পর্ক ব্যবস্থাপনা করুন</li>
                </ul>

                <center>
                  <a href="https://www.lunexomedia.com/admin-dashboard/contact-submissions" class="cta-button">
                    এখনই অ্যাডমিন প্যানেলে যান →
                  </a>
                </center>
              </div>
              <div class="footer">
                এটি একটি স্বয়ংক্রিয় নোটিফিকেশন ইমেইল | Lunexo Media
              </div>
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

    // Send WhatsApp notification via Twilio or direct link
    // For now, we'll just log it - you can integrate Twilio for actual WhatsApp sending
    const whatsappLink = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
    console.log("WhatsApp notification prepared:", whatsappLink);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification sent successfully",
        whatsappLink
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
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
