import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, ArrowRight, Sparkles, BookOpen, TrendingUp, Search, Filter, Play, ChevronRight, Database, Cpu, ShieldCheck, Activity, Layers } from "lucide-react";
import { useBlog } from "@/contexts/BlogContext";
import SEO from "@/components/ui/seo";
import SafeImage from "@/components/ui/safe-image";
import { BlogNotificationPrompt } from "@/components/BlogNotificationPrompt";

const Blog = () => {
  const { getPublishedPosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const allBlogPosts = getPublishedPosts();
  
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Website Design", "Ads Management", "AI Automation"];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    document.title = "Intelligence Repository | Tips, Trends & Insights";
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Intelligence Repository | Tips, Trends & Insights"
        description="Stay updated with Lunexo Media's blog. Read expert articles on SEO, paid ads, web design, and AI automation to grow your online presence."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/blog"
        keywords="digital marketing, SEO tips, advertising insights, AI tools, business growth, Lunexo Media blog"
      />
      
      <BlogNotificationPrompt />
      <Navigation />
      
      <div className="container-wide section-padding pt-12 relative z-20">
        <BreadcrumbSEO 
          items={[]}
          currentPage="Repository"
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <BookOpen className="w-5 h-5 mr-3" />
                The Intelligence Repository
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Insights & <span className="text-primary italic">Strategic Logic.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Discover the latest absolute trends, high-level growth protocols, and tactical intelligence for building <span className="text-primary italic font-bold">market dominance.</span>
            </motion.p>
            
            {/* Search and Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-5xl mx-auto space-y-12"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Search className="w-8 h-8" />
                </div>
                <Input 
                  type="text"
                  placeholder="Search repository logic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-24 pl-24 pr-12 bg-white/40 backdrop-blur-xl border-2 border-white/60 rounded-full text-2xl text-slate-900 placeholder:text-slate-400 focus:border-primary/50 transition-all duration-700 shadow-glass"
                />
              </div>

              <div className="flex flex-wrap gap-6 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-10 py-6 text-xl font-bold transition-all duration-500 ${
                      selectedCategory === category
                        ? "bg-slate-900 text-white shadow-2xl"
                        : "bg-white/40 backdrop-blur-xl border-2 border-white/60 text-slate-500 hover:bg-white/60 hover:text-primary"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 flex flex-col h-full hover:translate-y-[-12px]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SafeImage
                      src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-8 left-8">
                      <Badge className="bg-white/90 backdrop-blur-xl text-primary font-black uppercase tracking-widest text-[10px] px-6 py-3 rounded-2xl shadow-sm">
                        {post.category || 'Strategic Logic'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-12 space-y-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-3">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        {formatDate(post.publishDate)}
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary" />
                        {post.readTime || '5 min read'}
                      </div>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight flex-1">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-xl text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="pt-10 border-t border-white/60">
                      <Button variant="ghost" className="p-0 h-auto text-primary font-black uppercase tracking-[0.4em] text-[10px] hover:text-primary hover:bg-transparent transition-all group-hover:translate-x-4" asChild>
                        <Link to={`/blog/${post.slug}`} className="flex items-center gap-4">
                          Read Strategic Logic
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-32"
            >
              <Button variant="outline" className="text-2xl px-20 py-12 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold shadow-glass">
                Load More Protocols
              </Button>
            </motion.div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-48">
              <p className="text-4xl text-slate-400 font-heading font-bold italic">No intelligence protocols found.</p>
              <Button 
                variant="ghost" 
                onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
                className="mt-12 text-primary font-black uppercase tracking-[0.4em] text-sm hover:bg-transparent"
              >
                Clear Operational Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Alpha Protocol
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Get Weekly <span className="text-primary italic">Alpha.</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-4xl mx-auto font-medium">
              Join our absolute repository of founders receiving our curated digital growth alpha every Monday.
            </p>
            
            <div className="max-w-3xl mx-auto pt-12">
              <div className="flex flex-col sm:flex-row gap-6">
                <Input 
                  type="email" 
                  placeholder="Enter your email uplink" 
                  className="h-24 px-12 bg-white/10 border-white/20 text-white rounded-full text-2xl placeholder:text-slate-500 focus:border-primary/50 transition-all duration-500"
                />
                <Button className="h-24 px-20 bg-primary text-white rounded-full font-bold text-2xl hover:bg-primary/90 shadow-2xl transition-all duration-500 hover:scale-105">
                  Subscribe
                </Button>
              </div>
              <div className="mt-10 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                <ShieldCheck className="w-5 h-5 text-primary" /> Pure Growth Logic. No Friction.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;