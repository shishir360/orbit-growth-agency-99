import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/ui/seo";
import { CheckCircle2, ArrowRight, Play } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-500">This landing page doesn't exist or has been disabled.</p>
        </div>
      </div>
    );
  }

  const accent = page.accent_color || "#ef4444";
  const youtubeId = page.video_url ? getYouTubeId(page.video_url) : null;
  const features = page.features || [];

  return (
    <>
      <SEO
        title={page.headline || page.title}
        description={page.description || page.subheadline || ""}
        url={`https://lunexomedia.com/promo/${page.slug}`}
      />

      <div className="min-h-screen" style={{ backgroundColor: page.bg_color || "#ffffff" }}>
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: accent }}>
              L
            </div>
            <span className="font-bold text-lg">Lunexo Media</span>
          </div>
          <a
            href={page.cta_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: accent }}
          >
            {page.cta_text}
          </a>
        </header>

        {/* Hero Section */}
        <section className="text-center px-6 pt-12 pb-8 max-w-4xl mx-auto">
          {page.badge_text && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 mb-8">
              {page.badge_text}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
            {page.headline.split(" ").map((word, i) => {
              // Highlight words in brackets like [AI]
              if (word.startsWith("[") && word.endsWith("]")) {
                return (
                  <span key={i} className="inline-block px-2 py-1 rounded-lg text-white mx-1" style={{ backgroundColor: "#1a1a2e" }}>
                    {word.slice(1, -1)}
                  </span>
                );
              }
              // Highlight words in curly braces like {Captions}
              if (word.startsWith("{") && word.endsWith("}")) {
                return (
                  <span key={i} className="inline-block px-3 py-1 rounded-lg text-white mx-1" style={{ backgroundColor: accent }}>
                    {word.slice(1, -1)}
                  </span>
                );
              }
              return <span key={i}>{word} </span>;
            })}
          </h1>

          {page.subheadline && (
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {page.subheadline}
            </h2>
          )}

          {page.description && (
            <p className="text-gray-500 text-lg mb-8">{page.description}</p>
          )}

          {/* CTA Button */}
          <a
            href={page.cta_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-xl shadow-lg"
            style={{ backgroundColor: accent }}
          >
            {page.cta_text}
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Features badges */}
          {features.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4" style={{ color: accent }} />
                  {f}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Video / Image Section */}
        {(youtubeId || page.video_url || page.hero_image_url) && (
          <section className="max-w-4xl mx-auto px-6 pb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 aspect-video bg-gray-900">
              {youtubeId ? (
                showVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                    className="w-full h-full absolute inset-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Product video"
                  />
                ) : (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="w-full h-full relative group cursor-pointer"
                  >
                    <img
                      src={page.video_thumbnail_url || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-gray-900 ml-1" />
                      </div>
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
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </section>
        )}

        {/* Social Proof */}
        {page.social_proof_text && (
          <section className="text-center py-12 px-6">
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {page.social_proof_text.split(" ").map((word, i) => {
                if (i > 0 && i < 3) {
                  return <em key={i} className="italic" style={{ color: accent }}>{word} </em>;
                }
                return <span key={i}>{word} </span>;
              })}
            </p>
            <div className="flex justify-center gap-1 mt-6">
              {["😎", "🤩", "😊", "🚀", "💪"].map((emoji, i) => (
                <span key={i} className="text-3xl">{emoji}</span>
              ))}
            </div>
          </section>
        )}

        {/* Second CTA */}
        <section className="text-center py-12 px-6">
          <div className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-600 mb-6">
            Limited time offer
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Start in 3 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            {[
              { icon: "📥", title: "Sign Up", desc: "Create your account in seconds" },
              { icon: "⚡", title: "Configure", desc: "Set up your AI agent with one click" },
              { icon: "🚀", title: "Launch", desc: "Go live and start automating" },
            ].map((step, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <a
            href={page.cta_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg mt-10 transition-all hover:scale-105 hover:shadow-xl shadow-lg"
            style={{ backgroundColor: accent }}
          >
            {page.cta_text}
            <ArrowRight className="w-5 h-5" />
          </a>
        </section>

        {/* Footer */}
        {page.footer_text && (
          <footer className="text-center py-8 px-6 border-t border-gray-100">
            <p className="text-sm text-gray-400">{page.footer_text}</p>
          </footer>
        )}
      </div>
    </>
  );
}
