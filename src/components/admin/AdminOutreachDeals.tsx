import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const AdminOutreachDeals = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ client_name: '', business: '', service: 'Website + AI Chatbot + SEO ($1,000)', amount: 0, payment_status: 'Pending', deal_date: new Date().toISOString().slice(0, 10), notes: '' });

  useEffect(() => { fetchDeals(); }, []);

  const fetchDeals = async () => {
    const { data } = await supabase.from('outreach_deals').select('*').order('deal_date', { ascending: false });
    setDeals(data || []);
  };

  const save = async () => {
    if (!form.client_name) { toast.error('Client name required'); return; }
    await supabase.from('outreach_deals').insert([form]);
    toast.success('Deal saved');
    setOpen(false);
    setForm({ client_name: '', business: '', service: 'Website + AI Chatbot + SEO ($1,000)', amount: 0, payment_status: 'Pending', deal_date: new Date().toISOString().slice(0, 10), notes: '' });
    fetchDeals();
  };

  const del = async (id: string) => {
    await supabase.from('outreach_deals').delete().eq('id', id);
    toast.success('Deleted'); fetchDeals();
  };

  const total = deals.reduce((s, d) => s + Number(d.amount || 0), 0);
  const paid = deals.filter(d => d.payment_status === 'Fully Paid').reduce((s, d) => s + Number(d.amount || 0), 0);
  const pending = total - paid;

  const statusColors: Record<string, string> = { 'Fully Paid': 'bg-green-500/20 text-green-400', '50% Deposit Received': 'bg-amber-500/20 text-amber-400', 'Invoice Sent': 'bg-blue-500/20 text-blue-400', Pending: 'bg-muted text-muted-foreground' };
  const services = ['Website + AI Chatbot + SEO ($1,000)', 'Website Redesign ($500)', 'AI Chatbot Only ($400)', 'Local SEO ($350/mo)', 'Facebook Ads ($400/mo)', 'Google Ads ($400/mo)', 'Full Package ($2,500)', 'Custom'];
  const paymentStatuses = ['50% Deposit Received', 'Fully Paid', 'Invoice Sent', 'Pending'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">Revenue</h2><p className="text-sm text-muted-foreground">Track every dollar closed</p></div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> Add Deal</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-2xl font-bold font-mono text-green-400">${total.toLocaleString()}</div><p className="text-xs text-muted-foreground mt-1">Total Closed</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold font-mono text-blue-400">{deals.length}</div><p className="text-xs text-muted-foreground mt-1">Total Deals</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold font-mono text-green-400">${paid.toLocaleString()}</div><p className="text-xs text-muted-foreground mt-1">Fully Paid</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold font-mono text-amber-400">${pending.toLocaleString()}</div><p className="text-xs text-muted-foreground mt-1">Pending</p></CardContent></Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Date</TableHead><TableHead>Client</TableHead><TableHead>Service</TableHead>
            <TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Notes</TableHead><TableHead>Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {deals.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No revenue yet — close that first deal!</TableCell></TableRow>
            ) : deals.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.deal_date}</TableCell>
                <TableCell className="font-semibold">{r.client_name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.service}</TableCell>
                <TableCell className="text-green-400 font-mono font-bold">${Number(r.amount).toLocaleString()}</TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[r.payment_status] || ''}`}>{r.payment_status}</span></TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.notes || '—'}</TableCell>
                <TableCell><Button variant="ghost" size="sm" className="text-destructive" onClick={() => del(r.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Deal / Revenue</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Client Name</Label><Input value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} /></div>
            <div><Label>Business</Label><Input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} /></div>
            <div className="col-span-2"><Label>Service Sold</Label>
              <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Amount (USD $)</Label><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} /></div>
            <div><Label>Payment Status</Label>
              <Select value={form.payment_status} onValueChange={v => setForm({ ...form, payment_status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{paymentStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Date</Label><Input type="date" value={form.deal_date} onChange={e => setForm({ ...form, deal_date: e.target.value })} /></div>
            <div className="col-span-2"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save Deal</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOutreachDeals;
