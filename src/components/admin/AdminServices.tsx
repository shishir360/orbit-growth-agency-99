import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Plus, Edit, Trash2, Eye, EyeOff, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  page_url: string;
  image_path?: string;
  visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Globe',
    page_url: '',
    image_path: '',
    visible: true,
    display_order: 1
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
      return;
    }

    setServices(data || []);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      page_url: service.page_url,
      image_path: service.image_path || '',
      visible: service.visible,
      display_order: service.display_order
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    const maxOrder = Math.max(...services.map(s => s.display_order), 0);
    setFormData({
      title: '',
      description: '',
      icon: 'Globe',
      page_url: '',
      image_path: '',
      visible: true,
      display_order: maxOrder + 1
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const serviceData = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      page_url: formData.page_url,
      image_path: formData.image_path,
      visible: formData.visible,
      display_order: formData.display_order,
    };

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);

      if (error) {
        console.error('Error updating service:', error);
        toast.error('Failed to update service');
        return;
      }

      toast.success('Service updated successfully');
    } else {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        console.error('Error creating service:', error);
        toast.error('Failed to create service');
        return;
      }

      toast.success('Service created successfully');
    }

    setIsDialogOpen(false);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
      return;
    }

    toast.success('Service deleted successfully');
    fetchServices();
  };

  const toggleVisibility = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({ visible: !service.visible })
      .eq('id', service.id);

    if (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
      return;
    }

    toast.success(service.visible ? 'Service hidden' : 'Service visible');
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-2">Manage your website services</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {editingService ? 'Update service information' : 'Create a new service offering'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter service title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter service description"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({...formData, icon: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Globe">Globe (🌐)</SelectItem>
                      <SelectItem value="Target">Target (🎯)</SelectItem>
                      <SelectItem value="Bot">Bot (🤖)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="page_url">Service URL</Label>
                  <Input
                    id="page_url"
                    value={formData.page_url}
                    onChange={(e) => setFormData({...formData, page_url: e.target.value})}
                    placeholder="e.g., /website-design"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_path">Service Image Path</Label>
                <Input
                  id="image_path"
                  value={formData.image_path}
                  onChange={(e) => setFormData({...formData, image_path: e.target.value})}
                  placeholder="e.g., /src/assets/website-design-hero.jpg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 1})}
                    placeholder="1"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="visible"
                    checked={formData.visible}
                    onCheckedChange={(checked) => setFormData({...formData, visible: checked})}
                  />
                  <Label htmlFor="visible">Visible on website</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>
            {services.length} services total • {services.filter(s => s.visible).length} visible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Icon & URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{service.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {service.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{service.icon}</span>
                      <Globe className="w-3 h-3 text-gray-400" />
                      <span className="text-sm font-mono">{service.page_url}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.visible ? "default" : "secondary"}>
                      {service.visible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {service.display_order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(service)}
                      >
                        {service.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {services.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No services yet. Click "Add Service" to create one.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;
