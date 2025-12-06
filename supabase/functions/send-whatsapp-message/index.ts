import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const META_ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
const META_PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!META_ACCESS_TOKEN || !META_PHONE_ID) {
      throw new Error("WhatsApp API credentials not configured");
    }

    const { to, message } = await req.json();

    if (!to || !message) {
      throw new Error("Phone number and message are required");
    }

    // Clean phone number - remove any non-digit characters except leading +
    let cleanPhone = to.replace(/[^\d]/g, "");
    
    console.log(`Sending WhatsApp message to ${cleanPhone}`);

    // Send message via WhatsApp API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${META_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${META_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanPhone,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const result = await response.json();
    console.log("WhatsApp API response:", result);

    if (!response.ok) {
      console.error("WhatsApp API error:", result);
      throw new Error(result.error?.message || "Failed to send WhatsApp message");
    }

    // Log the sent message to database
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseClient.from("visitor_activities").insert({
      activity_type: "whatsapp_message_sent",
      metadata: {
        to: cleanPhone,
        message: message,
        sent_by: "admin",
        sent_successfully: true,
        message_id: result.messages?.[0]?.id,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        messageId: result.messages?.[0]?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending WhatsApp message:", error);
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
