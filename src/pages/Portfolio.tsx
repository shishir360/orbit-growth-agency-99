import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ExternalLink, 
  Calendar, 
  Users, 
  Trophy,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  Globe,
  Award,
  Zap,
  BarChart3,
  Layers,
  Eye
} from "lucide-react";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    document.title = "Our Work & Case Studies | Lunexo Media";
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoadingDb(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('published', true)
        .eq('blocked', false)
        .order('created_at', { ascending: false })
        .limit(12);
      if (error) {
        console.error('Error loading portfolio:', error);
      } else {
        setDbProjects(data || []);
      }
      setLoadingDb(false);
    };
    load();
  }, []);

  const categories = ["All", "Website Design", "Ads Management", "AI Automation"];
  
  // Only database projects
  const allProjects = dbProjects.map(p => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    image: p.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: p.category,
    technologies: p.technologies || [],
    timeline: "Custom",
    users: "N/A",
    results: "View project",
    featured: p.featured,
    liveUrl: p.project_url,
    isFromDb: true
  }));
  
  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);
    
  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Our Work & Case Studies | Lunexo Media"
        description="See how Lunexo Media helped businesses achieve real growth. Browse our portfolio and case studies showcasing SEO, ads, and web design success."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/portfolio"
        keywords="portfolio, case studies, web design portfolio, digital marketing results, client success stories"
      />
      <Navigation />
      
      <div className="container-wide section-padding pt-8">
        <BreadcrumbSEO 
          items={[]}
          currentPage="Portfolio"
        />
      </div>
      
      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-emerald-600/25 to-cyan-500/20 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/20 to-teal-500/15 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-white/3 to-transparent rounded-full"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-500/50 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-teal-500/50 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>

        <div className="container-wide section-padding relative z-10 pt-20">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Trophy className="w-5 h-5" />
              Award-Winning Portfolio
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-white mb-8" style={{fontFamily: "'Playfair Display', serif"}}>
              Our Work &
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-14 max-w-3xl mx-auto font-light">
              Transformative digital experiences that have revolutionized businesses and generated millions in revenue.
            </p>

            {/* Premium Stats Row - Enhanced */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-14">
              {[
                { value: "50+", label: "Projects", icon: Zap },
                { value: "$10K+", label: "Revenue Generated", icon: TrendingUp },
                { value: "95%", label: "Client Satisfaction", icon: Award },
                { value: "30 Days", label: "Avg. Delivery", icon: Calendar }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl lg:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group text-base px-10 py-7 bg-[#C5FF4A] text-black hover:bg-[#d4ff6a] rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-[#C5FF4A]/25" asChild>
                <a href="https://lunexomedia.com/book-apartment">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm" asChild>
                <a href="#featured-projects">
                  View Featured Work
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Categories Filter - Enhanced */}
      <section className="py-20 bg-black relative overflow-hidden" id="featured-projects">
        {/* Subtle gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-r from-emerald-600/10 via-cyan-500/10 to-emerald-600/10 rounded-full blur-[80px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded-full text-xs font-medium mb-6">
              <Layers className="w-3.5 h-3.5" />
              Browse Categories
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
              Explore by Category
            </h2>
            <p className="text-white/60">{allProjects.length} projects showcasing our expertise</p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button 
                key={category} 
                className={`px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 ${
                  category === activeCategory 
                    ? "bg-[#C5FF4A] text-black shadow-lg shadow-[#C5FF4A]/25 font-semibold" 
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              Featured Projects
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
              Case Studies
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our most successful projects showcasing premium design and strategic innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loadingDb ? (
              <>
                <Skeleton className="h-[500px] rounded-2xl bg-white/5" />
                <Skeleton className="h-[500px] rounded-2xl bg-white/5" />
              </>
            ) : featuredProjects.map((project, index) => (
              <div key={index} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium">
                      <Trophy className="w-3 h-3" />
                      Featured
                    </span>
                  </div>

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all">
                      <Globe className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>
                
                <div className="p-6">
                  <span className="text-xs text-white/60 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-3 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      {project.timeline}
                    </div>
                    <div className="flex items-center gap-2 text-green-400 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {project.results}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={`https://lunexomedia.com/portfolio/${project.id}`} className="inline-flex items-center gap-2 text-white font-medium text-sm group/link">
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
              More Projects
            </h2>
            <p className="text-white/60">{regularProjects.length} projects in collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingDb ? (
              <>
                <Skeleton className="h-[380px] rounded-2xl bg-white/5" />
                <Skeleton className="h-[380px] rounded-2xl bg-white/5" />
                <Skeleton className="h-[380px] rounded-2xl bg-white/5" />
              </>
            ) : regularProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white/70">No projects found in this category.</p>
              </div>
            ) : regularProjects.map((project, index) => (
              <div key={project.id || index} className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full font-medium">
                    {project.category}
                  </span>

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all">
                      <Globe className="w-3.5 h-3.5 text-white" />
                    </a>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                    <span>{project.timeline}</span>
                    <span className="text-green-400">{project.results}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={`https://lunexomedia.com/portfolio/${project.id}`} className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                Success Story?
              </span>
            </h2>
            
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              Let's create the next award-winning digital experience that transforms your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group text-base px-8 py-6 bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105 font-semibold" asChild>
                <a href="https://lunexomedia.com/book-apartment">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base px-8 py-6 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm" asChild>
                <a href="https://lunexomedia.com/pricing">
                  View Pricing
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

export default Portfolio;