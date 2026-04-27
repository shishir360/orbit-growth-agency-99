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
  Monitor, 
  Target, 
  Bot, 
  Search, 
  Smartphone, 
  Zap, 
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  CheckCircle,
  PlayCircle,
  Layers,
  Play,
  ChevronRight,
  Check,
  Cpu,
  Globe,
  Gauge,
  Activity,
  ShieldCheck,
  Database,
  Shield
} from "lucide-react";

const ServicesExplore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Explore Absolute Services | LUNEXO MEDIA";
  }, []);

  const allServices = [
    {
      id: "website-design",
      icon: <Monitor className="w-16 h-16" />,
      title: "Digital Architecture",
      shortDesc: "Absolute responsive logic that converts",
      description: "Transform your digital presence with high-end, conversion-focused architectures that drive measurable business velocity. We combine premium design with psychological logic.",
      features: ["Dynamic Optimization", "Velocity Performance", "Visibility Engine", "Conversion Logic"],
      startingPrice: "$2,997",
      timeline: "2-6 weeks",
      popular: false,
      color: "primary",
      href: "/website-design",
      learnMore: "/services/website-design-learn-more",
      stats: { projects: "200+", satisfaction: "4.9/5", conversion: "165%" }
    },
    {
      id: "ads-management",
      icon: <Target className="w-16 h-16" />,
      title: "Growth Orchestration",
      shortDesc: "Data-driven advertising for absolute ROI",
      description: "Maximize your absolute trajectory with managed Google and Meta orchestrations. We help businesses scale with precision while reducing acquisition friction.",
      features: ["Multi-Platform Sync", "Advanced Targeting", "ROI Velocity", "Telemetry Analytics"],
      startingPrice: "$1,497",
      timeline: "1-2 weeks",
      popular: true,
      color: "accent",
      href: "/ads-management",
      learnMore: "/services/ads-management-learn-more",
      stats: { roas: "4.2x", reduction: "35%", leads: "180%" }
    },
    {
      id: "ai-automation",
      icon: <Bot className="w-16 h-16" />,
      title: "Intelligent Automation",
      shortDesc: "Automate architectures with AI logic",
      description: "Reduce friction, increase conversion, and provide 24/7 digital support with our custom AI automation nodes. From intelligent chatbots to voice agents.",
      features: ["AI Chat Nodes", "Email Automation", "Auditory Agents", "Workflow Logic"],
      startingPrice: "$997",
      timeline: "3-8 weeks",
      popular: false,
      color: "primary",
      href: "/ai-automation",
      learnMore: "/services/ai-automation-learn-more",
      stats: { hours: "20+", automation: "80%", availability: "24/7" }
    }
  ];

  const subServices = [
    {
      title: "Device Precision",
      description: "Responsive logic that works perfectly on all digital nodes",
      icon: <Smartphone className="w-12 h-12" />,
      href: "/services/mobile-optimized"
    },
    {
      title: "Absolute Velocity",
      description: "Speed-optimized architectures for absolute user experience",
      icon: <Zap className="w-12 h-12" />,
      href: "/services/fast-loading"
    },
    {
      title: "Visibility Logic",
      description: "Built for search engine synchronization from the ground up",
      icon: <Search className="w-12 h-12" />,
      href: "/services/seo-friendly"
    },
    {
      title: "Conversion Engine",
      description: "Architected to turn digital visitors into absolute partners",
      icon: <TrendingUp className="w-12 h-12" />,
      href: "/services/conversion-focused"
    }
  ];

  const comparisonFeatures = [
    { feature: "Custom Architecture Protocol", website: true, ads: false, ai: false },
    { feature: "Performance Velocity", website: true, ads: true, ai: true },
    { feature: "Analytics Telemetry Nodes", website: true, ads: true, ai: true },
    { feature: "24/7 Operational Orchestration", website: true, ads: true, ai: true },
    { feature: "ROI Scaling Trajectory", website: false, ads: true, ai: true },
    { feature: "Automation Logic Sync", website: false, ads: false, ai: true },
    { feature: "Multi-Platform Logic Sync", website: false, ads: true, ai: true },
    { feature: "AI Node Integration", website: false, ads: false, ai: true }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Explore Absolute Services | LUNEXO MEDIA"
        description="Discover the absolute LUNEXO MEDIA services: Digital Architecture, Growth Orchestration, and Intelligent Automation. Find the perfect solution for your business trajectory."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services-explore"
        keywords="digital marketing services, website design, ads management, AI automation, business growth solutions"
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
                <Layers className="w-5 h-5 mr-3" />
                The Absolute Suite
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              The Spectrum of <br /> <span className="text-primary italic">Absolute Velocity.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              From stunning digital architectures to high-velocity orchestrations and intelligent automation — discover how we build <span className="text-primary italic font-bold">absolute market dominance.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center pt-8"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                <Link to="/contact">
                  Start Consultation
                  <ArrowRight className="w-8 h-8 ml-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-2xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                <Link to="/portfolio" className="flex items-center">
                  <Globe className="w-8 h-8 mr-4 text-primary" />
                  View Repository
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trajectory Selection */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Precision Trajectory Selection
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Select Your <span className="text-primary italic">Trajectory.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {allServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className={`group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-20 hover:shadow-glass transition-all duration-1000 flex flex-col h-full ${service.popular ? 'border-primary/50 shadow-glass scale-[1.05] z-10' : ''}`}
              >
                {service.popular && (
                  <Badge className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                    <Star className="w-5 h-5 mr-3" /> Most Dominant Node
                  </Badge>
                )}
                
                <div className="text-center space-y-16 flex-1 flex flex-col">
                  <div className="w-32 h-32 bg-slate-900 text-white rounded-[3rem] flex items-center justify-center mx-auto group-hover:bg-primary transition-all duration-700 shadow-2xl">
                    {service.icon}
                  </div>
                  
                  <div className="space-y-8">
                    <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{service.title}</h3>
                    <p className="text-2xl text-slate-500 font-medium leading-relaxed">{service.description}</p>
                  </div>
                  
                  <div className="py-12 bg-white/40 rounded-[4rem] border border-white/60 shadow-inner">
                    <div className="text-6xl font-heading font-black text-slate-900 tracking-tighter">{service.startingPrice}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-6">Initial Investment Node</div>
                  </div>

                  <div className="space-y-8 text-left pt-16 flex-1">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-6 text-slate-700 font-bold text-xl">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-sm border border-primary/5">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="uppercase tracking-widest text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-8 pt-16 border-t border-white/60">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{value}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-20 space-y-8">
                  <Button className="w-full py-14 rounded-[2.5rem] font-bold text-3xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-500 group/btn shadow-2xl" asChild>
                    <Link to={service.href}>
                      Initiate Path
                      <ArrowRight className="w-8 h-8 ml-6 group-hover/btn:translate-x-3 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full h-20 text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] hover:text-primary hover:bg-transparent" asChild>
                    <Link to={service.learnMore}>Learn Absolute Strategy <ChevronRight className="w-5 h-5 ml-4" /></Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Precision Node Specializations */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Precision Nodes
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight">
              Deep-Dive <span className="text-primary italic">Specializations.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {subServices.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 text-center flex flex-col h-full hover:translate-y-[-12px]"
              >
                <div className="w-28 h-28 bg-white/80 border border-white/60 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 shadow-glass">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-8 group-hover:text-primary transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 flex-1">
                  {service.description}
                </p>
                <Button variant="ghost" className="w-full text-slate-900 hover:text-primary font-black uppercase tracking-[0.4em] text-[10px] hover:bg-transparent group-hover:translate-x-4 transition-all" asChild>
                  <Link to={service.href}>Explore Node <ChevronRight className="w-5 h-5 ml-4" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Matrix */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Absolute Comparison Matrix
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              The Service <span className="text-primary italic">Matrix.</span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] shadow-glass max-w-7xl mx-auto"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/60">
                    <th className="text-left p-20 text-4xl font-heading font-bold text-slate-900">Logic Points</th>
                    <th className="text-center p-20 text-xl font-black uppercase tracking-[0.4em] text-slate-400">Architecture</th>
                    <th className="text-center p-20 text-xl font-black uppercase tracking-[0.4em] text-slate-400">Orchestration</th>
                    <th className="text-center p-20 text-xl font-black uppercase tracking-[0.4em] text-slate-400">Automation</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-white/40 hover:bg-white/60 transition-all duration-300 group">
                      <td className="p-16 text-3xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors pl-20 uppercase tracking-widest text-sm">{row.feature}</td>
                      <td className="text-center p-16">
                        {row.website ? (
                          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <ShieldCheck className="w-10 h-10" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-slate-200 rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-16">
                        {row.ads ? (
                          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <ShieldCheck className="w-10 h-10" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-slate-200 rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-16">
                        {row.ai ? (
                          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <ShieldCheck className="w-10 h-10" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-slate-200 rounded-full mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Trajectory CTA */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Final Trajectory
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Ready to <br /> <span className="text-primary italic">Architect Growth?</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Secure an absolute strategy call to discover which architectures and trajectories will deliver the highest velocity for your specific business reality.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-10 justify-center pt-12">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-2xl px-24 py-14 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Initiate Strategy Call
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-4 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-2xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/portfolio">View Repository</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesExplore;