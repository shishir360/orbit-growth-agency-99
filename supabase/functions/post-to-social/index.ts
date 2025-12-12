import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const META_PAGE_ACCESS_TOKEN = Deno.env.get("META_PAGE_ACCESS_TOKEN");
const META_FACEBOOK_PAGE_ID = Deno.env.get("META_FACEBOOK_PAGE_ID");
const META_INSTAGRAM_ACCOUNT_ID = Deno.env.get("META_INSTAGRAM_ACCOUNT_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PostRequest {
  message: string;
  platforms: string[];
  imageUrl?: string;
}

async function postToFacebook(message: string, imageUrl?: string): Promise<{ success: boolean; error?: string; postId?: string }> {
  try {
    console.log("Posting to Facebook Page...");
    
    let endpoint = `https://graph.facebook.com/v21.0/${META_FACEBOOK_PAGE_ID}/feed`;
    const body: Record<string, string> = { message, access_token: META_PAGE_ACCESS_TOKEN! };
    
    if (imageUrl) {
      endpoint = `https://graph.facebook.com/v21.0/${META_FACEBOOK_PAGE_ID}/photos`;
      body.url = imageUrl;
      body.caption = message;
      delete body.message;
    }
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body),
    });
    
    const data = await response.json();
    console.log("Facebook response:", data);
    
    if (data.error) {
      return { success: false, error: data.error.message };
    }
    
    return { success: true, postId: data.id || data.post_id };
  } catch (error) {
    console.error("Facebook post error:", error);
    return { success: false, error: error.message };
  }
}

async function postToInstagram(message: string, imageUrl?: string): Promise<{ success: boolean; error?: string; postId?: string }> {
  try {
    console.log("Posting to Instagram...");
    
    if (!imageUrl) {
      return { success: false, error: "Instagram requires an image to post" };
    }
    
    if (!META_INSTAGRAM_ACCOUNT_ID) {
      return { success: false, error: "Instagram Account ID not configured" };
    }
    
    // Step 1: Create media container
    const containerResponse = await fetch(
      `https://graph.facebook.com/v21.0/${META_INSTAGRAM_ACCOUNT_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          image_url: imageUrl,
          caption: message,
          access_token: META_PAGE_ACCESS_TOKEN!,
        }),
      }
    );
    
    const containerData = await containerResponse.json();
    console.log("Instagram container response:", containerData);
    
    if (containerData.error) {
      return { success: false, error: containerData.error.message };
    }
    
    const creationId = containerData.id;
    
    // Step 2: Publish the media
    const publishResponse = await fetch(
      `https://graph.facebook.com/v21.0/${META_INSTAGRAM_ACCOUNT_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          creation_id: creationId,
          access_token: META_PAGE_ACCESS_TOKEN!,
        }),
      }
    );
    
    const publishData = await publishResponse.json();
    console.log("Instagram publish response:", publishData);
    
    if (publishData.error) {
      return { success: false, error: publishData.error.message };
    }
    
    return { success: true, postId: publishData.id };
  } catch (error) {
    console.error("Instagram post error:", error);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, platforms, imageUrl }: PostRequest = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!META_PAGE_ACCESS_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Meta Page Access Token not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const results: Record<string, { success: boolean; error?: string; postId?: string }> = {};
    
    // Post to selected platforms
    for (const platform of platforms) {
      switch (platform.toLowerCase()) {
        case "facebook":
          results.facebook = await postToFacebook(message, imageUrl);
          break;
        case "instagram":
          results.instagram = await postToInstagram(message, imageUrl);
          break;
        case "whatsapp":
          // WhatsApp doesn't support "posts" - it's a messaging platform
          results.whatsapp = { 
            success: false, 
            error: "WhatsApp is a messaging platform. Use the messaging hub to send messages." 
          };
          break;
      }
    }
    
    const allSuccess = Object.values(results).every(r => r.success);
    const anySuccess = Object.values(results).some(r => r.success);

    const responseBody = {
      success: anySuccess,
      results,
      message: allSuccess
        ? "Posted to all platforms successfully"
        : anySuccess
        ? "Posted to some platforms"
        : "Failed to post",
    };

    // Always return 200 so the client can handle per-platform errors gracefully
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in post-to-social:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
