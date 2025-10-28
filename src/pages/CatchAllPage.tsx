import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from './NotFound';
import DOMPurify from 'isomorphic-dompurify';

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

  // If it's a landing page, render without header/footer
  if (page.is_landing_page) {
    return (
      <>
        <SEO
          title={page.title}
          description={`Landing page: ${page.title}`}
          url={`https://www.lunexomedia.com${location.pathname}`}
        />

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
        ) : page.html_file_url || page.content ? (
          <div
            className="min-h-screen"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content) }}
          />
        ) : null}
      </>
    );
  }

  // Regular page with navigation and footer
  return (
    <>
      <SEO 
        title={page.title}
        description={page.iframe_url ? `Visit ${page.title}` : page.content.substring(0, 160)}
        keywords={page.title}
      />
      <Navigation />
      <main className={page.iframe_url ? "" : "pt-20"}>
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
