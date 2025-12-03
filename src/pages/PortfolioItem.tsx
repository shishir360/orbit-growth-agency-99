import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar, Users, TrendingUp, Award, Globe, Layers, Code, Zap, ArrowRight } from "lucide-react";
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
        
        // Fetch related projects
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
            <p className="text-white/50 mb-8 text-lg">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6">
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
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-red-600/20 to-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/15 to-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="container-wide section-padding relative z-10 pt-24">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8 text-white/60 hover:text-white hover:bg-white/5 rounded-full">
            <Link to="/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="space-y-6 animate-fade-in">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl">
                <Layers className="w-4 h-4 text-red-400" />
                {project.category}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                {project.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl font-light">
                {project.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Results</div>
                    <div className="text-white font-semibold">200% Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Duration</div>
                    <div className="text-white font-semibold">4 Weeks</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {project.project_url && (
                  <Button asChild size="lg" className="group text-base px-8 py-6 bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105 font-semibold">
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Visit Live Project
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <Link to="/contact">
                    Start Similar Project
                  </Link>
                </Button>
              </div>
            </div>

            {/* Main Image with Premium Frame */}
            {project.image_url && (
              <div className="relative animate-scale-in" style={{animationDelay: '0.2s'}}>
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl backdrop-blur-sm border border-white/10">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-20 relative">
          <div className="container-wide section-padding">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>Technologies Used</h2>
                  <p className="text-white/50 text-sm">Stack & tools that powered this project</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-5 py-3 bg-white/5 border border-white/10 rounded-full text-white/80 font-medium text-sm hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      {project.content && (
        <section className="py-20 relative">
          <div className="container-wide section-padding">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>Project Details</h2>
                    <p className="text-white/50 text-sm">Full case study breakdown</p>
                  </div>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none 
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-white/70 prose-p:leading-relaxed
                  prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-ul:text-white/70 prose-ol:text-white/70
                  prose-li:marker:text-red-400
                  prose-blockquote:border-l-red-500 prose-blockquote:text-white/60
                  prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-red-400
                  prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
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

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 relative">
          <div className="container-wide section-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Related Projects
              </h2>
              <p className="text-white/50">More work in {project.category}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((related, index) => (
                <Link 
                  key={index} 
                  to={`/portfolio/${related.slug}`}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={related.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} 
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-xs text-white/40 uppercase tracking-wider">{related.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-white/50 text-sm mt-2 line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-500/10 to-red-600/20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-4 h-4 text-yellow-400" />
              Ready to Start?
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Want Similar Results for
              <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Your Business?
              </span>
            </h2>
            
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto font-light">
              Let's discuss how we can create transformative digital experiences that drive real results for your brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group text-base px-10 py-7 bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105 font-semibold">
                <Link to="/contact" className="flex items-center gap-2">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
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
