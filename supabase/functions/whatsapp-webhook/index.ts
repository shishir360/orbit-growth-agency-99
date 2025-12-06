import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Verify token from environment (set in secrets)
const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "lunexo_whatsapp_verify_2024";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // GET request - Meta webhook verification
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    console.log("Webhook verification request:", { mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified successfully!");
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain", ...corsHeaders },
      });
    } else {
      console.log("Webhook verification failed!");
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }
  }

  // POST request - Incoming WhatsApp messages/events
  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("=== Incoming WhatsApp Webhook ===");
      console.log(JSON.stringify(body, null, 2));

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      // Extract message data from Meta webhook payload
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      
      if (value?.messages) {
        for (const message of value.messages) {
          const from = message.from; // Customer's phone number
          const messageText = message.text?.body || "";
          const messageType = message.type;
          const timestamp = message.timestamp;
          const contact = value.contacts?.[0];
          const customerName = contact?.profile?.name || "Unknown";

          console.log(`Message from ${customerName} (${from}): ${messageText}`);

          // Log incoming message to visitor_activities
          await supabaseClient.from("visitor_activities").insert({
            activity_type: "whatsapp_message",
            metadata: {
              from: from,
              name: customerName,
              message: messageText,
              type: messageType,
              timestamp: timestamp,
            },
          });

          // You can add auto-reply logic here if needed
          // For now, just log the message
        }
      }

      // Handle message status updates (sent, delivered, read)
      if (value?.statuses) {
        for (const status of value.statuses) {
          console.log(`Message ${status.id} status: ${status.status}`);
        }
      }

      return new Response(
        JSON.stringify({ success: true, message: "Webhook received" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } catch (error: any) {
      console.error("WhatsApp webhook error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
};

serve(handler);
