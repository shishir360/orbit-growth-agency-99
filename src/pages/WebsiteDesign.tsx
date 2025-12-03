import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  ExternalLink
} from "lucide-react";
import websiteDesignHero from "@/assets/website-design-hero.jpg";

const WebsiteDesign = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Beautiful layouts that adapt seamlessly across all devices and screen sizes."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimized", 
      description: "Lightning-fast loading speeds with optimized code and modern techniques."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "SEO Ready",
      description: "Built-in search optimization to help your site rank higher on Google."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design",
      description: "Unique, brand-focused designs tailored specifically to your business."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Modern, maintainable code following industry best practices."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Conversion Focused",
      description: "Strategic design elements that turn visitors into customers."
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
    <div className="min-h-screen bg-background">
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
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-accent-cta/15 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Premium Content */}
            <div className="space-y-10 animate-fade-in">
              <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full">
                <Sparkles className="w-6 h-6 text-primary" />
                Premium Website Design
              </Badge>
              
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                  <span className="premium-gradient-text">Professional</span>
                  <br />
                  <span className="text-foreground">Web Design &</span>
                  <br />
                  <span className="bg-gradient-to-r from-accent-cta to-primary bg-clip-text text-transparent">
                    Development
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                  Transform your business with 
                  <span className="text-accent-cta font-bold"> premium digital experiences</span> 
                  that rival the world's top brands and drive extraordinary results.
                </p>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { value: "500%", label: "ROI Increase", icon: <Trophy className="w-6 h-6" /> },
                  { value: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
                  { value: "24/7", label: "Support", icon: <Award className="w-6 h-6" /> }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl lg:text-3xl font-black text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Premium CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button size="lg" className="group text-base font-bold px-16 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow" asChild>
                  <a href="/contact">
                    Start Premium Project
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </a>
                </Button>
                
                <Button size="lg" variant="outline" className="text-base font-bold px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                  <a href="/portfolio">
                    View Portfolio
                  </a>
                </Button>
              </div>
            </div>

            {/* Premium Video Section */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-accent/30 to-accent-cta/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative luxury-card overflow-hidden p-6">
                <YouTubeFacade
                  videoId="7Q0fNLTUOSA"
                  title="YouTube video player"
                  width="100%"
                  height="400"
                  autoplay={true}
                  loop={true}
                  className="w-full aspect-video rounded-2xl shadow-elegant"
                />
                
                {/* Video Overlay Badge */}
                <div className="absolute top-10 left-10">
                  <Badge className="bg-black/70 text-white px-4 py-2 text-sm font-bold backdrop-blur-md">
                    <Globe className="w-4 h-4 mr-2" />
                    Premium Showcase
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-32 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--primary)_0%,_transparent_70%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_var(--accent)_0%,_transparent_70%)]"></div>
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Award className="w-6 h-6 mr-3" />
              Premium Excellence
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">Responsive &</span>{" "}
              <span className="premium-gradient-text">Mobile Friendly Design</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Every element meticulously crafted with the precision of 
              <span className="text-accent-cta font-bold"> luxury brands</span> and the innovation of 
              <span className="text-primary font-bold"> tech giants</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="luxury-card p-10 text-center group hover:scale-105 transition-all duration-500">
                <CardContent className="space-y-8 p-0">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl text-primary group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-500 shadow-elegant">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                  
                  {/* Premium Accent Line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Portfolio Section */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Trophy className="w-6 h-6 mr-3" />
              Premium Portfolio
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">Award-Winning</span>
              <br />
              <span className="premium-gradient-text">Masterpieces</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Discover transformative digital experiences that have 
              <span className="text-accent-cta font-bold"> revolutionized businesses</span> across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {portfolio.map((project, index) => (
              <Card key={index} className="luxury-card overflow-hidden group hover:scale-[1.05] transition-all duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <Badge className="absolute top-6 left-6 z-20 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 text-sm font-bold backdrop-blur-md">
                    {project.category}
                  </Badge>
                </div>
                
                <CardContent className="p-8 relative">
                  <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
                    <Trophy className="w-6 h-6 text-accent-cta" />
                    <span className="font-bold text-lg text-accent-cta">{project.results}</span>
                  </div>
                  
                  <Button variant="outline" className="w-full group/btn text-lg font-bold py-4 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                    <a href={`/case-study/${index === 0 ? 'ecommerce-platform' : index === 1 ? 'saas-dashboard' : 'healthcare-portal'}`}>
                      View Premium Case Study
                      <ExternalLink className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Heart className="w-6 h-6 mr-3" />
              Client Excellence
            </Badge>
            
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">Luxury</span>{" "}
              <span className="premium-gradient-text">Testimonials</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Hear from industry leaders who've experienced our 
              <span className="text-accent-cta font-bold"> premium design excellence</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="luxury-card p-10 text-center group hover:scale-105 transition-all duration-700">
                <CardContent className="space-y-8 p-0">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="relative w-24 h-24 rounded-full mx-auto group-hover:scale-110 transition-transform duration-500 shadow-elegant"
                    />
                  </div>
                  
                  <blockquote className="text-xl italic leading-relaxed text-muted-foreground font-light">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="text-xl font-bold text-foreground">{testimonial.author}</div>
                    <div className="text-lg text-muted-foreground">{testimonial.role}</div>
                    <div className="text-lg text-primary font-bold">{testimonial.company}</div>
                  </div>
                  
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Premium Accent */}
                  <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-accent-cta/10 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_var(--primary)_0%,_transparent_70%)] opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_var(--accent-cta)_0%,_transparent_70%)] opacity-20"></div>
        </div>

        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Sparkles className="w-6 h-6 mr-3" />
              Transform Your Business
            </Badge>
            
            <h2 className="text-3xl lg:text-6xl font-black mb-12 leading-tight">
              <span className="text-foreground">Ready for</span>
              <br />
              <span className="premium-gradient-text">Luxury Success?</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-16 leading-relaxed font-light max-w-4xl mx-auto">
              Join the elite brands who've transformed their business with our 
              <span className="text-accent-cta font-bold"> premium design expertise</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button size="lg" className="group text-base font-bold px-20 py-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow-intense" asChild>
                <a href="/contact">
                  Start Premium Project
                  <Trophy className="w-8 h-8 ml-4 group-hover:rotate-12 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-bold px-20 py-8 rounded-2xl border-2 border-primary/40 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                <a href="/portfolio">
                  View Premium Portfolio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="py-20 bg-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-base font-bold">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-4">
              <span className="text-foreground">Got</span>{" "}
              <span className="premium-gradient-text">Questions?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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