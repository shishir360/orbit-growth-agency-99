import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Page configurations for OG image generation
const pageConfigs: Record<string, { title: string; subtitle: string; theme: string; icon: string }> = {
  "/": {
    title: "LUNEXO MEDIA",
    subtitle: "Digital Marketing & Growth Solutions",
    theme: "emerald gradient with tech elements",
    icon: "rocket"
  },
  "/website-design": {
    title: "Website Design",
    subtitle: "Premium Web Development",
    theme: "blue and cyan gradient with code elements",
    icon: "globe"
  },
  "/ai-automation": {
    title: "AI Automation",
    subtitle: "Intelligent Business Solutions",
    theme: "purple and violet gradient with neural network patterns",
    icon: "brain"
  },
  "/ads-management": {
    title: "Ads Management",
    subtitle: "ROI-Driven Campaigns",
    theme: "orange and amber gradient with chart elements",
    icon: "target"
  },
  "/about": {
    title: "About Us",
    subtitle: "Our Story & Mission",
    theme: "dark professional with team imagery",
    icon: "users"
  },
  "/contact": {
    title: "Contact Us",
    subtitle: "Get a Free Consultation",
    theme: "green gradient with communication elements",
    icon: "message"
  },
  "/pricing": {
    title: "Pricing Plans",
    subtitle: "Transparent & Affordable",
    theme: "gold and amber gradient with pricing elements",
    icon: "dollar"
  },
  "/blog": {
    title: "Blog",
    subtitle: "Digital Marketing Insights",
    theme: "indigo gradient with article elements",
    icon: "book"
  },
  "/portfolio": {
    title: "Our Portfolio",
    subtitle: "Success Stories",
    theme: "teal gradient with showcase elements",
    icon: "briefcase"
  },
  "/portfolio/website-design": {
    title: "Web Design Portfolio",
    subtitle: "Premium Projects",
    theme: "blue gradient with website mockups",
    icon: "monitor"
  },
  "/portfolio/ai-automation": {
    title: "AI Portfolio",
    subtitle: "Intelligent Solutions",
    theme: "purple gradient with AI elements",
    icon: "cpu"
  },
  "/portfolio/ads-management": {
    title: "Ads Portfolio",
    subtitle: "Campaign Results",
    theme: "orange gradient with analytics charts",
    icon: "trending-up"
  },
  "/reviews": {
    title: "Client Reviews",
    subtitle: "Real Testimonials",
    theme: "warm gradient with star ratings",
    icon: "star"
  },
  "/services": {
    title: "Our Services",
    subtitle: "Complete Digital Solutions",
    theme: "multi-color gradient with service icons",
    icon: "layers"
  },
  "/founder": {
    title: "Meet Our Founder",
    subtitle: "Farhan Tanvir",
    theme: "professional dark with portrait style",
    icon: "user"
  }
};

// Helper to get portfolio project config from database
async function getPortfolioConfig(supabase: any, slug: string): Promise<{ title: string; subtitle: string; theme: string; icon: string } | null> {
  const { data: project, error } = await supabase
    .from("portfolio")
    .select("title, description, category")
    .eq("slug", slug)
    .single();

  if (error || !project) return null;

  const categoryThemes: Record<string, { theme: string; icon: string }> = {
    "Website Design": { theme: "blue and cyan gradient with website mockup elements", icon: "globe" },
    "AI Automation": { theme: "purple and violet gradient with neural network patterns", icon: "cpu" },
    "Ads Management": { theme: "orange and amber gradient with analytics elements", icon: "target" }
  };

  const categoryConfig = categoryThemes[project.category] || { 
    theme: "emerald gradient professional", 
    icon: "briefcase" 
  };

  return {
    title: project.title,
    subtitle: project.description?.substring(0, 80) || project.category,
    theme: categoryConfig.theme,
    icon: categoryConfig.icon
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pagePath, forceRegenerate } = await req.json();
    
    console.log(`Generating OG image for path: ${pagePath}`);
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check if image already exists
    if (!forceRegenerate) {
      const { data: existing } = await supabase
        .from("og_images")
        .select("image_url")
        .eq("page_path", pagePath)
        .single();
      
      if (existing?.image_url) {
        console.log(`Using existing OG image for ${pagePath}`);
        return new Response(
          JSON.stringify({ imageUrl: existing.image_url, cached: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    // Get page config - check for dynamic portfolio pages first
    let config = pageConfigs[pagePath];
    
    if (!config && pagePath.startsWith("/portfolio/")) {
      const slug = pagePath.replace("/portfolio/", "");
      // Skip category pages as they have static configs
      if (!["website-design", "ai-automation", "ads-management"].includes(slug)) {
        const portfolioConfig = await getPortfolioConfig(supabase, slug);
        if (portfolioConfig) {
          config = portfolioConfig;
        }
      }
    }
    
    if (!config) {
      config = {
        title: "LUNEXO MEDIA",
        subtitle: pagePath.replace(/\//g, " ").trim() || "Digital Agency",
        theme: "emerald gradient professional",
        icon: "star"
      };
    }
    
    // Generate image using Lovable AI
    const prompt = `Create a professional Open Graph social media preview image (1200x630 pixels, 16:9 aspect ratio) for a digital marketing agency page.

Page: "${config.title}"
Subtitle: "${config.subtitle}"
Theme: ${config.theme}

Design requirements:
- Modern, premium, professional look
- Dark background with gradient accents
- Clean typography with the title "${config.title}" prominently displayed
- Subtitle "${config.subtitle}" below the title
- "LUNEXO MEDIA" branding in the corner
- Abstract tech/business elements matching the theme
- High contrast for social media visibility
- No stock photos of people
- Sleek, minimalist aesthetic with subtle glow effects
- 1200x630 pixel dimensions optimized for social sharing

Style: Ultra-modern tech startup aesthetic, similar to Stripe, Linear, or Vercel marketing materials. Use emerald green (#3ECF8E) as the primary accent color.`;

    console.log("Calling Lovable AI for image generation...");
    
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");
    
    const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageData || !imageData.startsWith("data:image")) {
      console.error("No image in AI response:", JSON.stringify(aiData).substring(0, 500));
      throw new Error("No image generated by AI");
    }

    // Extract base64 data
    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      throw new Error("Invalid image data format");
    }
    
    const imageType = base64Match[1];
    const base64Data = base64Match[2];
    
    // Convert base64 to Uint8Array
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Upload to Supabase Storage
    const fileName = `og-${pagePath.replace(/\//g, "-").replace(/^-/, "")}-${Date.now()}.${imageType}`;
    
    console.log(`Uploading image to storage: ${fileName}`);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("og-images")
      .upload(fileName, bytes, {
        contentType: `image/${imageType}`,
        upsert: true
      });
    
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("og-images")
      .getPublicUrl(fileName);
    
    const imageUrl = publicUrlData.publicUrl;
    console.log(`Image uploaded: ${imageUrl}`);
    
    // Save to database
    const { error: dbError } = await supabase
      .from("og_images")
      .upsert({
        page_path: pagePath,
        image_url: imageUrl,
        title: config.title,
        generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: "page_path"
      });
    
    if (dbError) {
      console.error("Database error:", dbError);
    }
    
    return new Response(
      JSON.stringify({ imageUrl, cached: false, generated: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});