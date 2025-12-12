import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Zap, MessageCircle, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface AutomationRule {
  id: string;
  name: string;
  trigger_keywords: string[];
  response_message: string;
  send_dm: boolean;
  is_active: boolean;
  dm_count: number;
  last_triggered_at: string | null;
  created_at: string;
  updated_at: string;
}

const AdminSocialAutomation = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    keywords: '',
    response_message: '',
    send_dm: true,
  });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules((data as AutomationRule[]) || []);
    } catch (error) {
      console.error('Error fetching rules:', error);
      toast.error('Failed to load automation rules');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.keywords || !formData.response_message) {
      toast.error('Please fill in all required fields');
      return;
    }

    const keywords = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
    
    try {
      if (editingRule) {
        const { error } = await supabase
          .from('automation_rules')
          .update({
            name: formData.name,
            trigger_keywords: keywords,
            response_message: formData.response_message,
            send_dm: formData.send_dm,
          })
          .eq('id', editingRule.id);

        if (error) throw error;
        toast.success('Rule updated successfully');
      } else {
        const { error } = await supabase
          .from('automation_rules')
          .insert({
            name: formData.name,
            trigger_keywords: keywords,
            response_message: formData.response_message,
            send_dm: formData.send_dm,
          });

        if (error) throw error;
        toast.success('Rule created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchRules();
    } catch (error) {
      console.error('Error saving rule:', error);
      toast.error('Failed to save rule');
    }
  };

  const handleToggleActive = async (rule: AutomationRule) => {
    try {
      const { error } = await supabase
        .from('automation_rules')
        .update({ is_active: !rule.is_active })
        .eq('id', rule.id);

      if (error) throw error;
      
      setRules(rules.map(r => 
        r.id === rule.id ? { ...r, is_active: !r.is_active } : r
      ));
      toast.success(`Rule ${!rule.is_active ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast.error('Failed to update rule');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rule?')) return;

    try {
      const { error } = await supabase
        .from('automation_rules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Rule deleted');
      fetchRules();
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast.error('Failed to delete rule');
    }
  };

  const openEditDialog = (rule: AutomationRule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      keywords: rule.trigger_keywords.join(', '),
      response_message: rule.response_message,
      send_dm: rule.send_dm,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingRule(null);
    setFormData({
      name: '',
      keywords: '',
      response_message: '',
      send_dm: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Share2 className="h-6 w-6 text-primary" />
            Social Automation
          </h2>
          <p className="text-muted-foreground mt-1">
            Create keyword-triggered auto-responses for social media
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingRule ? 'Edit Automation Rule' : 'Create Automation Rule'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Free PDF Download"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Trigger Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., FREE, PDF, LINK, DOWNLOAD"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  When users comment with these keywords, the auto-response triggers
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response">Auto-Response Message</Label>
                <Textarea
                  id="response"
                  placeholder="Thanks for your interest! Check your DM for the link..."
                  value={formData.response_message}
                  onChange={(e) => setFormData({ ...formData, response_message: e.target.value })}
                  rows={4}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="send_dm">Send as DM</Label>
                  <p className="text-xs text-muted-foreground">
                    Send response via Direct Message
                  </p>
                </div>
                <Switch
                  id="send_dm"
                  checked={formData.send_dm}
                  onCheckedChange={(checked) => setFormData({ ...formData, send_dm: checked })}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rules List */}
      {rules.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Zap className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Automation Rules</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first rule to automate social media responses
            </p>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create First Rule
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {rules.map((rule) => (
            <Card key={rule.id} className={`transition-all ${!rule.is_active ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {rule.name}
                      {rule.is_active ? (
                        <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </CardTitle>
                    
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {rule.trigger_keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-mono">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.is_active}
                      onCheckedChange={() => handleToggleActive(rule)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Response Preview */}
                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {rule.response_message}
                  </p>
                </div>
                
                {/* Stats & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {rule.dm_count} DMs sent
                    </span>
                    {rule.last_triggered_at && (
                      <span>
                        Last triggered {formatDistanceToNow(new Date(rule.last_triggered_at), { addSuffix: true })}
                      </span>
                    )}
                    {rule.send_dm && (
                      <Badge variant="secondary" className="text-xs">
                        DM Response
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(rule)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSocialAutomation;
