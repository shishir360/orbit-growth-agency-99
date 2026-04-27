import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { CalendarDays, Clock, ArrowLeft, Share2, Copy, Check, BookOpen, ArrowRight, ChevronRight, Sparkles, Database, Cpu, ShieldCheck, Activity, Layers } from "lucide-react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'isomorphic-dompurify';
import { useBlog } from "@/contexts/BlogContext";
import SEO from "@/components/ui/seo";
import { BlogEngagement, KeyTakeaways, QuickActionCTA } from "@/components/ui/blog-engagement";
import SafeImage from "@/components/ui/safe-image";
import { BlogNotificationPrompt } from "@/components/BlogNotificationPrompt";
import { motion, AnimatePresence } from "framer-motion";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const { getPostBySlug, getPublishedPosts, loading } = useBlog();

  // Get the blog post from context
  const blogPost = getPostBySlug(slug || '');

  // Show loading state while posts are being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
          <p className="text-2xl font-heading font-bold text-slate-900">Synchronizing Intelligence...</p>
        </div>
      </div>
    );
  }

  // If post doesn't exist, is not published, or is blocked, redirect to blog page
  if (!blogPost || !blogPost.published || blogPost.blocked) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (published and not blocked, excluding current post)
  const relatedPosts = getPublishedPosts()
    .filter(post => post.id !== blogPost.id)
    .slice(0, 2);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const currentUrl = window.location.href;
  const shareText = `Check out this absolute intelligence: ${blogPost.title}`;

  // Only allow sharing if post is published and not blocked
  const canShare = blogPost.published && !blogPost.blocked;

  const handleShare = async () => {
    if (!canShare) {
      toast({
        title: "Access Restricted",
        description: "This intelligence node is not available for external sync.",
        variant: "destructive",
      });
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: shareText,
          url: currentUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareLinkedIn = () => {
    if (!canShare) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    if (!canShare) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    if (!canShare) return;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: "Intelligence Uplink Copied",
        description: "The absolute link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Uplink Failed",
        description: "Please copy the link manually from your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <BlogNotificationPrompt />
      <SEO
        title={`${blogPost.title} | LUNEXO MEDIA Intelligence`}
        description={blogPost.excerpt}
        url={`https://www.lunexomedia.com/blog/${blogPost.slug}`}
        image={blogPost.image?.startsWith('http') ? blogPost.image : `https://www.lunexomedia.com${blogPost.image}`}
        type="article"
        keywords={`${blogPost.category}, ${blogPost.title}, digital marketing, business growth, LUNEXO MEDIA`}
        author={blogPost.author}
        article={{
          publishedTime: new Date(blogPost.publishDate).toISOString(),
          modifiedTime: new Date(blogPost.updatedAt).toISOString(),
          author: blogPost.author,
          section: blogPost.category,
          tags: [blogPost.category || 'Digital Marketing', 'Business Growth', 'LUNEXO MEDIA']
        }}
      />
      
      {/* Blog Engagement Features */}
      <BlogEngagement 
        postId={blogPost.id}
        title={blogPost.title}
        category={blogPost.category}
        readTime={blogPost.readTime}
      />
      
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <section className="bg-white/40 backdrop-blur-md py-10 border-b border-white/60 mt-20">
        <div className="container-wide section-padding flex items-center justify-between">
          <BreadcrumbSEO 
            items={[
              { label: "Intelligence", href: "/blog" },
              { label: blogPost.category || "Article", href: "/blog" }
            ]}
            currentPage={blogPost.title}
          />
          
          <Button variant="ghost" asChild className="hover:bg-primary/10 text-primary font-black uppercase tracking-[0.4em] text-[10px]">
            <Link to="/blog">
              <ArrowLeft className="w-5 h-5 mr-3" />
              Return to Repository
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="max-w-5xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500"
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 rounded-full font-bold">{blogPost.category}</Badge>
              <div className="flex items-center gap-3">
                <CalendarDays className="w-4 h-4 text-primary" />
                {formatDate(blogPost.publishDate)}
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                {blogPost.readTime}
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              {blogPost.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl text-slate-500 leading-relaxed font-medium max-w-5xl"
            >
              {blogPost.excerpt}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-between pt-12 border-t border-white/60"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center font-heading font-black text-3xl shadow-2xl">
                  {blogPost.author.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-slate-900">{blogPost.author}</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">LUNEXO ARCHITECT</p>
                </div>
              </div>
              
              <Button size="lg" className="bg-white/60 backdrop-blur-xl border border-white/80 text-slate-900 hover:bg-white px-10 py-6 rounded-full font-bold shadow-glass transition-all duration-500" onClick={handleShare} disabled={!canShare}>
                <Share2 className="w-6 h-6 mr-4" />
                Share Intel
              </Button>
            </motion.div>

            {blogPost.image && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="aspect-[21/9] rounded-[4rem] overflow-hidden shadow-glass border border-white/60"
              >
                <SafeImage
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 relative">
        <div className="container-wide section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Main Content */}
              <div className="lg:col-span-8">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 shadow-glass"
                >
                  <div 
                    className="prose prose-2xl max-w-none prose-slate prose-headings:font-heading prose-headings:font-bold prose-h1:text-5xl prose-h2:text-5xl prose-h2:mb-12 prose-h3:text-4xl prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-medium prose-strong:text-slate-900 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-12 prose-blockquote:rounded-[3rem] prose-blockquote:not-italic prose-blockquote:font-heading prose-blockquote:text-slate-900 prose-img:rounded-[3rem] prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(blogPost.content, {
                        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'img', 'blockquote', 'code', 'pre', 'br', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
                        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                        ALLOW_DATA_ATTR: false
                      })
                    }}
                  />
                  
                  <div className="mt-24 space-y-16">
                    <KeyTakeaways 
                      points={[
                        "Prioritize high-end user experience to solidify absolute brand authority.",
                        "Implement sub-second logic for absolute retention architecture.",
                        "Leverage predictive analytics to identify scaling opportunities.",
                        "Architect mobile-first interfaces for omnichannel dominance.",
                        "Sync visual aesthetics with cognitive triggers for conversion surge."
                      ]}
                    />
                    
                    <QuickActionCTA />
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="lg:col-span-4">
                <div className="space-y-16 sticky top-32">
                  
                  {/* Table of Contents */}
                  <Card className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] shadow-glass overflow-hidden">
                    <CardContent className="p-12">
                      <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-10 flex items-center gap-4">
                        <Sparkles className="w-6 h-6 text-primary" />
                        Intelligence Map
                      </h3>
                      <nav className="space-y-8 text-xl font-heading font-bold">
                        <a href="#understanding" className="flex items-center gap-5 text-slate-500 hover:text-primary transition-all group">
                          <span className="w-3 h-3 rounded-full bg-slate-200 group-hover:bg-primary group-hover:scale-150 transition-all" />
                          Fundamental Logic
                        </a>
                        <a href="#strategies" className="flex items-center gap-5 text-slate-500 hover:text-primary transition-all group">
                          <span className="w-3 h-3 rounded-full bg-slate-200 group-hover:bg-primary group-hover:scale-150 transition-all" />
                          Growth Strategies
                        </a>
                        <a href="#implementation" className="flex items-center gap-5 text-slate-500 hover:text-primary transition-all group">
                          <span className="w-3 h-3 rounded-full bg-slate-200 group-hover:bg-primary group-hover:scale-150 transition-all" />
                          Deployment Protocol
                        </a>
                        <a href="#results" className="flex items-center gap-5 text-slate-500 hover:text-primary transition-all group">
                          <span className="w-3 h-3 rounded-full bg-slate-200 group-hover:bg-primary group-hover:scale-150 transition-all" />
                          Expected Delta
                        </a>
                      </nav>
                    </CardContent>
                  </Card>

                  {/* Quick Action CTA */}
                  <Card className="bg-slate-900 rounded-[4rem] shadow-glass overflow-hidden text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
                    <CardContent className="p-12 text-center relative z-10">
                      <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-10">
                        <Sparkles className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-3xl font-heading font-bold mb-6 leading-tight">Strategic Help?</h3>
                      <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed">
                        Architect your growth with personalized intelligence from our absolute experts.
                      </p>
                      <Button asChild size="lg" className="w-full bg-primary text-white hover:bg-primary/90 rounded-full font-bold text-2xl py-10 shadow-2xl transition-all duration-500 hover:scale-105">
                        <Link to="/contact">Book Audit</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Share */}
                  <Card className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] shadow-glass overflow-hidden">
                    <CardContent className="p-12">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Distribute Intel</h3>
                      <div className="space-y-6">
                        <Button variant="outline" className="w-full justify-between hover:bg-primary hover:text-white rounded-[2rem] font-bold p-8 transition-all duration-500 border-white/60" onClick={handleShareLinkedIn} disabled={!canShare}>
                          Share on LinkedIn <Share2 className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:bg-primary hover:text-white rounded-[2rem] font-bold p-8 transition-all duration-500 border-white/60" onClick={handleShareTwitter} disabled={!canShare}>
                          Share on Twitter <Share2 className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:bg-slate-100 rounded-[2rem] font-bold p-8 transition-all duration-500 border-white/60" onClick={handleCopyLink} disabled={!canShare}>
                          {copied ? 'Uplink Copied' : 'Copy Logic Link'}
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-center mb-32 tracking-tighter">Related <span className="text-primary italic">Intelligence.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {relatedPosts.map((post, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden shadow-glass group hover:translate-y-[-12px] transition-all duration-1000"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <SafeImage
                      src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-transform duration-1000"
                    />
                    <div className="absolute top-10 left-10">
                      <Badge className="bg-white/90 backdrop-blur-xl text-primary font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-2xl shadow-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-16 space-y-10 flex flex-col h-full">
                    <h3 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <Button variant="link" className="text-primary font-black uppercase tracking-[0.4em] text-[10px] p-0 group-hover:translate-x-5 transition-transform w-fit" asChild>
                      <Link to={`/blog/${post.slug}`}>
                        Read Intelligence <ArrowRight className="w-5 h-5 ml-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action-Oriented CTA Section */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Execution Protocol
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Scale Your <span className="text-primary italic">Intelligence?</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Don't just observe absolute strategies—deploy them with our expert architecture. 
              We've scaled hundreds of businesses through proven absolute frameworks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
              {[
                { title: "Strategy Session", desc: "30-minute high-end audit to define your trajectory.", icon: "💬" },
                { title: "Architecture Audit", desc: "Comprehensive review of your digital footprint.", icon: "📊" },
                { title: "Rapid Deployment", desc: "Immediate execution on your primary scaling bottlenecks.", icon: "🚀" }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 text-center hover:bg-white/10 transition-all duration-500 group">
                  <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4 leading-tight">{item.title}</h3>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-14 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group" asChild>
                <Link to="/contact">
                  Start Execution
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/portfolio">
                  View Success Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-24 lg:p-32 text-center shadow-glass"
          >
            <h3 className="text-5xl lg:text-[10rem] font-heading font-bold text-slate-900 mb-12 leading-tight tracking-tighter">
              Absolute <span className="text-primary italic">Intelligence.</span>
            </h3>
            <p className="text-3xl text-slate-500 font-medium mb-20 max-w-4xl mx-auto leading-relaxed">
              Get weekly high-end intelligence nodes, logic audits, and scaling strategies delivered straight to your vault.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 max-w-4xl mx-auto">
              <input 
                type="email" 
                placeholder="Secure Intelligence Access"
                className="flex-1 px-12 py-10 bg-white/60 border border-white/80 rounded-full text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all duration-500"
              />
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-24 py-10 rounded-full font-bold text-3xl shadow-2xl transition-all duration-500 hover:scale-105">
                Subscribe Free
              </Button>
            </div>
            <div className="mt-16 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
              <ShieldCheck className="w-6 h-6 text-primary" /> Zero noise. 100% Signal. Join 1000+ Scaled Architects.
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;