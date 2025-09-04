import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Target, DollarSign, TrendingUp, Calculator, Play, Pause, Settings, BarChart3 } from 'lucide-react';

const AdminAdsManagement = () => {
  const [roiInputs, setRoiInputs] = useState({
    adSpend: '',
    revenue: '',
    conversionRate: '',
    avgOrderValue: ''
  });

  const [campaigns] = useState([
    { id: 1, name: 'Google Search Campaign', platform: 'Google', status: 'active', spend: 15000, conversions: 85, roas: 4.2, ctr: 3.2, cpc: 2.5 },
    { id: 2, name: 'Facebook Brand Awareness', platform: 'Facebook', status: 'active', spend: 12000, conversions: 120, roas: 3.8, ctr: 2.8, cpc: 1.8 },
    { id: 3, name: 'TikTok Video Ads', platform: 'TikTok', status: 'paused', spend: 8000, conversions: 65, roas: 3.2, ctr: 4.1, cpc: 1.2 },
    { id: 4, name: 'LinkedIn B2B Campaign', platform: 'LinkedIn', status: 'active', spend: 10000, conversions: 45, roas: 5.1, ctr: 1.9, cpc: 4.2 },
    { id: 5, name: 'Instagram Stories', platform: 'Instagram', status: 'active', spend: 9500, conversions: 95, roas: 3.6, ctr: 3.5, cpc: 1.6 },
    { id: 6, name: 'YouTube Pre-Roll', platform: 'YouTube', status: 'active', spend: 7200, conversions: 58, roas: 2.9, ctr: 2.1, cpc: 0.85 },
    { id: 7, name: 'Twitter Promoted Tweets', platform: 'Twitter', status: 'paused', spend: 4500, conversions: 32, roas: 2.4, ctr: 1.8, cpc: 1.95 },
    { id: 8, name: 'Pinterest Shopping Ads', platform: 'Pinterest', status: 'active', spend: 6800, conversions: 78, roas: 4.1, ctr: 3.8, cpc: 1.4 },
    { id: 9, name: 'Snapchat AR Filters', platform: 'Snapchat', status: 'active', spend: 5200, conversions: 41, roas: 2.8, ctr: 4.2, cpc: 2.1 },
    { id: 10, name: 'Microsoft Bing Ads', platform: 'Bing', status: 'active', spend: 3800, conversions: 28, roas: 3.4, ctr: 2.6, cpc: 2.8 }
  ]);

  const calculateROI = () => {
    const spend = parseFloat(roiInputs.adSpend) || 0;
    if (spend === 0) return 0;
    
    // Use direct revenue input if provided, otherwise calculate from conversion data
    let revenue = 0;
    if (roiInputs.revenue && parseFloat(roiInputs.revenue) > 0) {
      revenue = parseFloat(roiInputs.revenue);
    } else if (roiInputs.conversionRate && roiInputs.avgOrderValue && roiInputs.adSpend) {
      revenue = calculateProjectedRevenue();
    }
    
    if (revenue === 0) return 0;
    return ((revenue - spend) / spend * 100).toFixed(1);
  };

  const calculateProjectedRevenue = () => {
    const spend = parseFloat(roiInputs.adSpend) || 0;
    const conversionRate = parseFloat(roiInputs.conversionRate) || 0;
    const avgOrderValue = parseFloat(roiInputs.avgOrderValue) || 0;
    
    if (spend === 0 || conversionRate === 0 || avgOrderValue === 0) return 0;
    
    // Assuming 1000 clicks per $100 spend (industry average)
    const estimatedClicks = (spend / 100) * 1000;
    const estimatedConversions = (estimatedClicks * conversionRate) / 100;
    const projectedRevenue = estimatedConversions * avgOrderValue;
    
    return projectedRevenue;
  };

  const getDisplayRevenue = () => {
    if (roiInputs.revenue && parseFloat(roiInputs.revenue) > 0) {
      return parseFloat(roiInputs.revenue).toLocaleString();
    } else if (roiInputs.conversionRate && roiInputs.avgOrderValue && roiInputs.adSpend) {
      return calculateProjectedRevenue().toLocaleString();
    }
    return '0';
  };

  const getProfitMargin = () => {
    const spend = parseFloat(roiInputs.adSpend) || 0;
    let revenue = 0;
    
    if (roiInputs.revenue && parseFloat(roiInputs.revenue) > 0) {
      revenue = parseFloat(roiInputs.revenue);
    } else if (roiInputs.conversionRate && roiInputs.avgOrderValue && roiInputs.adSpend) {
      revenue = calculateProjectedRevenue();
    }
    
    return Math.max(0, revenue - spend);
  };

  const calculateBreakEvenRoas = () => {
    const spend = parseFloat(roiInputs.adSpend) || 0;
    if (spend === 0) return 0;
    return (spend / spend).toFixed(1); // Break-even is 1.0x ROAS
  };

  const getPlatformIcon = (platform: string) => {
    const iconMap = {
      'Google': '🔍',
      'Facebook': '📘', 
      'TikTok': '🎵',
      'LinkedIn': '💼',
      'Instagram': '📷',
      'Twitter': '🐦',
      'YouTube': '📺',
      'Pinterest': '📌',
      'Snapchat': '👻',
      'Bing': '🌐'
    };
    return iconMap[platform as keyof typeof iconMap] || '📊';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ads Management Service</h1>
        <p className="text-muted-foreground mt-2">Monitor advertising campaigns across all platforms and calculate ROI potential</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">18</p>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">$45K</p>
                <p className="text-sm text-muted-foreground">Monthly Ad Spend</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.2x</p>
                <p className="text-sm text-muted-foreground">Average ROAS</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calculator className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{calculateROI()}%</p>
                <p className="text-sm text-muted-foreground">Projected ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="roi-calculator">ROI Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Campaign Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{getPlatformIcon(campaign.platform)}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {campaign.platform} • {campaign.conversions} conversions • {campaign.ctr}% CTR • ${campaign.cpc} CPC
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${campaign.spend.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{campaign.roas}x ROAS</p>
                      </div>
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Google Ads', 'Facebook Ads', 'Instagram Ads', 'TikTok Ads', 
              'LinkedIn Ads', 'Twitter Ads', 'YouTube Ads', 'Pinterest Ads',
              'Snapchat Ads', 'Microsoft Bing Ads'
            ].map((platform, index) => {
              const campaignData = campaigns.find(c => c.platform === platform.split(' ')[0]);
              return (
                <Card key={platform} className="modern-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{getPlatformIcon(platform.split(' ')[0])}</span>
                      {platform}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Campaigns</span>
                        <span className="font-semibold">
                          {campaigns.filter(c => c.platform === platform.split(' ')[0] && c.status === 'active').length || Math.floor(Math.random() * 5) + 1}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Spend</span>
                        <span className="font-semibold">
                          ${campaignData ? campaignData.spend.toLocaleString() : (Math.random() * 15000 + 3000).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROAS</span>
                        <span className="font-semibold text-accent">
                          {campaignData ? `${campaignData.roas}x` : `${(Math.random() * 3 + 2).toFixed(1)}x`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. CTR</span>
                        <span className="font-semibold">
                          {campaignData ? `${campaignData.ctr}%` : `${(Math.random() * 3 + 1).toFixed(1)}%`}
                        </span>
                      </div>
                      <Button className="w-full" variant="outline">
                        Manage {platform}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="roi-calculator" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                ROI Potential Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="adSpend">Monthly Ad Spend ($)</Label>
                    <Input
                      id="adSpend"
                      type="number"
                      placeholder="e.g., 10000"
                      value={roiInputs.adSpend}
                      onChange={(e) => setRoiInputs(prev => ({ ...prev, adSpend: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="revenue">Expected Monthly Revenue ($)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="e.g., 50000"
                      value={roiInputs.revenue}
                      onChange={(e) => setRoiInputs(prev => ({ ...prev, revenue: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                    <Input
                      id="conversionRate"
                      type="number"
                      placeholder="e.g., 3.5"
                      value={roiInputs.conversionRate}
                      onChange={(e) => setRoiInputs(prev => ({ ...prev, conversionRate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="avgOrderValue">Average Order Value ($)</Label>
                    <Input
                      id="avgOrderValue"
                      type="number"
                      placeholder="e.g., 150"
                      value={roiInputs.avgOrderValue}
                      onChange={(e) => setRoiInputs(prev => ({ ...prev, avgOrderValue: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Card className="bg-gradient-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Projected ROI</h3>
                        <p className="text-4xl font-bold">{calculateROI()}%</p>
                        <p className="text-sm opacity-90 mt-2">Return on Investment</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span>Projected Revenue</span>
                      <span className="font-semibold text-accent">
                        ${getDisplayRevenue()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span>Break-even ROAS</span>
                      <span className="font-semibold">
                        1.0x
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span>Profit Margin</span>
                      <span className="font-semibold text-accent">
                        ${getProfitMargin().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span>Target ROAS</span>
                      <span className="font-semibold">
                        {roiInputs.adSpend && (roiInputs.revenue || (roiInputs.conversionRate && roiInputs.avgOrderValue))
                          ? `${((parseFloat(roiInputs.revenue) || calculateProjectedRevenue()) / parseFloat(roiInputs.adSpend) || 0).toFixed(1)}x`
                          : '0.0x'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span>Est. Conversions</span>
                      <span className="font-semibold">
                        {roiInputs.conversionRate && roiInputs.adSpend
                          ? Math.floor(((parseFloat(roiInputs.adSpend) / 100) * 1000 * parseFloat(roiInputs.conversionRate)) / 100)
                          : '0'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAdsManagement;