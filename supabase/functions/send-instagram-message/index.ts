import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const META_PAGE_ACCESS_TOKEN = Deno.env.get("META_PAGE_ACCESS_TOKEN");
const META_FACEBOOK_PAGE_ID = Deno.env.get("META_FACEBOOK_PAGE_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, message, isAdminReply } = await req.json();

    if (!to || !message) {
      return new Response(
        JSON.stringify({ error: "Missing 'to' or 'message'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!META_FACEBOOK_PAGE_ID) {
      console.error("META_FACEBOOK_PAGE_ID is not configured");
      return new Response(
        JSON.stringify({ error: "Facebook Page ID not configured. Please add META_FACEBOOK_PAGE_ID secret." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending Instagram message to ${to}: ${message.substring(0, 50)}...`);
    console.log("Using Page ID:", META_FACEBOOK_PAGE_ID);

    // For Instagram, use the Page ID (Instagram is linked to Facebook Page)
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${META_FACEBOOK_PAGE_ID}/messages?access_token=${META_PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: to },
          message: { text: message },
        }),
      }
    );

    const result = await response.json();
    console.log("Instagram API response:", result);

    if (!response.ok || result.error) {
      console.error("Instagram API error:", result);
      return new Response(
        JSON.stringify({ error: result.error?.message || "Failed to send message" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log the sent message to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    await supabaseClient.from("visitor_activities").insert({
      activity_type: "instagram_message_sent",
      metadata: {
        recipient_id: to,
        message: message,
        platform: "instagram",
        is_admin_reply: isAdminReply || false,
        timestamp: new Date().toISOString(),
      },
    });

    return new Response(
      JSON.stringify({ success: true, message_id: result.message_id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending Instagram message:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
