import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// All pages that need OG images
const allPages = [
  "/",
  "/website-design",
  "/ai-automation",
  "/ads-management",
  "/about",
  "/contact",
  "/pricing",
  "/blog",
  "/portfolio",
  "/portfolio/website-design",
  "/portfolio/ai-automation",
  "/portfolio/ads-management",
  "/reviews",
  "/services",
  "/founder"
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { forceRegenerate } = await req.json().catch(() => ({ forceRegenerate: false }));
    
    console.log("Starting batch OG image generation...");
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const results: { path: string; status: string; imageUrl?: string; error?: string }[] = [];
    
    for (const pagePath of allPages) {
      try {
        console.log(`Processing: ${pagePath}`);
        
        // Check if already exists
        if (!forceRegenerate) {
          const { data: existing } = await supabase
            .from("og_images")
            .select("image_url")
            .eq("page_path", pagePath)
            .single();
          
          if (existing?.image_url) {
            results.push({ path: pagePath, status: "cached", imageUrl: existing.image_url });
            continue;
          }
        }
        
        // Call the single image generation function
        const response = await fetch(`${supabaseUrl}/functions/v1/generate-og-image`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${supabaseKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ pagePath, forceRegenerate })
        });
        
        const data = await response.json();
        
        if (response.ok && data.imageUrl) {
          results.push({ path: pagePath, status: "generated", imageUrl: data.imageUrl });
        } else {
          results.push({ path: pagePath, status: "error", error: data.error || "Unknown error" });
        }
        
        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 3000));
        
      } catch (error) {
        console.error(`Error processing ${pagePath}:`, error);
        results.push({ 
          path: pagePath, 
          status: "error", 
          error: error instanceof Error ? error.message : "Unknown error" 
        });
      }
    }
    
    const summary = {
      total: allPages.length,
      generated: results.filter(r => r.status === "generated").length,
      cached: results.filter(r => r.status === "cached").length,
      errors: results.filter(r => r.status === "error").length,
      results
    };
    
    console.log("Batch generation complete:", summary);
    
    return new Response(
      JSON.stringify(summary),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Batch generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});