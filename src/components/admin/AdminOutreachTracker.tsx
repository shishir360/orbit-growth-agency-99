import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Plus, Minus } from 'lucide-react';

const fields = [
  { key: 'emails_count', label: 'Emails Sent', color: 'text-purple-400', icon: '✉' },
  { key: 'dms_count', label: 'DMs Sent', color: 'text-amber-400', icon: '◷' },
  { key: 'sms_count', label: 'SMS Sent', color: 'text-green-400', icon: '✆' },
  { key: 'calls_count', label: 'Calls Done', color: 'text-blue-400', icon: '☎' },
  { key: 'proposals_count', label: 'Proposals', color: 'text-orange-400', icon: '◻' },
  { key: 'closes_count', label: 'Closes $$$', color: 'text-green-400', icon: '✓' },
];

const AdminOutreachTracker = () => {
  const [today, setToday] = useState<Record<string, number>>({ emails_count: 0, dms_count: 0, sms_count: 0, calls_count: 0, proposals_count: 0, closes_count: 0 });
  const [history, setHistory] = useState<any[]>([]);
  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data: todayData } = await supabase.from('outreach_daily_logs').select('*').eq('log_date', todayStr).maybeSingle();
    if (todayData) {
      setToday({ emails_count: todayData.emails_count || 0, dms_count: todayData.dms_count || 0, sms_count: todayData.sms_count || 0, calls_count: todayData.calls_count || 0, proposals_count: todayData.proposals_count || 0, closes_count: todayData.closes_count || 0 });
    }
    const { data: histData } = await supabase.from('outreach_daily_logs').select('*').order('log_date', { ascending: false }).limit(7);
    setHistory(histData || []);
  };

  const inc = (key: string) => setToday(p => ({ ...p, [key]: (p[key] || 0) + 1 }));
  const dec = (key: string) => setToday(p => ({ ...p, [key]: Math.max(0, (p[key] || 0) - 1) }));

  const saveDay = async () => {
    const { data: existing } = await supabase.from('outreach_daily_logs').select('id').eq('log_date', todayStr).maybeSingle();
    if (existing) {
      await supabase.from('outreach_daily_logs').update({ ...today, updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      await supabase.from('outreach_daily_logs').insert([{ ...today, log_date: todayStr }]);
    }
    toast.success('Day saved!');
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">Daily Tracker</h2><p className="text-sm text-muted-foreground">Count everything you do today</p></div>
        <Button onClick={saveDay}><Save className="h-4 w-4 mr-1" /> Save Day</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {fields.map(f => (
          <Card key={f.key} className="flex flex-col items-center p-5">
            <span className={`text-2xl ${f.color}`}>{f.icon}</span>
            <span className={`text-3xl font-bold font-mono mt-2 ${f.color}`}>{today[f.key] || 0}</span>
            <span className="text-xs text-muted-foreground mt-1">{f.label}</span>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => dec(f.key)}><Minus className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => inc(f.key)}><Plus className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-mono text-muted-foreground tracking-wider">PAST 7 DAYS</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Date</TableHead><TableHead>Emails</TableHead><TableHead>DMs</TableHead>
              <TableHead>SMS</TableHead><TableHead>Calls</TableHead><TableHead>Proposals</TableHead>
              <TableHead>Closes</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No history yet</TableCell></TableRow>
              ) : history.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{new Date(r.log_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                  <TableCell>{r.emails_count}</TableCell><TableCell>{r.dms_count}</TableCell>
                  <TableCell>{r.sms_count}</TableCell><TableCell>{r.calls_count}</TableCell>
                  <TableCell>{r.proposals_count}</TableCell>
                  <TableCell className="text-green-400 font-semibold">{r.closes_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOutreachTracker;
