import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import TrustedBy from "@/components/ui/trusted-by";
import CompletedClients from "@/components/ui/completed-clients";
import ClientFeedbackCarousel from "@/components/ui/client-feedback-carousel";
import TemplatesCarousel from "@/components/ui/templates-carousel";
import VideoReviewsCarousel from "@/components/ui/video-reviews-carousel";
import SEO from "@/components/ui/seo";
import { useContent } from "@/contexts/ContentContext";
import { 
  Globe, 
  Target, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Check, 
  Star, 
  Users, 
  Award, 
  TrendingUp, 
  Play, 
  ChevronRight, 
  Clock, 
  Shield, 
  Rocket, 
  MousePointer, 
  BarChart3, 
  Layers, 
  Heart, 
  HelpCircle,
  Brain,
  Cpu,
  Monitor,
  Layout,
  PieChart,
  Activity,
  ShieldCheck,
  Database
} from "lucide-react";
import FAQSchema from "@/components/ui/faq-schema";
import { useEffect, useState, useMemo } from "react";
import heroDashboard from "@/assets/hero-dashboard-optimized.webp";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TypeWriter, TypeWriterMultiLine } from "@/components/ui/typewriter";

const Index = () => {
  const { content } = useContent();
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase
        .from('portfolio')
        .select('id, title, description, category, image_url, slug')
        .eq('published', true)
        .eq('blocked', false)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (data) {
        setPortfolioProjects(data);
        const imagePromises = data.filter(p => p.image_url).map(p => new Promise<void>(resolve => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = p.image_url;
        }));
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      }
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (portfolioProjects.length === 0 || !imagesLoaded) return;
    const interval = setInterval(() => {
      setCurrentProjectIndex(prev => (prev + 1) % portfolioProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [portfolioProjects.length, imagesLoaded]);

  const visibleTestimonials = useMemo(() => 
    content.testimonials.filter(testimonial => testimonial.visible).sort((a, b) => a.order - b.order),
    [content.testimonials]
  );

  return (
    <div className="min-h-screen bg-background text-slate-900 overflow-hidden font-body">
      <SEO 
        title="Lunexo Media | Digital Marketing Agency – SEO, Web Design & AI Automation" 
        description="Lunexo Media is a full-service digital marketing agency specializing in SEO, Google Ads, Facebook Ads, custom website design, and AI automation. We help businesses grow faster with data-driven strategies." 
        image="https://www.lunexomedia.com/og-image-new.jpg" 
        url="https://www.lunexomedia.com" 
        keywords="digital marketing agency, SEO services, Google Ads management, Facebook Ads, web design agency, AI automation, business growth, Lunexo Media, website development, PPC management" 
        structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Lunexo Media",
          "alternateName": "Lunexomedia",
          "url": "https://www.lunexomedia.com",
          "logo": "https://www.lunexomedia.com/logo.png",
          "description": "Lunexo Media is a full-service digital marketing agency helping businesses launch faster and grow smarter through SEO, paid advertising, custom web design, and AI-powered automation solutions.",
          "foundingDate": "2023",
          "foundingLocation": {
            "@type": "Place",
            "name": "Bangladesh"
          },
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 5,
            "maxValue": 15
          },
          "sameAs": [
            "https://www.facebook.com/lunexomedia",
            "https://www.linkedin.com/company/lunexomedia",
            "https://www.instagram.com/lunexomedia"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "telephone": "+1-702-483-0749",
            "email": "hello@lunexomedia.com",
            "url": "https://www.lunexomedia.com/contact",
            "areaServed": "Worldwide",
            "availableLanguage": "English"
          },
          "knowsAbout": ["Search Engine Optimization", "Google Ads", "Facebook Ads", "Web Design", "AI Automation", "Digital Marketing", "Conversion Rate Optimization", "Content Marketing"]
        }
      ]} />
      
      <Navigation />
      
      {/* Absolute Liquid Glass Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        {/* Background Accents */}
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
                <Sparkles className="w-5 h-5 mr-3" />
                The Absolute Intelligence Platform
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Architecting a Smarter <br /> <span className="text-primary italic">Digital Reality.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Experience the absolute repository of <span className="text-primary italic font-bold">digital architectures</span> engineered for high-velocity growth and absolute market dominance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center pt-8"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                <Link to="/contact">
                  Begin Building
                  <ArrowRight className="w-8 h-8 ml-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-2xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                <Link to="/portfolio">Explore Repository</Link>
              </Button>
            </motion.div>

            {/* Premium Visual Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative mt-32 max-w-6xl mx-auto"
            >
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-6 lg:p-12 shadow-glass overflow-hidden">
                <img 
                  src={heroDashboard} 
                  alt="Absolute Architecture Preview" 
                  className="w-full h-auto rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              {/* Absolute Logic Nodes (Floating) */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 -left-16 hidden lg:block"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3.5rem] p-12 shadow-glass space-y-8 w-96">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Velocity Telemetry</div>
                      <div className="text-3xl font-black text-slate-900 tracking-tighter">+264%</div>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 w-full" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Node Sync Protocol</span>
                      <span className="text-emerald-500">Active</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 1.5, duration: 2 }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-16 -right-16 hidden lg:block"
              >
                <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[3.5rem] p-12 shadow-2xl space-y-8 w-96 text-white">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                      <Globe className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Reach Node</div>
                      <div className="text-3xl font-black tracking-tighter">Absolute.</div>
                    </div>
                  </div>
                  <div className="flex -space-x-5">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black uppercase">
                        U{i}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-primary flex items-center justify-center text-[10px] font-black text-white">
                      +50
                    </div>
                  </div>
                </div>
              </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* Trusted By Logic */}
      <TrustedBy />

      {/* The Spectrum of Velocity (Services) */}
      <section className="py-32 relative overflow-hidden bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Layers className="w-5 h-5 mr-3" />
                The Spectrum of Velocity
              </Badge>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Absolute <span className="text-primary italic">Business Logic.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium">
              Three core pillars engineered to accelerate your digital trajectory and redefine absolute market dominance.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                icon: Monitor,
                title: "Digital Architecture",
                description: "Stunning, conversion-locked architectures engineered for absolute performance and SEO dominance.",
                features: ["Custom Logic", "Velocity Optimized", "Mobile Responsive", "Global Nodes"],
                href: "/website-design"
              },
              {
                icon: Target,
                title: "Growth Orchestration",
                description: "Data-driven campaign logic nodes across global platforms that maximize ROI and awareness velocity.",
                features: ["Multi-Spectrum", "ROI Telemetry", "Advanced Targeting", "Absolute Analytics"],
                href: "/ads-management"
              },
              {
                icon: Brain,
                title: "Intelligence Logic",
                description: "Absolute automation architectures and AI logic nodes that streamline operations and reduce friction.",
                features: ["Custom AI Nodes", "Workflow Logic", "Intelligent Bots", "Node Integration"],
                href: "/ai-automation"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group relative"
              >
                <div className="relative bg-white/40 border border-white/60 rounded-[4rem] p-16 lg:p-20 hover:shadow-glass transition-all duration-1000 h-full backdrop-blur-xl flex flex-col">
                  <div className="w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center border border-primary/10 mb-12 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    <service.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-4xl font-heading font-bold text-slate-900 mb-8">{service.title}</h3>
                  <p className="text-2xl text-slate-500 mb-12 leading-relaxed font-medium">{service.description}</p>
                  <ul className="space-y-8 mb-16 flex-1">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-5 text-slate-600 font-bold text-sm">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        <span className="uppercase tracking-widest">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" asChild className="p-0 h-auto font-black uppercase tracking-[0.4em] text-[10px] text-primary hover:bg-transparent hover:translate-x-4 transition-all duration-500">
                    <Link to={service.href} className="flex items-center gap-5">
                      Explore Intelligence <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Nodes */}
      <CompletedClients />
      <ClientFeedbackCarousel />
      <TemplatesCarousel />
      <VideoReviewsCarousel showOnHomepage />

      {/* Success Telemetry (Stats) */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              { value: "200%", label: "Avg Growth Telemetry", icon: TrendingUp, details: ["Revenue Velocity", "Traffic Intensity"] },
              { value: "50+", label: "Active Operational Nodes", icon: Users, details: ["Global Partners", "Market Dominance"] },
              { value: "10x", label: "ROI Spectrum Velocity", icon: PieChart, details: ["Data Driven Logic", "Optimized Trajectory"] },
              { value: "24/7", label: "Protocol Sync Support", icon: Clock, details: ["Always Operational", "Instant Node Sync"] }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3.5rem] p-12 lg:p-16 shadow-glass space-y-10 hover:translate-y-[-10px] transition-all duration-500"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center border border-primary/10 shadow-sm">
                  <stat.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <div className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</div>
                </div>
                <ul className="space-y-4 pt-8 border-t border-slate-100">
                  {stat.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="uppercase tracking-widest">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: The Absolute Launch Protocol */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Initialize Protocol
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Ready to Architect <br /> <span className="text-primary italic">Your Legacy?</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join our absolute repository of innovative leaders leveraging intelligence and premium design to drive absolute velocity.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-10 justify-center pt-12">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-2xl px-24 py-14 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-4 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-2xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/portfolio">View Repository</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;