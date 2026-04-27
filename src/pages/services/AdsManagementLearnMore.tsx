import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
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
  Calendar,
  Play,
  Pause,
  Settings,
  Eye,
  Calculator,
  ChevronRight,
  Globe,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const AdsManagementLearnMore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const platforms = [
    {
      name: "Google Ads Protocol",
      icon: "🔍",
      description: "Capture high-intent traffic when customers are actively searching for absolute solutions.",
      features: ["Search Campaigns", "Display Network", "Shopping Logic", "YouTube Ads Sync"],
      avgRoas: "4.2x",
      avgCtr: "3.2%",
      bestFor: "High-intent searches, B2B services, e-commerce"
    },
    {
      name: "Meta & Instagram Logic",
      icon: "📘",
      description: "Target your ideal customers with precision demographic targeting and visual excellence.",
      features: ["Feed Ads", "Stories Protocol", "Reels Logic", "Shop Integration"],
      avgRoas: "3.8x",
      avgCtr: "2.8%",
      bestFor: "Brand awareness, e-commerce, local businesses"
    },
    {
      name: "TikTok Visibility",
      icon: "🎵",
      description: "Engage younger audiences with creative short-form absolute video content.",
      features: ["In-Feed Ads", "Spark Ads Protocol", "Brand Takeover", "Effect Ads Logic"],
      avgRoas: "3.2x",
      avgCtr: "4.1%",
      bestFor: "Gen Z marketing, entertainment, viral campaigns"
    },
    {
      name: "LinkedIn B2B Intel",
      icon: "💼",
      description: "Target decision-makers and professionals with absolute B2B precision.",
      features: ["Sponsored Content", "Message Ads Protocol", "Lead Gen Forms", "Event Ads Logic"],
      avgRoas: "5.1x",
      avgCtr: "1.9%",
      bestFor: "B2B services, recruitment, professional services"
    },
    {
      name: "YouTube Video Sync",
      icon: "📺",
      description: "Reach audiences through engaging absolute video content and storytelling.",
      features: ["Skippable Video", "Non-skippable Logic", "Bumper Ads", "Discovery Ads Protocol"],
      avgRoas: "2.9x",
      avgCtr: "2.1%",
      bestFor: "Brand awareness, product demos, tutorials"
    },
    {
      name: "Pinterest Visual Logic",
      icon: "📌",
      description: "Drive discovery and sales through high-end visual search platform protocols.",
      features: ["Product Pins", "Video Pins Logic", "Shopping Features", "Idea Pins Protocol"],
      avgRoas: "4.1x",
      avgCtr: "3.8%",
      bestFor: "E-commerce, lifestyle brands, DIY products"
    }
  ];

  const serviceTypes = [
    {
      title: "Campaign Architecture & Strategy",
      description: "Complete campaign architecture and absolute strategic planning.",
      features: [
        "Account Structure Optimization",
        "Audience Research & Logic", 
        "Competitive Repository Analysis",
        "Budget Allocation Protocol",
        "Creative Strategy Sync",
        "Landing Page Logic"
      ],
      timeline: "Week 1-2"
    },
    {
      title: "Creative Development Protocols",
      description: "High-converting ad creatives and copy that drive absolute results.",
      features: [
        "Ad Copy Writing & Logic",
        "Visual Asset Orchestration",
        "Video Ad Production Sync",
        "A/B Testing Framework",
        "Brand Sovereignty Adherence",
        "Performance Creative Analysis"
      ],
      timeline: "Week 2-3"
    },
    {
      title: "Absolute Campaign Management",
      description: "Daily optimization and performance monitoring nodes.",
      features: [
        "Bid Management & Optimization",
        "Audience Refinement Logic",
        "Budget Reallocation Protocol",
        "Performance Monitoring Sync",
        "Quality Score Logic",
        "Ad Schedule Optimization"
      ],
      timeline: "Ongoing"
    },
    {
      title: "Analytics & Intelligence Reporting",
      description: "Comprehensive performance tracking and absolute insights.",
      features: [
        "Custom Dashboard Orchestration",
        "Weekly Performance Intel",
        "ROI & ROAS Logic",
        "Attribution Modeling Sync",
        "Conversion Tracking Logic",
        "Strategic Recommendations"
      ],
      timeline: "Weekly/Monthly"
    }
  ];

  const results = [
    { metric: "Average ROAS", value: "4.2x", description: "Return on ad spend across all absolute campaigns", change: "+85% Velocity" },
    { metric: "Cost Per Lead", value: "65% Lower", description: "Reduction in cost per qualified lead node", change: "vs. industry average" },
    { metric: "Conversion Logic", value: "180% Higher", description: "Increase in conversion trajectory", change: "within 90 days" },
    { metric: "Click-Through Intel", value: "3.2%", description: "Average CTR across all platforms", change: "+120% vs baseline" }
  ];

  const pricing = [
    {
      title: "Starter Protocol",
      price: "$1,497",
      period: "/month",
      description: "Perfect for businesses starting with absolute ads.",
      features: [
        "2 advertising platforms",
        "Up to $5K monthly ad spend",
        "Basic reporting intel",
        "Campaign setup & logic",
        "Monthly strategy sync"
      ],
      popular: false
    },
    {
      title: "Growth Trajectory",
      price: "$2,497",
      period: "/month",
      description: "Ideal for scaling absolute businesses.",
      features: [
        "4 advertising platforms",
        "Up to $15K monthly ad spend",
        "Advanced reporting & intel",
        "Creative development sync",
        "Bi-weekly strategy calls",
        "Landing page logic"
      ],
      popular: true
    },
    {
      title: "Enterprise Architecture",
      price: "Custom",
      period: "",
      description: "For large-scale advertising operations and absolute reach.",
      features: [
        "All advertising platforms",
        "Unlimited ad spend logic",
        "Custom reporting & dashboards",
        "Dedicated account node",
        "Weekly strategy sync",
        "Advanced attribution logic"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Ads Management - Complete Guide | LUNEXO MEDIA"
        description="Complete guide to LUNEXO MEDIA absolute ads management services. Learn about platforms, strategies, pricing, and absolute results we deliver."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/ads-management-learn-more"
        keywords="ads management, Google Ads, Facebook Ads, PPC management, digital advertising"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Target className="w-5 h-5 mr-4" />
                The Absolute Growth Catalyst
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Mastering the <br /> <span className="text-primary italic">Attention Economy.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Everything you need to know about our absolute data-driven advertising engines that scale businesses efficiently across <span className="text-primary italic font-bold">all major attention platforms.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-10 justify-center pt-12"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild
              >
                <Link to="/contact" className="flex items-center gap-6">
                  Absolute Strategy
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advertising Platforms */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Globe className="w-5 h-5 mr-4" />
                  Attention Ecosystem
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              Repository <span className="text-primary italic">Nodes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 flex flex-col justify-between hover:translate-y-[-15px]"
              >
                <div className="space-y-10">
                  <div className="text-7xl group-hover:scale-110 transition-transform duration-700">{platform.icon}</div>
                  <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-all duration-700 tracking-tight leading-tight">{platform.name}</h3>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium h-32 overflow-hidden">{platform.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="p-8 bg-white/60 rounded-[2.5rem] border border-white/60 shadow-sm text-center">
                      <div className="text-3xl font-heading font-black text-primary">{platform.avgRoas}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Avg ROAS</div>
                    </div>
                    <div className="p-8 bg-white/60 rounded-[2.5rem] border border-white/60 shadow-sm text-center">
                      <div className="text-3xl font-heading font-black text-primary">{platform.avgCtr}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Avg CTR</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 pt-6">
                    <div className="space-y-2">
                       <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Protocol Nodes:</h4>
                       <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {platform.features.map((f, i) => (
                        <Badge key={i} className="bg-primary/10 text-primary border-primary/20 px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em]">
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full text-slate-400 font-bold hover:text-primary hover:bg-transparent group-hover:translate-x-4 transition-all pt-12 text-xl" asChild>
                    <Link to="/contact">Platform Logic <ChevronRight className="w-8 h-8 ml-2" /></Link>
                  </Button>
                </div>
                <div className="mt-12 pt-8 border-t border-white/60 opacity-20 flex justify-end">
                   <Activity className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Zap className="w-5 h-5 mr-4" />
                  Operational Orchestration
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              High-Velocity <span className="text-primary italic">Process.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="space-y-12 relative z-10">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center font-black text-4xl shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                      {index + 1}
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20 px-8 py-3 font-black uppercase tracking-[0.2em] rounded-full text-[10px]">{service.timeline}</Badge>
                  </div>
                  <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-3xl text-slate-500 leading-relaxed font-medium">{service.description}</p>
                  <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-white/60">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-6 text-2xl text-slate-700 font-bold group/act">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/act:bg-primary transition-all duration-500">
                           <CheckCircle className="w-5 h-5 text-primary group-hover/act:text-white" />
                        </div>
                        <span className="group-hover/act:text-slate-900 transition-colors">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Matrix */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <BarChart3 className="w-5 h-5 mr-4" />
                  Absolute Performance Matrix
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Performance <span className="text-primary italic">Delta.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {results.map((result, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">{result.value}</div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{result.metric}</h3>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-8">{result.description}</p>
                  <Badge className="bg-slate-900 text-white border-none px-10 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl group-hover:bg-primary transition-all duration-700">{result.change}</Badge>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <TrendingUp className="w-8 h-8 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Investment */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <DollarSign className="w-5 h-5 mr-4" />
                  Absolute Investment Logic
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Strategic <span className="text-primary italic">Investment.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className={`group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-20 hover:shadow-glass transition-all duration-1000 flex flex-col items-center text-center ${plan.popular ? 'border-primary shadow-glass scale-105 z-10' : 'hover:translate-y-[-15px]'}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em] shadow-2xl">
                    Most Popular Protocol
                  </Badge>
                )}
                
                <div className="space-y-12 flex-1 w-full">
                  <div className="space-y-4">
                     <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{plan.title}</h3>
                     <div className="h-[2px] w-12 bg-primary mx-auto opacity-40" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-6xl lg:text-7xl font-heading font-black text-primary tracking-tighter">{plan.price}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{plan.period} Protocol</div>
                  </div>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">{plan.description}</p>
                  
                  <div className="space-y-8 text-left pt-12 border-t border-white/60 w-full">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Protocol Nodes:</h4>
                    <div className="space-y-6">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-6 text-2xl text-slate-700 font-bold group/feat">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                             <CheckCircle className="w-5 h-5 text-primary group-hover/feat:text-white" />
                          </div>
                          <span className="group-hover/feat:text-slate-900 transition-colors">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button className={`mt-16 py-12 px-16 rounded-[2rem] font-bold text-2xl shadow-2xl transition-all duration-700 w-full hover:scale-110 ${plan.popular ? 'bg-primary text-white' : 'bg-slate-900 text-white'}`} asChild>
                  <Link to="/contact" className="flex items-center justify-center gap-4">
                    Initialize Scaling
                    <ArrowRight className="w-8 h-8" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                The Growth Audit
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Scale?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Book an absolute strategy session to discover how our ads management architectures can help you achieve your absolute trajectory.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <a href="https://lunexomedia.com/book-apartment" className="flex items-center gap-6">
                  Absolute Strategy
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/portfolio">
                  View Success Repository
                </Link>
              </Button>
            </div>
            <div className="pt-24 flex items-center justify-center gap-16 opacity-30 text-white">
               <ShieldCheck className="w-10 h-10" />
               <Cpu className="w-10 h-10" />
               <Database className="w-10 h-10" />
               <Activity className="w-10 h-10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdsManagementLearnMore;
