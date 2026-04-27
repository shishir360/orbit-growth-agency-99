import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Calendar, 
  Users, 
  Trophy,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  Globe,
  Award,
  Zap,
  BarChart3,
  Layers,
  Eye,
  Play,
  ChevronRight,
  Database,
  Cpu,
  ShieldCheck,
  Activity,
  Brain
} from "lucide-react";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    document.title = "The Repository | Absolute Case Studies | Lunexo Media";
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoadingDb(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('published', true)
        .eq('blocked', false)
        .order('created_at', { ascending: false })
        .limit(12);
      if (error) {
        console.error('Error loading portfolio:', error);
      } else {
        setDbProjects(data || []);
      }
      setLoadingDb(false);
    };
    load();
  }, []);

  const categories = ["All", "Website Design", "Ads Management", "AI Automation"];
  
  const allProjects = dbProjects.map(p => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    image: p.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: p.category,
    technologies: p.technologies || [],
    timeline: "Architecture Protocol",
    results: "Absolute Velocity",
    featured: p.featured,
    liveUrl: p.project_url
  }));
  
  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);
    
  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Repository | Award-Winning Case Studies | Lunexo Media"
        description="See how Lunexo Media helped businesses achieve real growth. Browse our absolute repository of case studies showcasing SEO, ads, and web design excellence."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/portfolio"
        keywords="portfolio, case studies, web design portfolio, digital marketing results, client success stories"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Database className="w-5 h-5 mr-3" />
                The Absolute Repository
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter"
            >
              Work of <br /> <span className="text-primary italic">Absolute Excellence.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl lg:text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Digital architectures that have redefined market dominance and generated <span className="text-primary italic font-bold">absolute velocity</span> for our global partners.
            </motion.p>
            
            {/* Category Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-8 justify-center pt-12"
            >
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-16 py-10 text-2xl font-bold transition-all duration-500 hover:scale-110 shadow-glass ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white"
                      : "bg-white/40 backdrop-blur-xl border-2 border-white/60 text-slate-500 hover:bg-white/60 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Intelligence Grid */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
            {loadingDb ? (
              <>
                <Skeleton className="h-[800px] rounded-[5rem] bg-white/40" />
                <Skeleton className="h-[800px] rounded-[5rem] bg-white/40" />
              </>
            ) : (
              <AnimatePresence mode="wait">
                {featuredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden hover:shadow-glass transition-all duration-1000 flex flex-col h-full hover:translate-y-[-15px]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700" />
                      
                      <div className="absolute top-10 left-10">
                        <Badge className="bg-primary text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl">
                          <Trophy className="w-5 h-5 mr-4" />
                          Featured Intelligence
                        </Badge>
                      </div>

                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="absolute top-10 right-10 w-20 h-20 bg-white/90 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-slate-900 shadow-2xl hover:bg-primary hover:text-white transition-all duration-700 hover:scale-125"
                        >
                          <Globe className="w-8 h-8" />
                        </a>
                      )}
                    </div>
                    
                    <div className="p-16 lg:p-24 space-y-16 flex-1 flex flex-col">
                      <div className="space-y-8 text-center lg:text-left">
                        <Badge variant="outline" className="text-primary border-primary/30 font-black uppercase tracking-[0.4em] px-10 py-4 rounded-full text-[10px]">
                          {project.category}
                        </Badge>
                        <h3 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tighter">
                          {project.title}
                        </h3>
                        <p className="text-2xl text-slate-500 font-medium leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-16 pt-8">
                        <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Protocol Sync</span>
                          <div className="flex items-center gap-5 text-slate-900 font-bold text-2xl">
                            <Layers className="w-8 h-8 text-primary" />
                            {project.timeline}
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Absolute Telemetry</span>
                          <div className="flex items-center gap-5 text-primary font-bold text-2xl">
                            <TrendingUp className="w-8 h-8" />
                            {project.results}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-8">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span key={techIndex} className="px-10 py-5 bg-white/60 border border-white/60 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-16 mt-auto">
                        <Button className="w-full py-14 rounded-[3rem] font-bold text-3xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-700 group/btn shadow-2xl" asChild>
                          <Link to={`/portfolio/${project.id}`}>
                            Access Intel
                            <ArrowRight className="w-10 h-10 ml-8 group-hover/btn:translate-x-5 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Node Library (Regular Projects) */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Database className="w-6 h-6 mr-4" />
                Additional Innovations
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-tight tracking-tighter">
              Node <span className="text-primary italic">Library.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {loadingDb ? (
              <>
                <Skeleton className="h-[600px] rounded-[4rem] bg-white/40" />
                <Skeleton className="h-[600px] rounded-[4rem] bg-white/40" />
                <Skeleton className="h-[600px] rounded-[4rem] bg-white/40" />
              </>
            ) : regularProjects.length === 0 ? (
              <div className="col-span-full text-center py-56 space-y-16">
                <div className="w-32 h-32 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] flex items-center justify-center mx-auto shadow-glass">
                  <Database className="w-16 h-16 text-slate-400" />
                </div>
                <p className="text-4xl text-slate-400 font-heading font-bold italic">No additional nodes found in this sector trajectory.</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {regularProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 flex flex-col h-full hover:translate-y-[-12px]"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700" />
                      <div className="absolute top-8 left-8">
                        <Badge className="bg-white/90 text-primary px-8 py-3 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-sm">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-16 space-y-12 flex-1 flex flex-col">
                      <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-2xl text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="pt-12 mt-auto border-t border-white/60 flex justify-between items-center">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">{project.results}</span>
                        <Button variant="ghost" className="p-0 text-slate-900 font-black uppercase tracking-[0.4em] text-[10px] hover:text-primary hover:bg-transparent transition-all group-hover:translate-x-5" asChild>
                          <Link to={`/portfolio/${project.id}`}>
                            Access <ChevronRight className="w-6 h-6 ml-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Final Gateway */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Next Evolution Protocol
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Architect Your <br /> <span className="text-primary italic">Absolute Legacy.</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Let's architect the next award-winning digital architecture that transforms your business reality and defines absolute market dominance.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group" asChild>
                <Link to="/contact">
                  Start Project
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/pricing">Explore Investment Plans</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;