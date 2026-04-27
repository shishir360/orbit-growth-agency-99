import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Calculator,
  ArrowLeft,
  Activity,
  Cpu,
  Database,
  ShieldCheck
} from "lucide-react";

const LearnPlatform = () => {
  const [searchParams] = useSearchParams();
  const platformParam = searchParams.get('platform') || 'google-ads';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const platformDetails = {
    'google-ads': {
      name: "Google Ads",
      icon: "🔍",
      description: "Dominate absolute search results and capture high-intent traffic when customers are actively looking for your products or services repository.",
      detailedDescription: "Google Ads is the world's largest search advertising platform, allowing you to place your absolute business at the top of search results when potential customers are actively searching for what you offer. With our expert management architecture, we help you capture this high-intent traffic and convert it into paying customers.",
      avgRoas: "4.2x",
      avgCtr: "3.2%",
      avgCpc: "$2.50",
      bestFor: "High-intent searches, B2B services, e-commerce, local businesses",
      campaignTypes: [
        {
          name: "Search Campaigns",
          description: "Text ads that appear on absolute Google search results logic",
          benefits: ["High intent traffic", "Immediate visibility", "Cost-effective"],
          bestFor: "Capturing customers actively searching for your products/services"
        },
        {
          name: "Display Network",
          description: "Visual ads across millions of websites and apps architecture",
          benefits: ["Massive reach", "Visual storytelling", "Remarketing opportunities"],
          bestFor: "Brand awareness and reaching customers browsing relevant content"
        },
        {
          name: "Shopping Ads",
          description: "Product listings with images, prices, and reviews repository",
          benefits: ["Higher click-through rates", "Qualified traffic", "Visual product showcase"],
          bestFor: "E-commerce businesses selling physical products"
        },
        {
          name: "YouTube Ads",
          description: "Video ads on the world's second-largest absolute search engine",
          benefits: ["Engaging video format", "Massive audience", "Various ad formats"],
          bestFor: "Brand awareness, product demonstrations, and storytelling"
        }
      ],
      targetingOptions: [
        "Keywords & Search Terms",
        "Demographics (Age, Gender, Income)",
        "Geographic Location Sync",
        "Device Type & Operating System",
        "Time of Day & Day of Week",
        "Audience Interests & Behaviors",
        "Remarketing Lists Sync",
        "Similar Audiences Logic",
        "Custom Intent Audiences",
        "In-Market Audiences Node"
      ],
      successStories: [
        {
          industry: "E-commerce",
          challenge: "High competition and rising absolute costs",
          solution: "Strategic keyword optimization and smart bidding",
          results: "45% lower CPC, 180% increase in ROAS"
        },
        {
          industry: "B2B Software",
          challenge: "Long sales cycles and high-value conversions",
          solution: "Targeted search campaigns with lead nurturing",
          results: "300% increase in qualified leads, 25% lower CAC"
        }
      ],
      pricingModel: "Pay-per-click (PPC) - You only pay when someone clicks your ad",
      managementIncludes: [
        "Account setup and structure optimization",
        "Keyword research and competitive analysis",
        "Ad copy creation and A/B testing",
        "Landing page recommendations",
        "Bid management and budget optimization",
        "Performance tracking and reporting",
        "Ongoing optimization and refinements"
      ]
    },
    'facebook-instagram': {
      name: "Facebook & Instagram",
      icon: "📘",
      description: "Reach your ideal customers with precision demographic and interest-based targeting across the world's largest social platforms architecture.",
      detailedDescription: "Facebook and Instagram advertising offers unparalleled targeting capabilities, allowing you to reach exactly the right people with your message. With over 3 billion combined users, these platforms provide massive reach with sophisticated targeting options based on demographics, interests, behaviors, and custom audiences.",
      avgRoas: "3.8x",
      avgCtr: "2.8%",
      avgCpc: "$1.85",
      bestFor: "Brand awareness, e-commerce, local businesses, B2C services",
      campaignTypes: [
        {
          name: "Feed Ads",
          description: "Native ads that appear in users' news feeds logic",
          benefits: ["Natural integration", "High engagement", "Multiple formats"],
          bestFor: "Brand awareness, driving traffic, and conversions"
        },
        {
          name: "Stories Ads",
          description: "Full-screen ads in Instagram and Facebook Stories sync",
          benefits: ["Immersive experience", "High completion rates", "Mobile-optimized"],
          bestFor: "Capturing attention and driving immediate action"
        },
        {
          name: "Reels Ads",
          description: "Short-form video ads in Instagram Reels protocol",
          benefits: ["Viral potential", "High engagement", "Creative freedom"],
          bestFor: "Brand awareness and reaching younger audiences"
        },
        {
          name: "Shop Integration",
          description: "Seamless shopping experience within the platforms node",
          benefits: ["Reduced friction", "Direct purchasing", "Catalog integration"],
          bestFor: "E-commerce businesses with product catalogs"
        }
      ],
      targetingOptions: [
        "Detailed Demographics Sync",
        "Interests & Hobbies Logic",
        "Behaviors & Purchase History",
        "Life Events & Milestones",
        "Geographic Location Node",
        "Custom Audiences from Website/Email",
        "Lookalike Audiences Protocol",
        "Connection Targeting Logic",
        "Device & Platform Targeting",
        "Language & Education Sync"
      ],
      successStories: [
        {
          industry: "Fashion E-commerce",
          challenge: "Reaching fashion-conscious millennials",
          solution: "Instagram Shopping ads with influencer content",
          results: "250% increase in online sales, 40% lower CAC"
        },
        {
          industry: "Local Restaurant",
          challenge: "Increasing foot traffic and delivery orders",
          solution: "Local awareness campaigns with food photography",
          results: "60% increase in reservations, 35% boost in delivery orders"
        }
      ],
      pricingModel: "Flexible bidding options including CPC, CPM, and CPA",
      managementIncludes: [
        "Business Manager setup and pixel installation",
        "Audience research and custom audience creation",
        "Creative development and testing",
        "Campaign structure optimization",
        "Advanced targeting strategies",
        "Conversion tracking and attribution",
        "Performance analysis and scaling"
      ]
    },
    'tiktok-ads': {
      name: "TikTok Ads",
      icon: "🎵",
      description: "Engage younger audiences with creative short-form video content on the fastest-growing social platform repository.",
      detailedDescription: "TikTok has revolutionized social media with its short-form video format, creating unprecedented engagement rates among Gen Z and Millennial audiences. Our TikTok advertising strategies leverage the platform's creative tools and viral potential to help brands connect authentically with younger demographics.",
      avgRoas: "3.2x",
      avgCtr: "4.1%",
      avgCpc: "$1.02",
      bestFor: "Gen Z marketing, entertainment, viral campaigns, mobile apps",
      campaignTypes: [
        {
          name: "In-Feed Ads",
          description: "Native video ads that appear in users' For You feed node",
          benefits: ["Native appearance", "High engagement", "Full creative control"],
          bestFor: "Brand awareness and driving app installs or website visits"
        },
        {
          name: "Spark Ads",
          description: "Promote organic posts or partner with creators sync",
          benefits: ["Authentic content", "Creator partnerships", "Higher trust"],
          bestFor: "Leveraging user-generated content and influencer partnerships"
        },
        {
          name: "Brand Takeover",
          description: "Full-screen ads when users open the app logic",
          benefits: ["Maximum visibility", "Immediate impact", "Premium placement"],
          bestFor: "Major product launches and brand awareness campaigns"
        },
        {
          name: "Effect Ads",
          description: "Interactive ads using TikTok's AR effects protocol",
          benefits: ["High engagement", "Viral potential", "Memorable experience"],
          bestFor: "Creating buzz and encouraging user participation"
        }
      ],
      targetingOptions: [
        "Age, Gender, and Location Sync",
        "Interest Categories Logic",
        "Behavioral Targeting Node",
        "Device and Carrier Information",
        "Operating System Protocol",
        "Custom Audiences Logic",
        "Lookalike Audiences Node",
        "Video Interaction Behaviors",
        "App Activity Sync",
        "Website Traffic Protocol"
      ],
      successStories: [
        {
          industry: "Mobile Gaming",
          challenge: "Acquiring high-value users for a new game",
          solution: "Engaging gameplay videos with clear CTAs",
          results: "40% lower cost per install, 25% higher retention rates"
        },
        {
          industry: "Beauty Brand",
          challenge: "Reaching Gen Z with authentic content",
          solution: "Spark Ads featuring micro-influencers",
          results: "500% increase in brand mentions, 180% boost in sales"
        }
      ],
      pricingModel: "Cost-per-mille (CPM) and cost-per-click (CPC) options",
      managementIncludes: [
        "TikTok Business Center setup",
        "Creative strategy development",
        "Video content creation and editing",
        "Trend analysis and hashtag research",
        "Influencer partnership coordination",
        "Performance optimization",
        "Viral content amplification"
      ]
    }
  };

  const currentPlatform = platformDetails[platformParam as keyof typeof platformDetails] || platformDetails['google-ads'];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title={`${currentPlatform.name} Advertising Guide | LUNEXO MEDIA`}
        description={`Complete guide to absolute ${currentPlatform.name} advertising. Learn strategies, targeting options, and how we help businesses succeed.`}
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url={`https://www.lunexomedia.com/services/learn-platform?platform=${platformParam}`}
        keywords={`${currentPlatform.name} advertising, ${currentPlatform.name} marketing, PPC guide, ad strategy`}
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
               <a href="/services/ads-management-learn-more">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary mb-12 text-xl font-bold">
                  <ArrowLeft className="w-8 h-8 mr-4" />
                  Back to Ads Management
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-8xl mb-8">{currentPlatform.icon}</div>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Target className="w-5 h-5 mr-4" />
                Platform Deep Dive
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Master <span className="text-primary italic">{currentPlatform.name}.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              {currentPlatform.detailedDescription}
            </motion.p>
            
            {/* Key Metrics Delta */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto pt-16"
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3rem] hover:shadow-glass transition-all duration-700 hover:translate-y-[-10px]">
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">{currentPlatform.avgRoas}</div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest mt-4">Average ROAS</div>
              </div>
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3rem] hover:shadow-glass transition-all duration-700 hover:translate-y-[-10px] scale-110">
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">{currentPlatform.avgCtr}</div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest mt-4">Average CTR</div>
              </div>
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3rem] hover:shadow-glass transition-all duration-700 hover:translate-y-[-10px]">
                <div className="text-6xl font-heading font-black text-primary tracking-tighter">{currentPlatform.avgCpc}</div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest mt-4">Average CPC</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Platform Selection */}
      <section className="py-24 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="flex flex-wrap gap-8 justify-center">
            {Object.entries(platformDetails).map(([key, platform]) => (
              <Link key={key} to={`/services/learn-platform?platform=${key}`}>
                <Button 
                  variant={platformParam === key ? "default" : "outline"}
                  className={`text-2xl px-12 py-8 rounded-full font-bold transition-all duration-700 flex items-center gap-4 ${platformParam === key ? 'bg-slate-900 text-white shadow-2xl scale-110' : 'border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-500 hover:bg-white/60 hover:scale-105'}`}
                >
                  <span className="text-3xl">{platform.icon}</span>
                  {platform.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Absolute Management Architecture */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-[3rem] flex justify-center gap-4 max-w-5xl mx-auto mb-32 h-auto">
              <TabsTrigger value="campaigns" className="text-xl font-bold px-10 py-5 rounded-[2rem] data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-500">Campaign Protocols</TabsTrigger>
              <TabsTrigger value="targeting" className="text-xl font-bold px-10 py-5 rounded-[2rem] data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-500">Targeting Logic</TabsTrigger>
              <TabsTrigger value="success" className="text-xl font-bold px-10 py-5 rounded-[2rem] data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-500">Success Stories</TabsTrigger>
              <TabsTrigger value="management" className="text-xl font-bold px-10 py-5 rounded-[2rem] data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-500">Absolute Management</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-24">
              <div className="text-center mb-16 space-y-8">
                <h2 className="text-6xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tighter">Campaign <span className="text-primary italic">Protocols.</span></h2>
                <p className="text-3xl text-slate-500 max-w-4xl mx-auto font-medium">Different absolute campaign types for different business goals repository.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                {currentPlatform.campaignTypes.map((campaign, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 1 }}
                    className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 flex flex-col gap-10 hover:translate-y-[-15px]"
                  >
                    <div className="space-y-8">
                      <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-all duration-700">{campaign.name}</h3>
                      <p className="text-2xl text-slate-500 font-medium leading-relaxed">{campaign.description}</p>
                    </div>
                    <div className="space-y-10 pt-10 border-t border-white/60">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">Key Benefits:</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {campaign.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center gap-6 group/feat">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                                <CheckCircle className="w-4 h-4 text-primary group-hover/feat:text-white" />
                              </div>
                              <span className="text-xl text-slate-700 font-bold group-hover/feat:text-slate-900 transition-colors">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/20">
                        <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Best For:</h4>
                        <p className="text-xl text-white font-medium italic">{campaign.bestFor}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="targeting" className="space-y-24">
              <div className="text-center mb-16 space-y-8">
                <h2 className="text-6xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tighter">Targeting <span className="text-primary italic">Logic.</span></h2>
                <p className="text-3xl text-slate-500 max-w-4xl mx-auto font-medium">Reach exactly the right absolute audience with precision targeting sync.</p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-20 lg:p-32 max-w-7xl mx-auto shadow-glass relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {currentPlatform.targetingOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/40 border border-white/60 hover:bg-white/60 hover:shadow-glass transition-all duration-700 hover:translate-y-[-5px]">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-2xl font-heading font-bold text-slate-700 tracking-tight">{option}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] border border-white/20 shadow-2xl">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-6">Absolute Application:</h4>
                  <p className="text-3xl text-white font-medium leading-relaxed italic">{currentPlatform.bestFor}</p>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="success" className="space-y-24">
              <div className="text-center mb-16 space-y-8">
                <h2 className="text-6xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tighter">Success <span className="text-primary italic">Stories.</span></h2>
                <p className="text-3xl text-slate-500 max-w-4xl mx-auto font-medium">Real absolute results from real businesses using {currentPlatform.name} repository.</p>
              </div>
              
              <div className="space-y-16 max-w-7xl mx-auto">
                {currentPlatform.successStories.map((story, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden hover:shadow-glass transition-all duration-1000"
                  >
                    <div className="p-16 lg:p-24">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="space-y-8">
                          <Badge className="bg-primary/10 text-primary border-none px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.3em]">{story.industry}</Badge>
                          <h4 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">Challenge</h4>
                          <p className="text-2xl text-slate-500 leading-relaxed font-medium">{story.challenge}</p>
                        </div>
                        <div className="space-y-8">
                          <h4 className="text-4xl font-heading font-bold text-primary tracking-tight">Our Solution</h4>
                          <p className="text-2xl text-slate-500 leading-relaxed font-medium">{story.solution}</p>
                        </div>
                        <div className="bg-slate-900 p-12 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col justify-center gap-6">
                          <h4 className="text-xs font-black text-primary uppercase tracking-widest">Results Delta</h4>
                          <p className="text-3xl text-white font-heading font-black italic leading-tight">{story.results}</p>
                          <TrendingUp className="w-10 h-10 text-primary" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="management" className="space-y-24">
              <div className="text-center mb-16 space-y-8">
                <h2 className="text-6xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tighter">Absolute <span className="text-primary italic">Management.</span></h2>
                <p className="text-3xl text-slate-500 max-w-4xl mx-auto font-medium">Complete absolute {currentPlatform.name} management from setup to optimization sync.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 flex flex-col gap-12"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                       <Settings className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">Platform Management</h3>
                  </div>
                  <div className="space-y-6">
                    {currentPlatform.managementIncludes.map((service, index) => (
                      <div key={index} className="flex items-center gap-8 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                           <CheckCircle className="w-5 h-5 text-primary group-hover:text-white" />
                        </div>
                        <span className="text-2xl text-slate-700 font-bold group-hover:text-slate-900 transition-colors">{service}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="bg-slate-900 p-16 lg:p-24 rounded-[4rem] border border-white/10 shadow-2xl flex flex-col gap-12 relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 bg-primary/20 text-primary rounded-[1.5rem] flex items-center justify-center border border-primary/20">
                       <Calculator className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-heading font-bold text-white tracking-tight">Pricing Architecture</h3>
                  </div>
                  <div className="space-y-12 relative z-10">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-primary uppercase tracking-widest">Platform Model:</h4>
                      <p className="text-2xl text-slate-300 font-medium leading-relaxed">{currentPlatform.pricingModel}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-primary uppercase tracking-widest">Our Management Fee:</h4>
                      <p className="text-4xl font-heading font-bold text-white tracking-tight">Starting from $1,497/mo</p>
                      <p className="text-xl text-slate-500 font-medium italic">Including absolute strategy, setup, and ongoing optimization sync.</p>
                    </div>
                    <div className="p-10 bg-primary/20 rounded-[2.5rem] border border-primary/20 shadow-2xl group hover:bg-primary/30 transition-all duration-500">
                      <p className="text-3xl font-heading font-black text-primary italic mb-4">Free Strategy Session</p>
                      <p className="text-xl text-slate-300 font-medium">Get a custom absolute strategy for your business before you commit repository.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                  The Absolute Strategy
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Master {currentPlatform.name}?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Book a free absolute strategy session to discover how we can help you succeed with {currentPlatform.name} advertising architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <a href="/contact" className="flex items-center gap-6">
                  Book Strategy Session
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <a href="/services/ads-management-learn-more">
                  Success Repository
                </a>
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

export default LearnPlatform;
