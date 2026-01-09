import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import ServiceSchema from "@/components/ui/service-schema";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Brain, 
  MessageSquare, 
  Mail, 
  Phone, 
  Bot,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  Shield,
  Sparkles,
  Rocket,
  Trophy,
  Globe,
  Settings,
  Target,
  BarChart3,
  Cpu,
  Network,
  Workflow,
  Play,
  MousePointerClick,
  Users,
  Database,
  LineChart,
  Puzzle,
  Check,
  Calendar
} from "lucide-react";

// Blog post type
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  author: string;
  publish_date: string;
}

// Portfolio project type
interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image_url: string | null;
  technologies: string[] | null;
}

// Trusted logo type
interface TrustedLogo {
  id: string;
  name: string;
  logo_url: string;
  visible: boolean;
}

// Import images
import aiHeroDashboard from "@/assets/ai-hero-dashboard.jpg";
import aiBrainNetwork from "@/assets/ai-brain-network.jpg";
import aiTeamWorking from "@/assets/ai-team-working.jpg";

// AI Platform Logos as SVG components
const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const GoogleAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="currentColor" d="M17.304 3.541h-3.672l6.696 16.918h3.672l-6.696-16.918zm-10.608 0L0 20.459h3.744l1.368-3.6h7.104l1.368 3.6h3.744L10.608 3.541h-3.912zm-.576 10.537L9 6.852l2.88 7.226H6.12z"/>
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#F25022" d="M0 0h11.377v11.377H0z"/>
    <path fill="#00A4EF" d="M0 12.623h11.377V24H0z"/>
    <path fill="#7FBA00" d="M12.623 0H24v11.377H12.623z"/>
    <path fill="#FFB900" d="M12.623 12.623H24V24H12.623z"/>
  </svg>
);

const ZapierLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#FF4A00" d="M15.674 8.326l-2.27 2.27 5.888 5.888h-4.584v3.208h8.984v-8.984h-3.208v4.584l-5.888-5.888 2.27-2.27L12 2.268 7.134 7.134l2.27 2.27-5.888 5.888v-4.584H.308v8.984h8.984v-3.208H4.708l5.888-5.888-2.27-2.27L12 4.732l3.674 3.594z"/>
  </svg>
);

const MakeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <circle fill="#6D01D0" cx="12" cy="12" r="10"/>
    <path fill="white" d="M8 8h3v8H8V8zm5 0h3v8h-3V8z"/>
  </svg>
);

const HubSpotLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.198 2.198 0 0017.24.845h-.067a2.198 2.198 0 00-2.19 2.19v.065c0 .877.527 1.645 1.267 1.984V7.93a5.749 5.749 0 00-3.247 1.64L5.07 3.654a2.35 2.35 0 00.072-.56 2.395 2.395 0 10-2.395 2.395c.396 0 .769-.101 1.097-.275l7.848 5.86a5.754 5.754 0 00-.098 1.046c0 .385.038.76.111 1.123l-3.905 1.9a2.48 2.48 0 00-2.162-1.272 2.488 2.488 0 100 4.977 2.487 2.487 0 002.477-2.72l3.74-1.82a5.783 5.783 0 1010.31-6.178l-.001-.2z"/>
  </svg>
);

const SalesforceLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#00A1E0" d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.854 3.69 2.169a5.014 5.014 0 012.064-.44c2.79 0 5.052 2.262 5.052 5.052 0 2.79-2.262 5.052-5.052 5.052a5.02 5.02 0 01-1.036-.108 3.74 3.74 0 01-3.346 2.066c-.71 0-1.377-.197-1.946-.54a4.493 4.493 0 01-4.032 2.49c-1.927 0-3.596-1.21-4.238-2.913a3.74 3.74 0 01-.734.073c-2.065 0-3.74-1.674-3.74-3.74 0-1.337.702-2.51 1.758-3.173a4.495 4.495 0 01-.317-1.654c0-2.483 2.013-4.496 4.496-4.496 1.02 0 1.96.34 2.714.913a4.19 4.19 0 011.622-.445z"/>
  </svg>
);

const AIAutomation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [trustedLogos, setTrustedLogos] = useState<TrustedLogo[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, author, publish_date')
        .eq('published', true)
        .order('publish_date', { ascending: false })
        .limit(3);
      
      if (data && !error) {
        setBlogPosts(data);
      }
    };
    fetchBlogPosts();
  }, []);

  // Fetch portfolio projects (AI Automation category)
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('published', true)
        .eq('blocked', false)
        .eq('category', 'AI Automation')
        .limit(6)
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setPortfolioProjects(data);
      }
    };
    fetchProjects();
  }, []);

  // Fetch trusted logos
  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from('trusted_logos')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });
      
      if (data && !error) {
        setTrustedLogos(data);
      }
    };
    fetchLogos();
  }, []);

  // AI Platform Partners
  const aiPlatforms = [
    { name: "HubSpot", logo: <HubSpotLogo />, description: "CRM Automation" },
    { name: "Salesforce", logo: <SalesforceLogo />, description: "Enterprise CRM" },
    { name: "Zapier", logo: <ZapierLogo />, description: "Workflow Hub" },
    { name: "OpenAI", logo: <OpenAILogo />, description: "GPT-4 & DALL-E" },
    { name: "Make", logo: <MakeLogo />, description: "Visual Automation" },
    { name: "Google AI", logo: <GoogleAILogo />, description: "Gemini AI" }
  ];

  // Feature services
  const featureServices = [
    { icon: <Zap className="w-8 h-8" />, title: "CRM Automation", description: "Automate your customer relationship management" },
    { icon: <Database className="w-8 h-8" />, title: "Financial Automation", description: "Streamline invoicing, payments & reporting" },
    { icon: <Puzzle className="w-8 h-8" />, title: "Workflow Automation", description: "Connect apps and automate processes" },
    { icon: <Target className="w-8 h-8" />, title: "Marketing Automation", description: "Scale your marketing with AI" },
    { icon: <LineChart className="w-8 h-8" />, title: "AI Chatbots", description: "24/7 intelligent customer support" },
    { icon: <Settings className="w-8 h-8" />, title: "Business Process", description: "End-to-end process optimization" }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "90 Day Fast-Track",
      price: "Call",
      period: "3 mo",
      description: "Done-for-you in 90 days with ongoing support available",
      badge: null,
      features: [
        "90 days done-for-you",
        "Weekly progress calls",
        "Full AI end-to-end journey",
        "Bespoke for your business",
        "Quick wins in month 1",
        "ROI guaranteed"
      ],
      guarantee: "Money back guarantee*"
    },
    {
      name: "Retainer",
      price: "Call",
      period: "mo",
      description: "Ongoing monthly management with the latest updates",
      badge: "Most popular",
      features: [
        "Expert AI systems long term",
        "Weekly progress calls",
        "Full AI end-to-end journey",
        "Bespoke for your business",
        "Grows with your business",
        "Massive ROI long term"
      ],
      guarantee: "Hands off for you. Hands on for us"
    },
    {
      name: "Support",
      price: "$87",
      period: "week",
      description: "Get experts on hand daily for AI support",
      badge: null,
      features: [
        "Access to AI experts daily",
        "Help for one brand/company",
        "Fast response times",
        "On hand to help",
        "Pick our brains"
      ],
      guarantee: "Billed monthly"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What exactly does your AI Automation service offer?",
      answer: "We provide expert advisory services to help you identify the best automation opportunities, recommend the right AI tools and systems, and assist your team through the implementation process. We guide you at every step to ensure successful adoption."
    },
    {
      question: "Do I need technical expertise to work with you?",
      answer: "Not at all! We handle all the technical complexity for you. Our team works with businesses of all technical levels and ensures everything is set up and running smoothly without requiring any coding knowledge from you."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most clients see initial results within the first 30 days with quick wins. Full implementation typically takes 90 days, but you'll experience improvements in efficiency and cost savings throughout the entire process."
    },
    {
      question: "What kind of ROI can I expect?",
      answer: "Our clients typically see 85% cost reduction in automated processes, 340% growth acceleration, and save 50,000+ hours per month. The exact ROI depends on your business size and current processes."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "AI Automation for Business | Lunexo Media";
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SEO
        title="AI Automation for Business | Lunexo Media"
        description="Transform your business with enterprise-grade AI automation. Chatbots, workflows, voice AI, and intelligent agents delivering 85% cost savings."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/ai-automation"
        keywords="AI automation, chatbots, workflow automation, business automation, AI agents"
      />
      
      <ServiceSchema
        name="AI Automation Services"
        description="Transform your business with AI-powered automation delivering 85% cost reduction and 340% growth."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="AI Automation, Chatbots, Workflow Automation, Voice AI"
        url="https://www.lunexomedia.com/ai-automation"
        image="https://www.lunexomedia.com/og-image-new.jpg"
        priceRange="$$"
        aggregateRating={{ ratingValue: 5.0, reviewCount: 84 }}
      />
      
      <Navigation />
      
      {/* Hero Section - TheAIAutomationAgency Style with Image */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
      >
        {/* Emerald/Teal glow effects */}
        <div className="absolute inset-0 bg-black">
          <motion.div 
            className="absolute w-[1000px] h-[1000px] rounded-full blur-[200px]"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
              left: '-10%',
              top: '10%',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-[800px] h-[800px] rounded-full blur-[200px]"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
              right: '-5%',
              bottom: '0%',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                  Done for you AI Setup
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-8"
              >
                <span className="text-white">Done-for-you AI</span>
                <br />
                <span className="inline-block bg-[#C5FF4A] text-black px-4 py-1 rounded-2xl mt-2">
                  Plan. Build. Deploy.
                </span>
                <br />
                <span className="text-white mt-2 inline-block">In just 90 Days</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
              >
                AI fully integrated into your business within 90 days. Scale faster, reduce costs, automate everything.
              </motion.p>

              {/* CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  size="lg" 
                  className="bg-[#C5FF4A] hover:bg-[#d4ff6a] text-black text-lg px-10 py-7 rounded-full font-semibold shadow-2xl shadow-[#C5FF4A]/30 hover:shadow-[#C5FF4A]/50 transition-all duration-300 hover:scale-105 group"
                  asChild
                >
                  <a href="/contact">
                    Get Automated
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#C5FF4A]/50 text-[#C5FF4A] hover:bg-[#C5FF4A]/10 hover:border-[#C5FF4A] text-lg px-8 py-7 rounded-full font-medium"
                  asChild
                >
                  <a href="#how-it-works">
                    <Play className="w-5 h-5 mr-2" />
                    See How It Works
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/20">
                  <img 
                    src={aiHeroDashboard} 
                    alt="AI Automation Dashboard"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating Stats Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-black/90 backdrop-blur-xl border border-[#C5FF4A]/30 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#C5FF4A]/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#C5FF4A]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">340%</div>
                      <div className="text-xs text-gray-400">Growth Rate</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  ✨ AI-Powered
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* AI Platform Partners - Logo Cloud */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Leading AI Companies We Work With
            </h2>
          </motion.div>

          {/* Platform logos grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
            {aiPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  {platform.logo}
                </div>
                <span className="text-gray-500 text-xs mt-2 group-hover:text-white transition-colors">{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with Images */}
      <section id="how-it-works" className="py-24 bg-black relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full blur-[200px] -translate-y-1/2" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C5FF4A] text-sm font-medium uppercase tracking-wider mb-4 block">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Your AI Journey in{" "}
              <span className="text-[#C5FF4A]">3 Steps</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From strategy to deployment, we handle everything for you
            </p>
          </motion.div>

          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-[#C5FF4A]/10 border border-[#C5FF4A]/30 rounded-full px-4 py-2 mb-6">
                <span className="w-8 h-8 bg-[#C5FF4A] text-black rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <span className="text-[#C5FF4A] font-medium">Plan</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Strategic AI Assessment</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We analyze your business processes, identify automation opportunities, and create a custom AI implementation roadmap tailored to your specific needs and goals.
              </p>
              <ul className="space-y-3">
                {["Business process audit", "AI opportunity mapping", "ROI projections", "Custom implementation plan"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-[#C5FF4A]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10">
                <img 
                  src={aiBrainNetwork} 
                  alt="AI Strategy Planning"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
                <img 
                  src={aiTeamWorking} 
                  alt="AI Implementation Team"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <span className="text-cyan-400 font-medium">Build</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Expert Implementation</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Our team of AI specialists builds and integrates custom automation solutions, connecting all your tools and systems for seamless operation.
              </p>
              <ul className="space-y-3">
                {["Custom AI development", "System integrations", "Workflow automation", "Quality assurance testing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Step 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <span className="text-emerald-400 font-medium">Deploy</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Launch & Optimize</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We deploy your AI systems, train your team, and provide ongoing optimization to ensure maximum performance and ROI.
              </p>
              <ul className="space-y-3">
                {["Full deployment support", "Team training sessions", "Performance monitoring", "Continuous optimization"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10">
                <img 
                  src={aiHeroDashboard} 
                  alt="AI Deployment Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Success badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Go Live!
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Services Grid */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              AI Automation{" "}
              <span className="text-[#C5FF4A]">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform every aspect of your business with intelligent automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 h-full hover:border-emerald-500/50 transition-all duration-300 group overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-[#C5FF4A] mb-5 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Emerald glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "85%", label: "Cost Reduction" },
              { value: "340%", label: "Growth Rate" },
              { value: "50K+", label: "Hours Saved" },
              { value: "99.7%", label: "AI Accuracy" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-black text-[#C5FF4A] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-400 mb-4">Work short-term or long-term. Your choice.</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Pricing{" "}
              <span className="text-[#C5FF4A]">Plans</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative ${index === 1 ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                <div className={`relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border rounded-[2rem] p-8 h-full transition-all duration-300 ${index === 1 ? 'border-[#C5FF4A]/50' : 'border-white/10 hover:border-white/20'}`}>
                  {/* Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#C5FF4A] text-black text-xs font-bold px-4 py-1.5 rounded-full">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-400 mb-2">{plan.name}</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-500">/ {plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">{plan.description}</p>
                  
                  <Button 
                    className={`w-full rounded-full py-6 font-semibold transition-all duration-300 ${index === 1 ? 'bg-[#C5FF4A] text-black hover:bg-[#d4ff6a]' : 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black'}`}
                    asChild
                  >
                    <a href="/contact">
                      {plan.price === "Call" ? "Book a Call" : "Get started"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  
                  <div className="mt-4 mb-6 text-center">
                    <span className="text-xs text-emerald-400">{plan.guarantee}</span>
                  </div>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#C5FF4A] flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C5FF4A] text-sm font-medium uppercase tracking-wider mb-4 block">FAQs</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These FAQs are based on the real, pressing questions our clients asked
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-white font-medium">{item.question}</span>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button 
              variant="outline" 
              className="rounded-full border-[#C5FF4A]/50 text-[#C5FF4A] hover:bg-[#C5FF4A] hover:text-black transition-all duration-300 px-6"
              asChild
            >
              <a href="/contact">
                Still have a question?
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C5FF4A] text-sm font-medium uppercase tracking-wider mb-4 block">Blog</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Latest <span className="text-[#C5FF4A]">Insights</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Expert articles on AI automation, business growth, and digital transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="block group h-full">
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-[1.5rem] overflow-hidden h-full hover:border-[#C5FF4A]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C5FF4A]/10">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={post.image_url || '/assets/ai-automation-beginners-guide.png'} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#C5FF4A] text-black text-xs font-bold px-3 py-1 rounded-full">
                          AI Automation
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publish_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#C5FF4A] transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-[#C5FF4A] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              variant="outline" 
              className="rounded-full border-[#C5FF4A] text-[#C5FF4A] hover:bg-[#C5FF4A] hover:text-black hover:border-[#C5FF4A] transition-all duration-300 px-8"
              asChild
            >
              <Link to="/blog">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      {portfolioProjects.length > 0 && (
        <section className="py-32 bg-gradient-to-b from-black to-[#0a0f0a] relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C5FF4A]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header with Typing Animation */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="bg-[#C5FF4A] text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Our AI Projects
                  </Badge>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-4xl lg:text-6xl font-black text-white overflow-hidden">
                    <motion.span className="inline-block">
                      {"AI Automation Portfolio".split("").map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.05,
                            delay: index * 0.03,
                            ease: "easeOut"
                          }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-gray-400 text-lg mt-4 max-w-xl"
                >
                  See how we've transformed businesses with cutting-edge AI solutions
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Button 
                  variant="outline" 
                  className="mt-6 lg:mt-0 border-2 border-[#C5FF4A]/50 text-[#C5FF4A] hover:bg-[#C5FF4A] hover:text-black rounded-full px-8 transition-all duration-300"
                  asChild
                >
                  <Link to="/portfolio">
                    View All Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Portfolio Cards with Staggered Animation */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-[1.5rem] overflow-hidden hover:border-[#C5FF4A]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C5FF4A]/10 block"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {project.image_url ? (
                        <motion.img 
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#C5FF4A]/20 to-emerald-500/20 flex items-center justify-center">
                          <Brain className="w-12 h-12 text-[#C5FF4A]/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <motion.div 
                        className="absolute top-4 left-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                      >
                        <span className="bg-[#C5FF4A] text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {project.category}
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Content with Typing Effect */}
                    <div className="p-6">
                      <motion.h3 
                        className="text-xl font-bold text-white mb-3 group-hover:text-[#C5FF4A] transition-colors overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.4 }}
                      >
                        {project.title.split("").map((char, charIndex) => (
                          <motion.span
                            key={charIndex}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.02,
                              delay: index * 0.15 + 0.4 + charIndex * 0.02
                            }}
                            className="inline-block"
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-400 text-sm line-clamp-2 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.6 }}
                      >
                        {project.description}
                      </motion.p>
                      
                      {/* Technologies with Staggered Animation */}
                      {project.technologies && project.technologies.length > 0 && (
                        <motion.div 
                          className="flex flex-wrap gap-2 pt-4 border-t border-white/10"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.7 }}
                        >
                          {project.technologies.slice(0, 3).map((tech, tIndex) => (
                            <motion.span 
                              key={tIndex} 
                              className="text-xs font-medium bg-white/10 text-gray-300 px-3 py-1 rounded-full"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.15 + 0.7 + tIndex * 0.1 }}
                              whileHover={{ scale: 1.05, backgroundColor: "#C5FF4A", color: "#000" }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trusted By Section with Infinite Scroll */}
      {trustedLogos.length > 0 ? (
        <section className="py-20 bg-black relative overflow-hidden border-y border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-semibold text-[#C5FF4A] uppercase tracking-widest">
                Trusted By Industry Leaders
              </span>
            </motion.div>

            {/* Infinite Scroll Animation */}
            <div className="relative overflow-hidden">
              {/* Gradient Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
              
              {/* First Row - Scroll Left */}
              <div className="flex animate-scroll-left-ai hover:[animation-play-state:paused] mb-8">
                {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((logo, index) => (
                  <motion.div
                    key={`${logo.id}-${index}`}
                    className="flex-shrink-0 mx-8 group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-32 h-16 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-[#C5FF4A]/50 transition-all duration-300 p-4">
                      <img 
                        src={logo.logo_url} 
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Second Row - Scroll Right */}
              <div className="flex animate-scroll-right-ai hover:[animation-play-state:paused]">
                {[...trustedLogos, ...trustedLogos, ...trustedLogos].reverse().map((logo, index) => (
                  <motion.div
                    key={`${logo.id}-reverse-${index}`}
                    className="flex-shrink-0 mx-8 group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-32 h-16 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-[#C5FF4A]/50 transition-all duration-300 p-4">
                      <img 
                        src={logo.logo_url} 
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes scroll-left-ai {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
            @keyframes scroll-right-ai {
              0% { transform: translateX(-33.33%); }
              100% { transform: translateX(0); }
            }
            .animate-scroll-left-ai {
              animation: scroll-left-ai 30s linear infinite;
            }
            .animate-scroll-right-ai {
              animation: scroll-right-ai 30s linear infinite;
            }
          `}</style>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Large emerald glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-full blur-[200px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Ready to{" "}
              <span className="text-[#C5FF4A]">Automate</span>
              <br />
              Your Business?
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join the AI revolution and transform your business operations. 
              Get fully automated in just 90 days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button 
                size="lg" 
                className="bg-[#C5FF4A] hover:bg-[#d4ff6a] text-black text-lg px-12 py-7 rounded-full font-semibold shadow-2xl shadow-[#C5FF4A]/30 hover:shadow-[#C5FF4A]/50 transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <a href="/contact">
                  Get Automated Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-12 py-7 rounded-full border-2 border-[#C5FF4A]/50 text-[#C5FF4A] hover:bg-[#C5FF4A] hover:text-black transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/portfolio">
                  View Our Work
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomation;
