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

      // Normalize path to match stored slug
      const rawPath = location.pathname;
      const normalizedSlug = rawPath.replace(/^\/+|\/+$/g, "");

      // Try without leading slash first
      let { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', normalizedSlug)
        .eq('visible', true)
        .maybeSingle();

      // Fallback: try with leading slash if not found
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

      // Add/remove landing-page class on body
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
          <div className="fixed inset-0 m-0 p-0">
            <iframe
              src={page.iframe_url}
              className="w-full h-full border-0 m-0 p-0"
              style={{ 
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              title={page.title}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
              loading="lazy"
            />
          </div>
        ) : page.html_file_url || page.content ? (
          <div
            className="min-h-screen m-0 p-0"
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
