import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Play, 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Code, 
  Palette, 
  Bot,
  Target,
  Zap,
  Trophy,
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers,
  Database
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const tutorials = [
    {
      title: "Building Your First SaaS MVP: A Complete Guide",
      excerpt: "Learn how to build and launch a SaaS product from concept to first customers in 30 days using modern no-code and low-code tools.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      category: "SaaS Development",
      readTime: "15 min read",
      author: "LUNEXO MEDIA Team",
      slug: "building-first-saas-mvp",
      difficulty: "Beginner",
      featured: true,
      tags: ["MVP", "SaaS", "Startup", "Product Launch"]
    },
    {
      title: "Membership Site Setup: From Zero to Launch",
      excerpt: "Step-by-step tutorial on creating a profitable membership site with payment integration and user management.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
      category: "Membership Sites",
      readTime: "12 min read",
      author: "LUNEXO MEDIA Team",
      slug: "membership-site-setup",
      difficulty: "Intermediate",
      featured: false,
      tags: ["Membership", "Payments", "User Management"]
    },
    {
      title: "AI Chatbot Integration for Customer Support",
      excerpt: "Implement an AI chatbot to handle 80% of customer inquiries automatically and improve response times.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      category: "AI Automation",
      readTime: "10 min read",
      author: "LUNEXO MEDIA Team",
      slug: "ai-chatbot-integration",
      difficulty: "Advanced",
      featured: true,
      tags: ["AI", "Chatbot", "Automation", "Customer Support"]
    },
    {
      title: "Converting Landing Pages: Design Best Practices",
      excerpt: "Design principles and strategies to maximize your landing page conversion rates and drive more sales.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      category: "Web Design",
      readTime: "8 min read",
      author: "LUNEXO MEDIA Team",
      slug: "converting-landing-pages",
      difficulty: "Beginner",
      featured: false,
      tags: ["Landing Pages", "Conversion", "Design", "UX"]
    },
    {
      title: "Google Ads Optimization: Double Your ROI",
      excerpt: "Advanced strategies to optimize your Google Ads campaigns and achieve better return on investment.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
      category: "Digital Marketing",
      readTime: "12 min read",
      author: "LUNEXO MEDIA Team",
      slug: "google-ads-optimization",
      difficulty: "Intermediate",
      featured: true,
      tags: ["Google Ads", "PPC", "ROI", "Marketing"]
    },
    {
      title: "Facebook Ads Mastery: Complete Setup Guide",
      excerpt: "Master Facebook advertising with this comprehensive guide covering campaign setup, targeting, and optimization.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&q=80",
      category: "Digital Marketing",
      readTime: "14 min read",
      author: "LUNEXO MEDIA Team",
      slug: "facebook-ads-mastery",
      difficulty: "Intermediate",
      featured: false,
      tags: ["Facebook Ads", "Social Media", "Targeting", "Marketing"]
    },
    {
      title: "SEO Fundamentals: Rank Higher on Google",
      excerpt: "Learn the essential SEO strategies to improve your website's search engine rankings and organic traffic.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
      category: "SEO",
      readTime: "16 min read",
      author: "LUNEXO MEDIA Team",
      slug: "seo-fundamentals",
      difficulty: "Beginner",
      featured: false,
      tags: ["SEO", "Google", "Organic Traffic", "Keywords"]
    },
    {
      title: "Email Automation Workflows That Convert",
      excerpt: "Build powerful email automation sequences that nurture leads and convert them into paying customers.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
      category: "AI Automation",
      readTime: "11 min read",
      author: "LUNEXO MEDIA Team",
      slug: "email-automation-workflows",
      difficulty: "Intermediate",
      featured: false,
      tags: ["Email Marketing", "Automation", "Lead Nurturing", "Conversion"]
    }
  ];

  const categories = ["All", "SaaS Development", "Membership Sites", "AI Automation", "Web Design", "Digital Marketing", "SEO"];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100/50 text-emerald-600 border-emerald-200/50";
      case "Intermediate":
        return "bg-amber-100/50 text-amber-600 border-amber-200/50";
      case "Advanced":
        return "bg-rose-100/50 text-rose-600 border-rose-200/50";
      default:
        return "bg-slate-100/50 text-slate-600 border-slate-200/50";
    }
  };

  useEffect(() => {
    document.title = "Intelligence Repository | Learn with Lunexo Media";
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Marketing & Automation Tutorials | Learn with Lunexo Media"
        description="Free tutorials on SEO, ads, website tools, and AI automation. Learn from experts and take your digital skills to the next level."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/tutorials"
        keywords="tutorials, guides, SEO tutorials, digital marketing, AI automation, web design tutorials"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
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
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <GraduationCap className="w-5 h-5 mr-3" />
                Intelligence Repository
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Master <br /> <span className="text-primary italic">Absolute Growth.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Comprehensive architectures and step-by-step logic to help you build, launch, and scale your digital reality. 
            </motion.p>
            
            {/* Search and Stats */}
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center pt-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative max-w-xl w-full group"
              >
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-slate-400 w-8 h-8 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search architecture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-20 py-12 bg-white/40 backdrop-blur-xl border-white/60 focus:border-primary/60 rounded-[2.5rem] text-2xl font-bold shadow-glass placeholder:text-slate-400 text-slate-900"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex gap-16 text-center"
              >
                {[
                  { value: tutorials.length + "+", label: "Nodes" },
                  { value: "50K+", label: "Users" },
                  { value: "4.9★", label: "Rating" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Intelligence */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="flex items-center gap-8 mb-20 max-w-7xl mx-auto">
            <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center shadow-xl">
              <Star className="w-10 h-10 fill-primary text-primary" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-slate-900 tracking-tight">Featured Intelligence.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {featuredTutorials.map((tutorial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group h-full"
              >
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img 
                      src={tutorial.image} 
                      alt={tutorial.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700" />
                    <div className="absolute top-8 left-8">
                      <Badge className={`${getDifficultyColor(tutorial.difficulty)} px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm backdrop-blur-md`}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-24 h-24 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Play className="w-10 h-10 text-slate-900 ml-2" />
                      </div>
                    </div>
                  </div>
                  <div className="p-16 space-y-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-6">
                      <Badge variant="outline" className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-primary/30 text-primary">{tutorial.category}</Badge>
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Clock className="w-4 h-4" />
                        {tutorial.readTime}
                      </div>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      {tutorial.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {tutorial.excerpt}
                    </p>
                    <div className="pt-10 mt-auto border-t border-white/60">
                      <Button variant="ghost" asChild className="p-0 text-slate-900 hover:text-primary font-black uppercase tracking-[0.4em] text-[10px] h-auto group/btn">
                        <Link to={`/tutorials/${tutorial.slug}`} className="flex items-center gap-4">
                          Read Protocol
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logic Sort Filters */}
      <section className="py-20 bg-background border-b border-white/40">
        <div className="container-wide section-padding">
          <div className="flex flex-wrap gap-6 justify-center max-w-6xl mx-auto">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-12 py-8 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-2xl scale-105" 
                    : "bg-white/40 backdrop-blur-xl border-2 border-white/60 text-slate-500 hover:bg-white/60 hover:text-slate-900"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Global Inventory */}
      <section className="py-32 bg-background">
        <div className="container-wide section-padding">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12 max-w-7xl mx-auto">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight">
                {selectedCategory === "All" ? "Global Inventory." : `${selectedCategory} Nodes.`}
              </h2>
              <p className="text-2xl text-slate-500 font-medium">
                {filteredTutorials.length} architecture{filteredTutorials.length !== 1 ? 's' : ''} synchronized
              </p>
            </div>
            <Button variant="outline" className="px-12 py-8 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-white/60 bg-white/40 backdrop-blur-xl gap-4 hover:bg-white/60">
              <Filter className="w-5 h-5" />
              Logic Sort
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group h-full hover:translate-y-[-8px] transition-all duration-500"
              >
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={tutorial.image} 
                      alt={tutorial.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700" />
                    <div className="absolute top-8 left-8">
                      <Badge className={`${getDifficultyColor(tutorial.difficulty)} px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm backdrop-blur-md`}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-16 space-y-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-6">
                      <Badge variant="outline" className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-primary/30 text-primary">{tutorial.category}</Badge>
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Clock className="w-4 h-4" />
                        {tutorial.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      {tutorial.title}
                    </h3>
                    
                    <p className="text-xl text-slate-500 font-medium line-clamp-3 leading-relaxed flex-1">
                      {tutorial.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      {tutorial.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{tag}</span>
                      ))}
                    </div>

                    <div className="pt-10 mt-auto flex items-center justify-between border-t border-white/60">
                      <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <User className="w-4 h-4" />
                        {tutorial.author}
                      </div>
                      <Button variant="ghost" asChild className="p-0 text-slate-900 hover:text-primary font-black uppercase tracking-[0.4em] text-[10px] h-auto group/btn">
                        <Link to={`/tutorials/${tutorial.slug}`} className="flex items-center gap-4">
                          Read Protocol
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredTutorials.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 space-y-16"
            >
              <div className="w-40 h-40 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] flex items-center justify-center mx-auto shadow-glass">
                <Database className="w-20 h-20 text-slate-400" />
              </div>
              <div className="space-y-6">
                <h3 className="text-5xl font-heading font-bold text-slate-900">Zero Nodes Found.</h3>
                <p className="text-2xl text-slate-500 font-medium">Try adjusting your logic parameters or search trajectory.</p>
              </div>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }} className="bg-slate-900 text-white rounded-full px-16 py-10 text-2xl font-bold shadow-2xl hover:bg-slate-800 transition-all">
                Reset Inventory Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Velocity Uplink */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-3xl border border-white/20 p-24 lg:p-32 rounded-[5rem] shadow-glass"
            >
              <Activity className="w-24 h-24 mx-auto mb-16 text-primary" />
              <h2 className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
                Stay Ahead of <br /> <span className="text-primary italic">The Velocity Curve.</span>
              </h2>
              <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto mb-20 font-medium">
                Join thousands of architects and scaling experts who get our latest protocols and absolute strategies delivered to their terminal.
              </p>
              
              <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto mb-16">
                <Input
                  type="email" 
                  placeholder="Enter your professional uplink..."
                  className="flex-1 py-14 px-12 bg-white/10 border-white/20 focus:border-primary/60 rounded-full text-2xl text-white font-bold placeholder:text-slate-500"
                />
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-24 py-14 rounded-full text-2xl font-bold shadow-2xl transition-all duration-500 hover:scale-105">
                  Uplink Free
                  <Sparkles className="w-8 h-8 ml-6" />
                </Button>
              </div>
              
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                Need absolute implementation?{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  Secure a free orchestration call.
                </Link>
              </div>

              {/* Node Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32">
                {[
                  { icon: <BookOpen className="w-12 h-12" />, title: "Orchestration", desc: "Get personalized advice for your growth trajectory.", link: "/book-apartment", btn: "Book Call" },
                  { icon: <Code className="w-12 h-12" />, title: "Execution", desc: "We build your architecture, done-for-you.", link: "/contact", btn: "Get Intel" },
                  { icon: <GraduationCap className="w-12 h-12" />, title: "Community", desc: "Connect with fellow scaling architects globally.", link: "/contact", btn: "Join Uplink" }
                ].map((node, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -12 }}
                    className="p-12 bg-white/5 border border-white/10 rounded-[4rem] text-center group transition-all duration-500"
                  >
                    <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-10 text-white group-hover:bg-primary transition-all duration-500 shadow-xl">
                      {node.icon}
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-6">{node.title}</h3>
                    <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed">{node.desc}</p>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-8 font-black uppercase tracking-[0.3em] text-[10px]" asChild>
                      <Link to={node.link}>{node.btn}</Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tutorials;