import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_TYPES = ['booking', 'contact', 'test'] as const;

// Helper to clean phone number for WhatsApp
function cleanPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return cleaned;
}

// Validate and truncate string fields
function validateString(value: any, maxLength: number): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') return null;
  return value.substring(0, maxLength);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");
    const ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
    const ADMIN_NUMBER = Deno.env.get("ADMIN_WHATSAPP_NUMBER");

    if (!PHONE_ID || !ACCESS_TOKEN || !ADMIN_NUMBER) {
      throw new Error("WhatsApp API credentials not configured");
    }

    const body = await req.json();
    const { type, sendToCustomer = true } = body;
    const data = body.data || {};

    // Input validation
    if (!type || !VALID_TYPES.includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid type. Must be "booking", "contact", or "test".' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (typeof data !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid data' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all fields
    const safeName = validateString(data.name, 200) || 'Unknown';
    const safeEmail = validateString(data.email, 255) || 'Not provided';
    const safePhone = validateString(data.phone, 30);
    const safeDate = validateString(data.date, 50);
    const safeTime = validateString(data.time, 50);
    const safePlatform = validateString(data.meeting_platform, 100);
    const safeNotes = validateString(data.notes, 2000);
    const safeSource = validateString(data.source, 100);
    const safeMessage = validateString(data.message, 2000);
    const safeCompany = validateString(data.company, 200);

    const results: any[] = [];

    // === SEND TO ADMIN ===
    let adminMessage = "";
    
    if (type === "test") {
      adminMessage = safeMessage || `👋 *Hello Admin!*

This is Farhan AI - your WhatsApp AI Agent is now active! 🚀

Users can now message your WhatsApp Business number and I'll respond with helpful information about Lunexo Media services.

---
_Lunexo Media AI System_`;
    } else if (type === "booking") {
      adminMessage = `🗓️ *New Booking Received!*

👤 *Name:* ${safeName}
📧 *Email:* ${safeEmail}
📱 *Phone:* ${safePhone || "Not provided"}
📅 *Date:* ${safeDate || "Not specified"}
⏰ *Time:* ${safeTime || "Not specified"}
💻 *Platform:* ${safePlatform || "Not specified"}
📝 *Notes:* ${safeNotes || "None"}
🔗 *Source:* ${safeSource || "Website"}

---
_Lunexo Media Booking System_`;
    } else if (type === "contact") {
      adminMessage = `📩 *New Contact Form Submission!*

👤 *Name:* ${safeName}
📧 *Email:* ${safeEmail}
📱 *Phone:* ${safePhone || "Not provided"}
🏢 *Company:* ${safeCompany || "Not provided"}
💬 *Message:* ${safeMessage || "No message"}

---
_Lunexo Media Contact System_`;
    }

    // Send to Admin
    const adminResponse = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: ADMIN_NUMBER,
          type: "text",
          text: { preview_url: false, body: adminMessage },
        }),
      }
    );

    const adminResult = await adminResponse.json();
    console.log("Admin WhatsApp result:", adminResult);
    results.push({ recipient: "admin", result: adminResult });

    // === SEND TO CUSTOMER (uses template message for first-time contact) ===
    if (sendToCustomer && safePhone && safePhone.length >= 10 && type === "booking") {
      const customerPhone = cleanPhoneNumber(safePhone);
      
      const templatePayload = {
        messaging_product: "whatsapp",
        to: customerPhone,
        type: "template",
        template: {
          name: "booking_confirmation",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: safeName },
                { type: "text", text: safeDate || "To be confirmed" },
                { type: "text", text: safeTime || "To be confirmed" },
                { type: "text", text: safePlatform || "Video Call" },
              ],
            },
          ],
        },
      };

      const customerResponse = await fetch(
        `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(templatePayload),
        }
      );

      const customerResult = await customerResponse.json();
      console.log("Customer WhatsApp template result:", customerResult);
      results.push({ recipient: "customer", phone: customerPhone, result: customerResult });

      if (!customerResponse.ok) {
        console.error("Customer template message failed:", customerResult);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: adminResult.messages?.[0]?.id,
        results 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending WhatsApp notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
