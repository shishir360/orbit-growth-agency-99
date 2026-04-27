import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Sparkles, Target, Zap, Trophy, ChevronRight, Globe, Share2, Bookmark, Activity, ShieldCheck, Brain } from "lucide-react";
import DOMPurify from 'isomorphic-dompurify';
import { motion, AnimatePresence } from "framer-motion";

const TutorialPost = () => {
  const { slug } = useParams();

  // Mock tutorial data
  const tutorials = {
    "building-first-saas-mvp": {
      title: "Building Your First SaaS MVP: A Complete Guide",
      content: `
        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">The Architecture of Speed</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">Building a SaaS MVP doesn't have to take months. With the absolute logic and architecture, you can go from concept to first customers in just 30 days.</p>
        
        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">Node 1: Protocol Validation</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">Before initializing any logic, ensure there's absolute demand for your solution. Here's the validation trajectory:</p>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 2rem;">
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">01</span> Survey potential user nodes</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">02</span> Create a landing architecture to gauge velocity</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">03</span> Research competitor logic and market density</li>
        </ul>

        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">Node 2: Feature Matrix</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">Focus on the absolute core problem your SaaS solves. Your MVP should have exactly enough features to satisfy early users and provide telemetry for future scaling.</p>

        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">Node 3: The Tech Stack</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">For rapid architecture deployment, we recommend this stack:</p>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 2rem;">
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Frontend: React with Vite</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Backend: Supabase for database and auth</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Payments: Stripe Integration</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Hosting: Vercel for absolute velocity</li>
        </ul>

        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">The Conclusion</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">Building an MVP is about speed and validation. Get something functional initialized quickly, gather telemetry, and iterate based on real user requirements.</p>
      `,
      category: "SaaS Development",
      readTime: "15 min read",
      author: "LUNEXO MEDIA Team",
      difficulty: "Beginner",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
    },
    "membership-site-setup": {
      title: "Membership Site Setup: From Zero to Launch",
      content: `
        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">Planning Your Logic</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">A successful membership site starts with an absolute understanding of your audience and the visual logic you'll provide.</p>
        
        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">Content Tiers</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">Plan your content tiers and member benefits:</p>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 2rem;">
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">FREE</span> Basic architecture to attract users</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">PREMIUM</span> Exclusive logic and high-end features</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">ABSOLUTE</span> Direct uplink and premium custom perks</li>
        </ul>

        <h2 style="font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-top: 3rem; margin-bottom: 1.5rem;">The Infrastructure</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">Set up your membership architecture with these nodes:</p>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 2rem;">
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Memberstack for user orchestration</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Stripe for recurring revenue logic</li>
          <li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem; font-size: 1.125rem; color: #475569;"><span style="color: #FF719A; font-weight: bold;">+</span> Webflow for absolute content delivery</li>
        </ul>
      `,
      category: "Membership Sites",
      readTime: "12 min read",
      author: "LUNEXO MEDIA Team",
      difficulty: "Intermediate",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const tutorial = tutorials[slug as keyof typeof tutorials];

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <div className="container mx-auto px-6 py-40 text-center space-y-16 max-w-4xl">
          <div className="w-40 h-40 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] flex items-center justify-center mx-auto shadow-glass">
            <Brain className="w-20 h-20 text-slate-400" />
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight">Protocol Not Found.</h1>
            <p className="text-2xl text-slate-500 font-medium">The tutorial node you are looking for has been archived or does not exist.</p>
          </div>
          <Button asChild className="bg-slate-900 text-white rounded-full px-16 py-10 text-2xl font-bold shadow-2xl hover:bg-slate-800 transition-all">
            <Link to="/tutorials">Back to Inventory</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title={`${tutorial.title} | LUNEXO MEDIA Tutorials`}
        description={`Learn ${tutorial.title} - ${tutorial.category} tutorial with step-by-step instructions. Perfect for ${tutorial.difficulty.toLowerCase()} level learners.`}
        url={`https://www.lunexomedia.com/tutorials/${slug}`}
        image={tutorial.image || "https://www.lunexomedia.com/og-image-new.jpg"}
        type="article"
        keywords={`${tutorial.category}, ${tutorial.title}, tutorial, guide, ${tutorial.difficulty}, LUNEXO MEDIA`}
        author={tutorial.author}
      />
      <Navigation />
      
      {/* Article Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button variant="ghost" asChild className="text-slate-500 hover:text-primary p-0 h-auto font-black uppercase tracking-[0.4em] text-[10px] group">
                <Link to="/tutorials" className="flex items-center gap-4">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  Back to Intelligence
                </Link>
              </Button>
            </motion.div>
            
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-6"
              >
                <Badge variant="outline" className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-primary/30 text-primary">{tutorial.category}</Badge>
                <Badge className={`${getDifficultyColor(tutorial.difficulty)} px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border shadow-sm backdrop-blur-md`}>
                  {tutorial.difficulty}
                </Badge>
                <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] pl-6 border-l border-white/40">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" />
                    {tutorial.readTime}
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    {tutorial.author}
                  </div>
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
              >
                {tutorial.title}
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative aspect-video rounded-[5rem] overflow-hidden shadow-glass border border-white/60 bg-slate-900 group"
            >
              <img 
                src={tutorial.image} 
                alt={tutorial.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-32 h-32 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-700">
                  <Play className="w-12 h-12 text-slate-900 ml-2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-32 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 max-w-7xl mx-auto">
            {/* Article Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-8"
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 shadow-glass">
                <div 
                  className="prose prose-2xl max-w-none text-slate-500 font-medium"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(tutorial.content)
                  }}
                />
                
                <div className="pt-24 mt-24 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between gap-12">
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Share Intelligence:</span>
                    <div className="flex gap-4">
                      <Button variant="ghost" size="icon" className="w-16 h-16 rounded-[1.5rem] bg-white/40 border border-white/60 hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Share2 className="w-6 h-6" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-16 h-16 rounded-[1.5rem] bg-white/40 border border-white/60 hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Bookmark className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="outline" className="px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border-primary/20 text-slate-400">
                    NODE ID: {slug?.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-slate-900 rounded-[4rem] p-16 text-white shadow-glass sticky top-40"
              >
                <div className="space-y-12">
                  <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-heading font-bold leading-tight">Need Absolute Implementation?</h3>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed">
                    Our team can architect and launch your absolute project in 30 days or less.
                  </p>
                  <div className="space-y-6 pt-4">
                    <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100 text-xl py-10 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105" asChild>
                      <Link to="/contact">Book Orchestration</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-xl py-10 rounded-full font-bold transition-all duration-500" asChild>
                      <Link to="/portfolio">View Repository</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 shadow-glass"
              >
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-12">Related Nodes</h3>
                <div className="space-y-12">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex gap-6 group cursor-pointer">
                      <div className="w-24 h-24 bg-slate-900 rounded-3xl flex-shrink-0 overflow-hidden shadow-sm">
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">Absolute Automation Architectures for SaaS</h4>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                          <Clock className="w-3 h-3" />
                          12 MIN READ
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Final Sync */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Initialize Synchronization
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-9xl font-heading font-bold text-white leading-tight">
              Ready to <br /> <span className="text-primary italic">Synchronize Logic?</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl text-slate-300 font-body leading-relaxed max-w-4xl mx-auto">
              Discuss your project nodes and bring your absolute architecture to life with our expert intelligence team.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-10 justify-center pt-12">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Start Project
                  <ArrowRight className="w-8 h-8 ml-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-2xl px-16 py-10 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/tutorials">Explore Inventory</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TutorialPost;