import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "lunexo_whatsapp_verify_2024";
const META_ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
const META_PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_WHATSAPP_NUMBER = Deno.env.get("ADMIN_WHATSAPP_NUMBER") || "8801743988856";

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingState {
  step: number;
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  platform?: string;
  service?: string;
}

// Get booking state from database
async function getBookingState(supabaseClient: any, phone: string): Promise<BookingState> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("metadata")
      .eq("activity_type", "whatsapp_booking_state")
      .eq("metadata->>phone", phone)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return { step: 0 };
    }

    return data[0].metadata?.booking_state || { step: 0 };
  } catch (error) {
    console.error("Error getting booking state:", error);
    return { step: 0 };
  }
}

// Save booking state to database
async function saveBookingState(supabaseClient: any, phone: string, state: BookingState): Promise<void> {
  try {
    await supabaseClient.from("visitor_activities").insert({
      activity_type: "whatsapp_booking_state",
      metadata: {
        phone: phone,
        booking_state: state,
        updated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving booking state:", error);
  }
}

// Clear booking state
async function clearBookingState(supabaseClient: any, phone: string): Promise<void> {
  try {
    await supabaseClient
      .from("visitor_activities")
      .delete()
      .eq("activity_type", "whatsapp_booking_state")
      .eq("metadata->>phone", phone);
  } catch (error) {
    console.error("Error clearing booking state:", error);
  }
}

// Build dynamic Lunexo Media knowledge base from live database
async function buildKnowledgeBase(supabaseClient: any): Promise<string> {
  try {
    const [pricingRes, servicesRes, portfolioRes, blogRes, companyRes] = await Promise.all([
      supabaseClient.from("pricing").select("service_name, price, currency, billing_period, features").eq("visible", true).order("display_order"),
      supabaseClient.from("services").select("title, description, page_url").eq("visible", true).order("display_order"),
      supabaseClient.from("portfolio").select("title, category, description, slug").eq("published", true).eq("blocked", false).limit(8),
      supabaseClient.from("blog_posts").select("title, excerpt, slug").eq("published", true).eq("blocked", false).order("publish_date", { ascending: false }).limit(5),
      supabaseClient.from("company_info").select("*").limit(1).maybeSingle(),
    ]);

    const company = companyRes?.data;
    const pricing = pricingRes?.data || [];
    const services = servicesRes?.data || [];
    const portfolio = portfolioRes?.data || [];
    const blog = blogRes?.data || [];

    let kb = `=== LUNEXO MEDIA — LIVE COMPANY DATA ===\n`;
    kb += `Name: ${company?.company_name || "Lunexo Media"}\n`;
    kb += `Tagline: ${company?.tagline || "Premium Web, Ads & AI Automation Agency"}\n`;
    kb += `Location: ${company?.address || "New York, NY"}\n`;
    kb += `Phone: ${company?.phone || "+1 (702) 483-0749"}\n`;
    kb += `Email: ${company?.email || "hello@lunexomedia.com"}\n`;
    kb += `Website: lunexomedia.com\n`;
    kb += `Booking link: lunexomedia.com/book-apartment\n`;
    kb += `Founded: ${company?.founded_year || "2023"} | Team: ${company?.team_size || "5-10"} | 50+ projects done\n`;
    kb += `Founder / CEO / Owner: Farhan Tanvier (sole founder, CEO and owner of Lunexo Media). Founder page: lunexomedia.com/farhan-tanvier\n`;
    kb += `IMPORTANT: There is NO other CEO/owner. If anyone (e.g. "Minhazul Islam" or any other name) is mentioned as CEO/owner, that is WRONG — correct them politely. Only Farhan Tanvier is the founder, CEO and owner.\n\n`;

    if (services.length) {
      kb += `=== SERVICES ===\n`;
      services.forEach((s: any) => { kb += `• ${s.title}: ${s.description}\n`; });
      kb += `\n`;
    }

    if (pricing.length) {
      kb += `=== LIVE PRICING ===\n`;
      pricing.forEach((p: any) => {
        const period = p.billing_period ? `/${p.billing_period}` : "";
        kb += `• ${p.service_name}: ${p.currency || "$"}${p.price}${period}\n`;
        if (p.features?.length) kb += `   Includes: ${p.features.slice(0, 3).join(", ")}\n`;
      });
      kb += `\n`;
    }

    if (portfolio.length) {
      kb += `=== RECENT PORTFOLIO PROJECTS ===\n`;
      portfolio.forEach((p: any) => { kb += `• ${p.title} (${p.category}): ${p.description?.substring(0, 100)} → lunexomedia.com/portfolio/${p.slug}\n`; });
      kb += `\n`;
    }

    if (blog.length) {
      kb += `=== LATEST BLOG POSTS ===\n`;
      blog.forEach((b: any) => { kb += `• ${b.title} → lunexomedia.com/blog/${b.slug}\n`; });
      kb += `\n`;
    }

    return kb;
  } catch (e) {
    console.error("KB build error:", e);
    return "Lunexo Media — NYC digital agency. Phone: +1 (702) 483-0749. Email: hello@lunexomedia.com";
  }
}

// Build Farhan AI system prompt with live data
function buildSystemPrompt(knowledgeBase: string, customerName: string): string {
  return `You are Farhan AI — the brilliant, friendly, super-intelligent assistant of Lunexo Media (digital marketing agency in New York). You are talking to ${customerName} on WhatsApp.

${knowledgeBase}

=== YOUR PERSONALITY ===
- Warm, confident, genuinely helpful — like a smart friend who happens to be an expert
- Remember EVERYTHING the user said earlier in this conversation (it's in the history)
- Use the customer's name naturally when it feels right
- Match the user's language: if they write Bengali/Banglish → reply Bengali/Banglish; English → English; Hinglish → Hinglish
- Use emojis sparingly but warmly (1-2 per message max) ✨

=== YOUR INTELLIGENCE ===
You can answer ANY question — not just about Lunexo:
1. Lunexo services, pricing, portfolio, blog → use the LIVE DATA above
2. General knowledge: tech, business, marketing, life advice, coding, anything → answer it
3. Industry expertise: SEO, web design, ads, AI, automation → give pro-level insights
4. Casual chat / jokes / emotional support → be human and warm
5. If the question is about a competitor or sensitive topic → be neutral and pivot back to how Lunexo can help

=== SALES INSTINCT (subtle, never pushy) ===
- If the user shows ANY business intent (their site, their ads, their growth), naturally suggest a free discovery call
- To start booking, the user just needs to type "book a call" or click the button
- Never invent prices not in the LIVE PRICING above — if asked about something not listed, say "Custom quote — let's hop on a quick call"

=== FORMATTING (WhatsApp) ===
- Keep replies SHORT: 2-4 sentences ideally, max 200 words
- Use *bold* (single asterisks) for emphasis — that's WhatsApp markdown
- Plain URLs only: write "lunexomedia.com/contact" — NEVER [text](url)
- Use line breaks for readability
- Bullet points with • when listing 3+ items

=== SENDING IMAGES FROM lunexomedia.com ===
You can send images that exist on the lunexomedia.com website (portfolio screenshots, blog covers, team/founder photos, client logos, feedback screenshots, company logo).
WHEN the user asks for an image (e.g. "show me Farhan's photo", "send your logo", "show portfolio of [project]", "amer chobi dekhao"), respond with a special marker on its OWN line FIRST, then your text caption:
[SEND_IMAGE: <2-4 search keywords>]
Your friendly caption text here.

Examples:
- User: "show me your logo" → [SEND_IMAGE: lunexo logo]\nHere's our official logo! ✨
- User: "Farhan er chobi dao" → [SEND_IMAGE: farhan tanvier founder]\nThis is Farhan, our founder & CEO! 😊
- User: "show me a portfolio sample" → [SEND_IMAGE: portfolio website]\nHere's one of our recent projects!

ONLY use [SEND_IMAGE: ...] if the user EXPLICITLY asks for a picture/photo/image/logo/screenshot. Never invent images. If no relevant image exists, just reply with text and apologize.

=== MEMORY ===
The conversation history below shows everything ${customerName} has said before. Reference it naturally. If they told you their business name, their problem, their budget — REMEMBER it and use it.`;
}

// Simple email regex
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// AI-powered field validation. Returns { valid, normalized, reason }
async function validateBookingField(
  field: "name" | "date" | "time" | "platform" | "service",
  userInput: string
): Promise<{ valid: boolean; normalized: string; reason: string }> {
  const rules: Record<string, string> = {
    name: `A real human full name. At least 2 characters. Reject gibberish, random letters, sentences, questions, or non-name text like "ok how are you". Accept names in any language/script.`,
    date: `A real future-friendly date hint. Accept: "today", "tomorrow", weekday names ("monday"), or formats like "Dec 15", "15/12", "2025-12-15", "next friday". Reject random text, single letters, or unrelated words. Normalize to a clean date string (keep user's wording if natural).`,
    time: `A real time of day. Accept "3pm", "3:00 PM EST", "15:00", "morning", "afternoon", "evening". Must include a number OR a clear time word. Reject random text.`,
    platform: `Must clearly indicate one of: Zoom, Google Meet, or Phone Call. Accept synonyms ("meet","gmeet","call","phone","zoom"). Normalize to exactly "Zoom", "Google Meet", or "Phone Call".`,
    service: `Should indicate a service interest: Website Design, SEO, Google/Facebook Ads, AI Automation, or Other. Accept free-form descriptions of business needs. Normalize to a short clean label.`,
  };

  try {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You validate a single booking-form field. Field: "${field}". Rule: ${rules[field]}
Respond ONLY with strict JSON: {"valid": boolean, "normalized": string, "reason": string}
- "valid": true only if input clearly satisfies the rule.
- "normalized": cleaned/standardized version of the input (or "" if invalid).
- "reason": short friendly reason (used only if invalid). Match user's language if obvious.`,
          },
          { role: "user", content: userInput },
        ],
        max_tokens: 150,
      }),
    });

    if (!resp.ok) {
      // Fallback: accept anything non-empty (don't block user)
      return { valid: userInput.trim().length >= 2, normalized: userInput.trim(), reason: "" };
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { valid: userInput.trim().length >= 2, normalized: userInput.trim(), reason: "" };
    }
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      valid: !!parsed.valid,
      normalized: parsed.normalized || userInput.trim(),
      reason: parsed.reason || "That doesn't look right. Please try again.",
    };
  } catch (e) {
    console.error(`validateBookingField(${field}) error:`, e);
    return { valid: userInput.trim().length >= 2, normalized: userInput.trim(), reason: "" };
  }
}

// Get booking step question
function getBookingQuestion(step: number, state: BookingState): string {
  switch(step) {
    case 1:
      return `Great! Let's book your free discovery call! 🎉

What's your *full name*?`;
    case 2:
      return `Thanks, ${state.name}! 📧

What's your *email address*?`;
    case 3:
      return `Perfect! 📅

What *date* would you like?
(Example: Tomorrow, Monday, Dec 15)`;
    case 4:
      return `Got it! ⏰

What *time* works for you?
(Include timezone - e.g., 3pm EST)`;
    case 5:
      return `Almost done! 💻

Which platform do you prefer?
• Zoom
• Google Meet
• Phone Call`;
    case 6:
      return `Last one! 🎯

Which service interests you?
• Website Design
• SEO
• Google/Facebook Ads
• AI Automation
• Other`;
    default:
      return "";
  }
}

// Send booking confirmation email
async function sendBookingConfirmationEmail(bookingData: BookingState, phoneNumber: string): Promise<boolean> {
  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return false;
    }

    await resend.emails.send({
      from: "Lunexo Media <hello@lunexomedia.com>",
      to: [bookingData.email!],
      subject: "🎉 Your Discovery Call is Confirmed - Lunexo Media",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0f; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #6366f1; }
            .card { background: #1a1a2e; border: 1px solid #6366f1; border-radius: 16px; padding: 30px; }
            .title { font-size: 24px; margin-bottom: 20px; }
            .detail { margin: 12px 0; padding: 12px; background: #0a0a0f; border-radius: 8px; }
            .label { color: #a1a1aa; font-size: 12px; text-transform: uppercase; }
            .value { color: #ffffff; font-size: 16px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #71717a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><div class="logo">Lunexo Media</div></div>
            <div class="card">
              <div class="title">🎉 Your Call is Confirmed!</div>
              <p>Hi ${bookingData.name},</p>
              <p>Thank you for booking a discovery call!</p>
              <div class="detail"><div class="label">📅 Date</div><div class="value">${bookingData.date}</div></div>
              <div class="detail"><div class="label">⏰ Time</div><div class="value">${bookingData.time}</div></div>
              <div class="detail"><div class="label">💻 Platform</div><div class="value">${bookingData.platform}</div></div>
              <div class="detail"><div class="label">🎯 Interest</div><div class="value">${bookingData.service}</div></div>
              <p>We'll send you the meeting link before the call!</p>
            </div>
            <div class="footer">
              <p>Lunexo Media | New York, NY</p>
              <p>📞 +1 (702) 483-0749 | ✉️ hello@lunexomedia.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    await resend.emails.send({
      from: "Lunexo Media <hello@lunexomedia.com>",
      to: ["hello@lunexomedia.com"],
      subject: `📅 New WhatsApp Booking: ${bookingData.name}`,
      html: `
        <h2>New Booking from WhatsApp</h2>
        <p><strong>Name:</strong> ${bookingData.name}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Date:</strong> ${bookingData.date}</p>
        <p><strong>Time:</strong> ${bookingData.time}</p>
        <p><strong>Platform:</strong> ${bookingData.platform}</p>
        <p><strong>Service:</strong> ${bookingData.service}</p>
        <p><strong>Source:</strong> WhatsApp</p>
      `,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

// Send WhatsApp notification to admin
async function sendAdminWhatsAppNotification(bookingData: BookingState, customerPhone: string): Promise<boolean> {
  try {
    const adminMessage = `📅 *নতুন বুকিং - WhatsApp থেকে!*

👤 *নাম:* ${bookingData.name}
📧 *ইমেইল:* ${bookingData.email}
📞 *ফোন:* ${customerPhone}
📅 *তারিখ:* ${bookingData.date}
⏰ *সময়:* ${bookingData.time}
💻 *প্ল্যাটফর্ম:* ${bookingData.platform}
🎯 *সার্ভিস:* ${bookingData.service}

✅ বুকিং কনফার্ম হয়েছে!`;

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
          to: ADMIN_WHATSAPP_NUMBER,
          type: "text",
          text: { body: adminMessage },
        }),
      }
    );

    const result = await response.json();
    console.log("Admin WhatsApp notification sent:", result);
    return response.ok;
  } catch (error) {
    console.error("Error sending admin WhatsApp:", error);
    return false;
  }
}

// Create booking in database
async function createBooking(supabaseClient: any, state: BookingState, phoneNumber: string): Promise<boolean> {
  try {
    console.log("Creating booking:", state);
    
    const { error } = await supabaseClient.from("apartment_bookings").insert({
      name: state.name,
      email: state.email,
      phone: phoneNumber,
      date: state.date,
      time: state.time,
      meeting_platform: state.platform,
      notes: `Service Interest: ${state.service}. Booked via WhatsApp.`,
      source: "whatsapp",
      status: "pending",
    });
    
    if (error) {
      console.error("Error creating booking:", error);
      return false;
    }
    
    // Send email confirmations
    await sendBookingConfirmationEmail(state, phoneNumber);
    
    // Send WhatsApp notification to admin
    await sendAdminWhatsAppNotification(state, phoneNumber);
    
    console.log("Booking created with all notifications sent!");
    return true;
  } catch (error) {
    console.error("Error in createBooking:", error);
    return false;
  }
}

// Get conversation history (deep memory: last 50 messages)
async function getConversationHistory(supabaseClient: any, phoneNumber: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata, created_at")
      .in("activity_type", ["whatsapp_message_received", "whatsapp_message_sent"])
      .or(`metadata->>from.eq.${phoneNumber},metadata->>to.eq.${phoneNumber}`)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return [];

    // Reverse to chronological order
    const ordered = data.reverse();
    const history: Array<{ role: string; content: string }> = [];
    for (const msg of ordered) {
      if (msg.activity_type === "whatsapp_message_received") {
        const content = msg.metadata?.message || "";
        if (content) history.push({ role: "user", content });
      } else if (msg.activity_type === "whatsapp_message_sent") {
        const content = msg.metadata?.ai_response || msg.metadata?.message || "";
        if (content) history.push({ role: "assistant", content });
      }
    }
    return history;
  } catch (error) {
    console.error("Error getting history:", error);
    return [];
  }
}

// Analyze image
async function analyzeImage(mediaId: string): Promise<string> {
  try {
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${mediaId}`,
      { headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}` } }
    );
    if (!mediaResponse.ok) return "";

    const mediaData = await mediaResponse.json();
    const imageResponse = await fetch(mediaData.url, {
      headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}` },
    });
    if (!imageResponse.ok) return "";

    const imageBuffer = await imageResponse.arrayBuffer();
    const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
    
    const analyzeResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Analyze this image briefly. Keep response under 150 words." },
          { role: "user", content: [
            { type: "text", text: "Analyze this image:" },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]}
        ],
        max_tokens: 400,
      }),
    });

    if (!analyzeResponse.ok) return "";
    const data = await analyzeResponse.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "";
  }
}

// Generate AI response with live knowledge + deep memory
async function generateAIResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>,
  systemPrompt: string,
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
        max_tokens: 700,
      }),
    });

    if (response.status === 429) return "I'm getting too many messages right now 😅 Please try again in a moment!";
    if (response.status === 402) return "Hey! I'm temporarily offline. Please call +1 (702) 483-0749 📞";
    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return "Sorry, I'm having a small hiccup. Call +1 (702) 483-0749 📞 or email hello@lunexomedia.com";
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Could you rephrase that? I want to help! 🙏";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, technical issues. Call +1 (702) 483-0749 🙏";
  }
}

// ============= WEBSITE IMAGE LIBRARY =============
// Search images across all lunexomedia.com tables
async function findWebsiteImage(
  supabaseClient: any,
  query: string
): Promise<{ url: string; caption: string } | null> {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);
  const ilikeAny = (col: string) => tokens.map((t) => `${col}.ilike.%${t}%`).join(",");

  try {
    // 1. Portfolio (project images)
    const { data: portfolio } = await supabaseClient
      .from("portfolio")
      .select("title, image_url, description")
      .eq("published", true)
      .not("image_url", "is", null)
      .or(`${ilikeAny("title")},${ilikeAny("description")},${ilikeAny("category")}`)
      .limit(1);
    if (portfolio?.[0]?.image_url) return { url: portfolio[0].image_url, caption: portfolio[0].title };

    // 2. Blog posts
    const { data: blog } = await supabaseClient
      .from("blog_posts")
      .select("title, image_url")
      .eq("published", true)
      .not("image_url", "is", null)
      .or(`${ilikeAny("title")},${ilikeAny("excerpt")}`)
      .limit(1);
    if (blog?.[0]?.image_url) return { url: blog[0].image_url, caption: blog[0].title };

    // 3. Testimonials (people/avatars)
    const { data: testimonials } = await supabaseClient
      .from("testimonials")
      .select("author, company, image_url")
      .not("image_url", "is", null)
      .or(`${ilikeAny("author")},${ilikeAny("company")}`)
      .limit(1);
    if (testimonials?.[0]?.image_url)
      return { url: testimonials[0].image_url, caption: `${testimonials[0].author} — ${testimonials[0].company}` };

    // 4. Completed clients (logos)
    const { data: clients } = await supabaseClient
      .from("completed_clients")
      .select("name, logo_url")
      .or(ilikeAny("name"))
      .limit(1);
    if (clients?.[0]?.logo_url) return { url: clients[0].logo_url, caption: clients[0].name };

    // 5. Feedback screenshots
    const { data: feedback } = await supabaseClient
      .from("client_feedback_screenshots")
      .select("title, image_url, client_name")
      .eq("visible", true)
      .or(`${ilikeAny("title")},${ilikeAny("client_name")},${ilikeAny("category")}`)
      .limit(1);
    if (feedback?.[0]?.image_url) return { url: feedback[0].image_url, caption: feedback[0].title };

    // 6. Generic uploaded images
    const { data: images } = await supabaseClient
      .from("images")
      .select("name, url")
      .or(ilikeAny("name"))
      .limit(1);
    if (images?.[0]?.url) return { url: images[0].url, caption: images[0].name };

    // 7. Company logo fallback for "logo"/"lunexo"
    if (q.includes("logo") || q.includes("lunexo")) {
      const { data: company } = await supabaseClient.from("company_info").select("logo, company_name").maybeSingle();
      if (company?.logo) return { url: company.logo, caption: company.company_name || "Lunexo Media" };
    }
  } catch (e) {
    console.error("Image search error:", e);
  }
  return null;
}

// Parse AI response for [SEND_IMAGE: query] marker — returns { query, cleanText }
function parseImageMarker(text: string): { query: string | null; cleanText: string } {
  const m = text.match(/\[SEND_IMAGE:\s*([^\]]+)\]/i);
  if (!m) return { query: null, cleanText: text };
  return { query: m[1].trim(), cleanText: text.replace(m[0], "").trim() };
}

// Send WhatsApp image
async function sendWhatsAppImage(to: string, imageUrl: string, caption: string): Promise<boolean> {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${META_PHONE_ID}/messages`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "image",
        image: { link: imageUrl, caption: caption.substring(0, 1024) },
      }),
    });
    const r = await response.json();
    console.log("WhatsApp image send:", r);
    return response.ok;
  } catch (e) {
    console.error("Send image error:", e);
    return false;
  }
}

// Send WhatsApp message
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  try {
    console.log(`Sending to ${to}: ${message.substring(0, 50)}...`);
    
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

    const result = await response.json();
    console.log("WhatsApp response:", result);
    return response.ok;
  } catch (error) {
    console.error("Error sending WhatsApp:", error);
    return false;
  }
}

// Send with buttons
async function sendWhatsAppWithButtons(to: string, message: string, buttons: Array<{ id: string; title: string }>): Promise<boolean> {
  try {
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
            body: { text: message },
            action: {
              buttons: buttons.map(btn => ({
                type: "reply",
                reply: { id: btn.id, title: btn.title.substring(0, 20) },
              })),
            },
          },
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error sending with buttons:", error);
    return false;
  }
}

function isBookingRequest(message: string): boolean {
  const triggers = ["book", "schedule", "appointment", "call", "meet", "book_call"];
  return triggers.some(t => message.toLowerCase().includes(t));
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200, headers: corsHeaders });
    }
    return new Response("Forbidden", { status: 403, headers: corsHeaders });
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("=== WhatsApp Webhook ===");

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      
      if (value?.messages) {
        for (const message of value.messages) {
          const from = message.from;
          const messageType = message.type;
          const contact = value.contacts?.[0];
          const customerName = contact?.profile?.name || "Unknown";

          let messageText = "";
          let isImageMessage = false;
          let imageAnalysis = "";

          if (messageType === "text") {
            messageText = message.text?.body || "";
          } else if (messageType === "image") {
            isImageMessage = true;
            const mediaId = message.image?.id;
            const caption = message.image?.caption || "";
            if (mediaId) {
              imageAnalysis = await analyzeImage(mediaId);
              messageText = caption || "[Image]";
            }
          } else if (messageType === "interactive") {
            messageText = message.interactive?.button_reply?.title || 
                         message.interactive?.button_reply?.id || "";
          }

          console.log(`From ${customerName} (${from}): ${messageText}`);

          // Log incoming
          await supabaseClient.from("visitor_activities").insert({
            activity_type: "whatsapp_message_received",
            metadata: {
              from, name: customerName, message: messageText, type: messageType,
              is_image: isImageMessage, image_analysis: imageAnalysis,
            },
          });

          if (!messageText) continue;

          // Check if WhatsApp AI bot is enabled (admin toggle)
          const { data: botSetting } = await supabaseClient
            .from("ai_bot_settings")
            .select("is_enabled")
            .eq("platform", "whatsapp")
            .maybeSingle();
          if (botSetting && botSetting.is_enabled === false) {
            console.log("WhatsApp AI bot is DISABLED — skipping auto-reply");
            continue;
          }

          // Get current booking state from database
          let state = await getBookingState(supabaseClient, from);
          let aiResponse = "";
          let bookingCreated = false;

          console.log(`Current booking state for ${from}:`, state);

          // Process based on state
          if (state.step > 0) {
            // We're in booking flow - process the answer
            const answer = messageText.trim();
            
            switch(state.step) {
              case 1: { // Waiting for name
                const v = await validateBookingField("name", answer);
                if (v.valid) {
                  state.name = v.normalized;
                  state.step = 2;
                  aiResponse = getBookingQuestion(2, state);
                } else {
                  aiResponse = `${v.reason}\n\nPlease enter your *full name* (e.g. "John Smith"):`;
                }
                break;
              }

              case 2: // Waiting for email
                if (isValidEmail(answer)) {
                  state.email = answer.toLowerCase().trim();
                  state.step = 3;
                  aiResponse = getBookingQuestion(3, state);
                } else {
                  aiResponse = "That email doesn't look valid. Please send a real email like *yourname@example.com*:";
                }
                break;

              case 3: { // Waiting for date
                const v = await validateBookingField("date", answer);
                if (v.valid) {
                  state.date = v.normalized;
                  state.step = 4;
                  aiResponse = getBookingQuestion(4, state);
                } else {
                  aiResponse = `${v.reason}\n\nPlease send a *date* (e.g. "tomorrow", "Monday", "Dec 15"):`;
                }
                break;
              }

              case 4: { // Waiting for time
                const v = await validateBookingField("time", answer);
                if (v.valid) {
                  state.time = v.normalized;
                  state.step = 5;
                  aiResponse = getBookingQuestion(5, state);
                } else {
                  aiResponse = `${v.reason}\n\nPlease send a *time* (e.g. "3pm EST", "10:30 AM"):`;
                }
                break;
              }

              case 5: { // Waiting for platform
                const v = await validateBookingField("platform", answer);
                if (v.valid) {
                  state.platform = v.normalized;
                  state.step = 6;
                  aiResponse = getBookingQuestion(6, state);
                } else {
                  aiResponse = `${v.reason}\n\nPlease pick one: *Zoom*, *Google Meet*, or *Phone Call*:`;
                }
                break;
              }

              case 6: { // Waiting for service
                const v = await validateBookingField("service", answer);
                if (!v.valid) {
                  aiResponse = `${v.reason}\n\nWhich service interests you? (Website Design / SEO / Ads / AI Automation / Other)`;
                  break;
                }
                state.service = v.normalized;

                // Create booking!
                const created = await createBooking(supabaseClient, state, from);
                if (created) {
                  bookingCreated = true;
                  aiResponse = `✅ *Booking Confirmed!*

Thank you, ${state.name}! 🎉

📅 *Date:* ${state.date}
⏰ *Time:* ${state.time}
💻 *Platform:* ${state.platform}
🎯 *Service:* ${state.service}

📧 Confirmation sent to ${state.email}

We look forward to speaking with you! 🚀`;
                } else {
                  aiResponse = "Sorry, there was an error. Please call +1 (702) 483-0749";
                }

                // Clear state after booking
                await clearBookingState(supabaseClient, from);
                state.step = 0;
                break;
              }
            }
            
            // Save updated state if still in flow
            if (state.step > 0) {
              await saveBookingState(supabaseClient, from, state);
            }
          }
          // Check if user wants to start booking
          else if (isBookingRequest(messageText)) {
            state = { step: 1 };
            await saveBookingState(supabaseClient, from, state);
            aiResponse = getBookingQuestion(1, state);
          }
          // Handle image — let AI respond intelligently using analysis
          else if (isImageMessage && imageAnalysis) {
            const history = await getConversationHistory(supabaseClient, from);
            const knowledgeBase = await buildKnowledgeBase(supabaseClient);
            const systemPrompt = buildSystemPrompt(knowledgeBase, customerName);
            const imageContext = `[User sent an image. Image analysis: ${imageAnalysis}]\n\nUser's caption/message: ${messageText}`;
            aiResponse = await generateAIResponse(imageContext, history, systemPrompt);
          }
          // Regular AI chat — full memory + live knowledge
          else {
            const history = await getConversationHistory(supabaseClient, from);
            const knowledgeBase = await buildKnowledgeBase(supabaseClient);
            const systemPrompt = buildSystemPrompt(knowledgeBase, customerName);
            aiResponse = await generateAIResponse(messageText, history, systemPrompt);
          }

          // Check for [SEND_IMAGE: ...] marker from AI
          const { query: imgQuery, cleanText } = parseImageMarker(aiResponse);
          if (imgQuery) {
            const found = await findWebsiteImage(supabaseClient, imgQuery);
            if (found) {
              await sendWhatsAppImage(from, found.url, cleanText || found.caption);
              aiResponse = cleanText || `Sent: ${found.caption}`;
              await supabaseClient.from("visitor_activities").insert({
                activity_type: "whatsapp_message_sent",
                metadata: {
                  to: from, name: customerName, original_message: messageText,
                  ai_response: aiResponse, sent_image_url: found.url,
                  is_ai_response: true, booking_created: bookingCreated, booking_step: state.step,
                },
              });
              continue;
            } else {
              aiResponse = cleanText || "Sorry, I couldn't find that image on our website 🙏 Visit lunexomedia.com to browse.";
            }
          }

          // Send response
          let sent = false;
          if (state.step === 0 && !bookingCreated) {
            const isGreeting = ["hi", "hello", "hey", "help"].some(w => messageText.toLowerCase().includes(w));
            if (isGreeting) {
              sent = await sendWhatsAppWithButtons(from, aiResponse, [
                { id: "book_call", title: "📞 Book a Call" },
                { id: "services", title: "🚀 Services" },
                { id: "pricing", title: "💰 Pricing" },
              ]);
            }
          }
          
          if (!sent) {
            sent = await sendWhatsAppMessage(from, aiResponse);
          }

          // Log outgoing
          await supabaseClient.from("visitor_activities").insert({
            activity_type: "whatsapp_message_sent",
            metadata: {
              to: from, name: customerName, original_message: messageText,
              ai_response: aiResponse, sent_successfully: sent,
              is_ai_response: true, booking_created: bookingCreated, booking_step: state.step,
            },
          });
        }
      }

      if (value?.statuses) {
        for (const status of value.statuses) {
          const recipient = status.recipient_id || status.recipient || "";
          const ts = status.timestamp ? new Date(Number(status.timestamp) * 1000).toISOString() : "";
          const errors = status.errors || status.error || null;

          console.log(
            `Status: ${status.id} - ${status.status}` +
              (recipient ? ` | to: ${recipient}` : "") +
              (ts ? ` | at: ${ts}` : "")
          );

          if (status.status === "failed" && errors) {
            console.log("Status failed details:", JSON.stringify(errors));
          }
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    } catch (error: any) {
      console.error("Webhook error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
};

serve(handler);
