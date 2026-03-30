import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const platformColors: Record<string, string> = { LinkedIn: 'bg-blue-500', Facebook: 'bg-purple-500', Instagram: 'bg-pink-500', Other: 'bg-amber-500' };

const AdminOutreachCalendar = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('outreach_posts').select('*');
    setPosts(data || []);
  };

  const changeMonth = (d: number) => {
    let m = month + d;
    let y = year;
    if (m > 11) { m = 0; y++; }
    else if (m < 0) { m = 11; y--; }
    setMonth(m);
    setYear(y);
  };

  const firstDay = new Date(year, month, 1);
  let startDow = firstDay.getDay();
  if (startDow === 0) startDow = 7;
  startDow--;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Calendar</h2>
          <p className="text-sm text-muted-foreground">{months[month]} {year}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => changeMonth(-1)}><ChevronLeft className="h-4 w-4" /> Prev</Button>
          <Button variant="outline" size="sm" onClick={() => changeMonth(1)}>Next <ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(d => (
            <div key={d} className="text-center text-xs font-mono text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayPosts = posts.filter(p => p.post_date === dateStr);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <div key={dateStr} className={`min-h-[80px] rounded-lg border p-2 transition-colors cursor-pointer hover:border-primary ${isToday ? 'border-primary bg-primary/5' : dayPosts.length > 0 ? 'border-blue-500/40 bg-blue-500/5' : 'border-border bg-muted/30'}`}>
                <div className="text-xs font-mono text-muted-foreground mb-1">{day}</div>
                <div className="space-y-1">
                  {dayPosts.slice(0, 3).map(p => {
                    const plat = p.platform.split('+')[0].trim();
                    const color = platformColors[plat] || 'bg-amber-500';
                    return <div key={p.id} className={`w-2 h-2 rounded-full ${color}`} title={`${p.platform}: ${p.post_type}`} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex gap-4 text-xs text-muted-foreground">
        {Object.entries(platformColors).map(([name, color]) => (
          <div key={name} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} /> {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOutreachCalendar;
