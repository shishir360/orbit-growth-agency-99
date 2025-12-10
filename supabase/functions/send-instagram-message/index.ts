import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const META_PAGE_ACCESS_TOKEN = Deno.env.get("META_PAGE_ACCESS_TOKEN");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Instagram Business Account ID from Page
async function getInstagramAccountId(): Promise<string | null> {
  try {
    // First get the page ID
    const pageResponse = await fetch(
      `https://graph.facebook.com/v18.0/me?access_token=${META_PAGE_ACCESS_TOKEN}&fields=id,instagram_business_account`
    );
    const pageData = await pageResponse.json();
    console.log("Page data:", pageData);
    
    // Return Instagram Business Account ID if available
    if (pageData.instagram_business_account?.id) {
      return pageData.instagram_business_account.id;
    }
    
    return pageData.id || null;
  } catch (error) {
    console.error("Error getting Instagram account ID:", error);
    return null;
  }
}

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

    console.log(`Sending Instagram message to ${to}: ${message.substring(0, 50)}...`);

    // Get the Instagram Account ID
    const accountId = await getInstagramAccountId();
    console.log("Using Account ID:", accountId);

    // For Instagram DMs, we use the messages endpoint with the Instagram Business Account ID
    const endpoint = accountId
      ? `https://graph.facebook.com/v18.0/${accountId}/messages?access_token=${META_PAGE_ACCESS_TOKEN}`
      : `https://graph.facebook.com/v18.0/me/messages?access_token=${META_PAGE_ACCESS_TOKEN}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: to },
        message: { text: message },
      }),
    });

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
