import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "lunexo_whatsapp_verify_2024";
const META_ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
const META_PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Lunexo Media Knowledge Base for Farhan AI
const FARHAN_AI_SYSTEM_PROMPT = `You are Farhan AI, the friendly and professional AI assistant for Lunexo Media, a premium digital marketing agency based in New York, NY.

## About Lunexo Media
- Founded by Farhan Tanvier
- Location: New York, NY
- Phone: +1 (702) 483-0749
- Email: hello@lunexomedia.com
- Website: lunexomedia.com
- Completed 50+ successful projects

## Services Offered (with pricing)
1. **Website Design & Development** - $500-$5000
2. **SEO (Search Engine Optimization)** - $300-$1500/month
3. **Google Ads Management** - $500-$2000/month
4. **Facebook & Instagram Ads** - $400-$1500/month
5. **AI Automation** - $500-$3000
6. **AI Chatbots** - $300-$1000
7. **Voice AI Agents** - $500-$2000
8. **Email Automation** - $200-$800
9. **Workflow Automation** - $400-$1500

## IMPORTANT BOOKING INSTRUCTIONS
When someone wants to book a call or schedule a meeting:
- DO NOT give any website links for booking
- Collect the booking information DIRECTLY through this chat
- Ask for these details ONE BY ONE in a conversational way:
  1. Full name
  2. Email address
  3. Preferred date (like "tomorrow", "Monday", or specific date)
  4. Preferred time (with timezone, like "3pm EST" or "10am Bangladesh time")
  5. Meeting platform preference (Zoom, Google Meet, or Phone call)
  6. What service are they interested in?

When you have ALL the required information (name, email, date, time, platform, service interest), respond with this EXACT format at the END of your message:

[BOOKING_DATA]
name: [Full Name]
email: [Email Address]
date: [Date]
time: [Time with timezone]
platform: [Zoom/Google Meet/Phone]
service: [Service Interest]
[/BOOKING_DATA]

This will automatically create the booking. Then confirm to the user that their booking is confirmed.

## Your Personality
- Friendly, professional, and helpful
- Speak in a conversational tone
- Keep responses concise for WhatsApp readability
- Remember previous messages in the conversation
- Use emojis sparingly
- NEVER give website links for booking - always collect info directly
- If someone says "book" or clicks "Book a Call", start collecting their details immediately

Respond helpfully to any questions. Keep responses under 300 words.`;

// Parse booking data from AI response
function parseBookingData(response: string): { hasBooking: boolean; data: any } {
  const bookingMatch = response.match(/\[BOOKING_DATA\]([\s\S]*?)\[\/BOOKING_DATA\]/);
  
  if (!bookingMatch) {
    return { hasBooking: false, data: null };
  }
  
  const bookingText = bookingMatch[1];
  const data: any = {};
  
  const lines = bookingText.split('\n').filter(line => line.trim());
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim().toLowerCase();
      const value = line.substring(colonIndex + 1).trim();
      if (value && value !== '[Full Name]' && !value.startsWith('[')) {
        data[key] = value;
      }
    }
  }
  
  // Check if we have all required fields
  const hasAllFields = data.name && data.email && data.date && data.time && data.platform;
  
  return { hasBooking: hasAllFields, data };
}

// Remove booking data tags from response for display
function cleanResponseForDisplay(response: string): string {
  return response.replace(/\[BOOKING_DATA\][\s\S]*?\[\/BOOKING_DATA\]/g, '').trim();
}

// Create booking in database
async function createBooking(supabaseClient: any, bookingData: any, phoneNumber: string, customerName: string): Promise<boolean> {
  try {
    console.log("Creating booking:", bookingData);
    
    const { error } = await supabaseClient.from("apartment_bookings").insert({
      name: bookingData.name || customerName,
      email: bookingData.email,
      phone: phoneNumber,
      date: bookingData.date,
      time: bookingData.time,
      meeting_platform: bookingData.platform || "Zoom",
      notes: `Service Interest: ${bookingData.service || 'Not specified'}. Booked via WhatsApp.`,
      source: "whatsapp",
      status: "pending",
    });
    
    if (error) {
      console.error("Error creating booking:", error);
      return false;
    }
    
    console.log("Booking created successfully");
    return true;
  } catch (error) {
    console.error("Error in createBooking:", error);
    return false;
  }
}

// Get conversation history from database
async function getConversationHistory(supabaseClient: any, phoneNumber: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata, created_at")
      .in("activity_type", ["whatsapp_message_received", "whatsapp_message_sent"])
      .or(`metadata->>from.eq.${phoneNumber},metadata->>to.eq.${phoneNumber}`)
      .order("created_at", { ascending: true })
      .limit(20);

    if (error) {
      console.error("Error fetching conversation history:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    const history: Array<{ role: string; content: string }> = [];
    for (const msg of data) {
      if (msg.activity_type === "whatsapp_message_received") {
        const content = msg.metadata?.message || "";
        if (content && content !== "[Voice message - transcription failed]") {
          history.push({ role: "user", content });
        }
      } else if (msg.activity_type === "whatsapp_message_sent") {
        const content = msg.metadata?.ai_response || msg.metadata?.message || "";
        if (content) {
          history.push({ role: "assistant", content: cleanResponseForDisplay(content) });
        }
      }
    }

    console.log(`Found ${history.length} previous messages for ${phoneNumber}`);
    return history;
  } catch (error) {
    console.error("Error getting conversation history:", error);
    return [];
  }
}

// Generate AI response with conversation history
async function generateAIResponse(userMessage: string, conversationHistory: Array<{ role: string; content: string }>): Promise<string> {
  try {
    console.log("Generating AI response with", conversationHistory.length, "previous messages");
    
    const messages = [
      { role: "system", content: FARHAN_AI_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      return "I'm having trouble right now. Please try again or call us at +1 (702) 483-0749. 📞";
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please contact hello@lunexomedia.com.";
    
    console.log("AI Response generated:", aiResponse.substring(0, 100) + "...");
    return aiResponse;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I'm having technical issues. Call us at +1 (702) 483-0749. 🙏";
  }
}

// Transcribe voice message
async function transcribeVoiceMessage(mediaId: string): Promise<string> {
  try {
    console.log("Downloading voice message:", mediaId);
    
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${mediaId}`,
      {
        headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}` },
      }
    );

    if (!mediaResponse.ok) {
      console.error("Failed to get media URL");
      return "";
    }

    const mediaData = await mediaResponse.json();
    const audioResponse = await fetch(mediaData.url, {
      headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}` },
    });

    if (!audioResponse.ok) {
      console.error("Failed to download audio");
      return "";
    }

    const audioBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
    
    const transcribeResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "user", 
            content: [
              { type: "text", text: "Please transcribe this audio message. Only provide the transcription, nothing else." },
              { type: "input_audio", input_audio: { data: audioBase64, format: "ogg" } }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!transcribeResponse.ok) {
      return "";
    }

    const transcribeData = await transcribeResponse.json();
    return transcribeData.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Error transcribing voice message:", error);
    return "";
  }
}

// Send WhatsApp text message
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
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
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!response.ok) {
      console.error("WhatsApp send error:", await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}

// Send WhatsApp message with buttons
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
              buttons: buttons.map((btn) => ({
                type: "reply",
                reply: { id: btn.id, title: btn.title },
              })),
            },
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("WhatsApp button send error:", await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp with buttons:", error);
    return false;
  }
}

// Check if should send quick replies
function shouldSendQuickReplies(message: string, conversationLength: number): boolean {
  const triggerKeywords = ["hello", "hi", "hey", "help", "start", "info", "services", "pricing"];
  const lowerMessage = message.toLowerCase();
  
  if (conversationLength === 0) {
    return triggerKeywords.some(keyword => lowerMessage.includes(keyword));
  }
  
  return ["services", "pricing", "help", "what can you do", "options"].some(
    keyword => lowerMessage.includes(keyword)
  );
}

// Check if booking request
function isBookingRequest(message: string): boolean {
  const bookingTriggers = [
    "book_call", "📞 book a call", "book a call", "schedule call", 
    "i want to book", "let's book", "booking", "schedule", "appointment",
    "set up a call", "meet", "meeting"
  ];
  return bookingTriggers.some(trigger => message.toLowerCase().includes(trigger));
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // GET - Webhook verification
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain", ...corsHeaders } });
    }
    return new Response("Forbidden", { status: 403, headers: corsHeaders });
  }

  // POST - Incoming messages
  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("=== Incoming WhatsApp Webhook ===");

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
          const timestamp = message.timestamp;
          const contact = value.contacts?.[0];
          const customerName = contact?.profile?.name || "Unknown";

          let messageText = "";
          let isVoiceMessage = false;

          if (messageType === "text") {
            messageText = message.text?.body || "";
          } else if (messageType === "audio") {
            isVoiceMessage = true;
            const mediaId = message.audio?.id;
            if (mediaId) {
              messageText = await transcribeVoiceMessage(mediaId);
              if (!messageText) messageText = "[Voice message - transcription failed]";
            }
          } else if (messageType === "interactive") {
            messageText = message.interactive?.button_reply?.title || 
                         message.interactive?.button_reply?.id || "";
          }

          console.log(`Message from ${customerName} (${from}): ${messageText}`);

          // Log incoming message
          await supabaseClient.from("visitor_activities").insert({
            activity_type: "whatsapp_message_received",
            metadata: {
              from: from,
              name: customerName,
              message: messageText,
              type: messageType,
              is_voice: isVoiceMessage,
              timestamp: timestamp,
            },
          });

          if (messageText && messageText !== "[Voice message - transcription failed]") {
            const conversationHistory = await getConversationHistory(supabaseClient, from);
            
            let aiResponse: string;
            
            // Check if it's a booking request
            if (isBookingRequest(messageText) && conversationHistory.length < 3) {
              // Start booking flow
              aiResponse = `Great! I'd love to help you book a free discovery call! 🎉

Let me collect a few details to get you scheduled.

First, what's your full name?`;
            } else {
              // Generate AI response with history
              aiResponse = await generateAIResponse(messageText, conversationHistory);
            }
            
            // Check if AI response contains booking data
            const bookingResult = parseBookingData(aiResponse);
            if (bookingResult.hasBooking) {
              const bookingCreated = await createBooking(
                supabaseClient, 
                bookingResult.data, 
                from, 
                customerName
              );
              
              if (bookingCreated) {
                console.log("Booking created successfully from WhatsApp");
              }
            }
            
            // Clean response for display
            const displayResponse = cleanResponseForDisplay(aiResponse);
            
            // Send response
            let sent = false;
            if (shouldSendQuickReplies(messageText, conversationHistory.length)) {
              sent = await sendWhatsAppWithButtons(from, displayResponse, [
                { id: "book_call", title: "📞 Book a Call" },
                { id: "view_services", title: "🚀 View Services" },
                { id: "get_pricing", title: "💰 Get Pricing" },
              ]);
              if (!sent) sent = await sendWhatsAppMessage(from, displayResponse);
            } else {
              sent = await sendWhatsAppMessage(from, displayResponse);
            }
            
            // Log outgoing message
            await supabaseClient.from("visitor_activities").insert({
              activity_type: "whatsapp_message_sent",
              metadata: {
                to: from,
                name: customerName,
                original_message: messageText,
                was_voice_message: isVoiceMessage,
                ai_response: displayResponse,
                sent_successfully: sent,
                had_buttons: shouldSendQuickReplies(messageText, conversationHistory.length),
                is_ai_response: true,
                booking_created: bookingResult.hasBooking,
              },
            });
          } else if (isVoiceMessage && messageText === "[Voice message - transcription failed]") {
            const fallbackMessage = "I couldn't process your voice message clearly. Could you please type your message or try again? 🎤\n\nOr call us: +1 (702) 483-0749";
            await sendWhatsAppMessage(from, fallbackMessage);
          }
        }
      }

      if (value?.statuses) {
        for (const status of value.statuses) {
          console.log(`Message ${status.id} status: ${status.status}`);
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
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
