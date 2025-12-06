import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "lunexo_whatsapp_verify_2024";
const META_ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
const META_PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Booking data tracker - stores partial booking info per phone number
const bookingTracker: Record<string, {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  platform?: string;
  service?: string;
  step: number;
}> = {};

// Get or create booking tracker for a phone
function getBookingTracker(phone: string) {
  if (!bookingTracker[phone]) {
    bookingTracker[phone] = { step: 0 };
  }
  return bookingTracker[phone];
}

// Clear booking tracker
function clearBookingTracker(phone: string) {
  delete bookingTracker[phone];
}

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

## IMAGE ANALYSIS
When a user sends an image, analyze it and describe what you see. Be helpful and insightful.

## Your Personality
- Friendly, professional, and helpful
- Speak in a conversational tone
- Keep responses concise for WhatsApp readability
- Remember previous messages in the conversation
- Use emojis sparingly

Respond helpfully to any questions. Keep responses under 300 words.`;

// Simple email regex
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Extract booking field from message
function extractBookingField(message: string, step: number): string | null {
  const msg = message.trim();
  
  switch(step) {
    case 1: // Name - just accept any text
      if (msg.length >= 2 && msg.length <= 100) {
        return msg;
      }
      break;
    case 2: // Email
      if (isValidEmail(msg)) {
        return msg.toLowerCase();
      }
      break;
    case 3: // Date
      // Accept various date formats
      if (msg.length >= 3) {
        return msg;
      }
      break;
    case 4: // Time
      if (msg.length >= 2) {
        return msg;
      }
      break;
    case 5: // Platform
      const platforms = ["zoom", "google meet", "phone", "call", "whatsapp"];
      const lowerMsg = msg.toLowerCase();
      for (const p of platforms) {
        if (lowerMsg.includes(p)) {
          if (lowerMsg.includes("zoom")) return "Zoom";
          if (lowerMsg.includes("google") || lowerMsg.includes("meet")) return "Google Meet";
          if (lowerMsg.includes("phone") || lowerMsg.includes("call")) return "Phone Call";
          if (lowerMsg.includes("whatsapp")) return "WhatsApp";
        }
      }
      // Accept any response as platform
      if (msg.length >= 2) return msg;
      break;
    case 6: // Service
      if (msg.length >= 2) {
        return msg;
      }
      break;
  }
  return null;
}

// Generate booking step question
function getBookingQuestion(step: number, tracker: any): string {
  switch(step) {
    case 1:
      return `Great! Let's book your free discovery call! 🎉

Please tell me your *full name*:`;
    case 2:
      return `Thanks, ${tracker.name}! 

Now, what's your *email address*? 📧`;
    case 3:
      return `Perfect! 

What *date* would you prefer for the call?
(Example: Tomorrow, Monday, December 15, etc.)`;
    case 4:
      return `Got it! 

What *time* works best for you?
(Please include timezone - Example: 3pm EST, 10am Bangladesh time)`;
    case 5:
      return `Almost done! 

Which *meeting platform* do you prefer?
• Zoom
• Google Meet
• Phone Call`;
    case 6:
      return `Last question! 

Which *service* are you interested in?
• Website Design
• SEO
• Google/Facebook Ads
• AI Automation
• Other (please specify)`;
    default:
      return "";
  }
}

// Check if booking is complete
function isBookingComplete(tracker: any): boolean {
  return tracker.name && tracker.email && tracker.date && tracker.time && tracker.platform && tracker.service;
}

// Send booking confirmation email
async function sendBookingConfirmationEmail(bookingData: any, phoneNumber: string): Promise<boolean> {
  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return false;
    }

    // Send to customer
    await resend.emails.send({
      from: "Lunexo Media <hello@lunexomedia.com>",
      to: [bookingData.email],
      subject: "🎉 Your Discovery Call is Confirmed - Lunexo Media",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0f; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .card { background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1)); border: 1px solid rgba(99,102,241,0.3); border-radius: 16px; padding: 30px; margin-bottom: 20px; }
            .title { font-size: 24px; margin-bottom: 20px; color: #ffffff; }
            .detail { margin: 12px 0; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; }
            .label { color: #a1a1aa; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
            .value { color: #ffffff; font-size: 16px; font-weight: 500; }
            .footer { text-align: center; margin-top: 30px; color: #71717a; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Lunexo Media</div>
            </div>
            <div class="card">
              <div class="title">🎉 Your Call is Confirmed!</div>
              <p style="color: #d1d5db;">Hi ${bookingData.name},</p>
              <p style="color: #d1d5db;">Thank you for booking a discovery call with us! We're excited to learn about your business.</p>
              
              <div class="detail">
                <div class="label">📅 Date</div>
                <div class="value">${bookingData.date}</div>
              </div>
              <div class="detail">
                <div class="label">⏰ Time</div>
                <div class="value">${bookingData.time}</div>
              </div>
              <div class="detail">
                <div class="label">💻 Platform</div>
                <div class="value">${bookingData.platform}</div>
              </div>
              <div class="detail">
                <div class="label">🎯 Interest</div>
                <div class="value">${bookingData.service}</div>
              </div>
              
              <p style="color: #d1d5db; margin-top: 20px;">We'll send you the meeting link before the call!</p>
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

    // Send to admin
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
        <p><strong>Service Interest:</strong> ${bookingData.service}</p>
        <p><strong>Source:</strong> WhatsApp</p>
      `,
    });

    console.log("Booking confirmation emails sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending booking email:", error);
    return false;
  }
}

// Create booking in database
async function createBooking(supabaseClient: any, bookingData: any, phoneNumber: string): Promise<boolean> {
  try {
    console.log("Creating booking:", bookingData);
    
    const { error } = await supabaseClient.from("apartment_bookings").insert({
      name: bookingData.name,
      email: bookingData.email,
      phone: phoneNumber,
      date: bookingData.date,
      time: bookingData.time,
      meeting_platform: bookingData.platform,
      notes: `Service Interest: ${bookingData.service}. Booked via WhatsApp.`,
      source: "whatsapp",
      status: "pending",
    });
    
    if (error) {
      console.error("Error creating booking:", error);
      return false;
    }
    
    // Send confirmation email
    await sendBookingConfirmationEmail(bookingData, phoneNumber);
    
    console.log("Booking created successfully");
    return true;
  } catch (error) {
    console.error("Error in createBooking:", error);
    return false;
  }
}

// Get conversation history
async function getConversationHistory(supabaseClient: any, phoneNumber: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata, created_at")
      .in("activity_type", ["whatsapp_message_received", "whatsapp_message_sent"])
      .or(`metadata->>from.eq.${phoneNumber},metadata->>to.eq.${phoneNumber}`)
      .order("created_at", { ascending: true })
      .limit(15);

    if (error || !data) return [];

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
    return history;
  } catch (error) {
    console.error("Error getting conversation history:", error);
    return [];
  }
}

// Download and analyze image
async function analyzeImage(mediaId: string): Promise<string> {
  try {
    console.log("Downloading image for analysis:", mediaId);
    
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
    
    console.log("Image downloaded, size:", imageBuffer.byteLength, "bytes");
    
    // Analyze with AI
    const analyzeResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system",
            content: "You are Farhan AI from Lunexo Media. Analyze the image and provide helpful insights. Keep response under 200 words."
          },
          { 
            role: "user", 
            content: [
              { type: "text", text: "Analyze this image:" },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!analyzeResponse.ok) {
      console.error("Image analysis error:", await analyzeResponse.text());
      return "";
    }

    const analyzeData = await analyzeResponse.json();
    return analyzeData.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "";
  }
}

// Generate AI response
async function generateAIResponse(userMessage: string, conversationHistory: Array<{ role: string; content: string }>): Promise<string> {
  try {
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
      return "I'm having trouble right now. Please call us at +1 (702) 483-0749. 📞";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Please contact hello@lunexomedia.com.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, technical issues. Call us at +1 (702) 483-0749. 🙏";
  }
}

// Transcribe voice message
async function transcribeVoiceMessage(mediaId: string): Promise<string> {
  try {
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${mediaId}`,
      { headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}` } }
    );

    if (!mediaResponse.ok) return "";

    const mediaData = await mediaResponse.json();
    const audioResponse = await fetch(mediaData.url, {
      headers: { "Authorization": `Bearer ${META_ACCESS_TOKEN}` },
    });

    if (!audioResponse.ok) return "";

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
              { type: "text", text: "Transcribe this audio. Only provide the transcription." },
              { type: "input_audio", input_audio: { data: audioBase64, format: "ogg" } }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!transcribeResponse.ok) return "";

    const transcribeData = await transcribeResponse.json();
    return transcribeData.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Error transcribing voice:", error);
    return "";
  }
}

// Send WhatsApp message
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  try {
    console.log(`Sending WhatsApp to ${to}: ${message.substring(0, 50)}...`);
    
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
    console.log("WhatsApp API response:", result);
    
    if (!response.ok) {
      console.error("WhatsApp send failed:", result);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp:", error);
    return false;
  }
}

// Send WhatsApp with buttons
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
                reply: { id: btn.id, title: btn.title.substring(0, 20) },
              })),
            },
          },
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error sending WhatsApp with buttons:", error);
    return false;
  }
}

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

function isBookingRequest(message: string): boolean {
  const bookingTriggers = [
    "book_call", "book a call", "schedule call", 
    "i want to book", "let's book", "booking", "schedule", 
    "appointment", "book call", "meet", "meeting"
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
          let isImageMessage = false;
          let imageAnalysis = "";

          // Handle different message types
          if (messageType === "text") {
            messageText = message.text?.body || "";
          } else if (messageType === "audio") {
            isVoiceMessage = true;
            const mediaId = message.audio?.id;
            if (mediaId) {
              messageText = await transcribeVoiceMessage(mediaId);
              if (!messageText) messageText = "[Voice message - transcription failed]";
            }
          } else if (messageType === "image") {
            isImageMessage = true;
            const mediaId = message.image?.id;
            const caption = message.image?.caption || "";
            if (mediaId) {
              console.log("Processing image from:", customerName);
              imageAnalysis = await analyzeImage(mediaId);
              messageText = caption ? `[Image with caption: ${caption}]` : "[Image received]";
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
              is_image: isImageMessage,
              image_analysis: imageAnalysis,
              timestamp: timestamp,
            },
          });

          // Process message
          if (messageText && messageText !== "[Voice message - transcription failed]") {
            const tracker = getBookingTracker(from);
            let aiResponse: string = "";
            let bookingCreated = false;
            
            // Check if we're in booking flow (step > 0)
            if (tracker.step > 0) {
              // Try to extract the field for current step
              const extractedValue = extractBookingField(messageText, tracker.step);
              
              if (extractedValue) {
                // Save the extracted value
                switch(tracker.step) {
                  case 1: tracker.name = extractedValue; break;
                  case 2: tracker.email = extractedValue; break;
                  case 3: tracker.date = extractedValue; break;
                  case 4: tracker.time = extractedValue; break;
                  case 5: tracker.platform = extractedValue; break;
                  case 6: tracker.service = extractedValue; break;
                }
                
                // Check if booking is complete
                if (isBookingComplete(tracker)) {
                  // Create the booking
                  const created = await createBooking(supabaseClient, tracker, from);
                  if (created) {
                    bookingCreated = true;
                    aiResponse = `✅ *Booking Confirmed!*

Thank you, ${tracker.name}! Your discovery call is booked.

📅 *Date:* ${tracker.date}
⏰ *Time:* ${tracker.time}
💻 *Platform:* ${tracker.platform}
🎯 *Service:* ${tracker.service}

📧 Confirmation email sent to ${tracker.email}

We look forward to speaking with you! 🚀`;
                    clearBookingTracker(from);
                  } else {
                    aiResponse = "Sorry, there was an error creating your booking. Please try again or call us at +1 (702) 483-0749.";
                  }
                } else {
                  // Move to next step
                  tracker.step++;
                  aiResponse = getBookingQuestion(tracker.step, tracker);
                }
              } else {
                // Invalid input, ask again
                if (tracker.step === 2) {
                  aiResponse = "Please enter a valid email address (example: yourname@email.com):";
                } else {
                  aiResponse = getBookingQuestion(tracker.step, tracker);
                }
              }
            }
            // Check if user wants to start booking
            else if (isBookingRequest(messageText)) {
              tracker.step = 1;
              aiResponse = getBookingQuestion(1, tracker);
            }
            // Handle image analysis
            else if (isImageMessage && imageAnalysis) {
              aiResponse = `📸 *Image Analysis*\n\n${imageAnalysis}\n\nWant to discuss how we can help with your project? Just let me know! 🚀`;
            }
            // Regular AI response
            else {
              const conversationHistory = await getConversationHistory(supabaseClient, from);
              aiResponse = await generateAIResponse(messageText, conversationHistory);
            }
            
            // Send response
            let sent = false;
            const conversationHistory = await getConversationHistory(supabaseClient, from);
            
            if (tracker.step === 0 && shouldSendQuickReplies(messageText, conversationHistory.length)) {
              sent = await sendWhatsAppWithButtons(from, aiResponse, [
                { id: "book_call", title: "📞 Book a Call" },
                { id: "view_services", title: "🚀 View Services" },
                { id: "get_pricing", title: "💰 Get Pricing" },
              ]);
              if (!sent) sent = await sendWhatsAppMessage(from, aiResponse);
            } else {
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
                was_image_message: isImageMessage,
                ai_response: aiResponse,
                sent_successfully: sent,
                is_ai_response: true,
                booking_created: bookingCreated,
                booking_step: tracker.step,
              },
            });
          } else if (isVoiceMessage && messageText === "[Voice message - transcription failed]") {
            const fallbackMessage = "I couldn't process your voice message. Please type your message or try again. 🎤\n\nOr call: +1 (702) 483-0749";
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
