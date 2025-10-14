import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building, Mail, Phone, MapPin, Globe, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CompanyInfo {
  id: string;
  company_name: string;
  logo: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  description?: string;
  tagline?: string;
  founded_year?: string;
  team_size?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
}

const AdminCompany = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    logo: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    tagline: '',
    founded_year: '',
    team_size: '',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: ''
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching company info:', error);
      return;
    }

    if (data) {
      setCompanyInfo(data);
      setFormData({
        company_name: data.company_name,
        logo: data.logo,
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        website: data.website || '',
        description: data.description || '',
        tagline: data.tagline || '',
        founded_year: data.founded_year || '',
        team_size: data.team_size || '',
        linkedin_url: data.linkedin_url || '',
        twitter_url: data.twitter_url || '',
        facebook_url: data.facebook_url || '',
        instagram_url: data.instagram_url || ''
      });
    }
  };

  const handleSave = async () => {
    if (companyInfo) {
      const { error } = await supabase
        .from('company_info')
        .update(formData)
        .eq('id', companyInfo.id);

      if (error) {
        console.error('Error updating company info:', error);
        toast.error('Failed to update company information');
        return;
      }
    } else {
      const { error } = await supabase
        .from('company_info')
        .insert([formData]);

      if (error) {
        console.error('Error creating company info:', error);
        toast.error('Failed to create company information');
        return;
      }
    }

    toast.success('Company information saved successfully');
    setIsEditing(false);
    fetchCompanyInfo();
  };

  const handleCancel = () => {
    if (companyInfo) {
      setFormData({
        company_name: companyInfo.company_name,
        logo: companyInfo.logo,
        email: companyInfo.email || '',
        phone: companyInfo.phone || '',
        address: companyInfo.address || '',
        website: companyInfo.website || '',
        description: companyInfo.description || '',
        tagline: companyInfo.tagline || '',
        founded_year: companyInfo.founded_year || '',
        team_size: companyInfo.team_size || '',
        linkedin_url: companyInfo.linkedin_url || '',
        twitter_url: companyInfo.twitter_url || '',
        facebook_url: companyInfo.facebook_url || '',
        instagram_url: companyInfo.instagram_url || ''
      });
    }
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
                <p className="text-lg font-semibold">{formData.company_name || 'Not set'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Logo</Label>
                <p className="text-sm bg-primary/10 text-primary px-3 py-1 rounded inline-block">
                  {formData.logo || 'Not set'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Tagline</Label>
                <p className="text-gray-600">{formData.tagline || 'Not set'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Description</Label>
                <p className="text-gray-600">{formData.description || 'Not set'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Founded</Label>
                  <p className="text-gray-600">{formData.founded_year || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Team Size</Label>
                  <p className="text-gray-600">{formData.team_size || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <p className="text-gray-600">{formData.email || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Phone</Label>
                  <p className="text-gray-600">{formData.phone || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Address</Label>
                  <p className="text-gray-600">{formData.address || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Website</Label>
                  <p className="text-gray-600">{formData.website || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  <p className="text-xs text-gray-500">{formData.linkedin_url || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">Tw</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Twitter</p>
                  <p className="text-xs text-gray-500">{formData.twitter_url || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">Fb</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Facebook</p>
                  <p className="text-xs text-gray-500">{formData.facebook_url || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                  <span className="text-pink-600 text-sm">Ig</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Instagram</p>
                  <p className="text-xs text-gray-500">{formData.instagram_url || 'Not set'}</p>
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
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
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
                <Label htmlFor="founded_year">Founded Year</Label>
                <Input
                  id="founded_year"
                  value={formData.founded_year}
                  onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team_size">Team Size</Label>
                <Input
                  id="team_size"
                  value={formData.team_size}
                  onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                  placeholder="5-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Update your social media presence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                value={formData.twitter_url}
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                placeholder="https://twitter.com/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                placeholder="https://facebook.com/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
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
