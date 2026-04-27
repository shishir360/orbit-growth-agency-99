import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Monitor, 
  Smartphone, 
  Zap, 
  Search, 
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  PlayCircle,
  Layers,
  Code,
  Palette,
  Globe,
  Play,
  ChevronRight,
  Check,
  Activity,
  Cpu,
  ShieldCheck,
  Database
} from "lucide-react";

const WebsiteDesignLearnMore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const designServices = [
    {
      title: "Custom Absolute Design",
      icon: <Palette className="w-12 h-12" />,
      description: "Unique, absolute brand-focused architectures that reflect your business identity and dominate the repository.",
      features: [
        "Absolute Visual Design",
        "Identity Architecture",
        "User Experience Logic",
        "Responsive Grid Protocols",
        "Color Intelligence",
        "Typography Orchestration"
      ],
      deliverables: [
        "Architecture Mockups",
        "Style Protocol Guide",
        "Component Repository",
        "Responsive Prototypes",
        "User Flow Logic",
        "Brand Sovereignty"
      ],
      avgTimeframe: "2-3 weeks",
      startingPrice: "$2,997",
      conversionIncrease: "165%"
    },
    {
      title: "Mobile-First Architecture",
      icon: <Smartphone className="w-12 h-12" />,
      description: "Responsive absolute architectures that provide exceptional user experience across all digital nodes.",
      features: [
        "Mobile-First Protocol",
        "Cross-Device Verification",
        "Touch-Friendly Interface",
        "Responsive Grid System",
        "Progressive Web Logic",
        "Device Optimization"
      ],
      deliverables: [
        "Mobile Optimized Node",
        "Cross-Browser Sync",
        "Device Performance Intel",
        "Touch Interaction Logic",
        "Mobile Velocity Protocols",
        "PWA Orchestration"
      ],
      avgTimeframe: "1-2 weeks",
      startingPrice: "$1,497",
      conversionIncrease: "120%"
    },
    {
      title: "Velocity Optimization",
      icon: <Zap className="w-12 h-12" />,
      description: "Lightning-fast absolute architectures that initialize in under 1 second for better user retention and search visibility.",
      features: [
        "Absolute Image Logic",
        "Code Minification Sync",
        "Global CDN Integration",
        "Advanced Caching Protocols",
        "Database Architecture",
        "Core Web Vitals Sync"
      ],
      deliverables: [
        "Performance Intelligence Audit",
        "Velocity Optimization",
        "CDN Orchestration",
        "Image Logic Compression",
        "Code Architecture Audit",
        "Velocity Monitoring"
      ],
      avgTimeframe: "1 week",
      startingPrice: "$997",
      conversionIncrease: "85%"
    },
    {
      title: "Visibility Engineering",
      icon: <Search className="w-12 h-12" />,
      description: "Absolute architectures built with visibility engineering best practices to help you dominate the repository results.",
      features: [
        "Technical Visibility Setup",
        "Schema Protocol Markup",
        "Identity Meta Tag Logic",
        "Absolute URL Structure",
        "Repository Sitemap Sync",
        "Operational Health Sync"
      ],
      deliverables: [
        "Visibility Audit Report",
        "Technical Logic Implementation",
        "Schema Protocol Setup",
        "Search Console Orchestration",
        "Intelligence Analytics Sync",
        "Visibility Monitoring Node"
      ],
      avgTimeframe: "1-2 weeks",
      startingPrice: "$1,497",
      conversionIncrease: "200%"
    }
  ];

  const websiteTypes = [
    {
      type: "E-commerce Repository",
      description: "Online stores with absolute shopping logic, payment orchestration, and inventory sync.",
      features: ["Absolute Product Catalogs", "Shopping Logic", "Payment Orchestration", "Inventory Sync"],
      startingPrice: "$4,997",
      timeline: "4-6 weeks",
      examples: ["Fashion Repository", "Electronics Node", "Marketplace"]
    },
    {
      type: "Business Architecture",
      description: "Professional absolute architectures for service-based businesses and global corporations.",
      features: ["Service Logic Pages", "About Protocol", "Inquiry Form Nodes", "Testimony Sliders"],
      startingPrice: "$2,997",
      timeline: "2-4 weeks",
      examples: ["Consulting Node", "Law Firm Repository", "Medical Architecture"]
    },
    {
      type: "Absolute Portfolio",
      description: "Showcase architectures for creatives, agencies, and absolute professionals.",
      features: ["Visual Repository", "Case Study Nodes", "Bio Protocol", "Uplink Node"],
      startingPrice: "$1,997",
      timeline: "2-3 weeks",
      examples: ["Designer Node", "Photographer Repository", "Agency"]
    },
    {
      type: "SaaS Intelligence",
      description: "Software-as-a-Service architectures with absolute user dashboards and subscription logic.",
      features: ["Identity Authentication", "Dashboard Protocol", "Subscription Billing Logic", "API Orchestration"],
      startingPrice: "$7,997",
      timeline: "6-8 weeks",
      examples: ["Software Node", "Web Logic App", "Intelligence Platform"]
    },
    {
      type: "Hospitality Node",
      description: "Architectures for restaurants with absolute ordering and reservation protocols.",
      features: ["Menu Logic Display", "Ordering Protocol", "Reservation Sync", "Location Intel"],
      startingPrice: "$3,497",
      timeline: "3-4 weeks",
      examples: ["Hospitality Node", "Cafe Repository", "Delivery Logic"]
    },
    {
      type: "Real Estate Intel",
      description: "Property architectures with absolute listings, search, and lead capture protocols.",
      features: ["Listing Repository", "Search Logic Filters", "Virtual Tour Nodes", "Inquiry Forms"],
      startingPrice: "$4,497",
      timeline: "4-5 weeks",
      examples: ["Agency Repository", "Property Logic", "Listings Node"]
    }
  ];

  const developmentProcess = [
    {
      phase: "Discovery & Logic",
      duration: "Week 1",
      description: "Understanding your business goals and audience to create the absolute trajectory.",
      activities: [
        "Business Logic Analysis",
        "Competitor Repository Research",
        "Target Identity Definition",
        "Content Protocol Planning",
        "Technical Requirements Sync"
      ]
    },
    {
      phase: "Architecture Design",
      duration: "Week 2-3",
      description: "Creating beautiful, user-focused architectures that align with your absolute identity.",
      activities: [
        "Wireframe Protocol",
        "Visual Design Orchestration",
        "Identity Integration",
        "Responsive Grid Sync",
        "User Experience Verification"
      ]
    },
    {
      phase: "Execution & Sync",
      duration: "Week 3-5",
      description: "Building your absolute architecture with clean code and powerful operational logic.",
      activities: [
        "Frontend Logic Execution",
        "Backend Architecture",
        "CMS Protocol Sync",
        "Third-party Orchestration",
        "Database Architecture"
      ]
    },
    {
      phase: "Verification & Velocity",
      duration: "Week 5-6",
      description: "Thorough verification to ensure absolute performance across all digital nodes.",
      activities: [
        "Cross-Device Verification",
        "Mobile-First Grid Sync",
        "Velocity Testing",
        "Security Logic Audit",
        "Visibility Engineering Sync"
      ]
    },
    {
      phase: "Launch & Support",
      duration: "Week 6+",
      description: "Initializing the absolute architecture with ongoing support and optimization.",
      activities: [
        "Domain & Hosting Initialized",
        "SSL Protocol Installation",
        "Analytics Logic Setup",
        "Protocol Training",
        "Absolute Sync Support"
      ]
    }
  ];

  const technologies = [
    { name: "React", description: "Modern logic framework for dynamic absolute interfaces", category: "Frontend" },
    { name: "Next.js", description: "Full-stack absolute framework with SSR and SSG logic", category: "Framework" },
    { name: "Tailwind CSS", description: "Utility-first CSS protocol for rapid UI orchestration", category: "Styling" },
    { name: "TypeScript", description: "Type-safe absolute logic for more reliable applications", category: "Language" },
    { name: "Node.js", description: "Server-side logic runtime for absolute backend", category: "Backend" },
    { name: "Supabase", description: "Open-source absolute backend for databases and auth", category: "Database" },
    { name: "Stripe", description: "Payment orchestration for absolute e-commerce", category: "Payments" },
    { name: "Vercel", description: "Fast, reliable hosting with global absolute CDN", category: "Hosting" }
  ];

  const pricing = [
    {
      title: "Landing Page Node",
      price: "$1,997",
      description: "Perfect for absolute new businesses or campaign trajectories.",
      features: [
        "Single page architecture",
        "Mobile-First Grid",
        "Inquiry form node",
        "Basic Visibility setup",
        "1 month absolute sync"
      ],
      timeline: "1-2 weeks",
      popular: false
    },
    {
      title: "Business Architecture",
      price: "$2,997",
      description: "Complete architecture for established absolute businesses.",
      features: [
        "5-8 page repository",
        "Custom Absolute design",
        "CMS protocol sync",
        "Visibility engineering",
        "3 months absolute sync",
        "Velocity optimization"
      ],
      timeline: "3-4 weeks",
      popular: true
    },
    {
      title: "E-commerce Repository",
      price: "$4,997",
      description: "Full online store with absolute payment orchestration.",
      features: [
        "Product repository",
        "Shopping logic",
        "Payment orchestration",
        "Inventory logic sync",
        "Admin control node",
        "6 months absolute sync"
      ],
      timeline: "4-6 weeks",
      popular: false
    },
    {
      title: "Custom Platform Node",
      price: "Custom",
      description: "Complex absolute applications and platform repositories.",
      features: [
        "Custom logic functionality",
        "Identity authentication",
        "Database architecture",
        "API logic development",
        "Ongoing absolute sync",
        "Scalable grid logic"
      ],
      timeline: "6-12 weeks",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Website Design & Architecture - Complete Guide | LUNEXO MEDIA"
        description="Complete guide to LUNEXO MEDIA absolute website design and architecture services. Learn about our process, pricing, and how we create absolute conversion-focused systems."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/website-design-learn-more"
        keywords="website design services, web development, responsive design, custom websites, UI/UX design"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Monitor className="w-5 h-5 mr-4" />
                The Absolute Digital Architect
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              High-Velocity <br /> <span className="text-primary italic">Web Systems.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Everything you need to know about our absolute design and engineering protocols that turn casual repository visitors into <span className="text-primary italic font-bold">absolute customers.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-10 justify-center pt-12"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild
              >
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize Architecture
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Layers className="w-5 h-5 mr-4" />
                  Absolute Core Capabilities
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Architecture <span className="text-primary italic">Sync.</span>
            </h2>
          </div>

          <Tabs defaultValue="design" className="w-full">
            <div className="flex justify-center mb-24">
              <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-[3rem] h-auto shadow-glass flex flex-wrap justify-center gap-4">
                <TabsTrigger value="design" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Custom Design</TabsTrigger>
                <TabsTrigger value="mobile" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Mobile-First</TabsTrigger>
                <TabsTrigger value="performance" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Performance</TabsTrigger>
                <TabsTrigger value="seo" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Visibility Engineering</TabsTrigger>
              </TabsList>
            </div>

            {designServices.map((service, index) => {
              const value = service.title.toLowerCase().includes('design') ? 'design' : 
                            service.title.toLowerCase().includes('mobile') ? 'mobile' : 
                            service.title.toLowerCase().includes('velocity') ? 'performance' : 'seo';
              return (
                <TabsContent key={index} value={value}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden shadow-glass"
                  >
                    <div className="grid lg:grid-cols-3">
                      <div className="p-20 lg:p-32 lg:border-r border-white/60 flex flex-col justify-center text-center lg:text-left space-y-12">
                        <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto lg:mx-0 shadow-2xl">
                          {service.icon}
                        </div>
                        <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight">{service.title}</h3>
                        <p className="text-2xl text-slate-500 leading-relaxed font-medium">{service.description}</p>
                        <div className="grid grid-cols-2 gap-6 pt-6">
                          <div className="p-8 bg-white/60 rounded-[2.5rem] border border-white/60 shadow-sm">
                            <div className="text-3xl font-heading font-black text-primary">{service.startingPrice}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Initialize</div>
                          </div>
                          <div className="p-8 bg-white/60 rounded-[2.5rem] border border-white/60 shadow-sm">
                            <div className="text-3xl font-heading font-black text-primary">{service.conversionIncrease}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Velocity Boost</div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 p-20 lg:p-32 space-y-20 bg-white/20">
                        <div className="grid md:grid-cols-2 gap-20">
                          <div className="space-y-12">
                            <div className="space-y-4">
                               <h4 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-6">
                                <div className="w-3 h-10 bg-primary rounded-full shadow-lg shadow-primary/20" />
                                Key Protocols
                              </h4>
                              <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                            </div>
                            <div className="space-y-8">
                              {service.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-6 text-2xl text-slate-500 font-medium group/feat">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                                     <CheckCircle className="w-5 h-5 text-primary group-hover/feat:text-white" />
                                  </div>
                                  <span className="group-hover/feat:text-slate-900 transition-colors">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-12">
                            <div className="space-y-4">
                               <h4 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-6">
                                <div className="w-3 h-10 bg-[#FF719A] rounded-full shadow-lg shadow-accent/20" />
                                Absolute Nodes
                              </h4>
                               <div className="h-[2px] w-full bg-gradient-to-r from-[#FF719A]/40 to-transparent" />
                            </div>
                            <div className="space-y-8">
                              {service.deliverables.map((d, i) => (
                                <div key={i} className="flex items-center gap-6 text-2xl text-slate-500 font-medium group/feat">
                                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover/feat:bg-accent transition-all duration-500">
                                     <Star className="w-5 h-5 text-accent group-hover/feat:text-white" />
                                  </div>
                                  <span className="group-hover/feat:text-slate-900 transition-colors">{d}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pt-16 border-t border-white/60 flex items-center gap-12 opacity-30">
                           <Activity className="w-8 h-8" />
                           <Cpu className="w-8 h-8" />
                           <Database className="w-8 h-8" />
                           <ShieldCheck className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Industry Benchmarks */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Globe className="w-5 h-5 mr-4" />
                  Absolute Industry Benchmarks
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Repository <span className="text-primary italic">Nodes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {websiteTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 flex flex-col justify-between hover:translate-y-[-15px]"
              >
                <div className="space-y-10">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-all duration-700 tracking-tight leading-tight">{type.type}</h3>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium h-32 overflow-hidden">{type.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="p-8 bg-white/60 rounded-[2.5rem] border border-white/60 shadow-sm">
                      <div className="text-3xl font-heading font-black text-primary">{type.startingPrice}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Initialize</div>
                    </div>
                    <div className="p-8 bg-white/60 rounded-[2.5rem] border border-white/60 shadow-sm">
                      <div className="text-3xl font-heading font-black text-primary">{type.timeline}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Trajectory</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 pt-6">
                    <div className="space-y-2">
                       <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Primary Logic Focus:</h4>
                       <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {type.features.map((f, i) => (
                        <Badge key={i} className="bg-primary/10 text-primary border-primary/20 px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em]">
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/60 opacity-20 flex justify-end">
                   <Activity className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Pipeline */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Cpu className="w-5 h-5 mr-4" />
                  Operational Engineering
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              The Engineering <span className="text-primary italic">Pipeline.</span>
            </h2>
          </div>

          <div className="space-y-16 max-w-7xl mx-auto">
            {developmentProcess.map((phase, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="grid lg:grid-cols-4 gap-20 relative z-10">
                  <div className="space-y-8 flex flex-col justify-center">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center font-black text-4xl shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                        {index + 1}
                      </div>
                      <Badge className="bg-accent/10 text-accent border-accent/20 px-8 py-3 font-black uppercase tracking-[0.2em] rounded-full text-[10px]">{phase.duration}</Badge>
                    </div>
                    <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{phase.phase}</h3>
                  </div>
                  <div className="lg:col-span-3 space-y-12">
                    <p className="text-3xl text-slate-500 leading-relaxed font-medium max-w-4xl">{phase.description}</p>
                    <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/60">
                      {phase.activities.map((a, i) => (
                        <div key={i} className="flex items-center gap-6 text-2xl text-slate-700 font-bold group/act">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/act:bg-primary transition-all duration-500">
                             <CheckCircle className="w-5 h-5 text-primary group-hover/act:text-white" />
                          </div>
                          <span className="group-hover/act:text-slate-900 transition-colors">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Absolute Stack */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 mr-4" />
                  Absolute Core Infrastructure
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              The High-End <span className="text-primary italic">Stack.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-16 hover:shadow-glass transition-all duration-1000 text-center flex flex-col items-center gap-10 hover:translate-y-[-10px]"
              >
                <Badge className="bg-slate-900 text-white border-none px-10 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl group-hover:bg-primary transition-all duration-700">{tech.category}</Badge>
                <div className="space-y-6 flex-1">
                   <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight transition-colors duration-700">
                    {tech.name}
                  </h3>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                    {tech.description}
                  </p>
                </div>
                <div className="pt-8 border-t border-white/60 w-full opacity-20">
                   <Cpu className="w-8 h-8 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Absolute Investment */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <TrendingUp className="w-5 h-5 mr-4" />
                  Absolute Scaling Logic
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Absolute <span className="text-primary italic">Investment.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className={`group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-20 hover:shadow-glass transition-all duration-1000 flex flex-col items-center text-center ${plan.popular ? 'border-primary shadow-glass scale-105 z-10' : 'hover:translate-y-[-15px]'}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em] shadow-2xl">
                    Most Popular Protocol
                  </Badge>
                )}
                
                <div className="space-y-12 flex-1 w-full">
                  <div className="space-y-4">
                     <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{plan.title}</h3>
                     <div className="h-[2px] w-12 bg-primary mx-auto opacity-40" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-6xl lg:text-7xl font-heading font-black text-primary tracking-tighter">{plan.price}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{plan.timeline} Protocol</div>
                  </div>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">{plan.description}</p>
                  
                  <div className="space-y-8 text-left pt-12 border-t border-white/60 w-full">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Protocol Nodes:</h4>
                    <div className="space-y-6">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-6 text-2xl text-slate-700 font-bold group/feat">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                             <CheckCircle className="w-5 h-5 text-primary group-hover/feat:text-white" />
                          </div>
                          <span className="group-hover/feat:text-slate-900 transition-colors">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button className={`mt-16 py-12 px-16 rounded-[2rem] font-bold text-2xl shadow-2xl transition-all duration-700 w-full hover:scale-110 ${plan.popular ? 'bg-primary text-white' : 'bg-slate-900 text-white'}`} asChild>
                  <Link to="/contact" className="flex items-center justify-center gap-4">
                    Initialize Protocol
                    <ArrowRight className="w-8 h-8" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                The Absolute Launch
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Initialize?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Let's create an absolute architecture that not only looks stunning but also orchestrates real business results for your trajectory.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize Trajectory
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/portfolio">
                  View Success Repository
                </Link>
              </Button>
            </div>
            <div className="pt-24 flex items-center justify-center gap-16 opacity-30 text-white">
               <ShieldCheck className="w-10 h-10" />
               <Cpu className="w-10 h-10" />
               <Database className="w-10 h-10" />
               <Activity className="w-10 h-10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsiteDesignLearnMore;