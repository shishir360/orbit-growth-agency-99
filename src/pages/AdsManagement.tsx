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
import { 
  Target, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronRight,
  Rocket,
  Trophy,
  Globe,
  Shield,
  Sparkles,
  Play,
  PieChart,
  Layers,
  ShieldCheck,
  Activity,
  Cpu
} from "lucide-react";
import { Link } from "react-router-dom";

const AdsManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Paid Advertising & ROI Orchestration | Lunexo Media";
  }, []);

  const platformLogos = [
    {
      name: "Google Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      description: "Search & YouTube",
      roas: "5.2x"
    },
    {
      name: "Meta Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      description: "FB & Instagram",
      roas: "4.8x"
    },
    {
      name: "TikTok Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#FF0050" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      description: "Viral Logic",
      roas: "6.4x"
    },
    {
      name: "LinkedIn Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: "B2B Protocol",
      roas: "7.1x"
    }
  ];

  const premiumServices = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Architecture",
      description: "Enterprise-level advertising logic with advanced targeting methodologies and cross-platform orchestration.",
      features: ["Audience Intelligence", "Market DNA Analysis", "Multi-Spectrum Attribution", "Velocity Forecasting"],
      metrics: { roas: "540%", ctr: "4.8%", conv: "24%" }
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data Intelligence",
      description: "AI-powered performance optimization using machine learning algorithms and predictive telemetry.",
      features: ["Predictive Analytics", "Real-Time Telemetry", "Custom Attribution", "Advanced Segmentation"],
      metrics: { roas: "480%", ctr: "5.2%", conv: "28%" }
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Omnichannel Dominance",
      description: "Comprehensive advertising across all major platforms with unified logic and budget allocation.",
      features: ["Platform Optimization", "Creative Automation", "Budget Intelligence", "Cross-Platform Sync"],
      metrics: { roas: "620%", ctr: "4.2%", conv: "31%" }
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Growth Acceleration",
      description: "Rapid scaling solutions for ambitious brands ready to dominate their market trajectory.",
      features: ["Rapid Scaling Logic", "Market Expansion", "Competitive Advantage", "ROI Maximization"],
      metrics: { roas: "720%", ctr: "6.1%", conv: "34%" }
    }
  ];

  const results = [
    { metric: "Average ROAS", value: "640%", icon: <TrendingUp className="w-6 h-6" /> },
    { metric: "Generated Revenue", value: "$127M+", icon: <DollarSign className="w-6 h-6" /> },
    { metric: "Success Rate", value: "98.4%", icon: <Trophy className="w-6 h-6" /> },
    { metric: "Global Nodes", value: "47", icon: <Globe className="w-6 h-6" /> }
  ];

  const caseStudies = [
    {
      title: "Enterprise SaaS Scaling",
      industry: "Software Architecture",
      challenge: "Scale from $500K to $10M ARR velocity.",
      solution: "Comprehensive multi-platform logic with advanced attribution telemetry.",
      results: ["1,900% Growth Velocity", "480% ROAS", "85% Lower CAC"],
      investment: "$2.4M",
      returns: "$47M",
      timeline: "18 months"
    },
    {
      title: "Global E-commerce Empire",
      industry: "Retail Logic",
      challenge: "International expansion and absolute market dominance.",
      solution: "Localized campaigns across 12 countries with dynamic creative nodes.",
      results: ["2,400% International Growth", "620% ROAS", "Market Leadership"],
      investment: "$3.8M",
      returns: "$89M",
      timeline: "24 months"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Paid Advertising & ROI Orchestration | Lunexo Media"
        description="Maximize ROI with targeted Google Ads, Facebook Ads, and social media ad campaigns managed by Lunexo Media's digital experts."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/ads-management"
        keywords="Google Ads, Facebook Ads, PPC management, paid advertising, digital advertising, ROI optimization"
      />
      
      <ServiceSchema
        name="Paid Advertising & ROI Orchestration"
        description="Expert PPC management services for Google Ads, Facebook Ads, and social media campaigns."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="PPC Management, Google Ads, Facebook Ads, Social Media Advertising"
        url="https://www.lunexomedia.com/ads-management"
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
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <Target className="w-5 h-5 mr-3" />
                Performance-Driven Orchestration
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Scale Your <br /> <span className="text-primary italic">ROI Velocity.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Enterprise-grade advertising delivering <span className="text-primary italic font-bold">640% average ROAS</span> through predictive intelligence and absolute market dominance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center pt-8"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                <Link to="/contact">
                  Start Scaling Now
                  <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                <Link to="/portfolio">View Case Protocols</Link>
              </Button>
            </motion.div>

            {/* Performance Telemetry Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-32 max-w-6xl mx-auto">
              {results.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-10 shadow-glass text-center group hover:translate-y-[-8px] transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {result.icon}
                  </div>
                  <div className="text-4xl font-black text-slate-900 mb-2">{result.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{result.metric}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Omnichannel Dominance */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <Globe className="w-5 h-5 mr-3" />
                Global Network Orchestration
              </Badge>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Omnichannel <span className="text-primary italic">Dominance</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {platformLogos.map((platform, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative bg-white/40 border border-white/60 rounded-[3rem] p-12 hover:shadow-glass transition-all duration-1000 text-center"
              >
                <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center border border-white/60 mx-auto mb-8 group-hover:scale-110 transition-transform shadow-sm">
                  {platform.logo}
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">{platform.name}</h3>
                <p className="text-sm text-slate-500 mb-8 font-medium uppercase tracking-widest">{platform.description}</p>
                <Badge className="bg-primary/5 text-primary border border-primary/20 px-6 py-2 rounded-full font-black text-xs">
                  {platform.roas} ROAS
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Architecture */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-8">
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Campaign <span className="text-primary italic">Architecture</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {premiumServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative bg-white/40 border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000"
              >
                <div className="flex flex-col h-full space-y-12">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-primary">{service.metrics.roas}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target ROAS</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">{service.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {service.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-4 bg-white/40 border border-white/60 px-6 py-4 rounded-3xl shadow-sm text-sm font-bold text-slate-700">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" className="p-0 h-auto font-black uppercase tracking-[0.3em] text-[10px] text-primary hover:bg-transparent hover:translate-x-3 transition-all duration-500">
                    View Protocol Details <ArrowRight className="w-4 h-4 ml-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Protocols (Case Studies) */}
      <section className="py-32 bg-white/50 backdrop-blur-md">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-slate-900 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
                Success Protocols
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Elite <span className="text-primary italic">Returns</span>
            </h2>
          </div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {caseStudies.map((study, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden shadow-glass group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-primary/5 p-16 lg:p-24 flex flex-col justify-center space-y-12">
                    <Badge className="bg-white text-primary border border-primary/20 w-fit px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest">
                      {study.industry}
                    </Badge>
                    <h4 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 leading-tight">{study.title}</h4>
                    <div className="grid grid-cols-2 gap-12 pt-8">
                      <div>
                        <div className="text-4xl font-black text-primary">{study.investment}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Ad Capital</div>
                      </div>
                      <div>
                        <div className="text-4xl font-black text-slate-900">{study.returns}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Generated Revenue</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-16 lg:p-24 space-y-12 bg-white/20">
                    <div className="space-y-4">
                      <h5 className="font-black text-primary uppercase tracking-[0.3em] text-[10px]">The Challenge</h5>
                      <p className="text-2xl text-slate-500 font-medium leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="space-y-8">
                      <h5 className="font-black text-slate-900 uppercase tracking-[0.3em] text-[10px]">Performance Milestones</h5>
                      <div className="grid gap-6">
                        {study.results.map((res, ri) => (
                          <div key={ri} className="flex items-center gap-6 bg-white/60 p-8 rounded-[2.5rem] border border-white/60 shadow-sm group-hover:border-primary/30 transition-colors">
                            <Activity className="w-8 h-8 text-primary" />
                            <span className="text-2xl font-bold text-slate-800">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Gateway */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Initialize Protocol
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Dominate Your <br /> <span className="text-primary italic">Market Trajectory.</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl text-slate-300 font-body leading-relaxed max-w-4xl mx-auto">
              Join our absolute repository of elite brands achieving exponential scale through our precision-engineered advertising protocols.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-8 justify-center pt-12">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Scale My Brand
                  <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/pricing">Explore Pricing Plans</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdsManagement;
