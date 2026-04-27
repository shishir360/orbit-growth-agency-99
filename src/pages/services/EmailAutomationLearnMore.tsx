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
  Mail, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Target,
  BarChart3,
  Zap,
  Settings,
  Calendar,
  UserPlus,
  ChevronRight,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const EmailAutomationLearnMore = () => {
  const features = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Dynamic Personalization",
      description: "AI-powered absolute content that adapts to each recipient's behavior, preferences, and purchase history in real-time logic."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Behavioral Triggers",
      description: "Automated sequences triggered by granular user actions, website navigation, and engagement pattern protocols."
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Neural Testing Framework",
      description: "Continuous optimization through split testing of subject lines, content clusters, and predictive send time logic."
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Predictive Segmentation",
      description: "Intelligent audience segmentation based on advanced demographics, behavior, and lifecycle logic projections."
    }
  ];

  const automationTypes = [
    {
      title: "The Welcome Journey",
      description: "Onboard new subscribers with a bespoke, high-conversion absolute email sequence and identity sync.",
      results: "150% Higher Engagement",
      icon: <UserPlus className="w-10 h-10" />
    },
    {
      title: "Revenue Recovery Logic",
      description: "Win back high-value customers who left items in their digital shopping cart repository.",
      results: "30% Recovery Rate",
      icon: <Mail className="w-10 h-10" />
    },
    {
      title: "Funnel Nurturing Sync",
      description: "Guide prospects through the sales architecture with hyper-targeted strategic content nodes.",
      results: "50% More Qualified Leads",
      icon: <TrendingUp className="w-10 h-10" />
    },
    {
      title: "Re-activation Engine",
      description: "Re-engage dormant subscribers with compelling, AI-optimized absolute specialized offers.",
      results: "25% Reactivation Rate",
      icon: <Zap className="w-10 h-10" />
    }
  ];

  const metrics = [
    { label: "Open Rate Logic", value: "45%", change: "+180% Velocity" },
    { label: "Click Rate Delta", value: "12%", change: "+250% Engaged" },
    { label: "Conversion Sync", value: "8%", change: "+400% ROI" },
    { label: "Revenue / Node", value: "$4.50", change: "+320% Lift" }
  ];

  const integrations = [
    "Klaviyo", "HubSpot", "Mailchimp", "ActiveCampaign", "ConvertKit", "Salesforce",
    "Shopify", "Stripe", "WooCommerce", "Zapier", "Make", "Braze"
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Email Automation - AI-Powered Email Architecture | LUNEXO MEDIA"
        description="Boost absolute email performance with AI-driven automation. Personalized sequences, behavioral triggers, and advanced segmentation protocols."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/email-automation-learn-more"
        keywords="email automation, email marketing, AI email, personalized emails, automated sequences"
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
                <Mail className="w-5 h-5 mr-4" />
                The Absolute Retention Engine
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Personalized <br /> <span className="text-primary italic">Direct Mail.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Transform your email architecture with absolute AI-powered automation that delivers the right message to the right mind at the <span className="text-primary italic font-bold">absolute precise moment.</span>
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
                  Launch Automation
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Matrix */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Activity className="w-5 h-5 mr-4" />
                  Absolute Performance Matrix
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              Performance <span className="text-primary italic">Delta.</span>
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
                  <Badge className="bg-slate-900 text-white border-none px-10 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl group-hover:bg-primary transition-all duration-700">{metric.change}</Badge>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <TrendingUp className="w-8 h-8 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Inbound Protocols */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Cpu className="w-5 h-5 mr-4" />
                  Absolute Neural Inbound
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Neural <span className="text-primary italic">Inbound.</span>
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

      {/* Strategic Workflow Architectures */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Strategic Workflows
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Strategic <span className="text-primary italic">Workflows.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {automationTypes.map((type, index) => (
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
                    {type.icon}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{type.title}</h3>
                    <p className="text-3xl text-slate-500 leading-relaxed font-medium">{type.description}</p>
                  </div>
                  <div className="flex items-center gap-8 bg-slate-900 rounded-[2.5rem] p-10 border border-white/20 shadow-2xl">
                    <TrendingUp className="w-10 h-10 text-primary" />
                    <span className="text-3xl font-heading font-black text-white italic tracking-tight">{type.results}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seamless Node Integrations */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding text-center">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Globe className="w-5 h-5 mr-4" />
                  Absolute Node Integrations
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Seamless <span className="text-primary italic">Integrations.</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 1 }}
                className="px-16 py-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full font-black text-2xl text-slate-700 hover:text-primary transition-all duration-700 hover:shadow-glass cursor-default hover:scale-110"
              >
                {integration}
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
                The Lifecycle Audit
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Connect?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join the elite brands that have scaled their retention and revenue by over 400% with our absolute AI automation architectures.
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

export default EmailAutomationLearnMore;