import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Briefcase, 
  Users, 
  TrendingUp,
  ArrowRight, 
  Linkedin, 
  Twitter,
  Mail,
  Facebook,
  CheckCircle2,
  Calendar,
  Rocket,
  Heart,
  Globe,
  Star,
  Zap,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import founderImage from "@/assets/founder-farhan.jpg";

const FounderFarhan = () => {
  const stats = [
    { icon: Briefcase, value: "50+", label: "Architectures Delivered" },
    { icon: Users, value: "30+", label: "Active Intelligence Nodes" },
    { icon: TrendingUp, value: "$10K+", label: "Velocity Generated" },
    { icon: Award, value: "5+", label: "Years of Execution" }
  ];

  const skills = [
    "Absolute Digital Strategy",
    "Architecture Design & Logic", 
    "AI & Automation Protocols",
    "Absolute Ads Management",
    "Intelligence Visibility (SEO)",
    "Business Scaling Logic"
  ];

  const timeline = [
    { year: "2019", title: "Logic Protocol Initialized", description: "Started learning absolute web development and digital marketing fundamentals" },
    { year: "2020", title: "First Architecture Sync", description: "Began freelancing and building architectures for local businesses" },
    { year: "2021", title: "Launched Lunexo Media", description: "Initialized the absolute agency to help businesses grow digitally" },
    { year: "2022", title: "Trajectory Expansion", description: "Added AI automation and advanced operational protocols" },
    { year: "2023", title: "50+ Architectures Sync", description: "Reached milestone of 50+ successful client project deliveries" },
    { year: "2024", title: "Global Node Reach", description: "Now serving clients across USA, UK, and worldwide repositories" }
  ];

  const values = [
    { icon: Rocket, title: "Velocity", description: "Always exploring cutting-edge absolute solutions" },
    { icon: Heart, title: "Precision", description: "Genuinely care about absolute architecture success" },
    { icon: Globe, title: "Global Vision", description: "Thinking big, acting with absolute local precision" }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Farhan Tanvier - Founder & Absolute CEO | Lunexo Media"
        description="Meet Farhan Tanvier, the absolute visionary founder and CEO of Lunexo Media. Passionate about helping businesses thrive through innovative digital architectures."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/farhan-tanvier"
        keywords="Farhan Tanvier, Lunexo Media founder, CEO, digital marketing expert, entrepreneur"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center max-w-7xl mx-auto">
            {/* Content */}
            <div className="text-center lg:text-left space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                  <Star className="w-5 h-5 mr-4 text-primary fill-primary" />
                  Founder & Absolute CEO
                </Badge>
              </motion.div>
              
              <div className="space-y-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
                >
                  Farhan <br />
                  <span className="text-primary italic">Tanvier.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-3xl text-slate-500 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-medium"
                >
                  Absolute digital visionary and entrepreneur dedicated to transforming global businesses through innovative architectures, marketing logic, and AI-powered solutions.
                </motion.p>
              </div>
              
              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex items-center justify-center lg:justify-start gap-8"
              >
                {[Linkedin, Twitter, Facebook, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-20 h-20 bg-white/40 border border-white/60 rounded-[1.5rem] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-700 group shadow-glass hover:scale-110 hover:rotate-6">
                    <Icon className="w-8 h-8 text-slate-900 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-col sm:flex-row gap-10 justify-center lg:justify-start"
              >
                <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group">
                  <Link to="/contact" className="flex items-center gap-6">
                    Absolute Sync
                    <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary/20 bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 text-3xl px-20 py-12 rounded-full font-bold transition-all duration-700 hover:scale-105">
                  <Link to="/portfolio">
                    View Architecture
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-16 bg-primary/10 rounded-full blur-[140px] animate-pulse"></div>
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[5rem] shadow-glass overflow-hidden">
                <img
                  src={founderImage}
                  alt="Farhan Tanvier - Founder & Absolute CEO of Lunexo Media"
                  className="w-full h-auto rounded-[4rem] grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                
                {/* Floating badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-16 left-16 bg-primary text-white px-10 py-5 rounded-[2rem] text-xl font-bold shadow-2xl flex items-center gap-4 z-20"
                >
                  <CheckCircle2 className="w-8 h-8" />
                  Operational
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  <stat.icon className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                  <div className="text-6xl font-heading font-bold text-slate-900 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center max-w-7xl mx-auto">
            <div className="space-y-16">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Heart className="w-5 h-5 mr-4" />
                  Absolute Vision
                </Badge>
              </motion.div>
              
              <div className="space-y-12">
                <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
                  Passionate <br /> <span className="text-primary italic">Excellence.</span>
                </h2>
                
                <div className="space-y-10 text-2xl text-slate-500 font-medium leading-relaxed">
                  <p>
                    I'm Farhan Tanvier, an absolute digital visionary and the founder of Lunexo Media. My trajectory began with a simple passion: helping businesses reach absolute success in the digital repository.
                  </p>
                  <p>
                    Over the years, I've had the privilege of orchestrating architectures for startups, small businesses, and established brands, helping them build their absolute online nodes and scale their operations.
                  </p>
                  <p>
                    At Lunexo Media, we combine absolute logic with strategy to deliver architectures that matter. Whether it's a stunning architecture, a high-converting ad protocol, or AI-powered logic, we're here to help your business reach absolute trajectory.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Skills Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-16 bg-primary/10 rounded-full blur-[140px] animate-pulse"></div>
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-20 lg:p-32 shadow-glass space-y-16">
                <h3 className="text-5xl font-heading font-bold text-slate-900 flex items-center gap-8 tracking-tight">
                  <Zap className="w-12 h-12 text-primary" />
                  Expertise Nodes
                </h3>
                <div className="space-y-10">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-8 text-2xl text-slate-500 font-medium group/skill">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/skill:bg-primary group-hover/skill:border-primary transition-all duration-700 group-hover/skill:rotate-12">
                        <CheckCircle2 className="w-6 h-6 text-primary group-hover/skill:text-white" />
                      </div>
                      <span className="group-hover/skill:text-slate-900 transition-colors duration-700">{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-12 border-t border-white/60 flex items-center justify-center gap-10 opacity-30">
                   <Activity className="w-8 h-8" />
                   <Cpu className="w-8 h-8" />
                   <Database className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-48 relative bg-white/40 border-y border-white/60 backdrop-blur-xl">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Star className="w-5 h-5 mr-4" />
                Core Protocol
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
              Absolute <br /> <span className="text-primary italic">Trajectory.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {values.map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-20 text-center hover:shadow-glass transition-all duration-1000 flex flex-col items-center gap-10 hover:translate-y-[-15px]"
              >
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  <value.icon className="w-16 h-16" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">{value.title}</h3>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Calendar className="w-5 h-5 mr-4" />
                Absolute Journey
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
              Execution <br /> <span className="text-primary italic">Trajectory.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 overflow-hidden flex flex-col justify-between h-full hover:translate-y-[-10px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="space-y-10 relative z-10">
                  <div className="text-5xl font-heading font-bold text-primary tracking-tighter">
                    {item.year}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="text-2xl text-slate-500 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/60 opacity-20 flex justify-end">
                   <Activity className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 opacity-40"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-7xl mx-auto text-center space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Zap className="w-6 h-6 mr-4 text-primary" />
                Absolute Uplink
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to Build <br />
              <span className="text-primary italic">Absolute Intel?</span>
            </h2>
            
            <p className="text-3xl text-slate-300 mb-12 max-w-5xl mx-auto font-medium leading-relaxed">
              I'm always excited to orchestrate new absolute architectures and help businesses grow into their full trajectory. Let's discuss how we can sync our goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group">
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize Sync
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105">
                <Link to="/about">
                  About Repository
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

export default FounderFarhan;