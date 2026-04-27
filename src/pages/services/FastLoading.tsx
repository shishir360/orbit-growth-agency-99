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
  Zap, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Clock,
  Gauge,
  Image,
  Code,
  Server,
  Globe,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const FastLoading = () => {
  const optimizations = [
    "Neural Image Compression",
    "Smart Bundle Minification", 
    "Global Edge CDN Sync",
    "Real-time Telemetry Node",
    "Dynamic Lazy Loading Logic",
    "Advanced Edge Caching Sync",
    "SQL Query Logic Optimization",
    "Predictive Asset Preloading"
  ];

  const stats = [
    { icon: <Clock className="w-10 h-10" />, stat: "2.5s", label: "Average Load Threshold" },
    { icon: <TrendingUp className="w-10 h-10" />, stat: "40%", label: "Conversion Lift Delta" },
    { icon: <Gauge className="w-10 h-10" />, stat: "95+", label: "Google PageSpeed Logic" },
    { icon: <Globe className="w-10 h-10" />, stat: "99.9%", label: "Uptime SLA Protocol" }
  ];

  const techniques = [
    {
      icon: <Image className="w-12 h-12" />,
      title: "Visual Optimization Sync",
      description: "Advanced neural compression and modern formats (WebP, AVIF) for instant absolute rendering without quality loss.",
      impact: "60% Faster Rendering"
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Architecture Refactoring",
      description: "Minified logic, tree shaking, and efficient absolute bundling to reduce binary footprints significantly.",
      impact: "50% Smaller Footprint"
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: "Edge Distribution Node",
      description: "Global content distribution absolute network ensures sub-millisecond delivery from anywhere on Earth repository.",
      impact: "70% Faster Global Sync"
    },
    {
      icon: <Gauge className="w-12 h-12" />,
      title: "Active Monitoring Logic",
      description: "Continuous telemetry and absolute optimization to maintain absolute peak performance standards.",
      impact: "99.9% Optimal Stability"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Fast Loading - Sub-Second Architecture | LUNEXO MEDIA"
        description="Boost your absolute website speed with our performance optimization engines. Get faster loading times, better SEO rankings, and higher conversion rates."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/fast-loading"
        keywords="fast loading website, speed optimization, website performance, page speed"
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
                <Zap className="w-5 h-5 mr-4" />
                Sub-Second Architecture
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Lightning <br /> <span className="text-primary italic">Performance.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Every millisecond is an absolute conversion opportunity. Our optimization engines ensure your interface loads faster than <span className="text-primary italic font-bold">95% of the global web repository.</span>
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
                  Optimize My Speed
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speed Metrics Impact Delta */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Speed Impact
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Speed <span className="text-primary italic">Delta.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {stats.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <div className="text-6xl font-heading font-black text-primary tracking-tighter">{item.stat}</div>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{item.label}</h3>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <TrendingUp className="w-8 h-8 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-32 bg-slate-900 p-20 lg:p-32 rounded-[5rem] max-w-7xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <h3 className="text-5xl font-heading font-bold text-center text-white mb-20 tracking-tight leading-tight">Conversion & Speed Correlation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="text-6xl font-heading font-black text-slate-500 tracking-tighter">1s → 3s</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">32% Conversion Drop</div>
              </div>
              <div className="space-y-8 p-12 bg-white/10 rounded-[3rem] border border-white/20 hover:bg-white/20 transition-all duration-500 scale-110">
                <div className="text-6xl font-heading font-black text-white tracking-tighter">1s → 5s</div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">90% Conversion Drop</div>
              </div>
              <div className="space-y-8 p-12 bg-primary/20 rounded-[3rem] border border-primary/20 hover:bg-primary/30 transition-all duration-500">
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">Our Sites</div>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">2.5s Global Average</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Optimization Playbook Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Optimization Playbook
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              The <span className="text-primary italic">Playbook.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {techniques.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 flex flex-col gap-12 hover:translate-y-[-15px]"
              >
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                    {tech.icon}
                  </div>
                  <div className="space-y-10">
                    <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-all duration-700 tracking-tight leading-tight">{tech.title}</h3>
                    <p className="text-2xl text-slate-500 leading-relaxed font-medium">{tech.description}</p>
                    <Badge className="bg-primary text-white border-none px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-xl">{tech.impact}</Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {optimizations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 1 }}
                className="px-12 py-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full font-black text-lg text-slate-700 hover:text-primary transition-all duration-700 hover:shadow-glass cursor-default hover:scale-110 uppercase tracking-[0.2em]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance SLA Protocol */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <ShieldCheck className="w-5 h-5 mr-4" />
                  Absolute Performance SLA
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              The <span className="text-primary italic">SLA.</span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="bg-slate-900 p-20 lg:p-32 rounded-[5rem] text-center text-white relative overflow-hidden shadow-2xl max-w-7xl mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 opacity-30" />
            <div className="relative z-10 space-y-16">
              <div className="flex items-center justify-center gap-10">
                <Gauge className="w-16 h-16 text-primary" />
                <h2 className="text-6xl font-heading font-bold tracking-tight">The Performance SLA</h2>
              </div>
              <p className="text-3xl text-slate-400 max-w-5xl mx-auto leading-relaxed font-medium">
                We guarantee your absolute architecture will achieve a Google PageSpeed score of 90+ and load in under 3 seconds, or we'll continue optimizing <span className="text-primary italic font-bold">at zero cost protocol.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-12 border-t border-white/10">
                <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="text-6xl font-heading font-black text-primary tracking-tighter">90+</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">PageSpeed Score</div>
                </div>
                <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 scale-110">
                  <div className="text-6xl font-heading font-black text-primary tracking-tighter">&lt; 3s</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Load Threshold</div>
                </div>
                <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="text-6xl font-heading font-black text-primary tracking-tighter">100%</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Satisfaction SLA</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                The Acceleration Audit
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Accelerate?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join the elite businesses that have slashed their load times and doubled their conversions with our absolute performance engines.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Optimize Now
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/portfolio">
                  Success Repository
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

export default FastLoading;