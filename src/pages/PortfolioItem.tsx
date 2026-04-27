import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar, TrendingUp, Award, Globe, Layers, Code, Zap, ArrowRight, Star, CheckCircle, Sparkles, Target, Clock, Shield, BookOpen, Users, BarChart3, Rocket, Play, ChevronRight, Database, Cpu, ShieldCheck, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DOMPurify from 'isomorphic-dompurify';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from "framer-motion";

// Structured Data Component for SEO
const PortfolioStructuredData = ({ project }: { project: any }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://www.lunexomedia.com/portfolio/${project.slug}`,
    "image": project.image_url || "https://www.lunexomedia.com/og-image-new.jpg",
    "dateCreated": project.created_at,
    "dateModified": project.updated_at,
    "creator": {
      "@type": "Organization",
      "name": "Lunexo Media",
      "url": "https://www.lunexomedia.com",
      "logo": "https://www.lunexomedia.com/logo.png"
    },
    "genre": project.category,
    "keywords": project.technologies?.join(", ") || project.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.lunexomedia.com/portfolio/${project.slug}`
    },
    "provider": {
      "@type": "Organization",
      "name": "Lunexo Media",
      "url": "https://www.lunexomedia.com"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.lunexomedia.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://www.lunexomedia.com/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://www.lunexomedia.com/portfolio/${project.slug}`
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

const PortfolioItem = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('slug', id)
        .eq('published', true)
        .maybeSingle();

      if (!error && data) {
        setProject(data);
        
        const { data: ogData } = await supabase
          .from('og_images')
          .select('image_url')
          .eq('page_path', `/portfolio/${id}`)
          .single();
        
        if (ogData?.image_url) {
          setOgImageUrl(ogData.image_url);
        }
        
        const { data: related } = await supabase
          .from('portfolio')
          .select('*')
          .eq('category', data.category)
          .eq('published', true)
          .neq('slug', id)
          .limit(3);
        
        if (related) setRelatedProjects(related);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Intelligence...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="relative min-h-[60vh] flex items-center justify-center">
          <div className="container-wide section-padding text-center relative z-10 space-y-12">
            <h1 className="text-6xl lg:text-9xl font-heading font-bold text-slate-900 leading-tight">Architecture <br /> <span className="text-primary italic">Not Found.</span></h1>
            <p className="text-2xl text-slate-500 font-medium max-w-2xl mx-auto">The digital architecture you're looking for doesn't exist in our absolute repository.</p>
            <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-16 py-10 text-xl font-bold shadow-2xl transition-all duration-500">
              <Link to="/portfolio">Return to Repository</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const seoImage = ogImageUrl || project.image_url || "https://www.lunexomedia.com/og-image-new.jpg";

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title={`${project.title} | Portfolio Case Study | LUNEXO MEDIA`}
        description={project.description}
        url={`https://www.lunexomedia.com/portfolio/${id}`}
        image={seoImage}
        keywords={`${project.category}, portfolio, case study, ${project.title}, ${project.technologies?.join(', ') || 'web design, digital marketing'}`}
      />
      <PortfolioStructuredData project={project} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container-wide section-padding relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 rounded-full px-10 py-8 font-black uppercase tracking-[0.4em] text-[10px] border border-primary/20 backdrop-blur-xl">
              <Link to="/portfolio" className="flex items-center gap-4">
                <ArrowLeft className="w-5 h-5" />
                Return to Repository
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                  <Layers className="w-5 h-5 mr-3" />
                  {project.category}
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl sm:text-7xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter"
              >
                {project.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl text-slate-500 leading-relaxed font-medium max-w-4xl"
              >
                {project.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10"
              >
                {[
                  { icon: TrendingUp, value: "200%", label: "Growth Delta" },
                  { icon: Clock, value: "4 Weeks", label: "Execution" },
                  { icon: Star, value: "5.0", label: "Client Rating" },
                  { icon: Target, value: "100%", label: "Success Rate" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-10 shadow-glass text-center group hover:bg-white/60 hover:translate-y-[-8px] transition-all duration-500">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-6 group-hover:scale-125 transition-transform duration-500" />
                    <div className="text-3xl font-heading font-black text-slate-900 mb-2">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-8 pt-12"
              >
                {project.project_url && (
                  <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl group transition-all duration-700">
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      <Globe className="w-8 h-8" />
                      Live Preview
                      <ExternalLink className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                    </a>
                  </Button>
                )}
                <Button asChild size="lg" variant="outline" className="border-2 border-primary/20 bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-700">
                  <Link to="/contact" className="flex items-center gap-4">
                    <Sparkles className="w-8 h-8" />
                    Start Similar Protocol
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-16 bg-primary/10 rounded-full blur-[140px] animate-pulse" />
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[5rem] shadow-glass group overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-auto rounded-[4rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute -bottom-10 -left-10 bg-primary text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-5 z-20">
                  <ShieldCheck className="w-6 h-6" />
                  Absolute Deployed
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-40 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {[
              { icon: Shield, title: "Absolute Security", desc: "Built with enterprise-grade encryption and security protocols for absolute stability." },
              { icon: Zap, title: "Sub-Second Velocity", desc: "Optimized architecture for instant rendering and maximum global retention." },
              { icon: Target, title: "Growth Centric", desc: "Designed specifically to achieve absolute business scaling and market dominance." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass hover:translate-y-[-10px] transition-all duration-700 h-full flex flex-col"
              >
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <item.icon className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-8 leading-tight">{item.title}</h3>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed flex-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-40 bg-background relative overflow-hidden">
          <div className="container-wide section-padding">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-24 lg:p-32 shadow-glass relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 mb-24">
                <div className="space-y-8 text-center lg:text-left">
                  <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tighter">Logic <span className="text-primary italic">Stack.</span></h2>
                  <p className="text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">The absolute technologies powering this digital architecture.</p>
                </div>
                <Badge className="bg-primary text-white border-none px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mx-auto lg:mx-0 shadow-2xl">
                  {project.technologies.length} Intelligence Components
                </Badge>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                {project.technologies.map((tech: string, index: number) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="px-12 py-8 bg-white/60 border border-white/80 rounded-[2rem] text-slate-900 font-black text-xl uppercase tracking-widest hover:text-primary hover:shadow-glass hover:scale-110 transition-all duration-500 cursor-default"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Project content */}
      {project.content && (
        <section className="py-40 relative overflow-hidden">
          <div className="container-wide section-padding">
            <div className="max-w-7xl mx-auto space-y-32">
              <div className="text-center space-y-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                    <BookOpen className="w-5 h-5 mr-3" />
                    Execution Intel
                  </Badge>
                </motion.div>
                <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
                  Architecture <span className="text-primary italic">Sync.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {[
                  { icon: Users, value: "50K+", label: "Reach Delta" },
                  { icon: BarChart3, value: "300%", label: "ROI Surge" },
                  { icon: Rocket, value: "2 Weeks", label: "Velocity" },
                  { icon: Star, value: "100%", label: "Loyalty" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center shadow-glass hover:translate-y-[-10px] transition-all duration-700"
                  >
                    <div className="w-20 h-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className="text-5xl font-heading font-black text-slate-900 mb-4">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-32 shadow-glass relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-60" />
                <div className="prose prose-2xl max-w-none prose-slate prose-headings:font-heading prose-headings:font-bold prose-h2:text-6xl prose-h2:mb-16 prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-medium prose-strong:text-slate-900 prose-img:rounded-[4rem] prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-16 prose-blockquote:rounded-[3rem] prose-a:text-primary prose-a:font-black prose-a:no-underline hover:prose-a:underline">
                  <div dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(project.content, {
                      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'img', 'blockquote', 'code', 'pre', 'br', 'hr'],
                      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                      ALLOW_DATA_ATTR: false
                    })
                  }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-40 bg-white/50 backdrop-blur-md border-y border-white/40 overflow-hidden">
          <div className="container-wide section-padding">
            <div className="text-center mb-32 space-y-12">
              <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
                Related <span className="text-primary italic">Sync.</span>
              </h2>
            </div>

            <div className="relative">
              <div className="flex gap-16 overflow-x-auto pb-16 no-scrollbar px-10 lg:px-24 -mx-10 lg:-mx-24">
                {relatedProjects.map((related, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 1 }}
                    className="flex-shrink-0 w-[400px] lg:w-[600px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden shadow-glass group hover:translate-y-[-15px] transition-all duration-1000 h-full flex flex-col"
                  >
                    <Link to={`/portfolio/${related.slug}`} className="block flex-1 flex flex-col">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={related.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} 
                          alt={related.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 hover:scale-125 transition-transform duration-500">
                            <Play className="w-10 h-10 text-white ml-2" />
                          </div>
                        </div>
                      </div>
                      <div className="p-16 lg:p-20 space-y-10 flex-1 flex flex-col">
                        <Badge className="bg-primary/10 text-primary border-none rounded-full px-8 py-3 font-black uppercase tracking-[0.4em] text-[10px] w-fit">{related.category}</Badge>
                        <h3 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight flex-1">{related.title}</h3>
                        <Button variant="link" className="text-primary font-black uppercase tracking-[0.4em] text-[10px] p-0 group-hover:translate-x-6 transition-transform w-fit">
                          Inspect Intel <ArrowRight className="w-6 h-6 ml-4" />
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center mt-32">
              <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group">
                <Link to="/portfolio" className="flex items-center gap-6">
                  View All Repository
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Absolute Transformation Protocol
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <span className="text-primary italic">Transform?</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Get a digital architecture designed for absolute results. Let's discuss your scaling trajectory today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group" asChild>
                <Link to="/contact">
                  Start Execution
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
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

export default PortfolioItem;