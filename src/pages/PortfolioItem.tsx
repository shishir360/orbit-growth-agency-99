import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, TrendingUp, Award, Globe, Layers, Code, Zap, ArrowRight, Star, CheckCircle, Sparkles, Target, Clock, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DOMPurify from 'isomorphic-dompurify';

const PortfolioItem = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('slug', id)
        .eq('published', true)
        .maybeSingle();

      if (!error && data) {
        setProject(data);
        
        const { data: related } = await supabase
          .from('portfolio')
          .select('*')
          .eq('category', data.category)
          .eq('published', true)
          .neq('slug', id)
          .limit(3);
        
        if (related) setRelatedProjects(related);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navigation />
        <div className="container-wide section-padding py-32">
          <Skeleton className="h-12 w-3/4 mb-6 bg-white/5" />
          <Skeleton className="h-6 w-full mb-4 bg-white/5" />
          <Skeleton className="h-96 w-full bg-white/5" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navigation />
        <section className="relative min-h-[60vh] flex items-center justify-center">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-red-600/20 to-orange-500/10 rounded-full blur-[100px]"></div>
          <div className="container-wide section-padding text-center relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-white" style={{fontFamily: "'Playfair Display', serif"}}>Project Not Found</h1>
            <p className="text-white/70 mb-8 text-lg">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 rounded-full px-8 py-6">
              <Link to="/portfolio">Back to Portfolio</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title={`${project.title} | Portfolio Case Study | LUNEXO MEDIA`}
        description={project.description}
        url={`https://www.lunexomedia.com/portfolio/${id}`}
        image={project.image_url || "https://www.lunexomedia.com/og-image-new.jpg"}
        keywords={`${project.category}, portfolio, case study, ${project.title}, web design, digital marketing`}
      />
      <Navigation />
      
      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-950/30 via-[#0a0a0f] to-purple-950/20"></div>
          <div className="absolute top-20 left-10 w-[700px] h-[700px] bg-gradient-to-r from-red-600/25 to-orange-500/15 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-pink-500/15 rounded-full blur-[130px] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-white/3 to-transparent rounded-full"></div>
        </div>
        
        {/* Premium Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-500/60 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-orange-500/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-yellow-500/60 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container-wide section-padding relative z-10 pt-28 pb-16">
          {/* Premium Back Button */}
          <Button variant="ghost" asChild className="mb-10 text-white/70 hover:text-white hover:bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <Link to="/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Premium Category Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-400 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl">
                <Layers className="w-4 h-4" />
                {project.category}
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                {project.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
                {project.description}
              </p>

              {/* Premium Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  { icon: TrendingUp, value: "200%", label: "Growth", color: "from-green-500 to-emerald-500" },
                  { icon: Clock, value: "4 Weeks", label: "Delivery", color: "from-blue-500 to-cyan-500" },
                  { icon: Star, value: "5.0", label: "Rating", color: "from-yellow-500 to-orange-500" },
                  { icon: Target, value: "100%", label: "Goals Met", color: "from-purple-500 to-pink-500" }
                ].map((stat, i) => (
                  <div key={i} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/8 transition-all">
                      <stat.icon className={`w-5 h-5 mb-2 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text'}} />
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {project.project_url && (
                  <Button asChild size="lg" className="group text-base px-8 py-7 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-red-500/25">
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Visit Live Project
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="text-base px-8 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <Link to="/contact">
                    Start Similar Project
                  </Link>
                </Button>
              </div>
            </div>

            {/* Premium Image Frame */}
            {project.image_url && (
              <div className="relative animate-scale-in" style={{animationDelay: '0.2s'}}>
                {/* Glow Effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-red-500/30 via-orange-500/25 to-yellow-500/20 rounded-3xl blur-3xl opacity-70"></div>
                
                {/* Premium Frame */}
                <div className="relative">
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500/50 via-orange-500/50 to-yellow-500/50 rounded-2xl"></div>
                  <div className="relative bg-[#0a0a0f] p-1 rounded-2xl">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-auto rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-green-500/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </div>
                
                {/* Category Badge */}
                <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  {project.category}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Highlights Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Security First", desc: "Built with enterprise-grade security standards", color: "from-blue-500 to-cyan-500" },
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for maximum performance", color: "from-yellow-500 to-orange-500" },
              { icon: Target, title: "Goal Oriented", desc: "Designed to achieve business objectives", color: "from-green-500 to-emerald-500" }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section - Premium */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-[150px]"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-10 lg:p-14 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>Tech Stack</h2>
                    <p className="text-white/70">Technologies powering this project</p>
                  </div>
                </div>
                <div className="text-sm text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                  {project.technologies.length} Technologies
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-6 py-3 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Content - Premium */}
      {project.content && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-full blur-[150px]"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-400 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-6">
                  <Award className="w-4 h-4" />
                  Case Study
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Project <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Details</span>
                </h2>
                <p className="text-white/70 text-lg">Full breakdown of strategy, execution, and results</p>
              </div>
              
              {/* Content Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
                <div className="prose prose-lg prose-invert max-w-none 
                  prose-headings:text-white prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                  prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-white/80 prose-ol:text-white/80 prose-ul:my-6 prose-ol:my-6
                  prose-li:marker:text-red-400 prose-li:mb-2
                  prose-blockquote:border-l-red-500 prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:text-white/70 prose-blockquote:italic
                  prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-red-400
                  prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                  prose-hr:border-white/10 prose-hr:my-8
                  [&>*]:text-white/80
                ">
                  <div dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(project.content, {
                      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'img', 'blockquote', 'code', 'pre', 'br', 'hr'],
                      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                      ALLOW_DATA_ATTR: false
                    })
                  }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects - Premium */}
      {relatedProjects.length > 0 && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                More Projects
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Related <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Work</span>
              </h2>
              <p className="text-white/70 text-lg">More projects in {project.category}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((related, index) => (
                <Link 
                  key={index} 
                  to={`/portfolio/${related.slug}`}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={related.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4">
                        <span className="text-xs px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full font-medium backdrop-blur-sm">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2 mb-4">{related.description}</p>
                      <div className="flex items-center gap-2 text-white/60 text-sm group-hover:text-white transition-colors">
                        View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-[#0a0a0f] to-orange-950/50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-red-500/25 via-orange-500/20 to-yellow-500/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-5 h-5" />
              Ready to Transform Your Business?
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
              Want Similar Results
              <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                For Your Business?
              </span>
            </h2>
            
            <p className="text-lg lg:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can create transformative digital experiences that drive real results for your brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="group text-base px-12 py-8 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-red-500/25">
                <Link to="/contact" className="flex items-center gap-2">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-12 py-8 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                <Link to="/portfolio">
                  View More Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioItem;