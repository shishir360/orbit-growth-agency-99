import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, ArrowRight, Zap, Database, Globe, ArrowLeft, Layout } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  iframe_url?: string | null;
  visible: boolean;
}

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(false);

      const { data, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', `/${slug}`)
        .eq('visible', true)
        .maybeSingle();

      if (fetchError || !data) {
        setError(true);
      } else {
        setPage(data);
      }
      
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-8">
        <Navigation />
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-4 text-center max-w-md px-6">
          <Skeleton className="h-12 w-full bg-white/40 rounded-full" />
          <Skeleton className="h-6 w-3/4 mx-auto bg-white/40 rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
        <SEO 
          title="Architecture Not Found"
          description="The requested digital architecture could not be located."
        />
        <Navigation />
        
        <main className="relative pt-32 pb-32 flex items-center justify-center min-h-[70vh]">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 shadow-glass text-center space-y-12 max-w-4xl relative z-10"
          >
            <div className="w-24 h-24 bg-white/60 border border-white/60 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm text-slate-400">
              <Database className="w-12 h-12" />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight">Node <span className="text-primary italic">Not Found</span></h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
                The digital architecture node you are looking for has been archived or does not exist in our current repository.
              </p>
            </div>
            <Button asChild className="bg-primary text-white px-16 py-10 rounded-full text-xl font-bold shadow-glass group">
              <Link to="/">
                Return to Core
                <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO 
        title={`${page.title} | LUNEXO MEDIA`}
        description={page.iframe_url ? `Visit ${page.title}` : page.content.substring(0, 160)}
        keywords={page.title}
      />
      <Navigation />
      
      <main className={page.iframe_url ? "pt-0" : "pt-32 pb-32"}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {page.iframe_url ? (
              <div className="w-full">
                <iframe
                  src={page.iframe_url}
                  className="w-full border-0 block"
                  style={{ 
                    minHeight: '100vh',
                    height: '200vh',
                    display: 'block',
                    margin: 0,
                    padding: 0
                  }}
                  title={page.title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="container-wide section-padding">
                <div className="max-w-6xl mx-auto space-y-16">
                  <div className="space-y-8">
                    <Button variant="ghost" asChild className="text-slate-500 hover:text-primary p-0 h-auto font-black uppercase tracking-widest text-[10px] group">
                      <Link to="/" className="flex items-center gap-3">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Core
                      </Link>
                    </Button>
                    <h1 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight">{page.title}</h1>
                  </div>

                  <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 shadow-glass">
                    <div className="prose prose-2xl max-w-none text-slate-600 font-medium leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content) }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default DynamicPage;
