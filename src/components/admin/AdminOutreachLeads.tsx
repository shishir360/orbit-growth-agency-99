import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

type Lead = {
  id: string; name: string; business: string; email: string; phone: string | null;
  platform: string; niche: string; status: string; country: string; website: string | null; notes: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: 'bg-muted text-muted-foreground', contacted: 'bg-blue-500/20 text-blue-400',
  replied: 'bg-purple-500/20 text-purple-400', 'call-booked': 'bg-amber-500/20 text-amber-400',
  proposal: 'bg-orange-500/20 text-orange-400', closed: 'bg-green-500/20 text-green-400',
  dead: 'bg-red-500/20 text-red-400',
};

const AdminOutreachLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', platform: 'Google Maps', niche: 'Other', status: 'new', country: 'USA', website: '', notes: '' });

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    const { data } = await supabase.from('outreach_leads').select('*').order('created_at', { ascending: false });
    setLeads(data || []);
  };

  const filtered = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.business.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', business: '', email: '', phone: '', platform: 'Google Maps', niche: 'Other', status: 'new', country: 'USA', website: '', notes: '' });
    setOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setEditing(lead);
    setForm({ name: lead.name, business: lead.business, email: lead.email, phone: lead.phone || '', platform: lead.platform, niche: lead.niche, status: lead.status, country: lead.country, website: lead.website || '', notes: lead.notes || '' });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name) { toast.error('Name is required'); return; }
    if (editing) {
      await supabase.from('outreach_leads').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id);
      toast.success('Lead updated');
    } else {
      await supabase.from('outreach_leads').insert([form]);
      toast.success('Lead added');
    }
    setOpen(false);
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await supabase.from('outreach_leads').delete().eq('id', id);
    toast.success('Lead deleted');
    fetchLeads();
  };

  const platforms = ['Google Maps', 'Apollo.io', 'LinkedIn', 'Instagram', 'Facebook', 'Yelp', 'Other'];
  const niches = ['Med Spa', 'Dentist', 'Chiropractor', 'Real Estate', 'Restaurant', 'Gym/Trainer', 'Plumber/HVAC', 'Law Firm', 'Salon', 'Other'];
  const statuses = [{ v: 'new', l: 'New' }, { v: 'contacted', l: 'Contacted' }, { v: 'replied', l: 'Replied' }, { v: 'call-booked', l: 'Call Booked' }, { v: 'proposal', l: 'Proposal Sent' }, { v: 'closed', l: 'Closed ✓' }, { v: 'dead', l: 'Dead' }];
  const countries = ['USA', 'Australia', 'Canada', 'UK', 'Bangladesh', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Leads CRM</h2>
          <p className="text-sm text-muted-foreground">{leads.length} leads total, {filtered.length} shown</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-64" />
          </div>
          <Button onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add Lead</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Business</TableHead><TableHead>Email</TableHead>
              <TableHead>Phone</TableHead><TableHead>Platform</TableHead><TableHead>Status</TableHead>
              <TableHead>Niche</TableHead><TableHead>Notes</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No leads yet — add your first lead!</TableCell></TableRow>
            ) : filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell className="font-semibold">{l.name}</TableCell>
                <TableCell className="text-muted-foreground">{l.business}</TableCell>
                <TableCell className="font-mono text-xs">{l.email}</TableCell>
                <TableCell className="font-mono text-xs">{l.phone || '—'}</TableCell>
                <TableCell><Badge variant="secondary">{l.platform}</Badge></TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[l.status] || ''}`}>{l.status}</span></TableCell>
                <TableCell className="text-xs text-muted-foreground">{l.niche}</TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">{l.notes || '—'}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(l)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteLead(l.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Lead' : 'Add Lead'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Business</Label><Input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} /></div>
            <div><Label>Email</Label><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Platform</Label>
              <Select value={form.platform} onValueChange={v => setForm({ ...form, platform: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Niche</Label>
              <Select value={form.niche} onValueChange={v => setForm({ ...form, niche: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{niches.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{statuses.map(s => <SelectItem key={s.v} value={s.v}>{s.l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Country</Label>
              <Select value={form.country} onValueChange={v => setForm({ ...form, country: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="col-span-2"><Label>Website</Label><Input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} /></div>
            <div className="col-span-2"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? 'Update' : 'Save'} Lead</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOutreachLeads;
