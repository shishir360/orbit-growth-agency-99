const SUPABASE_URL = "https://qiczzqaevdztzhllgnlg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpY3p6cWFldmR6dHpobGxnbmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTE2MzQsImV4cCI6MjA3NjAyNzYzNH0.4kihnGdnTxqjaWzqqzITob0Kwo9juSzg4MP0XxEVMgQ";

const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'LinkedInBot',
  'Twitterbot',
  'WhatsApp',
  'Slackbot',
  'TelegramBot',
  'Pinterest',
  'Discordbot'
];

const pageMetadata = {
  "/": {
    title: "Lunexo Media | Grow with SEO, Ads, Web Design & AI Tools",
    description: "Launch faster, grow smarter. Lunexo Media helps you scale with SEO, paid ads, web design, and AI automations.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/website-design": {
    title: "Professional Website Design Services | LUNEXO MEDIA",
    description: "Get a stunning, high-converting website that drives results. Our expert team creates custom designs optimized for speed, SEO, and conversions.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/ai-automation": {
    title: "AI Automation Services | Transform Your Business | LUNEXO MEDIA",
    description: "Leverage cutting-edge AI automation to streamline operations, boost productivity, and scale your business.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/ads-management": {
    title: "Ads Management Services | Google & Facebook Ads | LUNEXO MEDIA",
    description: "Maximize your ROI with expert ads management. We create and optimize Google Ads and Facebook Ads campaigns.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/about": {
    title: "About LUNEXO MEDIA | Our Story & Mission",
    description: "Learn about LUNEXO MEDIA, a leading digital services agency helping businesses grow.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/contact": {
    title: "Contact Us | Get a Free Consultation | LUNEXO MEDIA",
    description: "Ready to transform your business? Contact LUNEXO MEDIA for a free consultation.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/pricing": {
    title: "Pricing | Transparent & Affordable Plans | LUNEXO MEDIA",
    description: "Explore our transparent pricing plans for website design, AI automation, and ads management.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/blog": {
    title: "Blog | Digital Marketing & Tech Insights | LUNEXO MEDIA",
    description: "Stay updated with the latest insights on digital marketing, web design, and AI automation.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/portfolio": {
    title: "Our Portfolio | Success Stories | LUNEXO MEDIA",
    description: "Explore our portfolio of successful projects and client work.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/portfolio/website-design": {
    title: "Website Design Portfolio | Premium Web Development | LUNEXO MEDIA",
    description: "Explore our website design portfolio featuring award-winning websites.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  "/portfolio/ai-automation": {
    title: "AI Automation Portfolio | Intelligent Business Solutions | LUNEXO MEDIA",
    description: "Explore our AI automation portfolio featuring chatbots and workflow automation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
  },
  "/portfolio/ads-management": {
    title: "Ads Management Portfolio | ROI-Driven Campaigns | LUNEXO MEDIA",
    description: "Explore our ads management portfolio featuring high-converting campaigns.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  "/reviews": {
    title: "Client Reviews & Testimonials | LUNEXO MEDIA",
    description: "Read what our clients say about working with LUNEXO MEDIA.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/services": {
    title: "Our Services | Digital Solutions for Growth | LUNEXO MEDIA",
    description: "Explore our comprehensive range of digital services.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/founder": {
    title: "Meet Our Founder | Farhan Tanvir | LUNEXO MEDIA",
    description: "Meet Farhan Tanvir, the visionary founder of LUNEXO MEDIA.",
    image: "https://www.lunexomedia.com/founder-farhan.jpg"
  },
  "/farhan-tanvier": {
    title: "Farhan Tanvir | Founder & CEO | LUNEXO MEDIA",
    description: "Farhan Tanvir is the founder and CEO of LUNEXO MEDIA.",
    image: "https://www.lunexomedia.com/founder-farhan.jpg"
  },
  "/sitemap": {
    title: "Sitemap | LUNEXO MEDIA",
    description: "Browse all pages and content on LUNEXO MEDIA website.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/privacy": {
    title: "Privacy Policy | LUNEXO MEDIA",
    description: "Read our privacy policy to understand how we handle your data.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/terms": {
    title: "Terms of Service | LUNEXO MEDIA",
    description: "Read our terms of service for using LUNEXO MEDIA services.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  }
};

function isSocialBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot.toLowerCase()));
}

function generateMetaHtml(path, metadata) {
  return `<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${metadata.title}">
  <meta property="og:description" content="${metadata.description}">
  <meta property="og:image" content="${metadata.image}">
  <meta property="og:image:secure_url" content="${metadata.image}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${metadata.title}">
  <meta property="og:url" content="https://www.lunexomedia.com${path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LUNEXO MEDIA">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@lunexomedia">
  <meta name="twitter:creator" content="@lunexomedia">
  <meta name="twitter:title" content="${metadata.title}">
  <meta name="twitter:description" content="${metadata.description}">
  <meta name="twitter:image" content="${metadata.image}">
  <meta name="twitter:image:alt" content="${metadata.title}">
  
  <link rel="canonical" href="https://www.lunexomedia.com${path}">
</head>
<body>
  <h1>${metadata.title}</h1>
  <p>${metadata.description}</p>
  <img src="${metadata.image}" alt="${metadata.title}" width="1200" height="630">
  <a href="https://www.lunexomedia.com${path}">Visit LUNEXO MEDIA</a>
</body>
</html>`;
}

async function fetchDynamicMetadata(path) {
  try {
    // Blog post
    if (path.startsWith("/blog/") && path !== "/blog/categories") {
      const slug = path.replace("/blog/", "");
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}&published=eq.true&select=title,excerpt,image_url`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      );
      const data = await response.json();
      if (data && data[0]) {
        return {
          title: `${data[0].title} | LUNEXO MEDIA Blog`,
          description: data[0].excerpt || "Read this article on LUNEXO MEDIA",
          image: data[0].image_url || "https://www.lunexomedia.com/og-image-new.jpg"
        };
      }
    }
    
    // Portfolio item
    if (path.startsWith("/portfolio/") && 
        !path.includes("website-design") && 
        !path.includes("ai-automation") && 
        !path.includes("ads-management")) {
      const slug = path.replace("/portfolio/", "");
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/portfolio?slug=eq.${slug}&published=eq.true&select=title,description,image_url,category`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      );
      const data = await response.json();
      if (data && data[0]) {
        return {
          title: `${data[0].title} | ${data[0].category} Project | LUNEXO MEDIA`,
          description: data[0].description || "View this project on LUNEXO MEDIA",
          image: data[0].image_url || "https://www.lunexomedia.com/og-image-new.jpg"
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching dynamic metadata:', error);
    return null;
  }
}

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Skip for static files and assets
  if (path.includes('.') || path.startsWith('/assets') || path.startsWith('/api') || path.startsWith('/_')) {
    return;
  }
  
  // Only intercept for social media bots
  if (!isSocialBot(userAgent)) {
    return;
  }
  
  console.log(`Social bot detected for path: ${path}`);
  
  // Get metadata
  let metadata = pageMetadata[path];
  
  // Try dynamic routes if no static metadata
  if (!metadata) {
    metadata = await fetchDynamicMetadata(path);
  }
  
  // Fallback to homepage metadata
  if (!metadata) {
    metadata = pageMetadata["/"];
  }
  
  const html = generateMetaHtml(path, metadata);
  
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\..*).*)']
};
