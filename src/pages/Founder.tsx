import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Briefcase, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  Linkedin, 
  Twitter,
  Mail,
  Globe,
  TrendingUp,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Brain,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import founderImage from "@/assets/founder-farhan.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Founder = () => {
  useEffect(() => {
    document.title = "Farhan Tanvier - Founder & CEO | Lunexo Media";
  }, []);

  const achievements = [
    { icon: Briefcase, value: "50+", label: "Architectures Delivered" },
    { icon: Users, value: "30+", label: "Absolute Partners" },
    { icon: TrendingUp, value: "$10K+", label: "ROI Generated" },
    { icon: Award, value: "5+", label: "Years Intelligence" }
  ];

  const expertise = [
    "Digital Marketing Strategy Logic",
    "Web Design & Digital Identity",
    "AI & Intelligence Solutions",
    "Google & Meta ROI Orchestration",
    "SEO & Velocity Protocols",
    "Business Growth Architecture"
  ];

  const journey = [
    { year: "2019", title: "Intelligence Origin", description: "Began learning digital architecture and marketing logic." },
    { year: "2020", title: "First Nodes", description: "Started freelancing and building architectures for local brands." },
    { year: "2021", title: "Agency Foundation", description: "Founded Lunexo Media to architect absolute digital growth." },
    { year: "2022", title: "Logic Expansion", description: "Added AI automation and advanced ROI orchestration." },
    { year: "2023", title: "50+ Architectures", description: "Reached milestone of 50+ successful partner projects." },
    { year: "2024", title: "Global Reach", description: "Serving partners across USA, UK, and beyond." }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Farhan Tanvier - Founder & CEO | Lunexo Media"
        description="Meet Farhan Tanvier, the founder and CEO of Lunexo Media. A passionate digital strategist helping businesses grow through web design, marketing, and AI automation."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/founder"
        keywords="Farhan Tanvier, Lunexo Media founder, CEO, digital marketing expert, web design, AI automation, business growth"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                  <Brain className="w-5 h-5 mr-3" />
                  Founder & CEO Node
                </Badge>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
              >
                Farhan <br /> <span className="text-primary italic">Tanvier.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl text-slate-500 max-w-xl leading-relaxed font-medium"
              >
                Architect of intelligence and absolute digital entrepreneur dedicated to helping brands thrive in the modern age. Founder of <span className="text-primary italic font-bold">Lunexo Media.</span>
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center gap-8"
              >
                {[Linkedin, Twitter, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-16 h-16 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-sm group">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-8 pt-8"
              >
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                  <Link to="/contact">
                    Begin Execution
                    <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                  <Link to="/portfolio">Explore Repository</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="relative"
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-4 lg:p-8 shadow-glass overflow-hidden">
                <div className="relative rounded-[3rem] overflow-hidden group">
                  <img 
                    src={founderImage} 
                    alt="Farhan Tanvier - Founder & CEO" 
                    className="w-full h-auto rounded-[3rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute bottom-8 left-8 bg-primary text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3">
                    <Activity className="w-4 h-4" />
                    Accepting Nodes
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {achievements.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-12 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-8px]"
              >
                <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:bg-primary transition-all duration-500">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Origin */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <Star className="w-5 h-5 mr-3" />
                The Origin Story
              </Badge>
              <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-[1.1]">
                Obsessed with <br /> <span className="text-primary italic">Absolute Growth.</span>
              </h2>
              <div className="space-y-8 text-2xl text-slate-500 font-medium leading-relaxed">
                <p>
                  I'm Farhan Tanvier, and my journey began with a simple obsession: engineering absolute success for brands in the digital vacuum.
                </p>
                <p>
                  Over the years, I've had the privilege of architecting trajectories for startups and established global brands, helping them dominate their markets through visual logic.
                </p>
                <p>
                  At Lunexo Media, we combine aesthetic perfection with strategic intelligence to deliver deltas that matter.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 shadow-glass space-y-12"
            >
              <h3 className="text-4xl font-heading font-bold text-slate-900 flex items-center gap-6">
                <Activity className="w-10 h-10 text-primary" />
                Core Logic
              </h3>
              <div className="grid gap-6">
                {expertise.map((skill, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 bg-white/60 border border-white/60 rounded-[2.5rem] group hover:bg-primary transition-all duration-500">
                    <ShieldCheck className="w-6 h-6 text-primary group-hover:text-white" />
                    <span className="text-xl font-bold text-slate-900 group-hover:text-white">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Trajectory Timeline */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <Calendar className="w-5 h-5 mr-3" />
                Strategic Path
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              The Path to <span className="text-primary italic">Absolute Success</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative bg-white/40 border border-white/60 rounded-[3.5rem] p-16 hover:shadow-glass transition-all duration-1000"
              >
                <div className="text-4xl font-heading font-black text-primary/10 group-hover:text-primary transition-colors mb-6 tracking-tighter">
                  {item.year}
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">{item.title}</h3>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Gateway */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Initialize Collaboration
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Ready to Build <br /> <span className="text-primary italic">Absolute Legacies?</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl text-slate-300 font-body leading-relaxed max-w-4xl mx-auto">
              I'm always architecting new projects and scaling business trajectories. Let's discuss your absolute growth today.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-8 justify-center pt-12">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Start Execution
                  <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/about">About Lunexo</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Founder;
