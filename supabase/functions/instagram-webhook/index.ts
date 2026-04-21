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
- Auto-detect language and reply in the same language.

=== SENDING IMAGES FROM lunexomedia.com ===
You can send images from the lunexomedia.com website (portfolio, blog, founder photo, logos, screenshots).
WHEN user explicitly asks for a picture/photo/logo (e.g. "show your logo", "Farhan er chobi dao", "send portfolio sample"), respond with this marker FIRST, then your caption:
[SEND_IMAGE: <2-4 search keywords>]
Your friendly caption.

Examples:
- "show logo" → [SEND_IMAGE: lunexo logo]\nHere's our logo! ✨
- "Farhan chobi" → [SEND_IMAGE: farhan tanvier founder]\nThis is Farhan, our CEO! 😊

ONLY use [SEND_IMAGE: ...] when user EXPLICITLY asks for an image. Never invent.`;

// ============= WEBSITE IMAGE LIBRARY =============
async function findWebsiteImage(
  supabaseClient: any,
  query: string
): Promise<{ url: string; caption: string } | null> {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);
  const ilikeAny = (col: string) => tokens.map((t) => `${col}.ilike.%${t}%`).join(",");
  try {
    const { data: portfolio } = await supabaseClient
      .from("portfolio").select("title, image_url, description").eq("published", true)
      .not("image_url", "is", null)
      .or(`${ilikeAny("title")},${ilikeAny("description")},${ilikeAny("category")}`).limit(1);
    if (portfolio?.[0]?.image_url) return { url: portfolio[0].image_url, caption: portfolio[0].title };

    const { data: blog } = await supabaseClient
      .from("blog_posts").select("title, image_url").eq("published", true)
      .not("image_url", "is", null)
      .or(`${ilikeAny("title")},${ilikeAny("excerpt")}`).limit(1);
    if (blog?.[0]?.image_url) return { url: blog[0].image_url, caption: blog[0].title };

    const { data: testimonials } = await supabaseClient
      .from("testimonials").select("author, company, image_url")
      .not("image_url", "is", null)
      .or(`${ilikeAny("author")},${ilikeAny("company")}`).limit(1);
    if (testimonials?.[0]?.image_url)
      return { url: testimonials[0].image_url, caption: `${testimonials[0].author} — ${testimonials[0].company}` };

    const { data: clients } = await supabaseClient
      .from("completed_clients").select("name, logo_url").or(ilikeAny("name")).limit(1);
    if (clients?.[0]?.logo_url) return { url: clients[0].logo_url, caption: clients[0].name };

    const { data: feedback } = await supabaseClient
      .from("client_feedback_screenshots").select("title, image_url, client_name").eq("visible", true)
      .or(`${ilikeAny("title")},${ilikeAny("client_name")},${ilikeAny("category")}`).limit(1);
    if (feedback?.[0]?.image_url) return { url: feedback[0].image_url, caption: feedback[0].title };

    const { data: images } = await supabaseClient
      .from("images").select("name, url").or(ilikeAny("name")).limit(1);
    if (images?.[0]?.url) return { url: images[0].url, caption: images[0].name };

    if (q.includes("logo") || q.includes("lunexo")) {
      const { data: company } = await supabaseClient.from("company_info").select("logo, company_name").maybeSingle();
      if (company?.logo) return { url: company.logo, caption: company.company_name || "Lunexo Media" };
    }
  } catch (e) { console.error("Image search error:", e); }
  return null;
}

function parseImageMarker(text: string): { query: string | null; cleanText: string } {
  const m = text.match(/\[SEND_IMAGE:\s*([^\]]+)\]/i);
  if (!m) return { query: null, cleanText: text };
  return { query: m[1].trim(), cleanText: text.replace(m[0], "").trim() };
}

async function sendInstagramImage(recipientId: string, imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${META_PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { attachment: { type: "image", payload: { url: imageUrl, is_reusable: true } } },
          messaging_type: "RESPONSE",
        }),
      }
    );
    const r = await response.json();
    if (r.error) console.error("Instagram image error:", r.error);
    return response.ok && !r.error;
  } catch (e) { console.error("Send IG image error:", e); return false; }
}

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

            // Check for [SEND_IMAGE: ...] marker
            const { query: imgQuery, cleanText } = parseImageMarker(aiResponse);
            if (imgQuery) {
              const found = await findWebsiteImage(supabaseClient, imgQuery);
              if (found) {
                await sendInstagramImage(senderId, found.url);
                if (cleanText) await sendInstagramMessage(senderId, cleanText);
                else await sendInstagramMessage(senderId, found.caption);
                aiResponse = (cleanText || found.caption) + ` [image:${found.url}]`;
              } else {
                await sendInstagramMessage(senderId, cleanText || "Sorry, I couldn't find that image on lunexomedia.com 🙏");
              }
            } else {
              await sendInstagramMessage(senderId, aiResponse);
            }

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
