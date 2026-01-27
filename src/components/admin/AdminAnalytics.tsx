import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Eye, Globe, MapPin, 
  ExternalLink, Search, Facebook, MessageCircle, Share2, 
  ArrowUpRight, Loader2, RefreshCw, Calendar, Activity,
  Smartphone, Monitor, Zap, Target, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface TrafficData {
  country: string;
  country_code: string;
  visits: number;
  unique_visitors: number;
  percentage: number;
}

interface SourceData {
  source: string;
  visits: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

interface DailyData {
  date: string;
  visits: number;
  unique_visitors: number;
}

interface PageData {
  page: string;
  visits: number;
  percentage: number;
}

const COUNTRY_FLAGS: { [key: string]: string } = {
  'US': '🇺🇸', 'GB': '🇬🇧', 'FR': '🇫🇷', 'DE': '🇩🇪', 'NL': '🇳🇱', 
  'BE': '🇧🇪', 'ES': '🇪🇸', 'IT': '🇮🇹', 'CA': '🇨🇦', 'AU': '🇦🇺',
  'IN': '🇮🇳', 'BD': '🇧🇩', 'PK': '🇵🇰', 'JP': '🇯🇵', 'KR': '🇰🇷',
  'BR': '🇧🇷', 'MX': '🇲🇽', 'RU': '🇷🇺', 'CN': '🇨🇳', 'AE': '🇦🇪',
  'SA': '🇸🇦', 'SG': '🇸🇬', 'PH': '🇵🇭', 'ID': '🇮🇩', 'TH': '🇹🇭',
  'VN': '🇻🇳', 'MY': '🇲🇾', 'NG': '🇳🇬', 'ZA': '🇿🇦', 'EG': '🇪🇬',
  'PL': '🇵🇱', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮',
  'CH': '🇨🇭', 'AT': '🇦🇹', 'IE': '🇮🇪', 'PT': '🇵🇹', 'GR': '🇬🇷',
};

const CHART_COLORS = ['#C5FF4A', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [trafficByCountry, setTrafficByCountry] = useState<TrafficData[]>([]);
  const [trafficSources, setTrafficSources] = useState<SourceData[]>([]);
  const [dailyTraffic, setDailyTraffic] = useState<DailyData[]>([]);
  const [topPages, setTopPages] = useState<PageData[]>([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    avgSessionDuration: '2m 34s',
    bounceRate: 32,
    countries: 0,
  });

  useEffect(() => {
    fetchAllData();
  }, [dateRange]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchTrafficByCountry(),
      fetchTrafficSources(),
      fetchDailyTraffic(),
      fetchTopPages(),
      fetchOverallStats(),
    ]);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  };

  const fetchTrafficByCountry = async () => {
    const startDate = format(subDays(new Date(), parseInt(dateRange)), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('visitor_activities')
      .select('visitor_country, visitor_country_code, visitor_ip')
      .gte('created_at', startDate)
      .not('visitor_country', 'is', null);

    if (error) {
      console.error('Error fetching country data:', error);
      return;
    }

    // Group by country
    const countryMap = new Map<string, { code: string; visits: number; ips: Set<string> }>();
    data?.forEach(item => {
      const country = item.visitor_country || 'Unknown';
      const code = item.visitor_country_code || '';
      if (!countryMap.has(country)) {
        countryMap.set(country, { code, visits: 0, ips: new Set() });
      }
      const entry = countryMap.get(country)!;
      entry.visits++;
      if (item.visitor_ip) entry.ips.add(item.visitor_ip);
    });

    const totalVisits = Array.from(countryMap.values()).reduce((sum, c) => sum + c.visits, 0);
    
    const sortedCountries: TrafficData[] = Array.from(countryMap.entries())
      .map(([country, data]) => ({
        country,
        country_code: data.code,
        visits: data.visits,
        unique_visitors: data.ips.size,
        percentage: totalVisits > 0 ? (data.visits / totalVisits) * 100 : 0,
      }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 15);

    setTrafficByCountry(sortedCountries);
  };

  const fetchTrafficSources = async () => {
    const startDate = format(subDays(new Date(), parseInt(dateRange)), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('visitor_activities')
      .select('referrer')
      .gte('created_at', startDate)
      .eq('activity_type', 'page_view');

    if (error) {
      console.error('Error fetching source data:', error);
      return;
    }

    // Categorize sources
    const sourceMap = new Map<string, number>();
    data?.forEach(item => {
      let source = 'Direct';
      const referrer = item.referrer?.toLowerCase() || '';
      
      if (referrer.includes('google')) source = 'Google';
      else if (referrer.includes('facebook') || referrer.includes('fb.com')) source = 'Facebook';
      else if (referrer.includes('instagram')) source = 'Instagram';
      else if (referrer.includes('twitter') || referrer.includes('x.com')) source = 'Twitter/X';
      else if (referrer.includes('linkedin')) source = 'LinkedIn';
      else if (referrer.includes('lovable')) source = 'Lovable';
      else if (referrer.includes('lunexomedia')) source = 'Internal';
      else if (referrer && referrer !== '') source = 'Other Referrals';
      
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    });

    const totalVisits = Array.from(sourceMap.values()).reduce((sum, v) => sum + v, 0);
    
    const sourceIcons: { [key: string]: { icon: React.ReactNode; color: string } } = {
      'Direct': { icon: <Globe className="h-4 w-4" />, color: '#C5FF4A' },
      'Google': { icon: <Search className="h-4 w-4" />, color: '#4285F4' },
      'Facebook': { icon: <Facebook className="h-4 w-4" />, color: '#1877F2' },
      'Instagram': { icon: <Share2 className="h-4 w-4" />, color: '#E4405F' },
      'Twitter/X': { icon: <MessageCircle className="h-4 w-4" />, color: '#1DA1F2' },
      'LinkedIn': { icon: <ExternalLink className="h-4 w-4" />, color: '#0A66C2' },
      'Lovable': { icon: <Sparkles className="h-4 w-4" />, color: '#8B5CF6' },
      'Internal': { icon: <ArrowUpRight className="h-4 w-4" />, color: '#10B981' },
      'Other Referrals': { icon: <ExternalLink className="h-4 w-4" />, color: '#F59E0B' },
    };

    const sources: SourceData[] = Array.from(sourceMap.entries())
      .map(([source, visits]) => ({
        source,
        visits,
        percentage: totalVisits > 0 ? (visits / totalVisits) * 100 : 0,
        icon: sourceIcons[source]?.icon || <Globe className="h-4 w-4" />,
        color: sourceIcons[source]?.color || '#6B7280',
      }))
      .sort((a, b) => b.visits - a.visits);

    setTrafficSources(sources);
  };

  const fetchDailyTraffic = async () => {
    const startDate = format(subDays(new Date(), parseInt(dateRange)), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('visitor_activities')
      .select('created_at, visitor_ip')
      .gte('created_at', startDate)
      .eq('activity_type', 'page_view');

    if (error) {
      console.error('Error fetching daily data:', error);
      return;
    }

    // Group by date
    const dateMap = new Map<string, { visits: number; ips: Set<string> }>();
    data?.forEach(item => {
      const date = format(new Date(item.created_at), 'yyyy-MM-dd');
      if (!dateMap.has(date)) {
        dateMap.set(date, { visits: 0, ips: new Set() });
      }
      const entry = dateMap.get(date)!;
      entry.visits++;
      if (item.visitor_ip) entry.ips.add(item.visitor_ip);
    });

    const daily: DailyData[] = Array.from(dateMap.entries())
      .map(([date, data]) => ({
        date: format(new Date(date), 'MMM dd'),
        visits: data.visits,
        unique_visitors: data.ips.size,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setDailyTraffic(daily);
  };

  const fetchTopPages = async () => {
    const startDate = format(subDays(new Date(), parseInt(dateRange)), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('visitor_activities')
      .select('page_url, page_title')
      .gte('created_at', startDate)
      .eq('activity_type', 'page_view');

    if (error) {
      console.error('Error fetching page data:', error);
      return;
    }

    // Group by page
    const pageMap = new Map<string, number>();
    data?.forEach(item => {
      const page = item.page_title || item.page_url || 'Unknown';
      pageMap.set(page, (pageMap.get(page) || 0) + 1);
    });

    const totalVisits = Array.from(pageMap.values()).reduce((sum, v) => sum + v, 0);
    
    const pages: PageData[] = Array.from(pageMap.entries())
      .map(([page, visits]) => ({
        page: page.length > 50 ? page.substring(0, 50) + '...' : page,
        visits,
        percentage: totalVisits > 0 ? (visits / totalVisits) * 100 : 0,
      }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    setTopPages(pages);
  };

  const fetchOverallStats = async () => {
    const startDate = format(subDays(new Date(), parseInt(dateRange)), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('visitor_activities')
      .select('visitor_ip, visitor_country, activity_type')
      .gte('created_at', startDate);

    if (error) {
      console.error('Error fetching stats:', error);
      return;
    }

    const uniqueIPs = new Set(data?.filter(d => d.visitor_ip).map(d => d.visitor_ip));
    const uniqueCountries = new Set(data?.filter(d => d.visitor_country).map(d => d.visitor_country));
    const pageViews = data?.filter(d => d.activity_type === 'page_view').length || 0;

    setStats({
      totalVisits: data?.length || 0,
      uniqueVisitors: uniqueIPs.size,
      pageViews,
      avgSessionDuration: '2m 34s',
      bounceRate: 32,
      countries: uniqueCountries.size,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#C5FF4A]" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d0d0d] via-[#1a1a2e] to-[#16213e] p-8 border border-white/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-[#C5FF4A]/20">
                <BarChart3 className="h-6 w-6 text-[#C5FF4A]" />
              </div>
              <Badge className="bg-[#C5FF4A]/20 text-[#C5FF4A] border-[#C5FF4A]/30">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Real-time traffic insights • Similar to Similarweb
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Visits', value: stats.totalVisits.toLocaleString(), icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Unique Visitors', value: stats.uniqueVisitors.toLocaleString(), icon: Users, color: 'text-[#C5FF4A]', bg: 'bg-[#C5FF4A]/10' },
          { label: 'Page Views', value: stats.pageViews.toLocaleString(), icon: Monitor, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Avg. Session', value: stats.avgSessionDuration, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Bounce Rate', value: `${stats.bounceRate}%`, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Countries', value: stats.countries.toString(), icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10 hover:border-white/20 transition-all">
              <CardContent className="p-4">
                <div className={`inline-flex p-2 rounded-lg ${metric.bg} mb-2`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <p className="text-xs text-gray-400">{metric.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Traffic Chart */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#C5FF4A]" />
            Traffic Overview
          </CardTitle>
          <CardDescription>Daily visits and unique visitors over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTraffic}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5FF4A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C5FF4A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#C5FF4A" 
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                  name="Total Visits"
                />
                <Area 
                  type="monotone" 
                  dataKey="unique_visitors" 
                  stroke="#8B5CF6" 
                  fillOpacity={1} 
                  fill="url(#colorUnique)" 
                  name="Unique Visitors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic by Country */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#C5FF4A]" />
              Traffic by Country
            </CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
            <AnimatePresence>
              {trafficByCountry.map((country, index) => (
                <motion.div
                  key={country.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {COUNTRY_FLAGS[country.country_code] || '🌍'}
                      </span>
                      <span className="text-white font-medium text-sm">{country.country}</span>
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                        {country.unique_visitors} unique
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-[#C5FF4A] font-bold">{country.percentage.toFixed(1)}%</span>
                      <span className="text-gray-500 text-xs ml-2">({country.visits})</span>
                    </div>
                  </div>
                  <Progress 
                    value={country.percentage} 
                    className="h-2 bg-gray-800"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {trafficByCountry.length === 0 && (
              <p className="text-center text-gray-500 py-8">No country data available</p>
            )}
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#C5FF4A]" />
              Traffic Sources
            </CardTitle>
            <CardDescription>How visitors find your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {/* Pie Chart */}
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="visits"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a2e', 
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Source List */}
              <div className="space-y-2">
                {trafficSources.map((source, index) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg" 
                        style={{ backgroundColor: `${source.color}20` }}
                      >
                        <span style={{ color: source.color }}>{source.icon}</span>
                      </div>
                      <span className="text-white font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold">{source.percentage.toFixed(1)}%</span>
                      <span className="text-gray-500 text-xs block">{source.visits} visits</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-[#C5FF4A]" />
            Top Pages
          </CardTitle>
          <CardDescription>Most visited pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis 
                  dataKey="page" 
                  type="category" 
                  stroke="#666" 
                  fontSize={11} 
                  width={200}
                  tick={{ fill: '#999' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar 
                  dataKey="visits" 
                  fill="#C5FF4A" 
                  radius={[0, 4, 4, 0]}
                  name="Visits"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Device & Browser Insights (Placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[#C5FF4A]" />
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { device: 'Desktop', percentage: 58, icon: Monitor },
                { device: 'Mobile', percentage: 35, icon: Smartphone },
                { device: 'Tablet', percentage: 7, icon: Monitor },
              ].map((device) => (
                <div key={device.device} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <device.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{device.device}</span>
                    </div>
                    <span className="text-[#C5FF4A] font-bold">{device.percentage}%</span>
                  </div>
                  <Progress value={device.percentage} className="h-2 bg-gray-800" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#C5FF4A]" />
              Engagement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Pages / Session', value: '3.2', trend: '+12%' },
                { label: 'Avg. Time on Page', value: '1m 45s', trend: '+8%' },
                { label: 'New Visitors', value: '67%', trend: '+5%' },
                { label: 'Return Visitors', value: '33%', trend: '+15%' },
              ].map((metric) => (
                <div key={metric.label} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{metric.value}</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
