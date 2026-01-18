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

// Unique metadata for EVERY page with specific titles and images
const pageMetadata = {
  // ============ MAIN PAGES ============
  "/": {
    title: "Lunexo Media | Grow with SEO, Ads, Web Design & AI Tools",
    description: "Launch faster, grow smarter. Lunexo Media helps you scale with SEO, paid ads, web design, and AI automations — everything your business needs to thrive.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/website-design": {
    title: "Professional Website Design Services | Custom Web Development | LUNEXO MEDIA",
    description: "Get a stunning, high-converting website that drives results. Our expert team creates custom designs optimized for speed, SEO, and conversions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  "/ai-automation": {
    title: "AI Automation Services | Chatbots & Workflow Automation | LUNEXO MEDIA",
    description: "Leverage cutting-edge AI automation to streamline operations, boost productivity, and scale your business with intelligent chatbots and workflow systems.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
  },
  "/ads-management": {
    title: "Google Ads & Facebook Ads Management | ROI-Driven Campaigns | LUNEXO MEDIA",
    description: "Maximize your ROI with expert ads management. We create and optimize Google Ads, Facebook Ads, and multi-platform campaigns that deliver exceptional results.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  "/about": {
    title: "About Us | Our Story, Mission & Team | LUNEXO MEDIA",
    description: "Learn about LUNEXO MEDIA, a leading digital services agency helping businesses grow with innovative web design, AI automation, and marketing solutions since 2021.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  "/contact": {
    title: "Contact Us | Get a Free Consultation Today | LUNEXO MEDIA",
    description: "Ready to transform your business? Contact LUNEXO MEDIA for a free consultation. Let's discuss your project and create something amazing together.",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80"
  },
  "/pricing": {
    title: "Pricing Plans | Affordable & Transparent Packages | LUNEXO MEDIA",
    description: "Explore our transparent pricing plans for website design, AI automation, and ads management. Find the perfect plan that fits your business needs and budget.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
  },
  "/blog": {
    title: "Blog | Digital Marketing Tips & Tech Insights | LUNEXO MEDIA",
    description: "Stay updated with the latest insights on digital marketing, web design, AI automation, and business growth strategies from LUNEXO MEDIA experts.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
  },
  "/blog/categories": {
    title: "Blog Categories | Browse Topics | LUNEXO MEDIA",
    description: "Browse our blog categories covering web design, AI automation, digital marketing, SEO, and business growth topics.",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=1200&q=80"
  },
  "/tutorials": {
    title: "Tutorials | Step-by-Step Guides | LUNEXO MEDIA",
    description: "Learn with our comprehensive tutorials on web development, AI tools, marketing strategies, and business automation.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  "/reviews": {
    title: "Client Reviews & Testimonials | Real Success Stories | LUNEXO MEDIA",
    description: "Read what our clients say about working with LUNEXO MEDIA. Discover real testimonials and success stories from businesses we've helped grow.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"
  },
  "/founder": {
    title: "Meet Our Founder | Farhan Tanvir | Visionary Leader | LUNEXO MEDIA",
    description: "Meet Farhan Tanvir, the visionary founder of LUNEXO MEDIA. Learn about his journey and passion for helping businesses succeed in the digital world.",
    image: "https://www.lunexomedia.com/founder-farhan.jpg"
  },
  "/farhan-tanvier": {
    title: "Farhan Tanvir | Founder & CEO | Digital Entrepreneur | LUNEXO MEDIA",
    description: "Farhan Tanvir is the founder and CEO of LUNEXO MEDIA, a digital agency specializing in web design, AI automation, and performance marketing.",
    image: "https://www.lunexomedia.com/founder-farhan.jpg"
  },
  "/book-apartment": {
    title: "Book a Consultation | Schedule Your Free Call | LUNEXO MEDIA",
    description: "Schedule a free consultation with LUNEXO MEDIA. Book your appointment to discuss your project requirements and get expert advice.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80"
  },
  
  // ============ PORTFOLIO PAGES ============
  "/portfolio": {
    title: "Our Portfolio | Showcase of Success Stories | LUNEXO MEDIA",
    description: "Explore our portfolio of successful projects. See how we've helped businesses transform with stunning websites, AI solutions, and high-ROI campaigns.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"
  },
  "/portfolio/website-design": {
    title: "Website Design Portfolio | Award-Winning Web Projects | LUNEXO MEDIA",
    description: "Explore our website design portfolio featuring award-winning e-commerce platforms, business websites, and web applications that drive exceptional results.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  "/portfolio/ai-automation": {
    title: "AI Automation Portfolio | Intelligent Business Solutions | LUNEXO MEDIA",
    description: "Explore our AI automation portfolio featuring chatbots, workflow automation, and intelligent systems that transform business operations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
  },
  "/portfolio/ads-management": {
    title: "Ads Management Portfolio | High-ROI Campaign Results | LUNEXO MEDIA",
    description: "Explore our ads management portfolio featuring high-converting Google Ads, Facebook campaigns, and multi-platform strategies that deliver exceptional ROI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  
  // ============ SERVICE PAGES ============
  "/services": {
    title: "Our Services | Complete Digital Solutions | LUNEXO MEDIA",
    description: "Explore our comprehensive range of digital services including website design, AI automation, ads management, and SEO optimization.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/mobile-optimized": {
    title: "Mobile Optimized Websites | Responsive Design | LUNEXO MEDIA",
    description: "Get a fully responsive, mobile-optimized website that looks perfect on all devices. Improve user experience and boost conversions.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/fast-loading": {
    title: "Fast Loading Websites | Speed Optimization | LUNEXO MEDIA",
    description: "Lightning-fast websites that load in under 3 seconds. Improve SEO rankings and user experience with our speed optimization services.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/seo-friendly": {
    title: "SEO Friendly Websites | Search Engine Optimization | LUNEXO MEDIA",
    description: "Build websites that rank higher on Google. Our SEO-friendly development ensures maximum visibility and organic traffic growth.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/conversion-focused": {
    title: "Conversion Focused Design | High-Converting Websites | LUNEXO MEDIA",
    description: "Websites designed to convert visitors into customers. Data-driven design strategies that maximize your business growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/ads-management-learn-more": {
    title: "Ads Management Services | PPC & Social Ads | LUNEXO MEDIA",
    description: "Expert Google Ads, Facebook Ads, and social media advertising management. Maximize ROI with data-driven campaigns.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/ai-automation-learn-more": {
    title: "AI Automation Services | Business Process Automation | LUNEXO MEDIA",
    description: "Transform your business with AI-powered automation. Streamline workflows, reduce costs, and boost efficiency.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/website-design-learn-more": {
    title: "Website Design Services | Custom Web Development | LUNEXO MEDIA",
    description: "Professional website design and development services. From concept to launch, we create stunning websites that drive results.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/ai-chatbots-learn-more": {
    title: "AI Chatbots | 24/7 Customer Support Automation | LUNEXO MEDIA",
    description: "Deploy intelligent AI chatbots for 24/7 customer support. Increase engagement, reduce response time, and automate conversations.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/email-automation-learn-more": {
    title: "Email Automation | Marketing Automation | LUNEXO MEDIA",
    description: "Powerful email automation workflows that nurture leads and drive conversions. Personalized campaigns that deliver results.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/voice-agents-learn-more": {
    title: "AI Voice Agents | Automated Phone Support | LUNEXO MEDIA",
    description: "AI-powered voice agents for automated phone support and sales calls. Handle thousands of calls with human-like conversations.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/workflow-automation-learn-more": {
    title: "Workflow Automation | Business Process Optimization | LUNEXO MEDIA",
    description: "Automate repetitive tasks and streamline your business processes. Save time and reduce errors with intelligent automation.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  "/services/learn-platform": {
    title: "Learning Platform | Digital Marketing Training | LUNEXO MEDIA",
    description: "Learn digital marketing, web development, and AI automation with our comprehensive training platform and resources.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80"
  },
  
  // ============ LEGAL & UTILITY PAGES ============
  "/sitemap": {
    title: "Sitemap | All Pages Directory | LUNEXO MEDIA",
    description: "Browse the complete sitemap of LUNEXO MEDIA. Find all pages, services, blog posts, and resources in one place.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/privacy": {
    title: "Privacy Policy | Data Protection | LUNEXO MEDIA",
    description: "Read our privacy policy to understand how LUNEXO MEDIA collects, uses, and protects your personal information.",
    image: "https://www.lunexomedia.com/og-image-new.jpg"
  },
  "/terms": {
    title: "Terms of Service | Legal Agreement | LUNEXO MEDIA",
    description: "Read the terms of service for using LUNEXO MEDIA services. Understand your rights and obligations as a client.",
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
          description: data[0].excerpt || "Read this insightful article on LUNEXO MEDIA Blog",
          image: data[0].image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
        };
      }
    }
    
    // Tutorial post
    if (path.startsWith("/tutorials/")) {
      const slug = path.replace("/tutorials/", "");
      return {
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Tutorial | LUNEXO MEDIA`,
        description: "Learn with this comprehensive tutorial from LUNEXO MEDIA",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
      };
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
          title: `${data[0].title} | ${data[0].category} Project | LUNEXO MEDIA Portfolio`,
          description: data[0].description || "Explore this amazing project from LUNEXO MEDIA portfolio",
          image: data[0].image_url || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"
        };
      }
    }
    
    // Case study
    if (path.startsWith("/case-study/")) {
      const id = path.replace("/case-study/", "");
      return {
        title: `Case Study | Client Success Story | LUNEXO MEDIA`,
        description: "Discover how LUNEXO MEDIA helped this client achieve their business goals",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
      };
    }
    
    // Dynamic pages
    if (path.startsWith("/page/")) {
      const slug = path.replace("/page/", "");
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/pages?slug=eq.${slug}&visible=eq.true&select=title`,
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
          title: `${data[0].title} | LUNEXO MEDIA`,
          description: `Explore ${data[0].title} on LUNEXO MEDIA`,
          image: "https://www.lunexomedia.com/og-image-new.jpg"
        };
      }
    }
    
    // Guide pages
    if (path.startsWith("/guide/")) {
      const slug = path.replace("/guide/", "");
      return {
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Guide | LUNEXO MEDIA`,
        description: "Comprehensive guide from LUNEXO MEDIA experts",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
      };
    }
    
    // PDF landing pages
    if (path.startsWith("/pdf/")) {
      const slug = path.replace("/pdf/", "");
      return {
        title: `Free Download | ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | LUNEXO MEDIA`,
        description: "Download this free resource from LUNEXO MEDIA",
        image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80"
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching dynamic metadata:', error);
    return null;
  }
}

// Fetch AI-generated OG image from database
async function fetchGeneratedOgImage(path) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/og_images?page_path=eq.${encodeURIComponent(path)}&select=image_url`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      }
    );
    const data = await response.json();
    if (data && data[0]?.image_url) {
      return data[0].image_url;
    }
    return null;
  } catch (error) {
    console.error('Error fetching generated OG image:', error);
    return null;
  }
}

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Skip for static files and assets
  if (path.includes('.') || path.startsWith('/assets') || path.startsWith('/api') || path.startsWith('/_') || path.startsWith('/admin')) {
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
  
  // Try to get AI-generated OG image
  const generatedImage = await fetchGeneratedOgImage(path);
  if (generatedImage) {
    metadata = { ...metadata, image: generatedImage };
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
