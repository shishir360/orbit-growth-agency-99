import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Bot, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Workflow,
  Database,
  Settings,
  Zap,
  FileText,
  BarChart3
} from "lucide-react";

const WorkflowAutomationLearnMore = () => {
  const features = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Process Optimization",
      description: "Analyze and streamline existing workflows to eliminate bottlenecks and redundancies"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Integration",
      description: "Seamlessly connect all your business systems and tools for unified data flow"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Workflows",
      description: "Build tailored automation sequences that match your unique business processes"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description: "Track workflow performance and receive alerts for any issues or bottlenecks"
    }
  ];

  const automationAreas = [
    {
      title: "Lead Management",
      description: "Automate lead capture, scoring, nurturing, and handoff to sales teams",
      results: "400% faster lead processing",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Document Processing",
      description: "Extract, classify, and route documents automatically across your organization",
      results: "80% time savings",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Customer Onboarding",
      description: "Streamline new customer setup with automated workflows and checkpoints",
      results: "50% faster onboarding",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: "Inventory Management",
      description: "Automate stock monitoring, reordering, and supplier communications",
      results: "30% cost reduction",
      icon: <Database className="w-5 h-5" />
    }
  ];

  const integrations = [
    {
      category: "CRM Systems",
      tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"]
    },
    {
      category: "Productivity",
      tools: ["Slack", "Microsoft Teams", "Asana", "Trello"]
    },
    {
      category: "E-commerce",
      tools: ["Shopify", "WooCommerce", "Magento", "BigCommerce"]
    },
    {
      category: "Finance",
      tools: ["QuickBooks", "Xero", "Stripe", "PayPal"]
    }
  ];

  const benefits = [
    { stat: "75%", description: "Reduction in manual tasks", icon: <Clock className="w-6 h-6" /> },
    { stat: "300%", description: "Increase in process efficiency", icon: <TrendingUp className="w-6 h-6" /> },
    { stat: "90%", description: "Fewer human errors", icon: <CheckCircle className="w-6 h-6" /> },
    { stat: "24/7", description: "Continuous operation", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Workflow Automation Services - Streamline Business Processes | LUNEXO MEDIA"
        description="Automate repetitive business processes with custom workflow solutions. Increase efficiency, reduce errors, and scale your operations."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/workflow-automation-learn-more"
        keywords="workflow automation, business process automation, task automation, efficiency tools"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-500/10 via-background to-blue-500/10">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              <Bot className="w-4 h-4 mr-2" />
              Workflow Automation
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Eliminate Manual Work with Smart Automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform repetitive business processes into intelligent automated workflows that save time, reduce errors, and scale with your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://lunexomedia.com/contact">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg">
                  Automate Your Workflows
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button size="lg" variant="outline">
                <Workflow className="w-5 h-5 mr-2" />
                View Workflow Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Workflow Automation Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Measurable improvements in efficiency, accuracy, and scalability across all business operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {benefit.icon}
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{benefit.stat}</div>
                  <div className="text-sm text-muted-foreground">{benefit.description}</div>
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
              Advanced Automation Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive workflow automation tools designed to handle complex business processes with intelligence and precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
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

      {/* Automation Areas */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Key Automation Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform critical business processes with intelligent automation that delivers measurable results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {automationAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600">
                      {area.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {area.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{area.description}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-600">{area.results}</span>
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
              Seamless Tool Integrations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect all your existing business tools and platforms for unified, automated workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-center">{integration.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {integration.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-500/5 to-blue-500/5">
        <div className="container-wide section-padding">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Automate Your Business Processes?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of businesses that have eliminated manual work and accelerated growth with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://lunexomedia.com/contact">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                    Start Workflow Automation
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

export default WorkflowAutomationLearnMore;