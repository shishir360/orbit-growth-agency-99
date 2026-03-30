import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, RotateCcw, CheckCircle2 } from 'lucide-react';

const PRESET_TASKS = [
  { group: 'MORNING — Lead Gen', tasks: [
    { id: 'p01', time: '9:00 AM', title: 'Export 50 leads from Apollo.io', desc: 'Filter: USA/AU, your target niche, has website.', cat: 'green' },
    { id: 'p02', time: '9:30 AM', title: 'Research 10 leads on Google Maps', desc: 'Search "[niche] [city]" — collect name, website, email.', cat: 'green' },
    { id: 'p03', time: '10:00 AM', title: 'Find emails via Hunter.io (5 priority leads)', desc: 'Use domain → get owner email. Save in CRM.', cat: 'green' },
  ]},
  { group: 'EMAIL OUTREACH', tasks: [
    { id: 'p04', time: '10:30 AM', title: 'Send 30 cold emails via Brevo / Gmail', desc: 'Use tested subject lines. Personalize first line.', cat: 'blue' },
    { id: 'p05', time: '11:00 AM', title: 'Follow up Day 3 leads (email sequence)', desc: 'Check who opened but didn\'t reply → send follow-up.', cat: 'blue' },
    { id: 'p06', time: '11:30 AM', title: 'Log all emails sent in dashboard', desc: 'Name, subject, status — keep CRM updated.', cat: 'purple' },
  ]},
  { group: 'DM OUTREACH', tasks: [
    { id: 'p07', time: '12:00 PM', title: 'Send 20 Instagram DMs to business owners', desc: 'Comment first, then DM with personalized script.', cat: 'amber' },
    { id: 'p08', time: '12:30 PM', title: 'Send 20 LinkedIn connection requests + note', desc: '300-char note = your first DM.', cat: 'amber' },
    { id: 'p09', time: '1:00 PM', title: 'Engage in 2 Facebook Groups (comment + DM)', desc: 'Add value, then DM engagers.', cat: 'amber' },
  ]},
  { group: 'CONTENT', tasks: [
    { id: 'p10', time: '1:30 PM', title: 'Post 1 piece of content on LinkedIn', desc: 'Case study / tip / testimonial / before-after.', cat: 'purple' },
    { id: 'p11', time: '1:45 PM', title: 'Cross-post same content to Facebook Page', desc: 'Same content, use Meta Business Suite.', cat: 'purple' },
    { id: 'p12', time: '2:00 PM', title: 'Reply to all comments + DMs received', desc: 'Every reply is a potential lead.', cat: 'purple' },
  ]},
  { group: 'FOLLOW-UPS & SALES', tasks: [
    { id: 'p13', time: '2:30 PM', title: 'Follow up ALL pending email replies', desc: 'Reply to interested leads → push for discovery call.', cat: 'green' },
    { id: 'p14', time: '3:00 PM', title: 'Follow up DM conversations', desc: 'Nurture warm leads → move to discovery call.', cat: 'green' },
    { id: 'p15', time: '3:30 PM', title: 'Run scheduled discovery calls', desc: 'PROBLEM → SOLUTION → PRICE → CLOSE.', cat: 'green' },
    { id: 'p16', time: '4:30 PM', title: 'Send proposals to today\'s call leads', desc: 'Send within 30 mins while they\'re warm.', cat: 'green' },
  ]},
  { group: 'EVENING — ADMIN', tasks: [
    { id: 'p17', time: '5:30 PM', title: 'Update Daily Tracker', desc: 'Log today\'s numbers. Be honest.', cat: 'blue' },
    { id: 'p18', time: '5:45 PM', title: 'Add all new leads to CRM', desc: 'Every lead touched today should be updated.', cat: 'blue' },
    { id: 'p19', time: '6:00 PM', title: 'Plan tomorrow — review lead list', desc: 'Export tomorrow\'s leads now. Set up batch emails.', cat: 'blue' },
  ]},
];

const catColors: Record<string, string> = { green: 'bg-green-500/15 text-green-400', blue: 'bg-blue-500/15 text-blue-400', purple: 'bg-purple-500/15 text-purple-400', amber: 'bg-amber-500/15 text-amber-400', red: 'bg-red-500/15 text-red-400' };

const AdminOutreachTasks = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [customTasks, setCustomTasks] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', time_slot: '', category: 'blue' });
  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const { data } = await supabase.from('outreach_tasks').select('*').eq('task_date', todayStr);
    if (data) {
      const c: Record<string, boolean> = {};
      const custom: any[] = [];
      data.forEach(t => {
        if (t.title.startsWith('__check__')) {
          c[t.title.replace('__check__', '')] = t.is_checked || false;
        } else {
          custom.push(t);
        }
      });
      setChecked(c);
      setCustomTasks(custom);
    }
  };

  const togglePreset = async (taskId: string) => {
    const newVal = !checked[taskId];
    setChecked(p => ({ ...p, [taskId]: newVal }));
    const key = '__check__' + taskId;
    const { data: existing } = await supabase.from('outreach_tasks').select('id').eq('title', key).eq('task_date', todayStr).maybeSingle();
    if (existing) {
      await supabase.from('outreach_tasks').update({ is_checked: newVal }).eq('id', existing.id);
    } else {
      await supabase.from('outreach_tasks').insert([{ title: key, is_checked: newVal, task_date: todayStr, category: 'blue' }]);
    }
  };

  const toggleCustom = async (task: any) => {
    await supabase.from('outreach_tasks').update({ is_checked: !task.is_checked }).eq('id', task.id);
    fetchTasks();
  };

  const addCustom = async () => {
    if (!form.title) { toast.error('Title required'); return; }
    await supabase.from('outreach_tasks').insert([{ ...form, task_date: todayStr, is_checked: false }]);
    toast.success('Task added');
    setOpen(false);
    setForm({ title: '', description: '', time_slot: '', category: 'blue' });
    fetchTasks();
  };

  const deleteCustom = async (id: string) => {
    await supabase.from('outreach_tasks').delete().eq('id', id);
    fetchTasks();
  };

  const resetDay = async () => {
    if (!confirm('Reset all tasks for today?')) return;
    await supabase.from('outreach_tasks').delete().eq('task_date', todayStr);
    setChecked({});
    setCustomTasks([]);
    toast.success('Day reset');
  };

  const allPresets = PRESET_TASKS.flatMap(g => g.tasks);
  const totalTasks = allPresets.length + customTasks.length;
  const doneTasks = allPresets.filter(t => checked[t.id]).length + customTasks.filter(t => t.is_checked).length;
  const pct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">Daily Tasks</h2><p className="text-sm text-muted-foreground">{doneTasks} of {totalTasks} tasks completed</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetDay}><RotateCcw className="h-4 w-4 mr-1" /> Reset Day</Button>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> Add Task</Button>
        </div>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 p-5">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <circle cx="32" cy="32" r="26" fill="none" stroke={pct === 100 ? '#22c55e' : pct > 50 ? '#3b82f6' : '#f59e0b'} strokeWidth="6" strokeLinecap="round" strokeDasharray="163.4" strokeDashoffset={163.4 - (pct / 100 * 163.4)} transform="rotate(-90 32 32)" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
              <text x="32" y="36" textAnchor="middle" className="fill-foreground text-xs font-mono" fontSize="13">{pct}%</text>
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold">{doneTasks}/{totalTasks}</div>
            <p className="text-xs text-muted-foreground">tasks done today</p>
            <p className="text-xs text-green-400 font-mono mt-1">{pct === 100 ? 'All done! 🔥' : pct > 60 ? 'Almost there!' : pct > 0 ? 'Keep pushing!' : "Let's go!"}</p>
          </div>
        </Card>
        <Card className="p-5 col-span-2">
          <p className="text-xs text-muted-foreground font-mono tracking-wider mb-3">TODAY'S QUICK STATS</p>
          <div className="grid grid-cols-4 gap-2">
            {[{ l: 'Lead Gen', c: 'text-green-400', v: allPresets.slice(0, 3).filter(t => checked[t.id]).length },
              { l: 'Emails', c: 'text-blue-400', v: allPresets.slice(3, 6).filter(t => checked[t.id]).length },
              { l: 'DMs', c: 'text-amber-400', v: allPresets.slice(6, 9).filter(t => checked[t.id]).length },
              { l: 'Sales', c: 'text-green-400', v: allPresets.slice(12, 16).filter(t => checked[t.id]).length },
            ].map(s => (
              <div key={s.l} className="bg-muted/50 rounded-lg p-3 text-center">
                <div className={`text-xl font-bold font-mono ${s.c}`}>{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Task Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRESET_TASKS.map(group => (
          <Card key={group.group} className="p-4">
            <h3 className="text-xs font-mono text-muted-foreground tracking-wider border-b border-border pb-2 mb-3">{group.group}</h3>
            <div className="space-y-1">
              {group.tasks.map(task => {
                const isDone = !!checked[task.id];
                return (
                  <div key={task.id} className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${isDone ? 'opacity-50' : ''}`} onClick={() => togglePreset(task.id)}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${isDone ? 'bg-green-500 border-green-500' : 'border-border'}`}>
                      {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isDone ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{task.desc}</p>
                      <span className={`inline-block text-[10px] font-mono px-1.5 py-0.5 rounded mt-1 ${catColors[task.cat]}`}>{task.cat}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/60 flex-shrink-0">{task.time}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Tasks */}
      {customTasks.length > 0 && (
        <Card className="p-4">
          <h3 className="text-xs font-mono text-muted-foreground tracking-wider border-b border-border pb-2 mb-3">CUSTOM TASKS</h3>
          <div className="space-y-1">
            {customTasks.map(task => (
              <div key={task.id} className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-muted/50 ${task.is_checked ? 'opacity-50' : ''}`} onClick={() => toggleCustom(task)}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${task.is_checked ? 'bg-green-500 border-green-500' : 'border-border'}`}>
                  {task.is_checked && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${task.is_checked ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                  {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
                </div>
                <Button variant="ghost" size="sm" className="text-destructive h-6 w-6 p-0" onClick={e => { e.stopPropagation(); deleteCustom(task.id); }}><Trash2 className="h-3 w-3" /></Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Custom Task</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label>Task Name</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Follow up with 10 hot leads" /></div>
            <div className="col-span-2"><Label>Description</Label><Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Time Slot</Label><Input value={form.time_slot} onChange={e => setForm({ ...form, time_slot: e.target.value })} placeholder="e.g. 2:00 PM" /></div>
            <div><Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Outreach</SelectItem>
                  <SelectItem value="green">Lead Gen</SelectItem>
                  <SelectItem value="amber">Content</SelectItem>
                  <SelectItem value="purple">Sales</SelectItem>
                  <SelectItem value="red">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={addCustom}>Add Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOutreachTasks;
