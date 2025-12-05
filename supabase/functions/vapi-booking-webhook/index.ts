import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "shishirmd681@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VAPIBookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  meeting_platform?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const requestBody = await req.json();
    console.log("VAPI Webhook received:", JSON.stringify(requestBody, null, 2));

    // VAPI sends different event types - we're looking for function calls or end-of-call data
    const eventType = requestBody.message?.type || requestBody.type;
    
    // Handle tool/function call from VAPI
    if (eventType === "function-call" || eventType === "tool-calls") {
      const functionCall = requestBody.message?.functionCall || requestBody.message?.toolCalls?.[0]?.function;
      
      if (functionCall?.name === "create_booking" || functionCall?.name === "book_appointment") {
        const args = typeof functionCall.parameters === 'string' 
          ? JSON.parse(functionCall.parameters) 
          : functionCall.parameters;

        const bookingData: VAPIBookingData = {
          name: args.name || args.customer_name,
          email: args.email || args.customer_email,
          phone: args.phone || args.customer_phone || args.phone_number,
          date: args.date || args.booking_date,
          time: args.time || args.booking_time,
          meeting_platform: args.meeting_platform || args.platform || "Google Meet",
          notes: args.notes || args.additional_notes || "Booked via VAPI Voice Agent"
        };

        // Validate required fields
        if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date || !bookingData.time) {
          console.log("Missing required booking fields:", bookingData);
          return new Response(
            JSON.stringify({ 
              result: "I need more information to complete your booking. Please provide your name, email, phone number, preferred date and time."
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        // Save booking to database
        const { data: booking, error: dbError } = await supabaseClient
          .from("apartment_bookings")
          .insert({
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            date: bookingData.date,
            time: bookingData.time,
            meeting_platform: bookingData.meeting_platform,
            notes: bookingData.notes,
            status: "pending",
            source: "vapi_voice_agent"
          })
          .select()
          .single();

        if (dbError) {
          console.error("Database error:", dbError);
          return new Response(
            JSON.stringify({ result: "Sorry, there was an error creating your booking. Please try again." }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        console.log("Booking saved:", booking.id);

        // Fetch company info
        const { data: companyInfo } = await supabaseClient
          .from('company_info')
          .select('*')
          .limit(1)
          .single();

        // Send customer confirmation email
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
                .voice-badge { background: #10b981; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px; display: inline-block; margin-bottom: 15px; }
                h1 { margin: 0; }
                h2 { color: #667eea; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎤 Booking Confirmed via Voice!</h1>
                </div>
                <div class="content">
                  <span class="voice-badge">📞 Booked via Farhan AI Voice Agent</span>
                  <p>Dear ${bookingData.name},</p>
                  <p>Thank you for booking a consultation with us through our AI voice assistant! We're excited to connect with you.</p>
                  
                  <div class="info-box">
                    <h2>Your Booking Details:</h2>
                    <p><strong>📅 Date:</strong> ${bookingData.date}</p>
                    <p><strong>🕐 Time:</strong> ${bookingData.time}</p>
                    <p><strong>💻 Platform:</strong> ${bookingData.meeting_platform}</p>
                    <p><strong>📧 Email:</strong> ${bookingData.email}</p>
                    <p><strong>📱 Phone:</strong> ${bookingData.phone}</p>
                    ${bookingData.notes ? `<p><strong>📝 Notes:</strong> ${bookingData.notes}</p>` : ""}
                    <p><strong>Booking ID:</strong> ${booking.id}</p>
                  </div>

                  <p>We'll send you the meeting link shortly before your scheduled time.</p>
                  
                  <p>Best regards,<br>${companyInfo?.company_name || 'Lunexo Media'} Team</p>
                </div>
              </div>
            </body>
          </html>
        `;

        // Send admin notification email
        const adminEmailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #f59e0b; border-radius: 5px; }
                .voice-badge { background: #10b981; color: white; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: inline-block; margin-bottom: 15px; }
                h1 { margin: 0; }
                h2 { color: #f59e0b; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎤 New Voice Agent Booking!</h1>
                </div>
                <div class="content">
                  <span class="voice-badge">📞 Via Farhan AI Voice Agent</span>
                  
                  <div class="info-box">
                    <h2>Booking Details:</h2>
                    <p><strong>👤 Name:</strong> ${bookingData.name}</p>
                    <p><strong>📧 Email:</strong> ${bookingData.email}</p>
                    <p><strong>📱 Phone:</strong> ${bookingData.phone}</p>
                    <p><strong>📅 Date:</strong> ${bookingData.date}</p>
                    <p><strong>🕐 Time:</strong> ${bookingData.time}</p>
                    <p><strong>💻 Platform:</strong> ${bookingData.meeting_platform}</p>
                    ${bookingData.notes ? `<p><strong>📝 Notes:</strong> ${bookingData.notes}</p>` : ""}
                    <p><strong>Booking ID:</strong> ${booking.id}</p>
                    <p><strong>Source:</strong> VAPI Voice Agent</p>
                  </div>

                  <p><strong>Next Steps:</strong></p>
                  <ul>
                    <li>Review the booking in your admin panel</li>
                    <li>Confirm and send meeting link to customer</li>
                  </ul>
                </div>
              </div>
            </body>
          </html>
        `;

        // Send emails
        try {
          await resend.emails.send({
            from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Lunexo Media <onboarding@resend.dev>',
            to: [bookingData.email],
            subject: `🎤 Booking Confirmed - ${bookingData.date} at ${bookingData.time}`,
            html: customerEmailHtml,
          });

          await resend.emails.send({
            from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Lunexo Media <onboarding@resend.dev>',
            to: [ADMIN_EMAIL],
            subject: `🎤 New Voice Booking: ${bookingData.name} - ${bookingData.date}`,
            html: adminEmailHtml,
          });

          console.log("Emails sent successfully");
        } catch (emailError) {
          console.error("Email error:", emailError);
        }

        // Return success response to VAPI
        return new Response(
          JSON.stringify({ 
            result: `Perfect! I've booked your consultation for ${bookingData.date} at ${bookingData.time}. You'll receive a confirmation email at ${bookingData.email} shortly. Is there anything else I can help you with?`
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Handle end-of-call summary if needed
    if (eventType === "end-of-call-report") {
      console.log("Call ended:", requestBody.message?.summary);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Default response for other event types
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in vapi-booking-webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
