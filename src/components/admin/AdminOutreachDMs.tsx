import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const AdminOutreachDMs = () => {
  const [dms, setDms] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ platform: 'Instagram', sent_to: '', business: '', status: 'Sent', reply: '', notes: '' });

  useEffect(() => { fetchDms(); }, []);

  const fetchDms = async () => {
    const { data } = await supabase.from('outreach_dms').select('*').order('created_at', { ascending: false });
    setDms(data || []);
  };

  const save = async () => {
    if (!form.sent_to) { toast.error('Name is required'); return; }
    await supabase.from('outreach_dms').insert([form]);
    toast.success('DM logged');
    setOpen(false);
    setForm({ platform: 'Instagram', sent_to: '', business: '', status: 'Sent', reply: '', notes: '' });
    fetchDms();
  };

  const del = async (id: string) => {
    await supabase.from('outreach_dms').delete().eq('id', id);
    toast.success('Deleted'); fetchDms();
  };

  const platformColors: Record<string, string> = { Instagram: 'bg-pink-500/20 text-pink-400', LinkedIn: 'bg-blue-500/20 text-blue-400', Facebook: 'bg-purple-500/20 text-purple-400', WhatsApp: 'bg-green-500/20 text-green-400', 'Twitter/X': 'bg-muted text-muted-foreground' };
  const statusColors: Record<string, string> = { Sent: 'bg-muted text-muted-foreground', Seen: 'bg-purple-500/20 text-purple-400', Replied: 'bg-green-500/20 text-green-400', 'Positive Reply': 'bg-green-500/20 text-green-400', 'Not Interested': 'bg-red-500/20 text-red-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">DM Log</h2><p className="text-sm text-muted-foreground">{dms.length} DMs logged</p></div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> Log DM</Button>
      </div>
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Date</TableHead><TableHead>Platform</TableHead><TableHead>To</TableHead>
            <TableHead>Business</TableHead><TableHead>Status</TableHead><TableHead>Reply</TableHead>
            <TableHead>Notes</TableHead><TableHead>Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {dms.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No DMs logged yet</TableCell></TableRow>
            ) : dms.map(d => (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs">{new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${platformColors[d.platform] || ''}`}>{d.platform}</span></TableCell>
                <TableCell className="font-semibold">{d.sent_to}</TableCell>
                <TableCell className="text-muted-foreground">{d.business}</TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[d.status] || ''}`}>{d.status}</span></TableCell>
                <TableCell className="text-xs text-green-400 max-w-[150px] truncate">{d.reply || '—'}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{d.notes || '—'}</TableCell>
                <TableCell><Button variant="ghost" size="sm" className="text-destructive" onClick={() => del(d.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Log DM Sent</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Platform</Label>
              <Select value={form.platform} onValueChange={v => setForm({ ...form, platform: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Instagram','LinkedIn','Facebook','WhatsApp','Twitter/X','Other'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Sent To</Label><Input value={form.sent_to} onChange={e => setForm({ ...form, sent_to: e.target.value })} /></div>
            <div><Label>Business</Label><Input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Sent','Seen','Replied','Positive Reply','Not Interested'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="col-span-2"><Label>Their Reply</Label><Textarea value={form.reply} onChange={e => setForm({ ...form, reply: e.target.value })} /></div>
            <div className="col-span-2"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save DM</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOutreachDMs;
