import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, Eye, Plus, Trash2 } from 'lucide-react';

interface PDFLandingPage {
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
  is_active: boolean;
}

interface PDFDocument {
  id: string;
  title: string;
}

export default function AdminPDFLandingPages() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [landingPages, setLandingPages] = useState<PDFLandingPage[]>([]);
  const [pdfDocuments, setPdfDocuments] = useState<PDFDocument[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PDFLandingPage>>({
    slug: '',
    logo_text: 'Hip2Keto',
    hero_bg_color: '#FFD84D',
    main_headline: '20 Crave-worthy Keto Recipes',
    subheadline: 'Think going keto is hard? Think again.',
    hero_description: 'Meet your low-carb fat-burning goals with this collection of our 20 most popular family-friendly keto recipes that are both EASY to make and DELICIOUS.',
    hero_cta_text: 'Get the Free eBook',
    hero_cta_bg_color: '#ffffff',
    hero_cta_text_color: '#000000',
    popup_title: 'Ready to get your keto on?',
    popup_subtitle: 'Get these delicious recipes sent to your inbox.',
    popup_button_text: 'SEND ME THE EBOOK',
    popup_button_bg_color: '#FFD84D',
    popup_button_text_color: '#000000',
    privacy_text: 'We hate SPAM and promise to keep your email address safe.',
    mid_headline: 'Yes, you can still eat pizza!',
    mid_description: 'Enjoy keto pizza, keto cookies, keto tacos—and other keto favorites! With these recipes, you won\'t miss the carbs!',
    mid_cta_text: 'Get My Free Cookbook',
    mid_cta_bg_color: '#FFD84D',
    mid_cta_text_color: '#000000',
    footer_bg_color: '#f3f4f6',
    footer_text: '© 2025 All rights reserved.',
    is_active: true,
  });

  useEffect(() => {
    fetchLandingPages();
    fetchPDFDocuments();
  }, []);

  const fetchLandingPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_landing_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLandingPages(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const fetchPDFDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_documents')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setPdfDocuments(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    if (!formData.slug) {
      toast({
        title: 'Error',
        description: 'Slug is required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      if (selectedPage) {
        const { error } = await supabase
          .from('pdf_landing_pages')
          .update(formData)
          .eq('id', selectedPage);

        if (error) throw error;
        toast({ title: 'Landing page updated successfully!' });
      } else {
        const { error } = await supabase
          .from('pdf_landing_pages')
          .insert([formData as any]);

        if (error) throw error;
        toast({ title: 'Landing page created successfully!' });
      }

      fetchLandingPages();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: PDFLandingPage) => {
    setSelectedPage(page.id);
    setFormData(page);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this landing page?')) return;

    try {
      const { error } = await supabase
        .from('pdf_landing_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Landing page deleted successfully!' });
      fetchLandingPages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setSelectedPage(null);
    setFormData({
      slug: '',
      logo_text: 'Hip2Keto',
      hero_bg_color: '#FFD84D',
      main_headline: '20 Crave-worthy Keto Recipes',
      subheadline: 'Think going keto is hard? Think again.',
      hero_description: 'Meet your low-carb fat-burning goals with this collection of our 20 most popular family-friendly keto recipes that are both EASY to make and DELICIOUS.',
      hero_cta_text: 'Get the Free eBook',
      hero_cta_bg_color: '#ffffff',
      hero_cta_text_color: '#000000',
      popup_title: 'Ready to get your keto on?',
      popup_subtitle: 'Get these delicious recipes sent to your inbox.',
      popup_button_text: 'SEND ME THE EBOOK',
      popup_button_bg_color: '#FFD84D',
      popup_button_text_color: '#000000',
      privacy_text: 'We hate SPAM and promise to keep your email address safe.',
      mid_headline: 'Yes, you can still eat pizza!',
      mid_description: 'Enjoy keto pizza, keto cookies, keto tacos—and other keto favorites! With these recipes, you won\'t miss the carbs!',
      mid_cta_text: 'Get My Free Cookbook',
      mid_cta_bg_color: '#FFD84D',
      mid_cta_text_color: '#000000',
      footer_bg_color: '#f3f4f6',
      footer_text: '© 2025 All rights reserved.',
      is_active: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">PDF Landing Pages</h2>
          <p className="text-muted-foreground">Create high-converting landing pages for your PDF eBooks</p>
        </div>
        {selectedPage && (
          <Button onClick={resetForm} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        )}
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="list">All Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedPage ? 'Edit' : 'Create'} Landing Page</CardTitle>
              <CardDescription>Design your high-converting PDF landing page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="keto-recipes"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="pdf">PDF Document *</Label>
                    <Select
                      value={formData.pdf_document_id}
                      onValueChange={(value) => setFormData({ ...formData, pdf_document_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select PDF Document" />
                      </SelectTrigger>
                      <SelectContent>
                        {pdfDocuments.map((doc) => (
                          <SelectItem key={doc.id} value={doc.id}>
                            {doc.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload PDFs in the "PDF Documents" section first
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="logo_text">Logo Text</Label>
                    <Input
                      id="logo_text"
                      value={formData.logo_text}
                      onChange={(e) => setFormData({ ...formData, logo_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero_bg_color">Background Color</Label>
                    <Input
                      id="hero_bg_color"
                      type="color"
                      value={formData.hero_bg_color}
                      onChange={(e) => setFormData({ ...formData, hero_bg_color: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="main_headline">Main Headline</Label>
                  <Input
                    id="main_headline"
                    value={formData.main_headline}
                    onChange={(e) => setFormData({ ...formData, main_headline: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="subheadline">Subheadline</Label>
                  <Input
                    id="subheadline"
                    value={formData.subheadline}
                    onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="hero_description">Description</Label>
                  <Textarea
                    id="hero_description"
                    value={formData.hero_description}
                    onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="hero_image_url">Hero Image URL</Label>
                  <Input
                    id="hero_image_url"
                    value={formData.hero_image_url}
                    onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
                    placeholder="https://example.com/image.png"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hero_cta_text">CTA Button Text</Label>
                    <Input
                      id="hero_cta_text"
                      value={formData.hero_cta_text}
                      onChange={(e) => setFormData({ ...formData, hero_cta_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero_cta_bg_color">Button BG Color</Label>
                    <Input
                      id="hero_cta_bg_color"
                      type="color"
                      value={formData.hero_cta_bg_color}
                      onChange={(e) => setFormData({ ...formData, hero_cta_bg_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero_cta_text_color">Button Text Color</Label>
                    <Input
                      id="hero_cta_text_color"
                      type="color"
                      value={formData.hero_cta_text_color}
                      onChange={(e) => setFormData({ ...formData, hero_cta_text_color: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Popup/Modal Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">Email Popup/Modal</h3>
                <div>
                  <Label htmlFor="popup_title">Popup Title</Label>
                  <Input
                    id="popup_title"
                    value={formData.popup_title}
                    onChange={(e) => setFormData({ ...formData, popup_title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="popup_subtitle">Popup Subtitle</Label>
                  <Input
                    id="popup_subtitle"
                    value={formData.popup_subtitle}
                    onChange={(e) => setFormData({ ...formData, popup_subtitle: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="popup_button_text">Button Text</Label>
                    <Input
                      id="popup_button_text"
                      value={formData.popup_button_text}
                      onChange={(e) => setFormData({ ...formData, popup_button_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="popup_button_bg_color">Button BG Color</Label>
                    <Input
                      id="popup_button_bg_color"
                      type="color"
                      value={formData.popup_button_bg_color}
                      onChange={(e) => setFormData({ ...formData, popup_button_bg_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="popup_button_text_color">Button Text Color</Label>
                    <Input
                      id="popup_button_text_color"
                      type="color"
                      value={formData.popup_button_text_color}
                      onChange={(e) => setFormData({ ...formData, popup_button_text_color: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="privacy_text">Privacy Text</Label>
                  <Input
                    id="privacy_text"
                    value={formData.privacy_text}
                    onChange={(e) => setFormData({ ...formData, privacy_text: e.target.value })}
                  />
                </div>
              </div>

              {/* Mid Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">Content Section</h3>
                <div>
                  <Label htmlFor="mid_headline">Section Headline</Label>
                  <Input
                    id="mid_headline"
                    value={formData.mid_headline}
                    onChange={(e) => setFormData({ ...formData, mid_headline: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="mid_description">Section Description</Label>
                  <Textarea
                    id="mid_description"
                    value={formData.mid_description}
                    onChange={(e) => setFormData({ ...formData, mid_description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mid_image_1_url">Image 1 URL</Label>
                    <Input
                      id="mid_image_1_url"
                      value={formData.mid_image_1_url}
                      onChange={(e) => setFormData({ ...formData, mid_image_1_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mid_image_2_url">Image 2 URL</Label>
                    <Input
                      id="mid_image_2_url"
                      value={formData.mid_image_2_url}
                      onChange={(e) => setFormData({ ...formData, mid_image_2_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mid_image_3_url">Image 3 URL</Label>
                    <Input
                      id="mid_image_3_url"
                      value={formData.mid_image_3_url}
                      onChange={(e) => setFormData({ ...formData, mid_image_3_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mid_cta_text">CTA Button Text</Label>
                    <Input
                      id="mid_cta_text"
                      value={formData.mid_cta_text}
                      onChange={(e) => setFormData({ ...formData, mid_cta_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mid_cta_bg_color">Button BG Color</Label>
                    <Input
                      id="mid_cta_bg_color"
                      type="color"
                      value={formData.mid_cta_bg_color}
                      onChange={(e) => setFormData({ ...formData, mid_cta_bg_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mid_cta_text_color">Button Text Color</Label>
                    <Input
                      id="mid_cta_text_color"
                      type="color"
                      value={formData.mid_cta_text_color}
                      onChange={(e) => setFormData({ ...formData, mid_cta_text_color: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">Footer</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="footer_bg_color">Footer BG Color</Label>
                    <Input
                      id="footer_bg_color"
                      type="color"
                      value={formData.footer_bg_color}
                      onChange={(e) => setFormData({ ...formData, footer_bg_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="footer_text">Footer Text</Label>
                    <Input
                      id="footer_text"
                      value={formData.footer_text}
                      onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  {selectedPage ? 'Update' : 'Create'} Landing Page
                </Button>
                {selectedPage && (
                  <Button onClick={resetForm} variant="outline">
                    Cancel
                  </Button>
                )}
                {formData.slug && (
                  <Button variant="outline" asChild>
                    <a href={`/pdf/${formData.slug}`} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Landing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {landingPages.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No landing pages yet. Create your first one!</p>
              ) : (
                <div className="space-y-4">
                  {landingPages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{page.main_headline}</h4>
                        <p className="text-sm text-muted-foreground">/pdf/{page.slug}</p>
                        <span className={`text-xs ${page.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                          {page.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/pdf/${page.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(page.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
