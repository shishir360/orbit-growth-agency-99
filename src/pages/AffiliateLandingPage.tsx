import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/ui/seo";
import { CheckCircle2, ArrowRight, Play, Sparkles, ChevronRight, Zap, Target, Star, Globe, Trophy, Activity, Cpu, ShieldCheck, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AffiliatePageData {
  id: string;
  title: string;
  slug: string;
  headline: string;
  subheadline: string | null;
  description: string | null;
  badge_text: string | null;
  cta_text: string;
  cta_link: string;
  hero_image_url: string | null;
  video_url: string | null;
  video_thumbnail_url: string | null;
  features: string[] | null;
  social_proof_text: string | null;
  footer_text: string | null;
  bg_color: string | null;
  accent_color: string | null;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function AffiliateLandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<AffiliatePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data, error } = await supabase
          .from("affiliate_landing_pages")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .single();
        if (error) throw error;
        setPage(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Trajectory...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background font-body text-slate-900 overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
        </div>
        <div className="text-center space-y-12 p-16 lg:p-24 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] shadow-glass max-w-2xl mx-auto relative z-10">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <Globe className="w-12 h-12" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold tracking-tighter">Trajectory <span className="text-primary italic">Not Found.</span></h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed">This absolute scaling trajectory doesn't exist or has been archived in our repository.</p>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500">
            <Link to="/">Return to Base</Link>
          </Button>
        </div>
      </div>
    );
  }

  const youtubeId = page.video_url ? getYouTubeId(page.video_url) : null;
  const features = page.features || [];

  return (
    <>
      <SEO
        title={page.headline || page.title}
        description={page.description || page.subheadline || ""}
        url={`https://lunexomedia.com/promo/${page.slug}`}
      />

      <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden relative">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-8 lg:px-12">
            <Link to="/" className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center font-bold text-3xl shadow-2xl group-hover:bg-primary transition-all duration-700 hover:rotate-12">
                L
              </div>
              <span className="font-heading font-black text-3xl tracking-tighter hidden sm:block">Lunexo <span className="text-primary italic">Media.</span></span>
            </Link>
            <Button asChild className="bg-primary text-white hover:bg-primary/90 text-[10px] font-black uppercase tracking-[0.4em] px-12 py-8 rounded-full shadow-2xl transition-all duration-700 hover:scale-110">
              <a href={page.cta_link} target="_blank" rel="noopener noreferrer">
                {page.cta_text}
              </a>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-48 pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[5%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
            <div className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="text-center max-w-7xl mx-auto space-y-20">
              {page.badge_text && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                    <Sparkles className="w-5 h-5 mr-4" />
                    {page.badge_text}
                  </Badge>
                </motion.div>
              )}

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
              >
                {page.headline.split(" ").map((word, i) => {
                  if (word.startsWith("[") && word.endsWith("]")) {
                    return (
                      <span key={i} className="text-slate-900 italic relative inline-block">
                        {word.slice(1, -1)}
                        <span className="absolute bottom-6 left-0 w-full h-8 bg-primary/20 -z-10" />
                      </span>
                    );
                  }
                  if (word.startsWith("{") && word.endsWith("}")) {
                    return (
                      <span key={i} className="text-primary italic mx-4">
                        {word.slice(1, -1)}
                      </span>
                    );
                  }
                  return <span key={i}>{word} </span>;
                })}
              </motion.h1>

              {page.subheadline && (
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-4xl lg:text-6xl font-heading font-bold text-slate-800 tracking-tight"
                >
                  {page.subheadline}
                </motion.h2>
              )}

              {page.description && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
                >
                  {page.description}
                </motion.p>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="pt-12"
              >
                <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl group transition-all duration-700 hover:scale-105">
                  <a href={page.cta_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6">
                    {page.cta_text}
                    <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              {features.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap items-center justify-center gap-10 pt-20"
                >
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-5 text-xl text-slate-900 font-bold bg-white/40 backdrop-blur-xl border border-white/60 px-10 py-6 rounded-full shadow-glass hover:bg-white/60 transition-all duration-500">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                      {f}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Video / Image Section */}
        {(youtubeId || page.video_url || page.hero_image_url) && (
          <section className="py-40 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="container-wide section-padding">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="max-w-7xl mx-auto"
              >
                <div className="relative rounded-[5rem] overflow-hidden shadow-glass border border-white/60 aspect-video bg-slate-900 group">
                  {youtubeId ? (
                    showVideo ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                        className="w-full h-full absolute inset-0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="Absolute Growth video"
                      />
                    ) : (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="w-full h-full relative cursor-pointer"
                      >
                        <img
                          src={page.video_thumbnail_url || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                          alt="Absolute Video thumbnail"
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-700">
                            <Play className="w-14 h-14 text-slate-900 ml-2" />
                          </div>
                        </div>
                        <div className="absolute top-10 left-10 bg-primary text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-4 z-20">
                          <Activity className="w-5 h-5" />
                          Live Intel Node
                        </div>
                      </button>
                    )
                  ) : page.video_url ? (
                    <video
                      src={page.video_url}
                      controls
                      className="w-full h-full object-cover"
                      poster={page.video_thumbnail_url || undefined}
                    />
                  ) : page.hero_image_url ? (
                    <img
                      src={page.hero_image_url}
                      alt={page.headline}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                  ) : null}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Social Proof */}
        {page.social_proof_text && (
          <section className="py-48 bg-background relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="container-wide section-padding">
              <div className="max-w-6xl mx-auto text-center space-y-20">
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-5xl lg:text-[8rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter"
                >
                  {page.social_proof_text.split(" ").map((word, i) => {
                    if (i > 0 && i < 3) {
                      return <span key={i} className="text-primary italic mx-3">{word} </span>;
                    }
                    return <span key={i}>{word} </span>;
                  })}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center gap-12"
                >
                  {["😎", "🤩", "😊", "🚀", "💪"].map((emoji, i) => (
                    <span key={i} className="text-7xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{emoji}</span>
                  ))}
                </motion.div>
                <div className="flex items-center justify-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                   <ShieldCheck className="w-5 h-5 text-primary" /> Absolute Global Proof Protocol
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Steps Section */}
        <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
          <div className="container-wide section-padding">
            <div className="text-center mb-32 space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                  Limited Velocity Protocol
                </Badge>
              </motion.div>
              <h3 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 tracking-tighter">
                Start in 3 <span className="text-primary italic text-[13rem] lg:text-[15rem]">Absolute</span> Steps.
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
              {[
                { icon: <Database className="w-12 h-12" />, title: "Intel Sync", desc: "Initialize your architecture in sub-seconds with our absolute onboarding." },
                { icon: <Cpu className="w-12 h-12" />, title: "Logic Config", desc: "Configure your digital architecture with absolute precision and market logic." },
                { icon: <Trophy className="w-12 h-12" />, title: "Launch Path", desc: "Go live and dominate your digital market with absolute operational velocity." },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-20 text-center hover:shadow-glass transition-all duration-1000 group hover:translate-y-[-15px] h-full flex flex-col"
                >
                  <div className="w-28 h-28 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-2xl group-hover:bg-primary transition-all duration-700 hover:rotate-12">
                    {step.icon}
                  </div>
                  <h4 className="text-4xl font-heading font-bold text-slate-900 mb-8 tracking-tight">{step.title}</h4>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed flex-1">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center pt-32"
            >
              <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl group transition-all duration-700 hover:scale-110">
                <a href={page.cta_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6">
                  {page.cta_text}
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        {page.footer_text && (
          <footer className="py-24 text-center border-t border-white/60 bg-white/40 backdrop-blur-xl relative z-10">
            <div className="max-w-7xl mx-auto px-8">
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.5em] leading-relaxed max-w-4xl mx-auto">{page.footer_text}</p>
              <div className="mt-12 flex items-center justify-center gap-10 opacity-30">
                 <ShieldCheck className="w-6 h-6" />
                 <Cpu className="w-6 h-6" />
                 <Database className="w-6 h-6" />
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
