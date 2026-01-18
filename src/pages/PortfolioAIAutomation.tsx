import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Trophy,
  Sparkles,
  Target,
  ArrowRight,
  Bot,
  Brain,
  Zap,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PortfolioAIAutomation = () => {
  useEffect(() => {
    document.title = "AI Automation Portfolio | Intelligent Business Solutions | LUNEXO MEDIA";
  }, []);

  const aiProjects = [
    {
      id: "customer-support-ai",
      title: "AutoSupport AI",
      description: "AI-powered customer support chatbot that reduced support tickets by 80% for e-commerce businesses.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      technologies: ["OpenAI", "Python", "React", "WebSocket"],
      timeline: "3 weeks",
      users: "50+ businesses",
      results: "80% ticket reduction",
      featured: true
    },
    {
      id: "content-automation",
      title: "Content Creation Engine",
      description: "AI automation system that generates, schedules, and optimizes social media content across platforms.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
      technologies: ["GPT-4", "Social APIs", "Automation Tools"],
      timeline: "4 weeks",
      users: "200+ content creators",
      results: "500% content efficiency",
      featured: true
    },
    {
      id: "lead-qualification-ai",
      title: "Smart Lead Qualifier",
      description: "AI system that automatically qualifies, scores, and routes leads to appropriate sales team members.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      technologies: ["Machine Learning", "CRM Integration", "API"],
      timeline: "5 weeks",
      users: "100+ sales teams",
      results: "300% conversion rate",
      featured: false
    },
    {
      id: "inventory-optimization",
      title: "Smart Inventory AI",
      description: "Predictive AI system that optimizes inventory levels and automates reordering based on demand patterns.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
      technologies: ["Machine Learning", "Predictive Analytics", "API Integration"],
      timeline: "6 weeks",
      users: "25+ retailers",
      results: "40% cost reduction",
      featured: false
    },
    {
      id: "email-automation",
      title: "Smart Email Sequences",
      description: "AI-driven email marketing automation that personalizes content and optimizes send times for maximum engagement.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      technologies: ["AI Personalization", "Email APIs", "Analytics"],
      timeline: "3 weeks",
      users: "150+ marketers",
      results: "250% open rates",
      featured: false
    }
  ];

  const featuredProjects = aiProjects.filter(project => project.featured);
  const regularProjects = aiProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Automation Portfolio | Intelligent Business Solutions | LUNEXO MEDIA"
        description="Explore our AI automation portfolio featuring chatbots, workflow automation, and intelligent systems that transform business operations."
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
        url="https://www.lunexomedia.com/portfolio/ai-automation"
        keywords="AI automation portfolio, chatbot projects, workflow automation examples, AI case studies"
      />
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-accent-cta/15 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-6xl mx-auto animate-fade-in">
            <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full mb-8">
              <Bot className="w-6 h-6 text-primary" />
              AI Automation Portfolio
            </Badge>
            
            <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tight mb-8">
              <span className="text-foreground">Intelligent</span>
              <br />
              <span className="premium-gradient-text">AI</span>
              <br />
              <span className="bg-gradient-to-r from-accent-cta to-primary bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12 max-w-4xl mx-auto font-light">
              Discover our collection of 
              <span className="text-accent-cta font-bold"> cutting-edge AI systems</span> 
              that automate workflows, enhance productivity, and transform business operations.
            </p>

            {/* Premium Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { value: "25+", label: "AI Systems Built", icon: <Brain className="w-6 h-6" /> },
                { value: "80%", label: "Avg. Efficiency Gain", icon: <Target className="w-6 h-6" /> },
                { value: "500+", label: "Hours Saved Daily", icon: <Zap className="w-6 h-6" /> },
                { value: "100%", label: "ROI Achievement", icon: <BarChart3 className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl lg:text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="group text-base font-bold px-16 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow" asChild>
                <a href="https://lunexomedia.com/contact">
                  Start AI Project
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-bold px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                <a href="#featured-projects">
                  View AI Solutions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden" id="featured-projects">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Trophy className="w-6 h-6 mr-3" />
              Featured Innovation
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">Revolutionary</span>
              <br />
              <span className="premium-gradient-text">AI Systems</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Our most transformative AI solutions that demonstrate the power of 
              <span className="text-accent-cta font-bold"> intelligent automation</span> and 
              <span className="text-primary font-bold"> machine learning</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="luxury-card overflow-hidden group hover:scale-[1.02] transition-all duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-6 left-6 z-20">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 text-sm font-bold backdrop-blur-md">
                      <Trophy className="w-4 h-4 mr-2" />
                      Featured
                    </Badge>
                  </div>

                  <div className="absolute bottom-6 left-6 z-20">
                    <Badge className="bg-black/70 text-white px-4 py-2 text-sm font-bold backdrop-blur-md">
                      AI Automation
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-10 relative">
                  <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                      <div className="font-bold text-lg text-primary">{project.timeline}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground mb-1">Users</div>
                      <div className="font-bold text-lg text-primary">{project.users}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-accent-cta/10 to-primary/10 rounded-2xl">
                      <Target className="w-6 h-6 text-accent-cta mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground mb-1">Results</div>
                      <div className="font-bold text-lg text-accent-cta">{project.results}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="px-4 py-2 text-sm font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 font-bold hover:scale-105 transition-all duration-300" asChild>
                      <a href={`https://lunexomedia.com/portfolio/${project.id}`}>
                        View Case Study
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-32 bg-gradient-to-b from-muted/10 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl">
              <Brain className="w-6 h-6 mr-3" />
              Complete AI Portfolio
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="text-foreground">All AI</span>{" "}
              <span className="premium-gradient-text">Solutions</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project, index) => (
              <Card key={index} className="luxury-card overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <Badge className="bg-primary/90 text-white px-3 py-1 text-xs font-bold backdrop-blur-sm mb-2">
                      AI Automation
                    </Badge>
                    <h3 className="text-white text-xl font-black mb-2">{project.title}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                      <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                      <div className="font-bold text-primary">{project.timeline}</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-accent-cta/10 to-primary/10 rounded-xl">
                      <div className="text-sm text-muted-foreground mb-1">Results</div>
                      <div className="font-bold text-accent-cta">{project.results}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="px-3 py-1 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full font-bold hover:scale-105 transition-all duration-300" asChild>
                    <Link to={`/portfolio/${project.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full mb-8">
              <Sparkles className="w-6 h-6 text-primary" />
              Ready to Automate?
            </Badge>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="text-foreground">Transform Your Business</span>
              <br />
              <span className="premium-gradient-text">With AI Automation</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12 font-light">
              Join our portfolio of innovative companies leveraging AI to streamline operations, reduce costs, and accelerate growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="group text-base font-bold px-16 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow" asChild>
                <a href="https://lunexomedia.com/contact">
                  Start AI Automation
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-bold px-16 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                <a href="https://lunexomedia.com/ai-automation">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioAIAutomation;