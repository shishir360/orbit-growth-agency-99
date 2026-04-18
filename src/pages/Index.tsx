import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import TrustedBy from "@/components/ui/trusted-by";
import CompletedClients from "@/components/ui/completed-clients";
import ClientFeedbackCarousel from "@/components/ui/client-feedback-carousel";
import TemplatesCarousel from "@/components/ui/templates-carousel";
import VideoReviewsCarousel from "@/components/ui/video-reviews-carousel";
import ChatVoiceWidget from "@/components/ui/chat-voice-widget";
import SEO from "@/components/ui/seo";
import { useContent } from "@/contexts/ContentContext";
import { Globe, Target, Bot, Sparkles, ArrowRight, Zap, Check, Star, Users, Award, TrendingUp, Play, ChevronRight, Clock, Shield, Rocket, MousePointer, BarChart3, Layers, Heart, HelpCircle } from "lucide-react";
import FAQSchema from "@/components/ui/faq-schema";
import { useEffect, useState, useMemo } from "react";
import heroDashboard from "@/assets/hero-dashboard-optimized.webp";
import nexoriGlobe from "@/assets/nexori-globe.jpg";
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
      <SEO title="Lunexo Media | Digital Marketing Agency – SEO, Web Design & AI Automation" description="Lunexo Media is a full-service digital marketing agency specializing in SEO, Google Ads, Facebook Ads, custom website design, and AI automation. We help businesses grow faster with data-driven strategies." image="https://www.lunexomedia.com/og-image-new.jpg" url="https://www.lunexomedia.com" keywords="digital marketing agency, SEO services, Google Ads management, Facebook Ads, web design agency, AI automation, business growth, Lunexo Media, website development, PPC management" structuredData={[
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
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Lunexo Media",
          "image": "https://www.lunexomedia.com/logo.png",
          "url": "https://www.lunexomedia.com",
          "telephone": "+1-702-483-0749",
          "email": "hello@lunexomedia.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "addressCountry": "US"
          },
          "priceRange": "$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "50"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Lunexo Media",
          "serviceType": ["Digital Marketing", "SEO", "Web Design", "AI Automation", "Google Ads Management", "Facebook Ads Management"],
          "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Marketing Services",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Website Design & Development", "description": "Custom, conversion-focused websites built for speed, SEO, and mobile responsiveness."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Google & Facebook Ads Management", "description": "Data-driven PPC campaigns that maximize ROI across Google, Facebook, Instagram, and TikTok."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "AI Automation Solutions", "description": "Custom AI chatbots, voice agents, email automation, and workflow automation to streamline operations."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Search Engine Optimization", "description": "On-page and off-page SEO strategies to rank higher on Google and drive organic traffic."}}
            ]
          }
        }
      ]} />
      
      <Navigation />
      
      {/* Nexori-style Light Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 pt-28 pb-16">
        {/* Soft background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,200,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

        <div className="container-wide section-padding relative z-10 w-full">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-slate-900 mb-6">
              Welcome to a smarter
              <br />
              digital world
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
              Use Lunexo Media to build digital experiences that are{" "}
              <span className="text-slate-700">fast, beautiful, and intelligent.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 bg-slate-900 text-white hover:bg-slate-800 text-base font-medium shadow-lg"
              >
                <a href="https://lunexomedia.com/contact" className="flex items-center gap-2">
                  Begin building
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 text-base font-medium"
              >
                <a href="https://lunexomedia.com/contact">Contact a team</a>
              </Button>
            </div>
          </motion.div>

          {/* Globe + Floating Cards */}
          <div className="relative mt-16 lg:mt-20 mx-auto max-w-5xl h-[420px] sm:h-[480px] lg:h-[560px]">
            {/* Globe image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src="/src/assets/nexori-globe.jpg"
                alt="Global digital network"
                width={700}
                height={700}
                className="w-[85%] sm:w-[70%] lg:w-[60%] h-auto object-contain mix-blend-multiply select-none pointer-events-none"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[90%] h-[55%] border border-slate-200/80 rounded-[50%] rotate-[-12deg]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[110%] h-[45%] border border-slate-200/60 rounded-[50%] rotate-[8deg]" />
            </div>

            {/* Floating Card: Activity (top-left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-4 left-2 sm:top-8 sm:left-6 lg:left-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[230px] sm:w-[260px]"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-slate-900">Website</span>
                  <span className="text-slate-500"> launched successfully</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-slate-900">Client</span>
                  <span className="text-slate-500"> profile updated</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-slate-900">Campaign</span>
                  <span className="text-slate-500"> confirmed live</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card: Analytics (top-right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute top-2 right-2 sm:top-6 sm:right-6 lg:right-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[170px]"
            >
              <div className="text-xs text-slate-500 mb-2">Performance</div>
              <div className="flex items-end gap-1.5 h-16">
                {[40, 60, 35, 75, 50, 90].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[9px] text-slate-400 font-medium">{h}%</div>
                    <div className="w-full bg-amber-400 rounded-sm" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Card: Users (bottom-left) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-16 left-4 sm:bottom-24 sm:left-12 lg:left-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[150px]"
            >
              <div className="text-xs text-slate-500 mb-1">Clients</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-slate-900">50+</div>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  ↗
                </div>
              </div>
            </motion.div>

            {/* Floating Card: Revenue (center) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[220px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-xs text-slate-500">Avg. client growth</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">+264%</div>
            </motion.div>

            {/* Floating Card: Stats (bottom-center small) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute bottom-12 left-1/2 -translate-x-[10%] bg-white rounded-xl shadow-lg border border-slate-100 px-3 py-2"
            >
              <div className="text-base font-bold text-slate-900">$10K+</div>
              <div className="text-[10px] text-slate-500">Past 30 days</div>
            </motion.div>

            {/* Floating Card: ROI (bottom-right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="absolute bottom-20 right-2 sm:bottom-28 sm:right-8 lg:right-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[170px] -rotate-6"
            >
              <div className="text-[10px] text-slate-500 mb-1">You gained</div>
              <div className="text-lg font-bold text-slate-900">$ 24,345.00</div>
              <div className="text-[10px] text-slate-400">Profitability value</div>
            </motion.div>
          </div>

          {/* Trusted Logos Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 lg:mt-4 mx-auto max-w-4xl bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4 flex flex-wrap items-center justify-around gap-4"
          >
            {["Web Design", "SEO & Ads", "AI Automation", "Branding", "Strategy", "Support"].map(
              (item, i) => (
                <div
                  key={i}
                  className="text-sm font-semibold text-slate-700 tracking-tight"
                >
                  {item}
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Client Feedback Screenshots - Auto Scroll */}
      <ClientFeedbackCarousel />

      {/* Website Templates Carousel */}
      <TemplatesCarousel />

      {/* Video Reviews Carousel */}
      <VideoReviewsCarousel showOnHomepage />

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

      {/* SEO Content: What Is Lunexo Media */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d0d]" />
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Is <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">Lunexo Media</span>?
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
              <p>
                Lunexo Media is a full-service digital marketing agency that helps businesses of all sizes build a powerful online presence and drive measurable growth. Founded with a mission to make premium digital services accessible, we combine cutting-edge technology with proven marketing strategies to deliver results that matter.
              </p>
              <p>
                Our core services span four critical areas of digital growth: <strong className="text-white">custom website design and development</strong>, <strong className="text-white">search engine optimization (SEO)</strong>, <strong className="text-white">paid advertising management</strong> across Google, Facebook, Instagram, and TikTok, and <strong className="text-white">AI-powered automation solutions</strong> including chatbots, voice agents, and workflow automation.
              </p>
              <p>
                Unlike agencies that offer cookie-cutter solutions, every project at Lunexo Media starts with a deep understanding of your business goals, target audience, and competitive landscape. We then craft a tailored strategy that aligns your digital presence with your revenue objectives. Whether you are a startup looking for your first website, an established business ready to scale with paid ads, or an enterprise seeking AI automation to streamline operations — we have the expertise and track record to deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content: Our Process */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]" />
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              How We Help <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">Businesses Grow</span>
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
              <h3 className="text-white text-2xl font-semibold">1. Discovery & Strategy</h3>
              <p>
                Every engagement begins with a comprehensive discovery session where we audit your current digital presence, analyze your competitors, and identify growth opportunities. We use data from tools like Google Analytics, SEMrush, and Ahrefs to build a strategy rooted in real market intelligence — not guesswork. This phase typically reveals quick wins that can generate immediate results while we build your long-term growth engine.
              </p>
              
              <h3 className="text-white text-2xl font-semibold">2. Design & Development</h3>
              <p>
                Our design team creates visually stunning, conversion-optimized websites that load in under 2 seconds, score 90+ on Google PageSpeed Insights, and are built with semantic HTML for maximum search engine visibility. Every site is fully responsive, ADA-accessible, and engineered with clear calls-to-action that guide visitors through your sales funnel. We build on modern frameworks like React and use progressive web app (PWA) technology for app-like experiences.
              </p>
              
              <h3 className="text-white text-2xl font-semibold">3. Traffic & Lead Generation</h3>
              <p>
                Once your digital foundation is in place, we drive qualified traffic through a combination of organic SEO and paid advertising. Our SEO services include on-page optimization, technical SEO audits, content strategy, link building, and local SEO for businesses targeting specific geographic areas. For paid ads, we manage campaigns across Google Search, Google Display, YouTube, Facebook, Instagram, and TikTok — continuously optimizing for lower cost-per-acquisition and higher return on ad spend (ROAS).
              </p>
              
              <h3 className="text-white text-2xl font-semibold">4. AI Automation & Scale</h3>
              <p>
                As your business grows, manual processes become bottlenecks. Our AI automation solutions eliminate repetitive tasks and unlock scalable growth. We deploy custom AI chatbots that handle customer inquiries 24/7, voice agents that qualify leads and book appointments, email automation sequences that nurture prospects through your funnel, and workflow automation that connects your tools and eliminates data silos. Clients typically see an 80% reduction in manual tasks and a 3x improvement in response times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content: Industries We Serve */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d0d]" />
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Industries We <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">Serve</span>
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
              <p>
                Lunexo Media works with businesses across a wide range of industries, bringing specialized knowledge and proven playbooks to each sector. Our clients include <strong className="text-white">e-commerce brands</strong> looking to scale their online stores, <strong className="text-white">SaaS companies</strong> seeking to improve their acquisition funnels, <strong className="text-white">local service businesses</strong> that want to dominate their geographic market, <strong className="text-white">healthcare practices</strong> looking to attract more patients, <strong className="text-white">real estate agencies</strong> generating qualified buyer and seller leads, and <strong className="text-white">professional services firms</strong> including law firms, accounting practices, and consulting agencies.
              </p>
              <p>
                Regardless of your industry, our approach remains the same: understand your unique market dynamics, build a data-driven strategy, execute with precision, and optimize relentlessly. We measure success not by vanity metrics like impressions or clicks, but by the metrics that matter to your bottom line — revenue, qualified leads, customer acquisition cost, and lifetime value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]" />
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-white text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked <span className="bg-gradient-to-r from-[#3ECF8E] to-[#34B27B] bg-clip-text text-transparent">Questions</span>
            </h2>
            <FAQSchema
              className="space-y-4"
              faqs={[
                {
                  question: "What services does Lunexo Media offer?",
                  answer: "Lunexo Media offers a comprehensive suite of digital marketing services including custom website design and development, search engine optimization (SEO), paid advertising management across Google Ads, Facebook Ads, Instagram Ads, and TikTok Ads, as well as AI automation solutions such as chatbots, voice agents, email automation, and workflow automation. We serve businesses of all sizes — from startups to enterprises — across multiple industries worldwide."
                },
                {
                  question: "How much does it cost to work with Lunexo Media?",
                  answer: "Our pricing is tailored to each project's scope and goals. Website design projects typically start at $997, monthly SEO packages begin at $497, and ads management starts at $299 per month. AI automation solutions are quoted based on complexity. We offer flexible payment plans and always provide a detailed proposal before any commitment. Contact us for a free consultation and custom quote."
                },
                {
                  question: "How long does it take to build a website?",
                  answer: "Most custom website projects are completed within 2 to 4 weeks, depending on complexity. A simple business website can be delivered in as fast as 7 days. E-commerce sites and custom web applications may take 4 to 8 weeks. We pride ourselves on fast turnaround without compromising quality — every site is built for speed, SEO, and conversions."
                },
                {
                  question: "Do you offer SEO services?",
                  answer: "Yes, SEO is one of our core specialties. We provide comprehensive SEO services including technical SEO audits, on-page optimization, content strategy and creation, link building, local SEO for businesses targeting specific cities or regions, and ongoing performance monitoring. Our SEO strategies are designed to improve your Google rankings, increase organic traffic, and drive qualified leads to your business."
                },
                {
                  question: "What is AI automation and how can it help my business?",
                  answer: "AI automation uses artificial intelligence to handle repetitive business tasks automatically. At Lunexo Media, we build custom AI chatbots that answer customer questions 24/7, voice agents that qualify leads and book appointments, email sequences that nurture prospects, and workflow automations that connect your business tools. This saves you time, reduces costs, improves response times, and allows your team to focus on high-value work. Our clients typically see an 80% reduction in manual tasks."
                },
                {
                  question: "Can you manage my Google and Facebook advertising campaigns?",
                  answer: "Absolutely. We manage paid advertising campaigns across Google Search, Google Display, YouTube, Facebook, Instagram, and TikTok. Our approach is data-driven — we continuously A/B test ad creatives, optimize targeting, and adjust bidding strategies to maximize your return on ad spend (ROAS). We provide transparent monthly reporting so you always know exactly how your ad budget is performing."
                },
                {
                  question: "Where is Lunexo Media located?",
                  answer: "Lunexo Media is headquartered in New York, NY and serves clients worldwide. We work with businesses across the United States, United Kingdom, Canada, Australia, and many other countries. All communication and project management is handled digitally, making it easy to collaborate regardless of your location or time zone."
                },
                {
                  question: "What makes Lunexo Media different from other digital marketing agencies?",
                  answer: "Three things set us apart: First, we combine website design, SEO, paid ads, and AI automation under one roof — so your entire digital strategy works together seamlessly. Second, we focus on measurable results and ROI, not vanity metrics. Third, we leverage cutting-edge AI technology to give our clients a competitive advantage that most agencies simply cannot offer. With over 50 happy clients, a 200% average growth rate, and 10x ROI track record, we let our results speak for themselves."
                }
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Chat & Voice Widget */}
      <ChatVoiceWidget />
    </div>;
};
export default Index;