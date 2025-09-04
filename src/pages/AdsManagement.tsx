// React Router Link removed for full page reloads
import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChevronRight,
  Play,
  Pause,
  Settings,
  Eye,
  Calculator,
  Rocket,
  Trophy,
  Globe,
  Shield,
  Lightbulb,
  Sparkles
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";

const AdsManagement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const premiumServices = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Campaign Architecture",
      description: "Enterprise-level advertising strategy with advanced targeting methodologies and cross-platform optimization for maximum market penetration.",
      features: ["Advanced Audience Intelligence", "Competitive Market Analysis", "Multi-Channel Attribution", "Performance Forecasting"],
      metrics: { roas: "540%", ctr: "4.8%", conv: "24%" },
      gradient: "from-blue-600 via-blue-500 to-cyan-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data Science & Analytics",
      description: "AI-powered performance optimization using machine learning algorithms and predictive analytics for continuous campaign enhancement.",
      features: ["Predictive Analytics", "Real-Time Optimization", "Custom Attribution Models", "Advanced Segmentation"],
      metrics: { roas: "480%", ctr: "5.2%", conv: "28%" },
      gradient: "from-purple-600 via-purple-500 to-pink-400"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Omnichannel Dominance",
      description: "Comprehensive advertising across all major platforms with unified messaging and sophisticated budget allocation strategies.",
      features: ["Platform Optimization", "Creative Automation", "Budget Intelligence", "Cross-Platform Tracking"],
      metrics: { roas: "620%", ctr: "4.2%", conv: "31%" },
      gradient: "from-green-600 via-emerald-500 to-teal-400"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Growth Acceleration Engine",
      description: "Rapid scaling solutions for ambitious businesses ready to dominate their market with aggressive growth strategies.",
      features: ["Rapid Scaling", "Market Expansion", "Competitive Advantage", "ROI Maximization"],
      metrics: { roas: "720%", ctr: "6.1%", conv: "34%" },
      gradient: "from-orange-600 via-red-500 to-pink-400"
    }
  ];

  const platformsData = [
    {
      name: "Google Ecosystem",
      icon: "🔍",
      description: "Dominate search intent with precision targeting across Google's entire advertising network",
      avgRoas: "5.2x",
      volume: "$2.4M+",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Meta Universe",
      icon: "📘",
      description: "Leverage Facebook & Instagram's advanced targeting for maximum social engagement",
      avgRoas: "4.8x",
      volume: "$1.8M+",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      name: "TikTok Engine",
      icon: "🎵",
      description: "Viral marketing campaigns that capture Gen Z and millennial audiences",
      avgRoas: "6.4x",
      volume: "$1.2M+",
      gradient: "from-pink-500 to-red-500"
    },
    {
      name: "LinkedIn Professional",
      icon: "💼",
      description: "B2B excellence with executive-level targeting and premium positioning",
      avgRoas: "7.1x",
      volume: "$980K+",
      gradient: "from-blue-700 to-cyan-600"
    },
    {
      name: "YouTube Authority",
      icon: "📺",
      description: "Video-first advertising that builds authority and drives conversions",
      avgRoas: "4.2x",
      volume: "$1.4M+",
      gradient: "from-red-500 to-orange-500"
    },
    {
      name: "Amazon Marketplace",
      icon: "📦",
      description: "E-commerce dominance with advanced product targeting and optimization",
      avgRoas: "5.8x",
      volume: "$2.1M+",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  const results = [
    { 
      metric: "Average ROAS", 
      value: "640%", 
      description: "Return on advertising spend across all platforms",
      icon: <TrendingUp className="w-6 h-6" />
    },
    { 
      metric: "Client Revenue", 
      value: "$127M+", 
      description: "Total revenue generated for our clients in 2024",
      icon: <DollarSign className="w-6 h-6" />
    },
    { 
      metric: "Success Rate", 
      value: "98.4%", 
      description: "Campaigns that exceed performance targets",
      icon: <Trophy className="w-6 h-6" />
    },
    { 
      metric: "Global Reach", 
      value: "47", 
      description: "Countries where we've driven successful campaigns",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const caseStudies = [
    {
      title: "Enterprise SaaS Scale-Up",
      industry: "Software",
      challenge: "Scale from $500K to $10M ARR",
      solution: "Comprehensive multi-platform strategy with advanced attribution",
      results: ["1,900% revenue growth", "480% ROAS", "85% lower CAC"],
      investment: "$2.4M",
      returns: "$47M",
      timeline: "18 months",
      gradient: "from-blue-600 to-cyan-400"
    },
    {
      title: "Global E-commerce Empire",
      industry: "Retail",
      challenge: "International expansion and market dominance",
      solution: "Localized campaigns across 12 countries with dynamic creative",
      results: ["2,400% international growth", "620% ROAS", "Market leadership"],
      investment: "$3.8M",
      returns: "$89M",
      timeline: "24 months",
      gradient: "from-purple-600 to-pink-400"
    },
    {
      title: "FinTech Disruption",
      industry: "Financial Technology",
      challenge: "Break into competitive financial services market",
      solution: "Precision targeting with compliance-focused creative strategy",
      results: ["$50M+ in loans originated", "340% conversion rate", "Market penetration"],
      investment: "$1.9M",
      returns: "$23M",
      timeline: "12 months",
      gradient: "from-green-600 to-teal-400"
    }
  ];

  useEffect(() => {
    document.title = "Paid Advertising & PPC Management | Lunexo Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Maximize ROI with targeted Google Ads, Facebook Ads, and social media ad campaigns managed by Lunexo Media\'s digital experts.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SEO
        title="Paid Advertising & PPC Management | Lunexo Media"
        description="Maximize ROI with targeted Google Ads, Facebook Ads, and social media ad campaigns managed by Lunexo Media's digital experts."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/ads-management"
      />
      
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/5 to-background">
        <ThreeDBackground />
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent-cta/15 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-primary/8 to-accent/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Enhanced Content with Better Visual Hierarchy */}
            <div className={`space-y-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-8">
                <Badge variant="outline" className="inline-flex items-center gap-3 px-6 py-3 text-xl font-semibold border-primary/30 bg-primary/5 backdrop-blur-sm rounded-full">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Premium Advertising Excellence
                </Badge>
                
                {/* Enhanced Typography Hierarchy */}
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      Paid Ads &
                    </span>
                    <br />
                    <span className="text-foreground font-bold">PPC Management Services</span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed max-w-2xl font-medium">
                    Enterprise-grade advertising management delivering 
                    <span className="text-accent-cta font-bold"> 640% average ROAS</span> through 
                    strategic campaigns that <span className="text-primary font-semibold">dominate markets</span>.
                  </p>
                </div>

                {/* Enhanced Key Metrics with Better Spacing */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  {[
                    { value: "$127M+", label: "Revenue Generated", accent: "text-accent-cta" },
                    { value: "640%", label: "Average ROAS", accent: "text-primary" },
                    { value: "98.4%", label: "Success Rate", accent: "text-accent" }
                  ].map((metric, index) => (
                    <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className={`text-2xl lg:text-3xl font-black mb-2 ${metric.accent}`}>{metric.value}</div>
                      <div className="text-sm lg:text-base text-muted-foreground font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced CTAs with New Colors and Better Copy */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button size="lg" className="group cta-primary text-xl font-semibold px-16 py-6 rounded-2xl hover:scale-105 transition-all duration-300" asChild>
                  <a href="/contact">
                    Get Your Free Consultation Today
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </a>
                </Button>
                
                <Button size="lg" variant="outline" className="text-xl font-semibold px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                  <a href="/portfolio">
                    Explore Success Stories
                  </a>
                </Button>
              </div>
            </div>

            {/* Enhanced Video Section with Better Positioning */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-accent-cta/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative hero-card overflow-hidden">
                <YouTubeFacade
                  videoId="qhFGDn37DLw"
                  title="Premium Ads Management Excellence"
                  width="100%"
                  height="450"
                  autoplay={true}
                  loop={true}
                  controls={false}
                  modestbranding={true}
                  className="w-full aspect-video rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section with Enhanced Spacing */}
      <section className="py-40 bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 text-primary border-primary/20 px-6 py-3 text-lg">
              <Shield className="w-5 h-5 mr-3" />
              Enterprise Solutions
            </Badge>
            
            {/* Enhanced Visual Hierarchy */}
            <h2 className="text-3xl lg:text-5xl font-black mb-12 leading-tight">
              <span className="text-foreground">Google Ads</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent-cta to-accent bg-clip-text text-transparent">
                Campaigns
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-medium">
              Advanced advertising architecture designed for businesses that demand 
              <span className="text-accent-cta font-semibold"> market dominance</span> and 
              <span className="text-primary font-semibold"> exceptional returns</span>
            </p>
          </div>
          
          {/* Enhanced Cards with Better Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {premiumServices.map((service, index) => (
              <Card 
                key={index} 
                className={`group modern-card overflow-hidden bg-gradient-to-br from-white/60 to-white/40 cursor-pointer hover:scale-[1.02] ${
                  activeService === index ? 'ring-2 ring-primary/40 shadow-2xl shadow-primary/20' : ''
                }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-500`} />
                
                <CardHeader className="pb-6 relative z-10 p-8">
                  <div className="flex items-start gap-8">
                    <div className={`w-24 h-24 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl lg:text-2xl mb-6 group-hover:text-primary transition-colors duration-300 font-bold">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground/90 leading-relaxed text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10 p-8">
                  {/* Enhanced Performance Metrics */}
                  <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-black/5 rounded-2xl">
                    <div className="text-center">
                      <div className="text-xl font-black text-accent-cta">{service.metrics.roas}</div>
                      <div className="text-sm text-muted-foreground font-medium">ROAS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-primary">{service.metrics.ctr}</div>
                      <div className="text-sm text-muted-foreground font-medium">CTR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-accent">{service.metrics.conv}</div>
                      <div className="text-sm text-muted-foreground font-medium">Conv Rate</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                        <span className="text-base font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group/btn border-2 border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 py-4 rounded-2xl text-lg font-semibold"
                    onClick={() => document.getElementById('advanced-features')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Advanced Features
                    <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features - Precision-Engineered Performance */}
      <section id="advanced-features" className="py-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 text-cyan-400 border-cyan-400/30 bg-cyan-400/10 px-8 py-4 text-xl font-semibold backdrop-blur-sm rounded-full">
              <Settings className="w-6 h-6 mr-3" />
              Advanced Features
            </Badge>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-12 leading-tight">
              <span className="text-white">Explore Advanced Features for</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Precision-Engineered Performance
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-6xl mx-auto leading-relaxed font-medium">
              Cutting-edge technology and advanced methodologies that deliver 
              <span className="text-cyan-400 font-bold"> measurable excellence</span> and 
              <span className="text-blue-400 font-bold"> unmatched precision</span> in every campaign
            </p>
          </div>

          {/* Advanced Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            
            {/* AI-Powered Optimization */}
            <Card className="group bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm">
              <CardHeader className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl lg:text-3xl text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300 font-bold">
                      AI-Powered Optimization Engine
                    </CardTitle>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Machine learning algorithms continuously optimize your campaigns in real-time, analyzing 1000+ data points per second to maximize performance.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-black/20 rounded-2xl border border-cyan-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-black text-cyan-400">850%</div>
                      <div className="text-sm text-gray-400">Performance Boost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-blue-400">24/7</div>
                      <div className="text-sm text-gray-400">Auto-Optimization</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-purple-400">1000+</div>
                      <div className="text-sm text-gray-400">Data Points</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Predictive Budget Allocation",
                      "Real-Time Audience Insights",
                      "Dynamic Creative Testing",
                      "Advanced Attribution Modeling"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                        <span className="text-white font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cross-Platform Intelligence */}
            <Card className="group bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm">
              <CardHeader className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl lg:text-3xl text-white mb-4 group-hover:text-purple-400 transition-colors duration-300 font-bold">
                      Cross-Platform Intelligence
                    </CardTitle>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Unified campaign management across all major platforms with intelligent data synchronization and strategic budget distribution.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-black/20 rounded-2xl border border-purple-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-black text-purple-400">12+</div>
                      <div className="text-sm text-gray-400">Platforms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-pink-400">360°</div>
                      <div className="text-sm text-gray-400">View</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-cyan-400">99.9%</div>
                      <div className="text-sm text-gray-400">Uptime</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Unified Dashboard Control",
                      "Cross-Platform Attribution",
                      "Intelligent Budget Shifting",
                      "Competitor Intelligence"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                        <span className="text-white font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Analytics Suite */}
            <Card className="group bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm">
              <CardHeader className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl lg:text-3xl text-white mb-4 group-hover:text-green-400 transition-colors duration-300 font-bold">
                      Advanced Analytics Suite
                    </CardTitle>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Deep-dive analytics with custom reporting, predictive forecasting, and actionable insights that drive strategic decision-making.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-black/20 rounded-2xl border border-green-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-400">500+</div>
                      <div className="text-sm text-gray-400">Metrics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-emerald-400">Real-time</div>
                      <div className="text-sm text-gray-400">Updates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-teal-400">Custom</div>
                      <div className="text-sm text-gray-400">Reports</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Custom KPI Dashboards",
                      "Predictive Performance Models",
                      "Cohort Analysis Tools",
                      "Advanced Segmentation"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <span className="text-white font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Acceleration */}
            <Card className="group bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm">
              <CardHeader className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl lg:text-3xl text-white mb-4 group-hover:text-orange-400 transition-colors duration-300 font-bold">
                      Performance Acceleration
                    </CardTitle>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Rapid scaling technology that identifies high-performing elements and accelerates growth through intelligent automation and optimization.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-black/20 rounded-2xl border border-orange-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-black text-orange-400">10x</div>
                      <div className="text-sm text-gray-400">Faster Scaling</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-red-400">95%</div>
                      <div className="text-sm text-gray-400">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-yellow-400">Auto</div>
                      <div className="text-sm text-gray-400">Scaling</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Smart Bid Management",
                      "Automated A/B Testing",
                      "Performance Trend Analysis",
                      "Risk Management Systems"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
                        <span className="text-white font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action for Advanced Features */}
          <div className="text-center">
            <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-white/10 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Experience 
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Precision Performance</span>?
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Schedule a personalized demo to see how our advanced features can transform your advertising performance and accelerate your business growth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300" asChild>
                    <a href="/contact">
                      Schedule Advanced Demo
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <Button size="lg" variant="outline" className="text-xl px-12 py-6 rounded-2xl border-2 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300" asChild>
                    <a href="/portfolio">
                      View Success Cases
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Mastery Section */}
      <section className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Platform Mastery
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Omnichannel
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master every major advertising platform with sophisticated strategies tailored for maximum impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformsData.map((platform, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm hover:scale-105">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{platform.icon}</div>
                  <CardTitle className="text-2xl mb-3">{platform.name}</CardTitle>
                  <p className="text-muted-foreground">{platform.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 bg-gradient-to-r ${platform.gradient} rounded-2xl text-white`}>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">{platform.avgRoas}</div>
                          <div className="text-sm opacity-90">Avg ROAS</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{platform.volume}</div>
                          <div className="text-sm opacity-90">Ad Spend</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group/btn hover:bg-primary hover:text-white transition-all duration-300"
                      asChild
                    >
                      <a href="/services/ads-management-learn-more">
                        Platform Strategy
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Case Studies */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/10">
        <div className="container-wide section-padding">
          {/* Results Grid */}
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20 px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              Proven Excellence
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
              <br />
              Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {results.map((result, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-muted/10 hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {result.icon}
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{result.value}</div>
                  <div className="text-lg font-semibold mb-2">{result.metric}</div>
                  <div className="text-sm text-muted-foreground">{result.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Case Studies */}
          <div className="space-y-12">
            <h3 className="text-4xl font-bold text-center mb-12">Elite Case Studies</h3>
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-muted/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className={`bg-gradient-to-br ${study.gradient} p-12 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative z-10">
                      <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                        {study.industry}
                      </Badge>
                      <h4 className="text-3xl font-bold mb-6">{study.title}</h4>
                      
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <div className="text-2xl font-bold mb-1">{study.investment}</div>
                          <div className="text-sm opacity-90">Ad Investment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold mb-1">{study.returns}</div>
                          <div className="text-sm opacity-90">Revenue Generated</div>
                        </div>
                      </div>

                      <div className="text-lg opacity-90">{study.timeline}</div>
                    </div>
                  </div>
                  
                  <div className="p-12">
                    <div className="space-y-8">
                      <div>
                        <h5 className="font-bold mb-3 text-red-600 text-lg">Challenge</h5>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-bold mb-3 text-blue-600 text-lg">Solution</h5>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-bold mb-4 text-green-600 text-lg">Results</h5>
                        <div className="space-y-3">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center gap-3">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                              <span className="font-semibold">{result}</span>
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

      {/* Premium CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 via-blue-500/10 to-cyan-400/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-wide section-padding text-center relative z-10">
          <Badge variant="outline" className="mb-6 text-primary border-primary/20 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" />
            Ready to Dominate?
          </Badge>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Scale Beyond
            </span>
            <br />
            Expectations
          </h2>
          
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Join the elite businesses achieving extraordinary growth through strategic advertising excellence. 
            Your market dominance starts with a single conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="group bg-gradient-to-r from-primary via-blue-500 to-cyan-400 hover:shadow-2xl hover:shadow-primary/25 text-white text-xl px-16 py-6 rounded-2xl transition-all duration-300" asChild>
              <a href="/contact">
                Book Strategic Consultation
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button size="lg" variant="outline" className="text-xl px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white transition-all duration-300" asChild>
              <a href="/portfolio">
                Explore Success Stories
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdsManagement;