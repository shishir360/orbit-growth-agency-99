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
  Search, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Eye,
  Target,
  FileText,
  Globe,
  Code,
  BarChart,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const SEOFriendly = () => {
  const seoFeatures = [
    "Meta Architecture Sync",
    "Schema Markup Injection Logic", 
    "Core Web Vitals Surge",
    "Semantic Heading Logic Sync",
    "Neural XML Generation",
    "Dynamic Robots Tuning Protocol",
    "Canonical URL Strategy Node",
    "Internal Link Architecture"
  ];

  const stats = [
    { icon: <TrendingUp className="w-10 h-10" />, stat: "250%", label: "Organic Traffic Lift" },
    { icon: <Eye className="w-10 h-10" />, stat: "Top 3", label: "Avg Search Ranking" },
    { icon: <Target className="w-10 h-10" />, stat: "85%", label: "Keyword Dominance" },
    { icon: <BarChart className="w-10 h-10" />, stat: "6 Mo", label: "Peak Results Velocity" }
  ];

  const seoElements = [
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Technical Foundation",
      description: "Clean code, proper semantic absolute structure, and sub-second loading that search engines prioritize for crawling and indexing node.",
      features: ["Semantic HTML5 Sync", "Structural URL Logic", "Sub-Second Sync Node", "Mobile-First Schema"]
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "On-Page Intelligence",
      description: "Strategic placement of high-intent keywords, optimized metadata, and absolute content clusters for absolute search visibility logic.",
      features: ["Meta Architecture Sync", "Header Logic Sync", "Keyword Clustering", "Content Relevance Node"]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Structured Entities",
      description: "Rich snippets and structured absolute data help search engines understand your entity and display enhanced, high-CTR results sync.",
      features: ["Local Entity Schema", "Product Data Sync Node", "FAQ Rich Snippets", "Breadcrumb Logic Sync"]
    },
    {
      icon: <BarChart className="w-12 h-12" />,
      title: "Telemetry & Insights",
      description: "Track rankings, monitor traffic shifts, and measure the success of your absolute visibility efforts with predictive reporting node.",
      features: ["Ranking Telemetry Sync", "Traffic Attribution", "Conversion Mapping Logic", "Strategic Reports Node"]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute SEO Design - Search Visibility Architecture | LUNEXO MEDIA"
        description="Build absolute SEO-optimized websites that rank higher in search results. Our visibility-optimized designs drive organic lift automatically."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/seo-friendly"
        keywords="SEO friendly website, SEO optimized design, search engine optimization, organic traffic"
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
                <Search className="w-5 h-5 mr-4" />
                Visibility Engineering
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Dominating <br /> <span className="text-primary italic">Algorithms.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Get found by the minds that matter. Our visibility-optimized absolute architectures help you rank higher, drive organic lift, and reach more clients <span className="text-primary italic font-bold">automatically.</span>
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
                  Boost My Ranking
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visibility Impact Delta */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Organic Lift
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Organic <span className="text-primary italic">Lift.</span>
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
            <h3 className="text-5xl font-heading font-bold text-center text-white mb-20 tracking-tight leading-tight">Search Visibility Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="text-4xl font-heading font-black text-slate-500 tracking-tighter">Week 1-2</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Index & Crawl Sync</div>
              </div>
              <div className="space-y-8 p-12 bg-white/10 rounded-[3rem] border border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="text-4xl font-heading font-black text-slate-300 tracking-tighter">Month 1-2</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Initial Ranking Surge</div>
              </div>
              <div className="space-y-8 p-12 bg-white/20 rounded-[3rem] border border-white/20 hover:bg-white/30 transition-all duration-500 scale-110">
                <div className="text-4xl font-heading font-black text-white tracking-tighter">Month 3-4</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Traffic Growth Loop</div>
              </div>
              <div className="space-y-8 p-12 bg-primary/20 rounded-[3rem] border border-primary/20 hover:bg-primary/30 transition-all duration-500">
                <div className="text-4xl font-heading font-black text-primary tracking-tighter">Month 6+</div>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Top Tier Dominance</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Sync Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Strategic Sync
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Strategic <span className="text-primary italic">Sync.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {seoElements.map((element, index) => (
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
                    {element.icon}
                  </div>
                  <div className="space-y-10">
                    <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-all duration-700 tracking-tight leading-tight">{element.title}</h3>
                    <p className="text-2xl text-slate-500 leading-relaxed font-medium">{element.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/60">
                      {element.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-6 text-xl text-slate-700 font-bold group/feat">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                             <CheckCircle className="w-4 h-4 text-primary group-hover/feat:text-white" />
                          </div>
                          <span className="group-hover/feat:text-slate-900 transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {seoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 1 }}
                className="px-12 py-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full font-black text-lg text-slate-700 hover:text-primary transition-all duration-700 hover:shadow-glass cursor-default hover:scale-110 uppercase tracking-[0.2em]"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Absolute Local Presence */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Globe className="w-5 h-5 mr-4" />
                  Absolute Local Presence
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Local <span className="text-primary italic">Presence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { title: "Business Profile Sync", description: "Optimized absolute listings and local citations for absolute proximity dominance logic.", icon: <Globe className="w-12 h-12" /> },
              { title: "Local Intent Logic", description: "Strategic absolute targeting of location-based search patterns and intent phrases node.", icon: <Target className="w-12 h-12" /> },
              { title: "Review Logic Sync", description: "Bespoke absolute systems to manage customer sentiment for enhanced local ranking nodes.", icon: <BarChart className="w-12 h-12" /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  {item.icon}
                </div>
                <div className="space-y-6">
                   <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{item.title}</h3>
                   <p className="text-2xl text-slate-500 font-medium leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <Activity className="w-8 h-8 mx-auto" />
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
                The Absolute Visibility
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Dominate?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Stop losing high-value identity clients to competitors. Get a visibility-optimized absolute architecture that ranks higher and drives organic lift.
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

export default SEOFriendly;