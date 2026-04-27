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
  Bot, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Workflow,
  Database,
  Settings,
  Zap,
  FileText,
  BarChart3,
  ChevronRight,
  Shield,
  Activity,
  Cpu,
  ShieldCheck
} from "lucide-react";

const WorkflowAutomationLearnMore = () => {
  const features = [
    {
      icon: <Workflow className="w-12 h-12" />,
      title: "Process Optimization",
      description: "Analyze and streamline existing absolute workflows to eliminate bottlenecks and structural redundancies with logic sync."
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "Neural Data Sync",
      description: "Seamlessly connect all your business systems and tools for a unified, intelligent absolute data flow orchestration."
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Bespoke Logic Sync",
      description: "Build tailored absolute automation sequences that match your unique, high-value business process protocols."
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Telemetry & Control",
      description: "Track workflow performance in real-time with predictive absolute alerts for structural logic issues."
    }
  ];

  const automationAreas = [
    {
      title: "Lead Intelligence Sync",
      description: "Automate capture, scoring, and identity handoff to sales teams at absolute lightspeed.",
      results: "400% Faster Processing",
      icon: <Users className="w-10 h-10" />
    },
    {
      title: "Document Engine Protocol",
      description: "Extract, classify, and route business intelligence automatically across your absolute organization repository.",
      results: "80% Time Savings",
      icon: <FileText className="w-10 h-10" />
    },
    {
      title: "Identity Onboarding Sync",
      description: "Streamline new customer setup with automated high-end absolute checkpoints and logic nodes.",
      results: "50% Faster Setup",
      icon: <CheckCircle className="w-10 h-10" />
    },
    {
      title: "Inventory Logic Control",
      description: "Automate stock monitoring, reordering, and global supplier absolute communication protocols.",
      results: "30% Cost Reduction",
      icon: <Database className="w-10 h-10" />
    }
  ];

  const integrations = [
    {
      category: "CRM Architecture",
      tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho"]
    },
    {
      category: "Productivity Logic",
      tools: ["Slack", "Teams", "Asana", "Monday"]
    },
    {
      category: "E-commerce Repository",
      tools: ["Shopify", "WooCommerce", "Stripe", "Magento"]
    },
    {
      category: "Automation Orchestration",
      tools: ["Zapier", "Make", "n8n", "Retool"]
    }
  ];

  const benefits = [
    { stat: "75%", description: "Manual Toil Reduction", icon: <Clock className="w-10 h-10" /> },
    { stat: "300%", description: "Efficiency Surge", icon: <TrendingUp className="w-10 h-10" /> },
    { stat: "90%", description: "Error Elimination", icon: <ShieldCheck className="w-10 h-10" /> },
    { stat: "24/7", description: "Infinite Operation", icon: <Zap className="w-10 h-10" /> }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Workflow Automation - Streamline Business Architectures | LUNEXO MEDIA"
        description="Automate repetitive business processes with absolute workflow solutions. Increase efficiency, reduce toil, and scale your operations."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/workflow-automation-learn-more"
        keywords="workflow automation, business process automation, task automation, efficiency tools"
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
                <Workflow className="w-5 h-5 mr-4" />
                The Absolute Efficiency Engine
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Streamlining <br /> <span className="text-primary italic">Complexity.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Transform your manual bottlenecks into absolute hyper-efficient, automated pipelines that save time and eliminate manual toil <span className="text-primary italic font-bold">automatically.</span>
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
                  Automate Now
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Metrics Delta */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Core Metrics
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              Performance <span className="text-primary italic">Delta.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  {benefit.icon}
                </div>
                <div className="space-y-4">
                  <div className="text-6xl font-heading font-black text-primary tracking-tighter">{benefit.stat}</div>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{benefit.description}</h3>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <TrendingUp className="w-8 h-8 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligent Pipeline Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Cpu className="w-5 h-5 mr-4" />
                  Absolute Intelligent Pipelines
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Intelligent <span className="text-primary italic">Pipelines.</span>
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

      {/* Vertical System Architectures */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Vertical Systems
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Vertical <span className="text-primary italic">Systems.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {automationAreas.map((area, index) => (
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
                    {area.icon}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{area.title}</h3>
                    <p className="text-3xl text-slate-500 leading-relaxed font-medium">{area.description}</p>
                  </div>
                  <div className="flex items-center gap-8 bg-slate-900 rounded-[2.5rem] p-10 border border-white/20 shadow-2xl">
                    <TrendingUp className="w-10 h-10 text-primary" />
                    <span className="text-3xl font-heading font-black text-white italic tracking-tight">{area.results}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Connected Node Stack */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Bot className="w-5 h-5 mr-4" />
                  Absolute Node Stack
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              The Connected <span className="text-primary italic">Stack.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col hover:translate-y-[-10px]"
              >
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-10 border-b border-white/60 pb-8 tracking-tight">{integration.category}</h3>
                <div className="space-y-6">
                  {integration.tools.map((tool, i) => (
                    <div key={i} className="text-2xl text-slate-500 font-black uppercase tracking-[0.3em] hover:text-primary transition-all duration-500 cursor-default">
                      {tool}
                    </div>
                  ))}
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
                The Absolute Audit
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Scale?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Eliminate manual toil and accelerate your operations with intelligent, automated absolute workflow architecture session.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize Automation
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

export default WorkflowAutomationLearnMore;