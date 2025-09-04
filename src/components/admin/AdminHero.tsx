import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContent } from '@/contexts/ContentContext';
import { Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminHero = () => {
  const { content, updateHero } = useContent();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(content.hero);

  const handleSave = () => {
    updateHero(formData);
    setIsEditing(false);
    toast({
      title: "Hero section updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(content.hero);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
            <p className="text-gray-600 mt-2">Manage your homepage hero content</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            Edit Hero Section
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Hero Content</CardTitle>
            <CardDescription>
              This is what visitors see when they first land on your homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Badge</Label>
              <p className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full inline-block">
                {content.hero.badge}
              </p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Title</Label>
              <h2 className="text-2xl font-bold">{content.hero.title}</h2>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Subtitle</Label>
              <p className="text-gray-600">{content.hero.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Primary CTA</Label>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{content.hero.primaryCta.text}</p>
                  <p className="text-sm text-gray-500">{content.hero.primaryCta.href}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Secondary CTA</Label>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{content.hero.secondaryCta.text}</p>
                  <p className="text-sm text-gray-500">{content.hero.secondaryCta.href}</p>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Image</Label>
              <p className="text-sm text-gray-600">{content.hero.image}</p>
              <p className="text-xs text-gray-500 mt-1">Alt text: {content.hero.imageAlt}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Hero Section</h1>
          <p className="text-gray-600 mt-2">Update your homepage hero content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>
            Edit the content that appears in your homepage hero section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g., Membership Sites & SaaS Builds"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Main Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Your main headline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Supporting text that explains your value proposition"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Primary Call-to-Action</h3>
              <div className="space-y-2">
                <Label htmlFor="primaryCtaText">Button Text</Label>
                <Input
                  id="primaryCtaText"
                  value={formData.primaryCta.text}
                  onChange={(e) => setFormData({
                    ...formData,
                    primaryCta: { ...formData.primaryCta, text: e.target.value }
                  })}
                  placeholder="e.g., Schedule A Meeting"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryCtaHref">Link URL</Label>
                <Input
                  id="primaryCtaHref"
                  value={formData.primaryCta.href}
                  onChange={(e) => setFormData({
                    ...formData,
                    primaryCta: { ...formData.primaryCta, href: e.target.value }
                  })}
                  placeholder="e.g., /contact"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Secondary Call-to-Action</h3>
              <div className="space-y-2">
                <Label htmlFor="secondaryCtaText">Button Text</Label>
                <Input
                  id="secondaryCtaText"
                  value={formData.secondaryCta.text}
                  onChange={(e) => setFormData({
                    ...formData,
                    secondaryCta: { ...formData.secondaryCta, text: e.target.value }
                  })}
                  placeholder="e.g., Get in Touch"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryCtaHref">Link URL</Label>
                <Input
                  id="secondaryCtaHref"
                  value={formData.secondaryCta.href}
                  onChange={(e) => setFormData({
                    ...formData,
                    secondaryCta: { ...formData.secondaryCta, href: e.target.value }
                  })}
                  placeholder="e.g., /contact"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Hero Image</h3>
            <div className="space-y-2">
              <Label htmlFor="image">Image Path</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="e.g., /src/assets/hero-dashboard.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageAlt">Alt Text</Label>
              <Input
                id="imageAlt"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                placeholder="Describe the image for accessibility"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHero;