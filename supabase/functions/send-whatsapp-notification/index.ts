import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppRequest {
  type: "booking" | "contact" | "test";
  sendToCustomer?: boolean;
  data: {
    name?: string;
    email?: string;
    phone?: string;
    date?: string;
    time?: string;
    meeting_platform?: string;
    notes?: string;
    source?: string;
    message?: string;
    company?: string;
  };
}

// Helper to clean phone number for WhatsApp
function cleanPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  // If it doesn't start with a country code, assume it needs one
  // The number should be just digits, WhatsApp API handles the rest
  return cleaned;
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

    const { type, data, sendToCustomer = true }: WhatsAppRequest = await req.json();
    const results: any[] = [];

    // === SEND TO ADMIN (always uses text message - admin has messaged first) ===
    let adminMessage = "";
    
    if (type === "test") {
      adminMessage = data.message || `👋 *Hello Admin!*

This is Farhan AI - your WhatsApp AI Agent is now active! 🚀

Users can now message your WhatsApp Business number and I'll respond with helpful information about Lunexo Media services.

---
_Lunexo Media AI System_`;
    } else if (type === "booking") {
      adminMessage = `🗓️ *New Booking Received!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email || "Not provided"}
📱 *Phone:* ${data.phone || "Not provided"}
📅 *Date:* ${data.date || "Not specified"}
⏰ *Time:* ${data.time || "Not specified"}
💻 *Platform:* ${data.meeting_platform || "Not specified"}
📝 *Notes:* ${data.notes || "None"}
🔗 *Source:* ${data.source || "Website"}

---
_Lunexo Media Booking System_`;
    } else if (type === "contact") {
      adminMessage = `📩 *New Contact Form Submission!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email || "Not provided"}
📱 *Phone:* ${data.phone || "Not provided"}
🏢 *Company:* ${data.company || "Not provided"}
💬 *Message:* ${data.message || "No message"}

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
    if (sendToCustomer && data.phone && data.phone.length >= 10 && type === "booking") {
      const customerPhone = cleanPhoneNumber(data.phone);
      
      // Use template message for customers who haven't messaged first
      // Template: booking_confirmation with parameters: name, date, time, platform
      const templatePayload = {
        messaging_product: "whatsapp",
        to: customerPhone,
        type: "template",
        template: {
          name: "booking_confirmation", // Create this template in Meta Business Manager
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: data.name || "Customer" },
                { type: "text", text: data.date || "To be confirmed" },
                { type: "text", text: data.time || "To be confirmed" },
                { type: "text", text: data.meeting_platform || "Video Call" },
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

      // If template fails, log the error but don't fail the whole request
      if (!customerResponse.ok) {
        console.error("Customer template message failed:", customerResult);
        // Template might not be approved yet - this is expected initially
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
