import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "shishirmd681@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long")
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch company info for email
    const { data: companyInfo } = await supabaseClient
      .from('company_info')
      .select('*')
      .limit(1)
      .single();

    const requestBody = await req.json();
    
    // Validate input
    let validatedData: ContactRequest;
    try {
      validatedData = ContactSchema.parse(requestBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ error: "Invalid input data", details: error.errors }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw error;
    }

    const { name, email, phone, company, message } = validatedData;

    console.log("Received validated contact submission from:", email);

    // Save to database
    const { data: submission, error: dbError } = await supabaseClient
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        company,
        message,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Contact submission saved:", submission.id);

    // Send email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            h1 { margin: 0; }
            h2 { color: #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
              
              <div class="info-box">
                <h2>Your Submission Details:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                <p><strong>Message:</strong><br>${message}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>

              <p>If you need immediate assistance, please don't hesitate to call us or send another message.</p>
              
              <p>Best regards,<br>Our Team</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444; border-radius: 5px; }
            .urgent { background: #fee2e2; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ef4444; }
            h1 { margin: 0; }
            h2 { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Contact Form Submission!</h1>
            </div>
            <div class="content">
              <div class="urgent">
                <h2>Action Required</h2>
                <p>You have a new contact form submission that needs your attention.</p>
              </div>
              
              <div class="info-box">
                <h2>Contact Details:</h2>
                <p><strong>👤 Name:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                ${phone ? `<p><strong>📱 Phone:</strong> ${phone}</p>` : ""}
                ${company ? `<p><strong>🏢 Company:</strong> ${company}</p>` : ""}
                <p><strong>💬 Message:</strong><br>${message}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Review the full message in your admin panel</li>
                <li>Respond to the customer within 24 hours</li>
                <li>Update the status in your CRM</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation
    const { error: emailError } = await resend.emails.send({
      from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Contact <onboarding@resend.dev>',
      to: [email],
      subject: `We Received Your Message - ${companyInfo?.company_name || 'Thank You!'}`,
      html: customerEmailHtml,
    });

    if (emailError) {
      console.error("Customer email error:", emailError);
    } else {
      console.log("Confirmation email sent to:", email);
    }

    // Send admin notification
    const { error: adminEmailError } = await resend.emails.send({
      from: companyInfo?.email ? `${companyInfo.company_name} <${companyInfo.email}>` : 'Contact <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `🔔 New Contact: ${name} - ${email}`,
      html: adminEmailHtml,
    });

    if (adminEmailError) {
      console.error("Admin email error:", adminEmailError);
    } else {
      console.log("Admin notification sent to:", ADMIN_EMAIL);
    }

    // Send WhatsApp notifications using direct text messages
    try {
      const PHONE_ID = Deno.env.get("META_WHATSAPP_PHONE_ID");
      const ACCESS_TOKEN = Deno.env.get("META_WHATSAPP_ACCESS_TOKEN");
      const ADMIN_NUMBER = Deno.env.get("ADMIN_WHATSAPP_NUMBER");

      if (PHONE_ID && ACCESS_TOKEN && ADMIN_NUMBER) {
        // Send direct text message to admin
        const messagePreview = message.length > 200 ? message.substring(0, 200) + '...' : message;
        
        const adminWhatsAppPayload = {
          messaging_product: "whatsapp",
          to: ADMIN_NUMBER,
          type: "text",
          text: {
            body: `🔔 *New Contact Form Submission!*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}${phone ? `\n📱 *Phone:* ${phone}` : ''}${company ? `\n🏢 *Company:* ${company}` : ''}\n\n💬 *Message:*\n${messagePreview}\n\n📅 *Submitted:* ${new Date().toLocaleString()}`
          }
        };

        const adminRes = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminWhatsAppPayload),
        });
        const adminResult = await adminRes.json();
        console.log("WhatsApp Admin notification result:", JSON.stringify(adminResult));

        // Try to send message to user if phone number provided
        // Note: This will only work if user has messaged the business within 24 hours
        // Otherwise, a pre-approved template is required
        if (phone) {
          // Clean phone number - remove non-digits and handle country codes
          let cleanPhone = phone.replace(/\D/g, '');
          // If starts with 0, assume Bangladesh and add country code
          if (cleanPhone.startsWith('0')) {
            cleanPhone = '88' + cleanPhone;
          }

          const userWhatsAppPayload = {
            messaging_product: "whatsapp",
            to: cleanPhone,
            type: "text",
            text: {
              body: `Hi ${name}! 👋\n\nThank you for contacting Lunexo Media! We've received your message and our team will get back to you within 24 hours.\n\nIf you have any urgent questions, feel free to reply to this message.\n\nBest regards,\nLunexo Media Team 🚀`
            }
          };

          const userRes = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userWhatsAppPayload),
          });
          const userResult = await userRes.json();
          console.log("WhatsApp User notification result:", JSON.stringify(userResult));
        }
      }
    } catch (waError) {
      console.error("WhatsApp notification error:", waError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully",
        submissionId: submission.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
