import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Scale, FileCheck, CreditCard, Shield, Users, AlertTriangle, Gavel, FileText, Sparkles, Clock, Phone, Mail, ArrowRight, Activity, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialMedia from "@/components/ui/social-media";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: "Architecture & Services",
      content: "These Terms and Conditions govern your access to Lunexo Media's repository and architectures. By interacting with our logic, you acknowledge and agree to these absolute protocols.",
      details: [
        "Digital Architecture Design & Development",
        "Visibility Engineering (SEO)",
        "Ads Management Logic (Meta, Google, Instagram)",
        "AI Automation Architectures",
        "Right to update or archive services at any trajectory point"
      ]
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Repository Sovereignty",
      content: "You agree to utilize this repository only for lawful scaling and must not cause logic damage or interfere with absolute performance. Accuracy in requests is mandatory.",
      details: [
        "Strictly lawful repository utilization",
        "Zero interference with architecture functionality",
        "Unauthorized access attempts are absolute breaches",
        "Requirement for absolute accuracy in scaling requests",
        "Requests do not guarantee architecture confirmation"
      ]
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Data Logic & Sovereignty",
      content: "Through our Scaling Request Protocol, we secure your Identity solely for architecture orchestration and absolute operational support.",
      details: [
        "Logic used only for orchestration and support",
        "Zero distribution policy for third-party entities",
        "Information shared only under absolute law",
        "Review our Privacy Protocol for complete logic",
        "Responsible handling of your digital footprint"
      ]
    },
    {
      icon: <Scale className="w-10 h-10" />,
      title: "Intellectual Architecture",
      content: "All architectures on this repository, including visual logic, logos, and software, are the property of Lunexo Media and secured under global copyright laws.",
      details: [
        "All repository logic is Lunexo Media property",
        "Global copyright law protection applied",
        "Reproduction requires absolute written consent",
        "Logic modification is strictly prohibited",
        "Unauthorized use triggers legal protocols"
      ]
    },
    {
      icon: <AlertTriangle className="w-10 h-10" />,
      title: "Liability Boundaries",
      content: "Lunexo Media maintains boundaries regarding liability for incidental damages. We make no guarantees for absolute availability and maintain distance from external entity practices.",
      details: [
        "No liability for indirect or incidental logic damages",
        "No guarantee for constant repository uptime",
        "External links are for context, not endorsement",
        "Zero responsibility for external entity logic",
        "Discretionary use of third-party architectures"
      ]
    },
    {
      icon: <Gavel className="w-10 h-10" />,
      title: "Protocol Updates",
      content: "We may update these Terms and Conditions at any trajectory point without prior notification. These protocols are governed by the absolute laws of Bangladesh.",
      details: [
        "Protocol updates without prior notice",
        "Continued interaction implies acceptance",
        "Requirement to audit terms regularly",
        "Governed by the absolute laws of Bangladesh",
        "Contact uplink for any protocol inquiries"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Terms & Conditions | Service Protocol | LUNEXO MEDIA"
        description="Read LUNEXO MEDIA's absolute terms and conditions for our digital architecture services. Important legal information about our service protocols."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/terms"
        keywords="terms and conditions, service agreement, legal terms, LUNEXO MEDIA policies"
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
                <Gavel className="w-5 h-5 mr-4" />
                Service Protocol 2025
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Terms & <br /> <span className="text-primary italic">Conditions.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Transparent protocols that secure both our clients and our absolute architecture. <span className="text-primary italic font-bold">Fair agreements for absolute scaling.</span>
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
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105" asChild
              >
                <a href="https://drive.google.com/file/d/1TJbJMpFBMNoVa34l_pdDAMBuGZuKNVDV/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  <FileText className="w-8 h-8" /> Download Protocol
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/20 bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-500"
              >
                <Scale className="w-8 h-8 mr-4" /> Legal Uplink
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Terms Sections */}
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
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Protocol Nodes:</h4>
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
                <Scale className="w-5 h-5 mr-4" />
                Legal Integrity
              </Badge>
              <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
                Need Clarification on <br /> <span className="text-primary italic">Our Terms?</span>
              </h2>
              <p className="text-3xl text-slate-500 font-medium max-w-5xl mx-auto leading-relaxed">
                We believe in absolute transparency. Our legal team is available to define any nodes in our absolute digital service protocols.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:bg-primary transition-all duration-700">
                  <Mail className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">Legal Uplink</h3>
                <p className="text-2xl text-slate-500 font-medium mb-10">Questions regarding absolute terms and agreements.</p>
                <a href="mailto:hello@lunexomedia.com" className="text-primary font-black uppercase tracking-[0.4em] text-sm hover:underline flex items-center justify-center gap-3">
                   <Activity className="w-5 h-5" /> hello@lunexomedia.com
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:rotate-12 transition-all duration-700">
                  <Phone className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">Contract Support</h3>
                <p className="text-2xl text-slate-500 font-medium mb-10">Direct support for absolute service agreements.</p>
                <a href="tel:+17024830749" className="text-primary font-black uppercase tracking-[0.4em] text-sm hover:underline flex items-center justify-center gap-3">
                   <Cpu className="w-5 h-5" /> +1 (702) 483-0749
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-[#FF719A] text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:bg-primary transition-all duration-700">
                  <Gavel className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">Dispute Protocols</h3>
                <p className="text-2xl text-slate-500 font-medium mb-10">Professional absolute mediation protocols.</p>
                <a href="mailto:disputes@lunexomedia.com" className="text-primary font-black uppercase tracking-[0.4em] text-sm hover:underline flex items-center justify-center gap-3">
                   <ShieldCheck className="w-5 h-5" /> disputes@lunexomedia.com
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
              className="flex flex-col sm:flex-row gap-10 justify-center pt-20"
            >
              <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group">
                <Link to="/contact" className="flex items-center gap-6">
                  Secure Appointment
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary/20 bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 text-3xl px-16 py-10 rounded-full font-bold transition-all duration-500 hover:scale-105">
                <Link to="/privacy">Privacy Protocol</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;