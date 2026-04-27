import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Gem, CalendarCheck, ChevronRight, Activity, Cpu, Database, ShieldCheck } from "lucide-react";

const MedSpaMarketing = () => {
  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO 
        title="Absolute Med Spa Marketing | High-End Client Acquisition Architecture"
        description="Elevate your Med Spa with absolute digital marketing. We specialize in aesthetic clinic visibility, luxury ads, and absolute client acquisition architectures."
        url="https://lunexomedia.com/med-spa-marketing"
        image="https://lunexomedia.com/og-med-spa.jpg"
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
                <Sparkles className="w-5 h-5 mr-4" />
                Aesthetic Practice Dominance
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Premium <br /> <span className="text-primary italic">Med Spa Growth.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              We help elite medical spas and aesthetic clinics scale their absolute revenue through visually stunning architectures and <span className="text-primary italic font-bold">high-intent patient acquisition protocols.</span>
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
                  Absolute Growth Plan
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Aesthetic Protocol */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Aesthetics
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Aesthetic <span className="text-primary italic">Protocol.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {[
              { 
                title: "Visual Ad Clusters", 
                icon: <Gem className="w-12 h-12" />, 
                desc: "Stunning absolute Meta & Instagram campaigns targeting affluent demographics in your specific repository geography." 
              },
              { 
                title: "Luxury Digital Presence", 
                icon: <Sparkles className="w-12 h-12" />, 
                desc: "Sub-second absolute glass architectures that reflect the absolute quality of your aesthetic services." 
              },
              { 
                title: "Retention Logic", 
                icon: <CalendarCheck className="w-12 h-12" />, 
                desc: "Automated high-end absolute SMS and email sequences that turn one-time inquiries into absolute lifetime loyalists." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 p-16 rounded-[4rem] hover:shadow-glass transition-all duration-1000 flex flex-col items-center text-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="bg-slate-900 text-white w-24 h-24 rounded-[2.5rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:rotate-12">
                  {feature.icon}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">{feature.title}</h3>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
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
                The Aesthetic Audit
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Scale Your <br /> <span className="text-primary italic">Clinic?</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join the elite aesthetic practices that have transformed their brand equity and patient volume with high-end digital architecture and absolute scaling logic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize Plan
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MedSpaMarketing;
