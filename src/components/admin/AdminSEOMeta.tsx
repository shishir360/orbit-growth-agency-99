import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Globe, Search, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminSEOMeta = () => {
  const { toast } = useToast();
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

      <Tabs defaultValue="meta" className="space-y-6">
        <TabsList>
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="tracking">Tracking Codes</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
        </TabsList>

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