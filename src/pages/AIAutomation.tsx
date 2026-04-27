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
import FAQSchema from "@/components/ui/faq-schema";
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
  Calendar,
  PieChart,
  Layers,
  ShieldCheck,
  Activity
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

// Import images
import aiHeroDashboard from "@/assets/ai-hero-dashboard.jpg";
import aiBrainNetwork from "@/assets/ai-brain-network.jpg";
import aiTeamWorking from "@/assets/ai-team-working.jpg";

const AIAutomation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    document.title = "AI Automation for Business | Absolute Intelligence | Lunexo Media";
  }, []);

  const aiPlatforms = [
    { name: "HubSpot", logo: <HubSpotLogo /> },
    { name: "Salesforce", logo: <SalesforceLogo /> },
    { name: "OpenAI", logo: <OpenAILogo /> },
    { name: "Google AI", logo: <GoogleAILogo /> },
    { name: "Microsoft", logo: <MicrosoftLogo /> },
    { name: "Anthropic", logo: <AnthropicLogo /> }
  ];

  const pricingPlans = [
    {
      name: "90 Day Fast-Track Protocol",
      price: "Call",
      period: "3 mo",
      description: "Done-for-you in 90 days with ongoing absolute intelligence support.",
      features: [
        "90 days done-for-you architecture",
        "Weekly velocity progress calls",
        "Full AI end-to-end journey",
        "Bespoke neural logic",
        "Quick wins in month 1",
        "ROI guaranteed"
      ],
      guarantee: "Absolute Return Guarantee*"
    },
    {
      name: "Retainer Protocol",
      price: "Call",
      period: "mo",
      description: "Ongoing management with the latest intelligence updates and node syncs.",
      badge: "Most dominant",
      features: [
        "Expert AI systems long term",
        "Weekly velocity progress calls",
        "Full AI end-to-end journey",
        "Bespoke neural logic",
        "Grows with your business",
        "Absolute ROI trajectory"
      ],
      guarantee: "Operational Autonomy Guarantee"
    },
    {
      name: "Support Node",
      price: "$87",
      period: "week",
      description: "Get experts on hand daily for absolute neural support.",
      features: [
        "Access to AI experts daily",
        "Help for one brand/company",
        "Fast response telemetry",
        "On hand to help",
        "Pick our neural brains"
      ],
      guarantee: "Billed monthly protocol"
    }
  ];

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

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="AI Automation for Business | Absolute Intelligence | Lunexo Media"
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
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Brain className="w-5 h-5 mr-3" />
                Absolute Intelligence Protocol
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Plan. Build. <br /> <span className="text-primary italic">Deploy Logic.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Experience the absolute integration of <span className="text-primary italic font-bold">neural architectures</span> engineered for high-velocity growth and absolute operational autonomy.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center pt-8"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                <Link to="/contact">
                  Initialize Automation
                  <ArrowRight className="w-8 h-8 ml-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-2xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                <a href="#strategy">View Intelligence Strategy</a>
              </Button>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative mt-32 max-w-6xl mx-auto"
            >
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-6 lg:p-12 shadow-glass overflow-hidden">
                <img 
                  src={aiHeroDashboard} 
                  alt="AI Intelligence Preview" 
                  className="w-full h-auto rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              
              {/* Floating Node */}
              <motion.div 
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 -left-16 hidden lg:block"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3.5rem] p-12 shadow-glass space-y-6 w-96 text-center">
                  <div className="flex items-center gap-6 justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shadow-sm">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency Telemetry</div>
                      <div className="text-4xl font-black text-slate-900 tracking-tighter">+85%</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intelligence Ecosystem */}
      <section className="py-24 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
              The Intelligence Ecosystem Sync
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center opacity-50">
            {aiPlatforms.map((platform, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group cursor-pointer hover:opacity-100 transition-all duration-700">
                <div className="w-20 h-20 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl flex items-center justify-center group-hover:scale-125 transition-transform shadow-glass">
                  {platform.logo}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section id="strategy" className="py-32 relative overflow-hidden bg-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Workflow className="w-5 h-5 mr-3" />
                Strategic Evolution Protocol
              </Badge>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              The Absolute <span className="text-primary italic">Architecture.</span>
            </motion.h2>
          </div>

          <div className="space-y-40 max-w-7xl mx-auto">
            {[
              {
                step: "01",
                title: "Cognitive Audit",
                desc: "We perform a deep-tissue scan of your operational DNA to identify high-leverage AI opportunities that redefine absolute market velocity.",
                features: ["DNA Mapping Protocol", "ROI Telemetry", "Risk Mitigation Sync", "Custom Blueprint"],
                img: aiBrainNetwork
              },
              {
                step: "02",
                title: "Neural Synapse",
                desc: "Our elite engineers build and integrate custom neural pathways that connect your disparate systems into a unified absolute force.",
                features: ["Custom Core Dev", "Neural Logic Sync", "Architecture Sync", "Precision Telemetry"],
                img: aiTeamWorking,
                reverse: true
              },
              {
                step: "03",
                title: "Absolute Launch",
                desc: "We activate your new intelligent nodes, ensuring your team has the cognitive surplus to focus on absolute high-value strategy.",
                features: ["Node Activation", "Intelligence Sync", "Real-time Telemetry", "Iterative Scaling"],
                img: aiHeroDashboard
              }
            ].map((item, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-24 items-center ${item.reverse ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-8">
                    <span className="text-7xl lg:text-[10rem] font-heading font-black text-primary/5 leading-none">{item.step}</span>
                    <h3 className="text-4xl lg:text-6xl font-heading font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    {item.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-5 bg-white/60 backdrop-blur-xl border border-white/60 px-8 py-5 rounded-[2rem] shadow-sm font-black uppercase tracking-[0.2em] text-[10px] text-slate-700">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="relative"
                >
                  <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-8 shadow-glass group overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-auto rounded-[3rem] shadow-sm grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Nodes Grid */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Automated Intelligence Nodes
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Absolute <span className="text-primary italic">Intelligence Nodes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { icon: Cpu, title: "CRM Logic Protocol", desc: "Automate your customer relationship management architectures with absolute precision." },
              { icon: Database, title: "Financial Intelligence", desc: "Streamline invoicing, payments, and reporting logic for absolute fiscal velocity." },
              { icon: Network, title: "Workflow Synapse", desc: "Connect applications and automate processes through intelligent neural pathways." },
              { icon: Target, title: "Marketing Logic Node", desc: "Scale your marketing trajectory with AI-driven optimization and telemetry." },
              { icon: MessageSquare, title: "Intelligence Bots", desc: "24/7 intelligent customer support nodes that reduce friction and enhance velocity." },
              { icon: Settings, title: "Operational Logic", desc: "End-to-end business process optimization for absolute operational excellence." }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-20 hover:shadow-glass transition-all duration-1000 h-full flex flex-col hover:translate-y-[-10px]"
              >
                <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/10 mb-12 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                  <service.icon className="w-12 h-12" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-8 leading-tight">{service.title}</h3>
                <p className="text-2xl text-slate-500 mb-12 leading-relaxed font-medium flex-1">{service.desc}</p>
                <Button variant="ghost" className="p-0 h-auto font-black uppercase tracking-[0.4em] text-[10px] text-primary hover:bg-transparent hover:translate-x-4 transition-all duration-500">
                  Explore Intelligence Node <ArrowRight className="w-5 h-5 ml-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Investment (Pricing) */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Strategic Investment Protocol
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Absolute <span className="text-primary italic">Investment.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto items-start">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className={`relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-20 shadow-glass flex flex-col h-full hover:translate-y-[-12px] transition-all duration-700 ${plan.badge ? 'border-primary shadow-2xl scale-[1.05] z-10' : ''}`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                    <Star className="w-5 h-5 mr-3" /> {plan.badge}
                  </Badge>
                )}
                
                <div className="mb-16 text-center space-y-6">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 leading-tight">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-4">
                    <span className="text-7xl lg:text-8xl font-heading font-black text-slate-900 tracking-tighter">{plan.price}</span>
                    <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-12 flex-1">
                  <p className="text-2xl text-slate-500 text-center font-medium leading-relaxed">{plan.description}</p>
                  <div className="h-px bg-white/60 w-full" />
                  <ul className="space-y-8">
                    {plan.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-6 text-slate-700 font-bold text-xl">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-sm">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="uppercase tracking-widest text-[10px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-20 space-y-10 text-center">
                  <Button size="lg" className="w-full py-14 rounded-[2.5rem] font-bold text-3xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-500 shadow-2xl group/btn" asChild>
                    <Link to="/contact">
                      Acquire Protocol
                      <ArrowRight className="w-8 h-8 ml-6 group-hover/btn:translate-x-4 transition-transform" />
                    </Link>
                  </Button>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                    <ShieldCheck className="w-4 h-4 text-primary" /> {plan.guarantee}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ: Neural Logic */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-6xl mx-auto space-y-40">
            <div className="text-center space-y-16">
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Strategic Query Protocol
              </Badge>
              <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-white leading-tight tracking-tighter">
                Reclaim Your <span className="text-primary italic">Tempo.</span>
              </h2>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group" asChild>
                <Link to="/contact">
                  Initialize Automation
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="space-y-32">
              <h3 className="text-5xl lg:text-8xl font-heading font-bold text-white text-center">Neural Logic.</h3>
              <div className="grid lg:grid-cols-2 gap-16">
                {faqItems.map((faq, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="p-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[5rem] hover:border-primary/50 transition-all duration-1000 group"
                  >
                    <h4 className="text-4xl font-heading font-bold text-white mb-10 group-hover:text-primary transition-colors leading-tight">{faq.question}</h4>
                    <p className="text-2xl text-slate-400 font-medium leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomation;
