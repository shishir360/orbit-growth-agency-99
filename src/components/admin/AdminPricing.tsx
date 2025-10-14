import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PricingPlan {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_period: string | null;
  features: string[];
  popular: boolean;
  visible: boolean;
  display_order: number;
}

const AdminPricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    service_name: '',
    price: '',
    currency: 'USD',
    billing_period: 'monthly',
    features: '',
    popular: false,
    visible: true,
    display_order: 1,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to load pricing plans');
      console.error(error);
    } else {
      setPlans(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      service_name: plan.service_name,
      price: plan.price.toString(),
      currency: plan.currency,
      billing_period: plan.billing_period || 'monthly',
      features: plan.features.join('\n'),
      popular: plan.popular,
      visible: plan.visible,
      display_order: plan.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPlan(null);
    setFormData({
      service_name: '',
      price: '',
      currency: 'USD',
      billing_period: 'monthly',
      features: '',
      popular: false,
      visible: true,
      display_order: plans.length + 1,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const featuresArray = formData.features
      .split('\n')
      .filter(f => f.trim() !== '')
      .map(f => f.trim());

    const dataToSubmit = {
      service_name: formData.service_name,
      price: parseFloat(formData.price),
      currency: formData.currency,
      billing_period: formData.billing_period,
      features: featuresArray,
      popular: formData.popular,
      visible: formData.visible,
      display_order: formData.display_order,
    };
    
    if (editingPlan) {
      const { error } = await supabase
        .from('pricing')
        .update(dataToSubmit)
        .eq('id', editingPlan.id);

      if (error) {
        toast.error('Failed to update pricing plan');
        console.error(error);
        return;
      }
      toast.success('Pricing plan updated successfully');
    } else {
      const { error } = await supabase
        .from('pricing')
        .insert([dataToSubmit]);

      if (error) {
        toast.error('Failed to create pricing plan');
        console.error(error);
        return;
      }
      toast.success('Pricing plan created successfully');
    }
    
    fetchPlans();
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      const { error } = await supabase
        .from('pricing')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete pricing plan');
        console.error(error);
        return;
      }
      
      toast.success('Pricing plan deleted successfully');
      fetchPlans();
    }
  };

  const toggleVisibility = async (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (!plan) return;

    const { error } = await supabase
      .from('pricing')
      .update({ visible: !plan.visible })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update visibility');
      console.error(error);
      return;
    }

    toast.success('Visibility updated');
    fetchPlans();
  };

  const togglePopular = async (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (!plan) return;

    const { error } = await supabase
      .from('pricing')
      .update({ popular: !plan.popular })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update popular status');
      console.error(error);
      return;
    }

    toast.success('Popular status updated');
    fetchPlans();
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pricing Management</h2>
          <p className="text-muted-foreground">Manage your pricing plans and services</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Pricing Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service_name">Service Name</Label>
                <Input
                  id="service_name"
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="BDT">BDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing_period">Billing Period</Label>
                <Select
                  value={formData.billing_period}
                  onValueChange={(value) => setFormData({ ...formData, billing_period: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={6}
                  placeholder="Enter each feature on a new line"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="visible"
                  checked={formData.visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
                />
                <Label htmlFor="visible">Visible</Label>
              </div>

              <Button type="submit" className="w-full">
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No pricing plans found. Add your first plan to get started.
                </TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.service_name}</TableCell>
                  <TableCell>
                    {plan.currency} {plan.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{plan.billing_period}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {plan.features.slice(0, 2).join(', ')}
                      {plan.features.length > 2 && '...'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePopular(plan.id)}
                    >
                      <Star
                        className={`w-4 h-4 ${plan.popular ? 'fill-yellow-400 text-yellow-400' : ''}`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={plan.visible}
                      onCheckedChange={() => toggleVisibility(plan.id)}
                    />
                  </TableCell>
                  <TableCell>{plan.display_order}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(plan.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPricing;
