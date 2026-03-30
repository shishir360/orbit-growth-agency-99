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

const AdminOutreachPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ platform: 'LinkedIn', post_type: 'Tip/Value', post_date: new Date().toISOString().slice(0, 10), status: 'Draft', content: '', likes: 0, comments: 0 });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('outreach_posts').select('*').order('post_date', { ascending: false });
    setPosts(data || []);
  };

  const save = async () => {
    await supabase.from('outreach_posts').insert([form]);
    toast.success('Post saved');
    setOpen(false);
    setForm({ platform: 'LinkedIn', post_type: 'Tip/Value', post_date: new Date().toISOString().slice(0, 10), status: 'Draft', content: '', likes: 0, comments: 0 });
    fetchPosts();
  };

  const del = async (id: string) => {
    await supabase.from('outreach_posts').delete().eq('id', id);
    toast.success('Deleted'); fetchPosts();
  };

  const platformColors: Record<string, string> = { LinkedIn: 'bg-blue-500/20 text-blue-400', Facebook: 'bg-purple-500/20 text-purple-400', Instagram: 'bg-pink-500/20 text-pink-400' };
  const statusColors: Record<string, string> = { Scheduled: 'bg-blue-500/20 text-blue-400', Posted: 'bg-green-500/20 text-green-400', Draft: 'bg-muted text-muted-foreground' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">Post Log</h2><p className="text-sm text-muted-foreground">{posts.length} posts</p></div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> Add Post</Button>
      </div>
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Date</TableHead><TableHead>Platform</TableHead><TableHead>Type</TableHead>
            <TableHead>Content Preview</TableHead><TableHead>Status</TableHead><TableHead>Engagement</TableHead><TableHead>Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No posts yet</TableCell></TableRow>
            ) : posts.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.post_date}</TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${platformColors[p.platform] || ''}`}>{p.platform}</span></TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.post_type}</TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{p.content || '—'}</TableCell>
                <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[p.status] || ''}`}>{p.status}</span></TableCell>
                <TableCell className="text-xs text-amber-400">❤ {p.likes || 0} | 💬 {p.comments || 0}</TableCell>
                <TableCell><Button variant="ghost" size="sm" className="text-destructive" onClick={() => del(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Schedule / Log Post</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Platform</Label>
              <Select value={form.platform} onValueChange={v => setForm({ ...form, platform: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['LinkedIn','Facebook','Instagram','Both LinkedIn+Facebook','All Platforms','Other'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Post Type</Label>
              <Select value={form.post_type} onValueChange={v => setForm({ ...form, post_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Case Study','Before/After','Tip/Value','Testimonial','Offer','Personal Story','Educational'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Date</Label><Input type="date" value={form.post_date} onChange={e => setForm({ ...form, post_date: e.target.value })} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Scheduled','Posted','Draft'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="col-span-2"><Label>Content</Label><Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="min-h-[100px]" /></div>
            <div><Label>Likes</Label><Input type="number" value={form.likes} onChange={e => setForm({ ...form, likes: Number(e.target.value) })} /></div>
            <div><Label>Comments</Label><Input type="number" value={form.comments} onChange={e => setForm({ ...form, comments: Number(e.target.value) })} /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save Post</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOutreachPosts;
