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

## Services Offered
1. **Website Design & Development** - Custom, responsive websites optimized for conversions ($500-$5000)
2. **SEO (Search Engine Optimization)** - Local & national SEO to rank higher on Google ($300-$1500/month)
3. **Google Ads Management** - PPC campaigns with high ROI ($500-$2000/month)
4. **Facebook & Instagram Ads** - Social media advertising ($400-$1500/month)
5. **AI Automation** - Chatbots, voice agents, workflow automation ($500-$3000)
6. **AI Chatbots** - 24/7 customer support bots ($300-$1000)
7. **Voice AI Agents** - Automated phone calls for leads ($500-$2000)
8. **Email Automation** - Automated email marketing sequences ($200-$800)
9. **Workflow Automation** - Business process automation ($400-$1500)

## Key Differentiators
- Premium, modern designs with dark theme aesthetics
- Results-driven approach focused on ROI
- Personal attention from founder Farhan Tanvier
- Cutting-edge AI integration
- Fast turnaround times

## Booking a Call
When someone wants to book a call, collect these details:
1. Their full name
2. Their email address
3. Preferred date (e.g., tomorrow, next Monday, specific date)
4. Preferred time (with their timezone)
5. Meeting platform preference (Zoom, Google Meet, or Phone call)
6. Brief description of what they need help with

Once you have all details, confirm the booking and let them know the team will send a confirmation email.

## Your Personality
- Friendly, professional, and helpful
- Speak in a conversational tone
- Keep responses concise but informative
- Remember previous messages in the conversation
- If someone wants to book, guide them through the booking process step by step
- Use emojis sparingly to be friendly
- If you don't know something specific, direct them to contact the team

IMPORTANT: You have conversation memory. Reference previous messages when relevant. If someone greeted you before, acknowledge the ongoing conversation.

Respond helpfully to any questions about Lunexo Media, digital marketing, or services. Keep responses under 300 words for WhatsApp readability.`;

// Get conversation history from database
async function getConversationHistory(supabaseClient: any, phoneNumber: string): Promise<Array<{ role: string; content: string }>> {
  try {
    // Get last 20 messages for this phone number
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

    // Convert to chat format
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
          history.push({ role: "assistant", content });
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

// Check if user wants to book and extract booking info
function detectBookingIntent(message: string, conversationHistory: Array<{ role: string; content: string }>): boolean {
  const bookingKeywords = [
    "book", "schedule", "appointment", "call", "meeting", "consultation",
    "book a call", "schedule a call", "set up a meeting", "📞 book a call"
  ];
  const lowerMessage = message.toLowerCase();
  return bookingKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Generate AI response using Lovable AI with conversation history
async function generateAIResponse(userMessage: string, conversationHistory: Array<{ role: string; content: string }>): Promise<string> {
  try {
    console.log("Generating AI response with", conversationHistory.length, "previous messages");
    
    // Build messages array with history
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
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      return "I'm having trouble processing your request right now. Please try again or contact us directly at +1 (702) 483-0749. 📞";
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please contact us at hello@lunexomedia.com for assistance.";
    
    console.log("AI Response generated:", aiResponse.substring(0, 100) + "...");
    return aiResponse;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I'm experiencing technical difficulties. Please reach out to us at +1 (702) 483-0749 or hello@lunexomedia.com. We'd love to help! 🙏";
  }
}

// Download and transcribe voice message using Lovable AI
async function transcribeVoiceMessage(mediaId: string): Promise<string> {
  try {
    console.log("Downloading voice message:", mediaId);
    
    // Get media URL from Meta
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${mediaId}`,
      {
        headers: {
          "Authorization": `Bearer ${META_ACCESS_TOKEN}`,
        },
      }
    );

    if (!mediaResponse.ok) {
      console.error("Failed to get media URL:", await mediaResponse.text());
      return "";
    }

    const mediaData = await mediaResponse.json();
    const mediaUrl = mediaData.url;
    console.log("Media URL obtained:", mediaUrl);

    // Download the audio file
    const audioResponse = await fetch(mediaUrl, {
      headers: {
        "Authorization": `Bearer ${META_ACCESS_TOKEN}`,
      },
    });

    if (!audioResponse.ok) {
      console.error("Failed to download audio:", await audioResponse.text());
      return "";
    }

    const audioBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
    
    console.log("Audio downloaded, size:", audioBuffer.byteLength, "bytes");

    // Use Lovable AI to transcribe (Gemini can handle audio)
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
              {
                type: "text",
                text: "Please transcribe this audio message. Only provide the transcription, nothing else."
              },
              {
                type: "input_audio",
                input_audio: {
                  data: audioBase64,
                  format: "ogg"
                }
              }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!transcribeResponse.ok) {
      const errorText = await transcribeResponse.text();
      console.error("Transcription error:", transcribeResponse.status, errorText);
      return "";
    }

    const transcribeData = await transcribeResponse.json();
    const transcription = transcribeData.choices?.[0]?.message?.content || "";
    console.log("Transcription result:", transcription);
    return transcription;
  } catch (error) {
    console.error("Error transcribing voice message:", error);
    return "";
  }
}

// Send WhatsApp text message
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  try {
    console.log(`Sending WhatsApp message to ${to}`);
    
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
      const errorText = await response.text();
      console.error("WhatsApp send error:", response.status, errorText);
      return false;
    }

    console.log("WhatsApp message sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}

// Send WhatsApp message with quick reply buttons
async function sendWhatsAppWithButtons(to: string, message: string, buttons: Array<{ id: string; title: string }>): Promise<boolean> {
  try {
    console.log(`Sending WhatsApp message with buttons to ${to}`);
    
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
            body: {
              text: message,
            },
            action: {
              buttons: buttons.map((btn) => ({
                type: "reply",
                reply: {
                  id: btn.id,
                  title: btn.title,
                },
              })),
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WhatsApp button send error:", response.status, errorText);
      return false;
    }

    console.log("WhatsApp message with buttons sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message with buttons:", error);
    return false;
  }
}

// Determine if we should send quick reply buttons
function shouldSendQuickReplies(message: string, conversationLength: number): boolean {
  // Send buttons on first interaction or when asking about services
  const triggerKeywords = [
    "hello", "hi", "hey", "help", "start", "info", "services", 
    "pricing", "cost", "website", "seo", "ads", "marketing"
  ];
  const lowerMessage = message.toLowerCase();
  
  // First message gets buttons
  if (conversationLength === 0) {
    return triggerKeywords.some(keyword => lowerMessage.includes(keyword));
  }
  
  // Subsequent messages - only on specific triggers
  return ["services", "pricing", "help", "what can you do", "options"].some(
    keyword => lowerMessage.includes(keyword)
  );
}

// Check if this is a booking button click
function isBookingRequest(message: string): boolean {
  const bookingTriggers = [
    "book_call", "📞 book a call", "book a call", "schedule call", 
    "i want to book", "let's book", "booking"
  ];
  return bookingTriggers.some(trigger => message.toLowerCase().includes(trigger));
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // GET request - Meta webhook verification
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    console.log("Webhook verification request:", { mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified successfully!");
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain", ...corsHeaders },
      });
    } else {
      console.log("Webhook verification failed!");
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }
  }

  // POST request - Incoming WhatsApp messages/events
  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("=== Incoming WhatsApp Webhook ===");
      console.log(JSON.stringify(body, null, 2));

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      // Extract message data from Meta webhook payload
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      
      if (value?.messages) {
        for (const message of value.messages) {
          const from = message.from; // Customer's phone number
          const messageType = message.type;
          const timestamp = message.timestamp;
          const contact = value.contacts?.[0];
          const customerName = contact?.profile?.name || "Unknown";

          let messageText = "";
          let isVoiceMessage = false;

          // Handle different message types
          if (messageType === "text") {
            messageText = message.text?.body || "";
          } else if (messageType === "audio") {
            // Voice message - transcribe it
            isVoiceMessage = true;
            const mediaId = message.audio?.id;
            if (mediaId) {
              console.log("Processing voice message from:", customerName);
              messageText = await transcribeVoiceMessage(mediaId);
              if (!messageText) {
                messageText = "[Voice message - transcription failed]";
              }
            }
          } else if (messageType === "interactive") {
            // Button reply
            messageText = message.interactive?.button_reply?.title || 
                         message.interactive?.button_reply?.id || "";
          }

          console.log(`Message from ${customerName} (${from}): ${messageText} [Type: ${messageType}]`);

          // Log incoming message to visitor_activities
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

          // Process message if we have text content
          if (messageText && messageText !== "[Voice message - transcription failed]") {
            // Get conversation history for context
            const conversationHistory = await getConversationHistory(supabaseClient, from);
            
            // Check if booking request
            let aiResponse: string;
            if (isBookingRequest(messageText)) {
              aiResponse = `Great! I'd love to help you book a discovery call with our team! 📞

To schedule your free consultation, I'll need a few details:

1️⃣ Your full name
2️⃣ Your email address
3️⃣ Preferred date (e.g., tomorrow, next Monday, or a specific date)
4️⃣ Preferred time (with your timezone)
5️⃣ Brief description of what you need help with

Just send me these details and I'll get you booked right away! 

Or if you prefer, you can book directly at lunexomedia.com/contact ✨`;
            } else {
              // Generate AI response with conversation history
              aiResponse = await generateAIResponse(messageText, conversationHistory);
            }
            
            // Check if we should send quick reply buttons
            let sent = false;
            if (shouldSendQuickReplies(messageText, conversationHistory.length)) {
              // Send with quick reply buttons
              sent = await sendWhatsAppWithButtons(from, aiResponse, [
                { id: "book_call", title: "📞 Book a Call" },
                { id: "view_services", title: "🚀 View Services" },
                { id: "get_pricing", title: "💰 Get Pricing" },
              ]);
              
              // Fallback to regular message if buttons fail
              if (!sent) {
                sent = await sendWhatsAppMessage(from, aiResponse);
              }
            } else {
              // Send regular text message
              sent = await sendWhatsAppMessage(from, aiResponse);
            }
            
            // Log outgoing message
            await supabaseClient.from("visitor_activities").insert({
              activity_type: "whatsapp_message_sent",
              metadata: {
                to: from,
                name: customerName,
                original_message: messageText,
                was_voice_message: isVoiceMessage,
                ai_response: aiResponse,
                sent_successfully: sent,
                had_buttons: shouldSendQuickReplies(messageText, conversationHistory.length),
                is_ai_response: true,
              },
            });
          } else if (isVoiceMessage && messageText === "[Voice message - transcription failed]") {
            // Send a friendly message for failed transcription
            const fallbackMessage = "I received your voice message but couldn't process it clearly. Could you please type your question or try sending another voice note? 🎤\n\nOr you can:\n📞 Call us: +1 (702) 483-0749\n📧 Email: hello@lunexomedia.com";
            await sendWhatsAppMessage(from, fallbackMessage);
          }
        }
      }

      // Handle message status updates (sent, delivered, read)
      if (value?.statuses) {
        for (const status of value.statuses) {
          console.log(`Message ${status.id} status: ${status.status}`);
        }
      }

      return new Response(
        JSON.stringify({ success: true, message: "Webhook processed" }),
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
