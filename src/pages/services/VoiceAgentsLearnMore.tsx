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
  Phone, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Mic,
  Volume2,
  Settings,
  Calendar,
  HeadphonesIcon,
  MessageCircle,
  ChevronRight,
  Shield,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const VoiceAgentsLearnMore = () => {
  const features = [
    {
      icon: <Mic className="w-12 h-12" />,
      title: "Cognitive Speech",
      description: "State-of-the-art ASR technology that understands accents, dialects, and natural absolute speech patterns with absolute precision logic."
    },
    {
      icon: <Volume2 className="w-12 h-12" />,
      title: "Neural Synthesis",
      description: "Human-like absolute voice generation with emotional context and brand-appropriate tonality for deep identity connection."
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Dialogue Logic",
      description: "Intelligent conversational absolute logic that handles complex multi-turn inquiries and context switching nodes."
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Absolute Voice Cloning",
      description: "Personalized voice models trained on your specific brand voice and proprietary absolute industry terminology."
    }
  ];

  const useCases = [
    {
      title: "Elite Scheduling Logic",
      description: "Automated booking engine that handles cancellations, reschedules, and confirmations at absolute scale.",
      results: "85% Automation Rate",
      icon: <Calendar className="w-10 h-10" />
    },
    {
      title: "Bespoke Support Node",
      description: "Handle complex inquiries, troubleshooting, and issue resolution via natural absolute phone conversations.",
      results: "70% Resolution Rate",
      icon: <HeadphonesIcon className="w-10 h-10" />
    },
    {
      title: "Lead Intelligence Sync",
      description: "Screen high-value identity prospects and gather qualifying data through natural, persuasive absolute dialogue.",
      results: "300% More Leads",
      icon: <Users className="w-10 h-10" />
    },
    {
      title: "Operations Engine",
      description: "Process orders, handle returns, and provide status updates via absolute automated voice interfaces.",
      results: "50% Faster Flow",
      icon: <CheckCircle className="w-10 h-10" />
    }
  ];

  const capabilities = [
    "Multi-language support (50+ protocols)",
    "Real-time sentiment logic analysis",
    "Smart call routing & orchestration",
    "CRM architecture & data sync",
    "Voice biometric absolute identity",
    "Compliance & Sovereignty protocols"
  ];

  const metrics = [
    { label: "Call Capacity", value: "10K+", description: "Monthly automated logic calls" },
    { label: "Latency Delta", value: "<2sec", description: "Ultra-fast response velocity" },
    { label: "Recognition Sync", value: "95%", description: "ASR accuracy logic rate" },
    { label: "Op-Ex Saving", value: "60%", description: "vs traditional centers" }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute AI Voice Agents - Intelligent Phone Architecture | LUNEXO MEDIA"
        description="Deploy absolute AI voice agents that handle calls, book appointments, and provide support with human-like conversations 24/7."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/voice-agents-learn-more"
        keywords="AI voice agents, phone automation, voice AI, automated calls, conversational AI"
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
                <Mic className="w-5 h-5 mr-4" />
                The Voice of Tomorrow
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Human-Grade <br /> <span className="text-primary italic">Voice Engines.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Deploy intelligent absolute voice assistants that handle phone operations with absolute clarity, empathy, and <span className="text-primary italic font-bold">absolute zero downtime.</span>
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
                  Deploy Absolute Agent
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Precision Delta Matrix */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Precision Matrix
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Precision <span className="text-primary italic">Delta.</span>
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

      {/* Auditory Intelligence Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Mic className="w-5 h-5 mr-4" />
                  Absolute Auditory Intelligence
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Auditory <span className="text-primary italic">Intelligence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-20 hover:shadow-glass transition-all duration-1000 flex flex-col gap-12 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:rotate-12">
                  {feature.icon}
                </div>
                <div className="space-y-8">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{feature.title}</h3>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium">{feature.description}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="space-y-12 relative z-10">
                  <div className="w-20 h-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                    {useCase.icon}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{useCase.title}</h3>
                    <p className="text-3xl text-slate-500 leading-relaxed font-medium">{useCase.description}</p>
                  </div>
                  <div className="flex items-center gap-8 bg-slate-900 rounded-[2.5rem] p-10 border border-white/20 shadow-2xl">
                    <TrendingUp className="w-10 h-10 text-primary" />
                    <span className="text-3xl font-heading font-black text-white italic tracking-tight">{useCase.results}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Sovereignty & Security */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <ShieldCheck className="w-5 h-5 mr-4" />
                  Absolute Enterprise Protocols
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Enterprise <span className="text-primary italic">Security.</span>
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
                   <Shield className="w-8 h-8 text-primary" />
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
                The Absolute Audition
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Speak?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Deploy your custom absolute voice agent today and transform your phone operations into a high-conversion automated absolute engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Deploy Voice Agent
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/services/ai-automation-learn-more">
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

export default VoiceAgentsLearnMore;