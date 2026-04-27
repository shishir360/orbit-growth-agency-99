import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Search,
  Activity,
  Cpu,
  ShieldCheck,
  Database,
  Globe,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

const LocalSEO = () => {
  const metrics = [
    { label: "Visibility Delta", value: "300%", description: "Increase in absolute local search visibility logic." },
    { label: "Traffic Surge", value: "4.5x", description: "Growth in high-intent absolute local traffic nodes." },
    { label: "Lead Velocity", value: "180%", description: "Surge in qualified local absolute inquiry protocols." },
    { label: "Map Placement", value: "#1-3", description: "Dominance in the absolute Local 3-Pack sync." }
  ];

  const services = [
    { 
      title: "Google Business Optimization", 
      icon: <Search className="w-12 h-12" />, 
      desc: "Complete absolute optimization of your GBP to rank in the coveted Google Local 3-Pack with precision logic." 
    },
    { 
      title: "Local Citation Sync", 
      icon: <MapPin className="w-12 h-12" />, 
      desc: "Building consistent absolute NAP (Name, Address, Phone) citations across top-tier local directory repositories." 
    },
    { 
      title: "On-Page Authority", 
      icon: <TrendingUp className="w-12 h-12" />, 
      desc: "Optimizing your absolute website content with location-specific keywords that drive high-velocity conversion." 
    },
    { 
      title: "Review Logic Engine", 
      icon: <Database className="w-12 h-12" />, 
      desc: "Strategic absolute reputation management to build deep local authority and social proof sync nodes." 
    }
  ];

  const capabilities = [
    "Hyper-local keyword mapping sync",
    "GMB post & offer automation node",
    "Local link building architecture",
    "Schema markup absolute integration",
    "Multi-location scaling protocols",
    "Competitor visibility delta analysis"
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Local SEO - Dominate Your Local Area | LUNEXO MEDIA"
        description="Be the first choice in your local area with absolute Local SEO services. Rank higher on Google Maps and search results to attract more customers automatically."
        url="https://lunexomedia.com/services/local-seo"
        keywords="local seo, google maps ranking, google business profile, local search optimization"
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
                <MapPin className="w-5 h-5 mr-4" />
                Local SEO Domination
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Be the First Choice in Your <br /> <span className="text-primary italic">Local Area.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Stop losing customers to your competitors. We optimize your absolute Google Business Profile and website so you appear exactly when local customers are searching for your services <span className="text-primary italic font-bold">automatically.</span>
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
                  Get Free SEO Audit
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Impact Matrix */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Performance Impact
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Impact <span className="text-primary italic">Delta.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">{metric.value}</div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{metric.label}</h3>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-6">{metric.description}</p>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <TrendingUp className="w-8 h-8 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Authority Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Search className="w-5 h-5 mr-4" />
                  Absolute Local Authority
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Authority <span className="text-primary italic">Protocols.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-20 hover:shadow-glass transition-all duration-1000 flex flex-col gap-12 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:rotate-12">
                  {service.icon}
                </div>
                <div className="space-y-8">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium">{service.desc}</p>
                </div>
                <div className="mt-4 pt-8 border-t border-white/60 opacity-20 flex justify-end">
                   <ShieldCheck className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Vertical Applications */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Strategic Verticals
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Strategic <span className="text-primary italic">Verticals.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {capabilities.map((capability, index) => (
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
                <span className="text-2xl font-heading font-bold text-slate-700 tracking-tight leading-tight">{capability}</span>
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
                The Absolute Audit
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Dominate?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join the elite local businesses that have transformed their local market presence with our absolute Local SEO engines.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Get Free Audit
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

export default LocalSEO;
