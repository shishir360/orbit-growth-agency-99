import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Phone, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Mic,
  Volume2,
  Settings,
  Calendar,
  HeadphonesIcon,
  MessageCircle
} from "lucide-react";

const VoiceAgentsLearnMore = () => {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Advanced Speech Recognition",
      description: "State-of-the-art ASR technology that understands accents, dialects, and natural speech patterns"
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Natural Voice Synthesis",
      description: "Human-like voice generation with emotional context and brand-appropriate tone"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Conversational AI",
      description: "Intelligent dialogue management that handles complex multi-turn conversations"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Voice Training",
      description: "Personalized voice models trained on your specific industry terminology and workflows"
    }
  ];

  const useCases = [
    {
      title: "Appointment Scheduling",
      description: "Automated booking system that handles cancellations, reschedules, and confirmations",
      results: "85% booking automation",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Customer Support",
      description: "Handle inquiries, troubleshooting, and issue resolution via phone calls",
      results: "70% first-call resolution",
      icon: <HeadphonesIcon className="w-5 h-5" />
    },
    {
      title: "Lead Qualification",
      description: "Screen prospects and gather qualifying information through natural conversations",
      results: "300% more qualified leads",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Order Management",
      description: "Process orders, handle returns, and provide order status updates via voice",
      results: "50% faster processing",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const capabilities = [
    "Multi-language support (50+ languages)",
    "Real-time sentiment analysis",
    "Call routing and escalation",
    "CRM integration and data sync",
    "Voice biometric authentication",
    "HIPAA and compliance ready"
  ];

  const metrics = [
    { label: "Call Volume Handled", value: "10K+", description: "Monthly automated calls" },
    { label: "Response Time", value: "<2sec", description: "Average response time" },
    { label: "Accuracy Rate", value: "95%", description: "Speech recognition accuracy" },
    { label: "Cost Reduction", value: "60%", description: "vs traditional call centers" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Voice Agents - Intelligent Phone Automation | LUNEXO MEDIA"
        description="Deploy AI voice agents that handle calls, book appointments, and provide customer support with human-like conversations 24/7."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/voice-agents-learn-more"
        keywords="AI voice agents, phone automation, voice AI, automated calls, conversational AI"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-500/10 via-background to-blue-500/10">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              <Phone className="w-4 h-4 mr-2" />
              Voice Agents
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Voice Agents That Sound Human
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Deploy intelligent voice assistants that handle phone calls, book appointments, and provide customer support with natural, human-like conversations 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://lunexomedia.com/contact">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                  Deploy Voice Agent
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button size="lg" variant="outline">
                <Phone className="w-5 h-5 mr-2" />
                Listen to Demo Call
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
              Voice Agent Performance Metrics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI voice agents deliver enterprise-grade performance with human-like conversation quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{metric.value}</div>
                  <div className="text-sm font-semibold mb-2">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
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
              Advanced Voice Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by cutting-edge AI that understands context, emotion, and intent in natural conversations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
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

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Voice Agent Applications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your phone operations with AI agents that handle complex tasks and deliver exceptional customer experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600">
                      {useCase.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {useCase.title}
                    </CardTitle>
                  </div>
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

      {/* Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for scale with security, compliance, and integration features that enterprise businesses require.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium">{capability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
        <div className="container-wide section-padding">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Deploy Your Voice Agent?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your phone operations with AI voice agents that work around the clock.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://lunexomedia.com/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Launch Voice Agent
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

export default VoiceAgentsLearnMore;