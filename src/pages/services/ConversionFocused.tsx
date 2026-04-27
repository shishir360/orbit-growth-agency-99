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
  TrendingUp, 
  CheckCircle, 
  ArrowLeft,
  Target,
  Users,
  MousePointer,
  Brain,
  Eye,
  ShieldCheck,
  BarChart,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Activity,
  Cpu,
  Database
} from "lucide-react";

const ConversionFocused = () => {
  const conversionFeatures = [
    "Strategic CTAs Placement",
    "Trust Signals Integration", 
    "User Journey Optimization",
    "A/B Testing Framework",
    "Psychological Design Triggers",
    "Social Proof Architecture",
    "Urgency & Scarcity Logic",
    "Mobile-First Conversion"
  ];

  const stats = [
    { icon: <TrendingUp className="w-10 h-10" />, stat: "180%", label: "Average Conversion Boost" },
    { icon: <Target className="w-10 h-10" />, stat: "4.2%", label: "Top-Tier Conversion Rate" },
    { icon: <Users className="w-10 h-10" />, stat: "73%", label: "User Engagement Surge" },
    { icon: <BarChart className="w-10 h-10" />, stat: "2.8x", label: "Revenue Multiplier" }
  ];

  const conversionElements = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Psychology-Driven Design",
      description: "We utilize proven cognitive absolute principles to influence user behavior and guide visitors toward conversion logic.",
      techniques: ["Color Psychology Logic", "Visual Hierarchy Sync", "Cognitive Load Reduction", "Decision Architecture"]
    },
    {
      icon: <MousePointer className="w-12 h-12" />,
      title: "Strategic CTA Placement",
      description: "Call-to-action systems positioned at optimal absolute locations using heat map data and user behavior analysis.",
      techniques: ["Above-the-Fold CTAs", "Exit-Intent Logic", "Sticky Navigation Sync", "Dynamic CTA Variations"]
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Trust Signal Architecture",
      description: "Build absolute credibility and eliminate purchase anxiety with strategically placed high-trust absolute elements.",
      techniques: ["Customer Review Logic", "Security Badge Sync", "Risk Reversal Protocol", "Client Testimonials"]
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "User Experience Logic",
      description: "Seamless user journeys that eliminate friction and guide visitors naturally toward your absolute conversion goals.",
      techniques: ["Simplified Form Logic", "Progress Indicators", "Mobile Optimization Sync", "Instant Loading Protocol"]
    }
  ];

  const caseStudy = {
    title: "E-commerce Fashion House",
    challenge: "Low conversion rate of 0.8% despite high traffic repository",
    solution: "Complete UX redesign with absolute conversion optimization",
    results: [
      { metric: "Conversion Rate", before: "0.8%", after: "3.2%", improvement: "+300% Delta" },
      { metric: "Avg Order Value", before: "$45", after: "$78", improvement: "+73% Lift" },
      { metric: "Cart Abandonment", before: "85%", after: "42%", improvement: "-51% Logic" },
      { metric: "Monthly Revenue", before: "$15K", after: "$48K", improvement: "+220% ROI" }
    ]
  };

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Conversion Design - Psychology-Driven Architecture | LUNEXO MEDIA"
        description="Increase your absolute website conversions with psychology-driven design. Our conversion optimization strategies turn more visitors into absolute customers."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/conversion-focused"
        keywords="conversion focused website, conversion optimization, CRO, increase conversions"
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
                <TrendingUp className="w-5 h-5 mr-4" />
                Performance Engineering
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Conversion <br /> <span className="text-primary italic">Intelligence.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Transform your digital interface into a high-octane revenue machine. Our absolute architectures use psychology and data to turn <span className="text-primary italic font-bold">visitors into absolute loyalists.</span>
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
                  Maximize Revenue
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Delta */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Conversion Impact
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              Impact <span className="text-primary italic">Delta.</span>
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
            <h3 className="text-5xl font-heading font-bold text-center text-white mb-20 tracking-tight leading-tight">Global Conversion Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="text-6xl font-heading font-black text-slate-500 tracking-tighter">2.35%</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Industry Average</div>
              </div>
              <div className="space-y-8 p-12 bg-white/10 rounded-[3rem] border border-white/20 hover:bg-white/20 transition-all duration-500 scale-110">
                <div className="text-6xl font-heading font-black text-white tracking-tighter">3.68%</div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Top 25% Sites</div>
              </div>
              <div className="space-y-8 p-12 bg-primary/20 rounded-[3rem] border border-primary/20 hover:bg-primary/30 transition-all duration-500">
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">5.31%</div>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Our Client Average</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Playbook Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Revenue Playbook
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Revenue <span className="text-primary italic">Playbook.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {conversionElements.map((element, index) => (
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
                      {element.techniques.map((tech, i) => (
                        <div key={i} className="flex items-center gap-6 text-xl text-slate-700 font-bold group/feat">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                             <CheckCircle className="w-4 h-4 text-primary group-hover/feat:text-white" />
                          </div>
                          <span className="group-hover/feat:text-slate-900 transition-colors">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {conversionFeatures.map((feature, index) => (
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

      {/* Case Study Repository */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Case Study
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Case <span className="text-primary italic">Study.</span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden shadow-glass max-w-7xl mx-auto"
          >
            <div className="bg-slate-900 p-20 lg:p-32 text-center text-white space-y-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
              <h3 className="text-5xl font-heading font-bold tracking-tight">{caseStudy.title}</h3>
              <p className="text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium">{caseStudy.challenge}</p>
              <Badge className="bg-primary text-white border-none px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em] shadow-2xl">{caseStudy.solution}</Badge>
            </div>
            
            <div className="p-20 lg:p-32">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="text-center space-y-8 group">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{result.metric}</div>
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-2xl text-slate-400 line-through font-medium opacity-50">{result.before}</span>
                      <ChevronRight className="w-10 h-10 text-primary rotate-90 lg:rotate-0 group-hover:translate-x-4 transition-transform duration-700" />
                      <span className="text-6xl font-heading font-black text-slate-900 tracking-tighter">{result.after}</span>
                    </div>
                    <Badge className="bg-slate-900 text-white border-none px-10 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl group-hover:bg-primary transition-all duration-700">{result.improvement}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lifecycle Process */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Cpu className="w-5 h-5 mr-4" />
                  Absolute Lifecycle Process
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Lifecycle <span className="text-primary italic">Process.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              { step: "01", title: "Analyze Logic", description: "Deep absolute study of user behavior and friction identification node." },
              { step: "02", title: "Architect Sync", description: "Creation of high-conversion absolute variations based on repository data." },
              { step: "03", title: "Verify Performance", description: "Rigorous absolute A/B testing to confirm performance surge delta." },
              { step: "04", title: "Deploy Logic", description: "Implementation of winning absolute logic and continuous optimization loop." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="text-7xl font-heading font-black text-primary/10 tracking-tighter group-hover:text-primary/20 transition-colors">{item.step}</div>
                <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{item.title}</h3>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed">{item.description}</p>
                <div className="pt-8 border-t border-white/60 w-full opacity-20 flex justify-center">
                   <Activity className="w-8 h-8" />
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
                The Absolute Optimization
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Stop Leaving <br /> <span className="text-primary italic">Absolute Revenue?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Get an absolute conversion-optimized architecture that turns more visitors into high-value loyalists automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Start Optimization
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

export default ConversionFocused;