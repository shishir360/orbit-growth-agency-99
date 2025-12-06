import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppRequest {
  type: "booking" | "contact";
  data: {
    name: string;
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

    const { type, data }: WhatsAppRequest = await req.json();

    // Format the message based on type
    let message = "";
    
    if (type === "booking") {
      message = `🗓️ *New Booking Received!*

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
      message = `📩 *New Contact Form Submission!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email || "Not provided"}
📱 *Phone:* ${data.phone || "Not provided"}
🏢 *Company:* ${data.company || "Not provided"}
💬 *Message:* ${data.message || "No message"}

---
_Lunexo Media Contact System_`;
    }

    // Send WhatsApp message via Meta Graph API
    const whatsappResponse = await fetch(
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
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    const result = await whatsappResponse.json();
    
    if (!whatsappResponse.ok) {
      console.error("WhatsApp API error:", result);
      throw new Error(result.error?.message || "Failed to send WhatsApp message");
    }

    console.log("WhatsApp notification sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, messageId: result.messages?.[0]?.id }),
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
