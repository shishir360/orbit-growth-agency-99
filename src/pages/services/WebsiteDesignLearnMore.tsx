import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Globe
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";

const WebsiteDesignLearnMore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const designServices = [
    {
      title: "Custom Website Design",
      icon: <Palette className="w-12 h-12" />,
      description: "Unique, brand-focused designs that stand out from the competition and reflect your business personality",
      features: [
        "Custom Visual Design",
        "Brand Integration",
        "User Experience Design",
        "Responsive Layouts",
        "Color Psychology",
        "Typography Selection"
      ],
      deliverables: [
        "Design Mockups",
        "Style Guide",
        "Component Library",
        "Responsive Prototypes",
        "User Flow Diagrams",
        "Brand Guidelines"
      ],
      avgTimeframe: "2-3 weeks",
      startingPrice: "$2,997",
      conversionIncrease: "165%"
    },
    {
      title: "Mobile-First Development",
      icon: <Smartphone className="w-12 h-12" />,
      description: "Responsive websites that provide exceptional user experience across all devices and screen sizes",
      features: [
        "Mobile-First Approach",
        "Cross-Device Testing",
        "Touch-Friendly Interface",
        "Responsive Grid System",
        "Progressive Web App Features",
        "Device Optimization"
      ],
      deliverables: [
        "Mobile Optimized Site",
        "Cross-Browser Testing",
        "Device Performance Reports",
        "Touch Interaction Testing",
        "Mobile Speed Optimization",
        "PWA Implementation"
      ],
      avgTimeframe: "1-2 weeks",
      startingPrice: "$1,497",
      conversionIncrease: "120%"
    },
    {
      title: "Performance Optimization",
      icon: <Zap className="w-12 h-12" />,
      description: "Lightning-fast websites that load in under 3 seconds for better user experience and SEO rankings",
      features: [
        "Image Optimization",
        "Code Minification",
        "CDN Integration",
        "Caching Strategies",
        "Database Optimization",
        "Core Web Vitals"
      ],
      deliverables: [
        "Performance Audit",
        "Speed Optimization",
        "CDN Setup",
        "Image Compression",
        "Code Optimization",
        "Performance Monitoring"
      ],
      avgTimeframe: "1 week",
      startingPrice: "$997",
      conversionIncrease: "85%"
    },
    {
      title: "SEO-Optimized Development",
      icon: <Search className="w-12 h-12" />,
      description: "Websites built with SEO best practices to help you rank higher in search engine results",
      features: [
        "Technical SEO Setup",
        "Schema Markup",
        "Meta Tag Optimization",
        "URL Structure",
        "Sitemap Generation",
        "Core Web Vitals"
      ],
      deliverables: [
        "SEO Audit Report",
        "Technical SEO Implementation",
        "Schema Markup Setup",
        "Google Search Console Setup",
        "Analytics Implementation",
        "SEO Monitoring Dashboard"
      ],
      avgTimeframe: "1-2 weeks",
      startingPrice: "$1,497",
      conversionIncrease: "200%"
    }
  ];

  const websiteTypes = [
    {
      type: "E-commerce",
      description: "Online stores with shopping cart, payment processing, and inventory management",
      features: ["Product Catalogs", "Shopping Cart", "Payment Integration", "Inventory Management"],
      startingPrice: "$4,997",
      timeline: "4-6 weeks",
      examples: ["Fashion Store", "Electronics Shop", "Marketplace"]
    },
    {
      type: "Business Website",
      description: "Professional websites for service-based businesses and corporations",
      features: ["Service Pages", "About Us", "Contact Forms", "Testimonials"],
      startingPrice: "$2,997",
      timeline: "2-4 weeks",
      examples: ["Consulting", "Law Firm", "Medical Practice"]
    },
    {
      type: "Portfolio",
      description: "Showcase websites for creatives, agencies, and professionals",
      features: ["Gallery", "Case Studies", "Bio/About", "Contact"],
      startingPrice: "$1,997",
      timeline: "2-3 weeks",
      examples: ["Designer", "Photographer", "Agency"]
    },
    {
      type: "SaaS Platform",
      description: "Software-as-a-Service websites with user dashboards and subscription features",
      features: ["User Authentication", "Dashboard", "Subscription Billing", "API Integration"],
      startingPrice: "$7,997",
      timeline: "6-8 weeks",
      examples: ["Software Tool", "Web App", "Platform"]
    },
    {
      type: "Restaurant/Food",
      description: "Websites for restaurants with online ordering and reservation systems",
      features: ["Menu Display", "Online Ordering", "Reservations", "Location Info"],
      startingPrice: "$3,497",
      timeline: "3-4 weeks",
      examples: ["Restaurant", "Cafe", "Food Delivery"]
    },
    {
      type: "Real Estate",
      description: "Property websites with listings, search, and lead capture forms",
      features: ["Property Listings", "Search Filters", "Virtual Tours", "Lead Forms"],
      startingPrice: "$4,497",
      timeline: "4-5 weeks",
      examples: ["Real Estate Agency", "Property Management", "Listings"]
    }
  ];

  const developmentProcess = [
    {
      phase: "Discovery & Strategy",
      duration: "Week 1",
      description: "Understanding your business, goals, and target audience to create the perfect strategy",
      activities: [
        "Business Requirements Analysis",
        "Competitor Research",
        "Target Audience Definition",
        "Content Strategy Planning",
        "Technical Requirements"
      ]
    },
    {
      phase: "Design & Prototyping",
      duration: "Week 2-3",
      description: "Creating beautiful, user-focused designs that align with your brand",
      activities: [
        "Wireframe Development",
        "Visual Design Creation",
        "Brand Integration",
        "Responsive Design",
        "User Experience Testing"
      ]
    },
    {
      phase: "Development & Integration",
      duration: "Week 3-5",
      description: "Building your website with clean code and powerful functionality",
      activities: [
        "Frontend Development",
        "Backend Development",
        "CMS Integration",
        "Third-party Integrations",
        "Database Setup"
      ]
    },
    {
      phase: "Testing & Optimization",
      duration: "Week 5-6",
      description: "Thorough testing to ensure everything works perfectly across all devices",
      activities: [
        "Cross-Browser Testing",
        "Mobile Responsiveness",
        "Performance Testing",
        "Security Testing",
        "SEO Optimization"
      ]
    },
    {
      phase: "Launch & Support",
      duration: "Week 6+",
      description: "Going live with ongoing support and optimization",
      activities: [
        "Domain & Hosting Setup",
        "SSL Certificate Installation",
        "Analytics Setup",
        "Training & Documentation",
        "Ongoing Support"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "E-commerce Fashion Store Transformation",
      client: "StyleForward Boutique",
      industry: "Fashion Retail",
      challenge: "Outdated website with poor mobile experience and low conversion rates",
      solution: "Complete redesign with mobile-first approach, improved checkout flow, and performance optimization",
      results: [
        "180% increase in conversion rate",
        "300% improvement in mobile sales",
        "65% reduction in bounce rate",
        "2.3s average page load time"
      ],
      timeline: "6 weeks",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Professional Services Website Overhaul",
      client: "TechConsult Pro",
      industry: "Business Consulting",
      challenge: "Generic template website that didn't reflect their expertise or generate quality leads",
      solution: "Custom design with strong value proposition, case study showcases, and optimized lead capture",
      results: [
        "250% increase in qualified leads",
        "150% longer average session duration",
        "400% improvement in organic traffic",
        "85% increase in consultation bookings"
      ],
      timeline: "4 weeks",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Restaurant Online Presence Revolution",
      client: "Bella Vista Restaurant",
      industry: "Food & Hospitality",
      challenge: "No online ordering system and difficult-to-use reservation process",
      solution: "Complete website rebuild with integrated online ordering, table reservations, and menu showcase",
      results: [
        "300% increase in online orders",
        "200% more table reservations",
        "90% reduction in phone orders",
        "50% increase in average order value"
      ],
      timeline: "5 weeks",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const technologies = [
    { name: "React", description: "Modern JavaScript framework for dynamic user interfaces", category: "Frontend" },
    { name: "Next.js", description: "Full-stack React framework with SSR and SSG capabilities", category: "Framework" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development", category: "Styling" },
    { name: "TypeScript", description: "Type-safe JavaScript for more reliable applications", category: "Language" },
    { name: "Node.js", description: "Server-side JavaScript runtime for backend development", category: "Backend" },
    { name: "Supabase", description: "Open-source backend-as-a-service for databases and auth", category: "Database" },
    { name: "Stripe", description: "Payment processing for e-commerce and subscriptions", category: "Payments" },
    { name: "Vercel", description: "Fast, reliable hosting with global CDN", category: "Hosting" }
  ];

  const pricing = [
    {
      title: "Landing Page",
      price: "$1,997",
      description: "Perfect for new businesses or specific campaigns",
      features: [
        "Single page design",
        "Mobile responsive",
        "Contact form",
        "Basic SEO setup",
        "1 month support"
      ],
      timeline: "1-2 weeks",
      popular: false
    },
    {
      title: "Business Website",
      price: "$2,997",
      description: "Complete website for established businesses",
      features: [
        "5-8 page website",
        "Custom design",
        "CMS integration",
        "SEO optimization",
        "3 months support",
        "Performance optimization"
      ],
      timeline: "3-4 weeks",
      popular: true
    },
    {
      title: "E-commerce Store",
      price: "$4,997",
      description: "Full online store with payment processing",
      features: [
        "Product catalog",
        "Shopping cart",
        "Payment integration",
        "Inventory management",
        "Admin dashboard",
        "6 months support"
      ],
      timeline: "4-6 weeks",
      popular: false
    },
    {
      title: "Custom Platform",
      price: "Custom",
      description: "Complex web applications and platforms",
      features: [
        "Custom functionality",
        "User authentication",
        "Database design",
        "API development",
        "Ongoing support",
        "Scalable architecture"
      ],
      timeline: "6-12 weeks",
      popular: false
    }
  ];

  useEffect(() => {
    document.title = "Website Design & Development Services - Complete Guide | LUNEXO MEDIA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to LUNEXO MEDIA website design and development services. Learn about our process, pricing, and how we create conversion-focused websites.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Website Design & Development Services - Complete Guide | LUNEXO MEDIA"
        description="Complete guide to LUNEXO MEDIA website design and development services. Learn about our process, pricing, and how we create conversion-focused websites."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/website-design-learn-more"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background/50 to-muted/30 relative overflow-hidden">
        <ThreeDBackground />
        <div className="container-wide section-padding relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/20 text-lg px-4 py-2">
              <Monitor className="w-5 h-5 mr-2" />
              Complete Website Design Guide
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Build Websites That Convert
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Everything you need to know about our website design and development services that turn visitors into customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg text-lg px-8 py-4" asChild>
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white text-lg px-8 py-4" asChild>
                <Link to="/website-design">View Service Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Services Section */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Design & Development Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive website solutions that combine stunning design with powerful functionality
            </p>
          </div>

          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="design">Custom Design</TabsTrigger>
              <TabsTrigger value="mobile">Mobile-First</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO Optimized</TabsTrigger>
            </TabsList>

            {designServices.map((service, index) => (
              <TabsContent key={index} value={service.title.toLowerCase().split(' ')[0] === 'custom' ? 'design' : service.title.toLowerCase().split('-')[0]} className="space-y-8">
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center text-white mb-6">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <div className="grid grid-cols-1 gap-4 text-center w-full">
                        <div className="p-3 bg-white/50 rounded-lg">
                          <div className="text-xl font-bold text-primary">{service.startingPrice}</div>
                          <div className="text-xs text-muted-foreground">Starting Price</div>
                        </div>
                        <div className="p-3 bg-white/50 rounded-lg">
                          <div className="text-xl font-bold text-primary">{service.avgTimeframe}</div>
                          <div className="text-xs text-muted-foreground">Timeline</div>
                        </div>
                        <div className="p-3 bg-white/50 rounded-lg">
                          <div className="text-xl font-bold text-primary">{service.conversionIncrease}</div>
                          <div className="text-xs text-muted-foreground">Avg Conversion Boost</div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-primary">Features & Capabilities</h4>
                          <div className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-green-600">What You'll Receive</h4>
                          <div className="space-y-3">
                            {service.deliverables.map((deliverable, deliverableIndex) => (
                              <div key={deliverableIndex} className="flex items-center gap-3">
                                <Star className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Website Types */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Types of Websites We Build
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple landing pages to complex e-commerce platforms, we build websites for every business need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {type.type}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">{type.startingPrice}</div>
                        <div className="text-xs text-muted-foreground">Starting Price</div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">{type.timeline}</div>
                        <div className="text-xs text-muted-foreground">Timeline</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <div className="space-y-2">
                        {type.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example, exampleIndex) => (
                          <Badge key={exampleIndex} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Development Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven 5-phase process that ensures your website is delivered on time and exceeds expectations
            </p>
          </div>

          <div className="space-y-8">
            {developmentProcess.map((phase, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                  <div className="lg:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{phase.phase}</h3>
                    <p className="text-muted-foreground text-sm">{phase.description}</p>
                  </div>
                  <div className="lg:col-span-3 p-6">
                    <h4 className="font-semibold mb-4">Key Activities:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real businesses achieving remarkable results with our website design and development services
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  <div className="lg:col-span-1">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-2 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline">{study.industry}</Badge>
                      <Badge variant="secondary">{study.timeline}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{study.client}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Challenge:</h4>
                        <p className="text-muted-foreground text-sm mb-4">{study.challenge}</p>
                        <h4 className="font-semibold mb-2 text-blue-600">Solution:</h4>
                        <p className="text-muted-foreground text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Results:</h4>
                        <div className="space-y-2">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Technologies We Use
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We use cutting-edge technologies to build fast, secure, and scalable websites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Badge variant="outline" className="mb-4">{tech.category}</Badge>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Clear, upfront pricing with no hidden fees. Choose the package that fits your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {plan.price}
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="text-sm text-muted-foreground">
                    Timeline: {plan.timeline}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <a href="https://lunexomedia.com/contact">
                      {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-wide section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Let's create a website that not only looks amazing but also drives real business results for your company
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg" asChild>
              <a href="https://lunexomedia.com/contact">Start Your Project</a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white" asChild>
              <a href="https://lunexomedia.com/portfolio">View Our Portfolio</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsiteDesignLearnMore;