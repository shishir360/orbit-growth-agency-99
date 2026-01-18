import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Page metadata configuration
const pageMetadata: Record<string, { title: string; description: string; image: string; keywords?: string }> = {
  "/": {
    title: "Lunexo Media | Grow with SEO, Ads, Web Design & AI Tools",
    description: "Launch faster, grow smarter. Lunexo Media helps you scale with SEO, paid ads, web design, and AI automations — everything your business needs to thrive.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "website design, digital marketing, SEO, Google ads, Facebook ads, AI automation"
  },
  "/website-design": {
    title: "Professional Website Design Services | LUNEXO MEDIA",
    description: "Get a stunning, high-converting website that drives results. Our expert team creates custom designs optimized for speed, SEO, and conversions.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "website design, web development, responsive design, custom websites"
  },
  "/ai-automation": {
    title: "AI Automation Services | Transform Your Business | LUNEXO MEDIA",
    description: "Leverage cutting-edge AI automation to streamline operations, boost productivity, and scale your business with intelligent solutions.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "AI automation, business automation, chatbots, workflow automation"
  },
  "/ads-management": {
    title: "Ads Management Services | Google & Facebook Ads | LUNEXO MEDIA",
    description: "Maximize your ROI with expert ads management. We create and optimize Google Ads, Facebook Ads, and multi-platform campaigns that deliver results.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "Google Ads, Facebook Ads, PPC management, paid advertising"
  },
  "/about": {
    title: "About LUNEXO MEDIA | Our Story & Mission",
    description: "Learn about LUNEXO MEDIA, a leading digital services agency helping businesses grow with innovative web design, AI automation, and marketing solutions.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "about us, digital agency, our team, company story"
  },
  "/contact": {
    title: "Contact Us | Get a Free Consultation | LUNEXO MEDIA",
    description: "Ready to transform your business? Contact LUNEXO MEDIA for a free consultation. Let's discuss your project and create something amazing together.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "contact, free consultation, get in touch, business inquiry"
  },
  "/pricing": {
    title: "Pricing | Transparent & Affordable Plans | LUNEXO MEDIA",
    description: "Explore our transparent pricing plans for website design, AI automation, and ads management. Find the perfect plan for your business needs.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "pricing, plans, packages, affordable services"
  },
  "/blog": {
    title: "Blog | Digital Marketing & Tech Insights | LUNEXO MEDIA",
    description: "Stay updated with the latest insights on digital marketing, web design, AI automation, and business growth strategies from LUNEXO MEDIA experts.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "blog, digital marketing tips, tech insights, business articles"
  },
  "/portfolio": {
    title: "Our Portfolio | Success Stories | LUNEXO MEDIA",
    description: "Explore our portfolio of successful projects. See how we've helped businesses transform with stunning websites, AI solutions, and high-ROI campaigns.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "portfolio, case studies, success stories, client work"
  },
  "/portfolio/website-design": {
    title: "Website Design Portfolio | Premium Web Development | LUNEXO MEDIA",
    description: "Explore our website design portfolio featuring award-winning e-commerce platforms, business websites, and web applications that drive exceptional results.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    keywords: "website portfolio, web design examples, e-commerce websites"
  },
  "/portfolio/ai-automation": {
    title: "AI Automation Portfolio | Intelligent Business Solutions | LUNEXO MEDIA",
    description: "Explore our AI automation portfolio featuring chatbots, workflow automation, and intelligent systems that transform business operations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    keywords: "AI automation portfolio, chatbot projects, workflow automation"
  },
  "/portfolio/ads-management": {
    title: "Ads Management Portfolio | ROI-Driven Campaigns | LUNEXO MEDIA",
    description: "Explore our ads management portfolio featuring high-converting Google Ads, Facebook campaigns, and multi-platform strategies that deliver exceptional ROI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    keywords: "ads portfolio, Google Ads campaigns, Facebook advertising"
  },
  "/reviews": {
    title: "Client Reviews & Testimonials | LUNEXO MEDIA",
    description: "Read what our clients say about working with LUNEXO MEDIA. Discover real testimonials and success stories from businesses we've helped grow.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "reviews, testimonials, client feedback, success stories"
  },
  "/services": {
    title: "Our Services | Digital Solutions for Growth | LUNEXO MEDIA",
    description: "Explore our comprehensive range of digital services including website design, AI automation, ads management, and SEO optimization.",
    image: "https://www.lunexomedia.com/og-image-new.jpg",
    keywords: "digital services, web design, AI automation, ads management"
  },
  "/founder": {
    title: "Meet Our Founder | Farhan Tanvir | LUNEXO MEDIA",
    description: "Meet Farhan Tanvir, the visionary founder of LUNEXO MEDIA. Learn about his journey and passion for helping businesses succeed in the digital world.",
    image: "https://www.lunexomedia.com/founder-farhan.jpg",
    keywords: "founder, Farhan Tanvir, CEO, leadership"
  },
  "/farhan-tanvier": {
    title: "Farhan Tanvir | Founder & CEO | LUNEXO MEDIA",
    description: "Farhan Tanvir is the founder and CEO of LUNEXO MEDIA, a digital agency specializing in web design, AI automation, and performance marketing.",
    image: "https://www.lunexomedia.com/founder-farhan.jpg",
    keywords: "Farhan Tanvir, founder, CEO, digital entrepreneur"
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") || "/";
    
    console.log(`Generating OG meta for path: ${path}`);
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    let metadata = pageMetadata[path];
    
    // Check for dynamic routes
    if (!metadata) {
      // Blog post
      if (path.startsWith("/blog/") && path !== "/blog/categories") {
        const slug = path.replace("/blog/", "");
        const { data: post } = await supabase
          .from("blog_posts")
          .select("title, excerpt, image_url")
          .eq("slug", slug)
          .eq("published", true)
          .single();
        
        if (post) {
          metadata = {
            title: `${post.title} | LUNEXO MEDIA Blog`,
            description: post.excerpt,
            image: post.image_url || "https://www.lunexomedia.com/og-image-new.jpg",
            keywords: "blog, article, digital marketing"
          };
        }
      }
      
      // Portfolio item
      else if (path.startsWith("/portfolio/") && !path.includes("website-design") && !path.includes("ai-automation") && !path.includes("ads-management")) {
        const slug = path.replace("/portfolio/", "");
        const { data: project } = await supabase
          .from("portfolio")
          .select("title, description, image_url, category")
          .eq("slug", slug)
          .eq("published", true)
          .single();
        
        if (project) {
          metadata = {
            title: `${project.title} | ${project.category} Project | LUNEXO MEDIA`,
            description: project.description,
            image: project.image_url || "https://www.lunexomedia.com/og-image-new.jpg",
            keywords: `portfolio, ${project.category}, case study`
          };
        }
      }
      
      // Dynamic pages
      else if (path.startsWith("/page/")) {
        const slug = path.replace("/page/", "");
        const { data: page } = await supabase
          .from("pages")
          .select("title, content")
          .eq("slug", slug)
          .eq("visible", true)
          .single();
        
        if (page) {
          const description = page.content?.substring(0, 160).replace(/<[^>]*>/g, "") || "Explore this page on LUNEXO MEDIA";
          metadata = {
            title: `${page.title} | LUNEXO MEDIA`,
            description,
            image: "https://www.lunexomedia.com/og-image-new.jpg"
          };
        }
      }
    }
    
    // Default fallback
    if (!metadata) {
      metadata = pageMetadata["/"];
    }
    
    // Generate HTML response with proper meta tags
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  ${metadata.keywords ? `<meta name="keywords" content="${metadata.keywords}">` : ""}
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${metadata.title}">
  <meta property="og:description" content="${metadata.description}">
  <meta property="og:image" content="${metadata.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://www.lunexomedia.com${path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LUNEXO MEDIA">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@lunexomedia">
  <meta name="twitter:title" content="${metadata.title}">
  <meta name="twitter:description" content="${metadata.description}">
  <meta name="twitter:image" content="${metadata.image}">
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=https://www.lunexomedia.com${path}">
  <link rel="canonical" href="https://www.lunexomedia.com${path}">
</head>
<body>
  <p>Redirecting to <a href="https://www.lunexomedia.com${path}">LUNEXO MEDIA</a>...</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
    
  } catch (error) {
    console.error("Error generating OG meta:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
