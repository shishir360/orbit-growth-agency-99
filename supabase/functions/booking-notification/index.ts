import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "shishirmd681@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  meeting_platform: string;
  notes?: string;
  timezone?: string;
  timezone_offset?: number;
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

    const { name, email, phone, date, time, meeting_platform, notes, timezone, timezone_offset }: BookingRequest = await req.json();

    console.log("Received booking from:", email);

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !meeting_platform) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Save to database
    const { data: booking, error: dbError } = await supabaseClient
      .from("apartment_bookings")
      .insert({
        name,
        email,
        phone,
        date,
        time,
        meeting_platform,
        notes,
        status: "pending",
        timezone,
        timezone_offset,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Booking saved:", booking.id);

    // Send confirmation email to customer
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
              <h1>Booking Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for scheduling a consultation with us. We're excited to connect with you!</p>
              
              <div class="info-box">
                <h2>Your Booking Details:</h2>
                <p><strong>📅 Date:</strong> ${date}</p>
                <p><strong>🕐 Time:</strong> ${time} ${timezone ? `(${timezone})` : ''}</p>
                <p><strong>💻 Platform:</strong> ${meeting_platform}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>📱 Phone:</strong> ${phone}</p>
                ${notes ? `<p><strong>📝 Notes:</strong> ${notes}</p>` : ""}
                <p><strong>Booking ID:</strong> ${booking.id}</p>
              </div>

              <p>We'll send you the meeting link shortly before your scheduled time.</p>
              
              <p>If you need to reschedule or have any questions, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>Lunexo Media Team</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send notification email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444; border-radius: 5px; }
            .urgent { background: #fee2e2; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ef4444; }
            h1 { margin: 0; }
            h2 { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Booking Alert!</h1>
            </div>
            <div class="content">
              <div class="urgent">
                <h2>Action Required</h2>
                <p>You have a new consultation booking that needs your attention.</p>
              </div>
              
              <div class="info-box">
                <h2>Booking Details:</h2>
                <p><strong>👤 Name:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>📱 Phone:</strong> ${phone}</p>
                <p><strong>📅 Date:</strong> ${date}</p>
                <p><strong>🕐 Time:</strong> ${time} ${timezone ? `(${timezone})` : ''}</p>
                <p><strong>🌍 Timezone:</strong> ${timezone || 'Not specified'} ${timezone_offset !== undefined ? `(UTC${timezone_offset > 0 ? '-' : '+'}${Math.abs(timezone_offset/60)})` : ''}</p>
                <p><strong>💻 Platform:</strong> ${meeting_platform}</p>
                ${notes ? `<p><strong>📝 Notes:</strong> ${notes}</p>` : ""}
                <p><strong>Booking ID:</strong> ${booking.id}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Review the booking details in your admin panel</li>
                <li>Prepare the meeting link for the specified platform</li>
                <li>Send the meeting link to the customer before the scheduled time</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation email
    await resend.emails.send({
      from: "Lunexo Media <onboarding@resend.dev>",
      to: [email],
      subject: "Booking Confirmed - Lunexo Media",
      html: customerEmailHtml,
    });

    // Send admin notification email
    await resend.emails.send({
      from: "Lunexo Media Notifications <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `🔔 New Booking: ${name} - ${date} at ${time}`,
      html: adminEmailHtml,
    });

    console.log("Emails sent successfully");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Booking submitted successfully",
        bookingId: booking.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in booking-notification function:", error);
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
