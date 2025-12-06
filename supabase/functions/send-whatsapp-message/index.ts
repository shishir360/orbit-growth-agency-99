import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const META_ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
const META_PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Send plain text message
async function sendTextMessage(to: string, message: string): Promise<any> {
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
        to: to,
        type: "text",
        text: { body: message },
      }),
    }
  );
  return response;
}

// Send message with quick reply buttons
async function sendButtonMessage(
  to: string, 
  message: string, 
  buttons: Array<{ id: string; title: string }>
): Promise<any> {
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
        to: to,
        type: "interactive",
        interactive: {
          type: "button",
          body: {
            text: message,
          },
          action: {
            buttons: buttons.slice(0, 3).map((btn) => ({
              type: "reply",
              reply: {
                id: btn.id,
                title: btn.title.substring(0, 20), // Max 20 chars
              },
            })),
          },
        },
      }),
    }
  );
  return response;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!META_ACCESS_TOKEN || !META_PHONE_ID) {
      console.error("Missing WhatsApp credentials - ACCESS_TOKEN:", !!META_ACCESS_TOKEN, "PHONE_ID:", !!META_PHONE_ID);
      throw new Error("WhatsApp API credentials not configured");
    }

    const { to, message, buttons, isAdminReply } = await req.json();
    
    console.log("Received request:", { to, messageLength: message?.length, hasButtons: !!buttons, isAdminReply });

    if (!to || !message) {
      throw new Error("Phone number and message are required");
    }

    // Clean phone number - remove any non-digit characters and ensure no leading zeros issues
    let cleanPhone = to.replace(/[^\d]/g, "");
    
    // Ensure phone has country code (if starts with 0, assume Bangladesh and add 88)
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "88" + cleanPhone;
    }
    
    console.log(`Sending WhatsApp message to ${cleanPhone}, isAdminReply: ${isAdminReply}`);

    let response;
    let hasButtons = false;

    // Send with buttons if provided
    if (buttons && Array.isArray(buttons) && buttons.length > 0) {
      console.log("Sending with quick reply buttons:", buttons);
      response = await sendButtonMessage(cleanPhone, message, buttons);
      hasButtons = true;
      
      // Fallback to text if buttons fail
      if (!response.ok) {
        console.log("Button message failed, falling back to text");
        response = await sendTextMessage(cleanPhone, message);
        hasButtons = false;
      }
    } else {
      response = await sendTextMessage(cleanPhone, message);
    }

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
        ai_response: message, // Store in ai_response for consistent display
        sent_by: isAdminReply ? "admin" : "system",
        is_admin_reply: isAdminReply === true,
        is_ai_response: isAdminReply !== true,
        sent_successfully: true,
        had_buttons: hasButtons,
        buttons: hasButtons ? buttons : null,
        message_id: result.messages?.[0]?.id,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        messageId: result.messages?.[0]?.id,
        hadButtons: hasButtons,
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
