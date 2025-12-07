import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const VERIFY_TOKEN = "lunexo_instagram_verify_2024";
const META_PAGE_ACCESS_TOKEN = Deno.env.get("META_PAGE_ACCESS_TOKEN");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Farhan AI System Prompt
const FARHAN_AI_SYSTEM_PROMPT = `You are Farhan AI, the friendly AI assistant for Lunexo Media, a digital marketing agency in New York.

About Lunexo Media:
- Location: New York, NY
- Phone: +1 (702) 483-0749
- Email: hello@lunexomedia.com
- Website: www.lunexomedia.com
- 50+ projects completed

Services & Pricing:
- Website Design: $500-$5000
- SEO: $300-$1500/month
- Google Ads: $500-$2000/month
- Facebook/Instagram Ads: $400-$1500/month
- AI Automation: $500-$3000

IMPORTANT: Keep responses short for Instagram DM (under 200 words). Be friendly and helpful.`;

// Get conversation history from database
async function getConversationHistory(supabaseClient: any, senderId: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata")
      .in("activity_type", ["instagram_message_received", "instagram_message_sent"])
      .or(`metadata->>sender_id.eq.${senderId},metadata->>recipient_id.eq.${senderId}`)
      .order("created_at", { ascending: true })
      .limit(10);

    if (error || !data) return [];

    const history: Array<{ role: string; content: string }> = [];
    for (const msg of data) {
      if (msg.activity_type === "instagram_message_received") {
        const content = msg.metadata?.message || "";
        if (content) history.push({ role: "user", content });
      } else if (msg.activity_type === "instagram_message_sent") {
        const content = msg.metadata?.ai_response || msg.metadata?.message || "";
        if (content) history.push({ role: "assistant", content });
      }
    }
    return history;
  } catch (error) {
    console.error("Error getting Instagram history:", error);
    return [];
  }
}

// Generate AI response
async function generateAIResponse(userMessage: string, history: Array<{ role: string; content: string }>): Promise<string> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: FARHAN_AI_SYSTEM_PROMPT },
          ...history,
          { role: "user", content: userMessage }
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) return "Sorry, I'm having issues. Email us at hello@lunexomedia.com 📧";
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Please contact hello@lunexomedia.com";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, technical issues. Email hello@lunexomedia.com 🙏";
  }
}

// Send Instagram message
async function sendInstagramMessage(recipientId: string, message: string): Promise<boolean> {
  try {
    console.log(`Sending Instagram to ${recipientId}: ${message.substring(0, 50)}...`);
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${META_PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text: message },
        }),
      }
    );

    const result = await response.json();
    console.log("Instagram response:", result);
    return response.ok;
  } catch (error) {
    console.error("Error sending Instagram:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Webhook verification
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    
    console.log("Instagram webhook verification:", { mode, token });
    
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Instagram webhook verified!");
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  // Handle incoming messages
  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("Instagram webhook received:", JSON.stringify(body));

      // Initialize Supabase
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabaseClient = createClient(supabaseUrl, supabaseKey);

      // Process Instagram messaging events
      if (body.object === "instagram") {
        for (const entry of body.entry || []) {
          for (const event of entry.messaging || []) {
            const senderId = event.sender?.id;
            const messageText = event.message?.text;

            if (senderId && messageText) {
              console.log(`Instagram from ${senderId}: ${messageText}`);

              // Log received message
              await supabaseClient.from("visitor_activities").insert({
                activity_type: "instagram_message_received",
                metadata: {
                  sender_id: senderId,
                  message: messageText,
                  platform: "instagram",
                  timestamp: new Date().toISOString(),
                },
              });

              // Get conversation history
              const history = await getConversationHistory(supabaseClient, senderId);

              // Generate AI response
              const aiResponse = await generateAIResponse(messageText, history);

              // Send response
              await sendInstagramMessage(senderId, aiResponse);

              // Log sent message
              await supabaseClient.from("visitor_activities").insert({
                activity_type: "instagram_message_sent",
                metadata: {
                  recipient_id: senderId,
                  message: aiResponse,
                  ai_response: aiResponse,
                  platform: "instagram",
                  timestamp: new Date().toISOString(),
                },
              });
            }
          }
        }
      }

      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    } catch (error) {
      console.error("Instagram webhook error:", error);
      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    }
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
};

serve(handler);
