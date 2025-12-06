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
  meeting_date: string;
  meeting_time: string;
  business_type?: string;
  lead_temperature?: string;
  meeting_platform: string;
  service_interest?: string;
  meeting_requested?: string;
  next_step_requested?: string;
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
    console.log("=== VAPI Webhook Full Payload ===");
    console.log(JSON.stringify(requestBody, null, 2));

    // Try to extract booking data from various VAPI payload formats
    let bookingData: VAPIBookingData | null = null;

    // Format 1: Direct data at root level (most common for Server URL endpoint)
    if (requestBody.name && requestBody.email) {
      console.log("Format 1: Direct data at root level");
      bookingData = {
        name: requestBody.name,
        email: requestBody.email,
        phone: requestBody.phone || "",
        meeting_date: requestBody.meeting_date || requestBody.date || "",
        meeting_time: requestBody.meeting_time || requestBody.time || "",
        business_type: requestBody.business_type,
        lead_temperature: requestBody.lead_temperature,
        meeting_platform: requestBody.meeting_platform || "Google Meet",
        service_interest: requestBody.service_interest,
        meeting_requested: requestBody.meeting_requested,
        next_step_requested: requestBody.next_step_requested
      };
    }
    
    // Format 2: Data inside message.toolCallResult or message.functionCall
    else if (requestBody.message?.functionCall?.parameters || requestBody.message?.toolCalls) {
      console.log("Format 2: Function call format");
      const functionCall = requestBody.message?.functionCall || requestBody.message?.toolCalls?.[0]?.function;
      if (functionCall) {
        const args = typeof functionCall.parameters === 'string' 
          ? JSON.parse(functionCall.parameters) 
          : functionCall.parameters;
        
        bookingData = {
          name: args.name,
          email: args.email,
          phone: args.phone || "",
          meeting_date: args.meeting_date || args.date || "",
          meeting_time: args.meeting_time || args.time || "",
          business_type: args.business_type,
          lead_temperature: args.lead_temperature,
          meeting_platform: args.meeting_platform || "Google Meet",
          service_interest: args.service_interest,
          meeting_requested: args.meeting_requested,
          next_step_requested: args.next_step_requested
        };
      }
    }
    
    // Format 3: Data inside message.analysis.structuredData (end-of-call report from VAPI)
    else if (requestBody.message?.analysis?.structuredData) {
      console.log("Format 3: VAPI end-of-call report with message.analysis.structuredData");
      const structuredData = requestBody.message.analysis.structuredData;
      if (structuredData && structuredData.name) {
        // Clean up email if it contains spoken format
        let cleanEmail = structuredData.email || "";
        if (cleanEmail.includes(" at ") || cleanEmail.includes(" dot ")) {
          cleanEmail = cleanEmail
            .replace(/ at /gi, "@")
            .replace(/ dot /gi, ".")
            .replace(/\s+/g, "");
        }
        
        bookingData = {
          name: structuredData.name,
          email: cleanEmail,
          phone: structuredData.phone || "",
          meeting_date: structuredData.meeting_date || structuredData.date || "",
          meeting_time: structuredData.meeting_time || structuredData.time || "",
          business_type: structuredData.business_type || structuredData.business_name,
          lead_temperature: structuredData.lead_temperature,
          meeting_platform: structuredData.meeting_platform || "Google Meet",
          service_interest: structuredData.service_interest,
          meeting_requested: String(structuredData.meeting_requested || ""),
          next_step_requested: structuredData.next_step_requested
        };
      }
    }
    
    // Format 4: Data inside requestBody.analysis.structuredData (alternative format)
    else if (requestBody.analysis?.structuredData) {
      console.log("Format 4: Direct analysis.structuredData format");
      const structuredData = requestBody.analysis.structuredData;
      if (structuredData && structuredData.name) {
        let cleanEmail = structuredData.email || "";
        if (cleanEmail.includes(" at ") || cleanEmail.includes(" dot ")) {
          cleanEmail = cleanEmail
            .replace(/ at /gi, "@")
            .replace(/ dot /gi, ".")
            .replace(/\s+/g, "");
        }
        
        bookingData = {
          name: structuredData.name,
          email: cleanEmail,
          phone: structuredData.phone || "",
          meeting_date: structuredData.meeting_date || structuredData.date || "",
          meeting_time: structuredData.meeting_time || structuredData.time || "",
          business_type: structuredData.business_type || structuredData.business_name,
          lead_temperature: structuredData.lead_temperature,
          meeting_platform: structuredData.meeting_platform || "Google Meet",
          service_interest: structuredData.service_interest,
          meeting_requested: String(structuredData.meeting_requested || ""),
          next_step_requested: structuredData.next_step_requested
        };
      }
    }

    // Format 4: Data inside call.analysis or call object
    else if (requestBody.call?.analysis?.structuredData) {
      console.log("Format 4: Call analysis format");
      const structuredData = requestBody.call.analysis.structuredData;
      if (structuredData && structuredData.name) {
        bookingData = {
          name: structuredData.name,
          email: structuredData.email || "",
          phone: structuredData.phone || "",
          meeting_date: structuredData.meeting_date || structuredData.date || "",
          meeting_time: structuredData.meeting_time || structuredData.time || "",
          business_type: structuredData.business_type,
          lead_temperature: structuredData.lead_temperature,
          meeting_platform: structuredData.meeting_platform || "Google Meet",
          service_interest: structuredData.service_interest,
          meeting_requested: structuredData.meeting_requested,
          next_step_requested: structuredData.next_step_requested
        };
      }
    }

    // If we found booking data, process it
    if (bookingData && bookingData.name && bookingData.email) {
      console.log("Processing booking data:", JSON.stringify(bookingData, null, 2));

      // Build notes from additional info
      const notesArray: string[] = ["Booked via VAPI Voice Agent"];
      if (bookingData.business_type) notesArray.push(`Business Type: ${bookingData.business_type}`);
      if (bookingData.lead_temperature) notesArray.push(`Lead Temperature: ${bookingData.lead_temperature}`);
      if (bookingData.service_interest) notesArray.push(`Services: ${bookingData.service_interest}`);
      if (bookingData.meeting_requested) notesArray.push(`Meeting Requested: ${bookingData.meeting_requested}`);
      if (bookingData.next_step_requested) notesArray.push(`Next Step: ${bookingData.next_step_requested}`);
      const notes = notesArray.join(" | ");

      // Save booking to database
      const { data: booking, error: dbError } = await supabaseClient
        .from("apartment_bookings")
        .insert({
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone || "Not provided",
          date: bookingData.meeting_date || new Date().toISOString().split('T')[0],
          time: bookingData.meeting_time || "TBD",
          meeting_platform: bookingData.meeting_platform,
          notes: notes,
          status: "pending",
          source: "vapi_voice_agent"
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        return new Response(
          JSON.stringify({ success: false, error: dbError.message }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("✅ Booking saved successfully:", booking.id);

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
                <p>Thank you for booking a consultation with us through our AI voice assistant!</p>
                
                <div class="info-box">
                  <h2>Your Booking Details:</h2>
                  <p><strong>📅 Date:</strong> ${bookingData.meeting_date || 'To be confirmed'}</p>
                  <p><strong>🕐 Time:</strong> ${bookingData.meeting_time || 'To be confirmed'}</p>
                  <p><strong>💻 Platform:</strong> ${bookingData.meeting_platform}</p>
                  <p><strong>📧 Email:</strong> ${bookingData.email}</p>
                  <p><strong>📱 Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
                  ${bookingData.business_type ? `<p><strong>🏢 Business Type:</strong> ${bookingData.business_type}</p>` : ""}
                  ${bookingData.service_interest ? `<p><strong>🛠️ Services:</strong> ${bookingData.service_interest}</p>` : ""}
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
              .temp-badge { background: ${bookingData.lead_temperature === 'hot' ? '#ef4444' : bookingData.lead_temperature === 'warm' ? '#f59e0b' : '#3b82f6'}; color: white; padding: 5px 10px; border-radius: 10px; font-size: 12px; margin-left: 10px; }
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
                ${bookingData.lead_temperature ? `<span class="temp-badge">🔥 ${bookingData.lead_temperature.toUpperCase()} LEAD</span>` : ''}
                
                <div class="info-box">
                  <h2>Booking Details:</h2>
                  <p><strong>👤 Name:</strong> ${bookingData.name}</p>
                  <p><strong>📧 Email:</strong> ${bookingData.email}</p>
                  <p><strong>📱 Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
                  <p><strong>📅 Date:</strong> ${bookingData.meeting_date || 'To be confirmed'}</p>
                  <p><strong>🕐 Time:</strong> ${bookingData.meeting_time || 'To be confirmed'}</p>
                  <p><strong>💻 Platform:</strong> ${bookingData.meeting_platform}</p>
                  ${bookingData.business_type ? `<p><strong>🏢 Business Type:</strong> ${bookingData.business_type}</p>` : ""}
                  ${bookingData.service_interest ? `<p><strong>🛠️ Services Interested:</strong> ${bookingData.service_interest}</p>` : ""}
                  ${bookingData.lead_temperature ? `<p><strong>🌡️ Lead Temperature:</strong> ${bookingData.lead_temperature}</p>` : ""}
                  ${bookingData.meeting_requested ? `<p><strong>📋 Meeting Requested:</strong> ${bookingData.meeting_requested}</p>` : ""}
                  ${bookingData.next_step_requested ? `<p><strong>➡️ Next Step:</strong> ${bookingData.next_step_requested}</p>` : ""}
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
          subject: `🎤 Booking Confirmed - ${bookingData.meeting_date || 'Pending'} at ${bookingData.meeting_time || 'TBD'}`,
          html: customerEmailHtml,
        });

        await resend.emails.send({
          from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Lunexo Media <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `🎤 ${bookingData.lead_temperature === 'hot' ? '🔥 HOT LEAD' : 'New Voice Booking'}: ${bookingData.name}`,
          html: adminEmailHtml,
        });

        console.log("✅ Emails sent successfully");
      } catch (emailError) {
        console.error("Email error:", emailError);
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          bookingId: booking.id,
          message: `Booking created for ${bookingData.name}`
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Log that no booking data was found but still return success
    console.log("No booking data found in payload - event type might be different");
    console.log("Event types found:", {
      type: requestBody.type,
      messageType: requestBody.message?.type,
      hasAnalysis: !!requestBody.analysis,
      hasCall: !!requestBody.call
    });

    return new Response(
      JSON.stringify({ success: true, message: "Webhook received" }),
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
