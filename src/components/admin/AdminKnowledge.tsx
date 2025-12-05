import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { 
  Download, 
  FileText, 
  Globe, 
  Search, 
  ExternalLink,
  Home,
  Info,
  Phone,
  DollarSign,
  Briefcase,
  BookOpen,
  Star,
  Shield,
  FileCheck,
  Users,
  Palette,
  Target,
  Zap,
  Bot,
  Mail,
  Mic,
  Workflow,
  GraduationCap,
  MapPin,
  Calendar,
  Image,
  Layout,
  Database,
  Server,
  Lock,
  Bell,
  CreditCard,
  Settings,
  BarChart,
  MessageSquare,
  FileImage,
  Building2
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageInfo {
  route: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  icon: React.ReactNode;
  dynamic?: boolean;
  technicalDetails?: string[];
}

interface DatabaseTable {
  name: string;
  description: string;
  columns: string[];
  rlsPolicies: string[];
}

interface EdgeFunction {
  name: string;
  description: string;
  triggers: string[];
}

// Company Information
const companyInfo = {
  name: "Lunexo Media",
  tagline: "Digital Marketing & Web Development Agency",
  phone: "+1 (702) 483-0749",
  email: "hello@lunexomedia.com",
  website: "https://lunexomedia.com",
  founder: "Farhan Tanvier",
  services: [
    "Website Design & Development",
    "AI Automation & Chatbots",
    "Google Ads & PPC Management",
    "Facebook/Meta Ads",
    "Email Marketing Automation",
    "Voice AI Agents",
    "Workflow Automation",
    "SEO Services"
  ],
  targetMarket: "Small to medium businesses looking for digital marketing solutions",
  uniqueSellingPoints: [
    "AI-powered automation solutions",
    "Results-driven approach",
    "Premium modern design",
    "Full-service digital marketing"
  ]
};

// Database Tables
const databaseTables: DatabaseTable[] = [
  {
    name: "blog_posts",
    description: "Stores all blog articles with SEO data",
    columns: ["id", "title", "slug", "excerpt", "content", "image_url", "author", "published", "blocked", "publish_date", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view published posts", "Admins can CRUD all posts"]
  },
  {
    name: "portfolio",
    description: "Portfolio projects and case studies",
    columns: ["id", "title", "slug", "description", "content", "category", "image_url", "project_url", "technologies", "featured", "published", "blocked", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view published items", "Admins can CRUD all items"]
  },
  {
    name: "services",
    description: "Service offerings displayed on website",
    columns: ["id", "title", "description", "icon", "page_url", "image_path", "visible", "display_order", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view visible services", "Admins can CRUD all services"]
  },
  {
    name: "testimonials",
    description: "Client testimonials and reviews",
    columns: ["id", "quote", "author", "role", "company", "image_url", "visible", "display_order", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view visible testimonials", "Admins can CRUD all testimonials"]
  },
  {
    name: "contact_submissions",
    description: "Contact form submissions with visitor tracking",
    columns: ["id", "name", "email", "phone", "company", "message", "status", "pdf_url", "visitor_ip", "visitor_country", "visitor_city", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can submit", "Only admins can view/manage"]
  },
  {
    name: "apartment_bookings",
    description: "Appointment bookings with timezone detection",
    columns: ["id", "name", "email", "phone", "date", "time", "meeting_platform", "notes", "status", "source", "timezone", "timezone_offset", "visitor_ip", "visitor_country", "visitor_city", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can create bookings", "Anyone can view/update (admin use)"]
  },
  {
    name: "clients",
    description: "Client database for invoicing and CRM",
    columns: ["id", "name", "email", "phone", "company", "address", "city", "state", "zip_code", "country", "notes", "work_types", "created_at", "updated_at"],
    rlsPolicies: ["Full access for authenticated users"]
  },
  {
    name: "invoices",
    description: "Invoice management system",
    columns: ["id", "invoice_number", "client_id", "issue_date", "due_date", "subtotal", "tax_rate", "tax_amount", "total", "status", "notes", "payment_terms", "sent_at", "paid_at", "receipt_url", "created_at", "updated_at"],
    rlsPolicies: ["Full access for authenticated users"]
  },
  {
    name: "invoice_items",
    description: "Line items for invoices",
    columns: ["id", "invoice_id", "description", "quantity", "unit_price", "amount", "display_order", "created_at"],
    rlsPolicies: ["Full access for authenticated users"]
  },
  {
    name: "pricing",
    description: "Service pricing tiers",
    columns: ["id", "service_name", "price", "currency", "billing_period", "features", "popular", "visible", "display_order", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view visible pricing", "Admins can CRUD all pricing"]
  },
  {
    name: "reviews",
    description: "Customer reviews with moderation",
    columns: ["id", "name", "email", "rating", "comment", "source", "visible", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can submit", "Anyone can view visible reviews", "Admins can moderate"]
  },
  {
    name: "pages",
    description: "Dynamic CMS pages and landing pages",
    columns: ["id", "title", "slug", "content", "iframe_url", "html_file_url", "is_landing_page", "visible", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view visible pages", "Admins can CRUD all pages"]
  },
  {
    name: "pdf_documents",
    description: "PDF files for lead magnets",
    columns: ["id", "title", "description", "file_url", "file_size", "category", "slug", "visible", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view visible PDFs", "Only admins can manage"]
  },
  {
    name: "pdf_landing_pages",
    description: "Customizable landing pages for PDF downloads",
    columns: ["id", "slug", "pdf_document_id", "logo_text", "hero_bg_color", "main_headline", "subheadline", "hero_description", "hero_image_url", "conversion_rate", "hero_cta_text", "popup_title", "popup_subtitle", "popup_button_text", "is_active", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view active pages", "Admins can manage all"]
  },
  {
    name: "pdf_leads",
    description: "Leads captured from PDF downloads",
    columns: ["id", "pdf_document_id", "name", "email", "phone", "source", "visitor_ip", "visitor_country", "visitor_city", "created_at"],
    rlsPolicies: ["Anyone can submit", "Only admins can view"]
  },
  {
    name: "visitor_activities",
    description: "Comprehensive visitor tracking and analytics",
    columns: ["id", "activity_type", "visitor_ip", "visitor_country", "visitor_country_code", "visitor_city", "visitor_region", "visitor_timezone", "visitor_isp", "visitor_latitude", "visitor_longitude", "page_url", "page_title", "user_agent", "referrer", "related_id", "metadata", "created_at"],
    rlsPolicies: ["Anyone can log activities", "Only admins can view"]
  },
  {
    name: "company_info",
    description: "Company settings and branding",
    columns: ["id", "company_name", "logo", "email", "phone", "address", "website", "description", "tagline", "founded_year", "team_size", "linkedin_url", "twitter_url", "facebook_url", "instagram_url", "created_at", "updated_at"],
    rlsPolicies: ["Anyone can view", "Anyone can update (admin UI)"]
  },
  {
    name: "profiles",
    description: "User profiles linked to auth.users",
    columns: ["id", "email", "full_name", "avatar_url", "created_at", "updated_at"],
    rlsPolicies: ["Users can view/update own profile", "Admins can view all"]
  },
  {
    name: "user_roles",
    description: "Role-based access control",
    columns: ["id", "user_id", "role (admin/moderator/user)", "created_at"],
    rlsPolicies: ["Users can view own roles", "Only admins can manage roles"]
  },
  {
    name: "push_subscriptions",
    description: "Web push notification subscriptions",
    columns: ["id", "endpoint", "p256dh", "auth", "is_admin", "user_agent", "created_at"],
    rlsPolicies: ["Anyone can subscribe", "Service role can manage"]
  },
  {
    name: "images",
    description: "Uploaded images library",
    columns: ["id", "name", "url", "type", "size", "uploaded_at"],
    rlsPolicies: ["Full access for all users"]
  },
  {
    name: "income",
    description: "Income tracking for accounting",
    columns: ["id", "date", "amount", "source", "description", "payment_method", "client_id", "invoice_id", "receipt_url", "notes", "status", "created_at", "updated_at"],
    rlsPolicies: ["Only admins can access"]
  },
  {
    name: "expenses",
    description: "Expense tracking for accounting",
    columns: ["id", "date", "amount", "category", "description", "payment_method", "vendor", "client_id", "invoice_id", "receipt_url", "notes", "status", "created_at", "updated_at"],
    rlsPolicies: ["Only admins can access"]
  },
  {
    name: "work_types",
    description: "Types of work for client categorization",
    columns: ["id", "name", "created_at"],
    rlsPolicies: ["Anyone can view", "Only admins can manage"]
  }
];

// Edge Functions
const edgeFunctions: EdgeFunction[] = [
  {
    name: "submit-contact",
    description: "Handles contact form submissions with visitor tracking and email notification",
    triggers: ["Contact form submission", "PDF request forms"]
  },
  {
    name: "booking-notification",
    description: "Sends admin notification when new appointment is booked",
    triggers: ["New appointment booking"]
  },
  {
    name: "send-admin-notification",
    description: "General admin notification system for various events",
    triggers: ["Contact submissions", "Bookings", "Important events"]
  },
  {
    name: "send-welcome-email",
    description: "Sends welcome email to new clients with work type information",
    triggers: ["New client creation"]
  },
  {
    name: "send-invoice-email",
    description: "Emails invoice PDF to clients",
    triggers: ["Invoice sent action in admin"]
  },
  {
    name: "generate-invoice-ai",
    description: "AI-powered invoice generation from natural language",
    triggers: ["AI invoice creation in admin"]
  },
  {
    name: "send-pdf-email",
    description: "Sends PDF documents to leads who requested them",
    triggers: ["PDF landing page form submission"]
  },
  {
    name: "notify-blog-subscribers",
    description: "Notifies subscribers when new blog post is published",
    triggers: ["Blog post publication"]
  },
  {
    name: "create-blog-post",
    description: "AI-powered blog post creation",
    triggers: ["AI blog creation in admin"]
  },
  {
    name: "send-push",
    description: "Sends web push notifications to admin devices",
    triggers: ["New bookings", "Contact submissions", "Important alerts"]
  },
  {
    name: "setup-push",
    description: "Handles push notification subscription setup",
    triggers: ["Admin enables push notifications"]
  }
];

// Website Pages
const websiteKnowledge: PageInfo[] = [
  // Main Pages
  {
    route: "/",
    title: "Homepage",
    description: "Main landing page showcasing Lunexo Media's digital marketing services with hero section, services overview, testimonials, and call-to-action sections.",
    category: "Main Pages",
    features: ["Hero Section with Animated Gradients", "Services Grid (6 services)", "Testimonials Carousel", "Contact CTA", "Premium Dark Theme", "Trusted By Section", "3D Background Effects"],
    icon: <Home className="h-4 w-4" />,
    technicalDetails: ["Loads services from database", "Loads testimonials from database", "Animated gradient orbs", "Responsive design", "SEO optimized with meta tags"]
  },
  {
    route: "/about",
    title: "About Us",
    description: "Company information page featuring team details, company history, mission statement, and core values.",
    category: "Main Pages",
    features: ["Company Story", "Team Section", "Mission & Vision", "Statistics (Projects, Clients, Years)", "Premium Dark Design"],
    icon: <Info className="h-4 w-4" />,
    technicalDetails: ["Static content", "Animated counters", "Company values grid"]
  },
  {
    route: "/contact",
    title: "Contact",
    description: "Contact form page with email, phone, and location information. Form submissions are tracked with visitor IP geolocation.",
    category: "Main Pages",
    features: ["Contact Form (Name, Email, Phone, Company, Message)", "Phone: +1 (702) 483-0749", "Email: hello@lunexomedia.com", "IP-based Location Tracking", "Admin Notification on Submit"],
    icon: <Phone className="h-4 w-4" />,
    technicalDetails: ["Calls submit-contact edge function", "Tracks visitor_ip, visitor_country, visitor_city", "Sends push notification to admin", "Saves to contact_submissions table"]
  },
  {
    route: "/pricing",
    title: "Pricing",
    description: "Service pricing page displaying various pricing tiers and packages. All pricing is managed through admin panel.",
    category: "Main Pages",
    features: ["Pricing Cards from Database", "Feature Lists", "Popular Badge", "CTA Buttons", "Currency Support (USD default)"],
    icon: <DollarSign className="h-4 w-4" />,
    technicalDetails: ["Loads from pricing table", "Filters by visible=true", "Ordered by display_order"]
  },
  {
    route: "/founder",
    title: "Founder",
    description: "Founder information page with redirect to main founder page.",
    category: "Main Pages",
    features: ["Redirect to /farhan-tanvier"],
    icon: <Users className="h-4 w-4" />
  },
  {
    route: "/farhan-tanvier",
    title: "Farhan Tanvier (Founder)",
    description: "Premium founder page for Farhan Tanvier with biography, skills, timeline, achievements, and professional background.",
    category: "Main Pages",
    features: ["Premium Hero Section", "Biography", "Skills Grid", "Career Timeline", "Stats (Projects, Experience, etc.)", "Contact CTA", "SEO Optimized"],
    icon: <Users className="h-4 w-4" />,
    technicalDetails: ["Static content with premium design", "Founder image from /founder-farhan.jpg", "Meta tags for SEO"]
  },

  // Service Pages
  {
    route: "/services",
    title: "Services Overview",
    description: "Main services exploration page listing all available digital marketing and development services from database.",
    category: "Service Pages",
    features: ["Service Cards Grid", "Icons & Descriptions", "Learn More Links", "Database Driven"],
    icon: <Briefcase className="h-4 w-4" />,
    technicalDetails: ["Loads from services table", "Filters visible=true", "Links to individual service pages"]
  },
  {
    route: "/website-design",
    title: "Website Design",
    description: "Detailed service page for website design and development services with features, benefits, portfolio showcase, and pricing information.",
    category: "Service Pages",
    features: ["Service Hero", "Features Grid", "Portfolio Showcase", "Pricing Info", "Process Steps", "FAQ Section", "Contact CTA"],
    icon: <Palette className="h-4 w-4" />,
    technicalDetails: ["Links to /portfolio/website-design", "Hero image from assets", "Premium dark theme"]
  },
  {
    route: "/ads-management",
    title: "Ads Management",
    description: "PPC and advertising management services page covering Google Ads, Facebook Ads, and other platforms with ROI statistics.",
    category: "Service Pages",
    features: ["Ad Platforms (Google, Facebook, Instagram, LinkedIn)", "ROI Statistics", "Case Studies", "Pricing Tiers", "Process Overview"],
    icon: <Target className="h-4 w-4" />,
    technicalDetails: ["Links to /portfolio/ads-management", "Statistics section", "Platform logos"]
  },
  {
    route: "/ai-automation",
    title: "AI Automation",
    description: "AI-powered automation services including chatbots, workflow automation, voice agents, and business process optimization.",
    category: "Service Pages",
    features: ["AI Services Overview", "Chatbots", "Voice Agents", "Workflow Automation", "Email Automation", "Use Cases", "Integration Options"],
    icon: <Zap className="h-4 w-4" />,
    technicalDetails: ["Links to sub-service pages", "Links to /portfolio/ai-automation"]
  },

  // Service Sub-Pages
  {
    route: "/services/website-design-learn-more",
    title: "Website Design - Learn More",
    description: "Comprehensive information about website design services with detailed feature breakdown, process, and technology stack.",
    category: "Service Sub-Pages",
    features: ["Detailed Features", "Process Overview (Discovery, Design, Development, Launch)", "Technology Stack (React, Tailwind, etc.)", "Pricing Options"],
    icon: <Palette className="h-4 w-4" />
  },
  {
    route: "/services/ads-management-learn-more",
    title: "Ads Management - Learn More",
    description: "In-depth information about advertising and PPC management services across all major platforms.",
    category: "Service Sub-Pages",
    features: ["Platform Details", "Strategy Overview", "Performance Metrics", "Reporting", "Budget Management"],
    icon: <Target className="h-4 w-4" />
  },
  {
    route: "/services/ai-automation-learn-more",
    title: "AI Automation - Learn More",
    description: "Comprehensive overview of AI automation capabilities, implementation process, and ROI benefits.",
    category: "Service Sub-Pages",
    features: ["AI Technologies", "Implementation Process", "ROI Benefits", "Use Cases", "Integration Partners"],
    icon: <Zap className="h-4 w-4" />
  },
  {
    route: "/services/ai-chatbots-learn-more",
    title: "AI Chatbots - Learn More",
    description: "Detailed information about AI chatbot development and integration services for customer support and sales.",
    category: "Service Sub-Pages",
    features: ["Chatbot Features", "NLP Capabilities", "Integration Options (Website, WhatsApp, etc.)", "24/7 Support", "Lead Qualification"],
    icon: <Bot className="h-4 w-4" />
  },
  {
    route: "/services/email-automation-learn-more",
    title: "Email Automation - Learn More",
    description: "Email marketing automation services with campaign management, sequences, and analytics.",
    category: "Service Sub-Pages",
    features: ["Email Campaigns", "Automation Workflows", "Drip Sequences", "Analytics & Reporting", "A/B Testing"],
    icon: <Mail className="h-4 w-4" />
  },
  {
    route: "/services/voice-agents-learn-more",
    title: "Voice Agents - Learn More",
    description: "AI voice agent services for customer support, appointment booking, and sales automation.",
    category: "Service Sub-Pages",
    features: ["Voice AI Technology", "Call Automation", "Appointment Booking", "Sales Calls", "Multi-language Support"],
    icon: <Mic className="h-4 w-4" />
  },
  {
    route: "/services/workflow-automation-learn-more",
    title: "Workflow Automation - Learn More",
    description: "Business process automation services using tools like Zapier, Make, and custom integrations.",
    category: "Service Sub-Pages",
    features: ["Process Automation", "Tool Integration (Zapier, Make, n8n)", "Custom Workflows", "Efficiency Gains", "Cost Savings"],
    icon: <Workflow className="h-4 w-4" />
  },
  {
    route: "/services/mobile-optimized",
    title: "Mobile Optimized",
    description: "Information about mobile-first responsive design approach for all websites.",
    category: "Service Sub-Pages",
    features: ["Responsive Design", "Mobile UX Best Practices", "Touch-friendly Interfaces", "Fast Mobile Loading"],
    icon: <Layout className="h-4 w-4" />
  },
  {
    route: "/services/fast-loading",
    title: "Fast Loading",
    description: "Page speed optimization and performance enhancement services for better user experience and SEO.",
    category: "Service Sub-Pages",
    features: ["Speed Optimization", "Core Web Vitals", "Image Optimization", "Caching Strategies", "CDN Implementation"],
    icon: <Zap className="h-4 w-4" />
  },
  {
    route: "/services/seo-friendly",
    title: "SEO Friendly",
    description: "Search engine optimization strategies and implementation for better rankings.",
    category: "Service Sub-Pages",
    features: ["On-page SEO", "Technical SEO", "Keyword Strategy", "Meta Tags", "Schema Markup", "Site Structure"],
    icon: <Search className="h-4 w-4" />
  },
  {
    route: "/services/conversion-focused",
    title: "Conversion Focused",
    description: "Conversion rate optimization and sales funnel improvement strategies.",
    category: "Service Sub-Pages",
    features: ["CRO Strategies", "A/B Testing", "Landing Page Optimization", "Funnel Analysis", "Heatmaps & Analytics"],
    icon: <Target className="h-4 w-4" />
  },
  {
    route: "/services/learn-platform",
    title: "Learn Platform",
    description: "Educational platform for learning digital marketing skills.",
    category: "Service Sub-Pages",
    features: ["Courses", "Tutorials", "Resources", "Guides"],
    icon: <GraduationCap className="h-4 w-4" />
  },

  // Portfolio Pages
  {
    route: "/portfolio",
    title: "Portfolio",
    description: "Main portfolio page showcasing all completed projects. Projects are managed through admin panel and loaded from database.",
    category: "Portfolio",
    features: ["Project Cards", "Category Filter (All, Website Design, AI Automation, Ads Management)", "Image Thumbnails", "Technology Tags", "View Project Links"],
    icon: <Briefcase className="h-4 w-4" />,
    technicalDetails: ["Loads from portfolio table", "Filters published=true, blocked=false", "Category filtering", "Links to individual project pages"]
  },
  {
    route: "/portfolio/website-design",
    title: "Website Design Portfolio",
    description: "Portfolio items filtered by website design category showing all web development projects.",
    category: "Portfolio",
    features: ["Website Projects Only", "Project Thumbnails", "Technologies Used", "Live Site Links"],
    icon: <Palette className="h-4 w-4" />,
    technicalDetails: ["Filters by category='Website Design'"]
  },
  {
    route: "/portfolio/ai-automation",
    title: "AI Automation Portfolio",
    description: "Portfolio items filtered by AI automation category showing automation projects.",
    category: "Portfolio",
    features: ["AI/Automation Projects", "Results Metrics", "Client Success Stories"],
    icon: <Zap className="h-4 w-4" />,
    technicalDetails: ["Filters by category='AI Automation'"]
  },
  {
    route: "/portfolio/ads-management",
    title: "Ads Management Portfolio",
    description: "Portfolio items filtered by ads management category showing advertising campaigns.",
    category: "Portfolio",
    features: ["Ad Campaign Results", "ROI Metrics", "Platform Coverage"],
    icon: <Target className="h-4 w-4" />,
    technicalDetails: ["Filters by category='Ads Management'"]
  },
  {
    route: "/portfolio/:slug",
    title: "Portfolio Item (Dynamic)",
    description: "Individual portfolio project detail page with full project information, images, and results.",
    category: "Portfolio",
    features: ["Full Project Details", "Hero Image", "Description & Content", "Technologies Used", "Project URL", "Related Projects"],
    icon: <Briefcase className="h-4 w-4" />,
    dynamic: true,
    technicalDetails: ["Loads by slug from portfolio table", "Rich text content", "Related projects by category"]
  },
  {
    route: "/case-study/:slug",
    title: "Case Study (Dynamic)",
    description: "Detailed case study page for individual projects with in-depth analysis of problem, solution, and results.",
    category: "Portfolio",
    features: ["Problem Statement", "Solution Details", "Results & Metrics", "Client Testimonial", "Process Timeline"],
    icon: <FileText className="h-4 w-4" />,
    dynamic: true
  },

  // Blog & Content
  {
    route: "/blog",
    title: "Blog",
    description: "Main blog page listing all published blog posts with search functionality. Posts managed through admin panel.",
    category: "Blog & Content",
    features: ["Blog Post Cards", "Featured Images", "Excerpts", "Author Info", "Publish Dates", "Search Functionality"],
    icon: <BookOpen className="h-4 w-4" />,
    technicalDetails: ["Loads from blog_posts table", "Filters published=true, blocked=false", "Ordered by publish_date DESC"]
  },
  {
    route: "/blog/categories",
    title: "Blog Categories",
    description: "Blog categories overview page for content organization and navigation.",
    category: "Blog & Content",
    features: ["Category List", "Post Counts per Category", "Navigation Links"],
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    route: "/blog/:slug",
    title: "Blog Post (Dynamic)",
    description: "Individual blog post page with full article content, author info, social sharing, and related posts.",
    category: "Blog & Content",
    features: ["Full Article Content (Rich HTML)", "Featured Image", "Author Bio", "Publish Date", "Related Posts", "Social Sharing", "SEO Meta Tags"],
    icon: <FileText className="h-4 w-4" />,
    dynamic: true,
    technicalDetails: ["Loads by slug", "Rich HTML content rendering", "DOMPurify for sanitization"]
  },
  {
    route: "/tutorials",
    title: "Tutorials",
    description: "Educational tutorials page with step-by-step guides for digital marketing topics.",
    category: "Blog & Content",
    features: ["Tutorial List", "Categories", "Difficulty Levels", "Step-by-Step Guides"],
    icon: <GraduationCap className="h-4 w-4" />
  },
  {
    route: "/tutorials/:slug",
    title: "Tutorial Post (Dynamic)",
    description: "Individual tutorial page with detailed step-by-step instructions.",
    category: "Blog & Content",
    features: ["Step-by-Step Guide", "Code Examples", "Screenshots", "Resources", "Related Tutorials"],
    icon: <GraduationCap className="h-4 w-4" />,
    dynamic: true
  },

  // Booking & Forms
  {
    route: "/book-apartment",
    title: "Book Appointment",
    description: "Appointment booking page with automatic timezone detection based on visitor IP and calendar integration.",
    category: "Booking & Forms",
    features: ["Date Selection", "Time Selection", "Meeting Platform (Zoom, Google Meet, Phone)", "Timezone Auto-Detection", "IP-based Country Code for Phone", "Notes Field", "Admin Notification"],
    icon: <Calendar className="h-4 w-4" />,
    technicalDetails: ["Saves to apartment_bookings table", "Calls booking-notification edge function", "Sends push notification to admin", "Tracks visitor location", "Converts time to Bangladesh timezone for admin"]
  },
  {
    route: "/reviews",
    title: "Reviews",
    description: "Customer reviews page displaying approved reviews and allowing new review submissions.",
    category: "Booking & Forms",
    features: ["Review Display (Star Ratings)", "Submit Review Form", "Name, Email, Rating, Comment", "Admin Approval Required", "Average Rating Display"],
    icon: <Star className="h-4 w-4" />,
    technicalDetails: ["Loads from reviews table", "Filters visible=true", "New submissions visible=false by default"]
  },

  // Legal & Info
  {
    route: "/privacy",
    title: "Privacy Policy",
    description: "Privacy policy page outlining data collection, usage practices, and user rights.",
    category: "Legal & Info",
    features: ["Privacy Terms", "Data Collection Info", "Cookie Policy", "User Rights", "Contact for Privacy Concerns"],
    icon: <Shield className="h-4 w-4" />
  },
  {
    route: "/terms",
    title: "Terms of Service",
    description: "Terms and conditions page for website and service usage.",
    category: "Legal & Info",
    features: ["Terms & Conditions", "Service Agreement", "User Responsibilities", "Limitation of Liability"],
    icon: <FileCheck className="h-4 w-4" />
  },
  {
    route: "/sitemap",
    title: "Sitemap",
    description: "HTML sitemap page listing all website pages for easy navigation and SEO benefit.",
    category: "Legal & Info",
    features: ["All Page Links", "Category Organization", "SEO Benefit", "Navigation Aid"],
    icon: <MapPin className="h-4 w-4" />
  },

  // Dynamic/CMS Pages
  {
    route: "/page/:slug",
    title: "Dynamic Page",
    description: "Admin-created custom CMS pages with flexible content, can include iframes.",
    category: "Dynamic Pages",
    features: ["Custom Title", "Rich Text Content", "Optional iframe Embed", "Visibility Toggle"],
    icon: <Layout className="h-4 w-4" />,
    dynamic: true,
    technicalDetails: ["Loads from pages table by slug", "Filters visible=true", "Supports iframe_url for embeds"]
  },
  {
    route: "/guide/:slug",
    title: "Guide Page (Dynamic)",
    description: "Educational guide pages created through admin panel for detailed how-to content.",
    category: "Dynamic Pages",
    features: ["Guide Content", "Step-by-Step Instructions", "Resources & Links"],
    icon: <BookOpen className="h-4 w-4" />,
    dynamic: true
  },
  {
    route: "/pdf/:slug",
    title: "PDF Landing Page (Dynamic)",
    description: "Lead capture landing pages for PDF downloads with customizable design and email collection.",
    category: "Dynamic Pages",
    features: ["Customizable Hero Section", "PDF Preview", "Email Capture Popup", "Custom Colors", "Lead Tracking", "IP-based Phone Country Code"],
    icon: <FileText className="h-4 w-4" />,
    dynamic: true,
    technicalDetails: ["Loads from pdf_landing_pages table", "Linked to pdf_documents table", "Saves leads to pdf_leads table", "Sends PDF via email using send-pdf-email function"]
  },
  {
    route: "/:slug (catch-all)",
    title: "Landing Pages (Dynamic)",
    description: "Custom landing pages with clean URLs (no prefix). Full-screen without header/footer.",
    category: "Dynamic Pages",
    features: ["Clean URL (domain.com/slug)", "Full-Screen Design", "No Header/Footer", "Custom Content", "iframe Support", "HTML File Upload Support"],
    icon: <Layout className="h-4 w-4" />,
    dynamic: true,
    technicalDetails: ["Loads from pages table", "Filters is_landing_page=true", "Supports iframe_url and html_file_url"]
  },

  // Admin Dashboard
  {
    route: "/admin-login",
    title: "Admin Login",
    description: "Secure admin authentication page using Supabase Auth.",
    category: "Admin",
    features: ["Email/Password Authentication", "Secure Session", "Role-Based Access", "Remember Me"],
    icon: <Shield className="h-4 w-4" />,
    technicalDetails: ["Uses Supabase Auth", "Checks user_roles table for admin role", "Redirects to dashboard on success"]
  },
  {
    route: "/admin-dashboard",
    title: "Admin Dashboard - Overview",
    description: "Main admin dashboard with key metrics, recent activity, and quick actions.",
    category: "Admin",
    features: ["Total Contacts Count", "Total Bookings Count", "Total Clients Count", "Revenue Overview", "Recent Activity Feed", "Quick Action Buttons"],
    icon: <Layout className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/analytics",
    title: "Admin - Analytics",
    description: "Website analytics and visitor statistics dashboard.",
    category: "Admin",
    features: ["Page Views", "Visitor Statistics", "Geographic Data", "Traffic Sources", "Date Range Filtering"],
    icon: <BarChart className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/blog",
    title: "Admin - Blog Management",
    description: "Create, edit, and manage blog posts with rich text editor.",
    category: "Admin",
    features: ["Create New Post", "Rich Text Editor (React Quill)", "Image Upload", "SEO Settings (Title, Excerpt)", "Publish/Draft Toggle", "Delete Posts"],
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/portfolio",
    title: "Admin - Portfolio Management",
    description: "Manage portfolio projects and case studies.",
    category: "Admin",
    features: ["Add New Project", "Edit Projects", "Category Selection", "Technology Tags", "Project URL", "Featured Toggle", "Publish/Draft"],
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/services",
    title: "Admin - Services Management",
    description: "Manage service offerings displayed on website.",
    category: "Admin",
    features: ["Add/Edit Services", "Icon Selection", "Description", "Page URL", "Display Order", "Visibility Toggle"],
    icon: <Settings className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/pricing",
    title: "Admin - Pricing Management",
    description: "Manage service pricing tiers and packages.",
    category: "Admin",
    features: ["Add Pricing Tier", "Edit Price/Features", "Popular Badge", "Currency", "Billing Period", "Display Order"],
    icon: <DollarSign className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/testimonials",
    title: "Admin - Testimonials",
    description: "Manage client testimonials displayed on website.",
    category: "Admin",
    features: ["Add Testimonial", "Quote/Author/Role/Company", "Image URL", "Display Order", "Visibility Toggle"],
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/bookings",
    title: "Admin - Bookings",
    description: "View and manage appointment bookings with timezone conversion.",
    category: "Admin",
    features: ["View All Bookings", "Status Update (Pending/Confirmed/Completed/Cancelled)", "Client Details", "Meeting Platform", "Bangladesh Time Conversion", "Notes"],
    icon: <Calendar className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/contacts",
    title: "Admin - Contact Submissions",
    description: "View and manage contact form submissions.",
    category: "Admin",
    features: ["View All Submissions", "Client Details", "Message Content", "Status Update", "Visitor Location", "Date/Time"],
    icon: <Mail className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/clients",
    title: "Admin - Client Management",
    description: "Full CRM for managing client information and relationships.",
    category: "Admin",
    features: ["Add/Edit Clients", "Contact Info", "Address", "Work Types", "Notes", "Link to Invoices", "Send Welcome Email"],
    icon: <Users className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/invoices",
    title: "Admin - Invoice Management",
    description: "Create and manage invoices for clients.",
    category: "Admin",
    features: ["Create Invoice", "Line Items", "Tax Calculation", "Send via Email", "Mark as Paid", "Download PDF", "AI Invoice Generation"],
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/accounting",
    title: "Admin - Accounting",
    description: "Track income and expenses for business accounting.",
    category: "Admin",
    features: ["Income Tracking", "Expense Tracking", "Categories", "Payment Methods", "Receipt Upload", "Reports"],
    icon: <DollarSign className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/users",
    title: "Admin - User Management",
    description: "Manage admin users and roles.",
    category: "Admin",
    features: ["View Users", "Assign Roles (Admin/Moderator/User)", "View Profiles"],
    icon: <Users className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/images",
    title: "Admin - Image Library",
    description: "Upload and manage images for use across the website.",
    category: "Admin",
    features: ["Upload Images", "View Library", "Copy URL", "Delete Images", "File Size Info"],
    icon: <FileImage className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/pages",
    title: "Admin - Pages Management",
    description: "Create and manage custom CMS pages and landing pages.",
    category: "Admin",
    features: ["Create Page", "Title/Slug/Content", "iframe URL", "Landing Page Toggle", "Visibility", "HTML File Upload"],
    icon: <Layout className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/pdf-documents",
    title: "Admin - PDF Documents",
    description: "Manage PDF files for lead magnets and downloads.",
    category: "Admin",
    features: ["Upload PDFs", "Title/Description", "Category", "Generate Slug", "Visibility"],
    icon: <FileText className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/pdf-landing-pages",
    title: "Admin - PDF Landing Pages",
    description: "Create customizable landing pages for PDF downloads.",
    category: "Admin",
    features: ["Full Landing Page Editor", "Hero Section Customization", "Colors", "Headlines", "CTA Buttons", "Popup Form Settings", "Link to PDF"],
    icon: <Layout className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/pdf-leads",
    title: "Admin - PDF Leads",
    description: "View leads captured from PDF landing pages.",
    category: "Admin",
    features: ["Lead List", "Name/Email/Phone", "Source PDF", "Visitor Location", "Date", "Export"],
    icon: <Users className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/reviews",
    title: "Admin - Reviews Management",
    description: "Moderate and manage customer reviews.",
    category: "Admin",
    features: ["View All Reviews", "Approve/Hide Reviews", "Star Ratings", "Edit Reviews"],
    icon: <Star className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/visitor-tracking",
    title: "Admin - Visitor Tracking",
    description: "Comprehensive visitor activity tracking and analytics.",
    category: "Admin",
    features: ["All Activities Log", "Activity Types", "Visitor Location", "Page URLs", "User Agent", "Referrer", "Filters", "CSV Export"],
    icon: <Globe className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/notifications",
    title: "Admin - Push Notifications",
    description: "Manage push notification settings for admin alerts.",
    category: "Admin",
    features: ["Enable Push Notifications", "Test Notifications", "Subscription Status"],
    icon: <Bell className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/company",
    title: "Admin - Company Settings",
    description: "Manage company information and branding.",
    category: "Admin",
    features: ["Company Name", "Logo", "Contact Info", "Social Links", "Description"],
    icon: <Building2 className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/seo",
    title: "Admin - SEO Settings",
    description: "Manage SEO meta tags and settings.",
    category: "Admin",
    features: ["Meta Titles", "Meta Descriptions", "OG Images", "Tracking Codes"],
    icon: <Search className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/knowledge",
    title: "Admin - Knowledge Base",
    description: "Complete documentation of all website pages and features.",
    category: "Admin",
    features: ["All Pages List", "Search", "Categories", "Download as Markdown", "Download as JSON"],
    icon: <BookOpen className="h-4 w-4" />
  }
];

interface LiveData {
  blogPosts: Array<{ title: string; slug: string; published: boolean; created_at: string }>;
  portfolio: Array<{ title: string; slug: string; category: string; published: boolean }>;
  pages: Array<{ title: string; slug: string; visible: boolean }>;
  pdfDocuments: Array<{ title: string; slug: string | null; visible: boolean }>;
  services: Array<{ title: string; page_url: string; visible: boolean }>;
  clients: number;
  contacts: number;
  bookings: number;
}

const AdminKnowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pages");
  const [liveData, setLiveData] = useState<LiveData>({
    blogPosts: [],
    portfolio: [],
    pages: [],
    pdfDocuments: [],
    services: [],
    clients: 0,
    contacts: 0,
    bookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const [blogRes, portfolioRes, pagesRes, pdfRes, servicesRes, clientsRes, contactsRes, bookingsRes] = await Promise.all([
          supabase.from('blog_posts').select('title, slug, published, created_at').order('created_at', { ascending: false }),
          supabase.from('portfolio').select('title, slug, category, published').eq('published', true),
          supabase.from('pages').select('title, slug, visible').eq('visible', true),
          supabase.from('pdf_documents').select('title, slug, visible').eq('visible', true),
          supabase.from('services').select('title, page_url, visible').eq('visible', true),
          supabase.from('clients').select('id', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
          supabase.from('apartment_bookings').select('id', { count: 'exact', head: true })
        ]);

        setLiveData({
          blogPosts: blogRes.data || [],
          portfolio: portfolioRes.data || [],
          pages: pagesRes.data || [],
          pdfDocuments: pdfRes.data || [],
          services: servicesRes.data || [],
          clients: clientsRes.count || 0,
          contacts: contactsRes.count || 0,
          bookings: bookingsRes.count || 0
        });
      } catch (error) {
        console.error('Error fetching live data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();
  }, []);

  const categories = [...new Set(websiteKnowledge.map(page => page.category))];

  const filteredPages = websiteKnowledge.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedPages = categories.reduce((acc, category) => {
    acc[category] = filteredPages.filter(page => page.category === category);
    return acc;
  }, {} as Record<string, PageInfo[]>);

  const generateMarkdownContent = () => {
    let content = `# Lunexo Media Website - Complete Knowledge Base\n\n`;
    content += `**Generated:** ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}\n\n`;
    content += `---\n\n`;

    // Company Info
    content += `## Company Information\n\n`;
    content += `- **Company Name:** ${companyInfo.name}\n`;
    content += `- **Tagline:** ${companyInfo.tagline}\n`;
    content += `- **Phone:** ${companyInfo.phone}\n`;
    content += `- **Email:** ${companyInfo.email}\n`;
    content += `- **Website:** ${companyInfo.website}\n`;
    content += `- **Founder:** ${companyInfo.founder}\n\n`;
    content += `### Services Offered\n`;
    companyInfo.services.forEach(s => content += `- ${s}\n`);
    content += `\n### Unique Selling Points\n`;
    companyInfo.uniqueSellingPoints.forEach(u => content += `- ${u}\n`);
    content += `\n---\n\n`;

    // Website Stats
    content += `## Website Statistics\n\n`;
    content += `- **Total Pages:** ${websiteKnowledge.length}\n`;
    content += `- **Database Tables:** ${databaseTables.length}\n`;
    content += `- **Edge Functions:** ${edgeFunctions.length}\n\n`;
    content += `---\n\n`;

    // Pages
    content += `## All Website Pages\n\n`;
    categories.forEach(category => {
      const categoryPages = websiteKnowledge.filter(p => p.category === category);
      content += `### ${category} (${categoryPages.length} pages)\n\n`;
      
      categoryPages.forEach(page => {
        content += `#### ${page.title}\n`;
        content += `- **Route:** \`${page.route}\`\n`;
        if (page.dynamic) content += `- **Type:** Dynamic/Database-driven\n`;
        content += `- **Description:** ${page.description}\n`;
        content += `- **Features:**\n`;
        page.features.forEach(feature => content += `  - ${feature}\n`);
        if (page.technicalDetails) {
          content += `- **Technical Details:**\n`;
          page.technicalDetails.forEach(td => content += `  - ${td}\n`);
        }
        content += `\n`;
      });
    });

    // Database Tables
    content += `---\n\n## Database Schema\n\n`;
    databaseTables.forEach(table => {
      content += `### ${table.name}\n`;
      content += `${table.description}\n\n`;
      content += `**Columns:** ${table.columns.join(', ')}\n\n`;
      content += `**RLS Policies:** ${table.rlsPolicies.join('; ')}\n\n`;
    });

    // Edge Functions
    content += `---\n\n## Edge Functions (Backend)\n\n`;
    edgeFunctions.forEach(fn => {
      content += `### ${fn.name}\n`;
      content += `${fn.description}\n\n`;
      content += `**Triggers:** ${fn.triggers.join(', ')}\n\n`;
    });

    // Technical Stack
    content += `---\n\n## Technical Stack\n\n`;
    content += `- **Framework:** React 18 with Vite\n`;
    content += `- **Language:** TypeScript\n`;
    content += `- **Styling:** Tailwind CSS\n`;
    content += `- **UI Components:** shadcn/ui\n`;
    content += `- **Backend:** Supabase (Lovable Cloud)\n`;
    content += `- **Database:** PostgreSQL\n`;
    content += `- **Authentication:** Supabase Auth\n`;
    content += `- **Storage:** Supabase Storage\n`;
    content += `- **Email:** Resend (via Edge Functions)\n`;
    content += `- **Push Notifications:** Web Push API\n`;
    content += `- **Rich Text Editor:** React Quill\n`;
    content += `- **3D Effects:** Three.js / React Three Fiber\n`;
    content += `- **Charts:** Recharts\n`;
    content += `- **State Management:** React Query (TanStack)\n`;
    content += `- **Routing:** React Router v6\n`;
    content += `- **Form Handling:** React Hook Form + Zod\n`;
    content += `- **PWA:** Vite PWA Plugin\n\n`;

    // Design System
    content += `---\n\n## Design System\n\n`;
    content += `- **Theme:** Ultra-premium dark theme\n`;
    content += `- **Background:** #0a0a0f with animated gradient orbs\n`;
    content += `- **Primary Color:** Purple/violet gradients\n`;
    content += `- **Fonts:** Playfair Display (headings), System fonts (body)\n`;
    content += `- **Effects:** Glass-morphism, blur effects, gradient text\n`;
    content += `- **Animations:** Framer Motion style transitions\n\n`;

    // Key Features
    content += `---\n\n## Key Features\n\n`;
    content += `1. **Visitor Tracking:** IP-based geolocation for all form submissions\n`;
    content += `2. **Timezone Detection:** Auto-detect visitor timezone for bookings\n`;
    content += `3. **Push Notifications:** Admin receives push notifications for new leads\n`;
    content += `4. **PDF Lead Magnets:** Customizable landing pages for PDF downloads\n`;
    content += `5. **Invoice System:** Full invoicing with AI generation and email delivery\n`;
    content += `6. **CRM:** Client management with work types and welcome emails\n`;
    content += `7. **Dynamic Pages:** CMS for custom pages and landing pages\n`;
    content += `8. **SEO Optimized:** Meta tags, schema markup, sitemap\n`;
    content += `9. **PWA:** Progressive Web App for admin (installable)\n`;
    content += `10. **Multi-language Ready:** Structure supports localization\n`;

    // Live Data from Database
    content += `\n---\n\n## Live Website Data\n\n`;
    content += `### Blog Posts (${liveData.blogPosts.length})\n`;
    liveData.blogPosts.forEach(post => {
      content += `- **${post.title}** - /blog/${post.slug} (${post.published ? 'Published' : 'Draft'})\n`;
    });
    content += `\n### Portfolio Projects (${liveData.portfolio.length})\n`;
    liveData.portfolio.forEach(item => {
      content += `- **${item.title}** - /portfolio/${item.slug} [${item.category}]\n`;
    });
    content += `\n### CMS Pages (${liveData.pages.length})\n`;
    liveData.pages.forEach(page => {
      content += `- **${page.title}** - /${page.slug}\n`;
    });
    content += `\n### Statistics\n`;
    content += `- Total Clients: ${liveData.clients}\n`;
    content += `- Contact Submissions: ${liveData.contacts}\n`;
    content += `- Total Bookings: ${liveData.bookings}\n`;

    return content;
  };

  const generateJSONContent = () => {
    return JSON.stringify({
      generatedAt: new Date().toISOString(),
      company: companyInfo,
      statistics: {
        totalPages: websiteKnowledge.length,
        totalDatabaseTables: databaseTables.length,
        totalEdgeFunctions: edgeFunctions.length,
        totalBlogPosts: liveData.blogPosts.length,
        totalPortfolioItems: liveData.portfolio.length,
        totalClients: liveData.clients,
        totalContacts: liveData.contacts,
        totalBookings: liveData.bookings
      },
      liveData: {
        blogPosts: liveData.blogPosts,
        portfolio: liveData.portfolio,
        cmsPages: liveData.pages,
        services: liveData.services
      },
      pages: websiteKnowledge,
      databaseTables,
      edgeFunctions,
      sitemapUrls: [
        "https://www.lunexomedia.com/",
        "https://www.lunexomedia.com/about",
        "https://www.lunexomedia.com/contact",
        "https://www.lunexomedia.com/pricing",
        "https://www.lunexomedia.com/website-design",
        "https://www.lunexomedia.com/ads-management",
        "https://www.lunexomedia.com/ai-automation",
        "https://www.lunexomedia.com/portfolio",
        "https://www.lunexomedia.com/blog",
        "https://www.lunexomedia.com/reviews",
        "https://www.lunexomedia.com/book-apartment",
        "https://www.lunexomedia.com/farhan-tanvier",
        "https://www.lunexomedia.com/privacy",
        "https://www.lunexomedia.com/terms",
        "https://lunexomedia.com/services/website-design-learn-more",
        "https://lunexomedia.com/services/ads-management-learn-more",
        "https://lunexomedia.com/services/ai-automation-learn-more",
        "https://lunexomedia.com/services/ai-chatbots-learn-more",
        "https://lunexomedia.com/services/voice-agents-learn-more",
        "https://lunexomedia.com/services/email-automation-learn-more",
        "https://lunexomedia.com/services/workflow-automation-learn-more"
      ],
      technicalStack: {
        framework: "React 18 with Vite",
        language: "TypeScript",
        styling: "Tailwind CSS",
        uiComponents: "shadcn/ui",
        backend: "Supabase (Lovable Cloud)",
        database: "PostgreSQL",
        authentication: "Supabase Auth"
      },
      designSystem: {
        theme: "Ultra-premium dark",
        background: "#0a0a0f",
        primaryColor: "Purple/violet gradients",
        fonts: ["Playfair Display", "System fonts"]
      }
    }, null, 2);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Website Knowledge Base</h1>
          <p className="text-muted-foreground">Complete A to Z documentation of all pages, database, and features</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => downloadFile(generateMarkdownContent(), 'lunexo-knowledge-base.md', 'text/markdown')}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download MD
          </Button>
          <Button 
            onClick={() => downloadFile(generateJSONContent(), 'lunexo-knowledge-base.json', 'application/json')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{websiteKnowledge.length}</div>
            <p className="text-xs text-muted-foreground">Total Pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{databaseTables.length}</div>
            <p className="text-xs text-muted-foreground">Database Tables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{edgeFunctions.length}</div>
            <p className="text-xs text-muted-foreground">Edge Functions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Page Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Company Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Company:</strong> {companyInfo.name}</p>
              <p><strong>Tagline:</strong> {companyInfo.tagline}</p>
              <p><strong>Phone:</strong> {companyInfo.phone}</p>
              <p><strong>Email:</strong> {companyInfo.email}</p>
              <p><strong>Founder:</strong> {companyInfo.founder}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Services:</p>
              <div className="flex flex-wrap gap-1">
                {companyInfo.services.map((s, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="livedata">Live Data</TabsTrigger>
          <TabsTrigger value="pages">Pages ({websiteKnowledge.length})</TabsTrigger>
          <TabsTrigger value="database">Database ({databaseTables.length})</TabsTrigger>
          <TabsTrigger value="functions">Edge Functions ({edgeFunctions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="livedata" className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Loading live data...</p>
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold">{liveData.blogPosts.length}</div>
                      <p className="text-xs text-muted-foreground">Blog Posts</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold">{liveData.portfolio.length}</div>
                      <p className="text-xs text-muted-foreground">Portfolio Items</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold">{liveData.clients}</div>
                      <p className="text-xs text-muted-foreground">Total Clients</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-xl font-bold">{liveData.contacts}</div>
                      <p className="text-xs text-muted-foreground">Contact Submissions</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Blog Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Blog Posts ({liveData.blogPosts.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {liveData.blogPosts.map((post, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">{post.title}</p>
                            <code className="text-xs text-muted-foreground">/blog/{post.slug}</code>
                          </div>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      ))}
                      {liveData.blogPosts.length === 0 && (
                        <p className="text-sm text-muted-foreground">No blog posts found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Portfolio */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Portfolio Projects ({liveData.portfolio.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {liveData.portfolio.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <code className="text-xs text-muted-foreground">/portfolio/{item.slug}</code>
                          </div>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      ))}
                      {liveData.portfolio.length === 0 && (
                        <p className="text-sm text-muted-foreground">No portfolio items found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* CMS Pages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="h-5 w-5" />
                      CMS Pages ({liveData.pages.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {liveData.pages.map((page, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">{page.title}</p>
                            <code className="text-xs text-muted-foreground">/{page.slug}</code>
                          </div>
                          <Badge variant={page.visible ? "default" : "secondary"}>
                            {page.visible ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                      ))}
                      {liveData.pages.length === 0 && (
                        <p className="text-sm text-muted-foreground">No CMS pages found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Active Services ({liveData.services.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {liveData.services.map((service, i) => (
                        <Badge key={i} variant="secondary">
                          {service.title}
                        </Badge>
                      ))}
                      {liveData.services.length === 0 && (
                        <p className="text-sm text-muted-foreground">No services found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Sitemap URLs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Sitemap URLs (Static)
                    </CardTitle>
                    <CardDescription>URLs from public/sitemap.xml</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-1 text-xs font-mono">
                      <a href="https://www.lunexomedia.com/" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/</a>
                      <a href="https://www.lunexomedia.com/about" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/about</a>
                      <a href="https://www.lunexomedia.com/contact" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/contact</a>
                      <a href="https://www.lunexomedia.com/pricing" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/pricing</a>
                      <a href="https://www.lunexomedia.com/website-design" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/website-design</a>
                      <a href="https://www.lunexomedia.com/ads-management" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/ads-management</a>
                      <a href="https://www.lunexomedia.com/ai-automation" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/ai-automation</a>
                      <a href="https://www.lunexomedia.com/portfolio" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/portfolio</a>
                      <a href="https://www.lunexomedia.com/blog" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/blog</a>
                      <a href="https://www.lunexomedia.com/reviews" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/reviews</a>
                      <a href="https://www.lunexomedia.com/book-apartment" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/book-apartment</a>
                      <a href="https://www.lunexomedia.com/farhan-tanvier" target="_blank" className="text-primary hover:underline">https://www.lunexomedia.com/farhan-tanvier</a>
                      <p className="text-muted-foreground mt-2">+ 20 more service sub-pages in sitemap.xml</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages, routes, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[600px]">
            <Accordion type="multiple" className="w-full" defaultValue={categories}>
              {categories.map(category => {
                const pages = groupedPages[category];
                if (!pages || pages.length === 0) return null;
                
                return (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {category} ({pages.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {pages.map((page, index) => (
                          <Card key={index} className="border-l-4 border-l-primary/50">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  {page.icon}
                                  <CardTitle className="text-base">{page.title}</CardTitle>
                                  {page.dynamic && (
                                    <Badge variant="outline" className="text-xs">Dynamic</Badge>
                                  )}
                                </div>
                                <code className="text-xs bg-muted px-2 py-1 rounded">{page.route}</code>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-sm text-muted-foreground mb-2">{page.description}</p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {page.features.map((feature, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{feature}</Badge>
                                ))}
                              </div>
                              {page.technicalDetails && (
                                <div className="mt-2 text-xs text-muted-foreground">
                                  <p className="font-semibold">Technical:</p>
                                  <ul className="list-disc list-inside">
                                    {page.technicalDetails.map((td, i) => (
                                      <li key={i}>{td}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {databaseTables.map((table, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Database className="h-4 w-4" />
                      {table.name}
                    </CardTitle>
                    <CardDescription>{table.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold">Columns:</p>
                        <div className="flex flex-wrap gap-1">
                          {table.columns.map((col, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-mono">{col}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold flex items-center gap-1">
                          <Lock className="h-3 w-3" /> RLS Policies:
                        </p>
                        <ul className="text-xs text-muted-foreground list-disc list-inside">
                          {table.rlsPolicies.map((policy, i) => (
                            <li key={i}>{policy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="functions" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {edgeFunctions.map((fn, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Server className="h-4 w-4" />
                      {fn.name}
                    </CardTitle>
                    <CardDescription>{fn.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold">Triggers:</p>
                    <div className="flex flex-wrap gap-1">
                      {fn.triggers.map((trigger, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{trigger}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminKnowledge;
