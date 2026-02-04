import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import TrustedBy from "@/components/ui/trusted-by";
import CompletedClients from "@/components/ui/completed-clients";
import ClientFeedbackCarousel from "@/components/ui/client-feedback-carousel";
import TemplatesCarousel from "@/components/ui/templates-carousel";
import ChatVoiceWidget from "@/components/ui/chat-voice-widget";
import SEO from "@/components/ui/seo";
import { useContent } from "@/contexts/ContentContext";
import { Globe, Target, Bot, Sparkles, ArrowRight, Zap, Check, Star, Users, Award, TrendingUp, Play, ChevronRight, Clock, Shield, Rocket, MousePointer, BarChart3, Layers, Heart } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import heroDashboard from "@/assets/hero-dashboard-optimized.webp";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import { TypeWriter, TypeWriterMultiLine } from "@/components/ui/typewriter";
const Index = () => {
  const {
    content
  } = useContent();
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  useEffect(() => {
    const fetchPortfolio = async () => {
      const {
        data
      } = await supabase.from('portfolio').select('id, title, description, category, image_url, slug').eq('published', true).eq('blocked', false).order('created_at', {
        ascending: false
      }).limit(6);
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
  const visibleTestimonials = useMemo(() => content.testimonials.filter(testimonial => testimonial.visible).sort((a, b) => a.order - b.order), [content.testimonials]);
  return <div className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden">
      <SEO title="Lunexo Media | Digital Marketing & Growth Solutions" description="Lunexo Media helps businesses grow with SEO, paid ads, web design, and AI automation. Get data-driven strategies to scale your brand." image="https://www.lunexomedia.com/og-image-new.jpg" url="https://www.lunexomedia.com" keywords="digital marketing, SEO services, Google ads, web design, AI automation, business growth, Lunexo Media" />
      
      <Navigation />
      
      {/* Ultra Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#0d0d0d]" />
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30" style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(62, 207, 142, 0.12), transparent 40%)`
      }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating orbs */}
        <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#3ECF8E]/10 to-[#34B27B]/10 rounded-full blur-3xl" animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#3ECF8E]/8 to-[#2E9B6B]/8 rounded-full blur-3xl" animate={{
        x: [0, -40, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        <div className="container-wide section-padding relative z-10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Premium badge with glow */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-[0_0_30px_rgba(62,207,142,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text">Trusted by 50+ businesses worldwide</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>
              
              {/* Main headline with gradient */}
              <motion.h1 initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.95] tracking-tight mb-8" style={{
              fontFamily: "'Playfair Display', serif"
            }}>
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  <TypeWriter text="We Build" delay={80} />
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#3ECF8E] via-[#34B27B] to-[#2E9B6B] bg-clip-text text-transparent">
                  <TypeWriter text="Digital Empires" delay={80} />
                </span>
              </motion.h1>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.4
            }} className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 font-light">
                Premium website design, performance ads & AI automation — 
                <span className="text-white/90"> crafted for brands that demand excellence.</span>
              </motion.p>
              
              {/* CTAs with glassmorphism */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.5
            }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button asChild size="lg" className="group relative text-base px-10 py-7 bg-[#3ECF8E] text-[#1c1c1c] hover:bg-[#34B27B] rounded-full transition-all duration-500 hover:scale-105 font-semibold shadow-[0_0_40px_rgba(62,207,142,0.4)] hover:shadow-[0_0_60px_rgba(62,207,142,0.6)]">
                  <a href="https://lunexomedia.com/contact" className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full transition-all duration-300">
                  <a href="https://lunexomedia.com/portfolio" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    View Our Work
                  </a>
                </Button>
              </motion.div>
              
              {/* Stats with glow effects */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6
            }} className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 pt-8 border-t border-white/10">
                {[{
                value: "200%",
                label: "Avg. Growth",
                icon: TrendingUp,
                color: "from-emerald-400 to-green-500"
              }, {
                value: "50+",
                label: "Happy Clients",
                icon: Users,
                color: "from-violet-400 to-indigo-500"
              }, {
                value: "10x",
                label: "ROI Achieved",
                icon: BarChart3,
                color: "from-amber-400 to-orange-500"
              }].map((stat, i) => <motion.div key={i} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.5,
                delay: 0.7 + i * 0.1
              }} className="text-center group">
                    <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-wider flex items-center justify-center gap-2">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                  </motion.div>)}
              </motion.div>
            </div>

            {/* Video Section */}
            <motion.div initial={{
            opacity: 0,
            x: 50,
            scale: 0.95
          }} animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="relative">
              <div className="relative bg-white/5 backdrop-blur-xl p-3 rounded-3xl border border-white/10 shadow-2xl shadow-violet-500/10">
                <YouTubeFacade videoId="jQJqW8JAWWU" title="YouTube video player" width="100%" height="315" autoplay={true} loop={true} mute={false} loading="eager" className="relative w-full aspect-video rounded-2xl shadow-lg" />
              </div>
              
              {/* Floating badges */}
              <motion.div animate={{
              y: [0, -8, 0]
            }} transition={{
              duration: 3,
              repeat: Infinity
            }} className="absolute -bottom-4 -left-4 bg-[#3ECF8E] text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Live Results
              </motion.div>
              
              <motion.div animate={{
              y: [0, -6, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1
            }} className="absolute -top-4 -right-4 bg-[#3ECF8E] text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2">
                <Award className="w-4 h-4" />
                Premium Quality
              </motion.div>
            </motion.div>
          </div>

          {/* Service Pills with hover effects */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="flex flex-wrap justify-center gap-5 mt-20 lg:mt-28">
            {[{
            icon: Globe,
            label: "Web Design",
            gradient: "from-emerald-500 to-green-600",
            href: "https://lunexomedia.com/website-design"
          }, {
            icon: Target,
            label: "Paid Ads",
            gradient: "from-blue-500 to-cyan-600",
            href: "https://lunexomedia.com/ads-management"
          }, {
            icon: Bot,
            label: "AI Automation",
            gradient: "from-violet-500 to-purple-600",
            href: "https://lunexomedia.com/ai-automation"
          }, {
            icon: Sparkles,
            label: "Strategy",
            gradient: "from-amber-500 to-orange-600",
            href: "https://lunexomedia.com/contact"
          }].map((service, i) => <motion.div key={i} whileHover={{
            scale: 1.05,
            y: -5
          }} whileTap={{
            scale: 0.98
          }}>
                <a href={service.href} className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl px-7 py-5 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg text-white font-semibold tracking-tight">
                    {service.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </motion.div>)}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5
      }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div animate={{
            opacity: [1, 0, 1],
            y: [0, 8, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Client Feedback Screenshots - Auto Scroll */}
      <ClientFeedbackCarousel />

      {/* Website Templates Carousel */}
      <TemplatesCarousel />

      {/* Services Section - Ultra Modern */}
      <section className="py-36 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3ECF8E]/20 to-[#34B27B]/20 backdrop-blur-xl border border-[#3ECF8E]/30 text-[#3ECF8E] px-6 py-3 rounded-full text-sm font-semibold mb-10">
              <Layers className="w-5 h-5" />
              What We Do
              <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse"></span>
            </motion.div>
            
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-5xl lg:text-7xl font-bold mb-8" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Services That{" "}
              </span>
              <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">
                Scale
              </span>
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-xl lg:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
              Three core pillars designed to transform your digital presence
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[{
            icon: Globe,
            title: "Website Design",
            description: "Stunning, SEO-optimized websites that convert visitors into customers.",
            features: ["Custom Design", "SEO Optimization", "Mobile Responsive", "Fast Loading"],
            href: "https://lunexomedia.com/website-design"
          }, {
            icon: Target,
            title: "Ads Management",
            description: "Data-driven campaigns on Google, Facebook & TikTok that maximize ROI.",
            features: ["Multi-Platform", "ROI Focused", "Advanced Targeting", "Analytics"],
            href: "https://lunexomedia.com/ads-management"
          }, {
            icon: Bot,
            title: "AI Automation",
            description: "Intelligent automation and chatbots that streamline your operations.",
            features: ["Custom AI Solutions", "Workflow Automation", "Chatbots", "Integration"],
            href: "https://lunexomedia.com/ai-automation"
          }].map((service, i) => <motion.div key={i} className="group relative" initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-100px"
          }} transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }} whileHover={{
            y: -4
          }}>
                <div className="relative bg-[#161616] border border-[#262626] rounded-lg p-8 hover:border-[#333333] transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-[#3ECF8E]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-[#888888] mb-6 leading-relaxed text-sm">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, j) => <li key={j} className="flex items-center gap-3 text-[#888888] text-sm">
                        <Check className="w-4 h-4 text-[#3ECF8E]" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                  <a href={service.href} className="inline-flex items-center gap-2 text-[#3ECF8E] text-sm font-medium hover:underline transition-all">
                    View Template <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section - Auto-scrolling Carousel */}
      {portfolioProjects.length > 0 && imagesLoaded && <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
          
          <div className="relative z-10">
            <div className="container-wide section-padding">
              <div className="text-center mb-16">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3ECF8E]/20 to-[#34B27B]/20 backdrop-blur-xl border border-[#3ECF8E]/30 text-[#3ECF8E] px-6 py-3 rounded-full text-sm font-semibold mb-10">
                  <Award className="w-5 h-5" />
                  Our Portfolio
                  <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse"></span>
                </motion.div>
                
                <motion.h2 initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="text-5xl lg:text-7xl font-bold mb-8" style={{
              fontFamily: "'Playfair Display', serif"
            }}>
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Success </span>
                  <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">Stories</span>
                </motion.h2>
                
                <motion.p initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="text-xl lg:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
                  Discover how we've transformed businesses with stunning digital solutions
                </motion.p>
              </div>
            </div>

            {/* Auto-scrolling Portfolio Carousel */}
            <div className="relative w-full overflow-hidden group">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
              
              {/* Scrolling container */}
              <motion.div 
                className="flex gap-6 py-4"
                animate={{
                  x: [0, -((portfolioProjects.length * 340) + (portfolioProjects.length * 24))]
                }}
                transition={{
                  x: {
                    duration: portfolioProjects.length * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{ width: 'fit-content' }}
              >
                {/* First set of projects */}
                {portfolioProjects.map((project, index) => (
                  <motion.a
                    key={`first-${project.id}`}
                    href={`https://lunexomedia.com/portfolio/${project.slug}`}
                    className="relative flex-shrink-0 w-[320px] group/card cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card with gradient border */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
                      <div className="rounded-2xl overflow-hidden bg-[#1a1a1a]">
                        {/* Image container */}
                        <div className="relative h-[220px] overflow-hidden">
                          {project.image_url ? (
                            <img 
                              src={project.image_url} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#3ECF8E]/20 to-[#1c1c1c]/50" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
                          
                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1.5 bg-[#3ECF8E]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-[#0d0d0d] font-semibold">
                              {project.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover/card:text-[#3ECF8E] transition-colors">
                            {project.title?.split('—')[0]}
                          </h3>
                          <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* View Project link */}
                          <div className="mt-4 flex items-center gap-2 text-[#3ECF8E] text-sm font-medium opacity-0 group-hover/card:opacity-100 transition-opacity">
                            View Project <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {portfolioProjects.map((project, index) => (
                  <motion.a
                    key={`second-${project.id}`}
                    href={`https://lunexomedia.com/portfolio/${project.slug}`}
                    className="relative flex-shrink-0 w-[320px] group/card cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card with gradient border */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
                      <div className="rounded-2xl overflow-hidden bg-[#1a1a1a]">
                        {/* Image container */}
                        <div className="relative h-[220px] overflow-hidden">
                          {project.image_url ? (
                            <img 
                              src={project.image_url} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#3ECF8E]/20 to-[#1c1c1c]/50" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
                          
                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1.5 bg-[#3ECF8E]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-[#0d0d0d] font-semibold">
                              {project.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover/card:text-[#3ECF8E] transition-colors">
                            {project.title?.split('—')[0]}
                          </h3>
                          <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* View Project link */}
                          <div className="mt-4 flex items-center gap-2 text-[#3ECF8E] text-sm font-medium opacity-0 group-hover/card:opacity-100 transition-opacity">
                            View Project <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Button asChild className="bg-[#C5FF4A] text-[#0d0d0d] hover:bg-[#b8f03d] rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-[#C5FF4A]/20">
                <a href="https://lunexomedia.com/portfolio">
                  View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>}

      {/* Stats Section - Supabase Style */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d0d]" />
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{
            value: "200%",
            label: "Avg Growth",
            icon: TrendingUp,
            features: ["Revenue boost", "Traffic increase"]
          }, {
            value: "50+",
            label: "Happy Clients",
            icon: Users,
            features: ["Global reach", "B2B & B2C"]
          }, {
            value: "10x",
            label: "ROI Achieved",
            icon: Award,
            features: ["Data-driven", "Optimized spend"]
          }, {
            value: "24/7",
            label: "Support",
            icon: Clock,
            features: ["Always available", "Quick response"]
          }].map((stat, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} whileHover={{ y: -4 }} className="group relative bg-[#161616] border border-[#262626] rounded-lg p-6 hover:border-[#333333] transition-all duration-300">
                {/* Icon container */}
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] flex items-center justify-center mb-5">
                  <stat.icon className="w-5 h-5 text-[#3ECF8E]" />
                </div>
                
                {/* Value */}
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-[#888888] text-sm mb-4">{stat.label}</div>
                
                {/* Feature list */}
                <ul className="space-y-2">
                  {stat.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-[#888888] text-xs">
                      <Check className="w-3.5 h-3.5 text-[#3ECF8E]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]" />
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3ECF8E]/20 to-[#34B27B]/20 backdrop-blur-xl border border-[#3ECF8E]/30 text-[#3ECF8E] px-6 py-3 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Why Lunexo Media
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold" style={{
              fontFamily: "'Playfair Display', serif"
            }}>
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  <TypeWriter text="Built for " delay={60} />
                </span>
                <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">
                  <TypeWriter text="Success" delay={60} />
                </span>
              </h2>
              
              <p className="text-lg text-white/50 leading-relaxed">
                We don't just build websites or run ads. We create comprehensive digital strategies that drive real business growth.
              </p>
              
              <div className="space-y-4">
                {[{
                title: "30-Day Launch",
                desc: "From concept to live in 30 days",
                icon: Rocket
              }, {
                title: "Results Focused",
                desc: "Every decision driven by data",
                icon: BarChart3
              }, {
                title: "Full Support",
                desc: "24/7 support and maintenance",
                icon: Heart
              }].map((item, i) => <motion.div key={i} initial={{
                opacity: 0,
                x: -30
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: i * 0.1
              }} className="flex items-start gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-[#3ECF8E]/30 hover:bg-[#3ECF8E]/5 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#34B27B] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-white/40 text-sm">{item.desc}</div>
                    </div>
                  </motion.div>)}
              </div>
              
              <Button asChild size="lg" className="bg-[#3ECF8E] text-[#1c1c1c] hover:bg-[#34B27B] rounded-full px-8 shadow-lg font-semibold">
                <a href="https://lunexomedia.com/contact">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="relative">
              <div className="relative bg-white/5 backdrop-blur-xl p-3 rounded-3xl border border-white/10 shadow-2xl">
                <img src={heroDashboard} alt="Dashboard Preview" className="w-full h-auto rounded-2xl" loading="lazy" />
              </div>
              
              {/* Floating elements */}
              <motion.div animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 3,
              repeat: Infinity
            }} className="absolute -top-6 -right-6 bg-[#3ECF8E] text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                +200% Growth
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Infinite Scroll Animation */}
      {visibleTestimonials.length > 0 && <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
          
          {/* Gradient line top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/30 to-transparent"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3ECF8E]/20 to-[#34B27B]/20 backdrop-blur-xl border border-[#3ECF8E]/30 text-[#3ECF8E] px-6 py-3 rounded-full text-sm font-medium mb-8">
                <Star className="w-4 h-4 text-[#3ECF8E]" />
                Client Reviews
              </motion.div>
              
              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-4xl lg:text-6xl font-bold mb-6" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  <TypeWriter text="What Clients " delay={60} />
                </span>
                <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">
                  <TypeWriter text="Say" delay={60} />
                </span>
              </motion.h2>
            </div>
            
            {/* Infinite Scroll Testimonials */}
            <div className="relative overflow-hidden">
              {/* Gradient masks for smooth fade */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10"></div>
              
              <motion.div className="flex gap-8" animate={{
            x: [0, -400 * visibleTestimonials.length]
          }} transition={{
            x: {
              duration: visibleTestimonials.length * 8,
              repeat: Infinity,
              ease: "linear"
            }
          }}>
                {/* Duplicate testimonials for infinite effect */}
                {[...visibleTestimonials, ...visibleTestimonials, ...visibleTestimonials].map((testimonial, i) => <motion.div key={`${testimonial.author}-${i}`} className="group relative flex-shrink-0 w-[380px]" whileHover={{
              scale: 1.02,
              y: -5
            }} transition={{
              duration: 0.3
            }}>
                    {/* Floating animation */}
                    <motion.div animate={{
                y: [0, -6, 0]
              }} transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}>
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#3ECF8E]/20 to-[#34B27B]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                      
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group-hover:border-[#3ECF8E]/30 group-hover:bg-white/[0.08] transition-all duration-500 h-full">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-[#3ECF8E] fill-[#3ECF8E]" />)}
                        </div>
                        <p className="text-white/60 leading-relaxed mb-6 line-clamp-4">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4">
                          {testimonial.image && <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border-2 border-[#3ECF8E]/30" />}
                          <div>
                            <div className="font-semibold text-white">{testimonial.author}</div>
                            <div className="text-white/40 text-sm">{testimonial.role}, {testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>)}
              </motion.div>
            </div>
            
            {/* Animated dots indicator */}
            <div className="flex justify-center items-center gap-2 mt-12">
              {[...Array(4)].map((_, i) => <motion.div key={i} className={`rounded-full ${i === 0 ? 'w-8 h-1.5 bg-[#3ECF8E]' : 'w-1.5 h-1.5 bg-white/20'}`} animate={{
            scale: i === 0 ? [1, 1.1, 1] : 1
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />)}
            </div>
          </div>
          
          {/* Gradient line bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/30 to-transparent"></div>
        </section>}

      {/* CTA Section - Premium Full Screen */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#0d0d0d]" />
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(62,207,142,0.08),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(52,178,123,0.06),transparent_50%)]" />
          <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(62,207,142,0.04),transparent_50%)]" />
        </div>
        
        {/* Premium grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Floating orbs with glow */}
        <motion.div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-[#3ECF8E]/10 rounded-full blur-[120px]" animate={{
        x: [0, 80, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-[#34B27B]/10 rounded-full blur-[100px]" animate={{
        x: [0, -60, 0],
        y: [0, -40, 0],
        scale: [1, 1.15, 1]
      }} transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3ECF8E]/5 rounded-full blur-[150px]" animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        {/* Sparkle particles */}
        {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-white/40 rounded-full" style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`
      }} animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }} transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 3
      }} />)}
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium badge */}
            <motion.div initial={{
            opacity: 0,
            y: 30,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3ECF8E]/20 to-[#34B27B]/20 backdrop-blur-2xl border border-[#3ECF8E]/30 text-[#3ECF8E] px-7 py-3.5 rounded-full text-sm font-semibold mb-12 shadow-[0_0_40px_rgba(62,207,142,0.15)]">
              <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Ready to Transform?
              <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse"></span>
            </motion.div>
            
            {/* Main heading with TypeWriter */}
            <motion.h2 initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
              <span className="text-white block mb-4">
                <TypeWriter text="Let's Build Your" delay={50} />
              </span>
              <span className="bg-gradient-to-r from-[#3ECF8E] via-[#34B27B] to-[#2E9B6B] bg-clip-text text-transparent">
                <TypeWriter text="Digital Empire" delay={50} />
              </span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="text-xl lg:text-2xl text-white/50 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
              Ready to transform your business? Let's discuss your project and create a strategy for success.
            </motion.p>
            
            {/* Premium buttons */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }} className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="group relative text-lg px-12 py-8 bg-[#3ECF8E] hover:bg-[#34B27B] text-[#1c1c1c] rounded-full transition-all duration-500 hover:scale-105 font-semibold shadow-[0_0_50px_rgba(62,207,142,0.4)] hover:shadow-[0_0_80px_rgba(62,207,142,0.6)] overflow-hidden">
                <a href="https://lunexomedia.com/contact" className="flex items-center gap-3">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <Rocket className="w-6 h-6" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-lg px-12 py-8 border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 rounded-full transition-all duration-500 backdrop-blur-2xl">
                <a href="https://lunexomedia.com/book-apartment" className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Book a Call
                </a>
              </Button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }} className="mt-16 flex flex-wrap justify-center gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#3ECF8E]" />
                <span className="text-sm">100% Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#3ECF8E]" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#3ECF8E]" />
                <span className="text-sm">5-Star Rated</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
      </section>

      {/* Completed Clients Section */}
      <CompletedClients />

      <Footer />
      
      {/* Chat & Voice Widget */}
      <ChatVoiceWidget />
    </div>;
};
export default Index;