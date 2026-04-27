import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import SEO from "@/components/ui/seo";
import { 
  Check, 
  Zap, 
  Users, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Target, 
  Bot, 
  Star, 
  Award, 
  TrendingUp, 
  Shield, 
  Clock, 
  Play,
  Layers,
  ShieldCheck,
  Activity,
  Brain,
  Cpu,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import founderImage from "@/assets/founder-farhan.jpg";

const About = () => {
  useEffect(() => {
    document.title = "About Lunexo Media | Your Partner in Digital Growth";
  }, []);

  const services = [
    {
      icon: Globe,
      title: "Digital Architecture",
      description: "Stunning, high-converting architectures that drive absolute business results.",
      stats: "300+ Architectures built",
      color: "primary"
    },
    {
      icon: Target,
      title: "ROI Orchestration",
      description: "Data-driven absolute campaigns that maximize your ROI velocity.",
      stats: "$10K+ Spend managed",
      color: "accent"
    },
    {
      icon: Brain,
      title: "Intelligence Logic",
      description: "Intelligent automation absolute nodes that streamline operations.",
      stats: "80% Efficiency sync",
      color: "primary"
    }
  ];

  const values = [
    { icon: Award, title: "Proven Results", desc: "Track record of delivering absolute measurable growth velocity sync", color: "primary" },
    { icon: Zap, title: "Lightning Fast", desc: "Get your absolute project launched in weeks, not months logic", color: "accent" },
    { icon: ShieldCheck, title: "White-Glove Service", desc: "Dedicated absolute support for every operational node", color: "primary" },
    { icon: TrendingUp, title: "Growth Focused", desc: "Every absolute solution designed for absolute scale and velocity", color: "accent" }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Intelligence - The Agency DNA | LUNEXO MEDIA"
        description="Learn more about Lunexo Media, our absolute mission, vision, and expert team dedicated to driving your business success with strategic logic."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/about"
        keywords="about us, digital agency, Farhan Tanvir, our story, digital marketing team"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
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
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                <Sparkles className="w-5 h-5 mr-4" />
                The Agency DNA
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Absolute <br /> <span className="text-primary italic">Intelligence.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              We're not just another absolute digital agency. We're your strategic partner in building <span className="text-primary italic font-bold">scalable, profitable</span> absolute digital solutions that drive operational velocity.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-10 justify-center pt-12"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Partner With Us
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-3xl px-24 py-16 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-700 font-bold hover:scale-105" asChild>
                <Link to="/portfolio">Explore Work</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Logic */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 shadow-glass space-y-16 hover:shadow-2xl transition-all duration-700 hover:translate-y-[-10px]">
                <h3 className="text-6xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight">Our <span className="text-primary italic">Absolute Mission.</span></h3>
                <p className="text-3xl text-slate-500 font-medium leading-relaxed">
                  Making absolute digital growth velocity accessible to businesses of all sizes through innovative technology and proven strategic logic.
                </p>
                <div className="space-y-8">
                  {[
                    "Absolute turnaround on all nodes",
                    "User-focused intelligence principles",
                    "Ongoing protocol maintenance"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-8 text-2xl font-bold text-slate-700 bg-white/60 p-8 rounded-[2rem] border border-white/60 shadow-sm group hover:bg-white/80 transition-all duration-500 hover:scale-105">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                         <ShieldCheck className="w-6 h-6 text-primary group-hover:text-white" />
                      </div>
                      <span className="group-hover:text-slate-900 transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                  <Layers className="w-5 h-5 mr-4" />
                  The Engine Room
                </Badge>
              </motion.div>
              <h2 className="text-6xl lg:text-[9rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
                What We <br /> <span className="text-primary italic">Do Best.</span>
              </h2>
              <div className="grid gap-12 pt-8">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 flex items-center gap-12 hover:translate-y-[-10px]"
                  >
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-900 flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl flex-shrink-0 group-hover:rotate-12 text-white">
                      <service.icon className="w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs font-black text-primary uppercase tracking-[0.4em]">{service.stats}</div>
                      <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-xl text-slate-500 font-medium leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-48 relative overflow-hidden bg-background">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Core Principles
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
              Our Absolute <span className="text-primary italic">Values.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 shadow-glass space-y-10 hover:translate-y-[-15px] transition-all duration-700 text-center group"
              >
                <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center border border-white/20 mx-auto group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:rotate-12">
                  <value.icon className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-6">
                   <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">{value.title}</h3>
                   <p className="text-2xl text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 shadow-glass text-center space-y-16 hover:shadow-2xl transition-all duration-700 hover:translate-y-[-10px]">
                <div className="relative inline-block">
                  <div className="absolute -inset-8 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                  <img
                    src={founderImage}
                    alt="Farhan Tanvir - Founder & CEO"
                    className="w-96 h-96 rounded-full object-cover border-[12px] border-white shadow-2xl relative z-10"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-6xl font-heading font-bold text-slate-900 tracking-tight">Farhan Tanvir</h3>
                  <p className="text-primary font-black uppercase tracking-[0.5em] text-sm">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                  <Users className="w-5 h-5 mr-4" />
                  Visionary Leadership
                </Badge>
              </motion.div>
              
              <h2 className="text-6xl lg:text-[9rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
                Leading with <br /> <span className="text-primary italic">Absolute Intelligence.</span>
              </h2>
              
              <div className="space-y-10 text-3xl text-slate-500 font-medium leading-relaxed pt-8">
                <p>
                  I started Lunexo Media with a clear vision – to help businesses grow faster and smarter through absolute digital architectures, ROI orchestration, and intelligence logic.
                </p>
                <p>
                  With years of experience in the digital space, I've helped countless businesses transform their online presence DNA and achieve their absolute goals sync.
                </p>
              </div>
              
              <div className="pt-12">
                 <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 group hover:scale-110" asChild>
                   <Link to="/founder" className="flex items-center gap-6">
                     Founder's Story
                     <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                   </Link>
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Gateway */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                Initialize Protocol
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-[1] tracking-tighter">
              Ready to Architect <br /> <span className="text-primary italic">Your Success?</span>
            </motion.h2>

             <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Initialize the absolute protocol and partner with the premier digital growth agency to scale your architecture.
            </p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Start Your Journey
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/portfolio">Explore Repository</Link>
              </Button>
            </motion.div>
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

export default About;
