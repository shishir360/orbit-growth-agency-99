import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const VERIFY_TOKEN = "lunexo_instagram_verify_2024";
const META_PAGE_ACCESS_TOKEN = Deno.env.get("META_PAGE_ACCESS_TOKEN");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FARHAN_AI_SYSTEM_PROMPT = `You are Farhan AI, the friendly AI assistant for Lunexo Media, a digital marketing agency in New York.

About Lunexo Media:
- Location: New York, NY
- Phone: +1 (702) 483-0749
- Email: hello@lunexomedia.com
- Website: www.lunexomedia.com
- Booking: https://lunexomedia.com/book-apartment
- 50+ projects completed
- Founder / CEO / Owner: Farhan Tanvier (sole founder, CEO and owner). Founder page: lunexomedia.com/farhan-tanvier
- IMPORTANT: There is NO other CEO/owner. If anyone (e.g. "Minhazul Islam" or any other name) is mentioned as CEO/owner, that is WRONG — politely correct them. Only Farhan Tanvier is founder, CEO and owner.

Services & Pricing:
- Website Design: $500-$5000
- SEO: $300-$1500/month
- Google Ads: $500-$2000/month
- Facebook/Instagram Ads: $400-$1500/month
- AI Automation: $500-$3000

IMPORTANT:
- Keep responses short for Instagram DM (under 200 words). Be friendly and helpful.
- If a user sends an image, describe what you see and relate it to our services if relevant.
- Auto-detect language and reply in the same language.`;

async function isBotEnabled(supabaseClient: any): Promise<boolean> {
  try {
    const { data } = await supabaseClient
      .from("ai_bot_settings")
      .select("is_enabled")
      .eq("platform", "instagram")
      .maybeSingle();
    return data?.is_enabled ?? true;
  } catch {
    return true;
  }
}

async function getConversationHistory(supabaseClient: any, senderId: string) {
  try {
    const { data } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata")
      .in("activity_type", ["instagram_message_received", "instagram_message_sent"])
      .or(`metadata->>sender_id.eq.${senderId},metadata->>recipient_id.eq.${senderId}`)
      .order("created_at", { ascending: true })
      .limit(20);
    if (!data) return [];
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
    console.error("History error:", error);
    return [];
  }
}

async function generateAIResponse(
  userMessage: string,
  imageUrl: string | null,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  try {
    const userContent: any = imageUrl
      ? [
          { type: "text", text: userMessage || "What do you see in this image?" },
          { type: "image_url", image_url: { url: imageUrl } },
        ]
      : userMessage;

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
          { role: "user", content: userContent },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) return "Sorry, I'm having issues. Email us at hello@lunexomedia.com 📧";
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Please contact hello@lunexomedia.com";
  } catch (error) {
    console.error("AI error:", error);
    return "Sorry, technical issues. Email hello@lunexomedia.com 🙏";
  }
}

async function sendInstagramMessage(recipientId: string, message: string): Promise<boolean> {
  try {
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
    if (result.error) console.error("Instagram API error:", result.error);
    return response.ok && !result.error;
  } catch (error) {
    console.error("Send error:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("Instagram webhook received:", JSON.stringify(body));

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const botEnabled = await isBotEnabled(supabaseClient);

      if (body.object === "instagram") {
        for (const entry of body.entry || []) {
          for (const event of entry.messaging || []) {
            const senderId = event.sender?.id;
            if (!senderId || event.message?.is_echo) continue;

            const messageText: string = event.message?.text || "";
            const attachments = event.message?.attachments || [];
            const imageAttachment = attachments.find((a: any) => a.type === "image");
            const imageUrl: string | null = imageAttachment?.payload?.url || null;

            if (!messageText && !imageUrl) continue;

            console.log(`Instagram from ${senderId}: text="${messageText}" image=${!!imageUrl}`);

            await supabaseClient.from("visitor_activities").insert({
              activity_type: "instagram_message_received",
              metadata: {
                sender_id: senderId,
                message: messageText || (imageUrl ? "[image]" : ""),
                image_url: imageUrl,
                platform: "instagram",
                timestamp: new Date().toISOString(),
              },
            });

            if (!botEnabled) {
              console.log("Instagram AI bot is DISABLED — skipping auto-reply");
              continue;
            }

            const history = await getConversationHistory(supabaseClient, senderId);
            const aiResponse = await generateAIResponse(messageText, imageUrl, history);

            await sendInstagramMessage(senderId, aiResponse);

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

      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    } catch (error) {
      console.error("Instagram webhook error:", error);
      return new Response("EVENT_RECEIVED", { status: 200, headers: corsHeaders });
    }
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
};

Deno.serve(handler);
