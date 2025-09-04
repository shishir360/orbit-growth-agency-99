import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { Button } from "@/components/ui/button";
// React Router Link removed for full page reloads
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/ui/hero-section";
import ServiceCard from "@/components/ui/service-card";
import TestimonialCard from "@/components/ui/testimonial-card";
import TrustedBy from "@/components/ui/trusted-by";
import SEO from "@/components/ui/seo";
import { useContent } from "@/contexts/ContentContext";
import { Globe, Target, Bot, Sparkles, ArrowRight, Zap, Check, Star, Calendar, Users } from "lucide-react";
import { lazy, Suspense } from "react";

// Proper ES6 image imports
import heroDashboard from "@/assets/hero-dashboard-optimized.webp";
import websiteDesignHero from "@/assets/website-design-hero.jpg";
import adsManagementHero from "@/assets/ads-management-hero.jpg";
import aiAutomationHero from "@/assets/ai-automation-hero.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const Index = () => {
  const { content } = useContent();
  const [api2, setApi2] = useState<any>();
  const [api3, setApi3] = useState<any>();

  // Simplified auto-scroll for performance
  useEffect(() => {
    if (!api2) return;
    const interval = setInterval(() => api2.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [api2]);

  useEffect(() => {
    if (!api3) return;
    const interval = setInterval(() => api3.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api3]);

  // Lighter featured projects data (simplified)
  const featuredProjects = useMemo(() => [
    {
      id: "device-rescue-nyc",
      title: "DeviceRescue NYC",
      description: "Expert device repair website with online booking and service catalog.",
      category: "Website Design",
      timeline: "3 weeks",
      results: "200% booking increase",
      liveUrl: "https://devicerescue.us/"
    },
    {
      id: "fix-and-more", 
      title: "Fix and More",
      description: "Modern repair service website with professional design and e-commerce.",
      category: "Website Design",
      timeline: "4 weeks",
      results: "150% conversion rate",
      liveUrl: "https://fixandmore.us/"
    }
  ], []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'Target':
        return <Target className="w-6 h-6" />;
      case 'Bot':
        return <Bot className="w-6 h-6" />;
      default:
        return <Globe className="w-6 h-6" />;
    }
  };

  const getServiceImage = useMemo(() => (imagePath: string) => {
    switch (imagePath) {
      case '/src/assets/website-design-hero.jpg':
        return websiteDesignHero;
      case '/src/assets/ads-management-hero.jpg':
        return adsManagementHero;
      case '/src/assets/ai-automation-hero.jpg':
        return aiAutomationHero;
      default:
        return websiteDesignHero;
    }
  }, []);

  const getHeroImage = useMemo(() => (imagePath: string) => {
    switch (imagePath) {
      case '/src/assets/hero-dashboard-optimized.webp':
        return heroDashboard;
      default:
        return heroDashboard;
    }
  }, []);

  const visibleServices = useMemo(() => 
    content.services
      .filter(service => service.visible)
      .sort((a, b) => a.order - b.order)
      .map(service => ({
        title: service.title,
        description: service.description,
        icon: getServiceIcon(service.icon),
        iconName: service.icon,
        href: service.href,
        image: getServiceImage(service.image),
      })), [content.services, getServiceImage]);

  const visibleTestimonials = useMemo(() => 
    content.testimonials
      .filter(testimonial => testimonial.visible)
      .sort((a, b) => a.order - b.order), [content.testimonials]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO
        title="Lunexo Media | Digital Marketing & Growth Solutions"
        description="Lunexo Media helps businesses grow with SEO, paid ads, web design, and AI automation. Get data-driven strategies to scale your brand."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com"
      />
      
      {/* Modern gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
      
      <Navigation />
      
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-10 animate-fade-in" style={{ animationDuration: '0.2s' }}>
              <div className="space-y-8">
                {/* Badge for credibility */}
                <div className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm">
                  ✨ Trusted partner of 50+ businesses
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-space font-bold leading-tight text-white">
                  Digital Marketing Agency for{" "}
                  <span className="text-red-500">
                    Business Growth
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Website design, ads management and AI automation - all under one roof.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/25">
                  <a href="/contact">
                    🔥 Book Free Consultation
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 border-2 border-red-500 text-red-400 bg-red-600/10 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <a href="/portfolio">
                    View Our Work
                  </a>
                </Button>
              </div>
            </div>

            {/* Video */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="relative group">
                <YouTubeFacade
                  videoId="jQJqW8JAWWU"
                  title="YouTube video player"
                  width="100%"
                  height="315"
                  autoplay={true}
                  loop={true}
                  mute={false}
                  loading="eager"
                  className="relative w-full aspect-video rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 lg:mt-20">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 sm:p-6 border border-slate-600 hover:border-red-500 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight">Websites &</h3>
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight">Marketing Tools</h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 sm:p-6 border border-slate-600 hover:border-red-500 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg">Traffic</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Google Ads, Meta Ads, SEO & more</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 sm:p-6 border border-slate-600 hover:border-red-500 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg">AI Automation</h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 sm:p-6 border border-slate-600 hover:border-red-500 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight">Strategy &</h3>
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight">Consulting</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Case Studies Preview */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
        <div className="container-wide section-padding">
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-white">
              Our Core Services (SEO, Ads, Web Design, AI)
            </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our client success stories - how we transformed their businesses
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-slate-800/50 rounded-2xl p-6 border border-slate-600">
                <div className="text-3xl font-bold text-red-500 mb-2">200%</div>
                <div className="text-gray-300">Average conversion increase</div>
              </div>
              <div className="text-center bg-slate-800/50 rounded-2xl p-6 border border-slate-600">
                <div className="text-3xl font-bold text-red-500 mb-2">10x</div>
                <div className="text-gray-300">ROI improvement</div>
              </div>
              <div className="text-center bg-slate-800/50 rounded-2xl p-6 border border-slate-600">
                <div className="text-3xl font-bold text-red-500 mb-2">30 days</div>
                <div className="text-gray-300">Average launch time</div>
              </div>
            </div>

            <div className="relative group animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-red-600 rounded-3xl filter blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="bg-slate-800 border border-slate-600 rounded-3xl overflow-hidden p-4">
                <img
                  src={heroDashboard}
                  alt="Client Success Dashboard Preview"
                  className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8">
                <a href="/portfolio">
                  View More Case Studies
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Professional Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-white">
                Professional Development Team
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our expert developers work with cutting-edge technology to deliver exceptional results. From concept to deployment, we ensure your project meets the highest professional standards.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
                  <div className="text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
                  <div className="text-gray-400">Support Available</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="relative group">
                <div className="absolute inset-0 bg-red-600 rounded-3xl filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60"
                  alt="Professional development team working"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-slate-600 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Testimonials Section - Moved up for social proof */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-white">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. See how we've helped businesses like yours achieve extraordinary results.
            </p>
          </div>
          
          <Carousel 
            setApi={setApi2}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {visibleTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="modern-card h-full">
                      <TestimonialCard {...testimonial} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Modern Services Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-white">
              Why Choose Lunexo Media?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We specialize in three key areas that help businesses build, launch, and grow their digital presence with cutting-edge technology.
            </p>
          </div>
          
          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* SEO Service */}
            <div className="group animate-scale-in">
              <div className="modern-card p-6 sm:p-8 h-full hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow group-hover:animate-float">
                  <Globe className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 sm:mb-4 group-hover:text-gradient transition-colors">
                  SEO & Website Design
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Build stunning, SEO-optimized websites that rank higher and convert better. Professional design meets technical excellence.
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Custom Web Design</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>SEO Optimization</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Mobile Responsive</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Performance Optimization</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <a href="/website-design">
                    Explore Website Design
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Ads Management Service */}
            <div className="group animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="modern-card p-6 sm:p-8 h-full hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow group-hover:animate-float">
                  <Target className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 sm:mb-4 group-hover:text-gradient transition-colors">
                  Ads Management
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Drive targeted traffic and maximize ROI with expertly managed Google, Facebook, TikTok, and LinkedIn advertising campaigns.
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Multi-Platform Campaigns</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>ROI Optimization</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Advanced Targeting</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Performance Tracking</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <a href="/ads-management">
                    Explore Ads Management
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* AI Automation Service */}
            <div className="group animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="modern-card p-6 sm:p-8 h-full hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow group-hover:animate-float">
                  <Bot className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 sm:mb-4 group-hover:text-gradient transition-colors">
                  AI Automation
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Streamline operations and boost productivity with custom AI solutions, chatbots, and intelligent automation workflows.
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Custom AI Solutions</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Workflow Automation</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Chatbot Development</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Process Optimization</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <a href="/ai-automation">
                    Explore AI Automation
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Tutorials Service */}
            <div className="group animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="modern-card p-6 sm:p-8 h-full hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow group-hover:animate-float">
                  <Calendar className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 sm:mb-4 group-hover:text-gradient transition-colors">
                  Digital Tutorials
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Learn essential digital marketing skills with our comprehensive tutorials, guides, and step-by-step courses.
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>SEO Tutorials</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Ads Management Guide</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Web Design Basics</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>AI Tools Training</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <a href="/tutorials">
                    Browse Tutorials
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Pricing Service */}
            <div className="group animate-scale-in" style={{animationDelay: '0.4s'}}>
              <div className="modern-card p-6 sm:p-8 h-full hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow group-hover:animate-float">
                  <Star className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 sm:mb-4 group-hover:text-gradient transition-colors">
                  Flexible Pricing
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Choose from our transparent pricing plans designed to fit businesses of all sizes, from startups to enterprises.
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Transparent Pricing</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Custom Packages</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>No Hidden Fees</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Money-Back Guarantee</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <a href="/pricing">
                    View Pricing
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Blog Service */}
            <div className="group animate-scale-in" style={{animationDelay: '0.5s'}}>
              <div className="modern-card p-6 sm:p-8 h-full hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow group-hover:animate-float">
                  <Users className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-bold mb-3 sm:mb-4 group-hover:text-gradient transition-colors">
                  Industry Insights
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Stay updated with the latest digital marketing trends, case studies, and expert insights from our blog.
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Expert Articles</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Case Studies</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>Industry Trends</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span>How-To Guides</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <a href="/blog">
                    Read Blog
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Modern Features Section with Professional Images */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6">
              Why Choose{" "}
              <span className="text-gradient">
                LUNEXO MEDIA
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to launch and scale your business with next-generation technology and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group animate-scale-in">
              <div className="modern-card text-center p-10 h-full">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow group-hover:animate-float">
                  <Zap className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-space font-bold mb-4 group-hover:text-gradient transition-colors">
                  30-Day Launch
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  From concept to live product in 30 days or less. No lengthy development cycles or technical delays.
                </p>
              </div>
            </div>
            
            <div className="group animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="modern-card text-center p-10 h-full">
                <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow group-hover:animate-float">
                  <Sparkles className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-space font-bold mb-4 group-hover:text-gradient transition-colors">
                  No Coding Needed
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Focus on your business while we handle all the technical implementation and maintenance.
                </p>
              </div>
            </div>
            
            <div className="group animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="modern-card text-center p-10 h-full">
                <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow group-hover:animate-float">
                  <ArrowRight className="text-foreground w-10 h-10" />
                </div>
                <h3 className="text-2xl font-space font-bold mb-4 group-hover:text-gradient transition-colors">
                  Full Integration
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built-in payment processing, analytics, and growth tools. Start scaling from day one.
                </p>
              </div>
            </div>
          </div>

          {/* Professional Development Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-scale-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional coding and development"
                  className="relative w-full h-auto rounded-3xl shadow-elegant border border-border/50 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <h3 className="text-3xl lg:text-4xl font-space font-bold mb-6 text-gradient">
                Professional Development Process
              </h3>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We use industry-leading tools and methodologies to ensure your project is built to the highest standards with clean, maintainable code.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Modern frameworks and technologies</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Responsive and mobile-first design</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">SEO optimized and performance focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-gradient">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the perfect package for your business needs. No hidden fees, no surprises.
            </p>
          </div>

          {/* Website Design Pricing */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Website Design
              </h3>
              <p className="text-xl text-muted-foreground">
                Choose the perfect plan for your website design needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Starter Package */}
              <Card className="relative">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">Starter</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Perfect for small businesses getting started online
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">$299</span>
                    <span className="text-muted-foreground ml-1">/one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">5-page responsive website</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Mobile-optimized design</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Basic SEO setup</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Contact form integration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">1 month support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Free domain setup</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="w-full" variant="outline" size="lg">
                    <a href="/contact">Choose Plan</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Package */}
              <Card className="relative border-primary shadow-lg scale-105">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">Professional</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Ideal for growing businesses with advanced needs
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">$599</span>
                    <span className="text-muted-foreground ml-1">/one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">10-page responsive website</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Custom design & branding</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Advanced SEO optimization</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Google Analytics setup</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Social media integration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">3 months support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Free hosting for 1 year</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Content management system</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="w-full" size="lg">
                    <a href="/contact">Get Started</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Package */}
              <Card className="relative">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete solution for established businesses
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">$1,299</span>
                    <span className="text-muted-foreground ml-1">/one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Unlimited pages</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Premium custom design</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">E-commerce functionality</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Multi-language support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">6 months support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Free hosting for 2 years</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Performance optimization</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="w-full" variant="outline" size="lg">
                    <a href="/contact">Choose Plan</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? We're here to help.
            </p>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">Contact Us for Custom Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-gradient">
                Cutting-Edge Technology
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We leverage the latest technologies and industry best practices to deliver high-performance, scalable solutions that grow with your business.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="modern-card p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">React</div>
                  <div className="text-sm text-muted-foreground">Frontend Framework</div>
                </div>
                <div className="modern-card p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Node.js</div>
                  <div className="text-sm text-muted-foreground">Backend Runtime</div>
                </div>
                <div className="modern-card p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">AWS</div>
                  <div className="text-sm text-muted-foreground">Cloud Platform</div>
                </div>
                <div className="modern-card p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">AI/ML</div>
                  <div className="text-sm text-muted-foreground">Smart Automation</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60"
                  alt="Professional workspace with modern technology"
                  className="relative w-full h-auto rounded-3xl shadow-elegant border border-border/50 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Featured Projects Section */}
      <section className="py-16 bg-white relative">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-4 text-gradient">
              Recent Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick examples of our recent work and results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="modern-card p-6">
                <Badge className="mb-4 bg-gradient-primary text-white border-0">
                  {project.category}
                </Badge>
                <h3 className="text-xl font-space font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                  <span>Timeline: {project.timeline}</span>
                  <span className="text-gradient font-semibold">{project.results}</span>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live Site <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="container-narrow section-padding text-center relative z-10">
          <div className="relative animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-space font-bold mb-8">
              Ready to Launch Something Amazing?
            </h2>
            <p className="text-xl text-red-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              We help founders, creators, and teams build scalable digital products without the usual delays, dev roadblocks, or messy handoffs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-10 py-4 bg-white text-red-600 hover:bg-gray-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 rounded-full">
                <a href="/contact">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Schedule A Meeting
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-10 py-4 bg-transparent text-white border-white hover:bg-white hover:text-red-600 hover:scale-110 transition-all duration-300 rounded-full">
                <a href="/portfolio">
                  View Our Work
                  <ArrowRight className="w-6 h-6 ml-2" />
                </a>
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
