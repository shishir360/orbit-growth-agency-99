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

// Lunexo Media Knowledge Base for Farhan AI
const FARHAN_AI_SYSTEM_PROMPT = `You are Farhan AI, the friendly AI assistant for Lunexo Media, a digital marketing agency in New York.

About Lunexo Media:
- Location: New York, NY
- Phone: +1 (702) 483-0749
- Email: hello@lunexomedia.com
- Website: lunexomedia.com
- 50+ projects completed

Services & Pricing:
- Website Design: $500-$5000
- SEO: $300-$1500/month
- Google Ads: $500-$2000/month
- Facebook/Instagram Ads: $400-$1500/month
- AI Automation: $500-$3000
- AI Chatbots: $300-$1000
- Voice AI: $500-$2000
- Email Automation: $200-$800

Keep responses short (under 200 words) for WhatsApp. Be friendly and helpful.`;

// Simple email regex
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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

// Get conversation history
async function getConversationHistory(supabaseClient: any, phoneNumber: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const { data, error } = await supabaseClient
      .from("visitor_activities")
      .select("activity_type, metadata")
      .in("activity_type", ["whatsapp_message_received", "whatsapp_message_sent"])
      .or(`metadata->>from.eq.${phoneNumber},metadata->>to.eq.${phoneNumber}`)
      .order("created_at", { ascending: true })
      .limit(10);

    if (error || !data) return [];

    const history: Array<{ role: string; content: string }> = [];
    for (const msg of data) {
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

    if (!response.ok) return "Sorry, I'm having issues. Call +1 (702) 483-0749 📞";
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Please contact hello@lunexomedia.com";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, technical issues. Call +1 (702) 483-0749 🙏";
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
              case 1: // Waiting for name
                if (answer.length >= 2) {
                  state.name = answer;
                  state.step = 2;
                  aiResponse = getBookingQuestion(2, state);
                } else {
                  aiResponse = "Please enter your full name:";
                }
                break;
                
              case 2: // Waiting for email
                if (isValidEmail(answer)) {
                  state.email = answer.toLowerCase();
                  state.step = 3;
                  aiResponse = getBookingQuestion(3, state);
                } else {
                  aiResponse = "Please enter a valid email address (example: yourname@email.com):";
                }
                break;
                
              case 3: // Waiting for date
                if (answer.length >= 2) {
                  state.date = answer;
                  state.step = 4;
                  aiResponse = getBookingQuestion(4, state);
                } else {
                  aiResponse = "Please enter a date for your call:";
                }
                break;
                
              case 4: // Waiting for time
                if (answer.length >= 2) {
                  state.time = answer;
                  state.step = 5;
                  aiResponse = getBookingQuestion(5, state);
                } else {
                  aiResponse = "Please enter a time for your call:";
                }
                break;
                
              case 5: // Waiting for platform
                let platform = answer;
                if (answer.toLowerCase().includes("zoom")) platform = "Zoom";
                else if (answer.toLowerCase().includes("meet") || answer.toLowerCase().includes("google")) platform = "Google Meet";
                else if (answer.toLowerCase().includes("phone") || answer.toLowerCase().includes("call")) platform = "Phone Call";
                
                state.platform = platform;
                state.step = 6;
                aiResponse = getBookingQuestion(6, state);
                break;
                
              case 6: // Waiting for service
                state.service = answer;
                
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
          // Handle image
          else if (isImageMessage && imageAnalysis) {
            aiResponse = `📸 *Image Analysis*\n\n${imageAnalysis}\n\nNeed help with your project? Let me know! 🚀`;
          }
          // Regular AI chat
          else {
            const history = await getConversationHistory(supabaseClient, from);
            aiResponse = await generateAIResponse(messageText, history);
          }

          // Send response
          let sent = false;
          if (state.step === 0 && !bookingCreated) {
            // Try buttons for general messages
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
          console.log(`Status: ${status.id} - ${status.status}`);
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
