import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Mail, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Target,
  BarChart3,
  Zap,
  Settings,
  Calendar,
  UserPlus
} from "lucide-react";

const EmailAutomationLearnMore = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Dynamic Personalization",
      description: "AI-powered content that adapts to each recipient's behavior, preferences, and purchase history"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Behavioral Triggers",
      description: "Automated sequences triggered by user actions, website visits, and engagement patterns"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "A/B Testing",
      description: "Continuous optimization through split testing of subject lines, content, and send times"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Advanced Segmentation",
      description: "Intelligent audience segmentation based on demographics, behavior, and lifecycle stage"
    }
  ];

  const automationTypes = [
    {
      title: "Welcome Series",
      description: "Onboard new subscribers with a personalized email journey",
      results: "150% higher engagement",
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      title: "Abandoned Cart Recovery",
      description: "Win back customers who left items in their shopping cart",
      results: "30% recovery rate",
      icon: <Mail className="w-5 h-5" />
    },
    {
      title: "Lead Nurturing",
      description: "Guide prospects through the sales funnel with targeted content",
      results: "50% more qualified leads",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "Re-engagement Campaigns",
      description: "Reactivate dormant subscribers with compelling offers",
      results: "25% reactivation rate",
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const metrics = [
    { label: "Open Rate", value: "45%", change: "+180%" },
    { label: "Click Rate", value: "12%", change: "+250%" },
    { label: "Conversion Rate", value: "8%", change: "+400%" },
    { label: "Revenue Per Email", value: "$4.50", change: "+320%" }
  ];

  const integrations = [
    "Mailchimp", "HubSpot", "Klaviyo", "ActiveCampaign", "ConvertKit", "Salesforce",
    "Shopify", "WooCommerce", "Stripe", "PayPal", "Zapier", "Make"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Email Automation Services - AI-Powered Email Marketing | LUNEXO MEDIA"
        description="Boost email performance with AI-driven automation. Personalized sequences, behavioral triggers, and advanced segmentation that convert."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/email-automation-learn-more"
        keywords="email automation, email marketing, AI email, personalized emails, automated sequences"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              <Mail className="w-4 h-4 mr-2" />
              Email Automation
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Personalized Email Automation That Converts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your email marketing with AI-powered automation that delivers the right message to the right person at the perfect time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://lunexomedia.com/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  Launch Email Automation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button size="lg" variant="outline">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Performance Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Proven Email Performance Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered email automation consistently outperforms industry standards across all key metrics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                  <div className="text-xs text-green-600 font-semibold">{metric.change} vs industry avg</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Advanced Email Automation Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leverage cutting-edge AI technology to create email campaigns that adapt and improve automatically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Email Automation Workflows
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive automation workflows designed to guide customers through every stage of their journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {automationTypes.map((automation, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-600">
                      {automation.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {automation.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{automation.description}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-600">{automation.results}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Seamless Platform Integrations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with your existing tools and platforms for a unified marketing ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-all duration-300">
                <div className="font-semibold text-sm">{integration}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <div className="container-wide section-padding">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Automate Your Email Marketing?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join successful businesses that have increased their email ROI by over 400% with our automation solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://lunexomedia.com/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Start Email Automation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="https://lunexomedia.com/services/ai-automation-learn-more">
                  <Button size="lg" variant="outline">
                    Explore AI Automation
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmailAutomationLearnMore;