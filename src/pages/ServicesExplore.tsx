import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/ui/hero-section";
import SEO from "@/components/ui/seo";
import { 
  Monitor, 
  Target, 
  Bot, 
  Search, 
  Smartphone, 
  Zap, 
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  CheckCircle,
  PlayCircle,
  Layers
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";
import ThreeDParticles from "@/components/ui/3d-particles";

const ServicesExplore = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allServices = [
    {
      id: "website-design",
      icon: <Monitor className="w-12 h-12" />,
      title: "Website Design & Development",
      shortDesc: "Modern, responsive websites that convert",
      description: "Transform your online presence with stunning, conversion-focused websites that drive real business results. We combine cutting-edge design with proven psychology.",
      features: ["Mobile Optimized", "Fast Loading", "SEO Friendly", "Conversion Focused"],
      startingPrice: "$2,997",
      timeline: "2-6 weeks",
      popular: false,
      color: "from-blue-500 to-blue-600",
      href: "/website-design",
      learnMore: "/services/website-design-learn-more",
      stats: { projects: "200+", satisfaction: "4.9/5", conversion: "165%" }
    },
    {
      id: "ads-management",
      icon: <Target className="w-12 h-12" />,
      title: "Ads Management",
      shortDesc: "Data-driven advertising that delivers ROI",
      description: "Maximize your ROI with expertly managed Google and Facebook ad campaigns. We help businesses scale efficiently while reducing acquisition costs.",
      features: ["Multi-Platform Management", "Advanced Targeting", "ROI Optimization", "Performance Analytics"],
      startingPrice: "$1,497",
      timeline: "1-2 weeks",
      popular: true,
      color: "from-green-500 to-green-600",
      href: "/ads-management",
      learnMore: "/services/ads-management-learn-more",
      stats: { roas: "4.2x", reduction: "35%", leads: "180%" }
    },
    {
      id: "ai-automation",
      icon: <Bot className="w-12 h-12" />,
      title: "AI Automation",
      shortDesc: "Automate workflows with intelligent AI",
      description: "Reduce workload, increase sales, and provide 24/7 customer support with our custom AI automation solutions. From chatbots to voice agents.",
      features: ["AI Chatbots", "Email Automation", "Voice Agents", "Workflow Automation"],
      startingPrice: "$997",
      timeline: "3-8 weeks",
      popular: false,
      color: "from-purple-500 to-purple-600",
      href: "/ai-automation",
      learnMore: "/services/ai-automation-learn-more",
      stats: { hours: "20+", automation: "80%", availability: "24/7" }
    }
  ];

  const subServices = [
    {
      title: "Mobile Optimized",
      description: "Responsive designs that work perfectly on all devices",
      icon: <Smartphone className="w-8 h-8" />,
      href: "/services/mobile-optimized"
    },
    {
      title: "Fast Loading",
      description: "Speed-optimized websites for better user experience",
      icon: <Zap className="w-8 h-8" />,
      href: "/services/fast-loading"
    },
    {
      title: "SEO Friendly",
      description: "Built for search engine optimization from the ground up",
      icon: <Search className="w-8 h-8" />,
      href: "/services/seo-friendly"
    },
    {
      title: "Conversion Focused",
      description: "Designed to turn visitors into customers",
      icon: <TrendingUp className="w-8 h-8" />,
      href: "/services/conversion-focused"
    }
  ];

  const comparisonFeatures = [
    { feature: "Custom Design", website: true, ads: false, ai: false },
    { feature: "Performance Optimization", website: true, ads: true, ai: true },
    { feature: "Analytics & Reporting", website: true, ads: true, ai: true },
    { feature: "24/7 Support", website: true, ads: true, ai: true },
    { feature: "ROI Optimization", website: false, ads: true, ai: true },
    { feature: "Automation", website: false, ads: false, ai: true },
    { feature: "Multi-Platform", website: false, ads: true, ai: true },
    { feature: "AI Integration", website: false, ads: false, ai: true }
  ];

  useEffect(() => {
    document.title = "Explore All Services | LUNEXO MEDIA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover all LUNEXO MEDIA services: Website Design, Ads Management, and AI Automation. Find the perfect solution for your business growth.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Explore All Services | LUNEXO MEDIA"
        description="Discover all LUNEXO MEDIA services: Website Design, Ads Management, and AI Automation. Find the perfect solution for your business growth."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background/50 to-muted/30 relative overflow-hidden">
        <ThreeDBackground />
        <div className="container-wide section-padding relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/20 text-lg px-4 py-2">
              <Layers className="w-5 h-5 mr-2" />
              Complete Service Suite
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Explore All Our Services
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              From stunning websites to high-converting ads and intelligent automation - discover how LUNEXO MEDIA can transform your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg text-lg px-8 py-4">
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white text-lg px-8 py-4">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Overview
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-muted/30 relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your Growth Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the service that best fits your business needs and growth goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {allServices.map((service, index) => (
              <Card 
                key={index}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-white to-muted/10 hover:scale-105 ${
                  service.popular ? 'ring-2 ring-primary/20 shadow-primary/10' : ''
                } ${activeService === index ? 'ring-2 ring-primary/30' : ''}`}
                onMouseEnter={() => setActiveService(index)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="pb-4 relative z-10 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary mb-1">{service.startingPrice}</div>
                    <div className="text-sm text-muted-foreground">Starting price</div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-6 p-3 bg-muted/30 rounded-lg">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="font-bold text-primary text-sm">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" asChild>
                      <Link to={service.href}>
                        View Service Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full border-primary/20 hover:bg-primary hover:text-white" asChild>
                      <Link to={service.learnMore}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Specialized Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep-dive into specific aspects of web development and optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-24 bg-white relative overflow-hidden">
        <ThreeDParticles count={30} />
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Service Comparison
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare features across all our services to find the perfect fit
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">Website Design</th>
                    <th className="text-center p-6 font-semibold">Ads Management</th>
                    <th className="text-center p-6 font-semibold">AI Automation</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-6 font-medium">{row.feature}</td>
                      <td className="text-center p-6">
                        {row.website ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 bg-muted rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-6">
                        {row.ads ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 bg-muted rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-6">
                        {row.ai ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 bg-muted rounded-full mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-wide section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Book a free consultation to discover which services will deliver the best results for your specific business goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg" asChild>
              <Link to="/contact">
                Book Free Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white" asChild>
              <Link to="/portfolio">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesExplore;