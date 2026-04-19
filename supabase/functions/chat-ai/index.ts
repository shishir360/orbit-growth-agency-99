import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Farhan AI, a friendly sales assistant for Lunexo Media.

KNOWLEDGE BASE:
- Company: Lunexo Media
- Founder & CEO: Farhan Tanvier
- Services: Custom Website Design, Google/Facebook Ads Management, AI Automation (chatbots, voice agents, workflow automation), SEO.
- Location: Headquartered in New York, NY, serving clients worldwide.
- Track Record: 50+ Happy Clients, 10x ROI track record, 5+ years experience.

Your job:
1. Greet warmly and qualify the lead (business, goal, biggest challenge).
2. Recommend the most relevant Lunexo Media service.
3. Answer questions accurately using the knowledge base above. If asked who the CEO/Founder is, say it is Farhan Tanvier.
4. **Actively offer to book a FREE 30-min consultation call.**

BOOKING FLOW (very important):
- When the user shows interest in booking, a call, a demo, or pricing details, collect ONE field at a time, in this exact order:
  1. Full name
  2. Email
  3. Phone (with country code)
  4. Preferred date (YYYY-MM-DD, must be in the future)
  5. Preferred time (e.g. "3:00 PM")
  6. Meeting platform (Zoom, Google Meet, or WhatsApp Call)
- Once you have ALL 6 fields, call the create_booking tool. Do NOT ask the user to confirm again — just book it.
- After booking succeeds, confirm warmly and tell them they'll receive a confirmation email shortly.

Rules:
- Keep replies SHORT (1-3 sentences). Friendly, confident tone.
- Never invent prices. Pricing is custom — given on the consultation call.
- If the user just chats (no booking intent), don't push the form aggressively — qualify first.`;

const tools = [
  {
    type: "function",
    function: {
      name: "create_booking",
      description: "Create an apartment/consultation booking once all customer info is collected.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          email: { type: "string", description: "Customer email address" },
          phone: { type: "string", description: "Phone number with country code" },
          date: { type: "string", description: "Booking date YYYY-MM-DD" },
          time: { type: "string", description: "Booking time, e.g. '3:00 PM'" },
          meeting_platform: { type: "string", description: "Zoom, Google Meet, or WhatsApp Call" },
          notes: { type: "string", description: "Optional notes about what they need" },
        },
        required: ["name", "email", "phone", "date", "time", "meeting_platform"],
        additionalProperties: false,
      },
    },
  },
];

async function createBooking(args: any) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  // Basic validation
  if (!args.name || !args.email || !args.phone || !args.date || !args.time || !args.meeting_platform) {
    return { success: false, error: "Missing required fields" };
  }

  const { data: booking, error } = await supabase
    .from("apartment_bookings")
    .insert({
      name: args.name,
      email: args.email,
      phone: args.phone,
      date: args.date,
      time: args.time,
      meeting_platform: args.meeting_platform,
      notes: args.notes || "Booked via Farhan AI chat",
      source: "chat_widget",
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("booking insert error:", error);
    return { success: false, error: error.message };
  }

  // Fire-and-forget notifications: customer email + admin email + WhatsApp
  try {
    await Promise.allSettled([
      supabase.functions.invoke("send-booking-confirmation", { body: { booking } }),
      supabase.functions.invoke("booking-notification", { body: { booking } }),
      supabase.functions.invoke("send-admin-notification", {
        body: {
          type: "booking",
          title: "New Booking from Chat",
          message: `${args.name} booked ${args.date} at ${args.time} (${args.meeting_platform})`,
          data: booking,
        },
      }),
    ]);
  } catch (e) {
    console.error("notification dispatch error:", e);
  }

  return { success: true, booking_id: booking.id };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const conversation: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(messages || []),
    ];

    // Up to 3 tool-call turns
    for (let i = 0; i < 3; i++) {
      const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: conversation,
          tools,
        }),
      });

      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!aiResp.ok) {
        const text = await aiResp.text();
        throw new Error(`AI Gateway error: ${aiResp.status} ${text}`);
      }

      const data = await aiResp.json();
      const choice = data.choices?.[0];
      const msg = choice?.message;
      if (!msg) throw new Error("No message in AI response");

      const toolCalls = msg.tool_calls;
      if (toolCalls && toolCalls.length > 0) {
        // Push assistant tool-call message
        conversation.push(msg);
        for (const call of toolCalls) {
          let result: any = { success: false, error: "Unknown tool" };
          if (call.function?.name === "create_booking") {
            try {
              const args = JSON.parse(call.function.arguments || "{}");
              result = await createBooking(args);
            } catch (e: any) {
              result = { success: false, error: e?.message || "Tool error" };
            }
          }
          conversation.push({
            role: "tool",
            tool_call_id: call.id,
            content: JSON.stringify(result),
          });
        }
        // Loop again so the model can produce a final user-facing reply
        continue;
      }

      const reply = msg.content ?? "Sorry, I didn't catch that. Could you rephrase?";
      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ reply: "Let me reconnect — please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-ai error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
