import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (error || !page) {
    return (
      <>
        <SEO 
          title="Page Not Found"
          description="The requested page could not be found"
        />
        <Navigation />
        <main className="min-h-screen pt-20 px-4">
          <div className="max-w-7xl mx-auto py-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground">The page you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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

export default DynamicPage;
