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
  TrendingUp,
  DollarSign,
  Zap,
  BarChart3,
  Layers,
  Database,
  ChevronRight,
  Globe,
  PieChart
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioAdsManagement = () => {
  useEffect(() => {
    document.title = "Ads Management Repository | High-Velocity Growth | LUNEXO MEDIA";
  }, []);

  const adsProjects = [
    {
      id: "saas-growth-campaign",
      title: "SaaS Growth Orchestration",
      description: "Multi-platform advertising strategy that scaled a B2B SaaS architecture from startup to 6-figure ARR velocity.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      technologies: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Analytics"],
      timeline: "Execution",
      users: "500K+ Impressions",
      results: "400% ROAS Optimization",
      featured: true
    },
    {
      id: "ecommerce-scaling",
      title: "E-commerce Scaling Node",
      description: "High-performance marketing orchestration that scaled an e-commerce brand to absolute revenue dominance.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      technologies: ["Meta Ads", "Google Shopping", "TikTok Ads"],
      timeline: "Architecture",
      users: "1M+ Reach Node",
      results: "900% Revenue Velocity",
      featured: true
    },
    {
      id: "local-business-ads",
      title: "Local Market Dominance",
      description: "Hyperlocal advertising logic for service architectures to dominate their regional digital spectrum.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      technologies: ["Google Local Ads", "Facebook Local", "Bing Ads"],
      timeline: "Optimization",
      users: "100K+ Local Reach",
      results: "350% Lead Velocity",
      featured: false
    },
    {
      id: "fitness-brand-campaign",
      title: "Fitness Brand Trajectory",
      description: "Complete brand launch orchestration with influencer logic nodes and high-impact video architectures.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      technologies: ["YouTube Ads", "Instagram Ads", "Influencer Marketing"],
      timeline: "Delivery",
      users: "2M+ Video Views",
      results: "600% Awareness Boost",
      featured: false
    },
    {
      id: "healthcare-lead-gen",
      title: "Healthcare Patient Node",
      description: "Specialized orchestration for healthcare providers focusing on patient acquisition and booking velocity.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80",
      technologies: ["Google Ads", "Facebook Ads", "Landing Pages"],
      timeline: "Maintenance",
      users: "300K+ Impressions",
      results: "250% Booking Velocity",
      featured: false
    }
  ];

  const featuredProjects = adsProjects.filter(project => project.featured);
  const regularProjects = adsProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Ads Management Portfolio | ROI-Driven Campaigns | LUNEXO MEDIA"
        description="Explore our ads management portfolio featuring high-converting Google Ads, Facebook campaigns, and multi-platform strategies that deliver exceptional ROI."
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        url="https://www.lunexomedia.com/portfolio/ads-management"
        keywords="ads portfolio, Google Ads campaigns, Facebook advertising, PPC case studies, ROI results"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-6xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <TrendingUp className="w-5 h-5 mr-3" />
                Ads Orchestration Repository
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              High-ROI <br /> <span className="text-primary italic">Ad Strategies</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Discover our collection of absolute <span className="text-primary italic font-bold">growth orchestrations</span> that have generated millions in revenue and redefined market velocity.
            </motion.p>
            
            {/* Premium Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-12 pt-8"
            >
              {[
                { value: "500%", label: "Avg. ROAS", icon: <PieChart className="w-6 h-6" /> },
                { value: "$5M+", label: "Revenue Velocity", icon: <DollarSign className="w-6 h-6" /> },
                { value: "100+", label: "Nodes Managed", icon: <Target className="w-6 h-6" /> },
                { value: "24/7", label: "Telemetry Sync", icon: <Zap className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center pt-8"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                <Link to="/contact">
                  Launch Orchestration
                  <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                <a href="#featured-campaigns">Access Success Intel</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40" id="featured-campaigns">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-8">
            <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
              <Trophy className="w-5 h-5 mr-3" />
              High-Impact Delivery
            </Badge>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-[1.1]">
              Record-Breaking <span className="text-primary italic">Orchestrations</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700" />
                  
                  <div className="absolute top-8 left-8">
                    <Badge className="bg-primary text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl">
                      Featured Velocity
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-16 space-y-10 flex-1 flex flex-col">
                  <h3 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-6 pt-4">
                    <div className="text-center p-6 bg-white/40 rounded-[2rem] border border-white/60">
                      <Layers className="w-6 h-6 text-primary mx-auto mb-3" />
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</div>
                      <div className="font-bold text-slate-900">{project.timeline}</div>
                    </div>
                    <div className="text-center p-6 bg-white/40 rounded-[2rem] border border-white/60">
                      <Users className="w-6 h-6 text-primary mx-auto mb-3" />
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reach</div>
                      <div className="font-bold text-slate-900">{project.users}</div>
                    </div>
                    <div className="text-center p-6 bg-white/40 rounded-[2rem] border border-white/60">
                      <Target className="w-6 h-6 text-primary mx-auto mb-3" />
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Telemetry</div>
                      <div className="font-bold text-primary">{project.results}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-6 py-3 bg-white/60 border border-white/60 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-10 mt-auto">
                    <Button className="w-full py-12 rounded-[2rem] font-bold text-xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-500 group/btn shadow-2xl" asChild>
                      <Link to={`/portfolio/${project.id}`}>
                        Access Case Intel
                        <ArrowRight className="w-6 h-6 ml-4 group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-32 bg-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-8">
            <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
              <BarChart3 className="w-5 h-5 mr-3" />
              Complete Inventory
            </Badge>
            <h2 className="text-4xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight">
              Global Growth <span className="text-primary italic">Orchestrations</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {regularProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3.5rem] overflow-hidden hover:shadow-glass transition-all duration-1000 flex flex-col h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 text-primary px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-sm">
                      Growth Node
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-12 space-y-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="text-center p-6 bg-white/40 rounded-[2rem] border border-white/60">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</div>
                      <div className="font-bold text-slate-900">{project.timeline}</div>
                    </div>
                    <div className="text-center p-6 bg-white/40 rounded-[2rem] border border-white/60">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Telemetry</div>
                      <div className="font-bold text-primary">{project.results}</div>
                    </div>
                  </div>

                  <div className="pt-10 mt-auto border-t border-white/60 flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.technologies.slice(0, 2).map((tech, i) => (
                        <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tech}</span>
                      ))}
                    </div>
                    <Button variant="ghost" className="p-0 text-slate-900 font-black uppercase tracking-widest text-[10px] hover:text-primary hover:bg-transparent transition-all group-hover:translate-x-3" asChild>
                      <Link to={`/portfolio/${project.id}`}>
                        Details <ChevronRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-16">
            <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
              Ready to Scale?
            </Badge>
            
            <h2 className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Ready to Scale <br /> <span className="text-primary italic">Your Revenue?</span>
            </h2>
            
            <p className="text-2xl text-slate-300 font-body leading-relaxed max-w-4xl mx-auto">
              Join our absolute repository of successful businesses with high-converting ad orchestrations designed to maximize ROI and drive absolute velocity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-12">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Launch My Orchestration
                  <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/ads-management">Learn Strategy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioAdsManagement;