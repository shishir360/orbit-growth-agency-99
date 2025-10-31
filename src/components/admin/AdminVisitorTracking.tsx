import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Filter, MapPin, Globe, Eye, FileText, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface VisitorActivity {
  id: string;
  activity_type: string;
  visitor_ip: string;
  visitor_country: string;
  visitor_city: string;
  visitor_region: string;
  visitor_isp: string;
  page_url: string;
  page_title: string;
  referrer: string;
  metadata: any;
  created_at: string;
}

export default function AdminVisitorTracking() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<VisitorActivity[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [countries, setCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    page_views: 0,
    contact_forms: 0,
    bookings: 0,
    pdf_downloads: 0,
  });

  useEffect(() => {
    fetchActivities();
  }, [filterType, filterCountry]);

  const fetchActivities = async () => {
    try {
      let query = supabase
        .from('visitor_activities')
        .select('*')
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

      // Calculate stats
      setStats({
        total: data?.length || 0,
        page_views: data?.filter(a => a.activity_type === 'page_view').length || 0,
        contact_forms: data?.filter(a => a.activity_type === 'contact_form').length || 0,
        bookings: data?.filter(a => a.activity_type === 'booking').length || 0,
        pdf_downloads: data?.filter(a => a.activity_type === 'pdf_download').length || 0,
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

  const exportToCSV = () => {
    const headers = ['Date', 'Activity', 'Country', 'City', 'IP', 'Page', 'Referrer'];
    const rows = activities.map(activity => [
      format(new Date(activity.created_at), 'yyyy-MM-dd HH:mm'),
      activity.activity_type,
      activity.visitor_country || '-',
      activity.visitor_city || '-',
      activity.visitor_ip || '-',
      activity.page_url || '-',
      activity.referrer || 'Direct'
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
      case 'contact_form': return <MessageSquare className="h-4 w-4" />;
      case 'booking': return <Calendar className="h-4 w-4" />;
      case 'pdf_download': return <FileText className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getActivityBadge = (type: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      page_view: 'outline',
      contact_form: 'default',
      booking: 'secondary',
      pdf_download: 'destructive',
    };
    return variants[type] || 'outline';
  };

  const filteredActivities = activities.filter(activity => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      activity.visitor_ip?.toLowerCase().includes(term) ||
      activity.visitor_country?.toLowerCase().includes(term) ||
      activity.visitor_city?.toLowerCase().includes(term) ||
      activity.page_url?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Visitor Tracking</h2>
          <p className="text-muted-foreground">Track all visitor activities with IP & location data</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.page_views}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contact Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.contact_forms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.bookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">PDF Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pdf_downloads}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by IP, country, city, or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[200px]">
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
            <SelectTrigger className="w-[200px]">
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

      {/* Activities Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Activities ({filteredActivities.length})</CardTitle>
          <CardDescription>Complete visitor activity log with location data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Referrer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No activities found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="text-sm">
                        {format(new Date(activity.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getActivityBadge(activity.activity_type)} className="flex items-center gap-1 w-fit">
                          {getActivityIcon(activity.activity_type)}
                          {activity.activity_type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {activity.visitor_city}, {activity.visitor_country}
                        </div>
                        {activity.visitor_region && (
                          <div className="text-xs text-muted-foreground">{activity.visitor_region}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {activity.visitor_ip || '-'}
                        </code>
                        {activity.visitor_isp && (
                          <div className="text-xs text-muted-foreground mt-1">{activity.visitor_isp}</div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-sm">
                        <a href={activity.page_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {activity.page_title || activity.page_url}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {activity.referrer ? (
                          <a href={activity.referrer} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block max-w-xs">
                            {new URL(activity.referrer).hostname}
                          </a>
                        ) : (
                          'Direct'
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
