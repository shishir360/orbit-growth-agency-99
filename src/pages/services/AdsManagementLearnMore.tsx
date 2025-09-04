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
  Target, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  Play,
  Pause,
  Settings,
  Eye,
  Calculator
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";

const AdsManagementLearnMore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const platforms = [
    {
      name: "Google Ads",
      icon: "🔍",
      description: "Capture high-intent traffic when customers are actively searching",
      features: ["Search Campaigns", "Display Network", "Shopping Ads", "YouTube Ads"],
      avgRoas: "4.2x",
      avgCtr: "3.2%",
      bestFor: "High-intent searches, B2B services, e-commerce"
    },
    {
      name: "Facebook & Instagram",
      icon: "📘",
      description: "Target your ideal customers with precision demographic targeting",
      features: ["Feed Ads", "Stories", "Reels", "Shop Integration"],
      avgRoas: "3.8x",
      avgCtr: "2.8%",
      bestFor: "Brand awareness, e-commerce, local businesses"
    },
    {
      name: "TikTok Ads",
      icon: "🎵",
      description: "Engage younger audiences with creative short-form video content",
      features: ["In-Feed Ads", "Spark Ads", "Brand Takeover", "Effect Ads"],
      avgRoas: "3.2x",
      avgCtr: "4.1%",
      bestFor: "Gen Z marketing, entertainment, viral campaigns"
    },
    {
      name: "LinkedIn Ads",
      icon: "💼",
      description: "Target decision-makers and professionals for B2B campaigns",
      features: ["Sponsored Content", "Message Ads", "Lead Gen Forms", "Event Ads"],
      avgRoas: "5.1x",
      avgCtr: "1.9%",
      bestFor: "B2B services, recruitment, professional services"
    },
    {
      name: "YouTube Ads",
      icon: "📺",
      description: "Reach audiences through engaging video content",
      features: ["Skippable Video", "Non-skippable", "Bumper Ads", "Discovery Ads"],
      avgRoas: "2.9x",
      avgCtr: "2.1%",
      bestFor: "Brand awareness, product demos, tutorials"
    },
    {
      name: "Pinterest Ads",
      icon: "📌",
      description: "Drive discovery and sales through visual search platform",
      features: ["Product Pins", "Video Pins", "Shopping Features", "Idea Pins"],
      avgRoas: "4.1x",
      avgCtr: "3.8%",
      bestFor: "E-commerce, lifestyle brands, DIY products"
    },
    {
      name: "Twitter Ads",
      icon: "🐦",
      description: "Engage in real-time conversations and promote content",
      features: ["Promoted Tweets", "Trend Takeover", "Followers Campaign", "Website Clicks"],
      avgRoas: "2.4x",
      avgCtr: "1.8%",
      bestFor: "News, events, real-time marketing"
    },
    {
      name: "Snapchat Ads",
      icon: "👻",
      description: "Connect with younger demographics through AR and video",
      features: ["Snap Ads", "Story Ads", "AR Lenses", "Collection Ads"],
      avgRoas: "2.8x",
      avgCtr: "4.2%",
      bestFor: "Youth marketing, entertainment, AR experiences"
    },
    {
      name: "Microsoft Bing",
      icon: "🌐",
      description: "Reach users on Bing with lower competition and better CPCs",
      features: ["Search Campaigns", "Shopping Ads", "Audience Network", "App Install"],
      avgRoas: "3.4x",
      avgCtr: "2.6%",
      bestFor: "Lower competition, older demographics, B2B"
    }
  ];

  const serviceTypes = [
    {
      title: "Campaign Setup & Strategy",
      description: "Complete campaign architecture and strategic planning",
      features: [
        "Account Structure Optimization",
        "Audience Research & Segmentation", 
        "Competitive Analysis",
        "Budget Allocation Strategy",
        "Creative Strategy Development",
        "Landing Page Recommendations"
      ],
      timeline: "Week 1-2"
    },
    {
      title: "Creative Development",
      description: "High-converting ad creatives and copy that drive results",
      features: [
        "Ad Copy Writing & Testing",
        "Visual Asset Creation",
        "Video Ad Production",
        "A/B Testing Framework",
        "Brand Guideline Adherence",
        "Performance Creative Analysis"
      ],
      timeline: "Week 2-3"
    },
    {
      title: "Campaign Management",
      description: "Daily optimization and performance monitoring",
      features: [
        "Bid Management & Optimization",
        "Audience Refinement",
        "Budget Reallocation",
        "Performance Monitoring",
        "Quality Score Improvement",
        "Ad Schedule Optimization"
      ],
      timeline: "Ongoing"
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive performance tracking and insights",
      features: [
        "Custom Dashboard Setup",
        "Weekly Performance Reports",
        "ROI & ROAS Analysis",
        "Attribution Modeling",
        "Conversion Tracking Setup",
        "Strategic Recommendations"
      ],
      timeline: "Weekly/Monthly"
    }
  ];

  const results = [
    { metric: "Average ROAS", value: "4.2x", description: "Return on ad spend across all campaigns", change: "+85%" },
    { metric: "Cost Per Lead", value: "65% Lower", description: "Reduction in cost per qualified lead", change: "vs. industry average" },
    { metric: "Conversion Rate", value: "180% Higher", description: "Increase in conversion rates", change: "within 90 days" },
    { metric: "Click-Through Rate", value: "3.2%", description: "Average CTR across all platforms", change: "+120% vs baseline" }
  ];

  const caseStudies = [
    {
      title: "SaaS Company Scale-Up",
      industry: "Software",
      challenge: "Needed to scale from $10K to $100K MRR",
      solution: "Multi-platform funnel with LinkedIn, Google, and Facebook",
      results: ["400% increase in MRR", "60% lower CAC", "2.1x LTV improvement"],
      timeline: "6 months",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "E-commerce Brand Growth",
      industry: "Retail",
      challenge: "Struggling with high CAC and low ROAS",
      solution: "Creative testing framework with TikTok and Instagram",
      results: ["900% revenue growth", "3.8x ROAS", "45% lower CAC"],
      timeline: "4 months",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Local Service Business",
      industry: "Home Services",
      challenge: "Needed more qualified local leads",
      solution: "Hyperlocal targeting with Google Local and Facebook",
      results: ["350% more qualified leads", "40% higher close rate", "$250K additional revenue"],
      timeline: "3 months",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const pricing = [
    {
      title: "Starter",
      price: "$1,497",
      period: "/month",
      description: "Perfect for small businesses starting with ads",
      features: [
        "2 advertising platforms",
        "Up to $5K monthly ad spend",
        "Basic reporting",
        "Campaign setup & optimization",
        "Monthly strategy calls"
      ],
      popular: false
    },
    {
      title: "Growth",
      price: "$2,497",
      period: "/month",
      description: "Ideal for scaling businesses",
      features: [
        "4 advertising platforms",
        "Up to $15K monthly ad spend",
        "Advanced reporting & analytics",
        "Creative development",
        "Bi-weekly strategy calls",
        "Landing page optimization"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale advertising operations",
      features: [
        "All advertising platforms",
        "Unlimited ad spend management",
        "Custom reporting & dashboards",
        "Dedicated account manager",
        "Weekly strategy calls",
        "Advanced attribution modeling"
      ],
      popular: false
    }
  ];

  useEffect(() => {
    document.title = "Ads Management Services - Complete Guide | LUNEXO MEDIA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to LUNEXO MEDIA ads management services. Learn about platforms, strategies, pricing, and results we deliver for businesses.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Ads Management Services - Complete Guide | LUNEXO MEDIA"
        description="Complete guide to LUNEXO MEDIA ads management services. Learn about platforms, strategies, pricing, and results we deliver for businesses."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/ads-management-learn-more"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background/50 to-muted/30 relative overflow-hidden">
        <ThreeDBackground />
        <div className="container-wide section-padding relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/20 text-lg px-4 py-2">
              <Target className="w-5 h-5 mr-2" />
              Comprehensive Ads Management
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Master Multi-Platform Advertising
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Everything you need to know about our data-driven advertising services that help businesses scale efficiently across all major platforms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg text-lg px-8 py-4" asChild>
                <Link to="/contact">Get Custom Strategy</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white text-lg px-8 py-4" asChild>
                <Link to="/ads-management">View Service Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Platforms Section */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Advertising Platforms We Manage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We expertly manage campaigns across all major advertising platforms to maximize your reach and ROI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{platform.icon}</div>
                  <CardTitle className="text-xl mb-3">{platform.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{platform.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{platform.avgRoas}</div>
                      <div className="text-xs text-muted-foreground">Avg ROAS</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{platform.avgCtr}</div>
                      <div className="text-xs text-muted-foreground">Avg CTR</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Best for:</strong> {platform.bestFor}
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link to={`/services/learn-platform?platform=${platform.name.toLowerCase().replace(/\s+/g, '-').replace('&', '').replace(/--+/g, '-')}`}>
                      Learn Platform Strategy
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Complete Service Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From strategy to execution, here's exactly what we do to maximize your advertising ROI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceTypes.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <Badge variant="outline">{service.timeline}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our data-driven approach consistently delivers exceptional performance across all platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {results.map((result, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{result.value}</div>
                  <div className="text-lg font-semibold mb-2">{result.metric}</div>
                  <div className="text-sm text-muted-foreground mb-2">{result.description}</div>
                  <Badge variant="secondary" className="text-xs">{result.change}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center mb-12">Featured Case Studies</h3>
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
                    <h4 className="text-2xl font-bold mb-4">{study.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-red-600">Challenge:</h5>
                        <p className="text-muted-foreground text-sm mb-4">{study.challenge}</p>
                        <h5 className="font-semibold mb-2 text-blue-600">Solution:</h5>
                        <p className="text-muted-foreground text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-600">Results:</h5>
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

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your advertising budget and growth goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {plan.price}<span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
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
                    <Link to="/contact">
                      {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </Link>
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
            Ready to Scale Your Advertising?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Book a free strategy call to discover how our ads management services can help you achieve your growth goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg" asChild>
              <Link to="/contact">Book Strategy Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white" asChild>
              <Link to="/portfolio">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdsManagementLearnMore;
