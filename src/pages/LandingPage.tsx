import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/ui/seo";
import DOMPurify from "isomorphic-dompurify";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRight, Zap, Sparkles, AlertCircle, Database, Layout, Activity, ShieldCheck } from "lucide-react";

interface PageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  iframe_url: string | null;
  html_file_url: string | null;
  visible: boolean;
}

export default function LandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("slug", slug)
          .eq("visible", true)
          .eq("is_landing_page", true)
          .single();

        if (error) throw error;
        setPage(data);
      } catch (error) {
        console.error("Error fetching landing page:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-10">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-6 text-center max-w-md px-10">
          <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Trajectory...</p>
          <div className="space-y-4">
             <Skeleton className="h-10 w-full bg-white/40 rounded-full" />
             <Skeleton className="h-6 w-3/4 mx-auto bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-10 overflow-hidden font-body text-slate-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-24 lg:p-32 shadow-glass text-center space-y-16 max-w-5xl relative z-10"
        >
          <div className="w-28 h-28 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
            <Layout className="w-14 h-14" />
          </div>
          <div className="space-y-8">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                Operational Error
              </Badge>
            </motion.div>
            <h1 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-tight tracking-tighter">Architecture <span className="text-primary italic">Not Found.</span></h1>
            <p className="text-3xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
              The absolute landing trajectory you are looking for has been archived or does not exist in our current operational repository.
            </p>
          </div>
          <Button asChild className="bg-slate-900 text-white px-20 py-12 rounded-full text-3xl font-bold shadow-2xl group transition-all duration-700 hover:scale-105">
            <Link to="/" className="flex items-center gap-6">
              Return to Core
              <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
            </Link>
          </Button>
          <div className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
             <ShieldCheck className="w-5 h-5 text-primary" /> Absolute Repository Integrity Verified.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden relative">
      <SEO
        title={`${page.title} | Absolute Landing Page | Lunexo Media`}
        description={`Absolute landing trajectory: ${page.title}`}
        url={`https://lunexomedia.com/${page.slug}`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen"
        >
          {page.iframe_url ? (
            <div className="w-full h-screen relative group">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-40 z-50" />
              <iframe
                src={page.iframe_url}
                className="w-full h-full border-0 relative z-10"
                title={page.title}
              />
            </div>
          ) : (
            <div className="relative">
              {/* If it's direct content, we wrap it in our premium layout context */}
              <div
                className="min-h-screen prose-container relative z-10"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(page.content) 
                }}
              />
              
              {/* Floating Action Button for Home if it's a long page */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="fixed bottom-12 right-12 z-[100]"
              >
                <Button size="icon" asChild className="w-24 h-24 rounded-full bg-slate-900 text-white shadow-2xl hover:scale-110 transition-all duration-700 group hover:bg-primary">
                  <Link to="/">
                    <Layout className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
