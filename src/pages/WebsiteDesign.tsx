import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import ServiceSchema from "@/components/ui/service-schema";
import FAQSchema from "@/components/ui/faq-schema";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  Play,
  Sparkles,
  Globe,
  Palette,
  Code,
  Smartphone,
  Search,
  Gauge,
  Users,
  Shield,
  Zap,
  Target,
  LineChart,
  Clock,
  Award,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface TrustedLogo {
  id: string;
  name: string;
  logo_url: string;
  visible: boolean;
}

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image_url: string | null;
  technologies: string[] | null;
}

const WebsiteDesign = () => {
  const [activeService, setActiveService] = useState(0);
  const [trustedLogos, setTrustedLogos] = useState<TrustedLogo[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch trusted logos from database
  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from('trusted_logos')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });
      
      if (data && !error) {
        setTrustedLogos(data);
      }
    };
    fetchLogos();
  }, []);

  // Fetch portfolio projects from database
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('published', true)
        .eq('blocked', false)
        .limit(6)
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setPortfolioProjects(data);
      }
      setIsLoaded(true);
    };
    fetchProjects();
  }, []);

  const services = [
    {
      number: "01",
      title: "Responsive Web Design",
      description: "Create stunning, mobile-first websites that look perfect on every device. Our responsive designs ensure seamless user experiences across desktops, tablets, and smartphones.",
      features: ["Mobile-First Approach", "Cross-Browser Compatible", "Retina Ready Graphics", "Fluid Layouts"]
    },
    {
      number: "02",
      title: "UX/UI Design & Audit",
      description: "Transform your digital presence with intuitive interfaces. We analyze user behavior and create designs that drive engagement and conversions.",
      features: ["User Research", "Wireframing", "Interactive Prototypes", "Usability Testing"]
    },
    {
      number: "03",
      title: "Custom Web Development",
      description: "Build powerful, scalable web applications using cutting-edge technologies. From simple landing pages to complex platforms, we deliver excellence.",
      features: ["React/Next.js", "Performance Optimization", "API Integration", "Scalable Architecture"]
    },
    {
      number: "04",
      title: "E-commerce Solutions",
      description: "Launch your online store with confidence. We create conversion-focused e-commerce experiences that turn visitors into loyal customers.",
      features: ["Shopify/WooCommerce", "Payment Integration", "Inventory Management", "Analytics Dashboard"]
    },
    {
      number: "05",
      title: "SEO & Performance",
      description: "Boost your visibility and speed. We optimize every aspect of your website to rank higher and load faster than competitors.",
      features: ["Technical SEO", "Core Web Vitals", "Speed Optimization", "Schema Markup"]
    }
  ];

  const caseStudies = [
    {
      title: "Nuport",
      category: "Fintech Platform",
      description: "Complete redesign of a supply chain finance platform, resulting in 340% increase in user engagement.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "340%", label: "Engagement" },
        { value: "2.5x", label: "Conversion" }
      ]
    },
    {
      title: "HealthTech Pro",
      category: "Healthcare SaaS",
      description: "Modern healthcare dashboard with improved patient management and real-time analytics.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "89%", label: "Satisfaction" },
        { value: "4.9", label: "App Rating" }
      ]
    },
    {
      title: "Commerce Plus",
      category: "E-commerce",
      description: "End-to-end e-commerce solution with AI-powered recommendations and seamless checkout.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "$2.4M", label: "Revenue" },
        { value: "180%", label: "Growth" }
      ]
    }
  ];

  const industries = [
    { name: "Fintech", icon: <LineChart className="w-6 h-6" /> },
    { name: "Healthcare", icon: <Shield className="w-6 h-6" /> },
    { name: "E-commerce", icon: <Globe className="w-6 h-6" /> },
    { name: "SaaS", icon: <Code className="w-6 h-6" /> },
    { name: "Education", icon: <Users className="w-6 h-6" /> },
    { name: "Real Estate", icon: <Target className="w-6 h-6" /> }
  ];

  const processSteps = [
    { step: "01", title: "Discovery", description: "We dive deep into your business goals, target audience, and competitive landscape." },
    { step: "02", title: "Strategy", description: "Develop a comprehensive plan including sitemap, user flows, and content strategy." },
    { step: "03", title: "Design", description: "Create stunning visual designs with multiple iterations until perfection." },
    { step: "04", title: "Development", description: "Build your website with clean, scalable code and modern technologies." },
    { step: "05", title: "Launch", description: "Rigorous testing, optimization, and seamless deployment to production." }
  ];

  const faqs = [
    {
      question: "How long does a website project take?",
      answer: "Typically 4-8 weeks depending on complexity. Simple landing pages can be done in 2-3 weeks, while complex web applications may take 12+ weeks."
    },
    {
      question: "What technologies do you use?",
      answer: "We primarily use React, Next.js, and TypeScript for frontend. For backend, we leverage Node.js, Supabase, and various cloud services."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer monthly maintenance packages that include updates, security patches, content changes, and performance monitoring."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely. We specialize in redesigns that preserve your brand while dramatically improving user experience and conversions."
    }
  ];

  useEffect(() => {
    document.title = "Website Design & Development Services | Lunexo Media";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Website Design & Development Services | Lunexo Media"
        description="Transform your digital presence with stunning, conversion-focused websites. Expert web design and development services that drive results."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/website-design"
        keywords="web design, website development, responsive design, UI/UX design, custom websites"
      />
      
      <ServiceSchema
        name="Website Design & Development"
        description="Professional web design and development services. We create fast, mobile-friendly, and conversion-focused websites tailored to your business needs."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="Web Design, Web Development, UI/UX Design"
        url="https://www.lunexomedia.com/website-design"
        image="https://www.lunexomedia.com/og-image-new.jpg"
        priceRange="$$"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 127
        }}
      />
      
      <Navigation />
      
      {/* Hero Section - MuseMind Style */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <BreadcrumbSEO 
                items={[
                  { label: "Services", href: "/services-explore" }
                ]}
                currentPage="Website Design"
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  Premium Web Design Agency
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-5xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight"
                >
                  Website Design and Development Services
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-xl text-gray-600 leading-relaxed max-w-xl"
                >
                  Is your website confusing visitors instead of converting them? With the right mix of user experience and stunning design, you'll ignite growth. Let us take you there.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button 
                    size="lg" 
                    className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-7 rounded-full font-semibold group"
                    asChild
                  >
                    <Link to="/contact">
                      Design My Website Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-gray-300 text-black hover:bg-gray-100 text-lg px-8 py-7 rounded-full font-semibold"
                    asChild
                  >
                    <Link to="/portfolio">
                      View Our Work
                      <ArrowUpRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex items-center gap-8 pt-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">50+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">4.9/5 Rating</span>
                  </div>
                </motion.div>
              </div>

              {/* Right - Hero Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                    alt="Website Design Services"
                    className="w-full h-[500px] object-cover"
                  />
                  {/* Overlay Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Average ROI Increase</p>
                        <p className="text-3xl font-bold text-black">+340%</p>
                      </div>
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg"
                >
                  ✨ Award Winning
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - Logo Grid */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-sm text-gray-500 uppercase tracking-[0.2em] mb-12 font-semibold">
              Trusted by 50+ Global Brands
            </p>
            
            {trustedLogos.length > 0 ? (
              <div className="space-y-8">
                {/* Row 1 - Scroll Left */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-scroll-left gap-16 items-center">
                    {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((logo, index) => (
                      <div 
                        key={`row1-${index}`} 
                        className="flex-shrink-0 flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                      >
                        <img 
                          src={logo.logo_url} 
                          alt={logo.name}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Scroll Right */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-scroll-right gap-16 items-center">
                    {[...trustedLogos.slice().reverse(), ...trustedLogos.slice().reverse(), ...trustedLogos.slice().reverse()].map((logo, index) => (
                      <div 
                        key={`row2-${index}`} 
                        className="flex-shrink-0 flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                      >
                        <img 
                          src={logo.logo_url} 
                          alt={logo.name}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400 text-sm">
                Add logos from your admin panel at /admin-dashboard → Trusted Logos
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Services Section - Numbered List Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                Our Services
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold text-black mb-6">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive web design and development services tailored to your unique business needs.
              </p>
            </motion.div>

            {/* Services List */}
            <div className="space-y-0">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group border-t border-gray-200 ${index === services.length - 1 ? 'border-b' : ''}`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className="py-10 lg:py-16 cursor-pointer">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">
                      {/* Number */}
                      <span className="text-5xl lg:text-7xl font-bold text-gray-200 group-hover:text-black transition-colors duration-300">
                        {service.number}
                      </span>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-4xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                          {service.description}
                        </p>
                        
                        {/* Features */}
                        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden transition-all duration-500 ${activeService === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                          {service.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center gap-2 text-sm text-gray-700">
                              <Check className="w-4 h-4 text-green-600" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="hidden lg:flex items-center">
                        <div className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                          <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Database Driven with Animations */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  Our Portfolio
                </span>
                <h2 className="text-4xl lg:text-6xl font-bold text-black">
                  Featured Work
                </h2>
              </div>
              <Button 
                variant="outline" 
                className={`mt-6 lg:mt-0 border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                asChild
              >
                <Link to="/portfolio">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Portfolio Cards with Staggered Animation */}
            {portfolioProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioProjects.map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/portfolio/${project.slug}`}
                    className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {project.image_url ? (
                        <img 
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <Globe className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                          {project.category}
                        </span>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                          <ArrowUpRight className="w-6 h-6 text-black" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                          {project.technologies.slice(0, 3).map((tech, tIndex) => (
                            <span 
                              key={tIndex} 
                              className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs font-medium text-gray-400">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No projects yet. Add projects from your admin panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <span className="inline-block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Our Process
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                How We Work
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A proven methodology that delivers results consistently.
              </p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid lg:grid-cols-5 gap-8">
              {processSteps.map((process, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[2px] bg-gray-800"></div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-white text-black text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                    <p className="text-gray-400 text-sm">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                Industries
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold text-black mb-6">
                Expertise Across Sectors
              </h2>
            </motion.div>

            {/* Industry Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {industries.map((industry, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-gray-50 hover:bg-black rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                    <span className="text-black">{industry.icon}</span>
                  </div>
                  <p className="font-semibold text-black group-hover:text-white transition-colors">
                    {industry.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                FAQ
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-black">
                Frequently Asked Questions
              </h2>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-lg font-semibold text-black pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's create something extraordinary together. Get a free consultation and see how we can help your business grow.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-10 py-7 rounded-full font-semibold group"
                asChild
              >
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-10 py-7 rounded-full font-semibold transition-all duration-300"
                asChild
              >
                <Link to="/book-call">
                  <Clock className="w-5 h-5 mr-2" />
                  Book a Call
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-12"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-green-500" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-green-500" />
                No Hidden Fees
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-green-500" />
                Quick Turnaround
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FAQSchema faqs={faqs} />
      <Footer />

      {/* Custom Scroll Animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default WebsiteDesign;
