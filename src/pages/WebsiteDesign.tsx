import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TypeWriter } from "@/components/ui/typewriter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import HeroSection from "@/components/ui/hero-section";
import ServiceSchema from "@/components/ui/service-schema";
import FAQSchema from "@/components/ui/faq-schema";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { 
  Zap, 
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Award,
  Palette,
  Code,
  BarChart3,
  Infinity,
  CheckCircle,
  Star,
  Trophy,
  Heart,
  ExternalLink,
  Play
} from "lucide-react";
import websiteDesignHero from "@/assets/website-design-hero.jpg";
import { Link } from "react-router-dom";

const WebsiteDesign = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Beautiful layouts that adapt seamlessly across all devices and screen sizes.",
      color: "bg-green-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimized", 
      description: "Lightning-fast loading speeds with optimized code and modern techniques.",
      color: "bg-blue-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "SEO Ready",
      description: "Built-in search optimization to help your site rank higher on Google.",
      color: "bg-purple-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design",
      description: "Unique, brand-focused designs tailored specifically to your business.",
      color: "bg-orange-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Modern, maintainable code following industry best practices.",
      color: "bg-teal-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Conversion Focused",
      description: "Strategic design elements that turn visitors into customers.",
      color: "bg-pink-500"
    }
  ];

  const portfolio = [
    {
      title: "E-commerce Platform",
      category: "Retail",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      results: "300% increase in sales"
    },
    {
      title: "SaaS Dashboard",
      category: "Technology", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      results: "50% reduction in bounce rate"
    },
    {
      title: "Healthcare Portal",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80", 
      results: "90% user satisfaction"
    }
  ];

  const testimonials = [
    {
      quote: "The team delivered an exceptional website that exceeded our expectations. Our conversion rate increased by 200% within the first month.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "TechStart",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9dc5ca2?w=400&h=400&fit=crop&crop=face"
    },
    {
      quote: "Professional, fast, and exactly what we needed. The design perfectly captures our brand and our customers love it.",
      author: "Michael Chen", 
      role: "Founder",
      company: "GrowthCorp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      quote: "Outstanding work. The website looks amazing and performs even better. Highly recommend their services.",
      author: "Emily Rodriguez",
      role: "Director",
      company: "InnovateLab", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    document.title = "Web Design & Development | Modern, Fast & Responsive Websites";
  }, []);

  return (
    <div className="min-h-screen bg-[#E8F4FD]">
      <SEO
        title="Web Design & Development | Modern, Fast & Responsive Websites"
        description="Build fast, mobile-friendly, and conversion-focused websites. Lunexo Media offers creative web design and professional development services."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/website-design"
        keywords="web design, website development, responsive design, modern websites, custom web design"
      />
      
      <ServiceSchema
        name="Website Design & Development"
        description="Professional web design and development services. We create fast, mobile-friendly, and conversion-focused websites tailored to your business needs."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="Web Design, Web Development, Responsive Design"
        url="https://www.lunexomedia.com/website-design"
        image="https://www.lunexomedia.com/og-image-new.jpg"
        priceRange="$$"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 127
        }}
      />
      
      <Navigation />
      
      <div className="container-wide section-padding pt-8">
        <BreadcrumbSEO 
          items={[
            { label: "Services", href: "/services-explore" }
          ]}
          currentPage="Website Design"
        />
      </div>
      
      {/* Wix-Style Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#E8F4FD]">
        {/* Decorative colored circles like Wix */}
        <div className="absolute top-24 left-20 flex gap-3">
          <div className="w-6 h-6 rounded-full bg-orange-400"></div>
          <div className="w-6 h-6 rounded-full bg-blue-500"></div>
          <div className="w-6 h-6 rounded-full bg-blue-200"></div>
          <div className="w-6 h-6 rounded-full bg-green-500"></div>
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Premium Website Design
              </div>
              
              <h1 className="text-4xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                <TypeWriter text="Create a website" delay={80} />
                <br />
                <span className="text-gray-900">
                  <TypeWriter text="without limits" delay={80} />
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-light">
                Bring your ideas to life with premium website design, performance optimization & responsive development.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-4">
                {[
                  { value: "500%", label: "ROI Increase", icon: <Trophy className="w-5 h-5" /> },
                  { value: "99.9%", label: "Uptime", icon: <Shield className="w-5 h-5" /> },
                  { value: "24/7", label: "Support", icon: <Award className="w-5 h-5" /> }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-blue-500 mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* CTAs - Wix Style */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="group text-base font-semibold px-10 py-7 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-105 shadow-lg" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="text-base font-semibold px-10 py-7 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-full transition-all duration-300" asChild>
                  <Link to="/portfolio">
                    <Play className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">Start for free. No credit card required.</p>
            </div>

            {/* Video Section */}
            <div className="relative animate-scale-in">
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-gray-100">
                <YouTubeFacade
                  videoId="7Q0fNLTUOSA"
                  title="YouTube video player"
                  width="100%"
                  height="400"
                  autoplay={true}
                  loop={true}
                  className="w-full aspect-video rounded-2xl shadow-lg"
                />
                
                {/* Video Overlay Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-md border border-gray-100 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    Premium Showcase
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg border border-gray-100 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-500" />
                Award Winning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean White */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Award className="w-5 h-5" />
              Premium Excellence
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
              <TypeWriter text="Responsive & " delay={60} />
              <span className="text-blue-600"><TypeWriter text="Mobile Friendly" delay={60} /></span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Every element meticulously crafted with precision and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white border border-gray-200 rounded-3xl p-10 text-center hover:shadow-xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500">
                <div className={`inline-flex items-center justify-center w-20 h-20 ${service.color} rounded-2xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 bg-[#E8F4FD] relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-sm">
              <Trophy className="w-5 h-5 text-blue-500" />
              Premium Portfolio
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
              <TypeWriter text="Award-Winning " delay={60} />
              <span className="text-blue-600"><TypeWriter text="Masterpieces" delay={60} /></span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Discover transformative digital experiences that have revolutionized businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <div key={index} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <Trophy className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">{project.results}</span>
                  </div>
                  
                  <Button variant="outline" className="w-full font-semibold py-4 rounded-xl border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300" asChild>
                    <Link to={`/case-study/${index === 0 ? 'ecommerce-platform' : index === 1 ? 'saas-dashboard' : 'healthcare-portal'}`}>
                      View Case Study
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Heart className="w-5 h-5 text-yellow-500" />
              Client Reviews
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
              <TypeWriter text="What Clients " delay={60} />
              <span className="text-blue-600"><TypeWriter text="Say" delay={60} /></span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Hear from industry leaders who've experienced our design excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white border border-gray-200 rounded-3xl p-10 text-center hover:shadow-xl hover:border-blue-200 transition-all duration-500">
                <div className="relative mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg"
                  />
                </div>
                
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="space-y-1">
                  <div className="text-lg font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Blue like Wix button */}
      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4" />
              Transform Your Business
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              <TypeWriter text="Ready to Get Started?" delay={60} />
            </h2>
            
            <p className="text-lg lg:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
              Join the brands who've transformed their business with our premium design expertise
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group text-base font-semibold px-10 py-7 bg-white text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-105 shadow-lg" asChild>
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-semibold px-10 py-7 border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300" asChild>
                <Link to="/portfolio">
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              Frequently Asked Questions
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
              Got <span className="text-blue-600">Questions?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our web design services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <FAQSchema 
              faqs={[
                {
                  question: "How long does it take to design and develop a website?",
                  answer: "Typically, a professional website takes 2-6 weeks depending on complexity. Simple websites can be completed in 2-3 weeks, while e-commerce or custom web applications may take 4-6 weeks or more. We provide a detailed timeline during our initial consultation."
                },
                {
                  question: "Do you provide mobile-responsive designs?",
                  answer: "Absolutely! All our websites are fully mobile-responsive and optimized for all devices including smartphones, tablets, and desktops. Mobile-first design is a core part of our development process."
                },
                {
                  question: "Will I be able to update the website content myself?",
                  answer: "Yes! We build websites with user-friendly Content Management Systems (CMS) like WordPress or custom solutions that allow you to easily update text, images, and content without any technical knowledge. We also provide training and documentation."
                },
                {
                  question: "What is included in your web design packages?",
                  answer: "Our packages include custom design, responsive development, SEO optimization, contact forms, Google Analytics setup, social media integration, and ongoing support. E-commerce packages also include payment gateway integration and product management systems."
                },
                {
                  question: "Do you offer website maintenance and support?",
                  answer: "Yes! We offer ongoing maintenance packages that include security updates, content updates, performance optimization, backups, and technical support. Our basic packages include 1-6 months of support, with extended plans available."
                },
                {
                  question: "Will my website be SEO-friendly?",
                  answer: "Absolutely! We implement SEO best practices including proper heading structure, meta tags, image optimization, fast loading speeds, mobile optimization, and clean code. This gives your website a strong foundation for search engine rankings."
                }
              ]}
              className="w-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsiteDesign;
