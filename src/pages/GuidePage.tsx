import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/ui/seo';

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
      toast.error('PDF not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead data
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
      toast.success('Thank you! You can now access the PDF.');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit. Please try again.');
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pdf) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO 
        title={`${pdf.title} - Free Download | Lunexo Media`}
        description={pdf.description || `Download our comprehensive guide: ${pdf.title}. Free resource from Lunexo Media.`}
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url={`https://www.lunexomedia.com/guide/${slug}`}
        keywords={`${pdf.title}, free download, guide, PDF, Lunexo Media`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {!submitted ? (
            <Card className="shadow-2xl">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">{pdf.title}</CardTitle>
                {pdf.description && (
                  <CardDescription className="text-lg">
                    {pdf.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <div className="bg-muted/30 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-center">
                    Fill in your details to access this guide
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Get Instant Access'}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting this form, you agree to receive communications from us.
                    </p>
                  </form>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-2xl">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
                <CardDescription className="text-lg">
                  Your information has been received. You can now access the PDF.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Alert>
                  <Download className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{pdf.title}</strong> is ready for download or viewing.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleDownload}
                    className="flex-1"
                    size="lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>

                  <Button 
                    onClick={() => window.open(pdf.file_url, '_blank')}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    View Online
                  </Button>
                </div>

                {pdf.file_url && (
                  <div className="mt-8 border rounded-lg overflow-hidden" style={{ height: '600px' }}>
                    <iframe
                      src={pdf.file_url}
                      className="w-full h-full"
                      title={pdf.title}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default GuidePage;
