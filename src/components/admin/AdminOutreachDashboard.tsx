import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Users, Mail, MessageCircle, Briefcase, FileText } from 'lucide-react';

const AdminOutreachDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0, totalLeads: 0, emailsSent: 0, dmsSent: 0, closedDeals: 0, postsPublished: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [pipeline, setPipeline] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [leadsRes, emailsRes, dmsRes, postsRes, dealsRes] = await Promise.all([
      supabase.from('outreach_leads').select('*'),
      supabase.from('outreach_emails').select('*'),
      supabase.from('outreach_dms').select('*'),
      supabase.from('outreach_posts').select('*'),
      supabase.from('outreach_deals').select('*'),
    ]);

    const leads = leadsRes.data || [];
    const emails = emailsRes.data || [];
    const dms = dmsRes.data || [];
    const posts = postsRes.data || [];
    const deals = dealsRes.data || [];

    const totalRevenue = deals.reduce((s, d) => s + Number(d.amount || 0), 0);
    const closedDeals = deals.filter(d => d.payment_status === 'Fully Paid').length;

    setStats({ totalRevenue, totalLeads: leads.length, emailsSent: emails.length, dmsSent: dms.length, closedDeals, postsPublished: posts.length });

    // Pipeline
    const pipe: Record<string, number> = {};
    ['new', 'contacted', 'replied', 'call-booked', 'proposal', 'closed', 'dead'].forEach(s => {
      pipe[s] = leads.filter(l => l.status === s).length;
    });
    setPipeline(pipe);

    // Recent activity
    const activities = [
      ...leads.map(l => ({ date: l.created_at, text: `Lead added: ${l.name} — ${l.business}`, type: 'lead' })),
      ...emails.map(e => ({ date: e.created_at, text: `Email to ${e.sent_to} — ${e.subject}`, type: 'email' })),
      ...dms.map(d => ({ date: d.created_at, text: `DM on ${d.platform} to ${d.sent_to}`, type: 'dm' })),
      ...deals.map(r => ({ date: r.created_at, text: `Deal: ${r.client_name} — $${r.amount}`, type: 'deal' })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
    setRecentActivity(activities);
  };

  const statCards = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'text-blue-400' },
    { label: 'Emails Sent', value: stats.emailsSent, icon: Mail, color: 'text-purple-400' },
    { label: 'DMs Sent', value: stats.dmsSent, icon: MessageCircle, color: 'text-amber-400' },
    { label: 'Closed Deals', value: stats.closedDeals, icon: Briefcase, color: 'text-green-400' },
    { label: 'Posts Published', value: stats.postsPublished, icon: FileText, color: 'text-blue-400' },
  ];

  const pipelineLabels: Record<string, string> = { new: 'New', contacted: 'Contacted', replied: 'Replied', 'call-booked': 'Call Booked', proposal: 'Proposal', closed: 'Closed', dead: 'Dead' };
  const pipelineColors: Record<string, string> = { new: 'bg-muted', contacted: 'bg-blue-500', replied: 'bg-purple-500', 'call-booked': 'bg-amber-500', proposal: 'bg-orange-500', closed: 'bg-green-500', dead: 'bg-red-500' };

  const activityIcons: Record<string, string> = { lead: '◉', email: '✉', dm: '◷', deal: '$' };
  const activityColors: Record<string, string> = { lead: 'text-blue-400', email: 'text-purple-400', dm: 'text-amber-400', deal: 'text-green-400' };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Outreach Dashboard</h2>
        <p className="text-sm text-muted-foreground font-mono">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-mono text-muted-foreground tracking-wider">PIPELINE</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(pipeline).map(([status, count]) => {
              const pct = stats.totalLeads ? Math.round((count / stats.totalLeads) * 100) : 0;
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{pipelineLabels[status] || status}</span>
                    <span className="font-mono">{count}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pipelineColors[status] || 'bg-muted-foreground'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-mono text-muted-foreground tracking-wider">RECENT ACTIVITY</CardTitle></CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">No activity yet — start adding leads!</p>
            ) : (
              <div className="space-y-2">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span className={`text-lg ${activityColors[a.type]}`}>{activityIcons[a.type]}</span>
                    <span className="text-sm flex-1">{a.text}</span>
                    <span className="text-xs text-muted-foreground font-mono">{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOutreachDashboard;
