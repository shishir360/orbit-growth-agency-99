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
  Bot, 
  MessageSquare, 
  Mail, 
  Phone, 
  Zap,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  PlayCircle,
  Workflow,
  Brain,
  Mic,
  Globe
} from "lucide-react";
import ThreeDBackground from "@/components/ui/3d-background";

const AIAutomationLearnMore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const automationSolutions = [
    {
      title: "AI Chatbots",
      icon: <MessageSquare className="w-12 h-12" />,
      description: "24/7 customer support with intelligent conversation flows that understand context and resolve issues instantly",
      features: [
        "Natural Language Processing",
        "Multi-platform Integration", 
        "Custom Training Data",
        "Sentiment Analysis",
        "Multilingual Support",
        "Analytics & Insights"
      ],
      useCases: [
        "Customer Support Automation",
        "Lead Qualification",
        "FAQ Handling",
        "Order Status Inquiries",
        "Appointment Booking",
        "Product Recommendations"
      ],
      avgTimeReduction: "80%",
      avgCostSaving: "$2,400/month",
      roi: "400%"
    },
    {
      title: "Email Automation",
      icon: <Mail className="w-12 h-12" />,
      description: "Personalized email sequences that nurture leads and convert them into loyal customers using AI-driven insights",
      features: [
        "Dynamic Personalization",
        "Behavioral Triggers",
        "A/B Testing",
        "Predictive Send Times",
        "Smart Segmentation",
        "Performance Analytics"
      ],
      useCases: [
        "Welcome Series",
        "Abandoned Cart Recovery",
        "Lead Nurturing",
        "Re-engagement Campaigns",
        "Birthday/Anniversary Emails",
        "Product Recommendations"
      ],
      avgTimeReduction: "70%",
      avgCostSaving: "$1,800/month",
      roi: "300%"
    },
    {
      title: "Voice Agents",
      icon: <Phone className="w-12 h-12" />,
      description: "AI-powered phone assistants that handle appointments, support calls, and customer inquiries with human-like conversations",
      features: [
        "Speech Recognition",
        "Voice Synthesis",
        "Call Routing",
        "24/7 Availability",
        "Call Recording & Analysis",
        "Integration with CRM"
      ],
      useCases: [
        "Appointment Scheduling",
        "Customer Support Calls",
        "Lead Qualification",
        "Order Taking",
        "Survey Calls",
        "Debt Collection"
      ],
      avgTimeReduction: "90%",
      avgCostSaving: "$3,200/month",
      roi: "500%"
    },
    {
      title: "Workflow Automation",
      icon: <Workflow className="w-12 h-12" />,
      description: "Streamline repetitive business processes and eliminate manual tasks with intelligent automation workflows",
      features: [
        "Process Optimization",
        "Data Integration",
        "Custom Workflows",
        "Real-time Monitoring",
        "Error Handling",
        "Scalable Architecture"
      ],
      useCases: [
        "Data Entry Automation",
        "Invoice Processing",
        "Inventory Management",
        "Report Generation",
        "Social Media Posting",
        "Customer Onboarding"
      ],
      avgTimeReduction: "85%",
      avgCostSaving: "$2,800/month",
      roi: "450%"
    }
  ];

  const industries = [
    {
      name: "E-commerce",
      description: "Automate customer support, order processing, and marketing",
      solutions: ["Customer Support Bots", "Order Tracking", "Product Recommendations", "Abandoned Cart Recovery"],
      results: "80% reduction in support tickets"
    },
    {
      name: "Healthcare",
      description: "Streamline appointment booking and patient communication",
      solutions: ["Appointment Scheduling", "Patient Reminders", "Symptom Checking", "Insurance Verification"],
      results: "90% automation of routine tasks"
    },
    {
      name: "Real Estate",
      description: "Qualify leads and schedule property viewings automatically",
      solutions: ["Lead Qualification", "Property Matching", "Viewing Scheduling", "Follow-up Automation"],
      results: "300% increase in qualified leads"
    },
    {
      name: "Professional Services",
      description: "Automate client intake and project management workflows",
      solutions: ["Client Onboarding", "Project Updates", "Invoice Processing", "Meeting Scheduling"],
      results: "60% reduction in administrative time"
    },
    {
      name: "SaaS",
      description: "Enhance user onboarding and customer success automation",
      solutions: ["User Onboarding", "Feature Adoption", "Churn Prevention", "Support Automation"],
      results: "40% improvement in user retention"
    },
    {
      name: "Restaurants",
      description: "Streamline reservations, orders, and customer service",
      solutions: ["Table Reservations", "Order Taking", "Customer Feedback", "Delivery Coordination"],
      results: "250% increase in online orders"
    }
  ];

  const implementationProcess = [
    {
      phase: "Discovery & Analysis",
      duration: "Week 1",
      description: "We analyze your current processes and identify automation opportunities",
      activities: [
        "Business Process Audit",
        "Workflow Mapping",
        "Pain Point Identification",
        "ROI Projection",
        "Technical Requirements"
      ]
    },
    {
      phase: "Strategy & Design", 
      duration: "Week 2",
      description: "Design custom automation workflows tailored to your business needs",
      activities: [
        "Automation Strategy Development",
        "Workflow Design",
        "Integration Planning",
        "User Experience Design",
        "Technical Architecture"
      ]
    },
    {
      phase: "Development & Training",
      duration: "Week 3-6",
      description: "Build and train your AI automation systems with your specific data",
      activities: [
        "System Development",
        "AI Model Training",
        "Data Integration",
        "Quality Assurance Testing",
        "Performance Optimization"
      ]
    },
    {
      phase: "Testing & Optimization",
      duration: "Week 7-8",
      description: "Rigorous testing and fine-tuning for optimal performance",
      activities: [
        "Beta Testing",
        "Performance Monitoring",
        "Accuracy Optimization",
        "User Acceptance Testing",
        "Final Adjustments"
      ]
    },
    {
      phase: "Launch & Support",
      duration: "Ongoing",
      description: "Deploy your automation systems with ongoing monitoring and support",
      activities: [
        "System Deployment",
        "User Training",
        "Performance Monitoring",
        "Continuous Optimization",
        "Technical Support"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "E-commerce Customer Service Revolution",
      company: "Fashion Forward",
      industry: "E-commerce",
      challenge: "Overwhelmed customer service team handling 500+ inquiries daily",
      solution: "AI chatbot with order tracking, return processing, and product recommendations",
      results: [
        "80% reduction in support tickets",
        "24/7 customer service availability", 
        "300% faster response times",
        "$50K annual savings in staff costs"
      ],
      timeline: "6 weeks",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Healthcare Appointment Automation",
      company: "MedCare Clinic",
      industry: "Healthcare",
      challenge: "Manual appointment booking creating scheduling conflicts and patient frustration",
      solution: "Voice AI assistant for appointment scheduling with calendar integration",
      results: [
        "90% automated appointment bookings",
        "50% reduction in no-shows",
        "200% increase in patient satisfaction",
        "40 hours/week staff time saved"
      ],
      timeline: "8 weeks",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Real Estate Lead Qualification",
      company: "Premier Properties",
      industry: "Real Estate",
      challenge: "Sales team spending too much time on unqualified leads",
      solution: "AI-powered lead qualification and property matching system",
      results: [
        "300% increase in qualified leads",
        "70% time savings for sales team",
        "150% improvement in conversion rate",
        "$2M additional revenue generated"
      ],
      timeline: "10 weeks",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const pricing = [
    {
      title: "Starter Automation",
      price: "$997",
      period: "/month",
      description: "Perfect for small businesses getting started with AI",
      features: [
        "1 AI automation solution",
        "Basic chatbot or email automation",
        "Up to 1,000 interactions/month",
        "Standard integrations",
        "Email support",
        "Monthly optimization"
      ],
      popular: false,
      setupFee: "$2,497"
    },
    {
      title: "Business Growth",
      price: "$2,497",
      period: "/month", 
      description: "Comprehensive automation for growing businesses",
      features: [
        "3 AI automation solutions",
        "Advanced chatbot + email + voice",
        "Up to 10,000 interactions/month",
        "Custom integrations",
        "Priority support",
        "Bi-weekly optimization",
        "Performance analytics"
      ],
      popular: true,
      setupFee: "$4,997"
    },
    {
      title: "Enterprise Scale",
      price: "Custom",
      period: "",
      description: "Full-scale automation for large organizations",
      features: [
        "Unlimited AI solutions",
        "Custom workflow automation",
        "Unlimited interactions",
        "Enterprise integrations",
        "Dedicated account manager",
        "24/7 support",
        "Advanced analytics & reporting"
      ],
      popular: false,
      setupFee: "Custom"
    }
  ];

  useEffect(() => {
    document.title = "AI Automation Services - Complete Guide | LUNEXO MEDIA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to LUNEXO MEDIA AI automation services. Learn about chatbots, email automation, voice agents, and workflow optimization.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Automation Services - Complete Guide | LUNEXO MEDIA"
        description="Complete guide to LUNEXO MEDIA AI automation services. Learn about chatbots, email automation, voice agents, and workflow optimization."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/ai-automation-learn-more"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background/50 to-muted/30 relative overflow-hidden">
        <ThreeDBackground />
        <div className="container-wide section-padding relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/20 text-lg px-4 py-2">
              <Bot className="w-5 h-5 mr-2" />
              Complete AI Automation Guide
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Transform Your Business with AI
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Discover how AI automation can eliminate manual work, reduce costs, and scale your business operations 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg text-lg px-8 py-4" asChild>
                <Link to="/contact">Book Automation Audit</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white text-lg px-8 py-4" asChild>
                <Link to="/ai-automation">View Service Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions Section */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our AI Automation Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI-powered solutions designed to automate your most time-consuming business processes
            </p>
          </div>

          <Tabs defaultValue="chatbots" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="chatbots">AI Chatbots</TabsTrigger>
              <TabsTrigger value="email">Email Automation</TabsTrigger>
              <TabsTrigger value="voice">Voice Agents</TabsTrigger>
              <TabsTrigger value="workflow">Workflow Automation</TabsTrigger>
            </TabsList>

            {automationSolutions.map((solution, index) => (
              <TabsContent key={index} value={solution.title.toLowerCase().split(' ')[1] || 'chatbots'} className="space-y-8">
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center text-white mb-6">
                        {solution.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                      <p className="text-muted-foreground mb-6">{solution.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">{solution.avgTimeReduction}</div>
                          <div className="text-xs text-muted-foreground">Time Saved</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{solution.avgCostSaving}</div>
                          <div className="text-xs text-muted-foreground">Monthly Savings</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{solution.roi}</div>
                          <div className="text-xs text-muted-foreground">Avg ROI</div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-primary">Features & Capabilities</h4>
                          <div className="space-y-3">
                            {solution.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-green-600">Common Use Cases</h4>
                          <div className="space-y-3">
                            {solution.useCases.map((useCase, useCaseIndex) => (
                              <div key={useCaseIndex} className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{useCase}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored AI automation solutions designed for your industry's unique challenges and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {industry.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {industry.solutions.map((solution, solutionIndex) => (
                      <div key={solutionIndex} className="flex items-center gap-2 text-sm">
                        <Bot className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{solution}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="text-sm font-medium text-primary">{industry.results}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Implementation Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven 5-phase approach to implementing AI automation that delivers results
            </p>
          </div>

          <div className="space-y-8">
            {implementationProcess.map((phase, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                  <div className="lg:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{phase.phase}</h3>
                    <p className="text-muted-foreground text-sm">{phase.description}</p>
                  </div>
                  <div className="lg:col-span-3 p-6">
                    <h4 className="font-semibold mb-4">Key Activities:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real businesses achieving remarkable results with our AI automation solutions
            </p>
          </div>

          <div className="space-y-12">
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
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{study.company}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Challenge:</h4>
                        <p className="text-muted-foreground text-sm mb-4">{study.challenge}</p>
                        <h4 className="font-semibold mb-2 text-blue-600">Solution:</h4>
                        <p className="text-muted-foreground text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Results:</h4>
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
      <section className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Investment & Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing for AI automation that pays for itself through efficiency gains
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
                  {plan.setupFee && (
                    <div className="text-sm text-muted-foreground">
                      Setup Fee: {plan.setupFee}
                    </div>
                  )}
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
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Book a free automation audit to discover how AI can transform your business operations and reduce manual work
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg" asChild>
              <Link to="/contact">Book Free Audit</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white" asChild>
              <Link to="/portfolio">View Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomationLearnMore;