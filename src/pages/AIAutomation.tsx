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
  MousePointerClick
} from "lucide-react";

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

const n8nLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#EA4B71" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/>
  </svg>
);

const HuggingFaceLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#FFD21E" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
    <circle fill="#FFD21E" cx="8.5" cy="10.5" r="1.5"/>
    <circle fill="#FFD21E" cx="15.5" cy="10.5" r="1.5"/>
    <path fill="#FFD21E" d="M12 17c-2.206 0-4-1.794-4-4h8c0 2.206-1.794 4-4 4z"/>
  </svg>
);

const AIAutomation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

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

  // AI Platform Partners
  const aiPlatforms = [
    { name: "OpenAI", logo: <OpenAILogo />, description: "GPT-4 & DALL-E", color: "text-white" },
    { name: "Google AI", logo: <GoogleAILogo />, description: "Gemini & Vertex", color: "text-blue-400" },
    { name: "Anthropic", logo: <AnthropicLogo />, description: "Claude AI", color: "text-orange-300" },
    { name: "Microsoft", logo: <MicrosoftLogo />, description: "Azure AI", color: "text-blue-300" },
    { name: "Zapier", logo: <ZapierLogo />, description: "Automation Hub", color: "text-orange-500" },
    { name: "Make", logo: <MakeLogo />, description: "Visual Workflows", color: "text-purple-500" }
  ];

const aiSolutions = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Cognitive AI Chatbots",
      description: "Next-generation conversational AI with advanced NLP, context awareness, and emotional intelligence.",
      features: ["Advanced NLP", "Contextual Memory", "Emotional Intelligence", "Multi-Language"],
      metrics: { efficiency: "890%", satisfaction: "96%", resolution: "84%" },
      gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
      logo: <OpenAILogo />,
      logoName: "OpenAI GPT-4",
      techStack: ["GPT-4", "LangChain", "Vector DB"]
    },
    {
      icon: <Mail className="w-10 h-10" />,
      title: "Predictive Email AI",
      description: "AI-powered email automation that predicts behavior and personalizes content dynamically.",
      features: ["Behavioral Prediction", "Dynamic Personalization", "Optimal Timing", "A/B Optimization"],
      metrics: { efficiency: "720%", satisfaction: "94%", resolution: "78%" },
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      logo: <GoogleAILogo />,
      logoName: "Google Gemini",
      techStack: ["Gemini Pro", "SendGrid", "Analytics"]
    },
    {
      icon: <Phone className="w-10 h-10" />,
      title: "Neural Voice Agents",
      description: "Human-like AI voice assistants with natural conversation flow for seamless interactions.",
      features: ["Natural Speech", "Context Understanding", "Smart Routing", "Sentiment Analysis"],
      metrics: { efficiency: "640%", satisfaction: "92%", resolution: "88%" },
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      logo: <AnthropicLogo />,
      logoName: "Anthropic Claude",
      techStack: ["Claude 3", "ElevenLabs", "Twilio"]
    },
    {
      icon: <Workflow className="w-10 h-10" />,
      title: "Intelligent Process Automation",
      description: "End-to-end business process automation using AI to learn and optimize workflows.",
      features: ["Process Learning", "Adaptive Optimization", "Real-time Analytics", "Scalable"],
      metrics: { efficiency: "850%", satisfaction: "98%", resolution: "92%" },
      gradient: "from-amber-500 via-orange-500 to-red-500",
      logo: <ZapierLogo />,
      logoName: "Zapier + Make",
      techStack: ["Zapier", "Make", "n8n"]
    }
  ];

  const automationTypes = [
    { name: "Customer Service AI", icon: <Bot className="w-8 h-8" />, savings: "85%", volume: "50K+", gradient: "from-violet-600 to-purple-600", logo: <OpenAILogo />, description: "24/7 intelligent support" },
    { name: "Sales Automation", icon: <Target className="w-8 h-8" />, savings: "70%", volume: "25K+", gradient: "from-emerald-500 to-teal-500", logo: <GoogleAILogo />, description: "Lead scoring & nurturing" },
    { name: "Content Generation", icon: <Sparkles className="w-8 h-8" />, savings: "90%", volume: "100K+", gradient: "from-pink-500 to-rose-500", logo: <AnthropicLogo />, description: "AI-powered creativity" },
    { name: "Data Intelligence", icon: <BarChart3 className="w-8 h-8" />, savings: "80%", volume: "1M+", gradient: "from-blue-500 to-cyan-500", logo: <MicrosoftLogo />, description: "Advanced analytics" },
    { name: "Workflow Optimization", icon: <Workflow className="w-8 h-8" />, savings: "75%", volume: "15K+", gradient: "from-amber-500 to-orange-500", logo: <ZapierLogo />, description: "Seamless integrations" },
    { name: "Voice Intelligence", icon: <Phone className="w-8 h-8" />, savings: "95%", volume: "30K+", gradient: "from-fuchsia-500 to-purple-500", logo: <MakeLogo />, description: "Natural conversations" }
  ];

  const results = [
    { metric: "Time Saved", value: "50K+", unit: "hrs/month", icon: <Clock className="w-7 h-7" /> },
    { metric: "Cost Reduction", value: "85%", unit: "average", icon: <TrendingUp className="w-7 h-7" /> },
    { metric: "Accuracy Rate", value: "99.7%", unit: "precision", icon: <Target className="w-7 h-7" /> },
    { metric: "Client Growth", value: "340%", unit: "average", icon: <BarChart3 className="w-7 h-7" /> }
  ];

  const caseStudies = [
    {
      title: "Global Customer Service Revolution",
      industry: "Technology",
      challenge: "Handle 100K+ monthly support tickets across 24 time zones",
      solution: "Multi-language AI chatbot with advanced context understanding",
      results: ["98% automation rate", "60% cost reduction", "45% faster resolution"],
      investment: "$240K",
      savings: "$2.8M annually",
      timeline: "8 weeks"
    },
    {
      title: "Enterprise Sales Acceleration",
      industry: "B2B SaaS",
      challenge: "Scale lead qualification to 10K+ prospects monthly",
      solution: "AI-powered lead scoring and automated nurturing",
      results: ["450% qualified leads", "70% faster sales cycle", "8x ROI"],
      investment: "$180K",
      savings: "$4.2M annually",
      timeline: "12 weeks"
    },
    {
      title: "Content Generation Engine",
      industry: "Media & Marketing",
      challenge: "Create 1000+ pieces of content weekly",
      solution: "AI content creation with brand voice training",
      results: ["2400% content output", "90% time savings", "85% engagement boost"],
      investment: "$120K",
      savings: "$1.9M annually",
      timeline: "6 weeks"
    }
  ];

  useEffect(() => {
    document.title = "AI Automation for Business | Lunexo Media";
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-hidden">
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
      
      {/* Premium Hero Section - $50M Design */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic gradient background following mouse */}
        <div className="absolute inset-0 bg-[#0A0A0F]">
          {/* Main gradient orbs */}
          <motion.div 
            className="absolute w-[1000px] h-[1000px] rounded-full blur-[150px]"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              left: `${mousePosition.x * 30}%`,
              top: `${mousePosition.y * 30}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
              right: `${(1 - mousePosition.x) * 30}%`,
              bottom: `${(1 - mousePosition.y) * 30}%`,
            }}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-500" />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <BreadcrumbSEO 
                items={[{ label: "Services", href: "/services-explore" }]}
                currentPage="AI Automation"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-5 py-2.5 text-base font-medium rounded-full backdrop-blur-sm">
                    <Brain className="w-5 h-5 mr-2" />
                    Enterprise AI Solutions
                  </Badge>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
                >
                  <span className="text-white">AI Automation</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                    That Actually Works
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-xl"
                >
                  Enterprise-grade AI delivering{" "}
                  <span className="text-purple-400 font-bold">85% cost reduction</span> and{" "}
                  <span className="text-pink-400 font-bold">340% growth</span> acceleration.
                </motion.p>

                {/* Floating stats cards */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { value: "50K+", label: "Hours Saved" },
                    { value: "99.7%", label: "AI Accuracy" },
                    { value: "340%", label: "Growth" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 font-medium mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-5 pt-4"
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 text-white text-lg px-10 py-7 rounded-2xl font-semibold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group"
                    asChild
                  >
                    <a href="/contact">
                      Get Free AI Audit
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-10 py-7 rounded-2xl border-2 border-gray-600 text-white hover:bg-white hover:text-[#0A0A0F] transition-all duration-300 hover:scale-105 group"
                    asChild
                  >
                    <a href="/portfolio">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Demo
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right - AI Visual */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative"
              >
                <div className="relative">
                  {/* Glowing orb behind */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-rose-600/40 rounded-full blur-3xl scale-110" />
                  
                  {/* Main AI Brain Visual */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated circuit lines */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full opacity-20">
                        <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M0 25 L25 25 M25 0 L25 25 M25 25 L50 25 M25 25 L25 50" stroke="currentColor" strokeWidth="1" fill="none" className="text-purple-400"/>
                          <circle cx="25" cy="25" r="3" className="fill-purple-400"/>
                        </pattern>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)"/>
                      </svg>
                    </div>

                    {/* Center brain icon */}
                    <div className="relative z-10 flex flex-col items-center justify-center py-12">
                      <motion.div 
                        className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
                        animate={{ 
                          boxShadow: [
                            '0 0 60px rgba(168, 85, 247, 0.4)',
                            '0 0 80px rgba(236, 72, 153, 0.4)',
                            '0 0 60px rgba(168, 85, 247, 0.4)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Brain className="w-16 h-16 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mt-6 mb-2">AI-Powered Automation</h3>
                      <p className="text-gray-400 text-center max-w-sm">
                        Intelligent systems that learn, adapt, and optimize your business processes 24/7
                      </p>

                      {/* Floating tech icons */}
                      <div className="flex gap-4 mt-8">
                        {[<Cpu key="cpu" />, <Network key="network" />, <Workflow key="workflow" />, <Sparkles key="sparkles" />].map((icon, i) => (
                          <motion.div
                            key={i}
                            className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-purple-400 border border-white/10"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            {icon}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
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
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <MousePointerClick className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* AI Platform Partners - Premium Logos Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0F] to-[#0F0F18] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powered By Leading AI
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Enterprise AI Stack
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We leverage the world's most advanced AI platforms to build your automation
            </p>
          </motion.div>

          {/* Platform logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {aiPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center ${platform.color} group-hover:scale-110 transition-transform duration-300`}>
                    {platform.logo}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{platform.name}</h3>
                  <p className="text-gray-500 text-xs">{platform.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solutions Section - Premium Cards */}
      <section className="py-32 bg-gradient-to-b from-[#0F0F18] to-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-r from-pink-600/10 to-transparent rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Intelligent Solutions
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              AI That Transforms
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Your Business
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Revolutionary automation solutions designed to eliminate manual work and accelerate growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card 
                  className={`group bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-xl cursor-pointer overflow-hidden h-full ${activeSolution === index ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' : ''}`}
                  onMouseEnter={() => setActiveSolution(index)}
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className={`absolute inset-[-100%] bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-20 animate-spin-slow transition-opacity duration-700`} style={{ animationDuration: '8s' }} />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardHeader className="p-8 relative z-10">
                    {/* Powered by badge with logo */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                        <div className="w-6 h-6">
                          {solution.logo}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Powered by {solution.logoName}</span>
                      </div>
                      <motion.div 
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${solution.gradient}`}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className={`w-20 h-20 bg-gradient-to-br ${solution.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {solution.icon}
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                          {solution.title}
                        </CardTitle>
                        <p className="text-gray-400 leading-relaxed text-sm">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0 relative z-10">
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.techStack.map((tech, tIndex) => (
                        <span 
                          key={tIndex}
                          className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${solution.gradient} bg-opacity-10 text-white/90 border border-white/10`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Metrics with animated bars */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-5 bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-2xl border border-white/5">
                      <div className="text-center relative">
                        <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{solution.metrics.efficiency}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Efficiency</div>
                        <motion.div 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        />
                      </div>
                      <div className="text-center relative">
                        <div className="text-2xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">{solution.metrics.satisfaction}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Satisfaction</div>
                        <motion.div 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        />
                      </div>
                      <div className="text-center relative">
                        <div className="text-2xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">{solution.metrics.resolution}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Resolution</div>
                        <motion.div 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Features with modern styling */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {solution.features.map((feature, fIndex) => (
                        <motion.div 
                          key={fIndex} 
                          className="flex items-center gap-2 group/feat"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: fIndex * 0.1 }}
                        >
                          <div className={`w-5 h-5 rounded-md bg-gradient-to-r ${solution.gradient} flex items-center justify-center`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-300 group-hover/feat:text-white transition-colors">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button 
                      variant="ghost" 
                      className={`w-full bg-gradient-to-r ${solution.gradient} text-white font-semibold transition-all duration-300 rounded-xl group/btn hover:shadow-lg hover:shadow-purple-500/20 border-0`}
                    >
                      Explore Solution
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types Grid */}
      <section className="py-24 bg-gradient-to-b from-[#0A0A0F] to-[#0F0F18] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-pink-500/10 border border-pink-500/30 text-pink-400 px-5 py-2 mb-6">
              <Bot className="w-4 h-4 mr-2" />
              Automation Portfolio
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Complete AI{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ecosystem
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="group perspective-1000"
              >
                <Card className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-500 backdrop-blur-xl overflow-hidden">
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Glowing orb effect */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${type.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                  
                  <div className="relative z-10 p-8">
                    {/* Header with logo */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-14 h-14 bg-gradient-to-br ${type.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {type.icon}
                        </motion.div>
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          {type.logo}
                        </div>
                      </div>
                      <motion.div 
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${type.gradient}`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                      {type.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">{type.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-xl p-4 border border-white/5 group-hover:border-white/10 transition-all">
                        <div className={`text-2xl font-black bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`}>
                          {type.savings}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Cost Saved</div>
                        <motion.div 
                          className={`w-full h-1 bg-gradient-to-r ${type.gradient} rounded-full mt-2 origin-left`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: parseFloat(type.savings) / 100 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-xl p-4 border border-white/5 group-hover:border-white/10 transition-all">
                        <div className="text-2xl font-black text-white">
                          {type.volume}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Processes</div>
                        <div className="flex gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-full h-1 bg-gradient-to-r ${type.gradient} rounded-full`}
                              initial={{ opacity: 0.2 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.6 + i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover arrow */}
                    <motion.div 
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ArrowRight className={`w-5 h-5 text-gray-400`} />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gradient-to-b from-[#0F0F18] to-[#0A0A0F] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-5 py-2 mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Proven Results
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Measurable{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/10 text-center p-8 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm group">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4"
                    whileHover={{ rotate: 10 }}
                  >
                    {result.icon}
                  </motion.div>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                    {result.value}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{result.unit}</div>
                  <div className="text-white font-semibold">{result.metric}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Transformation Stories</h3>
            
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                      
                      <div className="relative z-10">
                        <Badge className="bg-white/20 text-white border-white/30 mb-4">
                          {study.industry}
                        </Badge>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6">{study.title}</h4>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="text-2xl font-bold text-white">{study.investment}</div>
                            <div className="text-sm text-white/70">Investment</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">{study.savings}</div>
                            <div className="text-sm text-white/70">Annual Savings</div>
                          </div>
                        </div>
                        <div className="text-white/80">{study.timeline}</div>
                      </div>
                    </div>
                    
                    <div className="p-10 bg-[#0A0A0F]/50">
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-bold text-red-400 mb-2">Challenge</h5>
                          <p className="text-gray-400">{study.challenge}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-purple-400 mb-2">AI Solution</h5>
                          <p className="text-gray-400">{study.solution}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-green-400 mb-3">Results</h5>
                          <div className="space-y-2">
                            {study.results.map((result, rIndex) => (
                              <div key={rIndex} className="flex items-center gap-3">
                                <Zap className="w-4 h-4 text-green-500" />
                                <span className="text-white font-medium">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#0A0A0F] via-[#0F0F18] to-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-rose-600/30 rounded-full blur-[200px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 text-lg mb-8">
                <Rocket className="w-5 h-5 mr-2" />
                Ready for Transformation?
              </Badge>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Automate Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Future Today
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join the AI revolution and transform your business operations. 
              Your competitive advantage starts with a single conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 text-white text-lg px-12 py-7 rounded-2xl font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <a href="/contact">
                  Get AI Automation Audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-12 py-7 rounded-2xl border-2 border-gray-600 text-white hover:bg-white hover:text-[#0A0A0F] transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/portfolio">
                  Explore AI Solutions
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
