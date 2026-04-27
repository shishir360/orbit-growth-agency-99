import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Sparkles,
  ChevronRight,
  Play,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CaseStudy = () => {
  const { id } = useParams();

  // Case study data
  const caseStudyData = {
    "ecommerce-platform": {
      title: "E-commerce Architecture Transformation",
      category: "Retail Intelligence",
      client: "TechStart Solutions",
      duration: "3 months",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      challenge: "The client's existing e-commerce platform was outdated, slow, and had a 70% bounce rate. Sales were declining, and the user experience was poor across all devices.",
      solution: "We redesigned the entire platform with a focus on performance, user experience, and conversion optimization. Implemented modern design principles and advanced functionality.",
      results: "300% increase in sales, 65% reduction in bounce rate, 400% improvement in page speed",
      metrics: [
        { label: "Sales Increase", value: "300%", icon: <TrendingUp className="w-8 h-8" /> },
        { label: "Bounce Reduction", value: "65%", icon: <Target className="w-8 h-8" /> },
        { label: "Speed Multiplier", value: "400%", icon: <Zap className="w-8 h-8" /> },
        { label: "Client Sentiment", value: "95%", icon: <Users className="w-8 h-8" /> }
      ]
    },
    "saas-dashboard": {
      title: "SaaS Dashboard Architecture Sync",
      category: "Technology Logic",
      client: "GrowthCorp Analytics",
      duration: "2 months",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      challenge: "Complex data visualization platform with poor usability and high user churn. Users struggled to find insights and perform key actions.",
      solution: "Complete UX/UI overhaul with intuitive navigation, streamlined workflows, and beautiful data visualizations. Focus on user onboarding and feature discovery.",
      results: "50% reduction in bounce rate, 80% increase in user engagement, 200% improvement in feature adoption",
      metrics: [
        { label: "Bounce Reduction", value: "50%", icon: <Target className="w-8 h-8" /> },
        { label: "User Engagement", value: "80%", icon: <Users className="w-8 h-8" /> },
        { label: "Feature Adoption", value: "200%", icon: <BarChart3 className="w-8 h-8" /> },
        { label: "Retention Delta", value: "90%", icon: <TrendingUp className="w-8 h-8" /> }
      ]
    },
    "healthcare-portal": {
      title: "Healthcare Portal Protocol Development",
      category: "Healthcare Systems",
      client: "MediCare Solutions",
      duration: "4 months",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
      challenge: "Healthcare providers needed a secure, HIPAA-compliant portal for patient management with complex regulatory requirements and accessibility needs.",
      solution: "Built a comprehensive healthcare portal with advanced security features, patient management systems, and full accessibility compliance.",
      results: "90% user satisfaction, 100% HIPAA compliance, 75% reduction in administrative tasks",
      metrics: [
        { label: "User Sentiment", value: "90%", icon: <Users className="w-8 h-8" /> },
        { label: "Compliance Sync", value: "100%", icon: <CheckCircle className="w-8 h-8" /> },
        { label: "Admin Velocity", value: "75%", icon: <Target className="w-8 h-8" /> },
        { label: "Engagement Lift", value: "85%", icon: <TrendingUp className="w-8 h-8" /> }
      ]
    }
  };

  const currentCase = caseStudyData[id as keyof typeof caseStudyData] || caseStudyData["ecommerce-platform"];

  const features = [
    "Absolute UI/UX Design",
    "Omnichannel Logic",
    "Performance Optimization",
    "Visibility Engineering",
    "Enterprise Security",
    "Telemetry Integration",
    "Rigorous User Testing",
    "Absolute Sync Support"
  ];

  const testimonial = {
    quote: "The team exceeded our expectations in every way. The new architecture not only looks stunning but has transformed our business results into absolute success.",
    author: "Sarah Johnson",
    role: "Absolute CEO",
    company: currentCase.client
  };

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title={`${currentCase.title} | Absolute Case Study | LUNEXO MEDIA`}
        description={`Discover how we transformed ${currentCase.client} with premium web architecture. ${currentCase.results}`}
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url={`https://www.lunexomedia.com/case-study/${id}`}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 rounded-full px-10 py-8 font-black uppercase tracking-[0.4em] text-[10px] border border-primary/20 backdrop-blur-xl group">
              <Link to="/website-design" className="flex items-center gap-4">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-3 transition-transform" />
                Return to Architecture
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center max-w-7xl mx-auto">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                  <Trophy className="w-5 h-5 mr-4" />
                  {currentCase.category}
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-6xl sm:text-7xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
              >
                {currentCase.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="flex flex-wrap gap-12 text-2xl text-slate-500 font-medium"
              >
                <div className="flex items-center gap-4">
                  <Globe className="w-8 h-8 text-primary" />
                  <span>{currentCase.client}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <span>{currentCase.duration}</span>
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-3xl text-slate-500 leading-relaxed font-medium"
              >
                {currentCase.challenge}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="bg-white/40 border-2 border-white/60 p-12 rounded-[4rem] backdrop-blur-xl shadow-glass relative group"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-40" />
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">Results Architecture Sync</h3>
                <p className="text-4xl font-heading font-bold text-slate-900 leading-tight">{currentCase.results}</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-16 bg-primary/10 rounded-full blur-[140px] animate-pulse" />
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[5rem] shadow-glass overflow-hidden">
                <img 
                  src={currentCase.image} 
                  alt={currentCase.title}
                  className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-16 right-16 bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-xl font-bold shadow-2xl flex items-center gap-4 z-20">
                  <Activity className="w-8 h-8" />
                  Execution Verified
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <BarChart3 className="w-5 h-5 mr-4" />
                  Performance Telemetry
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              Measurable <span className="text-primary italic">Impact.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">
            {currentCase.metrics.map((metric, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px] flex flex-col items-center gap-10"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                  {metric.icon}
                </div>
                <div className="space-y-4">
                  <div className="text-6xl font-heading font-black text-slate-900 tracking-tighter">{metric.value}</div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{metric.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-20 lg:p-32 shadow-glass space-y-16 flex flex-col justify-between"
            >
              <div className="space-y-12">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all duration-700">
                    <Target className="w-12 h-12" />
                  </div>
                  <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight">The Challenge</h3>
                </div>
                <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                  {currentCase.challenge}
                </p>
              </div>
              <div className="pt-12 border-t border-white/60 opacity-20">
                 <Database className="w-10 h-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-20 lg:p-32 shadow-glass space-y-16 relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />
              <div className="space-y-12">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all duration-700">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight">The Architecture</h3>
                </div>
                <p className="text-2xl text-slate-500 leading-relaxed font-medium mb-10">
                  {currentCase.solution}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-6 text-slate-900 font-bold text-xl group/feat">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/feat:bg-primary group-hover/feat:border-primary transition-all duration-500">
                       <CheckCircle className="w-6 h-6 text-primary group-hover/feat:text-white" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="pt-12 border-t border-white/60 opacity-20">
                 <Cpu className="w-10 h-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-slate-900 p-24 lg:p-48 rounded-[5rem] text-center text-white relative overflow-hidden shadow-2xl max-w-7xl mx-auto group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-30 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10 space-y-20">
              <blockquote className="text-4xl lg:text-7xl font-heading italic leading-tight text-slate-200 tracking-tight max-w-5xl mx-auto">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="space-y-6">
                <div className="text-4xl font-heading font-bold text-white tracking-tight">{testimonial.author}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{testimonial.role} | {testimonial.company}</div>
              </div>
              
              <div className="flex items-center justify-center gap-12 opacity-30 text-white">
                 <Activity className="w-8 h-8" />
                 <ShieldCheck className="w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                The Absolute Trajectory
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready for <br /> <span className="text-primary italic">Absolute Results?</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Let's discuss how we can transform your business with high-end digital architecture and absolute scaling logic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact">
                  Start Execution
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/portfolio">
                  View Repository
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;