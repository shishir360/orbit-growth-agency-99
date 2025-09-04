import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import { Building, Mail, Phone, MapPin, Globe, Save } from 'lucide-react';

const AdminCompany = () => {
  const { content, updateCompanyInfo } = useContent();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: content.companyName,
    logo: content.logo,
    email: 'hello@lunexomedia.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Suite 100, City, State 12345',
    website: 'https://lunexomedia.com',
    description: 'We help creators and businesses launch custom membership sites and SaaS MVPs—without the dev headache.',
    tagline: 'Build Membership Sites and SaaS Products That Scale',
    foundedYear: '2024',
    teamSize: '5-10',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/lunexomedia',
      twitter: 'https://twitter.com/lunexomedia',
      facebook: 'https://facebook.com/lunexomedia',
      instagram: 'https://instagram.com/lunexomedia'
    }
  });

  const handleSave = () => {
    updateCompanyInfo(formData.companyName, formData.logo);
    // In a real app, you'd save all the other company data too
    setIsEditing(false);
    toast({
      title: "Company information updated",
      description: "Your company information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      companyName: content.companyName,
      logo: content.logo
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Information</h1>
            <p className="text-gray-600 mt-2">Manage your company details and branding</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            Edit Company Info
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Company Name</Label>
                <p className="text-lg font-semibold">{content.companyName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Logo</Label>
                <p className="text-sm bg-primary/10 text-primary px-3 py-1 rounded inline-block">
                  {content.logo}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Tagline</Label>
                <p className="text-gray-600">{formData.tagline}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Description</Label>
                <p className="text-gray-600">{formData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Founded</Label>
                  <p className="text-gray-600">{formData.foundedYear}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Team Size</Label>
                  <p className="text-gray-600">{formData.teamSize}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-gray-600">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Phone</Label>
                  <p className="text-gray-600">{formData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Address</Label>
                  <p className="text-gray-600">{formData.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Website</Label>
                  <p className="text-gray-600">{formData.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Your company's social media presence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">Li</span>
                </div>
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="text-xs text-gray-500">@lunexomedia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">Tw</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Twitter</p>
                  <p className="text-xs text-gray-500">@lunexomedia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">Fb</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Facebook</p>
                  <p className="text-xs text-gray-500">@lunexomedia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                  <span className="text-pink-600 text-sm">Ig</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Instagram</p>
                  <p className="text-xs text-gray-500">@lunexomedia</p>
                </div>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Company Information</h1>
          <p className="text-gray-600 mt-2">Update your company details and branding</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Text/Symbol</Label>
              <Input
                id="logo"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="L"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Company Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Your company tagline"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of your company"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  value={formData.foundedYear}
                  onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  placeholder="5-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="hello@yourcompany.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Business Street, Suite 100, City, State 12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourcompany.com"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Update your social media presence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={formData.socialLinks.facebook}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/yourcompany"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCompany;