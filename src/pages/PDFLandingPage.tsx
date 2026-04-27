import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Loader2, Sparkles, ArrowRight, CheckCircle2, Shield, Globe, Target, Zap, Trophy, Activity, Cpu, ShieldCheck, Database } from 'lucide-react';
import SEO from '@/components/ui/seo';
import SafeImage from '@/components/ui/safe-image';
import { getVisitorLocation, trackVisitorActivity } from '@/utils/visitorTracking';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

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
        description: 'Absolute landing trajectory not found',
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
      const locationData = await getVisitorLocation();

      const { data: leadData, error: leadError } = await supabase
        .from('pdf_leads')
        .insert([{
          pdf_document_id: pageData?.pdf_document_id,
          name: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          visitor_ip: locationData?.ip,
          visitor_country: locationData?.country,
          visitor_city: locationData?.city,
          source: `landing-page-${slug}`,
        } as any])
        .select()
        .single();

      if (leadError) throw leadError;

      const { data: pdfDoc, error: pdfError } = await supabase
        .from('pdf_documents')
        .select('file_url, title')
        .eq('id', pageData?.pdf_document_id)
        .single();

      if (pdfError) throw pdfError;

      const { error: emailError } = await supabase.functions.invoke('send-pdf-email', {
        body: {
          name: formData.firstName,
          email: formData.email,
          pdfUrl: pdfDoc.file_url,
          pdfTitle: pdfDoc.title,
        },
      });

      if (emailError) throw emailError;

      await trackVisitorActivity({
        activity_type: 'pdf_download',
        related_id: leadData?.id,
        metadata: {
          pdf_title: pdfDoc.title,
          name: formData.firstName,
        },
      });

      toast({
        title: 'Success!',
        description: 'Check your communication uplink for the absolute intel eBook!',
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Trajectory...</p>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background font-body text-slate-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
        </div>
        <div className="text-center space-y-12 p-16 lg:p-24 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] shadow-glass max-w-2xl mx-auto relative z-10">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <Globe className="w-12 h-12" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold tracking-tighter">Architecture <span className="text-primary italic">Not Found.</span></h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed">This absolute scaling trajectory doesn't exist or has been archived in our repository.</p>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-16 py-10 rounded-full font-bold shadow-2xl transition-all duration-500">
            <Link to="/">Return to Base</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={pageData.main_headline}
        description={pageData.hero_description || pageData.subheadline}
        keywords="free ebook, professional guide, premium architecture, digital growth"
        type="website"
      />

      <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden relative">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-8 lg:px-12">
            <Link to="/" className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center font-bold text-3xl shadow-2xl group-hover:bg-primary transition-all duration-700 hover:rotate-12">
                L
              </div>
              <span className="font-heading font-black text-3xl tracking-tighter uppercase tracking-[0.2em]">{pageData.logo_text}</span>
            </Link>
            <Button 
              onClick={() => setShowPopup(true)}
              className="bg-primary text-white hover:bg-primary/90 text-[10px] font-black uppercase tracking-[0.4em] px-12 py-8 rounded-full shadow-2xl transition-all duration-700 hover:scale-110"
            >
              {pageData.hero_cta_text}
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-48 pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[5%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
            <div className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-32 items-center max-w-7xl mx-auto">
              {/* Hero Image / Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative order-2 lg:order-1"
              >
                <div className="absolute -inset-16 bg-primary/10 rounded-full blur-[140px] animate-pulse" />
                <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[5rem] shadow-glass group overflow-hidden">
                  <div className="absolute top-10 left-10 bg-primary text-white px-12 py-5 rounded-full font-black text-3xl shadow-2xl animate-bounce z-20">
                    FREE INTEL
                  </div>
                  <SafeImage
                    src={pageData.hero_image_url}
                    alt={pageData.main_headline}
                    className="w-full h-auto rounded-[4rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute bottom-10 right-10 bg-slate-900 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-4 z-20">
                    <ShieldCheck className="w-5 h-5" />
                    Absolute Asset
                  </div>
                </div>
              </motion.div>

              {/* Hero Content */}
              <div className="space-y-16 order-1 lg:order-2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                    <Sparkles className="w-5 h-5 mr-4" />
                    Absolute Intelligence Guide
                  </Badge>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="text-6xl sm:text-7xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
                >
                  {pageData.main_headline}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-4xl lg:text-5xl font-heading font-bold text-primary italic leading-tight"
                >
                  {pageData.subheadline}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-3xl text-slate-500 font-medium leading-relaxed max-w-4xl mx-auto lg:mx-0"
                >
                  {pageData.hero_description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="pt-12"
                >
                  <Button
                    size="lg"
                    className="bg-slate-900 text-white hover:bg-slate-800 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl group transition-all duration-700 hover:scale-110"
                    onClick={() => setShowPopup(true)}
                  >
                    {pageData.hero_cta_text}
                    <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                  </Button>
                </motion.div>
                
                <div className="flex items-center justify-center lg:justify-start gap-10 opacity-30 pt-8">
                   <Activity className="w-8 h-8" />
                   <Cpu className="w-8 h-8" />
                   <Database className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid Section */}
        <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="container-wide section-padding">
            <div className="max-w-7xl mx-auto text-center space-y-24">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter"
              >
                {pageData.mid_headline}
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-3xl lg:text-4xl max-w-5xl mx-auto font-medium text-slate-500 leading-relaxed"
              >
                {pageData.mid_description}
              </motion.p>

              {/* Feature Images */}
              {(pageData.mid_image_1_url || pageData.mid_image_2_url || pageData.mid_image_3_url) && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 my-32">
                  {[pageData.mid_image_1_url, pageData.mid_image_2_url, pageData.mid_image_3_url].filter(Boolean).map((img, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="group relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[5rem] shadow-glass hover:translate-y-[-20px] transition-all duration-1000"
                    >
                      <SafeImage
                        src={img}
                        alt={`Feature Architecture ${i + 1}`}
                        className="w-full h-[500px] object-cover rounded-[4rem] group-hover:scale-105 transition-transform duration-1000 shadow-2xl grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute top-10 left-10 bg-primary/20 backdrop-blur-xl border border-white/40 text-primary px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        Module 0{i + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="pt-12"
              >
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl group transition-all duration-500 hover:scale-110"
                  onClick={() => setShowPopup(true)}
                >
                  {pageData.mid_cta_text}
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 text-center border-t border-white/60 bg-white/40 backdrop-blur-xl relative z-10">
          <div className="max-w-7xl mx-auto px-10">
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.5em] leading-relaxed max-w-5xl mx-auto">{pageData.footer_text}</p>
            <div className="mt-16 flex items-center justify-center gap-12 text-slate-300">
               <ShieldCheck className="w-6 h-6" />
               <Cpu className="w-6 h-6" />
               <Database className="w-6 h-6" />
            </div>
          </div>
        </footer>

        {/* Email Popup Modal */}
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="sm:max-w-3xl bg-white/95 backdrop-blur-3xl border border-white/60 rounded-[5rem] shadow-glass p-0 overflow-hidden font-body text-slate-900">
            <div className="bg-slate-900 p-20 text-center space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32" />
              <DialogHeader>
                <DialogTitle className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight tracking-tighter">
                  {pageData.popup_title}
                </DialogTitle>
              </DialogHeader>
              <p className="text-2xl text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">{pageData.popup_subtitle}</p>
            </div>

            <div className="p-20 lg:p-32 space-y-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-10">Identity Node</label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="h-24 text-3xl bg-white/60 border-white/80 border-2 focus:border-primary rounded-full font-bold px-12 shadow-sm transition-all duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-10">Communication Uplink</label>
                  <Input
                    type="email"
                    placeholder="Enter your professional email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-24 text-3xl bg-white/60 border-white/80 border-2 focus:border-primary rounded-full font-bold px-12 shadow-sm transition-all duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-10">Direct Link Protocol</label>
                  <div className="flex gap-8">
                    <Input
                      type="text"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-40 h-24 text-3xl bg-white/60 border-white/80 border-2 focus:border-primary rounded-full font-black text-center shadow-sm"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="flex-1 h-24 text-3xl bg-white/60 border-white/80 border-2 focus:border-primary rounded-full font-bold px-12 shadow-sm"
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-28 text-4xl bg-primary text-white hover:bg-primary/90 font-black shadow-2xl rounded-full mt-8 transition-all duration-700 hover:scale-105 group"
                >
                  {submitting ? <Loader2 className="h-10 w-10 animate-spin" /> : <Trophy className="h-10 w-10 mr-8 group-hover:rotate-12 transition-transform" />}
                  {pageData.popup_button_text}
                </Button>
              </form>

              <div className="flex items-center justify-center gap-6 text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] pt-8">
                <ShieldCheck className="w-5 h-5" />
                <span>{pageData.privacy_text}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
