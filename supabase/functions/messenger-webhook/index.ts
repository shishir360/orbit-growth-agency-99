import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const VERIFY_TOKEN = "lunexo_messenger_verify_2024";
const META_PAGE_ACCESS_TOKEN = Deno.env.get("META_PAGE_ACCESS_TOKEN");
const META_FACEBOOK_PAGE_ID = Deno.env.get("META_FACEBOOK_PAGE_ID");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Build live knowledge base from database
async function buildKnowledgeBase(supabaseClient: any): Promise<string> {
  let kb = `You are Farhan AI, the friendly, smart assistant for Lunexo Media — a digital marketing agency in New York.

CORE INFO:
- Location: New York, NY
- Phone: +1 (702) 483-0749
- Email: hello@lunexomedia.com
- Website: www.lunexomedia.com
- Booking: https://lunexomedia.com/book-apartment
- 50+ projects completed worldwide
`;

  try {
    const [pricing, services, portfolio, blog, company] = await Promise.all([
      supabaseClient.from("pricing").select("service_name, price, currency, billing_period, features").eq("visible", true).order("display_order"),
      supabaseClient.from("services").select("title, description").eq("visible", true).order("display_order"),
      supabaseClient.from("portfolio").select("title, category, description").eq("published", true).limit(10),
      supabaseClient.from("blog_posts").select("title, excerpt, slug").eq("published", true).order("publish_date", { ascending: false }).limit(5),
      supabaseClient.from("company_info").select("*").maybeSingle(),
    ]);

    if (company.data) {
      kb += `\nCOMPANY: ${company.data.company_name} - ${company.data.tagline || ""}\n${company.data.description || ""}\n`;
    }

    if (services.data?.length) {
      kb += `\nSERVICES OFFERED:\n${services.data.map((s: any) => `- ${s.title}: ${s.description}`).join("\n")}\n`;
    }

    if (pricing.data?.length) {
      kb += `\nLIVE PRICING:\n${pricing.data.map((p: any) => `- ${p.service_name}: ${p.currency || "$"}${p.price}${p.billing_period ? "/" + p.billing_period : ""}`).join("\n")}\n`;
    }

    if (portfolio.data?.length) {
      kb += `\nRECENT PROJECTS:\n${portfolio.data.map((p: any) => `- ${p.title} (${p.category})`).join("\n")}\n`;
    }

    if (blog.data?.length) {
      kb += `\nLATEST BLOG POSTS:\n${blog.data.map((b: any) => `- ${b.title}: lunexomedia.com/blog/${b.slug}`).join("\n")}\n`;
    }
  } catch (e) {
    console.error("Knowledge base error:", e);
  }

  kb += `

BEHAVIOR RULES:
1. Auto-detect user language (Bengali, English, Hinglish, etc.) and reply in same language.
2. Remember user details from conversation history (name, business, budget, goals).
3. Keep Messenger replies short (under 200 words). Use emojis naturally 😊.
4. Subtly drive toward booking a free consultation: https://lunexomedia.com/book-apartment
5. Answer ANY question — general knowledge, business advice, marketing tips, etc.
6. If asked about pricing/services, use LIVE PRICING above (real-time data).
7. Be friendly, professional, helpful — like a smart friend.
8. Never make up info you don't know — say "let me connect you with the team" instead.
`;

  return kb;
}

// Get conversation history (deep memory)
async function getConversationHistory(supabaseClient: any, senderId: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata, created_at")
      .in("activity_type", ["messenger_message_received", "messenger_message_sent"])
      .or(`metadata->>sender_id.eq.${senderId},metadata->>recipient_id.eq.${senderId}`)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error || !data) return [];

    const history: Array<{ role: string; content: string }> = [];
    for (const msg of data) {
      if (msg.activity_type === "messenger_message_received") {
        const content = msg.metadata?.message || "";
        if (content) history.push({ role: "user", content });
      } else if (msg.activity_type === "messenger_message_sent") {
        const content = msg.metadata?.ai_response || msg.metadata?.message || "";
        if (content) history.push({ role: "assistant", content });
      }
    }
    return history;
  } catch (error) {
    console.error("Error getting Messenger history:", error);
    return [];
  }
}

// Generate AI response using live knowledge base
async function generateAIResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
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
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: userMessage }
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", response.status, errText);
      return "Sorry, I'm having technical issues. Please email hello@lunexomedia.com 📧";
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Please contact hello@lunexomedia.com";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, technical issues. Email hello@lunexomedia.com 🙏";
  }
}

// Send typing indicator
async function sendTypingIndicator(recipientId: string, action: "typing_on" | "typing_off"): Promise<void> {
  try {
    await fetch(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${META_PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: recipientId },
          sender_action: action,
        }),
      }
    );
  } catch (e) {
    console.error("Typing indicator error:", e);
  }
}

// Send Messenger message
async function sendMessengerMessage(recipientId: string, message: string): Promise<boolean> {
  try {
    console.log(`Sending Messenger to ${recipientId}: ${message.substring(0, 50)}...`);
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${META_PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text: message },
          messaging_type: "RESPONSE",
        }),
      }
    );

    const result = await response.json();
    console.log("Messenger response:", result);
    
    if (result.error) {
      console.error("Messenger API error:", result.error);
    }
    
    return response.ok && !result.error;
  } catch (error) {
    console.error("Error sending Messenger:", error);
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
    
    console.log("Messenger webhook verification:", { mode, token });
    
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Messenger webhook verified!");
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  // Handle incoming messages
  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("Messenger webhook received:", JSON.stringify(body));

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabaseClient = createClient(supabaseUrl, supabaseKey);

      if (body.object === "page") {
        for (const entry of body.entry || []) {
          for (const event of entry.messaging || []) {
            const senderId = event.sender?.id;
            const messageText = event.message?.text;

            // Skip echo messages (page's own outgoing messages)
            if (event.message?.is_echo) continue;

            if (senderId && messageText) {
              console.log(`Messenger from ${senderId}: ${messageText}`);

              // Show typing indicator
              await sendTypingIndicator(senderId, "typing_on");

              // Log received message
              await supabaseClient.from("visitor_activities").insert({
                activity_type: "messenger_message_received",
                metadata: {
                  sender_id: senderId,
                  message: messageText,
                  platform: "messenger",
                  timestamp: new Date().toISOString(),
                },
              });

              // Build live knowledge base + get history in parallel
              const [systemPrompt, history] = await Promise.all([
                buildKnowledgeBase(supabaseClient),
                getConversationHistory(supabaseClient, senderId),
              ]);

              // Generate AI response
              const aiResponse = await generateAIResponse(messageText, history, systemPrompt);

              // Stop typing
              await sendTypingIndicator(senderId, "typing_off");

              // Send response
              await sendMessengerMessage(senderId, aiResponse);

              // Log sent message
              await supabaseClient.from("visitor_activities").insert({
                activity_type: "messenger_message_sent",
                metadata: {
                  recipient_id: senderId,
                  message: aiResponse,
                  ai_response: aiResponse,
                  platform: "messenger",
                  timestamp: new Date().toISOString(),
                },
              });
            }
          }
        }
      }

      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    } catch (error) {
      console.error("Messenger webhook error:", error);
      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    }
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
};

serve(handler);
