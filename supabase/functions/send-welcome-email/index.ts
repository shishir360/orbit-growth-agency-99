import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, clientEmail, clientPhone, clientCompany }: WelcomeEmailRequest = await req.json();

    const welcomeEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.8; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 650px; 
              margin: 40px auto; 
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 50px 40px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0; 
              font-size: 32px; 
              font-weight: 700;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header p { 
              margin: 10px 0 0 0; 
              font-size: 16px; 
              opacity: 0.95;
            }
            .content { 
              padding: 50px 40px; 
              background: #ffffff;
            }
            .greeting { 
              font-size: 24px; 
              font-weight: 600; 
              color: #667eea; 
              margin-bottom: 20px;
            }
            .message { 
              font-size: 16px; 
              line-height: 1.8; 
              color: #555; 
              margin-bottom: 25px;
            }
            .info-box { 
              background: linear-gradient(135deg, #f6f8ff 0%, #f0f4ff 100%); 
              padding: 30px; 
              margin: 30px 0; 
              border-left: 5px solid #667eea; 
              border-radius: 8px;
            }
            .info-box h2 { 
              color: #667eea; 
              margin-top: 0; 
              font-size: 20px;
              font-weight: 600;
            }
            .info-item { 
              display: flex; 
              align-items: center; 
              margin: 12px 0; 
              font-size: 15px;
            }
            .info-item strong { 
              min-width: 120px; 
              color: #667eea; 
            }
            .cta-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 16px 40px; 
              text-decoration: none; 
              border-radius: 50px; 
              font-weight: 600; 
              margin: 30px 0;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              transition: transform 0.2s;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .benefits { 
              background: #f9fafb; 
              padding: 25px; 
              border-radius: 8px; 
              margin: 25px 0;
            }
            .benefits ul { 
              list-style: none; 
              padding: 0; 
              margin: 0;
            }
            .benefits li { 
              padding: 10px 0; 
              padding-left: 30px;
              position: relative;
            }
            .benefits li:before { 
              content: "✓"; 
              position: absolute; 
              left: 0; 
              color: #10b981; 
              font-weight: bold; 
              font-size: 18px;
            }
            .footer { 
              text-align: center; 
              padding: 30px 40px; 
              background: #f9fafb;
              color: #6b7280; 
              font-size: 14px; 
              border-top: 1px solid #e5e7eb;
            }
            .footer p { margin: 5px 0; }
            .social-links { 
              margin: 20px 0; 
            }
            .social-links a { 
              display: inline-block; 
              margin: 0 8px; 
              color: #667eea; 
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Our Family!</h1>
              <p>We're excited to have you on board</p>
            </div>
            
            <div class="content">
              <div class="greeting">Hello ${clientName}! 👋</div>
              
              <p class="message">
                Thank you for choosing to work with us! We're absolutely thrilled to welcome you as our valued client. 
                Your trust in our services means the world to us, and we're committed to delivering exceptional results 
                that exceed your expectations.
              </p>

              <div class="info-box">
                <h2>Your Client Profile</h2>
                <div class="info-item">
                  <strong>Name:</strong> <span>${clientName}</span>
                </div>
                <div class="info-item">
                  <strong>Email:</strong> <span>${clientEmail}</span>
                </div>
                ${clientPhone ? `
                <div class="info-item">
                  <strong>Phone:</strong> <span>${clientPhone}</span>
                </div>
                ` : ''}
                ${clientCompany ? `
                <div class="info-item">
                  <strong>Company:</strong> <span>${clientCompany}</span>
                </div>
                ` : ''}
              </div>

              <div class="benefits">
                <h2 style="margin-top: 0; color: #667eea; font-size: 18px;">What You Can Expect From Us:</h2>
                <ul>
                  <li>Dedicated support from our expert team</li>
                  <li>Regular updates on your projects and progress</li>
                  <li>Transparent communication every step of the way</li>
                  <li>Quality results that drive your business forward</li>
                  <li>Innovative solutions tailored to your needs</li>
                  <li>Priority access to our services and resources</li>
                </ul>
              </div>

              <p class="message">
                We believe in building long-lasting partnerships based on trust, quality, and mutual success. 
                Our team is here to support you every step of the way, and we're confident that together, 
                we'll achieve great things.
              </p>

              <p class="message">
                If you have any questions or need assistance, please don't hesitate to reach out. 
                We're always here to help and ensure your experience with us is nothing short of excellent.
              </p>

              <div style="text-align: center;">
                <p style="font-size: 18px; margin: 30px 0 10px 0; color: #667eea; font-weight: 600;">
                  Ready to get started?
                </p>
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
                  Our team will be in touch with you shortly to discuss the next steps.
                </p>
              </div>

              <p class="message" style="margin-top: 40px; font-weight: 500;">
                Warm regards,<br>
                <span style="color: #667eea; font-size: 18px;">Lunexo Media Team</span>
              </p>
            </div>
            
            <div class="footer">
              <p>We're honored to have the opportunity to work with you and help your business thrive.</p>
              <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                This is an automated welcome email. If you have any questions, please reply to this email or contact our support team.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: "Lunexo Media <hello@lunexomedia.com>",
      to: [clientEmail],
      subject: `🎉 Welcome ${clientName}! - Lunexo Media`,
      html: welcomeEmailHtml,
    });

    if (emailError) {
      console.error("Email sending error:", emailError);
      throw emailError;
    }

    console.log("Welcome email sent successfully to:", clientEmail);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Welcome email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send welcome email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
