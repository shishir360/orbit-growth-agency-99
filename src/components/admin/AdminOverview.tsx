import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  FileText, 
  Image, 
  Settings, 
  Users, 
  TrendingUp,
  Eye,
  Globe,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Download,
  ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  amount_in_usd: number | null;
  currency: string;
  purpose: string;
  created_at: string;
}

interface ChartData {
  month: string;
  fullMonth: string;
  monthIndex: number;
  year: number;
  income: number;
  expenses: number;
}

const AdminOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const chartRef = useRef<HTMLDivElement>(null);
  const [walletData, setWalletData] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    loading: true
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const { data: transactions } = await supabase
        .from('wallet_transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (transactions) {
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        let totalIncome = 0;
        let totalExpenses = 0;
        let monthlyIncome = 0;
        let monthlyExpenses = 0;

        // Process transactions for totals
        transactions.forEach((t) => {
          const amountUsd = t.amount_in_usd || t.amount;
          const txDate = new Date(t.created_at);
          
          if (t.type === 'income') {
            totalIncome += amountUsd;
            if (txDate >= startOfCurrentMonth) monthlyIncome += amountUsd;
          } else {
            totalExpenses += amountUsd;
            if (txDate >= startOfCurrentMonth) monthlyExpenses += amountUsd;
          }
        });

        // Get last 5 transactions
        setRecentTransactions(transactions.slice(0, 5));

        // Build chart data for last 6 months
        const monthlyData: ChartData[] = [];
        for (let i = 5; i >= 0; i--) {
          const monthDate = subMonths(now, i);
          const monthStart = startOfMonth(monthDate);
          const monthEnd = endOfMonth(monthDate);
          
          let monthIncome = 0;
          let monthExpense = 0;
          
          transactions.forEach((t) => {
            const txDate = new Date(t.created_at);
            const amountUsd = t.amount_in_usd || t.amount;
            
            if (txDate >= monthStart && txDate <= monthEnd) {
              if (t.type === 'income') {
                monthIncome += amountUsd;
              } else {
                monthExpense += amountUsd;
              }
            }
          });
          
          monthlyData.push({
            month: format(monthDate, 'MMM'),
            fullMonth: format(monthDate, 'MMMM yyyy'),
            monthIndex: monthDate.getMonth(),
            year: monthDate.getFullYear(),
            income: Math.round(monthIncome * 100) / 100,
            expenses: Math.round(monthExpense * 100) / 100
          });
        }
        
        setChartData(monthlyData);

        setWalletData({
          totalBalance: totalIncome - totalExpenses,
          monthlyIncome,
          monthlyExpenses,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      setWalletData(prev => ({ ...prev, loading: false }));
    }
  };

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload as ChartData;
      navigate(`/admin-dashboard/wallet?month=${clickedData.monthIndex}&year=${clickedData.year}`);
      toast({
        title: "Filtering transactions",
        description: `Showing transactions for ${clickedData.fullMonth}`,
      });
    }
  };

  const exportChartAsImage = async () => {
    if (!chartRef.current) return;
    
    setExporting(true);
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `financial-chart-${format(new Date(), 'yyyy-MM-dd')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Chart exported!",
        description: "Chart saved as PNG image",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "Could not export chart",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };

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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

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

      {/* Wallet Quick Access Card */}
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent"
        onClick={() => navigate('/admin-dashboard/wallet')}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-emerald-500/10">
              <Wallet className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <CardTitle className="text-xl">Wallet</CardTitle>
              <CardDescription>Financial overview</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-emerald-500 border-emerald-500">
            Quick Access
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-foreground">
                {walletData.loading ? '...' : `$${walletData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10">
              <div className="flex items-center gap-1 mb-1">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <p className="text-sm text-muted-foreground">Monthly Income</p>
              </div>
              <p className="text-xl font-semibold text-emerald-500">
                {walletData.loading ? '...' : `+$${walletData.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-red-500/10">
              <div className="flex items-center gap-1 mb-1">
                <ArrowDownRight className="h-4 w-4 text-red-500" />
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              </div>
              <p className="text-xl font-semibold text-red-500">
                {walletData.loading ? '...' : `-$${walletData.monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Financial Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
                Income vs Expenses
              </CardTitle>
              <CardDescription>Click a month to filter transactions</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportChartAsImage}
              disabled={exporting}
              className="gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              {exporting ? 'Exporting...' : 'Export'}
            </Button>
          </CardHeader>
          <CardContent>
            <div ref={chartRef} className="h-[250px] p-2 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={chartData} 
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  onClick={handleChartClick}
                  style={{ cursor: 'pointer' }}
                >
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                    labelFormatter={(label, payload) => {
                      if (payload && payload.length > 0) {
                        return (payload[0].payload as ChartData).fullMonth;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#incomeGradient)" 
                    name="Income"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#expenseGradient)" 
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Last 5 wallet transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
              ) : (
                recentTransactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                        {tx.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[150px]">{tx.purpose}</p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(tx.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {tx.type === 'income' ? '+' : '-'}${(tx.amount_in_usd || tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      {tx.currency !== 'USD' && (
                        <p className="text-xs text-muted-foreground">{tx.currency}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            {recentTransactions.length > 0 && (
              <button 
                onClick={() => navigate('/admin-dashboard/wallet')}
                className="w-full mt-4 py-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                View all transactions →
              </button>
            )}
          </CardContent>
        </Card>
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