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
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const MobileOptimized = () => {
  const benefits = [
    "Cross-device Synchronization Logic",
    "Finger-Friendly UI Architectures", 
    "Adaptive Content Flow Protocol",
    "Sub-Second Mobile Sync Node",
    "Mobile-first Architecture",
    "Neural Responsive Navigation",
    "Neural Image Scaling Logic",
    "Mobile SEO Dominance Protocol"
  ];

  const stats = [
    { icon: <Smartphone className="w-10 h-10" />, stat: "60%", label: "Mobile Traffic Average" },
    { icon: <TrendingUp className="w-10 h-10" />, stat: "200%", label: "Mobile Conversion Lift" },
    { icon: <Users className="w-10 h-10" />, stat: "85%", label: "User Retention Surge" },
    { icon: <Zap className="w-10 h-10" />, stat: "3x", label: "Faster Mobile Load" }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Mobile Design - Omnichannel UI Architecture | LUNEXO MEDIA"
        description="Get absolute mobile-first website designs that work perfectly on all glass screens. Boost your mobile traffic and conversions with our expert optimization."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/mobile-optimized"
        keywords="mobile optimized website, responsive design, mobile-first, mobile web design"
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
                <Smartphone className="w-5 h-5 mr-4" />
                Device Agnostic Logic
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Omnichannel <br /> <span className="text-primary italic">Interfaces.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              In a mobile-first world, your absolute interface must be seamless. Our architectures ensure your brand looks perfect and performs flawlessly on <span className="text-primary italic font-bold">every glass screen repository.</span>
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
                  Optimize My Site
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Viewport Sync Matrix */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Viewport Sync
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Viewport <span className="text-primary italic">Sync.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { icon: <Smartphone className="w-12 h-12" />, title: "Mobile Phones", description: "Optimized for touch logic with finger-friendly interaction layers and intuitive navigation protocols.", range: "320px - 768px Width" },
              { icon: <Tablet className="w-12 h-12" />, title: "Tablets", description: "Perfect balance of mobile convenience and high-end desktop absolute functionality sync.", range: "768px - 1024px Width" },
              { icon: <Monitor className="w-12 h-12" />, title: "Desktops", description: "Full-featured expansive experience with advanced absolute layouts and immersive depth logic.", range: "1024px+ Resolution" }
            ].map((device, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  {device.icon}
                </div>
                <div className="space-y-6">
                   <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{device.title}</h3>
                   <p className="text-2xl text-slate-500 font-medium leading-relaxed">{device.description}</p>
                </div>
                <div className="pt-8 border-t border-white/60 w-full">
                   <div className="text-xs font-black text-primary uppercase tracking-[0.4em]">{device.range}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Mobile Benefits */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Mobile Benefits
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Strategic <span className="text-primary italic">Benefits.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-12 flex items-center gap-8 hover:shadow-glass transition-all duration-700 hover:translate-y-[-5px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                   <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <span className="text-2xl font-heading font-bold text-slate-700 tracking-tight leading-tight">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Delta Matrix */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Cpu className="w-5 h-5 mr-4" />
                  Absolute Impact Delta
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              The Impact <span className="text-primary italic">Delta.</span>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                The Absolute Deployment
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready for <br /> <span className="text-primary italic">Any Screen?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Don't lose high-value identity clients to poor mobile experiences. Get an absolute omnichannel interface that converts across every glass screen.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Start Optimization
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/website-design">
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

export default MobileOptimized;