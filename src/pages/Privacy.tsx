import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Shield, Lock, Eye, FileText, Sparkles, Users, Database, Bell, Settings, Clock, ArrowRight, Activity, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialMedia from "@/components/ui/social-media";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Privacy = () => {
  const sections = [
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Data Intelligence",
      content: "When you interact with our architectures or submit a scaling request, we secure the following data to provide absolute support.",
      details: [
        "Identity (Absolute Name)",
        "Secure Communication Channel (Email)",
        "Direct Uplink Protocol (Phone)",
        "Project Architecture & Service Requirements"
      ]
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Logic Utilization",
      content: "We utilize collected data for responding to inquiries, providing architectures, and improving our absolute repository quality.",
      details: [
        "Inquiry response and booking orchestration",
        "Architecture delivery and strategic support",
        "Repository and service trajectory refinement",
        "Encrypted updates and scaling insights (Consented)"
      ]
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Absolute Protection",
      content: "We implement enterprise-grade security measures to protect your personal logic and never distribute users' data to third-party entities.",
      details: [
        "Enterprise-grade security measures",
        "Zero distribution policy for third-party entities",
        "Legal disclosure only if required by absolute law"
      ]
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "Telemetry & Cookies",
      content: "Our repository utilizes telemetry to improve user experience, track logic preferences, and analyze architecture performance.",
      details: [
        "Cookies for optimized preference tracking",
        "Analytics for absolute performance monitoring",
        "User-controlled cookie configuration",
        "Potential feature dependencies on telemetry"
      ]
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "External Integration",
      content: "We may integrate with high-end third-party services for analytics and visibility. These entities maintain their own privacy logic.",
      details: [
        "High-end analytics and visibility integration",
        "External entity privacy policies apply",
        "Independent practice accountability"
      ]
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Retention & Sovereignty",
      content: "We retain data only as long as necessary for scaling and you maintain absolute sovereignty over your personal logic.",
      details: [
        "Strict retention logic for service duration",
        "Absolute access to personal data",
        "Correction and update sovereignty",
        "Right to data deletion (where applicable)",
        "Communication opt-out protocols"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Privacy Architecture | Data Sovereignty Protocol | LUNEXO MEDIA"
        description="Learn how LUNEXO MEDIA protects your absolute privacy and personal logic. Comprehensive privacy architecture covering data collection and sovereignty."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/privacy"
        keywords="privacy policy, data protection, GDPR, data security, LUNEXO MEDIA privacy"
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
                <Shield className="w-5 h-5 mr-4" />
                Data Sovereignty Protocol
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Privacy <br /> <span className="text-primary italic">Architecture.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              At Lunexo Media, your privacy is an absolute priority. This architecture defines how we secure, utilize, and protect your logic. <span className="text-primary italic font-bold">Your trust is our foundation.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center justify-center gap-6 text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]"
            >
              <Clock className="w-6 h-6 text-primary" />
              <span>LOGIC UPDATED: SEPTEMBER 2025</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-10 justify-center pt-12"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <Settings className="w-8 h-8 mr-4" /> Manage Settings
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/20 bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-500"
              >
                <FileText className="w-8 h-8 mr-4" /> Download Intel
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Privacy sections */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {sections.map((section, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group relative"
              >
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 flex flex-col h-full">
                  <div className="bg-slate-900 text-white p-16 lg:p-20 space-y-10">
                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-2xl hover:rotate-12">
                        {section.icon}
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight">{section.title}</h3>
                    </div>
                    <p className="text-2xl text-slate-300 font-medium leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                  
                  <div className="p-16 lg:p-20 space-y-12 flex-1 flex flex-col">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Protocol Details:</h4>
                       <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>
                    <ul className="space-y-8 flex-1">
                      {section.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-8 group/item">
                          <div className="w-4 h-4 bg-primary rounded-full mt-3 group-hover/item:scale-150 transition-all duration-500 shadow-lg" />
                          <span className="text-2xl text-slate-500 font-medium leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="max-w-7xl mx-auto text-center space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Users className="w-5 h-5 mr-4" />
                Global Support
              </Badge>
              <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
                Questions about <br /> <span className="text-primary italic">Privacy?</span>
              </h2>
              <p className="text-3xl text-slate-500 font-medium max-w-5xl mx-auto leading-relaxed">
                We're committed to absolute transparency. Reach out if you need clarification on any digital architecture practices or operational logic.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:bg-primary transition-all duration-700">
                  <Bell className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">Privacy Uplink</h3>
                <p className="text-2xl text-slate-500 font-medium mb-10">Secure access for data requests and operational privacy settings.</p>
                <a href="mailto:hello@lunexomedia.com" className="text-primary font-black uppercase tracking-[0.4em] text-sm hover:underline flex items-center justify-center gap-3">
                   <Activity className="w-5 h-5" /> hello@lunexomedia.com
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:rotate-12 transition-all duration-700">
                  <Database className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">General Inquiries</h3>
                <p className="text-2xl text-slate-500 font-medium mb-10">Absolute transparency for all digital architecture questions.</p>
                <a href="tel:+17024830749" className="text-primary font-black uppercase tracking-[0.4em] text-sm hover:underline flex items-center justify-center gap-3">
                   <Cpu className="w-5 h-5" /> +1 (702) 483-0749
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 shadow-glass relative group"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-40" />
              <SocialMedia variant="contact" className="max-w-2xl mx-auto" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="pt-20"
            >
              <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group">
                <Link to="/contact" className="flex items-center gap-6">
                  Secure Appointment
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;