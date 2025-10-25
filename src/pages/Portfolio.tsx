import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ExternalLink, 
  Calendar, 
  Users, 
  Trophy,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  Globe,
  Award,
  Zap,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    document.title = "Our Work & Case Studies | Lunexo Media";
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoadingDb(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('published', true)
        .eq('blocked', false)
        .order('created_at', { ascending: false })
        .limit(12);
      if (error) {
        console.error('Error loading portfolio:', error);
      } else {
        setDbProjects(data || []);
      }
      setLoadingDb(false);
    };
    load();
  }, []);

  const projects = [
    // Website Design Projects
    {
      id: "device-rescue-nyc",
      title: "DeviceRescue NYC",
      description: "Expert device repair website for smartphones, tablets, and laptops in NYC. Features online booking, service catalog, and local SEO optimization.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      category: "Website Design",
      technologies: ["React", "Tailwind CSS", "Local SEO", "Booking System"],
      timeline: "3 weeks",
      users: "5K+ customers",
      results: "200% booking increase",
      featured: true,
      liveUrl: "https://devicerescue.us/"
    },
    {
      id: "fix-and-more",
      title: "Fix and More",
      description: "Modern repair service website for computers and cellphones with professional design, online scheduling, and e-commerce integration.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
      category: "Website Design",
      technologies: ["WordPress", "WooCommerce", "Booking Plugin", "SEO"],
      timeline: "4 weeks",
      users: "8K+ visitors/month",
      results: "150% conversion rate",
      featured: true,
      liveUrl: "https://fixandmore.us/"
    },
    {
      id: "ecommerce-fashion",
      title: "Fashion Forward Store",
      description: "Modern e-commerce platform for fashion brands with advanced filtering, wishlist, and seamless checkout experience.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      category: "Website Design",
      technologies: ["React", "Tailwind CSS", "Stripe", "Framer Motion"],
      timeline: "4 weeks",
      users: "25K+ visitors/month",
      results: "180% increase in conversions",
      featured: false
    },
    {
      id: "restaurant-booking",
      title: "Culinary Reservations",
      description: "Restaurant booking platform with real-time availability, menu showcase, and table management system.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      category: "Website Design",
      technologies: ["React", "Booking API", "Payment Gateway"],
      timeline: "3 weeks",
      users: "15K+ bookings",
      results: "300% booking increase",
      featured: false
    },
    {
      id: "real-estate-portal",
      title: "Property Showcase Pro",
      description: "Premium real estate website with virtual tours, advanced search, and lead generation forms.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      category: "Website Design",
      technologies: ["React", "Maps API", "Virtual Tour SDK"],
      timeline: "5 weeks",
      users: "50K+ property views",
      results: "250% lead generation",
      featured: false
    },
    
    // Ads Management Projects
    {
      id: "saas-growth-campaign",
      title: "SaaS Growth Campaign",
      description: "Multi-platform advertising strategy that scaled a B2B SaaS from startup to 6-figure ARR.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      category: "Ads Management",
      technologies: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Analytics"],
      timeline: "6 months",
      users: "500K+ impressions",
      results: "400% ROAS improvement",
      featured: false
    },
    {
      id: "ecommerce-scaling",
      title: "E-commerce Scaling Campaign",
      description: "Performance marketing campaign that scaled an e-commerce brand from $10K to $100K monthly revenue.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      category: "Ads Management",
      technologies: ["Meta Ads", "Google Shopping", "TikTok Ads"],
      timeline: "4 months",
      users: "1M+ reach",
      results: "900% revenue growth",
      featured: false
    },
    {
      id: "local-business-ads",
      title: "Local Business Boost",
      description: "Hyperlocal advertising strategy for service businesses to dominate their local market.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      category: "Ads Management",
      technologies: ["Google Local Ads", "Facebook Local", "Bing Ads"],
      timeline: "3 months",
      users: "100K+ local reach",
      results: "350% local leads increase",
      featured: false
    },

    // AI Automation Projects  
    {
      id: "customer-support-ai",
      title: "AutoSupport AI",
      description: "AI-powered customer support chatbot that reduced support tickets by 80% for e-commerce businesses.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      category: "AI Automation",
      technologies: ["OpenAI", "Python", "React", "WebSocket"],
      timeline: "3 weeks",
      users: "50+ businesses",
      results: "80% ticket reduction",
      featured: false
    },
    {
      id: "content-automation",
      title: "Content Creation Engine",
      description: "AI automation system that generates, schedules, and optimizes social media content across platforms.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
      category: "AI Automation",
      technologies: ["GPT-4", "Social APIs", "Automation Tools"],
      timeline: "4 weeks",
      users: "200+ content creators",
      results: "500% content efficiency",
      featured: false
    },
    {
      id: "lead-qualification-ai",
      title: "Smart Lead Qualifier",
      description: "AI system that automatically qualifies, scores, and routes leads to appropriate sales team members.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      category: "AI Automation",
      technologies: ["Machine Learning", "CRM Integration", "API"],
      timeline: "5 weeks",
      users: "100+ sales teams",
      results: "300% conversion rate",
      featured: false
    }
  ];

  const categories = ["All", "Website Design", "Ads Management", "AI Automation"];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
    
  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Work & Case Studies | Lunexo Media"
        description="See how Lunexo Media helped businesses achieve real growth. Browse our portfolio and case studies showcasing SEO, ads, and web design success."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/portfolio"
      />
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-accent-cta/15 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-6xl mx-auto animate-fade-in">
            <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full mb-8">
              <Trophy className="w-6 h-6 text-primary" />
              Award-Winning Portfolio
            </Badge>
            
            <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tight mb-8">
              <span className="text-foreground">Our Work &</span>
              <br />
              <span className="premium-gradient-text">Client</span>
              <br />
              <span className="bg-gradient-to-r from-accent-cta to-primary bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12 max-w-4xl mx-auto font-light">
              Discover our collection of 
              <span className="text-accent-cta font-bold"> transformative digital experiences</span> 
              that have revolutionized businesses and generated millions in revenue.
            </p>

            {/* Premium Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { value: "50+", label: "Projects Launched", icon: <Trophy className="w-6 h-6" /> },
                { value: "$2M+", label: "Revenue Generated", icon: <TrendingUp className="w-6 h-6" /> },
                { value: "95%", label: "Client Satisfaction", icon: <Award className="w-6 h-6" /> },
                { value: "30 Days", label: "Average Delivery", icon: <Zap className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl lg:text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="group text-base font-bold px-16 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow" asChild>
                <Link to="/contact">
                  Start Premium Project
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-bold px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                <Link to="#featured-projects">
                  View Featured Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Categories Filter */}
      <section className="py-16 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden" id="featured-projects">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Sparkles className="w-6 h-6 mr-3" />
              Premium Categories
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="text-foreground">Explore by</span>{" "}
              <span className="premium-gradient-text">Service Type</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={category === activeCategory ? "default" : "outline"} 
                size="lg"
                className={`px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                  category === activeCategory 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow scale-105" 
                    : "border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Featured Projects */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Trophy className="w-6 h-6 mr-3" />
              Featured Excellence
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">SEO</span>
              <br />
              <span className="premium-gradient-text">Case Studies</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Our most successful launches that demonstrate the power of 
              <span className="text-accent-cta font-bold"> premium design excellence</span> and 
              <span className="text-primary font-bold"> strategic innovation</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="luxury-card overflow-hidden group hover:scale-[1.02] transition-all duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-6 left-6 z-20">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 text-sm font-bold backdrop-blur-md">
                      <Trophy className="w-4 h-4 mr-2" />
                      Featured
                    </Badge>
                  </div>

                  {project.liveUrl && (
                    <div className="absolute top-6 right-6 z-20">
                      <Button size="sm" asChild className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 z-20">
                    <Badge className="bg-black/70 text-white px-4 py-2 text-sm font-bold backdrop-blur-md">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-10 relative">
                  <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                      <div className="font-bold text-lg text-primary">{project.timeline}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground mb-1">Users</div>
                      <div className="font-bold text-lg text-primary">{project.users}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-accent-cta/10 to-primary/10 rounded-2xl">
                      <Target className="w-6 h-6 text-accent-cta mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground mb-1">Results</div>
                      <div className="font-bold text-lg text-accent-cta">{project.results}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="px-4 py-2 rounded-full border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 hover:border-primary/40 transition-all duration-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full group/btn text-lg font-bold py-4 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                    <Link to={`/portfolio/${project.id}`}>
                      View Premium Case Study
                      <ExternalLink className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Projects Grid */}
      <section className="py-32 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <BarChart3 className="w-6 h-6 mr-3" />
              Premium Collection
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">More</span>{" "}
              <span className="premium-gradient-text">Masterpieces</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Explore our complete collection of 
              <span className="text-accent-cta font-bold"> premium digital solutions</span> 
              across all service categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {regularProjects.map((project, index) => (
              <Card key={index} className="luxury-card overflow-hidden group hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-sm font-bold backdrop-blur-md">
                      {project.category}
                    </Badge>
                  </div>

                  {project.liveUrl && (
                    <div className="absolute top-4 right-4">
                      <Button size="sm" asChild className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.users}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                    <Target className="w-5 h-5 text-accent-cta" />
                    <span className="font-bold text-accent-cta">{project.results}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-primary/5 to-accent/5">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-3 py-1 rounded-full">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button variant="outline" className="w-full group/btn font-bold py-3 rounded-xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                    <Link to={`/portfolio/${project.id}`}>
                      View Project
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-accent-cta/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_var(--primary)_0%,_transparent_70%)] opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_var(--accent-cta)_0%,_transparent_70%)] opacity-20"></div>
        </div>

        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Sparkles className="w-6 h-6 mr-3" />
              Your Success Awaits
            </Badge>
            
            <h2 className="text-3xl lg:text-6xl font-black mb-12 leading-tight">
              <span className="text-foreground">Ready to Join Our</span>
              <br />
              <span className="premium-gradient-text">Success Gallery?</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-16 leading-relaxed font-light max-w-4xl mx-auto">
              Let's create the next 
              <span className="text-accent-cta font-bold"> award-winning digital experience</span> 
              that transforms your business and generates exceptional results
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button size="lg" className="group text-base font-bold px-20 py-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow-intense" asChild>
                <Link to="/contact">
                  Start Premium Project
                  <Trophy className="w-6 h-6 ml-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-bold px-20 py-8 rounded-2xl border-2 border-primary/40 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                <Link to="/pricing">
                  View Premium Packages
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

export default Portfolio;