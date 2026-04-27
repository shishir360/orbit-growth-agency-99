import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  Globe,
  ChevronRight,
  Shield,
  Activity,
  Cpu,
  ShieldCheck,
  Database,
  Layers
} from "lucide-react";

const AIAutomationLearnMore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const automationSolutions = [
    {
      title: "AI Conversation Logic",
      icon: <MessageSquare className="w-12 h-12" />,
      description: "24/7 autonomous support with intelligent absolute conversation flows that understand repository context and resolve issues instantly.",
      features: [
        "Natural Language Intelligence",
        "Multi-node Integration", 
        "Custom Repository Training",
        "Sentiment Logic Analysis",
        "Global Multilingual Support",
        "Operational Analytics Sync"
      ],
      useCases: [
        "Autonomous Support Sync",
        "Identity Lead Qualification",
        "FAQ Logic Handling",
        "Order Status Verification",
        "Appointment Logic Booking",
        "Product Recommendations Sync"
      ],
      avgTimeReduction: "80%",
      avgCostSaving: "$2.4k/mo",
      roi: "400%"
    },
    {
      title: "Email Intelligence Sync",
      icon: <Mail className="w-12 h-12" />,
      description: "Personalized absolute email sequences that nurture identity nodes and convert them into absolute customers using AI-driven logic.",
      features: [
        "Dynamic Personalization Sync",
        "Behavioral Triggers Logic",
        "A/B Testing Framework",
        "Predictive Send Velocity",
        "Smart Segmentation Logic",
        "Performance Intelligence Sync"
      ],
      useCases: [
        "Identity Welcome Series",
        "Abandoned Cart Logic",
        "Lead Nurturing Trajectory",
        "Re-engagement Protocols",
        "Lifecycle Logic Emails",
        "Intelligence Recommendations"
      ],
      avgTimeReduction: "70%",
      avgCostSaving: "$1.8k/mo",
      roi: "300%"
    },
    {
      title: "Absolute Voice Agents",
      icon: <Phone className="w-12 h-12" />,
      description: "AI-powered autonomous phone assistants that handle appointments, support calls, and inquiry nodes with human-like absolute conversations.",
      features: [
        "Speech Recognition Logic",
        "Voice Synthesis Protocol",
        "Call Routing Orchestration",
        "24/7 Absolute Availability",
        "Call Intel & Analysis",
        "CRM Architecture Sync"
      ],
      useCases: [
        "Appointment Logic Scheduling",
        "Autonomous Support Calls",
        "Identity Qualification",
        "Order Taking Protocol",
        "Survey Intelligence Calls",
        "Collection Logic Sync"
      ],
      avgTimeReduction: "90%",
      avgCostSaving: "$3.2k/mo",
      roi: "500%"
    },
    {
      title: "Workflow Orchestration",
      icon: <Workflow className="w-12 h-12" />,
      description: "Streamline repetitive business logic and eliminate manual toil with absolute autonomous workflow architectures.",
      features: [
        "Process Optimization Logic",
        "Data Orchestration Sync",
        "Custom Workflow Architectures",
        "Real-time Logic Monitoring",
        "Error Protocol Handling",
        "Scalable Grid Architecture"
      ],
      useCases: [
        "Data Entry Logic Sync",
        "Invoice Processing Protocol",
        "Inventory Management Logic",
        "Report Generation Intel",
        "Social Media Logic Sync",
        "Identity Onboarding Protocol"
      ],
      avgTimeReduction: "85%",
      avgCostSaving: "$2.8k/mo",
      roi: "450%"
    }
  ];

  const industries = [
    {
      name: "E-commerce Repository",
      description: "Automate absolute support, order logic, and marketing trajectories.",
      solutions: ["Support Logic Bots", "Order Tracking Sync", "Product Logic", "Cart Recovery Sync"],
      results: "80% reduction in support toil"
    },
    {
      name: "Healthcare Systems",
      description: "Streamline appointment logic and patient communication protocols.",
      solutions: ["Scheduling Logic", "Patient Reminders Sync", "Symptom Logic", "Verification Protocol"],
      results: "90% autonomous routine logic"
    },
    {
      name: "Real Estate Intel",
      description: "Qualify identity leads and schedule property viewing protocols automatically.",
      solutions: ["Identity Qualification", "Property Logic Matching", "Scheduling Sync", "Follow-up Logic"],
      results: "300% qualified lead lift"
    },
    {
      name: "Professional Logic",
      description: "Automate identity intake and project management absolute workflows.",
      solutions: ["Identity Onboarding", "Project Update Sync", "Invoice Logic", "Scheduling Protocol"],
      results: "60% admin toil reduction"
    },
    {
      name: "SaaS Intelligence",
      description: "Enhance user onboarding logic and customer success absolute automation.",
      solutions: ["Onboarding Protocol", "Feature Adoption Logic", "Churn Logic Prevention", "Support Sync"],
      results: "40% retention velocity lift"
    },
    {
      name: "Hospitality Nodes",
      description: "Streamline reservation logic, orders, and customer service protocols.",
      solutions: ["Reservation Sync", "Order Taking Logic", "Feedback Intelligence", "Coordination Protocol"],
      results: "250% order volume lift"
    }
  ];

  const implementationProcess = [
    {
      phase: "Discovery & Logic Analysis",
      duration: "Week 1",
      description: "We analyze your absolute processes and identify autonomous logic opportunities.",
      activities: [
        "Business Logic Audit",
        "Workflow Mapping Sync",
        "Pain Point Logic Identification",
        "ROI Projection Intel",
        "Technical Requirements Sync"
      ]
    },
    {
      phase: "Strategy & Architecture", 
      duration: "Week 2",
      description: "Design custom absolute automation workflows tailored to your business logic.",
      activities: [
        "Automation Strategy Sync",
        "Workflow Design Protocol",
        "Integration Orchestration",
        "User Experience Logic",
        "Technical Architecture Audit"
      ]
    },
    {
      phase: "Execution & Model Training",
      duration: "Week 3-6",
      description: "Build and train your absolute autonomous systems with your specific repository data.",
      activities: [
        "System Logic Execution",
        "AI Model Training Protocol",
        "Data Orchestration Sync",
        "Quality Logic Testing",
        "Performance Optimization"
      ]
    },
    {
      phase: "Verification & Velocity",
      duration: "Week 7-8",
      description: "Rigorous verification and logic fine-tuning for absolute performance.",
      activities: [
        "Beta Verification Sync",
        "Performance Monitoring Node",
        "Accuracy Logic Optimization",
        "Identity Acceptance Testing",
        "Final Logic Adjustments"
      ]
    }
  ];

  const pricing = [
    {
      title: "Starter Protocol",
      price: "$997",
      period: "/month",
      description: "Perfect for absolute new businesses getting started with AI logic.",
      features: [
        "1 AI automation node",
        "Basic conversation logic",
        "Up to 1k interactions/month",
        "Standard integration sync",
        "Identity support node",
        "Monthly logic optimization"
      ],
      popular: false,
      setupFee: "$2,497"
    },
    {
      title: "Business Logic",
      price: "$2,497",
      period: "/month", 
      description: "Comprehensive absolute automation for scaling businesses.",
      features: [
        "3 AI automation nodes",
        "Advanced bot + email + voice",
        "Up to 10k interactions/month",
        "Custom integration orchestration",
        "Priority absolute support",
        "Bi-weekly logic sync",
        "Performance intelligence"
      ],
      popular: true,
      setupFee: "$4,997"
    },
    {
      title: "Enterprise Architecture",
      price: "Custom",
      period: "",
      description: "Full-scale absolute automation for large organizations.",
      features: [
        "Unlimited AI logic nodes",
        "Custom workflow orchestration",
        "Unlimited interactions",
        "Enterprise integration sync",
        "Dedicated identity manager",
        "24/7 absolute sync",
        "Advanced intelligence intel"
      ],
      popular: false,
      setupFee: "Custom"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute AI Automation - Complete Guide | LUNEXO MEDIA"
        description="Complete guide to LUNEXO MEDIA absolute AI automation services. Learn about chatbots, email automation, voice agents, and absolute workflow optimization."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/services/ai-automation-learn-more"
        keywords="AI automation services, chatbots, email automation, voice agents, workflow optimization"
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
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Brain className="w-5 h-5 mr-4" />
                The Absolute Intelligence Layer
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              The Future is <br /> <span className="text-primary italic">Autonomous.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Everything you need to know about our absolute AI-powered engines that eliminate manual toil and scale your business operations <span className="text-primary italic font-bold">at absolute lightspeed.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-10 justify-center pt-12"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild
              >
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize AI Audit
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Layers className="w-5 h-5 mr-4" />
                  Absolute Core Solutions
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.05] tracking-tighter">
              The Intelligence <span className="text-primary italic">Sync.</span>
            </h2>
          </div>

          <Tabs defaultValue="chatbots" className="w-full">
            <div className="flex justify-center mb-24">
              <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-[3rem] h-auto shadow-glass flex flex-wrap justify-center gap-4">
                <TabsTrigger value="chatbots" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">AI Chatbots</TabsTrigger>
                <TabsTrigger value="email" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Email Intelligence</TabsTrigger>
                <TabsTrigger value="voice" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Voice Agents</TabsTrigger>
                <TabsTrigger value="workflow" className="rounded-full px-12 py-6 text-xl font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all duration-700">Workflows</TabsTrigger>
              </TabsList>
            </div>

            {automationSolutions.map((solution, index) => {
              const value = solution.title.toLowerCase().includes('conversation') ? 'chatbots' : 
                            solution.title.toLowerCase().includes('email') ? 'email' : 
                            solution.title.toLowerCase().includes('voice') ? 'voice' : 'workflow';
              return (
                <TabsContent key={index} value={value}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden shadow-glass"
                  >
                    <div className="grid lg:grid-cols-3">
                      <div className="p-20 lg:p-32 lg:border-r border-white/60 flex flex-col justify-center text-center lg:text-left space-y-12">
                        <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto lg:mx-0 shadow-2xl">
                          {solution.icon}
                        </div>
                        <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{solution.title}</h3>
                        <p className="text-2xl text-slate-500 leading-relaxed font-medium">{solution.description}</p>
                        <div className="grid grid-cols-3 gap-4 pt-6">
                          <div className="p-8 bg-white/60 rounded-[2rem] border border-white/60 shadow-sm text-center">
                            <div className="text-3xl font-heading font-black text-primary">{solution.avgTimeReduction}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Velocity</div>
                          </div>
                          <div className="p-8 bg-white/60 rounded-[2rem] border border-white/60 shadow-sm text-center">
                            <div className="text-3xl font-heading font-black text-primary">{solution.avgCostSaving}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Delta</div>
                          </div>
                          <div className="p-8 bg-white/60 rounded-[2rem] border border-white/60 shadow-sm text-center">
                            <div className="text-3xl font-heading font-black text-primary">{solution.roi}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">ROI</div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 p-20 lg:p-32 space-y-20 bg-white/20">
                        <div className="grid md:grid-cols-2 gap-20">
                          <div className="space-y-12">
                            <div className="space-y-4">
                               <h4 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-6">
                                <div className="w-3 h-10 bg-primary rounded-full shadow-lg shadow-primary/20" />
                                Key Protocols
                              </h4>
                              <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                            </div>
                            <div className="space-y-8">
                              {solution.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-6 text-2xl text-slate-500 font-medium group/feat">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                                     <CheckCircle className="w-5 h-5 text-primary group-hover/feat:text-white" />
                                  </div>
                                  <span className="group-hover/feat:text-slate-900 transition-colors">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-12">
                            <div className="space-y-4">
                               <h4 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-6">
                                <div className="w-3 h-10 bg-[#FF719A] rounded-full shadow-lg shadow-accent/20" />
                                Logic Nodes
                              </h4>
                               <div className="h-[2px] w-full bg-gradient-to-r from-[#FF719A]/40 to-transparent" />
                            </div>
                            <div className="space-y-8">
                              {solution.useCases.map((u, i) => (
                                <div key={i} className="flex items-center gap-6 text-2xl text-slate-500 font-medium group/feat">
                                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover/feat:bg-accent transition-all duration-500">
                                     <Zap className="w-5 h-5 text-accent group-hover/feat:text-white" />
                                  </div>
                                  <span className="group-hover/feat:text-slate-900 transition-colors">{u}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pt-16 border-t border-white/60 flex items-center gap-12 opacity-30">
                           <Activity className="w-8 h-8" />
                           <Cpu className="w-8 h-8" />
                           <Database className="w-8 h-8" />
                           <ShieldCheck className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Globe className="w-5 h-5 mr-4" />
                  Absolute Intelligence Verticals
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
              Repository <span className="text-primary italic">Intelligence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 flex flex-col justify-between hover:translate-y-[-15px]"
              >
                <div className="space-y-10">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-all duration-700 tracking-tight leading-tight">{industry.name}</h3>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium h-32 overflow-hidden">{industry.description}</p>
                  
                  <div className="space-y-8 pt-6 border-t border-white/60">
                    <div className="space-y-2">
                       <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Custom Logic Nodes:</h4>
                       <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>
                    <div className="space-y-4">
                      {industry.solutions.map((s, i) => (
                        <div key={i} className="flex items-center gap-6 text-xl text-slate-700 font-bold group/node">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/node:bg-primary transition-all duration-500">
                             <Bot className="w-4 h-4 text-primary group-hover/node:text-white" />
                          </div>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 bg-slate-900 rounded-[2rem] border border-white/20 text-center shadow-2xl mt-6">
                    <div className="text-primary font-black text-xl italic tracking-tight">{industry.results}</div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/60 opacity-20 flex justify-end">
                   <Activity className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Cycle */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <Cpu className="w-5 h-5 mr-4" />
                  Absolute Deployment Cycle
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              The Engineering <span className="text-primary italic">Pipeline.</span>
            </h2>
          </div>

          <div className="space-y-16 max-w-7xl mx-auto">
            {implementationProcess.map((phase, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="grid lg:grid-cols-4 gap-20 relative z-10">
                  <div className="space-y-8 flex flex-col justify-center">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center font-black text-4xl shadow-2xl group-hover:bg-primary transition-all duration-700 group-hover:rotate-12">
                        {index + 1}
                      </div>
                      <Badge className="bg-accent/10 text-accent border-accent/20 px-8 py-3 font-black uppercase tracking-[0.2em] rounded-full text-[10px]">{phase.duration}</Badge>
                    </div>
                    <h3 className="text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{phase.phase}</h3>
                  </div>
                  <div className="lg:col-span-3 space-y-12">
                    <p className="text-3xl text-slate-500 leading-relaxed font-medium max-w-4xl">{phase.description}</p>
                    <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/60">
                      {phase.activities.map((a, i) => (
                        <div key={i} className="flex items-center gap-6 text-2xl text-slate-700 font-bold group/act">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/act:bg-primary transition-all duration-500">
                             <CheckCircle className="w-5 h-5 text-primary group-hover/act:text-white" />
                          </div>
                          <span className="group-hover/act:text-slate-900 transition-colors">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Absolute Investment */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  <TrendingUp className="w-5 h-5 mr-4" />
                  Absolute Scaling Logic
                </Badge>
              </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
              Absolute <span className="text-primary italic">Investment.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className={`group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-20 hover:shadow-glass transition-all duration-1000 flex flex-col items-center text-center ${plan.popular ? 'border-primary shadow-glass scale-105 z-10' : 'hover:translate-y-[-15px]'}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em] shadow-2xl">
                    Most Popular Protocol
                  </Badge>
                )}
                
                <div className="space-y-12 flex-1 w-full">
                  <div className="space-y-4">
                     <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">{plan.title}</h3>
                     <div className="h-[2px] w-12 bg-primary mx-auto opacity-40" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-6xl lg:text-7xl font-heading font-black text-primary tracking-tighter">{plan.price}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{plan.period} Protocol</div>
                  </div>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">{plan.description}</p>
                  
                  {plan.setupFee && (
                    <Badge className="bg-slate-900 text-white border-none px-10 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl">Setup Node: {plan.setupFee}</Badge>
                  )}

                  <div className="space-y-8 text-left pt-12 border-t border-white/60 w-full">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Protocol Nodes:</h4>
                    <div className="space-y-6">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-6 text-2xl text-slate-700 font-bold group/feat">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/feat:bg-primary transition-all duration-500">
                             <CheckCircle className="w-5 h-5 text-primary group-hover/feat:text-white" />
                          </div>
                          <span className="group-hover/feat:text-slate-900 transition-colors">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button className={`mt-16 py-12 px-16 rounded-[2rem] font-bold text-2xl shadow-2xl transition-all duration-700 w-full hover:scale-110 ${plan.popular ? 'bg-primary text-white' : 'bg-slate-900 text-white'}`} asChild>
                  <Link to="/contact" className="flex items-center justify-center gap-4">
                    Initialize Protocol
                    <ArrowRight className="w-8 h-8" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                The Intelligence Audit
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <br /> <span className="text-primary italic">Absolute Automate?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Book an absolute intelligence audit to discover how AI can transform your business operations and eliminate manual toil.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Initialize Audit
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-24 py-16 rounded-full font-bold transition-all duration-700 hover:scale-105" asChild>
                <Link to="/portfolio">
                  View Success Repository
                </Link>
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

export default AIAutomationLearnMore;