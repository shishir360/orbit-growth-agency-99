import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import ServiceSchema from "@/components/ui/service-schema";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
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
  Rocket,
  Trophy,
  Globe,
  Shield,
  Sparkles,
  Play
} from "lucide-react";

const AdsManagement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Platform logos with actual brand colors
  const platformLogos = [
    {
      name: "Google Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      color: "from-blue-500 to-green-500",
      description: "Search, Display & YouTube",
      roas: "5.2x"
    },
    {
      name: "Meta Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "from-blue-600 to-purple-600",
      description: "Facebook & Instagram",
      roas: "4.8x"
    },
    {
      name: "TikTok Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#FF0050" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: "from-pink-500 to-cyan-400",
      description: "Viral Marketing",
      roas: "6.4x"
    },
    {
      name: "LinkedIn Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "from-blue-700 to-blue-500",
      description: "B2B Excellence",
      roas: "7.1x"
    },
    {
      name: "YouTube Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: "from-red-600 to-red-500",
      description: "Video Authority",
      roas: "4.2x"
    },
    {
      name: "Microsoft Ads",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#F25022" d="M0 0h11.377v11.377H0z"/>
          <path fill="#00A4EF" d="M0 12.623h11.377V24H0z"/>
          <path fill="#7FBA00" d="M12.623 0H24v11.377H12.623z"/>
          <path fill="#FFB900" d="M12.623 12.623H24V24H12.623z"/>
        </svg>
      ),
      color: "from-blue-500 to-green-500",
      description: "Bing & Partner Networks",
      roas: "5.8x"
    }
  ];

  const premiumServices = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Campaign Architecture",
      description: "Enterprise-level advertising strategy with advanced targeting methodologies and cross-platform optimization.",
      features: ["Advanced Audience Intelligence", "Competitive Market Analysis", "Multi-Channel Attribution", "Performance Forecasting"],
      metrics: { roas: "540%", ctr: "4.8%", conv: "24%" }
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data Science & Analytics",
      description: "AI-powered performance optimization using machine learning algorithms and predictive analytics.",
      features: ["Predictive Analytics", "Real-Time Optimization", "Custom Attribution Models", "Advanced Segmentation"],
      metrics: { roas: "480%", ctr: "5.2%", conv: "28%" }
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Omnichannel Dominance",
      description: "Comprehensive advertising across all major platforms with unified messaging and budget allocation.",
      features: ["Platform Optimization", "Creative Automation", "Budget Intelligence", "Cross-Platform Tracking"],
      metrics: { roas: "620%", ctr: "4.2%", conv: "31%" }
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Growth Acceleration Engine",
      description: "Rapid scaling solutions for ambitious businesses ready to dominate their market.",
      features: ["Rapid Scaling", "Market Expansion", "Competitive Advantage", "ROI Maximization"],
      metrics: { roas: "720%", ctr: "6.1%", conv: "34%" }
    }
  ];

  const results = [
    { metric: "Average ROAS", value: "640%", icon: <TrendingUp className="w-6 h-6" /> },
    { metric: "Client Revenue", value: "$127M+", icon: <DollarSign className="w-6 h-6" /> },
    { metric: "Success Rate", value: "98.4%", icon: <Trophy className="w-6 h-6" /> },
    { metric: "Global Reach", value: "47", icon: <Globe className="w-6 h-6" /> }
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
      timeline: "18 months"
    },
    {
      title: "Global E-commerce Empire",
      industry: "Retail",
      challenge: "International expansion and market dominance",
      solution: "Localized campaigns across 12 countries with dynamic creative",
      results: ["2,400% international growth", "620% ROAS", "Market leadership"],
      investment: "$3.8M",
      returns: "$89M",
      timeline: "24 months"
    },
    {
      title: "FinTech Disruption",
      industry: "Financial Technology",
      challenge: "Break into competitive financial services market",
      solution: "Precision targeting with compliance-focused creative strategy",
      results: ["$50M+ in loans originated", "340% conversion rate", "Market penetration"],
      investment: "$1.9M",
      returns: "$23M",
      timeline: "12 months"
    }
  ];

  useEffect(() => {
    document.title = "Paid Advertising & PPC Management | Lunexo Media";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      <SEO
        title="Paid Advertising & PPC Management | Lunexo Media"
        description="Maximize ROI with targeted Google Ads, Facebook Ads, and social media ad campaigns managed by Lunexo Media's digital experts."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/ads-management"
        keywords="Google Ads, Facebook Ads, PPC management, paid advertising, digital advertising, ROI optimization"
      />
      
      <ServiceSchema
        name="Paid Advertising & PPC Management"
        description="Expert PPC management services for Google Ads, Facebook Ads, and social media campaigns."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="PPC Management, Google Ads, Facebook Ads, Social Media Advertising"
        url="https://www.lunexomedia.com/ads-management"
        image="https://www.lunexomedia.com/og-image-new.jpg"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 98 }}
      />
      
      <Navigation />
      
      {/* Premium Dark Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center space-y-10"
          >
            {/* Breadcrumb */}
            <div className="mb-8">
              <BreadcrumbSEO 
                items={[{ label: "Services", href: "/services-explore" }]}
                currentPage="Ads Management"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-3 text-lg font-medium rounded-full backdrop-blur-sm">
                <Sparkles className="w-5 h-5 mr-2" />
                Premium Performance Marketing
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
            >
              <span className="text-white">Paid Ads &</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                PPC Management
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Enterprise-grade advertising delivering{" "}
              <span className="text-cyan-400 font-bold">640% average ROAS</span> through 
              strategic campaigns that dominate markets.
            </motion.p>

            {/* Metrics Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
            >
              {[
                { value: "$127M+", label: "Revenue Generated" },
                { value: "640%", label: "Average ROAS" },
                { value: "98.4%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-400 mt-2 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center pt-6"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-10 py-7 rounded-2xl font-semibold shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <a href="https://lunexomedia.com/contact">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-7 rounded-2xl border-2 border-gray-600 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://lunexomedia.com/portfolio">
                  View Success Stories
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-8 h-12 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-cyan-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Platform Logos Section - Premium Style */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Certified Partners
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Master Every Major Platform
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Certified advertising experts delivering exceptional results across all platforms
            </p>
          </motion.div>

          {/* Platform Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platformLogos.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {platform.logo}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{platform.name}</h3>
                    <p className="text-gray-500 text-xs mb-3">{platform.description}</p>
                    <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                      {platform.roas} ROAS
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-5 py-2 mb-6">
              <Target className="w-4 h-4 mr-2" />
              Enterprise Solutions
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Strategic Campaign
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Advanced advertising solutions designed for businesses demanding 
              <span className="text-cyan-400 font-semibold"> market dominance</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {premiumServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card 
                  className={`group bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm cursor-pointer overflow-hidden ${activeService === index ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : ''}`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="p-8 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                          {service.title}
                        </CardTitle>
                        <p className="text-gray-400 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0 relative z-10">
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-center">
                        <div className="text-xl font-bold text-cyan-400">{service.metrics.roas}</div>
                        <div className="text-xs text-gray-500">ROAS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">{service.metrics.ctr}</div>
                        <div className="text-xs text-gray-500">CTR</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-400">{service.metrics.conv}</div>
                        <div className="text-xs text-gray-500">Conv Rate</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/10 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 text-gray-300 transition-all duration-300 rounded-xl group/btn"
                    >
                      Explore Features
                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-5 py-2 mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Proven Excellence
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Extraordinary{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Results
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 text-center p-8 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {result.icon}
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {result.value}
                  </div>
                  <div className="text-gray-400 font-medium">{result.metric}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Elite Case Studies</h3>
            
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 p-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                      
                      <div className="relative z-10">
                        <Badge className="bg-white/20 text-white border-white/30 mb-4">
                          {study.industry}
                        </Badge>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6">{study.title}</h4>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="text-2xl font-bold text-white">{study.investment}</div>
                            <div className="text-sm text-white/70">Ad Investment</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">{study.returns}</div>
                            <div className="text-sm text-white/70">Revenue Generated</div>
                          </div>
                        </div>
                        <div className="text-white/80">{study.timeline}</div>
                      </div>
                    </div>
                    
                    <div className="p-10 bg-slate-900/50">
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-bold text-red-400 mb-2">Challenge</h5>
                          <p className="text-gray-400">{study.challenge}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-blue-400 mb-2">Solution</h5>
                          <p className="text-gray-400">{study.solution}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-green-400 mb-3">Results</h5>
                          <div className="space-y-2">
                            {study.results.map((result, rIndex) => (
                              <div key={rIndex} className="flex items-center gap-3">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-white font-medium">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-5 py-2 mb-8">
              <Rocket className="w-4 h-4 mr-2" />
              Ready to Dominate?
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
              Scale Beyond{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Expectations
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join elite businesses achieving extraordinary growth through strategic advertising excellence. 
              Your market dominance starts with a single conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-12 py-7 rounded-2xl font-semibold shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <a href="https://lunexomedia.com/contact">
                  Book Strategic Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-12 py-7 rounded-2xl border-2 border-gray-600 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://lunexomedia.com/portfolio">
                  Explore Success Stories
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdsManagement;
