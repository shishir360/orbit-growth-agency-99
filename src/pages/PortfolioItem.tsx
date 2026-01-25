import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, TrendingUp, Award, Globe, Layers, Code, Zap, ArrowRight, Star, CheckCircle, Sparkles, Target, Clock, Shield, BookOpen, Users, BarChart3, Rocket, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DOMPurify from 'isomorphic-dompurify';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

// Structured Data Component for SEO
const PortfolioStructuredData = ({ project }: { project: any }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://www.lunexomedia.com/portfolio/${project.slug}`,
    "image": project.image_url || "https://www.lunexomedia.com/og-image-new.jpg",
    "dateCreated": project.created_at,
    "dateModified": project.updated_at,
    "creator": {
      "@type": "Organization",
      "name": "Lunexo Media",
      "url": "https://www.lunexomedia.com",
      "logo": "https://www.lunexomedia.com/logo.png"
    },
    "genre": project.category,
    "keywords": project.technologies?.join(", ") || project.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.lunexomedia.com/portfolio/${project.slug}`
    },
    "provider": {
      "@type": "Organization",
      "name": "Lunexo Media",
      "url": "https://www.lunexomedia.com"
    }
  };

  // Add breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.lunexomedia.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://www.lunexomedia.com/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://www.lunexomedia.com/portfolio/${project.slug}`
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

const PortfolioItem = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(null);

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
        
        // Fetch AI-generated OG image if available
        const { data: ogData } = await supabase
          .from('og_images')
          .select('image_url')
          .eq('page_path', `/portfolio/${id}`)
          .single();
        
        if (ogData?.image_url) {
          setOgImageUrl(ogData.image_url);
        }
        
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
              <a href="https://lunexomedia.com/portfolio">Back to Portfolio</a>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Use AI-generated OG image if available, otherwise fall back to project image
  const seoImage = ogImageUrl || project.image_url || "https://www.lunexomedia.com/og-image-new.jpg";

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title={`${project.title} | Portfolio Case Study | LUNEXO MEDIA`}
        description={project.description}
        url={`https://www.lunexomedia.com/portfolio/${id}`}
        image={seoImage}
        keywords={`${project.category}, portfolio, case study, ${project.title}, ${project.technologies?.join(', ') || 'web design, digital marketing'}`}
      />
      <PortfolioStructuredData project={project} />
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
            <a href="https://lunexomedia.com/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </a>
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
                  <a href="https://lunexomedia.com/contact">
                    Start Similar Project
                  </a>
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

      {/* Project Content - Ultra Premium */}
      {project.content && (
        <section className="py-32 relative overflow-hidden">
          {/* Premium Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-red-600/15 to-orange-500/10 rounded-full blur-[180px]"></div>
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-[150px]"></div>
          </div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Premium Section Header */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
                  <BookOpen className="w-5 h-5" />
                  Case Study
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  Project <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Details</span>
                </h2>
                <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto">Full breakdown of strategy, execution, and results</p>
              </motion.div>

              {/* Premium Stats Row */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
              >
                {[
                  { icon: Users, value: "50K+", label: "Users Reached", color: "from-blue-500 to-cyan-500" },
                  { icon: BarChart3, value: "300%", label: "ROI Increase", color: "from-green-500 to-emerald-500" },
                  { icon: Rocket, value: "2 Weeks", label: "Launch Time", color: "from-purple-500 to-pink-500" },
                  { icon: Star, value: "100%", label: "Client Satisfaction", color: "from-yellow-500 to-orange-500" }
                ].map((stat, i) => (
                  <div key={i} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center">
                      <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {/* Premium Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/15 to-yellow-500/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/15 rounded-3xl p-8 lg:p-14 backdrop-blur-xl">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-[100px]"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-[80px]"></div>
                  
                  <div className="prose prose-lg prose-invert max-w-none 
                    prose-headings:text-white prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-10
                    prose-h2:text-3xl prose-h2:bg-gradient-to-r prose-h2:from-white prose-h2:to-white/80 prose-h2:bg-clip-text
                    prose-h3:text-2xl prose-h3:text-white/90
                    prose-p:text-white/75 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                    prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:text-white/75 prose-ol:text-white/75 prose-ul:my-6 prose-ol:my-6
                    prose-li:marker:text-red-400 prose-li:mb-3 prose-li:text-lg
                    prose-blockquote:border-l-red-500 prose-blockquote:border-l-4 prose-blockquote:pl-8 prose-blockquote:text-white/60 prose-blockquote:italic prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
                    prose-code:bg-red-500/10 prose-code:px-3 prose-code:py-1 prose-code:rounded-lg prose-code:text-red-400 prose-code:font-medium
                    prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                    prose-hr:border-white/10 prose-hr:my-10
                    prose-img:rounded-xl prose-img:shadow-2xl
                    [&>*]:text-white/75
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
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects - Premium Auto-Scroll Carousel */}
      {relatedProjects.length > 0 && (
        <section className="py-32 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/15 to-pink-500/10 rounded-full blur-[180px] -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-full blur-[150px] -translate-y-1/2"></div>
          
          <div className="relative z-10">
            {/* Section Header */}
            <div className="container-wide section-padding">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
                  <Sparkles className="w-5 h-5" />
                  More Projects
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  Related <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Work</span>
                </h2>
                <p className="text-white/70 text-lg lg:text-xl">More projects in {project.category}</p>
              </motion.div>
            </div>

            {/* Auto-Scrolling Carousel */}
            <div className="relative">
              {/* Left Gradient Mask */}
              <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-64 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
              {/* Right Gradient Mask */}
              <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-64 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
              
              {/* Carousel Container */}
              <div className="overflow-hidden py-4">
                <motion.div
                  className="flex gap-8"
                  animate={{
                    x: ["0%", "-50%"]
                  }}
                  transition={{
                    x: {
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  style={{ width: "fit-content" }}
                >
                  {/* Duplicate projects for seamless loop */}
                  {[...relatedProjects, ...relatedProjects, ...relatedProjects, ...relatedProjects].map((related, index) => (
                    <Link 
                      key={index} 
                      to={`/portfolio/${related.slug}`}
                      className="group flex-shrink-0 w-[380px] lg:w-[420px]"
                    >
                      <div className="relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-white/25 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/10">
                          {/* Image Container */}
                          <div className="relative h-56 lg:h-64 overflow-hidden">
                            <img 
                              src={related.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} 
                              alt={related.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"></div>
                            
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="text-xs px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/30 text-white rounded-full font-medium backdrop-blur-xl">
                                {related.category}
                              </span>
                            </div>

                            {/* Play Icon on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                                <Play className="w-6 h-6 text-white ml-1" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6 lg:p-8">
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                              {related.title}
                            </h3>
                            <p className="text-white/60 text-sm lg:text-base line-clamp-2 mb-6">{related.description}</p>
                            
                            {/* CTA */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-white/50 text-sm group-hover:text-purple-400 transition-colors">
                                View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                              </div>
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map((star) => (
                                  <Star key={star} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* View All Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button asChild size="lg" className="group text-base px-10 py-7 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-purple-500/25">
                <Link to="/portfolio" className="flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
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
                <a href="https://lunexomedia.com/contact" className="flex items-center gap-2">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-12 py-8 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                <a href="https://lunexomedia.com/portfolio">
                  View More Work
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

export default PortfolioItem;