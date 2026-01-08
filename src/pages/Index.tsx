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
    <div className="min-h-screen bg-[#E8F4FD]">
      <SEO
        title="Lunexo Media | Digital Marketing & Growth Solutions"
        description="Lunexo Media helps businesses grow with SEO, paid ads, web design, and AI automation. Get data-driven strategies to scale your brand."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com"
        keywords="digital marketing, SEO services, Google ads, web design, AI automation, business growth, Lunexo Media"
      />
      
      <Navigation />
      
      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#E8F4FD]">
        {/* Subtle decorative circles */}
        <div className="absolute top-20 left-20 flex gap-3">
          <div className="w-6 h-6 rounded-full bg-orange-400"></div>
          <div className="w-6 h-6 rounded-full bg-blue-500"></div>
          <div className="w-6 h-6 rounded-full bg-blue-200"></div>
          <div className="w-6 h-6 rounded-full bg-green-500"></div>
        </div>
        
        <div className="container-wide section-padding relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in" style={{ animationDuration: '0.4s' }}>
              {/* Premium badge */}
              <div className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <Award className="w-4 h-4 text-blue-500" />
                </span>
                Trusted by 50+ businesses worldwide
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                Create a website
                <br />
                <span className="text-gray-900">
                  without limits
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-light">
                Bring your ideas to life with premium website design, performance ads & AI automation — crafted for ambitious brands.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="group text-base px-10 py-7 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg">
                  <Link to="/contact" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group text-base px-10 py-7 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-full transition-all duration-300">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    View Portfolio
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">Start for free. No credit card required.</p>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 lg:gap-10 pt-10 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">200%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Avg. Growth</div>
                </div>
                <div className="w-px h-14 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">50+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</div>
                </div>
                <div className="w-px h-14 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">10x</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">ROI</div>
                </div>
              </div>
            </div>

            {/* Video with premium frame */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-gray-100">
                <YouTubeFacade
                  videoId="jQJqW8JAWWU"
                  title="YouTube video player"
                  width="100%"
                  height="315"
                  autoplay={true}
                  loop={true}
                  mute={false}
                  loading="eager"
                  className="relative w-full aspect-video rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg border border-gray-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Live Results
              </div>
            </div>
          </div>

          {/* Service Pills */}
          <div className="flex flex-wrap justify-center gap-5 mt-20 lg:mt-28">
            {[
              { icon: Globe, label: "Web Design", color: "bg-green-500", href: "/website-design" },
              { icon: Target, label: "Paid Ads", color: "bg-blue-500", href: "/ads-management" },
              { icon: Bot, label: "AI Automation", color: "bg-purple-500", href: "/ai-automation" },
              { icon: Sparkles, label: "Strategy", color: "bg-orange-500", href: "/contact" },
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
                  className="group relative flex items-center gap-4 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-2xl px-7 py-5 transition-all duration-500 cursor-pointer hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <div className={`relative w-12 h-12 rounded-xl ${service.color} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.span 
                    className="relative text-lg text-gray-800 font-semibold tracking-tight"
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    style={{ overflow: "hidden", whiteSpace: "nowrap", display: "inline-block" }}
                  >
                    {service.label}
                  </motion.span>
                  <ChevronRight className="relative w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Services Section */}
      <section className="py-36 bg-white relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-600 px-8 py-4 rounded-full text-sm font-semibold mb-10">
              <Zap className="w-5 h-5 text-blue-500" />
              Our Services
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
              What We <span className="text-blue-600">Offer</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
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
                color: "bg-green-500",
                borderColor: "hover:border-green-300",
                href: "/website-design"
              },
              {
                icon: Target,
                title: "Ads Management",
                description: "Data-driven campaigns on Google, Facebook & TikTok that maximize ROI.",
                features: ["Multi-Platform", "ROI Focused", "Advanced Targeting", "Analytics"],
                color: "bg-blue-500",
                borderColor: "hover:border-blue-300",
                href: "/ads-management"
              },
              {
                icon: Bot,
                title: "AI Automation",
                description: "Intelligent automation and chatbots that streamline your operations.",
                features: ["Custom AI Solutions", "Workflow Automation", "Chatbots", "Integration"],
                color: "bg-purple-500",
                borderColor: "hover:border-purple-300",
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
                <div className={`relative bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-xl ${service.borderColor} transition-all duration-500 h-full group-hover:translate-y-[-8px]`}>
                  <div className={`w-20 h-20 rounded-2xl ${service.color} flex items-center justify-center mb-8 shadow-lg`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-5" style={{fontFamily: "'Playfair Display', serif"}}>{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">{service.description}</p>
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-4 text-gray-700">
                        <div className={`w-6 h-6 rounded-full ${service.color} flex items-center justify-center`}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full ${service.color} text-white hover:opacity-90 rounded-xl py-6 text-lg font-semibold shadow-lg transition-all duration-300`}>
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
        <section className="py-32 bg-[#E8F4FD] relative overflow-hidden">
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full text-sm font-semibold mb-10 shadow-sm"
              >
                <Award className="w-5 h-5 text-blue-500" />
                Our Portfolio
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold mb-8 text-gray-900" 
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Success <span className="text-blue-600">Stories</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              >
                Discover how we've transformed businesses with stunning digital solutions
              </motion.p>
            </div>

            {/* Main Showcase */}
            <div className="relative max-w-5xl mx-auto">
              {/* Project Display */}
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
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
                    <div className="absolute inset-0 bg-gray-100">
                      {portfolioProjects[currentProjectIndex]?.image_url && (
                        <img 
                          src={portfolioProjects[currentProjectIndex].image_url} 
                          alt={portfolioProjects[currentProjectIndex].title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <div className="inline-flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full text-sm text-white mb-4">
                          {portfolioProjects[currentProjectIndex]?.category}
                        </div>
                        
                        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                          {portfolioProjects[currentProjectIndex]?.title?.split('—')[0]}
                        </h3>
                        
                        <p className="text-lg text-gray-200 max-w-2xl mb-6 line-clamp-2">
                          {portfolioProjects[currentProjectIndex]?.description}
                        </p>
                        
                        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-8 py-6 text-lg font-semibold shadow-lg">
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
                        ? 'w-12 bg-blue-500' 
                        : 'w-2 bg-gray-300 hover:bg-blue-300'
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
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-500 bg-white border border-gray-200 hover:text-blue-600 hover:border-blue-300'
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
                <Button asChild variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 text-lg">
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "200%", label: "Avg Growth", icon: TrendingUp, color: "bg-green-500" },
              { value: "50+", label: "Happy Clients", icon: Users, color: "bg-blue-500" },
              { value: "10x", label: "ROI Achieved", icon: Award, color: "bg-purple-500" },
              { value: "24/7", label: "Support", icon: Clock, color: "bg-orange-500" }
            ].map((stat, i) => (
              <div key={i} className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300 text-center">
                <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-[#E8F4FD] relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                <Shield className="w-4 h-4 text-green-500" />
                Why Lunexo Media
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                Built for <span className="text-blue-600">Success</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We don't just build websites or run ads. We create comprehensive digital strategies that drive real business growth.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "30-Day Launch", desc: "From concept to live in 30 days" },
                  { title: "Results Focused", desc: "Every decision driven by data" },
                  { title: "Full Support", desc: "24/7 support and maintenance" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-gray-500 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 shadow-lg">
                <Link to="/contact">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-gray-100">
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
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-3 rounded-full text-sm font-medium mb-8">
                <Star className="w-4 h-4 text-yellow-500" />
                Client Reviews
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                What Clients <span className="text-blue-600">Say</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visibleTestimonials.slice(0, 3).map((testimonial, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-4 h-4" />
              Ready to Grow?
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Let's Build Your
              <br />
              Digital Empire
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
