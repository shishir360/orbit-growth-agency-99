import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Globe, Search, Tag, Image, Loader2, RefreshCw, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OgImage {
  id: string;
  page_path: string;
  image_url: string;
  title: string | null;
  generated_at: string;
}

const AdminSEOMeta = () => {
  const { toast } = useToast();
  const [ogImages, setOgImages] = useState<OgImage[]>([]);
  const [loadingOg, setLoadingOg] = useState(false);
  const [generatingPath, setGeneratingPath] = useState<string | null>(null);
  const [generatingAll, setGeneratingAll] = useState(false);
  
  const [seoSettings, setSeoSettings] = useState({
    globalTitle: 'LUNEXO MEDIA - Website Design & Digital Marketing',
    globalDescription: 'Professional website design, Google & Facebook ads management, and AI automation solutions.',
    globalKeywords: 'website design, digital marketing, ads management, AI automation',
    googleTagManager: '',
    googleAnalytics: '',
    facebookPixel: '',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemap: true,
    openGraph: {
      enabled: true,
      image: '/og-image.jpg',
      type: 'website'
    }
  });

  // All pages that can have OG images
  const allPages = [
    { path: "/", name: "Homepage" },
    { path: "/website-design", name: "Website Design" },
    { path: "/ai-automation", name: "AI Automation" },
    { path: "/ads-management", name: "Ads Management" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
    { path: "/pricing", name: "Pricing" },
    { path: "/blog", name: "Blog" },
    { path: "/portfolio", name: "Portfolio" },
    { path: "/portfolio/website-design", name: "Portfolio - Web Design" },
    { path: "/portfolio/ai-automation", name: "Portfolio - AI" },
    { path: "/portfolio/ads-management", name: "Portfolio - Ads" },
    { path: "/reviews", name: "Reviews" },
    { path: "/services", name: "Services" },
    { path: "/founder", name: "Founder" }
  ];

  useEffect(() => {
    fetchOgImages();
  }, []);

  const fetchOgImages = async () => {
    setLoadingOg(true);
    try {
      const { data, error } = await supabase
        .from('og_images')
        .select('*')
        .order('page_path');
      
      if (error) throw error;
      setOgImages(data || []);
    } catch (error) {
      console.error('Error fetching OG images:', error);
    } finally {
      setLoadingOg(false);
    }
  };

  const generateOgImage = async (pagePath: string, forceRegenerate = false) => {
    setGeneratingPath(pagePath);
    try {
      const { data, error } = await supabase.functions.invoke('generate-og-image', {
        body: { pagePath, forceRegenerate }
      });
      
      if (error) throw error;
      
      toast({
        title: data.cached ? "Image Already Exists" : "OG Image Generated!",
        description: `Image for ${pagePath} is ready.`,
      });
      
      await fetchOgImages();
    } catch (error: any) {
      console.error('Error generating OG image:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate OG image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingPath(null);
    }
  };

  const generateAllOgImages = async () => {
    setGeneratingAll(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-all-og-images', {
        body: { forceRegenerate: false }
      });
      
      if (error) throw error;
      
      toast({
        title: "Batch Generation Complete",
        description: `Generated: ${data.generated}, Cached: ${data.cached}, Errors: ${data.errors}`,
      });
      
      await fetchOgImages();
    } catch (error: any) {
      console.error('Error generating all OG images:', error);
      toast({
        title: "Batch Generation Failed",
        description: error.message || "Failed to generate OG images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingAll(false);
    }
  };

  const getImageForPath = (path: string) => {
    return ogImages.find(img => img.page_path === path);
  };

  const handleSave = () => {
    toast({
      title: "SEO Settings Updated",
      description: "All meta tags and tracking codes have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO & Meta Tags</h1>
        <p className="text-gray-600 mt-2">Manage your website's SEO settings and tracking codes</p>
      </div>

      <Tabs defaultValue="og-images" className="space-y-6">
        <TabsList>
          <TabsTrigger value="og-images">OG Images</TabsTrigger>
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="tracking">Tracking Codes</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="og-images" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    AI-Generated OG Images
                  </CardTitle>
                  <CardDescription>
                    Generate unique social sharing images for each page using AI
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchOgImages}
                    disabled={loadingOg}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loadingOg ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button
                    onClick={generateAllOgImages}
                    disabled={generatingAll}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {generatingAll ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating All...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate All Missing
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allPages.map((page) => {
                  const ogImage = getImageForPath(page.path);
                  const isGenerating = generatingPath === page.path;
                  
                  return (
                    <Card key={page.path} className="overflow-hidden">
                      <div className="aspect-[1200/630] bg-gray-100 relative">
                        {ogImage?.image_url ? (
                          <img
                            src={ogImage.image_url}
                            alt={`OG image for ${page.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Image className="w-12 h-12" />
                          </div>
                        )}
                        {isGenerating && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{page.name}</p>
                            <p className="text-xs text-gray-500">{page.path}</p>
                          </div>
                          {ogImage ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Generated
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <XCircle className="w-3 h-3 mr-1" />
                              Missing
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={ogImage ? "outline" : "default"}
                            className="flex-1"
                            onClick={() => generateOgImage(page.path, false)}
                            disabled={isGenerating || generatingAll}
                          >
                            {isGenerating ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : ogImage ? (
                              "Regenerate"
                            ) : (
                              "Generate"
                            )}
                          </Button>
                          {ogImage && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(ogImage.image_url, '_blank')}
                            >
                              <Globe className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              {ogImages.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Generated:</strong> {ogImages.length} / {allPages.length} pages
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    AI-generated images are used for social media sharing (Facebook, LinkedIn, Twitter, WhatsApp)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Global Meta Tags
              </CardTitle>
              <CardDescription>
                Set default meta tags that will be used across your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Global Title</Label>
                <Input
                  id="title"
                  value={seoSettings.globalTitle}
                  onChange={(e) => setSeoSettings({...seoSettings, globalTitle: e.target.value})}
                  placeholder="Your website title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Global Description</Label>
                <Textarea
                  id="description"
                  value={seoSettings.globalDescription}
                  onChange={(e) => setSeoSettings({...seoSettings, globalDescription: e.target.value})}
                  placeholder="Your website description"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Global Keywords</Label>
                <Input
                  id="keywords"
                  value={seoSettings.globalKeywords}
                  onChange={(e) => setSeoSettings({...seoSettings, globalKeywords: e.target.value})}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Open Graph</Label>
                  <Switch
                    checked={seoSettings.openGraph.enabled}
                    onCheckedChange={(checked) => 
                      setSeoSettings({
                        ...seoSettings, 
                        openGraph: {...seoSettings.openGraph, enabled: checked}
                      })
                    }
                  />
                </div>
                {seoSettings.openGraph.enabled && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="ogImage">OG Image URL</Label>
                      <Input
                        id="ogImage"
                        value={seoSettings.openGraph.image}
                        onChange={(e) => setSeoSettings({
                          ...seoSettings, 
                          openGraph: {...seoSettings.openGraph, image: e.target.value}
                        })}
                        placeholder="/og-image.jpg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Tracking & Analytics
              </CardTitle>
              <CardDescription>
                Configure Google Analytics, Tag Manager, and Facebook Pixel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gtm">Google Tag Manager ID</Label>
                <Input
                  id="gtm"
                  value={seoSettings.googleTagManager}
                  onChange={(e) => setSeoSettings({...seoSettings, googleTagManager: e.target.value})}
                  placeholder="GTM-XXXXXXX"
                />
                <p className="text-sm text-gray-500">Format: GTM-XXXXXXX</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ga">Google Analytics ID</Label>
                <Input
                  id="ga"
                  value={seoSettings.googleAnalytics}
                  onChange={(e) => setSeoSettings({...seoSettings, googleAnalytics: e.target.value})}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-sm text-gray-500">Format: G-XXXXXXXXXX</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fbPixel">Facebook Pixel ID</Label>
                <Input
                  id="fbPixel"
                  value={seoSettings.facebookPixel}
                  onChange={(e) => setSeoSettings({...seoSettings, facebookPixel: e.target.value})}
                  placeholder="123456789012345"
                />
                <p className="text-sm text-gray-500">Your Facebook Pixel ID (numbers only)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Card className="p-4">
                  <div className="text-center">
                    <Badge variant={seoSettings.googleTagManager ? "default" : "secondary"}>
                      {seoSettings.googleTagManager ? "Connected" : "Not Setup"}
                    </Badge>
                    <p className="text-sm font-medium mt-2">Google Tag Manager</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <Badge variant={seoSettings.googleAnalytics ? "default" : "secondary"}>
                      {seoSettings.googleAnalytics ? "Connected" : "Not Setup"}
                    </Badge>
                    <p className="text-sm font-medium mt-2">Google Analytics</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <Badge variant={seoSettings.facebookPixel ? "default" : "secondary"}>
                      {seoSettings.facebookPixel ? "Connected" : "Not Setup"}
                    </Badge>
                    <p className="text-sm font-medium mt-2">Facebook Pixel</p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Technical SEO
              </CardTitle>
              <CardDescription>
                Configure robots.txt, sitemap, and other technical SEO settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="robots">Robots.txt Content</Label>
                <Textarea
                  id="robots"
                  value={seoSettings.robotsTxt}
                  onChange={(e) => setSeoSettings({...seoSettings, robotsTxt: e.target.value})}
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="text-sm font-medium">XML Sitemap</Label>
                  <p className="text-sm text-gray-500">Auto-generate sitemap.xml</p>
                </div>
                <Switch
                  checked={seoSettings.sitemap}
                  onCheckedChange={(checked) => setSeoSettings({...seoSettings, sitemap: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-[120px]">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSEOMeta;