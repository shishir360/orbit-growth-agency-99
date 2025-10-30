import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Loader2 } from 'lucide-react';
import SEO from '@/components/ui/seo';
import SafeImage from '@/components/ui/safe-image';

interface PDFLandingPageData {
  id: string;
  slug: string;
  logo_text: string;
  hero_bg_color: string;
  main_headline: string;
  subheadline: string;
  hero_description: string;
  hero_image_url: string;
  conversion_rate: string;
  conversion_badge_color: string;
  hero_cta_text: string;
  hero_cta_bg_color: string;
  hero_cta_text_color: string;
  popup_title: string;
  popup_subtitle: string;
  popup_button_text: string;
  popup_button_bg_color: string;
  popup_button_text_color: string;
  privacy_text: string;
  mid_headline: string;
  mid_description: string;
  mid_cta_text: string;
  mid_cta_bg_color: string;
  mid_cta_text_color: string;
  mid_image_1_url: string;
  mid_image_2_url: string;
  mid_image_3_url: string;
  pdf_document_id: string;
  footer_bg_color: string;
  footer_text: string;
}

export default function PDFLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pageData, setPageData] = useState<PDFLandingPageData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', email: '' });

  useEffect(() => {
    fetchPageData();
  }, [slug]);

  const fetchPageData = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_landing_pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setPageData(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Landing page not found',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save lead to database
      const { error: leadError } = await supabase
        .from('pdf_leads')
        .insert([{
          pdf_document_id: pageData?.pdf_document_id,
          name: formData.firstName,
          email: formData.email,
          source: `landing-page-${slug}`,
        } as any]);

      if (leadError) throw leadError;

      toast({
        title: 'Success!',
        description: 'Check your email for the free eBook!',
      });

      setShowPopup(false);
      setFormData({ firstName: '', email: '' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Landing page not found</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={pageData.main_headline}
        description={pageData.hero_description || pageData.subheadline}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative overflow-hidden py-16 lg:py-20"
          style={{ backgroundColor: pageData.hero_bg_color }}
        >
          {/* Conversion Badge */}
          {pageData.conversion_rate && (
            <div 
              className="absolute top-8 right-8 px-6 py-4 rounded-full text-white shadow-lg z-10"
              style={{ backgroundColor: pageData.conversion_badge_color }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</div>
              <div className="text-4xl font-bold">{pageData.conversion_rate}</div>
            </div>
          )}

          <div className="container mx-auto px-4">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">{pageData.logo_text}</h1>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Hero Image */}
                {pageData.hero_image_url && (
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 bg-white px-4 py-2 rounded-full shadow-lg font-bold text-lg">
                      FREE
                    </div>
                    <SafeImage
                      src={pageData.hero_image_url}
                      alt={pageData.main_headline}
                      className="w-full max-w-md mx-auto"
                    />
                  </div>
                )}

                {/* Hero Content */}
                <div className="text-center lg:text-left space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    {pageData.main_headline}
                  </h2>
                  <p className="text-2xl font-semibold">
                    {pageData.subheadline}
                  </p>
                  {pageData.hero_description && (
                    <p className="text-lg leading-relaxed">
                      {pageData.hero_description}
                    </p>
                  )}
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 font-bold shadow-lg hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: pageData.hero_cta_bg_color,
                      color: pageData.hero_cta_text_color,
                    }}
                    onClick={() => setShowPopup(true)}
                  >
                    👉 {pageData.hero_cta_text}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center space-y-12">
              <h2 className="text-4xl lg:text-5xl font-bold">
                {pageData.mid_headline}
              </h2>

              {pageData.mid_description && (
                <p className="text-xl max-w-3xl mx-auto">
                  {pageData.mid_description}
                </p>
              )}

              {/* Images */}
              {(pageData.mid_image_1_url || pageData.mid_image_2_url || pageData.mid_image_3_url) && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                  {pageData.mid_image_1_url && (
                    <SafeImage
                      src={pageData.mid_image_1_url}
                      alt="Feature 1"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  )}
                  {pageData.mid_image_2_url && (
                    <SafeImage
                      src={pageData.mid_image_2_url}
                      alt="Feature 2"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  )}
                  {pageData.mid_image_3_url && (
                    <SafeImage
                      src={pageData.mid_image_3_url}
                      alt="Feature 3"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  )}
                </div>
              )}

              <Button
                size="lg"
                className="text-lg px-8 py-6 font-bold shadow-lg hover:scale-105 transition-transform"
                style={{
                  backgroundColor: pageData.mid_cta_bg_color,
                  color: pageData.mid_cta_text_color,
                }}
                onClick={() => setShowPopup(true)}
              >
                {pageData.mid_cta_text}
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-8 text-center"
          style={{ backgroundColor: pageData.footer_bg_color }}
        >
          <p className="text-sm text-gray-600">{pageData.footer_text}</p>
        </footer>

        {/* Email Popup Modal */}
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="sm:max-w-md">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>

            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {pageData.popup_title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <p className="text-center text-lg">{pageData.popup_subtitle}</p>

              {pageData.hero_image_url && (
                <div className="relative max-w-xs mx-auto">
                  <div className="absolute -top-4 -left-4 bg-yellow-400 px-4 py-2 rounded-full shadow-lg font-bold">
                    FREE
                  </div>
                  <SafeImage
                    src={pageData.hero_image_url}
                    alt={pageData.main_headline}
                    className="w-full"
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="text-lg py-6"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="text-lg py-6"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-lg py-6 font-bold"
                  style={{
                    backgroundColor: pageData.popup_button_bg_color,
                    color: pageData.popup_button_text_color,
                  }}
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  {pageData.popup_button_text}
                </Button>
              </form>

              <p className="text-xs text-center text-gray-600">
                {pageData.privacy_text}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
