import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from './NotFound';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  iframe_url?: string | null;
  visible: boolean;
}

const CatchAllPage = () => {
  const location = useLocation();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      const path = location.pathname; // e.g. "/shishir"

      const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', path)
        .eq('visible', true)
        .maybeSingle();

      setPage(data ?? null);
      setLoading(false);
    };
    fetchPage();
  }, [location.pathname]);

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20 px-4">
          <div className="max-w-7xl mx-auto py-12 space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  return (
    <>
      <SEO 
        title={page.title}
        description={page.iframe_url ? `Visit ${page.title}` : page.content.substring(0, 160)}
        keywords={page.title}
      />
      <Navigation />
      <main className="pt-20">
        {page.iframe_url ? (
          <div className="w-full h-full">
            <iframe
              src={page.iframe_url}
              className="w-full border-0 block"
              style={{ 
                minHeight: 'calc(100vh - 80px - 320px)',
                height: 'calc(100vh - 80px - 320px)',
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
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap">{page.content}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CatchAllPage;
