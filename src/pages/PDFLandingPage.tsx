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
  const [formData, setFormData] = useState({ firstName: '', email: '', phone: '' });
  const [countryCode, setCountryCode] = useState('+880');

  useEffect(() => {
    fetchPageData();
    detectCountryCode();
  }, [slug]);

  const detectCountryCode = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const code = data.country_calling_code || '+880';
      setCountryCode(code);
    } catch (error) {
      console.log('Using default country code');
    }
  };

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
          phone: formData.phone,
          source: `landing-page-${slug}`,
        } as any]);

      if (leadError) throw leadError;

      // Get PDF document details
      const { data: pdfDoc, error: pdfError } = await supabase
        .from('pdf_documents')
        .select('file_url, title')
        .eq('id', pageData?.pdf_document_id)
        .single();

      if (pdfError) throw pdfError;

      // Send email with PDF
      const { error: emailError } = await supabase.functions.invoke('send-pdf-email', {
        body: {
          name: formData.firstName,
          email: formData.email,
          pdfUrl: pdfDoc.file_url,
          pdfTitle: pdfDoc.title,
        },
      });

      if (emailError) throw emailError;

      toast({
        title: 'Success!',
        description: 'Check your email for the free eBook!',
      });

      setShowPopup(false);
      setFormData({ firstName: '', email: '', phone: '' });
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
        keywords="keto recipes, free ebook, low carb, keto diet, healthy recipes"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pageData.main_headline,
          "description": pageData.hero_description || pageData.subheadline,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative overflow-hidden py-20 lg:py-32"
          style={{ backgroundColor: pageData.hero_bg_color }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Logo */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight">{pageData.logo_text}</h1>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Hero Image */}
                {pageData.hero_image_url && (
                  <div className="relative transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute -top-6 -left-6 bg-gradient-to-br from-green-400 to-emerald-600 px-6 py-3 rounded-full shadow-2xl font-black text-xl text-white z-10 animate-pulse">
                      FREE
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-3xl blur-2xl"></div>
                    <SafeImage
                      src={pageData.hero_image_url}
                      alt={pageData.main_headline}
                      className="w-full max-w-md mx-auto rounded-2xl shadow-2xl relative z-10"
                    />
                  </div>
                )}

                {/* Hero Content */}
                <div className="text-center lg:text-left space-y-8">
                  <h2 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                    {pageData.main_headline}
                  </h2>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                    {pageData.subheadline}
                  </p>
                  {pageData.hero_description && (
                    <p className="text-xl lg:text-2xl leading-relaxed text-gray-700 max-w-2xl">
                      {pageData.hero_description}
                    </p>
                  )}
                  <Button
                    size="lg"
                    className="text-xl px-12 py-8 font-black shadow-2xl hover:scale-110 transition-all duration-300 rounded-full border-4 border-black"
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
        <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center space-y-16">
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight">
                {pageData.mid_headline}
              </h2>

              {pageData.mid_description && (
                <p className="text-2xl lg:text-3xl max-w-4xl mx-auto font-semibold text-gray-700 leading-relaxed">
                  {pageData.mid_description}
                </p>
              )}

              {/* Images */}
              {(pageData.mid_image_1_url || pageData.mid_image_2_url || pageData.mid_image_3_url) && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-16">
                  {pageData.mid_image_1_url && (
                    <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                      <SafeImage
                        src={pageData.mid_image_1_url}
                        alt="Feature 1"
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  {pageData.mid_image_2_url && (
                    <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                      <SafeImage
                        src={pageData.mid_image_2_url}
                        alt="Feature 2"
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  {pageData.mid_image_3_url && (
                    <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                      <SafeImage
                        src={pageData.mid_image_3_url}
                        alt="Feature 3"
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>
              )}

              <Button
                size="lg"
                className="text-xl px-12 py-8 font-black shadow-2xl hover:scale-110 transition-all duration-300 rounded-full border-4 border-black"
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
          className="py-12 text-center border-t"
          style={{ backgroundColor: pageData.footer_bg_color }}
        >
          <p className="text-base text-gray-600 font-medium">{pageData.footer_text}</p>
        </footer>

        {/* Email Popup Modal */}
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 rounded-full opacity-70 hover:opacity-100 hover:bg-gray-100 p-2 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <DialogHeader>
              <DialogTitle className="text-3xl lg:text-4xl font-black text-center pt-4">
                {pageData.popup_title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <p className="text-center text-xl font-semibold text-gray-700">{pageData.popup_subtitle}</p>

              {pageData.hero_image_url && (
                <div className="relative max-w-xs mx-auto">
                  <div className="absolute -top-4 -left-4 bg-gradient-to-br from-green-400 to-emerald-600 px-5 py-2 rounded-full shadow-2xl font-black text-white z-10 animate-pulse">
                    FREE
                  </div>
                  <SafeImage
                    src={pageData.hero_image_url}
                    alt={pageData.main_headline}
                    className="w-full rounded-2xl shadow-xl"
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="text-lg py-7 border-2 border-gray-300 focus:border-yellow-400 rounded-xl font-medium"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="text-lg py-7 border-2 border-gray-300 focus:border-yellow-400 rounded-xl font-medium"
                />
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 text-lg py-7 border-2 border-gray-300 focus:border-yellow-400 rounded-xl font-bold text-center"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="flex-1 text-lg py-7 border-2 border-gray-300 focus:border-yellow-400 rounded-xl font-medium"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-xl py-7 font-black shadow-xl hover:scale-105 transition-all duration-300 rounded-xl border-3"
                  style={{
                    backgroundColor: pageData.popup_button_bg_color,
                    color: pageData.popup_button_text_color,
                  }}
                >
                  {submitting ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : null}
                  {pageData.popup_button_text}
                </Button>
              </form>

              <p className="text-sm text-center text-gray-600 font-medium">
                {pageData.privacy_text}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
