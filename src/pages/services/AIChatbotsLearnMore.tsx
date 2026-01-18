import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  MessageSquare, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Bot,
  Brain,
  Zap,
  Settings,
  PhoneCall,
  Mail,
  Globe
} from "lucide-react";

const AIChatbotsLearnMore = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Natural Language Processing",
      description: "Advanced NLP that understands context, intent, and nuances in customer conversations"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Never miss a customer inquiry with round-the-clock automated support"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Platform Integration",
      description: "Deploy across websites, social media, messaging apps, and mobile platforms"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Training",
      description: "Tailored to your business knowledge base and specific industry requirements"
    }
  ];

  const platforms = [
    { name: "Website", icon: <Globe className="w-5 h-5" />, description: "Embedded chat widgets" },
    { name: "Facebook Messenger", icon: <MessageSquare className="w-5 h-5" />, description: "Social media integration" },
    { name: "WhatsApp", icon: <PhoneCall className="w-5 h-5" />, description: "Direct messaging support" },
    { name: "Email", icon: <Mail className="w-5 h-5" />, description: "Email response automation" }
  ];

  const useCases = [
    {
      title: "Customer Support",
      description: "Handle FAQs, troubleshooting, and issue resolution automatically",
      results: "80% reduction in support tickets"
    },
    {
      title: "Lead Qualification",
      description: "Qualify prospects and collect contact information 24/7",
      results: "300% increase in qualified leads"
    },
    {
      title: "Appointment Booking",
      description: "Schedule meetings and appointments without human intervention",
      results: "50% reduction in no-shows"
    },
    {
      title: "E-commerce Support",
      description: "Order tracking, product recommendations, and purchase assistance",
      results: "25% increase in conversion rates"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Chatbots - Intelligent Customer Support | LUNEXO MEDIA"
        description="Deploy smart AI chatbots that handle customer inquiries 24/7. Reduce support costs while improving customer satisfaction with intelligent automation."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/ai-chatbots-learn-more"
        keywords="AI chatbots, customer support automation, intelligent chatbot, 24/7 support, conversational AI"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Chatbots
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Intelligent Customer Support That Never Sleeps
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your customer service with AI-powered chatbots that understand context, resolve issues instantly, and provide 24/7 support across all platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://lunexomedia.com/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg">
                  Get Custom Chatbot Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button size="lg" variant="outline">
                <Bot className="w-5 h-5 mr-2" />
                See Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Advanced Chatbot Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI chatbots are powered by cutting-edge technology to deliver human-like conversations and intelligent problem-solving.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
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

      {/* Platform Integration */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Multi-Platform Deployment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deploy your chatbot across all customer touchpoints for seamless omnichannel support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {platform.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Proven Use Cases & Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how businesses across industries are leveraging AI chatbots to improve efficiency and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {useCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-600">{useCase.results}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-wide section-padding">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Deploy Your AI Chatbot?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of businesses that have transformed their customer support with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://lunexomedia.com/contact">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white">
                    Start Your Chatbot Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="https://lunexomedia.com/services/ai-automation-learn-more">
                  <Button size="lg" variant="outline">
                    View All AI Services
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

export default AIChatbotsLearnMore;