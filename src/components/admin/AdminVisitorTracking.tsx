import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Loader2, Download, Filter, MapPin, Globe, Eye, FileText, Calendar, 
  MessageSquare, RefreshCw, Clock, User, Activity, TrendingUp,
  Smartphone, Monitor, Chrome, MousePointer, ArrowRight, ExternalLink,
  Mail, Phone, BookOpen, Sparkles, Target, Zap, Users
} from 'lucide-react';
import { format, formatDistanceToNow, subDays, isToday, isYesterday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface VisitorActivity {
  id: string;
  activity_type: string;
  visitor_ip: string;
  visitor_country: string;
  visitor_country_code: string;
  visitor_city: string;
  visitor_region: string;
  visitor_isp: string;
  page_url: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  metadata: any;
  created_at: string;
}

interface VisitorProfile {
  ip: string;
  country: string;
  country_code: string;
  city: string;
  isp: string;
  firstSeen: string;
  lastSeen: string;
  totalActivities: number;
  pageViews: number;
  activities: VisitorActivity[];
  device: string;
  browser: string;
}

const COUNTRY_FLAGS: { [key: string]: string } = {
  // A
  'AD': '🇦🇩', 'AE': '🇦🇪', 'AF': '🇦🇫', 'AG': '🇦🇬', 'AI': '🇦🇮', 'AL': '🇦🇱', 'AM': '🇦🇲', 'AO': '🇦🇴', 'AQ': '🇦🇶', 'AR': '🇦🇷',
  'AS': '🇦🇸', 'AT': '🇦🇹', 'AU': '🇦🇺', 'AW': '🇦🇼', 'AX': '🇦🇽', 'AZ': '🇦🇿',
  // B
  'BA': '🇧🇦', 'BB': '🇧🇧', 'BD': '🇧🇩', 'BE': '🇧🇪', 'BF': '🇧🇫', 'BG': '🇧🇬', 'BH': '🇧🇭', 'BI': '🇧🇮', 'BJ': '🇧🇯', 'BL': '🇧🇱',
  'BM': '🇧🇲', 'BN': '🇧🇳', 'BO': '🇧🇴', 'BQ': '🇧🇶', 'BR': '🇧🇷', 'BS': '🇧🇸', 'BT': '🇧🇹', 'BV': '🇧🇻', 'BW': '🇧🇼', 'BY': '🇧🇾', 'BZ': '🇧🇿',
  // C
  'CA': '🇨🇦', 'CC': '🇨🇨', 'CD': '🇨🇩', 'CF': '🇨🇫', 'CG': '🇨🇬', 'CH': '🇨🇭', 'CI': '🇨🇮', 'CK': '🇨🇰', 'CL': '🇨🇱', 'CM': '🇨🇲',
  'CN': '🇨🇳', 'CO': '🇨🇴', 'CR': '🇨🇷', 'CU': '🇨🇺', 'CV': '🇨🇻', 'CW': '🇨🇼', 'CX': '🇨🇽', 'CY': '🇨🇾', 'CZ': '🇨🇿',
  // D
  'DE': '🇩🇪', 'DJ': '🇩🇯', 'DK': '🇩🇰', 'DM': '🇩🇲', 'DO': '🇩🇴', 'DZ': '🇩🇿',
  // E
  'EC': '🇪🇨', 'EE': '🇪🇪', 'EG': '🇪🇬', 'EH': '🇪🇭', 'ER': '🇪🇷', 'ES': '🇪🇸', 'ET': '🇪🇹',
  // F
  'FI': '🇫🇮', 'FJ': '🇫🇯', 'FK': '🇫🇰', 'FM': '🇫🇲', 'FO': '🇫🇴', 'FR': '🇫🇷',
  // G
  'GA': '🇬🇦', 'GB': '🇬🇧', 'GD': '🇬🇩', 'GE': '🇬🇪', 'GF': '🇬🇫', 'GG': '🇬🇬', 'GH': '🇬🇭', 'GI': '🇬🇮', 'GL': '🇬🇱', 'GM': '🇬🇲',
  'GN': '🇬🇳', 'GP': '🇬🇵', 'GQ': '🇬🇶', 'GR': '🇬🇷', 'GS': '🇬🇸', 'GT': '🇬🇹', 'GU': '🇬🇺', 'GW': '🇬🇼', 'GY': '🇬🇾',
  // H
  'HK': '🇭🇰', 'HM': '🇭🇲', 'HN': '🇭🇳', 'HR': '🇭🇷', 'HT': '🇭🇹', 'HU': '🇭🇺',
  // I
  'ID': '🇮🇩', 'IE': '🇮🇪', 'IL': '🇮🇱', 'IM': '🇮🇲', 'IN': '🇮🇳', 'IO': '🇮🇴', 'IQ': '🇮🇶', 'IR': '🇮🇷', 'IS': '🇮🇸', 'IT': '🇮🇹',
  // J
  'JE': '🇯🇪', 'JM': '🇯🇲', 'JO': '🇯🇴', 'JP': '🇯🇵',
  // K
  'KE': '🇰🇪', 'KG': '🇰🇬', 'KH': '🇰🇭', 'KI': '🇰🇮', 'KM': '🇰🇲', 'KN': '🇰🇳', 'KP': '🇰🇵', 'KR': '🇰🇷', 'KW': '🇰🇼', 'KY': '🇰🇾', 'KZ': '🇰🇿',
  // L
  'LA': '🇱🇦', 'LB': '🇱🇧', 'LC': '🇱🇨', 'LI': '🇱🇮', 'LK': '🇱🇰', 'LR': '🇱🇷', 'LS': '🇱🇸', 'LT': '🇱🇹', 'LU': '🇱🇺', 'LV': '🇱🇻', 'LY': '🇱🇾',
  // M
  'MA': '🇲🇦', 'MC': '🇲🇨', 'MD': '🇲🇩', 'ME': '🇲🇪', 'MF': '🇲🇫', 'MG': '🇲🇬', 'MH': '🇲🇭', 'MK': '🇲🇰', 'ML': '🇲🇱', 'MM': '🇲🇲',
  'MN': '🇲🇳', 'MO': '🇲🇴', 'MP': '🇲🇵', 'MQ': '🇲🇶', 'MR': '🇲🇷', 'MS': '🇲🇸', 'MT': '🇲🇹', 'MU': '🇲🇺', 'MV': '🇲🇻', 'MW': '🇲🇼',
  'MX': '🇲🇽', 'MY': '🇲🇾', 'MZ': '🇲🇿',
  // N
  'NA': '🇳🇦', 'NC': '🇳🇨', 'NE': '🇳🇪', 'NF': '🇳🇫', 'NG': '🇳🇬', 'NI': '🇳🇮', 'NL': '🇳🇱', 'NO': '🇳🇴', 'NP': '🇳🇵', 'NR': '🇳🇷', 'NU': '🇳🇺', 'NZ': '🇳🇿',
  // O
  'OM': '🇴🇲',
  // P
  'PA': '🇵🇦', 'PE': '🇵🇪', 'PF': '🇵🇫', 'PG': '🇵🇬', 'PH': '🇵🇭', 'PK': '🇵🇰', 'PL': '🇵🇱', 'PM': '🇵🇲', 'PN': '🇵🇳', 'PR': '🇵🇷',
  'PS': '🇵🇸', 'PT': '🇵🇹', 'PW': '🇵🇼', 'PY': '🇵🇾',
  // Q
  'QA': '🇶🇦',
  // R
  'RE': '🇷🇪', 'RO': '🇷🇴', 'RS': '🇷🇸', 'RU': '🇷🇺', 'RW': '🇷🇼',
  // S
  'SA': '🇸🇦', 'SB': '🇸🇧', 'SC': '🇸🇨', 'SD': '🇸🇩', 'SE': '🇸🇪', 'SG': '🇸🇬', 'SH': '🇸🇭', 'SI': '🇸🇮', 'SJ': '🇸🇯', 'SK': '🇸🇰',
  'SL': '🇸🇱', 'SM': '🇸🇲', 'SN': '🇸🇳', 'SO': '🇸🇴', 'SR': '🇸🇷', 'SS': '🇸🇸', 'ST': '🇸🇹', 'SV': '🇸🇻', 'SX': '🇸🇽', 'SY': '🇸🇾', 'SZ': '🇸🇿',
  // T
  'TC': '🇹🇨', 'TD': '🇹🇩', 'TF': '🇹🇫', 'TG': '🇹🇬', 'TH': '🇹🇭', 'TJ': '🇹🇯', 'TK': '🇹🇰', 'TL': '🇹🇱', 'TM': '🇹🇲', 'TN': '🇹🇳',
  'TO': '🇹🇴', 'TR': '🇹🇷', 'TT': '🇹🇹', 'TV': '🇹🇻', 'TW': '🇹🇼', 'TZ': '🇹🇿',
  // U
  'UA': '🇺🇦', 'UG': '🇺🇬', 'UM': '🇺🇲', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿',
  // V
  'VA': '🇻🇦', 'VC': '🇻🇨', 'VE': '🇻🇪', 'VG': '🇻🇬', 'VI': '🇻🇮', 'VN': '🇻🇳', 'VU': '🇻🇺',
  // W
  'WF': '🇼🇫', 'WS': '🇼🇸',
  // X
  'XK': '🇽🇰',
  // Y
  'YE': '🇾🇪', 'YT': '🇾🇹',
  // Z
  'ZA': '🇿🇦', 'ZM': '🇿🇲', 'ZW': '🇿🇼',
};

const ACTIVITY_COLORS: { [key: string]: string } = {
  page_view: '#C5FF4A',
  contact_form: '#6366f1',
  booking: '#8b5cf6',
  pdf_download: '#ec4899',
  review_submission: '#f59e0b',
  whatsapp_message_sent: '#25D366',
  whatsapp_message_received: '#128C7E',
  messenger_message_sent: '#0084FF',
  messenger_message_received: '#00B2FF',
  instagram_message_sent: '#E4405F',
  instagram_message_received: '#C13584',
};

const CHART_COLORS = ['#C5FF4A', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function AdminVisitorTracking() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activities, setActivities] = useState<VisitorActivity[]>([]);
  const [visitorProfiles, setVisitorProfiles] = useState<VisitorProfile[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorProfile | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('30');
  const [countries, setCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('visitors');
  const [activityByHour, setActivityByHour] = useState<any[]>([]);
  const [activityByType, setActivityByType] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    uniqueVisitors: 0,
    page_views: 0,
    contact_forms: 0,
    bookings: 0,
    pdf_downloads: 0,
    messages: 0,
    countries: 0,
  });

  useEffect(() => {
    fetchActivities();
  }, [filterType, filterCountry, dateRange]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const startDate = format(subDays(new Date(), parseInt(dateRange)), 'yyyy-MM-dd');
      
      let query = supabase
        .from('visitor_activities')
        .select('*')
        .gte('created_at', startDate)
        .order('created_at', { ascending: false });

      if (filterType !== 'all') {
        query = query.eq('activity_type', filterType);
      }

      if (filterCountry !== 'all') {
        query = query.eq('visitor_country', filterCountry);
      }

      const { data, error } = await query;

      if (error) throw error;

      setActivities(data || []);

      // Get unique countries
      const uniqueCountries = [...new Set(data?.map(a => a.visitor_country).filter(Boolean))];
      setCountries(uniqueCountries as string[]);

      // Build visitor profiles
      buildVisitorProfiles(data || []);

      // Build activity by hour
      buildActivityByHour(data || []);

      // Build activity by type
      buildActivityByType(data || []);

      // Calculate stats
      const uniqueIPs = new Set(data?.filter(a => a.visitor_ip).map(a => a.visitor_ip));
      const uniqueCountryCount = new Set(data?.filter(a => a.visitor_country).map(a => a.visitor_country));
      
      setStats({
        total: data?.length || 0,
        uniqueVisitors: uniqueIPs.size,
        page_views: data?.filter(a => a.activity_type === 'page_view').length || 0,
        contact_forms: data?.filter(a => a.activity_type === 'contact_form').length || 0,
        bookings: data?.filter(a => a.activity_type === 'booking').length || 0,
        pdf_downloads: data?.filter(a => a.activity_type === 'pdf_download').length || 0,
        messages: data?.filter(a => a.activity_type.includes('message')).length || 0,
        countries: uniqueCountryCount.size,
      });
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

  const buildVisitorProfiles = (data: VisitorActivity[]) => {
    const profileMap = new Map<string, VisitorProfile>();

    data.forEach(activity => {
      const ip = activity.visitor_ip || 'Unknown';
      
      if (!profileMap.has(ip)) {
        profileMap.set(ip, {
          ip,
          country: activity.visitor_country || 'Unknown',
          country_code: activity.visitor_country_code || '',
          city: activity.visitor_city || 'Unknown',
          isp: activity.visitor_isp || 'Unknown',
          firstSeen: activity.created_at,
          lastSeen: activity.created_at,
          totalActivities: 0,
          pageViews: 0,
          activities: [],
          device: parseDevice(activity.user_agent),
          browser: parseBrowser(activity.user_agent),
        });
      }

      const profile = profileMap.get(ip)!;
      profile.totalActivities++;
      if (activity.activity_type === 'page_view') profile.pageViews++;
      profile.activities.push(activity);
      
      if (new Date(activity.created_at) < new Date(profile.firstSeen)) {
        profile.firstSeen = activity.created_at;
      }
      if (new Date(activity.created_at) > new Date(profile.lastSeen)) {
        profile.lastSeen = activity.created_at;
      }
    });

    const profiles = Array.from(profileMap.values())
      .filter(p => p.ip !== 'Unknown')
      .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());

    setVisitorProfiles(profiles);
  };

  const buildActivityByHour = (data: VisitorActivity[]) => {
    const hourMap = new Map<number, number>();
    
    for (let i = 0; i < 24; i++) {
      hourMap.set(i, 0);
    }

    data.forEach(activity => {
      const hour = new Date(activity.created_at).getHours();
      hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
    });

    const hourData = Array.from(hourMap.entries()).map(([hour, count]) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      activities: count,
    }));

    setActivityByHour(hourData);
  };

  const buildActivityByType = (data: VisitorActivity[]) => {
    const typeMap = new Map<string, number>();

    data.forEach(activity => {
      const type = activity.activity_type;
      typeMap.set(type, (typeMap.get(type) || 0) + 1);
    });

    const typeData = Array.from(typeMap.entries())
      .map(([type, count]) => ({
        type: formatActivityType(type),
        count,
        color: ACTIVITY_COLORS[type] || '#6B7280',
      }))
      .sort((a, b) => b.count - a.count);

    setActivityByType(typeData);
  };

  const parseDevice = (userAgent: string | null): string => {
    if (!userAgent) return 'Unknown';
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet/i.test(userAgent)) return 'Tablet';
    return 'Desktop';
  };

  const parseBrowser = (userAgent: string | null): string => {
    if (!userAgent) return 'Unknown';
    if (/chrome/i.test(userAgent)) return 'Chrome';
    if (/firefox/i.test(userAgent)) return 'Firefox';
    if (/safari/i.test(userAgent)) return 'Safari';
    if (/edge/i.test(userAgent)) return 'Edge';
    return 'Other';
  };

  const formatActivityType = (type: string): string => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchActivities();
    setRefreshing(false);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Activity', 'Country', 'City', 'IP', 'Page', 'Referrer', 'Device'];
    const rows = activities.map(activity => [
      format(new Date(activity.created_at), 'yyyy-MM-dd HH:mm'),
      activity.activity_type,
      activity.visitor_country || '-',
      activity.visitor_city || '-',
      activity.visitor_ip || '-',
      activity.page_url || '-',
      activity.referrer || 'Direct',
      parseDevice(activity.user_agent)
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor-activities-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'page_view': return <Eye className="h-4 w-4" />;
      case 'contact_form': return <Mail className="h-4 w-4" />;
      case 'booking': return <Calendar className="h-4 w-4" />;
      case 'pdf_download': return <FileText className="h-4 w-4" />;
      case 'review_submission': return <MessageSquare className="h-4 w-4" />;
      default: 
        if (type.includes('whatsapp')) return <Phone className="h-4 w-4" />;
        if (type.includes('messenger')) return <MessageSquare className="h-4 w-4" />;
        if (type.includes('instagram')) return <Sparkles className="h-4 w-4" />;
        return <Globe className="h-4 w-4" />;
    }
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  const filteredProfiles = visitorProfiles.filter(profile => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      profile.ip?.toLowerCase().includes(term) ||
      profile.country?.toLowerCase().includes(term) ||
      profile.city?.toLowerCase().includes(term) ||
      profile.isp?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#C5FF4A]" />
          <p className="text-muted-foreground">Loading visitor data...</p>
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
                <Users className="h-6 w-6 text-[#C5FF4A]" />
              </div>
              <Badge className="bg-[#C5FF4A]/20 text-[#C5FF4A] border-[#C5FF4A]/30">
                <Activity className="h-3 w-3 mr-1" />
                Real-time Tracking
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Visitor Activity Tracker
            </h1>
            <p className="text-gray-400 mt-2">
              Track every visitor action • IP & Location • Device Info
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px] bg-white/10 border-white/20 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
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
            <Button onClick={exportToCSV} className="bg-[#C5FF4A] text-black hover:bg-[#d4ff6a]">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Total Activities', value: stats.total, icon: Activity, color: 'text-blue-500' },
          { label: 'Unique Visitors', value: stats.uniqueVisitors, icon: Users, color: 'text-[#C5FF4A]' },
          { label: 'Page Views', value: stats.page_views, icon: Eye, color: 'text-purple-500' },
          { label: 'Contact Forms', value: stats.contact_forms, icon: Mail, color: 'text-indigo-500' },
          { label: 'Bookings', value: stats.bookings, icon: Calendar, color: 'text-pink-500' },
          { label: 'PDF Downloads', value: stats.pdf_downloads, icon: FileText, color: 'text-orange-500' },
          { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-green-500' },
          { label: 'Countries', value: stats.countries, icon: Globe, color: 'text-cyan-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
              <CardContent className="p-3 text-center">
                <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
                <div className="text-xl font-bold text-white">{stat.value.toLocaleString()}</div>
                <p className="text-[10px] text-gray-400 truncate">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-900 border border-white/10">
          <TabsTrigger value="visitors" className="data-[state=active]:bg-[#C5FF4A] data-[state=active]:text-black">
            <Users className="h-4 w-4 mr-2" />
            Visitors ({stats.uniqueVisitors})
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-[#C5FF4A] data-[state=active]:text-black">
            <Clock className="h-4 w-4 mr-2" />
            Activity Timeline
          </TabsTrigger>
          <TabsTrigger value="charts" className="data-[state=active]:bg-[#C5FF4A] data-[state=active]:text-black">
            <TrendingUp className="h-4 w-4 mr-2" />
            Charts
          </TabsTrigger>
        </TabsList>

        {/* Visitors Tab */}
        <TabsContent value="visitors" className="space-y-4">
          {/* Filters */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
            <CardContent className="p-4 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search by IP, country, city, ISP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="page_view">Page Views</SelectItem>
                  <SelectItem value="contact_form">Contact Forms</SelectItem>
                  <SelectItem value="booking">Bookings</SelectItem>
                  <SelectItem value="pdf_download">PDF Downloads</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Visitor List & Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Visitor List */}
            <Card className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#C5FF4A]" />
                  Visitors ({filteredProfiles.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="p-2 space-y-2">
                    {filteredProfiles.map((profile, index) => (
                      <motion.div
                        key={profile.ip}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => setSelectedVisitor(profile)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedVisitor?.ip === profile.ip 
                            ? 'bg-[#C5FF4A]/20 border border-[#C5FF4A]/50' 
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {COUNTRY_FLAGS[profile.country_code] || '🌍'}
                            </span>
                            <div>
                              <div className="text-white font-medium text-sm">
                                {profile.city}, {profile.country}
                              </div>
                              <div className="text-gray-500 text-xs font-mono">
                                {profile.ip}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-xs border-white/20 text-gray-400"
                          >
                            {profile.totalActivities}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            {profile.device === 'Mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                            {profile.device}
                          </span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(profile.lastSeen), { addSuffix: true })}</span>
                        </div>
                      </motion.div>
                    ))}
                    {filteredProfiles.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No visitors found</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Visitor Detail */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#C5FF4A]" />
                  Visitor Journey
                </CardTitle>
                <CardDescription>
                  {selectedVisitor ? `Activity timeline for ${selectedVisitor.ip}` : 'Select a visitor to see their journey'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedVisitor ? (
                  <div className="space-y-4">
                    {/* Visitor Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-white font-medium text-sm">
                          {COUNTRY_FLAGS[selectedVisitor.country_code] || '🌍'} {selectedVisitor.city}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-xs text-gray-400">ISP</p>
                        <p className="text-white font-medium text-sm truncate">{selectedVisitor.isp}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-xs text-gray-400">Device</p>
                        <p className="text-white font-medium text-sm flex items-center gap-1">
                          {selectedVisitor.device === 'Mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                          {selectedVisitor.device}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-xs text-gray-400">Browser</p>
                        <p className="text-white font-medium text-sm flex items-center gap-1">
                          <Chrome className="h-3 w-3" />
                          {selectedVisitor.browser}
                        </p>
                      </div>
                    </div>

                    {/* Activity Timeline */}
                    <ScrollArea className="h-[350px]">
                      <div className="relative pl-6 space-y-4">
                        {/* Timeline line */}
                        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#C5FF4A] via-purple-500 to-gray-700" />
                        
                        {selectedVisitor.activities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative"
                          >
                            {/* Timeline dot */}
                            <div 
                              className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center"
                              style={{ backgroundColor: ACTIVITY_COLORS[activity.activity_type] || '#6B7280' }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                            
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="p-1.5 rounded-lg"
                                    style={{ backgroundColor: `${ACTIVITY_COLORS[activity.activity_type]}20` }}
                                  >
                                    <span style={{ color: ACTIVITY_COLORS[activity.activity_type] }}>
                                      {getActivityIcon(activity.activity_type)}
                                    </span>
                                  </div>
                                  <div>
                                    <Badge 
                                      className="text-xs"
                                      style={{ 
                                        backgroundColor: `${ACTIVITY_COLORS[activity.activity_type]}20`,
                                        color: ACTIVITY_COLORS[activity.activity_type],
                                        borderColor: ACTIVITY_COLORS[activity.activity_type]
                                      }}
                                    >
                                      {formatActivityType(activity.activity_type)}
                                    </Badge>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {format(new Date(activity.created_at), 'HH:mm')}
                                </span>
                              </div>
                              {activity.page_title && (
                                <p className="mt-2 text-sm text-gray-300 flex items-center gap-1">
                                  <MousePointer className="h-3 w-3" />
                                  {activity.page_title}
                                </p>
                              )}
                              {activity.referrer && activity.referrer !== '' && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <ArrowRight className="h-3 w-3" />
                                  From: {(() => {
                                    try {
                                      return new URL(activity.referrer).hostname;
                                    } catch {
                                      return activity.referrer;
                                    }
                                  })()}
                                </p>
                              )}
                              <p className="text-xs text-gray-600 mt-1">
                                {getDateLabel(activity.created_at)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MousePointer className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Select a visitor from the list to see their activity journey</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">All Activities ({activities.length})</CardTitle>
              <CardDescription>Complete activity log with details</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">Date & Time</TableHead>
                      <TableHead className="text-gray-400">Activity</TableHead>
                      <TableHead className="text-gray-400">Location</TableHead>
                      <TableHead className="text-gray-400">IP Address</TableHead>
                      <TableHead className="text-gray-400">Page</TableHead>
                      <TableHead className="text-gray-400">Referrer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.slice(0, 100).map((activity) => (
                      <TableRow key={activity.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-sm text-gray-300">
                          <div>{format(new Date(activity.created_at), 'MMM dd, yyyy')}</div>
                          <div className="text-xs text-gray-500">{format(new Date(activity.created_at), 'HH:mm:ss')}</div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className="flex items-center gap-1 w-fit text-xs"
                            style={{ 
                              backgroundColor: `${ACTIVITY_COLORS[activity.activity_type]}20`,
                              color: ACTIVITY_COLORS[activity.activity_type],
                              borderColor: ACTIVITY_COLORS[activity.activity_type]
                            }}
                          >
                            {getActivityIcon(activity.activity_type)}
                            {formatActivityType(activity.activity_type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-300">
                            <span>{COUNTRY_FLAGS[activity.visitor_country_code] || '🌍'}</span>
                            {activity.visitor_city || 'Unknown'}
                          </div>
                          <div className="text-xs text-gray-500">{activity.visitor_country}</div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                            {activity.visitor_ip || '-'}
                          </code>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-300 truncate">
                            {activity.page_title || activity.page_url || '-'}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {activity.referrer ? (
                            <span className="truncate block max-w-[150px]">
                              {(() => {
                                try {
                                  return new URL(activity.referrer).hostname;
                                } catch {
                                  return activity.referrer;
                                }
                              })()}
                            </span>
                          ) : (
                            'Direct'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity by Hour */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#C5FF4A]" />
                  Activity by Hour
                </CardTitle>
                <CardDescription>When are visitors most active?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityByHour}>
                      <defs>
                        <linearGradient id="colorHourly" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C5FF4A" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C5FF4A" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="hour" stroke="#666" fontSize={10} />
                      <YAxis stroke="#666" fontSize={10} />
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
                        dataKey="activities" 
                        stroke="#C5FF4A" 
                        fillOpacity={1} 
                        fill="url(#colorHourly)" 
                        name="Activities"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Activity by Type */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#C5FF4A]" />
                  Activity Breakdown
                </CardTitle>
                <CardDescription>Types of activities performed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityByType} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#666" fontSize={10} />
                      <YAxis 
                        dataKey="type" 
                        type="category" 
                        stroke="#666" 
                        fontSize={10} 
                        width={120}
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
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {activityByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
