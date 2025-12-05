import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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
  Layout
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PageInfo {
  route: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  icon: React.ReactNode;
  dynamic?: boolean;
}

const websiteKnowledge: PageInfo[] = [
  // Main Pages
  {
    route: "/",
    title: "Homepage",
    description: "Main landing page showcasing Lunexo Media's digital marketing services with hero section, services overview, testimonials, and call-to-action sections.",
    category: "Main Pages",
    features: ["Hero Section", "Services Grid", "Testimonials", "Contact CTA", "Premium Dark Theme", "Animated Gradients"],
    icon: <Home className="h-4 w-4" />
  },
  {
    route: "/about",
    title: "About Us",
    description: "Company information page featuring team details, company history, mission statement, and core values.",
    category: "Main Pages",
    features: ["Company Story", "Team Section", "Mission & Vision", "Statistics"],
    icon: <Info className="h-4 w-4" />
  },
  {
    route: "/contact",
    title: "Contact",
    description: "Contact form page with email, phone, and location information. Form submissions are tracked with visitor location data.",
    category: "Main Pages",
    features: ["Contact Form", "Location Map", "Phone: +1 (702) 483-0749", "Email Contact", "Visitor Tracking"],
    icon: <Phone className="h-4 w-4" />
  },
  {
    route: "/pricing",
    title: "Pricing",
    description: "Service pricing page displaying various pricing tiers and packages for all services offered.",
    category: "Main Pages",
    features: ["Pricing Cards", "Feature Comparison", "CTA Buttons", "Admin Managed"],
    icon: <DollarSign className="h-4 w-4" />
  },
  {
    route: "/founder",
    title: "Founder",
    description: "Founder information page showcasing company leadership.",
    category: "Main Pages",
    features: ["Founder Bio", "Professional Background"],
    icon: <Users className="h-4 w-4" />
  },
  {
    route: "/farhan-tanvier",
    title: "Farhan Tanvier (Founder)",
    description: "Premium founder page for Farhan Tanvier with biography, skills, timeline, and professional achievements.",
    category: "Main Pages",
    features: ["Premium Design", "Biography", "Skills Section", "Timeline", "Stats", "SEO Optimized"],
    icon: <Users className="h-4 w-4" />
  },

  // Service Pages
  {
    route: "/services",
    title: "Services Overview",
    description: "Main services exploration page listing all available digital marketing and development services.",
    category: "Service Pages",
    features: ["Service Cards", "Category Filtering", "Learn More Links"],
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    route: "/website-design",
    title: "Website Design",
    description: "Detailed service page for website design and development services with features, benefits, and pricing.",
    category: "Service Pages",
    features: ["Service Details", "Portfolio Showcase", "Pricing Info", "Contact CTA"],
    icon: <Palette className="h-4 w-4" />
  },
  {
    route: "/ads-management",
    title: "Ads Management",
    description: "PPC and advertising management services page covering Google Ads, Facebook Ads, and other platforms.",
    category: "Service Pages",
    features: ["Ad Platforms", "ROI Statistics", "Case Studies", "Pricing"],
    icon: <Target className="h-4 w-4" />
  },
  {
    route: "/ai-automation",
    title: "AI Automation",
    description: "AI-powered automation services including chatbots, workflow automation, and business process optimization.",
    category: "Service Pages",
    features: ["AI Services", "Automation Tools", "Integration Options", "Use Cases"],
    icon: <Zap className="h-4 w-4" />
  },

  // Service Sub-Pages
  {
    route: "/services/website-design-learn-more",
    title: "Website Design - Learn More",
    description: "Detailed information about website design services with comprehensive feature breakdown.",
    category: "Service Sub-Pages",
    features: ["Detailed Features", "Process Overview", "Technology Stack"],
    icon: <Palette className="h-4 w-4" />
  },
  {
    route: "/services/ads-management-learn-more",
    title: "Ads Management - Learn More",
    description: "In-depth information about advertising and PPC management services.",
    category: "Service Sub-Pages",
    features: ["Platform Details", "Strategy Overview", "Performance Metrics"],
    icon: <Target className="h-4 w-4" />
  },
  {
    route: "/services/ai-automation-learn-more",
    title: "AI Automation - Learn More",
    description: "Comprehensive overview of AI automation capabilities and implementation.",
    category: "Service Sub-Pages",
    features: ["AI Technologies", "Implementation Process", "ROI Benefits"],
    icon: <Zap className="h-4 w-4" />
  },
  {
    route: "/services/ai-chatbots-learn-more",
    title: "AI Chatbots - Learn More",
    description: "Detailed information about AI chatbot development and integration services.",
    category: "Service Sub-Pages",
    features: ["Chatbot Features", "Integration Options", "Use Cases"],
    icon: <Bot className="h-4 w-4" />
  },
  {
    route: "/services/email-automation-learn-more",
    title: "Email Automation - Learn More",
    description: "Email marketing automation services with campaign management and analytics.",
    category: "Service Sub-Pages",
    features: ["Email Campaigns", "Automation Workflows", "Analytics"],
    icon: <Mail className="h-4 w-4" />
  },
  {
    route: "/services/voice-agents-learn-more",
    title: "Voice Agents - Learn More",
    description: "AI voice agent services for customer support and sales automation.",
    category: "Service Sub-Pages",
    features: ["Voice AI", "Call Automation", "Integration"],
    icon: <Mic className="h-4 w-4" />
  },
  {
    route: "/services/workflow-automation-learn-more",
    title: "Workflow Automation - Learn More",
    description: "Business process automation services to streamline operations.",
    category: "Service Sub-Pages",
    features: ["Process Automation", "Tool Integration", "Efficiency Gains"],
    icon: <Workflow className="h-4 w-4" />
  },
  {
    route: "/services/mobile-optimized",
    title: "Mobile Optimized",
    description: "Information about mobile-first responsive design approach.",
    category: "Service Sub-Pages",
    features: ["Responsive Design", "Mobile UX", "Performance"],
    icon: <Layout className="h-4 w-4" />
  },
  {
    route: "/services/fast-loading",
    title: "Fast Loading",
    description: "Page speed optimization and performance enhancement services.",
    category: "Service Sub-Pages",
    features: ["Speed Optimization", "Core Web Vitals", "Performance Metrics"],
    icon: <Zap className="h-4 w-4" />
  },
  {
    route: "/services/seo-friendly",
    title: "SEO Friendly",
    description: "Search engine optimization strategies and implementation.",
    category: "Service Sub-Pages",
    features: ["SEO Best Practices", "Keyword Strategy", "Technical SEO"],
    icon: <Search className="h-4 w-4" />
  },
  {
    route: "/services/conversion-focused",
    title: "Conversion Focused",
    description: "Conversion rate optimization and sales funnel improvement.",
    category: "Service Sub-Pages",
    features: ["CRO Strategies", "A/B Testing", "Analytics"],
    icon: <Target className="h-4 w-4" />
  },
  {
    route: "/services/learn-platform",
    title: "Learn Platform",
    description: "Educational platform for learning digital marketing skills.",
    category: "Service Sub-Pages",
    features: ["Courses", "Tutorials", "Resources"],
    icon: <GraduationCap className="h-4 w-4" />
  },

  // Portfolio Pages
  {
    route: "/portfolio",
    title: "Portfolio",
    description: "Main portfolio page showcasing all completed projects. Projects are managed through admin panel.",
    category: "Portfolio",
    features: ["Project Cards", "Category Filter", "Admin Managed", "Dynamic Content"],
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    route: "/portfolio/website-design",
    title: "Website Design Portfolio",
    description: "Portfolio items filtered by website design category.",
    category: "Portfolio",
    features: ["Website Projects", "Case Studies", "Technologies Used"],
    icon: <Palette className="h-4 w-4" />
  },
  {
    route: "/portfolio/ai-automation",
    title: "AI Automation Portfolio",
    description: "Portfolio items filtered by AI automation category.",
    category: "Portfolio",
    features: ["AI Projects", "Automation Results", "Client Success"],
    icon: <Zap className="h-4 w-4" />
  },
  {
    route: "/portfolio/ads-management",
    title: "Ads Management Portfolio",
    description: "Portfolio items filtered by ads management category.",
    category: "Portfolio",
    features: ["Ad Campaigns", "ROI Results", "Platform Coverage"],
    icon: <Target className="h-4 w-4" />
  },
  {
    route: "/portfolio/:id",
    title: "Portfolio Item (Dynamic)",
    description: "Individual portfolio project detail page with full project information.",
    category: "Portfolio",
    features: ["Project Details", "Technologies", "Results", "Related Projects"],
    icon: <Briefcase className="h-4 w-4" />,
    dynamic: true
  },
  {
    route: "/case-study/:id",
    title: "Case Study (Dynamic)",
    description: "Detailed case study page for individual projects with in-depth analysis.",
    category: "Portfolio",
    features: ["Problem/Solution", "Results", "Testimonials"],
    icon: <FileText className="h-4 w-4" />,
    dynamic: true
  },

  // Blog & Content
  {
    route: "/blog",
    title: "Blog",
    description: "Main blog page listing all published blog posts with search and filtering.",
    category: "Blog & Content",
    features: ["Blog Posts", "Categories", "Search", "Admin Managed"],
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    route: "/blog/categories",
    title: "Blog Categories",
    description: "Blog categories overview page for content organization.",
    category: "Blog & Content",
    features: ["Category List", "Post Counts", "Navigation"],
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    route: "/blog/:slug",
    title: "Blog Post (Dynamic)",
    description: "Individual blog post page with full article content, author info, and related posts.",
    category: "Blog & Content",
    features: ["Article Content", "Author Bio", "Related Posts", "Social Sharing"],
    icon: <FileText className="h-4 w-4" />,
    dynamic: true
  },
  {
    route: "/tutorials",
    title: "Tutorials",
    description: "Educational tutorials page with step-by-step guides.",
    category: "Blog & Content",
    features: ["Tutorial List", "Categories", "Difficulty Levels"],
    icon: <GraduationCap className="h-4 w-4" />
  },
  {
    route: "/tutorials/:slug",
    title: "Tutorial Post (Dynamic)",
    description: "Individual tutorial page with detailed instructions.",
    category: "Blog & Content",
    features: ["Step-by-Step Guide", "Code Examples", "Resources"],
    icon: <GraduationCap className="h-4 w-4" />,
    dynamic: true
  },

  // Booking & Forms
  {
    route: "/book-apartment",
    title: "Book Appointment",
    description: "Appointment booking page with timezone detection and calendar integration.",
    category: "Booking & Forms",
    features: ["Date/Time Selection", "Timezone Detection", "Meeting Platforms", "Visitor Tracking"],
    icon: <Calendar className="h-4 w-4" />
  },
  {
    route: "/reviews",
    title: "Reviews",
    description: "Customer reviews and testimonials page with submission form.",
    category: "Booking & Forms",
    features: ["Review Display", "Star Ratings", "Submit Review", "Admin Approval"],
    icon: <Star className="h-4 w-4" />
  },

  // Legal & Info
  {
    route: "/privacy",
    title: "Privacy Policy",
    description: "Privacy policy page outlining data collection and usage practices.",
    category: "Legal & Info",
    features: ["Privacy Terms", "Data Usage", "Cookie Policy"],
    icon: <Shield className="h-4 w-4" />
  },
  {
    route: "/terms",
    title: "Terms of Service",
    description: "Terms and conditions page for website and service usage.",
    category: "Legal & Info",
    features: ["Terms & Conditions", "Service Agreement", "User Rights"],
    icon: <FileCheck className="h-4 w-4" />
  },
  {
    route: "/sitemap",
    title: "Sitemap",
    description: "HTML sitemap page listing all website pages for navigation and SEO.",
    category: "Legal & Info",
    features: ["Page Links", "SEO Benefit", "Navigation Aid"],
    icon: <MapPin className="h-4 w-4" />
  },

  // Dynamic/Admin Pages
  {
    route: "/page/:slug",
    title: "Dynamic Page",
    description: "Admin-created custom pages with flexible content.",
    category: "Dynamic Pages",
    features: ["Custom Content", "Admin Managed", "Flexible Layout"],
    icon: <Layout className="h-4 w-4" />,
    dynamic: true
  },
  {
    route: "/guide/:slug",
    title: "Guide Page (Dynamic)",
    description: "Educational guide pages created through admin panel.",
    category: "Dynamic Pages",
    features: ["Guide Content", "Step-by-Step", "Resources"],
    icon: <BookOpen className="h-4 w-4" />,
    dynamic: true
  },
  {
    route: "/pdf/:slug",
    title: "PDF Landing Page (Dynamic)",
    description: "Lead capture landing pages for PDF downloads with email collection.",
    category: "Dynamic Pages",
    features: ["PDF Preview", "Email Capture", "Lead Tracking", "Custom Design"],
    icon: <FileText className="h-4 w-4" />,
    dynamic: true
  },
  {
    route: "/:slug (catch-all)",
    title: "Landing Pages (Dynamic)",
    description: "Custom landing pages created in admin with clean URLs (no /landing prefix).",
    category: "Dynamic Pages",
    features: ["Full-Screen Design", "No Header/Footer", "Custom Content", "iframe Support"],
    icon: <Layout className="h-4 w-4" />,
    dynamic: true
  },

  // Admin
  {
    route: "/admin-login",
    title: "Admin Login",
    description: "Secure admin authentication page.",
    category: "Admin",
    features: ["Email/Password Auth", "Secure Access", "Role-Based"],
    icon: <Shield className="h-4 w-4" />
  },
  {
    route: "/admin-dashboard/*",
    title: "Admin Dashboard",
    description: "Comprehensive admin panel for managing all website content and settings.",
    category: "Admin",
    features: [
      "Overview & Analytics",
      "Services Management",
      "Blog Management",
      "Portfolio Management",
      "Client Management",
      "Invoice System",
      "Contact Submissions",
      "Booking Management",
      "User Management",
      "Visitor Tracking",
      "PDF Documents",
      "Landing Pages",
      "Reviews Management",
      "Pricing Management",
      "SEO Settings",
      "Push Notifications",
      "Knowledge Base"
    ],
    icon: <Layout className="h-4 w-4" />
  }
];

const AdminKnowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
    let content = `# Lunexo Media Website Knowledge Base\n\n`;
    content += `**Generated:** ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}\n\n`;
    content += `**Total Pages:** ${websiteKnowledge.length}\n\n`;
    content += `---\n\n`;

    categories.forEach(category => {
      const categoryPages = websiteKnowledge.filter(p => p.category === category);
      content += `## ${category}\n\n`;
      
      categoryPages.forEach(page => {
        content += `### ${page.title}\n`;
        content += `**Route:** \`${page.route}\`\n`;
        if (page.dynamic) content += `**Type:** Dynamic/Database-driven\n`;
        content += `**Description:** ${page.description}\n\n`;
        content += `**Features:**\n`;
        page.features.forEach(feature => {
          content += `- ${feature}\n`;
        });
        content += `\n---\n\n`;
      });
    });

    content += `## Website Technical Info\n\n`;
    content += `- **Framework:** React with Vite\n`;
    content += `- **Styling:** Tailwind CSS\n`;
    content += `- **Database:** Supabase (Lovable Cloud)\n`;
    content += `- **Authentication:** Supabase Auth\n`;
    content += `- **Theme:** Ultra-premium dark theme with animated gradients\n`;
    content += `- **Primary Phone:** +1 (702) 483-0749\n`;
    content += `- **Email Domain:** hello@lunexomedia.com\n`;
    content += `- **Navigation:** Full page reload behavior\n`;
    content += `- **Language:** English only\n`;

    return content;
  };

  const downloadKnowledge = () => {
    const content = generateMarkdownContent();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lunexo-media-knowledge-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      totalPages: websiteKnowledge.length,
      categories: categories,
      pages: websiteKnowledge,
      technicalInfo: {
        framework: "React with Vite",
        styling: "Tailwind CSS",
        database: "Supabase (Lovable Cloud)",
        authentication: "Supabase Auth",
        theme: "Ultra-premium dark theme",
        primaryPhone: "+1 (702) 483-0749",
        emailDomain: "hello@lunexomedia.com",
        navigation: "Full page reload behavior",
        language: "English only"
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lunexo-media-knowledge-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Website Knowledge Base</h2>
          <p className="text-muted-foreground">Complete documentation of all {websiteKnowledge.length} pages on your website</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadKnowledge} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download .md
          </Button>
          <Button onClick={downloadJSON}>
            <Download className="h-4 w-4 mr-2" />
            Download .json
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
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{websiteKnowledge.filter(p => p.dynamic).length}</div>
            <p className="text-xs text-muted-foreground">Dynamic Pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{websiteKnowledge.filter(p => !p.dynamic).length}</div>
            <p className="text-xs text-muted-foreground">Static Pages</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search pages, routes, or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Pages by Category */}
      <ScrollArea className="h-[600px] pr-4">
        <Accordion type="multiple" defaultValue={categories} className="space-y-4">
          {categories.map(category => {
            const categoryPages = groupedPages[category] || [];
            if (categoryPages.length === 0) return null;
            
            return (
              <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{category}</span>
                    <Badge variant="secondary" className="ml-2">{categoryPages.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3 pt-2">
                    {categoryPages.map((page, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {page.icon}
                              <CardTitle className="text-base">{page.title}</CardTitle>
                              {page.dynamic && (
                                <Badge variant="outline" className="text-xs">Dynamic</Badge>
                              )}
                            </div>
                            <code className="text-xs bg-background px-2 py-1 rounded">{page.route}</code>
                          </div>
                          <CardDescription className="text-sm">{page.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-1">
                            {page.features.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
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
    </div>
  );
};

export default AdminKnowledge;
