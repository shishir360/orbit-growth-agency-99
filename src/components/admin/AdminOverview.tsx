import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Image, 
  Settings, 
  Users, 
  TrendingUp,
  Eye,
  Globe
} from 'lucide-react';

const AdminOverview = () => {
  // Mock data - in real app this would come from your backend
  const stats = [
    { title: 'Total Services', value: '12', icon: Settings, change: '+2', color: 'text-blue-600' },
    { title: 'Active Pages', value: '8', icon: FileText, change: '+1', color: 'text-green-600' },
    { title: 'Blog Posts', value: '24', icon: FileText, change: '+3', color: 'text-purple-600' },
    { title: 'Images', value: '156', icon: Image, change: '+12', color: 'text-orange-600' },
  ];

  const recentActivity = [
    { action: 'New service added', item: 'AI Automation', time: '2 hours ago', type: 'service' },
    { action: 'Blog post published', item: 'Getting Started with React', time: '4 hours ago', type: 'blog' },
    { action: 'Page updated', item: 'About Us', time: '1 day ago', type: 'page' },
    { action: 'Image uploaded', item: 'hero-banner.jpg', time: '2 days ago', type: 'image' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes across your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'service' ? 'bg-blue-500' :
                    activity.type === 'blog' ? 'bg-purple-500' :
                    activity.type === 'page' ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.item}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
                <Settings className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">Add Service</p>
                <p className="text-xs text-muted-foreground">Create new service</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
                <FileText className="h-5 w-5 text-purple-600 mb-2" />
                <p className="text-sm font-medium">New Blog Post</p>
                <p className="text-xs text-muted-foreground">Write article</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
                <Image className="h-5 w-5 text-orange-600 mb-2" />
                <p className="text-sm font-medium">Upload Image</p>
                <p className="text-xs text-muted-foreground">Add media files</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
                <Globe className="h-5 w-5 text-green-600 mb-2" />
                <p className="text-sm font-medium">New Page</p>
                <p className="text-xs text-muted-foreground">Create page</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Status */}
      <Card>
        <CardHeader>
          <CardTitle>Site Status</CardTitle>
          <CardDescription>Current status of your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Website Status</p>
                <p className="text-xs text-muted-foreground">Online and operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Eye className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Monthly Visitors</p>
                <p className="text-xs text-muted-foreground">2,847 unique visitors</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Performance</p>
                <p className="text-xs text-muted-foreground">95% uptime this month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;