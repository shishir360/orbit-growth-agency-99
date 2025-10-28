import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/ui/seo";
import DOMPurify from "isomorphic-dompurify";

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
      <div className="min-h-screen p-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground">
            The landing page you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={page.title}
        description={`Landing page: ${page.title}`}
        url={`https://mydon.com/${page.slug}`}
      />

      {page.iframe_url ? (
        <iframe
          src={page.iframe_url}
          className="w-full h-screen border-0"
          title={page.title}
        />
      ) : (
        <div
          className="min-h-screen"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content) }}
        />
      )}
    </>
  );
}
