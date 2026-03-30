import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
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

const statusColors: Record<string, string> = {
  Sent: 'bg-muted text-muted-foreground', Opened: 'bg-blue-500/20 text-blue-400',
  Replied: 'bg-green-500/20 text-green-400', Bounced: 'bg-red-500/20 text-red-400',
  Unsubscribed: 'bg-red-500/20 text-red-400',
};

const AdminOutreachEmails = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ sent_to: '', business: '', email_address: '', subject: '', status: 'Sent', followup_date: '', notes: '' });

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    const { data } = await supabase.from('outreach_emails').select('*').order('created_at', { ascending: false });
    setEmails(data || []);
  };

  const save = async () => {
    if (!form.sent_to) { toast.error('Name is required'); return; }
    await supabase.from('outreach_emails').insert([{ ...form, followup_date: form.followup_date || null }]);
    toast.success('Email logged');
    setOpen(false);
    setForm({ sent_to: '', business: '', email_address: '', subject: '', status: 'Sent', followup_date: '', notes: '' });
    fetch();
  };

  const del = async (id: string) => {
    await supabase.from('outreach_emails').delete().eq('id', id);
    toast.success('Deleted'); fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">Email Log</h2><p className="text-sm text-muted-foreground">{emails.length} emails logged</p></div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> Log Email</Button>
      </div>
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Date</TableHead><TableHead>To</TableHead><TableHead>Business</TableHead>
            <TableHead>Subject</TableHead><TableHead>Status</TableHead><TableHead>Follow-up</TableHead>
            <TableHead>Notes</TableHead><TableHead>Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {emails.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No emails logged yet</TableCell></TableRow>
            ) : emails.map(e => (
              <TableRow key={e.id}>
                <TableCell className="font-mono text-xs">{new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</TableCell>
                <TableCell className="font-semibold">{e.sent_to}</TableCell>
                <TableCell className="text-muted-foreground">{e.business}</TableCell>
                <TableCell className="text-sm">{e.subject}</TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[e.status] || ''}`}>{e.status}</span></TableCell>
                <TableCell className="font-mono text-xs text-amber-400">{e.followup_date || '—'}</TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">{e.notes || '—'}</TableCell>
                <TableCell><Button variant="ghost" size="sm" className="text-destructive" onClick={() => del(e.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Log Email Sent</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Sent To (Name)</Label><Input value={form.sent_to} onChange={e => setForm({ ...form, sent_to: e.target.value })} /></div>
            <div><Label>Business</Label><Input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} /></div>
            <div className="col-span-2"><Label>Email Address</Label><Input value={form.email_address} onChange={e => setForm({ ...form, email_address: e.target.value })} /></div>
            <div className="col-span-2"><Label>Subject Line</Label><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Sent','Opened','Replied','Bounced','Unsubscribed'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Follow-up Date</Label><Input type="date" value={form.followup_date} onChange={e => setForm({ ...form, followup_date: e.target.value })} /></div>
            <div className="col-span-2"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save Email</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOutreachEmails;
