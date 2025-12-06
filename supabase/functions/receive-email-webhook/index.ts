import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Receive email webhook called");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Parse the incoming email from Resend webhook
    const payload = await req.json();
    console.log("Received email payload:", JSON.stringify(payload));

    // Extract email data from Resend inbound format
    const { from, to, subject, text, html, created_at } = payload;

    // Parse from field (can be "Name <email>" format)
    let fromEmail = from;
    let fromName = null;
    
    if (from && from.includes("<")) {
      const match = from.match(/^(.+?)\s*<(.+?)>$/);
      if (match) {
        fromName = match[1].trim();
        fromEmail = match[2].trim();
      }
    }

    // Insert received email into database
    const { data, error } = await supabaseClient
      .from("received_emails")
      .insert({
        from_email: fromEmail,
        from_name: fromName,
        to_email: Array.isArray(to) ? to[0] : to,
        subject: subject || "(No Subject)",
        text_body: text,
        html_body: html,
        received_at: created_at || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving received email:", error);
      throw error;
    }

    console.log("Email saved successfully:", data.id);

    return new Response(
      JSON.stringify({ success: true, emailId: data.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in receive-email-webhook:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
