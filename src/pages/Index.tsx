import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import TrustedBy from "@/components/ui/trusted-by";
import SEO from "@/components/ui/seo";
import { useContent } from "@/contexts/ContentContext";
import { Globe, Target, Bot, Sparkles, ArrowRight, Zap, Check, Star, Calendar, Users, Award, TrendingUp, Play, ChevronRight, MessageSquare, Clock, Shield } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import heroDashboard from "@/assets/hero-dashboard-optimized.webp";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const { content } = useContent();
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
        const imagePromises = data
          .filter(p => p.image_url)
          .map(p => new Promise<void>((resolve) => {
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
    content.testimonials
      .filter(testimonial => testimonial.visible)
      .sort((a, b) => a.order - b.order), [content.testimonials]);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SEO
        title="Lunexo Media | Digital Marketing & Growth Solutions"
        description="Lunexo Media helps businesses grow with SEO, paid ads, web design, and AI automation. Get data-driven strategies to scale your brand."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com"
        keywords="digital marketing, SEO services, Google ads, web design, AI automation, business growth, Lunexo Media"
      />
      
      <Navigation />
      
      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/30 to-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 to-yellow-500/15 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in" style={{ animationDuration: '0.4s' }}>
              {/* Premium badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border border-blue-500/30 text-blue-300 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <Award className="w-4 h-4 text-amber-400" />
                </span>
                Trusted by 50+ businesses worldwide
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                We Build
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                  Digital Empires
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                Premium website design, performance ads & AI automation — crafted for ambitious brands ready to dominate their market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="group text-base px-10 py-7 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-blue-500/25">
                  <Link to="/contact" className="flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group text-base px-10 py-7 border border-slate-600 text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    View Portfolio
                  </Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 lg:gap-10 pt-10 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">200%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Avg. Growth</div>
                </div>
                <div className="w-px h-14 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">50+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Projects</div>
                </div>
                <div className="w-px h-14 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">10x</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">ROI</div>
                </div>
              </div>
            </div>

            {/* Video with premium frame */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-cyan-500/25 to-amber-500/20 rounded-3xl blur-3xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-1.5 rounded-3xl backdrop-blur-sm border border-slate-700 shadow-2xl">
                <YouTubeFacade
                  videoId="jQJqW8JAWWU"
                  title="YouTube video player"
                  width="100%"
                  height="315"
                  autoplay={true}
                  loop={true}
                  mute={false}
                  loading="eager"
                  className="relative w-full aspect-video rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Live Results
              </div>
            </div>
          </div>

          {/* Service Pills */}
          <div className="flex flex-wrap justify-center gap-5 mt-20 lg:mt-28">
            {[
              { icon: Globe, label: "Web Design", color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/40", href: "/website-design" },
              { icon: Target, label: "Paid Ads", color: "from-amber-500 to-yellow-500", glow: "shadow-amber-500/40", href: "/ads-management" },
              { icon: Bot, label: "AI Automation", color: "from-violet-500 to-purple-500", glow: "shadow-violet-500/40", href: "/ai-automation" },
              { icon: Sparkles, label: "Strategy", color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/40", href: "/contact" },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link 
                  to={service.href}
                  className="group relative flex items-center gap-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 rounded-2xl px-7 py-5 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl ${service.glow}`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.span 
                    className="relative text-lg text-slate-200 font-semibold tracking-tight"
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    style={{ overflow: "hidden", whiteSpace: "nowrap", display: "inline-block" }}
                  >
                    {service.label}
                  </motion.span>
                  <ChevronRight className="relative w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Services Section */}
      <section className="py-36 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/10 to-yellow-500/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-blue-500/15 border border-blue-500/30 text-blue-300 px-8 py-4 rounded-full text-sm font-semibold backdrop-blur-xl mb-10">
              <Zap className="w-5 h-5 text-amber-400" />
              Our Services
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              What We <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Three core services designed to accelerate your digital growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Globe,
                title: "Website Design",
                description: "Stunning, SEO-optimized websites that convert visitors into customers.",
                features: ["Custom Design", "SEO Optimization", "Mobile Responsive", "Fast Loading"],
                color: "from-blue-500 to-cyan-500",
                glow: "shadow-blue-500/20",
                href: "/website-design"
              },
              {
                icon: Target,
                title: "Ads Management",
                description: "Data-driven campaigns on Google, Facebook & TikTok that maximize ROI.",
                features: ["Multi-Platform", "ROI Focused", "Advanced Targeting", "Analytics"],
                color: "from-amber-500 to-yellow-500",
                glow: "shadow-amber-500/20",
                href: "/ads-management"
              },
              {
                icon: Bot,
                title: "AI Automation",
                description: "Intelligent automation and chatbots that streamline your operations.",
                features: ["Custom AI Solutions", "Workflow Automation", "Chatbots", "Integration"],
                color: "from-violet-500 to-purple-500",
                glow: "shadow-violet-500/20",
                href: "/ai-automation"
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-700`}></div>
                <div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl p-10 backdrop-blur-xl hover:bg-slate-800/70 hover:border-blue-500/30 transition-all duration-500 h-full group-hover:translate-y-[-8px]">
                  {/* Premium corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-tr-3xl rounded-bl-[100px]`}></div>
                  
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-2xl ${service.glow}`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-5" style={{fontFamily: "'Playfair Display', serif"}}>{service.title}</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed text-lg">{service.description}</p>
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-4 text-slate-300">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full bg-gradient-to-r ${service.color} text-white hover:opacity-90 rounded-xl py-6 text-lg font-semibold shadow-lg ${service.glow} transition-all duration-300`}>
                    <Link to={service.href}>
                      Learn More <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      {portfolioProjects.length > 0 && imagesLoaded && (
        <section className="py-32 bg-[#0F172A] relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/20 to-purple-500/10 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-8 py-4 rounded-full text-sm font-semibold backdrop-blur-xl mb-10 shadow-lg shadow-amber-500/10"
              >
                <Award className="w-5 h-5" />
                Our Portfolio
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold mb-8 text-white" 
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Success <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Stories</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
              >
                Discover how we've transformed businesses with stunning digital solutions
              </motion.p>
            </div>

            {/* Main Showcase */}
            <div className="relative max-w-5xl mx-auto">
              {/* Project Display */}
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-slate-700">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProjectIndex}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                      {portfolioProjects[currentProjectIndex]?.image_url && (
                        <img 
                          src={portfolioProjects[currentProjectIndex].image_url} 
                          alt={portfolioProjects[currentProjectIndex].title}
                          className="w-full h-full object-cover opacity-80"
                        />
                      )}
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 px-4 py-2 rounded-full text-sm text-blue-300 mb-4">
                          {portfolioProjects[currentProjectIndex]?.category}
                        </div>
                        
                        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                          {portfolioProjects[currentProjectIndex]?.title?.split('—')[0]}
                        </h3>
                        
                        <p className="text-lg text-slate-300 max-w-2xl mb-6 line-clamp-2">
                          {portfolioProjects[currentProjectIndex]?.description}
                        </p>
                        
                        <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-xl px-8 py-6 text-lg font-semibold shadow-2xl shadow-blue-500/30">
                          <Link to={`/portfolio/${portfolioProjects[currentProjectIndex]?.slug}`}>
                            View Project <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Project Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {portfolioProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentProjectIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === currentProjectIndex 
                        ? 'w-12 bg-gradient-to-r from-blue-400 to-cyan-400' 
                        : 'w-2 bg-slate-600 hover:bg-blue-400/50'
                    }`}
                  />
                ))}
              </div>

              {/* Project Titles List */}
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                {portfolioProjects.map((project, i) => (
                  <motion.button
                    key={project.id}
                    onClick={() => setCurrentProjectIndex(i)}
                    className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 ${
                      i === currentProjectIndex 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : 'text-slate-500 hover:text-blue-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{project.title?.split('—')[0]?.trim()}</span>
                  </motion.button>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Button asChild variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 rounded-xl px-8 py-6 text-lg">
                  <Link to="/portfolio">
                    View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "200%", label: "Avg Growth", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
              { value: "50+", label: "Happy Clients", icon: Users, color: "from-amber-500 to-yellow-500" },
              { value: "10x", label: "ROI Achieved", icon: Award, color: "from-violet-500 to-purple-500" },
              { value: "24/7", label: "Support", icon: Clock, color: "from-emerald-500 to-teal-500" }
            ].map((stat, i) => (
              <div key={i} className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm hover:bg-slate-800/70 hover:border-blue-500/30 transition-all duration-300 text-center">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/15 to-teal-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.01)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl">
                <Shield className="w-4 h-4" />
                Why Lunexo Media
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Built for <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Success</span>
              </h2>
              
              <p className="text-lg text-slate-400 leading-relaxed">
                We don't just build websites or run ads. We create comprehensive digital strategies that drive real business growth.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "30-Day Launch", desc: "From concept to live in 30 days" },
                  { title: "Results Focused", desc: "Every decision driven by data" },
                  { title: "Full Support", desc: "24/7 support and maintenance" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-emerald-500/30 transition-colors">
                    <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 rounded-full px-8 shadow-lg shadow-emerald-500/25">
                <Link to="/contact">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-3xl border border-slate-700">
                <img
                  src={heroDashboard}
                  alt="Dashboard Preview"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {visibleTestimonials.length > 0 && (
        <section className="py-32 bg-[#0F172A] relative overflow-hidden">
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-r from-amber-500/10 to-yellow-500/5 rounded-full blur-[120px]"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
                <Star className="w-4 h-4" />
                Client Reviews
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                What Clients <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Say</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visibleTestimonials.slice(0, 3).map((testimonial, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-slate-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-[100px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-4 h-4 text-amber-300" />
              Ready to Grow?
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Let's Build Your
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Digital Empire
              </span>
            </h2>
            
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto font-light">
              Ready to transform your business? Let's discuss your project and create a strategy for success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group text-base px-10 py-7 bg-white text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-10 py-7 border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm">
                <Link to="/book-apartment">
                  Book a Call
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

export default Index;
