import { Link } from "react-router-dom";
import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import ServiceSchema from "@/components/ui/service-schema";
import FAQSchema from "@/components/ui/faq-schema";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { 
  Brain, 
  MessageSquare, 
  Mail, 
  Phone, 
  Bot,
  Zap,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronRight,
  Clock,
  Shield,
  Lightbulb,
  Sparkles,
  Rocket,
  Trophy,
  Globe,
  Settings,
  Target,
  BarChart3
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";

const AIAutomation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const aiSolutions = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Cognitive AI Chatbots",
      description: "Next-generation conversational AI with advanced natural language processing, context awareness, and emotional intelligence for superior customer experiences.",
      features: ["Advanced NLP", "Contextual Memory", "Emotional Intelligence", "Multi-Language Support"],
      metrics: { efficiency: "890%", satisfaction: "96%", resolution: "84%" },
      gradient: "from-blue-600 via-indigo-500 to-purple-400"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Predictive Email Intelligence",
      description: "AI-powered email automation that predicts customer behavior, personalizes content dynamically, and optimizes send times for maximum engagement.",
      features: ["Behavioral Prediction", "Dynamic Personalization", "Optimal Timing", "A/B Optimization"],
      metrics: { efficiency: "720%", satisfaction: "94%", resolution: "78%" },
      gradient: "from-green-600 via-emerald-500 to-teal-400"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Neural Voice Agents",
      description: "Human-like AI voice assistants powered by advanced speech synthesis and natural conversation flow for seamless phone interactions.",
      features: ["Natural Speech", "Context Understanding", "Call Routing", "Sentiment Analysis"],
      metrics: { efficiency: "640%", satisfaction: "92%", resolution: "88%" },
      gradient: "from-purple-600 via-pink-500 to-red-400"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Intelligent Process Automation",
      description: "End-to-end business process automation using AI to learn, adapt, and optimize workflows for maximum efficiency and scalability.",
      features: ["Process Learning", "Adaptive Optimization", "Real-time Analytics", "Scalable Architecture"],
      metrics: { efficiency: "850%", satisfaction: "98%", resolution: "92%" },
      gradient: "from-orange-600 via-red-500 to-pink-400"
    }
  ];

  const automationTypes = [
    {
      name: "Customer Service AI",
      icon: "🤖",
      description: "24/7 intelligent customer support that learns and improves",
      savings: "85%",
      volume: "50K+",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      name: "Sales Automation",
      icon: "💼",
      description: "AI-powered lead qualification and nurturing systems",
      savings: "70%",
      volume: "25K+",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Content Generation",
      icon: "✍️",
      description: "Automated content creation and optimization at scale",
      savings: "90%",
      volume: "100K+",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Data Intelligence",
      icon: "📊",
      description: "Automated insights and predictive analytics systems",
      savings: "80%",
      volume: "1M+",
      gradient: "from-orange-500 to-red-600"
    },
    {
      name: "Workflow Optimization",
      icon: "⚡",
      description: "End-to-end business process automation and optimization",
      savings: "75%",
      volume: "15K+",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      name: "Voice Intelligence",
      icon: "🎤",
      description: "Advanced voice AI for calls, meetings, and interactions",
      savings: "95%",
      volume: "30K+",
      gradient: "from-teal-500 to-green-600"
    }
  ];

  const results = [
    { 
      metric: "Time Saved", 
      value: "50K+", 
      description: "Hours automated per month across all clients",
      icon: <Clock className="w-6 h-6" />
    },
    { 
      metric: "Cost Reduction", 
      value: "85%", 
      description: "Average reduction in operational costs",
      icon: <TrendingUp className="w-6 h-6" />
    },
    { 
      metric: "Accuracy Rate", 
      value: "99.7%", 
      description: "AI decision-making accuracy across all systems",
      icon: <Target className="w-6 h-6" />
    },
    { 
      metric: "Client Growth", 
      value: "340%", 
      description: "Average business growth after AI implementation",
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  const caseStudies = [
    {
      title: "Global Customer Service Revolution",
      industry: "Technology",
      challenge: "Handle 100K+ monthly support tickets across 24 time zones",
      solution: "Multi-language AI chatbot with advanced context understanding",
      results: ["98% automation rate", "60% cost reduction", "45% faster resolution"],
      investment: "$240K",
      savings: "$2.8M annually",
      timeline: "8 weeks",
      gradient: "from-blue-600 to-cyan-400"
    },
    {
      title: "Enterprise Sales Acceleration",
      industry: "B2B SaaS",
      challenge: "Scale lead qualification and nurturing to 10K+ prospects monthly",
      solution: "AI-powered lead scoring and automated nurturing sequences",
      results: ["450% qualified leads", "70% faster sales cycle", "8x ROI"],
      investment: "$180K",
      savings: "$4.2M annually",
      timeline: "12 weeks",
      gradient: "from-green-600 to-emerald-400"
    },
    {
      title: "Content Generation Engine",
      industry: "Media & Marketing",
      challenge: "Create 1000+ pieces of content weekly across multiple channels",
      solution: "AI content creation with brand voice training and optimization",
      results: ["2400% content output", "90% time savings", "85% engagement boost"],
      investment: "$120K",
      savings: "$1.9M annually",
      timeline: "6 weeks",
      gradient: "from-purple-600 to-pink-400"
    }
  ];

  useEffect(() => {
    document.title = "AI Automation for Business | Lunexo Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Save time and increase productivity with AI-powered automation. Chatbots, workflows, and intelligent agents built for your business growth.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SEO
        title="AI Automation for Business | Lunexo Media"
        description="Save time and increase productivity with AI-powered automation. Chatbots, workflows, and intelligent agents built for your business growth."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/ai-automation"
        keywords="AI automation, chatbots, workflow automation, business automation, AI agents, productivity tools"
      />
      
      <ServiceSchema
        name="AI Automation Services"
        description="Transform your business with AI-powered automation. We build intelligent chatbots, workflow automation, email automation, and voice AI agents to increase productivity and reduce costs."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="AI Automation, Chatbots, Workflow Automation, Voice AI, Email Automation"
        url="https://www.lunexomedia.com/ai-automation"
        image="https://www.lunexomedia.com/og-image-new.jpg"
        priceRange="$$"
        aggregateRating={{
          ratingValue: 5.0,
          reviewCount: 84
        }}
      />
      
      <Navigation />
      
      <div className="container-wide section-padding pt-8">
        <BreadcrumbSEO 
          items={[
            { label: "Services", href: "/services-explore" }
          ]}
          currentPage="AI Automation"
        />
      </div>
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeDBackground />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-6">
                <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 text-lg border-primary/30 bg-primary/5 backdrop-blur-sm">
                  <Brain className="w-5 h-5 text-primary" />
                  Advanced AI Automation
                </Badge>
                
                <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-400 bg-clip-text text-transparent">
                    AI Automation
                  </span>
                  <br />
                  <span className="text-foreground">Solutions for Business</span>
                </h1>
                
                <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl">
                  Transform your business with enterprise-grade AI automation delivering 
                  <span className="text-primary font-semibold"> 85% cost savings</span> and 
                  <span className="text-primary font-semibold"> 340% growth</span> acceleration.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-4">
                  {[
                    { value: "50K+", label: "Hours Saved/Month" },
                    { value: "85%", label: "Cost Reduction" },
                    { value: "99.7%", label: "AI Accuracy" }
                  ].map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="group bg-gradient-to-r from-primary via-purple-500 to-pink-400 hover:shadow-2xl hover:shadow-primary/25 text-white text-lg px-12 py-4 rounded-2xl transition-all duration-300" asChild>
                  <Link to="/contact">
                    Get Automation Audit
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="text-lg px-12 py-4 rounded-2xl border-2 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300" asChild>
                  <Link to="/portfolio">
                    View AI Solutions
                  </Link>
                </Button>
              </div>
            </div>

            {/* Video */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-pink-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative bg-black/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-primary/20">
                <YouTubeFacade
                  videoId="modnj9EIVq8"
                  title="Advanced AI Automation"
                  width="100%"
                  height="400"
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

      {/* Premium AI Solutions Section */}
      <section className="py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20 px-4 py-2">
              <Lightbulb className="w-4 h-4 mr-2" />
              Intelligent Solutions
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              AI Chatbots &
              <br />
              <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                Customer Support
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Revolutionary AI automation solutions designed to eliminate manual work and accelerate business growth through intelligent automation
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiSolutions.map((solution, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden border-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl hover:shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.02] ${
                  activeSolution === index ? 'ring-2 ring-primary/30 shadow-2xl shadow-primary/10' : ''
                }`}
                onMouseEnter={() => setActiveSolution(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${solution.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      {solution.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-3xl mb-4 group-hover:text-primary transition-colors duration-300">
                        {solution.title}
                      </CardTitle>
                      <p className="text-muted-foreground/80 leading-relaxed text-lg">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-black/5 rounded-2xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{solution.metrics.efficiency}</div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{solution.metrics.satisfaction}</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{solution.metrics.resolution}</div>
                      <div className="text-xs text-muted-foreground">Resolution</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group/btn border-2 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 py-3 rounded-xl"
                    asChild
                  >
                    <a href={`/services/${solution.title.toLowerCase().replace(/\s+/g, '-').replace(/cognitive|predictive|neural|intelligent/g, '').trim().replace(/^-|-$/g, '')}-learn-more`}>
                      Explore AI Capabilities
                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types Section */}
      <section className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20 px-4 py-2">
              <Bot className="w-4 h-4 mr-2" />
              Automation Portfolio
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Complete
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                AI Ecosystem
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI automation solutions covering every aspect of your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm hover:scale-105">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{type.icon}</div>
                  <CardTitle className="text-2xl mb-3">{type.name}</CardTitle>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 bg-gradient-to-r ${type.gradient} rounded-2xl text-white`}>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">{type.savings}</div>
                          <div className="text-sm opacity-90">Cost Savings</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{type.volume}</div>
                          <div className="text-sm opacity-90">Processes</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group/btn hover:bg-primary hover:text-white transition-all duration-300"
                      asChild
                    >
                      <Link to="/contact">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
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
              Transformational Impact
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                Measurable
              </span>
              <br />
              Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {results.map((result, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-muted/10 hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
            <h3 className="text-4xl font-bold text-center mb-12">Transformation Stories</h3>
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
                          <div className="text-sm opacity-90">Investment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold mb-1">{study.savings}</div>
                          <div className="text-sm opacity-90">Annual Savings</div>
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
                        <h5 className="font-bold mb-3 text-blue-600 text-lg">AI Solution</h5>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-bold mb-4 text-green-600 text-lg">Transformation</h5>
                        <div className="space-y-3">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center gap-3">
                              <Zap className="w-5 h-5 text-green-500" />
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
      <section className="py-32 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-400/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-wide section-padding text-center relative z-10">
          <Badge variant="outline" className="mb-6 text-primary border-primary/20 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" />
            Ready for Transformation?
          </Badge>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Automate Your
            </span>
            <br />
            Future
          </h2>
          
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Join the AI revolution and transform your business operations with intelligent automation. 
            Your competitive advantage starts with the decision to embrace the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="group bg-gradient-to-r from-primary via-purple-500 to-pink-400 hover:shadow-2xl hover:shadow-primary/25 text-white text-xl px-16 py-6 rounded-2xl transition-all duration-300" asChild>
              <Link to="/contact">
                Get AI Automation Audit
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="text-xl px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white transition-all duration-300" asChild>
              <Link to="/portfolio">
                Explore AI Solutions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomation;