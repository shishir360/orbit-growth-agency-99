
import { Link, useSearchParams } from "react-router-dom";
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
  Calculator,
  ArrowLeft
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";

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
      description: "Dominate search results and capture high-intent traffic when customers are actively looking for your products or services",
      detailedDescription: "Google Ads is the world's largest search advertising platform, allowing you to place your business at the top of search results when potential customers are actively searching for what you offer. With our expert management, we help you capture this high-intent traffic and convert it into paying customers.",
      avgRoas: "4.2x",
      avgCtr: "3.2%",
      avgCpc: "$2.50",
      bestFor: "High-intent searches, B2B services, e-commerce, local businesses",
      campaignTypes: [
        {
          name: "Search Campaigns",
          description: "Text ads that appear on Google search results",
          benefits: ["High intent traffic", "Immediate visibility", "Cost-effective"],
          bestFor: "Capturing customers actively searching for your products/services"
        },
        {
          name: "Display Network",
          description: "Visual ads across millions of websites and apps",
          benefits: ["Massive reach", "Visual storytelling", "Remarketing opportunities"],
          bestFor: "Brand awareness and reaching customers browsing relevant content"
        },
        {
          name: "Shopping Ads",
          description: "Product listings with images, prices, and reviews",
          benefits: ["Higher click-through rates", "Qualified traffic", "Visual product showcase"],
          bestFor: "E-commerce businesses selling physical products"
        },
        {
          name: "YouTube Ads",
          description: "Video ads on the world's second-largest search engine",
          benefits: ["Engaging video format", "Massive audience", "Various ad formats"],
          bestFor: "Brand awareness, product demonstrations, and storytelling"
        }
      ],
      targetingOptions: [
        "Keywords & Search Terms",
        "Demographics (Age, Gender, Income)",
        "Geographic Location",
        "Device Type & Operating System",
        "Time of Day & Day of Week",
        "Audience Interests & Behaviors",
        "Remarketing Lists",
        "Similar Audiences",
        "Custom Intent Audiences",
        "In-Market Audiences"
      ],
      successStories: [
        {
          industry: "E-commerce",
          challenge: "High competition and rising costs",
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
      description: "Reach your ideal customers with precision demographic and interest-based targeting across the world's largest social platforms",
      detailedDescription: "Facebook and Instagram advertising offers unparalleled targeting capabilities, allowing you to reach exactly the right people with your message. With over 3 billion combined users, these platforms provide massive reach with sophisticated targeting options based on demographics, interests, behaviors, and custom audiences.",
      avgRoas: "3.8x",
      avgCtr: "2.8%",
      avgCpc: "$1.85",
      bestFor: "Brand awareness, e-commerce, local businesses, B2C services",
      campaignTypes: [
        {
          name: "Feed Ads",
          description: "Native ads that appear in users' news feeds",
          benefits: ["Natural integration", "High engagement", "Multiple formats"],
          bestFor: "Brand awareness, driving traffic, and conversions"
        },
        {
          name: "Stories Ads",
          description: "Full-screen ads in Instagram and Facebook Stories",
          benefits: ["Immersive experience", "High completion rates", "Mobile-optimized"],
          bestFor: "Capturing attention and driving immediate action"
        },
        {
          name: "Reels Ads",
          description: "Short-form video ads in Instagram Reels",
          benefits: ["Viral potential", "High engagement", "Creative freedom"],
          bestFor: "Brand awareness and reaching younger audiences"
        },
        {
          name: "Shop Integration",
          description: "Seamless shopping experience within the platforms",
          benefits: ["Reduced friction", "Direct purchasing", "Catalog integration"],
          bestFor: "E-commerce businesses with product catalogs"
        }
      ],
      targetingOptions: [
        "Detailed Demographics",
        "Interests & Hobbies",
        "Behaviors & Purchase History",
        "Life Events & Milestones",
        "Geographic Location",
        "Custom Audiences from Website/Email",
        "Lookalike Audiences",
        "Connection Targeting",
        "Device & Platform Targeting",
        "Language & Education"
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
      description: "Engage younger audiences with creative short-form video content on the fastest-growing social platform",
      detailedDescription: "TikTok has revolutionized social media with its short-form video format, creating unprecedented engagement rates among Gen Z and Millennial audiences. Our TikTok advertising strategies leverage the platform's creative tools and viral potential to help brands connect authentically with younger demographics.",
      avgRoas: "3.2x",
      avgCtr: "4.1%",
      avgCpc: "$1.02",
      bestFor: "Gen Z marketing, entertainment, viral campaigns, mobile apps",
      campaignTypes: [
        {
          name: "In-Feed Ads",
          description: "Native video ads that appear in users' For You feed",
          benefits: ["Native appearance", "High engagement", "Full creative control"],
          bestFor: "Brand awareness and driving app installs or website visits"
        },
        {
          name: "Spark Ads",
          description: "Promote organic posts or partner with creators",
          benefits: ["Authentic content", "Creator partnerships", "Higher trust"],
          bestFor: "Leveraging user-generated content and influencer partnerships"
        },
        {
          name: "Brand Takeover",
          description: "Full-screen ads when users open the app",
          benefits: ["Maximum visibility", "Immediate impact", "Premium placement"],
          bestFor: "Major product launches and brand awareness campaigns"
        },
        {
          name: "Effect Ads",
          description: "Interactive ads using TikTok's AR effects",
          benefits: ["High engagement", "Viral potential", "Memorable experience"],
          bestFor: "Creating buzz and encouraging user participation"
        }
      ],
      targetingOptions: [
        "Age, Gender, and Location",
        "Interest Categories",
        "Behavioral Targeting",
        "Device and Carrier Information",
        "Operating System",
        "Custom Audiences",
        "Lookalike Audiences",
        "Video Interaction Behaviors",
        "App Activity",
        "Website Traffic"
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
    <div className="min-h-screen bg-background">
      <SEO
        title={`${currentPlatform.name} Advertising Guide | LUNEXO MEDIA`}
        description={`Complete guide to ${currentPlatform.name} advertising. Learn strategies, targeting options, and how we help businesses succeed on this platform.`}
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url={`https://www.lunexomedia.com/services/learn-platform?platform=${platformParam}`}
        keywords={`${currentPlatform.name} advertising, ${currentPlatform.name} marketing, PPC guide, ad strategy`}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background/50 to-muted/30 relative overflow-hidden">
        <ThreeDBackground />
        <div className="container-wide section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <a href="https://lunexomedia.com/services/ads-management-learn-more">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Ads Management
                </Button>
              </a>
            </div>
            
            <div className="text-center mb-16">
              <div className="text-6xl mb-6">{currentPlatform.icon}</div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/20 text-lg px-4 py-2">
                <Target className="w-5 h-5 mr-2" />
                Platform Deep Dive
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                Master {currentPlatform.name}
              </h1>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
                {currentPlatform.detailedDescription}
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{currentPlatform.avgRoas}</div>
                  <div className="text-sm text-muted-foreground">Average ROAS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{currentPlatform.avgCtr}</div>
                  <div className="text-sm text-muted-foreground">Average CTR</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{currentPlatform.avgCpc}</div>
                  <div className="text-sm text-muted-foreground">Average CPC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Selection */}
      <section className="py-12 bg-white border-b">
        <div className="container-wide section-padding">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(platformDetails).map(([key, platform]) => (
              <Link key={key} to={`/services/learn-platform?platform=${key}`}>
                <Button 
                  variant={platformParam === key ? "default" : "outline"}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">{platform.icon}</span>
                  {platform.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="campaigns">Campaign Types</TabsTrigger>
              <TabsTrigger value="targeting">Targeting Options</TabsTrigger>
              <TabsTrigger value="success">Success Stories</TabsTrigger>
              <TabsTrigger value="management">Our Management</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Campaign Types We Manage</h2>
                <p className="text-xl text-muted-foreground">Different campaign types for different business goals</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentPlatform.campaignTypes.map((campaign, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{campaign.name}</CardTitle>
                      <p className="text-muted-foreground">{campaign.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 text-green-600">Key Benefits:</h4>
                          <div className="space-y-2">
                            {campaign.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Best For:</h4>
                          <p className="text-sm text-muted-foreground">{campaign.bestFor}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="targeting" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Advanced Targeting Options</h2>
                <p className="text-xl text-muted-foreground">Reach exactly the right audience with precision targeting</p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Available Targeting Methods</CardTitle>
                  <p className="text-muted-foreground">
                    We leverage all available targeting options to ensure your ads reach the most relevant audience
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPlatform.targetingOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <Target className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Best For:</h4>
                    <p className="text-muted-foreground">{currentPlatform.bestFor}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="success" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
                <p className="text-xl text-muted-foreground">Real results from real businesses using {currentPlatform.name}</p>
              </div>
              
              <div className="space-y-8">
                {currentPlatform.successStories.map((story, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div>
                          <Badge variant="outline" className="mb-4">{story.industry}</Badge>
                          <h4 className="text-xl font-bold mb-4">Challenge</h4>
                          <p className="text-muted-foreground">{story.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-blue-600">Our Solution</h4>
                          <p className="text-muted-foreground">{story.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-green-600">Results</h4>
                          <p className="text-muted-foreground font-semibold">{story.results}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="management" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">What's Included in Our Management</h2>
                <p className="text-xl text-muted-foreground">Complete {currentPlatform.name} management from setup to optimization</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Platform Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentPlatform.managementIncludes.map((service, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      Pricing Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Platform Pricing:</h4>
                        <p className="text-sm text-muted-foreground">{currentPlatform.pricingModel}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Our Management Fee:</h4>
                        <p className="text-sm text-muted-foreground">Starting from $1,497/month including strategy, setup, and ongoing optimization</p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary">Free Strategy Call</p>
                        <p className="text-xs text-muted-foreground">Get a custom strategy for your business before you commit</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-wide section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Master {currentPlatform.name}?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Book a free strategy call to discover how we can help you succeed with {currentPlatform.name} advertising
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg" asChild>
              <a href="https://lunexomedia.com/book-apartment">Book Strategy Call</a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white" asChild>
              <a href="https://lunexomedia.com/services/ads-management-learn-more">Back to All Platforms</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnPlatform;
