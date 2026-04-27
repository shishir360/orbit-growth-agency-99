import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from './NotFound';
import DOMPurify from 'isomorphic-dompurify';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layers, Sparkles, Database, Globe } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  iframe_url?: string | null;
  html_file_url?: string | null;
  visible: boolean;
  is_landing_page?: boolean;
}

const CatchAllPage = () => {
  const location = useLocation();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);

      const rawPath = location.pathname;
      const normalizedSlug = rawPath.replace(/^\/+|\/+$/g, "");

      let { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', normalizedSlug)
        .eq('visible', true)
        .maybeSingle();

      if (!data) {
        const altSlug = `/${normalizedSlug}`;
        const resp = await supabase
          .from('pages')
          .select('*')
          .eq('slug', altSlug)
          .eq('visible', true)
          .maybeSingle();
        data = resp.data ?? null;
      }

      setPage(data ?? null);
      setLoading(false);

      if (data?.is_landing_page) {
        document.body.classList.add('landing-page');
      } else {
        document.body.classList.remove('landing-page');
      }
    };
    fetchPage();

    return () => {
      document.body.classList.remove('landing-page');
    };
  }, [location.pathname]);

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

  if (!page) {
    return <NotFound />;
  }

  if (page.is_landing_page) {
    return (
      <div className="min-h-screen bg-background overflow-hidden">
        <SEO
          title={page.title}
          description={`Landing page: ${page.title}`}
          url={`https://www.lunexomedia.com${location.pathname}`}
        />

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {page.iframe_url ? (
              <div className="fixed inset-0 m-0 p-0 z-50 bg-white">
                <iframe
                  src={page.iframe_url}
                  className="w-full h-full border-0 m-0 p-0"
                  style={{ display: 'block' }}
                  title={page.title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className="min-h-screen m-0 p-0"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content) }}
              />
            )}
          </motion.div>
        </AnimatePresence>
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

export default CatchAllPage;
