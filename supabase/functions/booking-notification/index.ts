import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

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

const BookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().min(7).max(30),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  meeting_platform: z.string().min(1, "Meeting platform is required"),
  notes: z.string().max(500, "Notes too long").optional(),
  timezone: z.string().max(100).optional(),
  timezone_offset: z.number().int().min(-720).max(840).optional()
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch company info for email
    const { data: companyInfo } = await supabaseClient
      .from('company_info')
      .select('*')
      .limit(1)
      .single();

    const requestBody = await req.json();
    
    // Validate input
    let validatedData: BookingRequest;
    try {
      validatedData = BookingSchema.parse(requestBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ error: "Invalid input data", details: error.errors }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw error;
    }

    const { name, email, phone, date, time, meeting_platform, notes, timezone, timezone_offset } = validatedData;

    console.log("Received validated booking from:", email);

    // Derive timezone from IP if not provided by client
    let tz = timezone;
    let tzOffset = timezone_offset;
    try {
      if (!tz || tzOffset === undefined || tzOffset === null) {
        const xff = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
        const geoUrl = xff ? `https://ipapi.co/${xff}/json/` : 'https://ipapi.co/json/';
        const geoRes = await fetch(geoUrl);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (!tz && geo?.timezone) tz = geo.timezone as string;
          // ipapi returns utc_offset like "+0600" or "-0500"
          if ((tzOffset === undefined || tzOffset === null) && typeof geo?.utc_offset === 'string') {
            const u: string = geo.utc_offset; // e.g. +0600
            const sign = u.startsWith('-') ? -1 : 1;
            const hh = parseInt(u.slice(1, 3)) || 0;
            const mm = parseInt(u.slice(3, 5)) || 0;
            const total = sign * (hh * 60 + mm);
            // Store like JS getTimezoneOffset: minutes to add to local to get UTC
            tzOffset = -total;
          }
        }
      }
    } catch (e) {
      console.log('GeoIP lookup failed', e);
    }

    // Additional validation already done by Zod schema

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
        timezone: tz,
        timezone_offset: tzOffset,
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
                <p><strong>🕐 Time:</strong> ${time} ${tz ? `(${tz})` : ''}</p>
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
                <p><strong>🕐 Time:</strong> ${time} ${tz ? `(${tz})` : ''}</p>
                <p><strong>🌍 Timezone:</strong> ${tz || 'Not specified'} ${tzOffset !== undefined && tzOffset !== null ? `(UTC${tzOffset > 0 ? '-' : '+'}${Math.abs(tzOffset/60)})` : ''}</p>
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
      from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Booking <onboarding@resend.dev>',
      to: [email],
      subject: `Booking Confirmed - ${companyInfo?.company_name || 'Lunexo Media'}`,
      html: customerEmailHtml,
    });

    // Send admin notification email
    await resend.emails.send({
      from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Booking <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `🔔 New Booking: ${name} - ${date} at ${time}`,
      html: adminEmailHtml,
    });

    console.log("Emails sent successfully");

    // Send WhatsApp notification using TEMPLATE messages (required by WhatsApp 24-hour rule)
    try {
      const PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");
      const ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
      const ADMIN_NUMBER = Deno.env.get("ADMIN_WHATSAPP_NUMBER");

      if (PHONE_ID && ACCESS_TOKEN && ADMIN_NUMBER) {
        // Admin notification using TEMPLATE (required when outside 24-hour window)
        // Template name: admin_booking_alert
        // Parameters: customer_name, date, time, platform, phone
        const adminTemplatePayload = {
          messaging_product: "whatsapp",
          to: ADMIN_NUMBER,
          type: "template",
          template: {
            name: "admin_booking_alert",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: name || "Customer" },
                  { type: "text", text: date || "TBD" },
                  { type: "text", text: time || "TBD" },
                  { type: "text", text: meeting_platform || "Video Call" },
                  { type: "text", text: phone || "Not provided" },
                ],
              },
            ],
          },
        };

        const adminRes = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminTemplatePayload),
        });
        const adminResult = await adminRes.json();
        console.log("WhatsApp Admin template result:", JSON.stringify(adminResult));

        // Send to Customer using TEMPLATE
        if (phone && phone.length >= 10) {
          let customerPhone = phone.replace(/[\s\-\(\)]/g, "");
          if (!customerPhone.startsWith("+") && !customerPhone.startsWith("1")) {
            customerPhone = "1" + customerPhone;
          }
          customerPhone = customerPhone.replace("+", "");

          // Template name: booking_confirmation
          // Parameters: name, date, time, platform
          const customerTemplatePayload = {
            messaging_product: "whatsapp",
            to: customerPhone,
            type: "template",
            template: {
              name: "booking_confirmation",
              language: { code: "en" },
              components: [
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: name || "Customer" },
                    { type: "text", text: date || "To be confirmed" },
                    { type: "text", text: time || "To be confirmed" },
                    { type: "text", text: meeting_platform || "Video Call" },
                  ],
                },
              ],
            },
          };

          const customerRes = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerTemplatePayload),
          });
          const customerResult = await customerRes.json();
          console.log("WhatsApp Customer template result:", JSON.stringify(customerResult));
        }
      }
    } catch (waError) {
      console.error("WhatsApp error:", waError);
    }

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
