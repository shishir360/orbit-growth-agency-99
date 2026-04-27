import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight, Folder, BookOpen, Grid3X3, Activity, Cpu, Database, ShieldCheck } from "lucide-react";
import { useBlog } from "@/contexts/BlogContext";
import SEO from "@/components/ui/seo";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const BlogCategories = () => {
  const { getPublishedPosts } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const allPosts = getPublishedPosts();
  
  // Get all unique categories
  const categories = Array.from(new Set(allPosts.map(post => post.category).filter(Boolean)));
  
  // Group posts by category
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category!] = allPosts.filter(post => post.category === category);
    return acc;
  }, {} as Record<string, typeof allPosts>);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Intelligence Categories | Absolute Repository | LUNEXO MEDIA"
        description="Browse our absolute intelligence repository by category. Find architecture insights on Website Design, SEO, AI Automation and more."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/blog/categories"
        keywords="blog categories, digital marketing topics, SEO articles, web design blog, AI automation guides"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
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
                <Folder className="w-5 h-5 mr-4" />
                Intelligence Map
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Intelligence <br /> <span className="text-primary italic">Categories.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Explore our absolute intelligence nodes organized by operational logic. Find exactly the architecture insights you require within our repository.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
        <div className="container-wide section-padding relative z-10">
          
          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32 max-w-7xl mx-auto"
          >
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 shadow-glass space-y-12">
              <div className="flex items-center gap-6">
                <Grid3X3 className="w-10 h-10 text-primary" />
                <h2 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">Operational Logic Filter</h2>
              </div>
              <div className="flex flex-wrap gap-6">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className={`h-16 px-10 rounded-full text-xl font-bold transition-all duration-500 ${selectedCategory === null 
                    ? "bg-slate-900 text-white shadow-2xl scale-105" 
                    : "bg-white/40 border-white/60 text-slate-900 hover:bg-white/60"
                  }`}
                >
                  All Intel Nodes ({allPosts.length})
                </Button>
                {categories.map((category) => {
                  const count = postsByCategory[category!]?.length || 0;
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category!)}
                      className={`h-16 px-10 rounded-full text-xl font-bold transition-all duration-500 ${selectedCategory === category 
                        ? "bg-slate-900 text-white shadow-2xl scale-105" 
                        : "bg-white/40 border-white/60 text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      {category} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Category Sections */}
          <AnimatePresence mode="wait">
            {selectedCategory === null ? (
              // Show all categories
              <motion.div 
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-48"
              >
                {categories.map((category, index) => (
                  <div key={category} className="space-y-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-7xl mx-auto border-b-2 border-white/60 pb-12">
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
                          <BookOpen className="w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                           <h2 className="text-6xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tighter">{category}</h2>
                           <Badge className="bg-primary/10 text-primary border-primary/20 px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                            {postsByCategory[category!]?.length || 0} Absolute Nodes
                          </Badge>
                        </div>
                      </div>
                      
                      {(postsByCategory[category!]?.length || 0) > 6 && (
                        <Button 
                          variant="ghost" 
                          onClick={() => setSelectedCategory(category!)}
                          className="text-primary hover:bg-primary/10 px-10 py-8 rounded-full text-xl font-bold flex items-center gap-4 transition-all duration-500"
                        >
                          View Category Repository
                          <ArrowRight className="w-6 h-6" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
                      {postsByCategory[category!]?.slice(0, 6).map((post) => (
                        <motion.div 
                          key={post.id} 
                          whileHover={{ y: -15 }}
                          className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden shadow-glass hover:shadow-2xl transition-all duration-1000 flex flex-col h-full"
                        >
                          <div className="aspect-[16/10] relative overflow-hidden">
                            <img 
                              src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                               <div className="bg-primary/20 backdrop-blur-xl border border-white/40 text-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
                                 Intel Node
                               </div>
                            </div>
                          </div>
                          <div className="p-12 space-y-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-8 text-sm font-black text-slate-400 uppercase tracking-[0.4em]">
                              <div className="flex items-center gap-3">
                                <CalendarDays className="w-5 h-5 text-primary" />
                                {formatDate(post.publishDate)}
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-primary" />
                                {post.readTime}
                              </div>
                            </div>
                            <h3 className="text-3xl font-heading font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors duration-700 leading-tight">
                              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="text-xl text-slate-500 mb-8 leading-relaxed font-medium flex-1 line-clamp-3">{post.excerpt}</p>
                            <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 rounded-full px-10 py-8 font-bold text-xl group/btn border border-primary/20 transition-all duration-500 w-full mt-auto">
                              <Link to={`/blog/${post.slug}`} className="flex items-center justify-center gap-4">
                                Inspect Node
                                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-3 transition-transform duration-500" />
                              </Link>
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              // Show selected category only
              <motion.div 
                key="selected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-20"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-7xl mx-auto border-b-2 border-white/60 pb-12">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
                      <BookOpen className="w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 tracking-tighter leading-none">{selectedCategory}</h2>
                       <Badge className="bg-primary/10 text-primary border-primary/20 px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                        {postsByCategory[selectedCategory]?.length || 0} Absolute Nodes
                      </Badge>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedCategory(null)}
                    className="text-slate-500 hover:bg-slate-100 px-10 py-8 rounded-full text-xl font-bold flex items-center gap-4 transition-all duration-500 border border-slate-200"
                  >
                    Return to Map
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
                  {postsByCategory[selectedCategory]?.map((post, index) => (
                    <motion.div 
                      key={post.id} 
                      whileHover={{ y: -15 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                      className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden shadow-glass hover:shadow-2xl transition-all duration-1000 flex flex-col h-full"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      <div className="p-12 space-y-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-8 text-sm font-black text-slate-400 uppercase tracking-[0.4em]">
                          <div className="flex items-center gap-3">
                            <CalendarDays className="w-5 h-5 text-primary" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-3xl font-heading font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors duration-700 leading-tight">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-xl text-slate-500 mb-8 leading-relaxed font-medium flex-1 line-clamp-3">{post.excerpt}</p>
                        <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 rounded-full px-10 py-8 font-bold text-xl group/btn border border-primary/20 transition-all duration-500 w-full mt-auto">
                          <Link to={`/blog/${post.slug}`} className="flex items-center justify-center gap-4">
                            Inspect Node
                            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-3 transition-transform duration-500" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto px-10 flex flex-col items-center gap-16">
             <div className="flex items-center gap-12 text-white/30">
               <ShieldCheck className="w-10 h-10" />
               <Cpu className="w-10 h-10" />
               <Database className="w-10 h-10" />
               <Activity className="w-10 h-10" />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.5em] leading-relaxed max-w-5xl mx-auto">Absolute Repository Integrity Verified. Strategic Intelligence Nodes Synchronized.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogCategories;