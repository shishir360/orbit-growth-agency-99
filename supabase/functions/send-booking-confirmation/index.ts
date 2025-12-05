import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationRequest {
  bookingId: string;
  meetingLink?: string;
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

    const { bookingId, meetingLink }: ConfirmationRequest = await req.json();

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: "Booking ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending confirmation for booking:", bookingId);

    // Fetch booking details
    const { data: booking, error: bookingError } = await supabaseClient
      .from("apartment_bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking not found:", bookingError);
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch company info
    const { data: companyInfo } = await supabaseClient
      .from('company_info')
      .select('*')
      .limit(1)
      .single();

    const { name, email, date, time, meeting_platform, timezone } = booking;

    // Send confirmation email to customer
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #10b981; border-radius: 5px; }
            .meeting-link { background: #ecfdf5; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
            .meeting-link a { color: #059669; font-size: 18px; font-weight: bold; text-decoration: none; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            h1 { margin: 0; }
            h2 { color: #10b981; }
            .checkmark { font-size: 48px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="checkmark">✅</div>
              <h1>Your Booking is Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Great news! Your consultation has been <strong>confirmed</strong> by our team. We're looking forward to speaking with you!</p>
              
              <div class="info-box">
                <h2>Confirmed Booking Details:</h2>
                <p><strong>📅 Date:</strong> ${date}</p>
                <p><strong>🕐 Time:</strong> ${time} ${timezone ? `(${timezone})` : ''}</p>
                <p><strong>💻 Platform:</strong> ${meeting_platform}</p>
              </div>

              ${meetingLink ? `
              <div class="meeting-link">
                <p><strong>🔗 Your Meeting Link:</strong></p>
                <a href="${meetingLink}" target="_blank">${meetingLink}</a>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">Click the link above to join at your scheduled time</p>
              </div>
              ` : `
              <p>We'll send you the meeting link shortly before your scheduled time.</p>
              `}
              
              <p><strong>What to Expect:</strong></p>
              <ul>
                <li>Our expert will discuss your business goals and challenges</li>
                <li>We'll provide personalized recommendations for your growth</li>
                <li>You'll learn about strategies to improve your online presence</li>
              </ul>

              <p>If you need to reschedule or have any questions before the meeting, please reply to this email or contact us.</p>
              
              <p>Best regards,<br><strong>${companyInfo?.company_name || 'Lunexo Media'} Team</strong></p>
            </div>
            <div class="footer">
              <p>${companyInfo?.company_name || 'Lunexo Media'}</p>
              ${companyInfo?.phone ? `<p>📞 ${companyInfo.phone}</p>` : ''}
              ${companyInfo?.website ? `<p>🌐 ${companyInfo.website}</p>` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the confirmation email
    const emailResult = await resend.emails.send({
      from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Lunexo Media <onboarding@resend.dev>',
      to: [email],
      subject: `✅ Booking Confirmed - ${date} at ${time}`,
      html: confirmationEmailHtml,
    });

    console.log("Confirmation email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Confirmation email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
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
