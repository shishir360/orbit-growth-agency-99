import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Users, TrendingUp, Settings, Edit, Save, Plus } from 'lucide-react';

const AdminWebsiteDesign = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const services = [
    {
      title: "Mobile Optimized",
      path: "/services/mobile-optimized",
      description: "Responsive designs that work perfectly on all devices",
      status: "Active"
    },
    {
      title: "Fast Loading",
      path: "/services/fast-loading", 
      description: "Optimized for speed and performance",
      status: "Active"
    },
    {
      title: "SEO Friendly",
      path: "/services/seo-friendly",
      description: "Built with SEO best practices",
      status: "Active"
    },
    {
      title: "Conversion Focused",
      path: "/services/conversion-focused",
      description: "Designed to turn visitors into customers",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Design Service</h1>
          <p className="text-gray-600 mt-2">Manage website design service content and metrics</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Content'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Management Tabs */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Service Pages</TabsTrigger>
          <TabsTrigger value="content">Main Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Individual Service Pages</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{service.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{service.path}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Globe className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Main Website Design Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Hero Title</label>
                <Input 
                  defaultValue="Beautiful Websites That Convert Visitors Into Customers"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Hero Subtitle</label>
                <Textarea 
                  defaultValue="Transform your online presence with stunning, conversion-focused websites that drive real business results."
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Primary CTA Text</label>
                <Input 
                  defaultValue="Start Your Project Today"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Secondary CTA Text</label>
                <Input 
                  defaultValue="Explore Our Portfolio"
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Page Views</div>
                <div className="text-xs text-green-600">+12% this month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-gray-600">Contact Forms</div>
                <div className="text-xs text-green-600">+8% this month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">3.2%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
                <div className="text-xs text-green-600">+0.4% this month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2:34</div>
                <div className="text-sm text-gray-600">Avg. Time on Page</div>
                <div className="text-xs text-red-600">-0:12 this month</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminWebsiteDesign;