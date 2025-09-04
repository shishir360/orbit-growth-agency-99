import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, ExternalLink, CheckCircle } from "lucide-react";

const PortfolioItem = () => {
  const { id } = useParams();

  // Portfolio data - in a real app, this would come from an API or database
  const portfolioData: { [key: string]: any } = {
    "ecommerce-fashion": {
      title: "Fashion Forward Store",
      description: "Modern e-commerce platform for fashion brands with advanced filtering, wishlist, and seamless checkout experience.",
      longDescription: "We built a cutting-edge e-commerce platform that revolutionized how fashion brands sell online. The platform features advanced product filtering, personalized recommendations, and a streamlined checkout process that increased conversions by 180%.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      category: "Website Design",
      client: "Fashion Forward Co.",
      technologies: ["React", "Tailwind CSS", "Stripe", "Framer Motion", "Node.js", "MongoDB"],
      timeline: "4 weeks",
      users: "25K+ visitors/month",
      results: "180% increase in conversions",
      challenge: "The client needed a modern, fast-loading e-commerce platform that could handle high traffic during sales events while providing an exceptional user experience.",
      solution: "We developed a React-based platform with advanced caching, optimized images, and a mobile-first design approach.",
      keyFeatures: [
        "Advanced product filtering and search",
        "Wishlist and comparison features",
        "One-click checkout process",
        "Mobile-responsive design",
        "Real-time inventory management",
        "Personalized product recommendations"
      ],
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "restaurant-booking": {
      title: "Culinary Reservations",
      description: "Restaurant booking platform with real-time availability, menu showcase, and table management system.",
      longDescription: "A comprehensive restaurant booking platform that streamlined reservations and increased customer satisfaction through intuitive design and real-time availability.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      category: "Website Design",
      client: "Culinary Group",
      technologies: ["React", "Booking API", "Payment Gateway", "Calendar Integration"],
      timeline: "3 weeks",
      users: "15K+ bookings",
      results: "300% booking increase",
      challenge: "Multiple restaurants needed a unified booking system that could handle peak dinner rush reservations.",
      solution: "Built a scalable booking platform with real-time availability and automated confirmation systems.",
      keyFeatures: [
        "Real-time table availability",
        "Menu showcase with images",
        "Customer review system",
        "Automated booking confirmations",
        "Staff management dashboard",
        "Mobile-optimized interface"
      ],
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "real-estate-portal": {
      title: "Property Showcase Pro",
      description: "Premium real estate website with virtual tours, advanced search, and lead generation forms.",
      longDescription: "Developed a sophisticated real estate platform that transformed property browsing with immersive virtual tours and intelligent search capabilities, resulting in significantly improved lead generation.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      category: "Website Design",
      client: "Premium Properties Group",
      technologies: ["React", "Maps API", "Virtual Tour SDK", "CRM Integration"],
      timeline: "5 weeks",
      users: "50K+ property views",
      results: "250% lead generation",
      challenge: "Real estate agents needed a modern platform to showcase properties with immersive experiences and capture qualified leads.",
      solution: "Built a comprehensive platform with virtual tours, advanced filtering, and integrated lead management system.",
      keyFeatures: [
        "360° virtual property tours",
        "Advanced search and filtering",
        "Interactive maps integration",
        "Lead capture forms",
        "Agent dashboard",
        "Mobile-responsive design"
      ],
      images: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "saas-growth-campaign": {
      title: "SaaS Growth Campaign",
      description: "Multi-platform advertising strategy that scaled a B2B SaaS from startup to 6-figure ARR.",
      longDescription: "Comprehensive advertising campaign across Google, Facebook, and LinkedIn that transformed a startup into a thriving SaaS business with sustainable growth.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      category: "Ads Management",
      client: "TechFlow SaaS",
      technologies: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Analytics", "HubSpot"],
      timeline: "6 months",
      users: "500K+ impressions",
      results: "400% ROAS improvement",
      challenge: "A B2B SaaS needed to scale from zero to sustainable monthly recurring revenue with limited marketing budget.",
      solution: "Developed a multi-channel approach focusing on high-intent keywords and lookalike audiences based on existing customers.",
      keyFeatures: [
        "Multi-platform campaign management",
        "Advanced audience targeting",
        "A/B testing for ad creatives",
        "Conversion tracking setup",
        "Monthly performance reports",
        "Budget optimization strategies"
      ],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "ecommerce-scaling": {
      title: "E-commerce Scaling Campaign",
      description: "Performance marketing campaign that scaled an e-commerce brand from $10K to $100K monthly revenue.",
      longDescription: "Strategic multi-channel advertising approach that rapidly scaled an e-commerce business through optimized campaigns and data-driven decision making.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      category: "Ads Management",
      client: "ScaleCommerce Inc.",
      technologies: ["Meta Ads", "Google Shopping", "TikTok Ads", "Analytics"],
      timeline: "4 months",
      users: "1M+ reach",
      results: "900% revenue growth",
      challenge: "E-commerce brand needed to rapidly scale from modest revenue to substantial monthly sales while maintaining profitability.",
      solution: "Implemented a comprehensive performance marketing strategy across multiple channels with focus on ROAS optimization.",
      keyFeatures: [
        "Multi-channel campaign strategy",
        "Product feed optimization",
        "Audience segmentation",
        "Creative testing protocols",
        "Performance analytics dashboard",
        "Revenue attribution tracking"
      ],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "local-business-ads": {
      title: "Local Business Boost",
      description: "Hyperlocal advertising strategy for service businesses to dominate their local market.",
      longDescription: "Comprehensive local advertising strategy that helped service businesses establish market dominance in their geographic area through targeted campaigns.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      category: "Ads Management",
      client: "LocalPro Services",
      technologies: ["Google Local Ads", "Facebook Local", "Bing Ads", "GMB Optimization"],
      timeline: "3 months",
      users: "100K+ local reach",
      results: "350% local leads increase",
      challenge: "Local service businesses struggled to compete with larger companies and needed hyperlocal visibility to attract customers.",
      solution: "Developed targeted local advertising campaigns with geo-specific messaging and optimized local search presence.",
      keyFeatures: [
        "Hyperlocal targeting strategies",
        "Google My Business optimization",
        "Local keyword targeting",
        "Community-focused messaging",
        "Local landing pages",
        "Review management integration"
      ],
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "customer-support-ai": {
      title: "AutoSupport AI",
      description: "AI-powered customer support chatbot that reduced support tickets by 80% for e-commerce businesses.",
      longDescription: "Revolutionary AI chatbot system that handles customer inquiries 24/7, providing instant responses and dramatically reducing support workload.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      category: "AI Automation",
      client: "E-commerce Solutions Inc.",
      technologies: ["OpenAI", "Python", "React", "WebSocket", "Machine Learning"],
      timeline: "3 weeks",
      users: "50+ businesses",
      results: "80% ticket reduction",
      challenge: "E-commerce businesses were overwhelmed with repetitive customer support inquiries, affecting response times and customer satisfaction.",
      solution: "Developed an AI chatbot trained on common customer queries that provides instant, accurate responses and seamlessly escalates complex issues.",
      keyFeatures: [
        "24/7 automated customer support",
        "Natural language processing",
        "Integration with existing helpdesk",
        "Conversation analytics",
        "Multi-language support",
        "Continuous learning capabilities"
      ],
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "content-automation": {
      title: "Content Creation Engine",
      description: "AI automation system that generates, schedules, and optimizes social media content across platforms.",
      longDescription: "Intelligent content creation and management system that automates social media workflows, helping creators and businesses maintain consistent, engaging online presence.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
      category: "AI Automation",
      client: "Content Creators Network",
      technologies: ["GPT-4", "Social APIs", "Automation Tools", "Analytics"],
      timeline: "4 weeks",
      users: "200+ content creators",
      results: "500% content efficiency",
      challenge: "Content creators struggled to maintain consistent posting schedules across multiple social media platforms while ensuring quality and engagement.",
      solution: "Built an AI-powered system that generates platform-specific content, schedules posts automatically, and optimizes based on performance data.",
      keyFeatures: [
        "AI content generation",
        "Multi-platform scheduling",
        "Performance optimization",
        "Content calendar management",
        "Brand voice consistency",
        "Analytics and insights"
      ],
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "lead-qualification-ai": {
      title: "Smart Lead Qualifier",
      description: "AI system that automatically qualifies, scores, and routes leads to appropriate sales team members.",
      longDescription: "Advanced AI system that streamlines the lead qualification process, automatically scoring prospects and routing them to the most suitable sales representatives for maximum conversion potential.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      category: "AI Automation",
      client: "SalesForce Pro",
      technologies: ["Machine Learning", "CRM Integration", "API", "Python", "React"],
      timeline: "5 weeks",
      users: "100+ sales teams",
      results: "300% conversion rate",
      challenge: "Sales teams were spending too much time on unqualified leads, resulting in decreased productivity and missed opportunities with high-value prospects.",
      solution: "Developed an intelligent lead scoring system that analyzes prospect behavior and data to automatically qualify and route leads to the best-matched sales representatives.",
      keyFeatures: [
        "Automated lead scoring",
        "Intelligent lead routing",
        "CRM integration",
        "Behavioral analysis",
        "Performance tracking",
        "Custom scoring criteria"
      ],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      ]
    }
  };

  const project = portfolioData[id || ""];

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide section-padding py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${project.title} | Portfolio Case Study | LUNEXO MEDIA`}
        description={project.longDescription}
        url={`https://www.lunexomedia.com/portfolio/${id}`}
        image={project.image}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Badge className="mb-4">{project.category}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.longDescription}</p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">{project.timeline}</div>
                <div className="text-sm text-muted-foreground">Timeline</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">{project.users}</div>
                <div className="text-sm text-muted-foreground">Users/Results</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">{project.results}</div>
                <div className="text-sm text-muted-foreground">Key Results</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <ExternalLink className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">{project.client}</div>
                <div className="text-sm text-muted-foreground">Client</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Image */}
          <div className="aspect-video rounded-lg overflow-hidden mb-12">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Challenge & Solution */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.challenge}
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.solution}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Info Sidebar */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Project Info</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold mb-2">Technologies Used</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold mb-2">Category</div>
                      <Badge>{project.category}</Badge>
                    </div>

                    <div>
                      <div className="font-semibold mb-2">Timeline</div>
                      <div className="text-muted-foreground">{project.timeline}</div>
                    </div>

                    <div>
                      <div className="font-semibold mb-2">Results</div>
                      <div className="text-primary font-semibold">{project.results}</div>
                    </div>
                  </div>

                  <Button className="w-full mt-6" asChild>
                    <Link to="/contact">
                      Start Similar Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Images */}
      {project.images && project.images.length > 1 && (
        <section className="py-20 bg-white">
          <div className="container-wide section-padding">
            <h2 className="text-3xl font-bold mb-8 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.slice(1).map((image: string, index: number) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${project.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your {project.category} Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can create similar results for your business.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/contact">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioItem;