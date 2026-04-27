import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, FileText, CheckCircle, Sparkles, Database, ShieldCheck, Globe, ArrowRight, Zap, Trophy, Target, Clock, ArrowLeft, Activity, Cpu } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/ui/seo';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { motion, AnimatePresence } from 'framer-motion';

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pdf, setPdf] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPDF();
  }, [slug]);

  const fetchPDF = async () => {
    if (!slug) return;
    
    try {
      const { data, error } = await supabase
        .from('pdf_documents')
        .select('*')
        .eq('slug', slug)
        .eq('visible', true)
        .single();

      if (error) throw error;
      setPdf(data);
    } catch (error: any) {
      console.error('Error fetching PDF:', error);
      toast.error('Absolute Intel not found in repository.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('pdf_access_requests')
        .insert({
          pdf_id: pdf.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success('Access Granted. Intelligence synchronized.');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Sync failed. Re-establish uplink.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (pdf?.file_url) {
      window.open(pdf.file_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-8">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Intel Repository...</p>
      </div>
    );
  }

  if (!pdf) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO 
        title={`${pdf.title} | Absolute Intelligence Node | Lunexo Media`}
        description={pdf.description || `Download our comprehensive guide: ${pdf.title}. Free resource from Lunexo Media.`}
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url={`https://www.lunexomedia.com/guide/${slug}`}
        keywords={`${pdf.title}, free download, guide, PDF, Lunexo Media`}
      />
      
      <Navigation />

      <main className="relative pt-32 pb-32">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="max-w-6xl mx-auto space-y-16">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 rounded-full px-10 py-8 font-black uppercase tracking-[0.4em] text-[10px] border border-primary/20 backdrop-blur-xl group">
                <Link to="/tutorials" className="flex items-center gap-4">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-3 transition-transform" />
                  Return to Intelligence
                </Link>
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] overflow-hidden shadow-glass"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Visual Side */}
                    <div className="bg-slate-900 p-20 flex flex-col justify-between text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                      
                      <div className="space-y-16 relative z-10">
                        <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                          Absolute Protocol
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tighter">
                          {pdf.title}
                        </h1>
                        <p className="text-2xl text-slate-400 font-medium leading-relaxed">
                          {pdf.description || "Access the complete digital architecture and logic breakdown for absolute market dominance."}
                        </p>
                      </div>

                      <div className="space-y-10 pt-16 relative z-10 border-t border-white/10 mt-16">
                        <div className="flex items-center gap-6 text-xl font-bold text-slate-300">
                          <ShieldCheck className="w-8 h-8 text-primary" />
                          Encrypted Data Sync
                        </div>
                        <div className="flex items-center gap-6 text-xl font-bold text-slate-300">
                          <Globe className="w-8 h-8 text-primary" />
                          Global Node Access
                        </div>
                        <div className="flex items-center gap-6 text-xl font-bold text-slate-300">
                          <Activity className="w-8 h-8 text-primary" />
                          Real-time Telemetry
                        </div>
                      </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-20 lg:p-32 space-y-16 bg-white/40">
                      <div className="space-y-8">
                        <h2 className="text-5xl lg:text-6xl font-heading font-bold text-slate-900 tracking-tighter">Synchronize <span className="text-primary italic">Identity.</span></h2>
                        <p className="text-2xl text-slate-500 font-medium leading-relaxed">Verify your operational credentials to initialize the intelligence download protocol.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="space-y-10">
                          <div className="space-y-4">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Full Architecture Name *</Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder="e.g. John Matrix"
                              className="bg-white/60 border-white/80 h-20 rounded-full px-10 font-bold text-2xl text-slate-900 focus:ring-primary shadow-sm"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-4">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Email Destination *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="e.g. protocol@node.com"
                              className="bg-white/60 border-white/80 h-20 rounded-full px-10 font-bold text-2xl text-slate-900 focus:ring-primary shadow-sm"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-4">
                              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Phone Uplink</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (000) 000-0000"
                                className="bg-white/60 border-white/80 h-20 rounded-full px-10 font-bold text-2xl text-slate-900 focus:ring-primary shadow-sm"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                            </div>
                            <div className="space-y-4">
                              <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Company Node</Label>
                              <Input
                                id="company"
                                type="text"
                                placeholder="Organization Name"
                                className="bg-white/60 border-white/80 h-20 rounded-full px-10 font-bold text-2xl text-slate-900 focus:ring-primary shadow-sm"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-slate-900 text-white h-24 rounded-full font-bold text-3xl shadow-2xl group transition-all duration-700 hover:scale-105" 
                          disabled={isSubmitting}
                        >
                          <span className="flex items-center justify-center gap-6">
                            {isSubmitting ? (
                              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <Sparkles className="w-8 h-8" />
                            )}
                            {isSubmitting ? 'Synchronizing...' : 'Initialize Access'}
                            {!isSubmitting && <ArrowRight className="w-8 h-8 group-hover:translate-x-5 transition-transform" />}
                          </span>
                        </Button>

                        <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-[0.5em] leading-relaxed">
                          By initializing, you agree to receive absolute logic communications and intelligence updates.
                        </p>
                      </form>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-20 lg:p-32 shadow-glass text-center space-y-20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                  
                  <div className="space-y-12">
                    <div className="w-32 h-32 bg-primary text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl group-hover:rotate-12 transition-transform duration-700">
                      <CheckCircle className="w-16 h-16" />
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-6xl lg:text-9xl font-heading font-bold text-slate-900 leading-tight tracking-tighter">Access <span className="text-primary italic">Granted.</span></h2>
                      <p className="text-3xl text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">Your identity has been verified by the absolute protocol. The intelligence node is now ready for deployment.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    <Button 
                      onClick={handleDownload}
                      className="bg-primary text-white h-28 rounded-[3rem] text-3xl font-bold shadow-2xl group hover:scale-110 transition-all duration-700"
                    >
                      <Download className="mr-6 h-10 w-10 group-hover:translate-y-2 transition-transform" />
                      Download Intel
                    </Button>

                    <Button 
                      onClick={() => window.open(pdf.file_url, '_blank')}
                      variant="outline"
                      className="border-2 border-white/60 bg-white/40 backdrop-blur-xl h-28 rounded-[3rem] text-3xl font-bold text-slate-900 hover:bg-white/60 transition-all duration-700"
                    >
                      <FileText className="mr-6 h-10 w-10" />
                      Inspect Node
                    </Button>
                  </div>

                  {pdf.file_url && (
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="mt-20 border-2 border-white/60 rounded-[4rem] overflow-hidden bg-white/40 shadow-glass relative group" 
                      style={{ height: '800px' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-60 z-50" />
                      <iframe
                        src={pdf.file_url}
                        className="w-full h-full relative z-10"
                        title={pdf.title}
                      />
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                         <Cpu className="w-5 h-5 inline mr-3" /> Absolute Intel Rendering
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="pt-20 border-t border-white/60">
                    <Button variant="ghost" asChild className="text-slate-500 hover:text-primary font-black uppercase tracking-[0.4em] text-xs">
                      <Link to="/tutorials" className="flex items-center gap-4">
                        Explore More Intelligence Nodes <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuidePage;
