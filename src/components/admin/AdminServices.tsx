import React, { useState } from 'react';
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
import { useContent, Service } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';

const AdminServices = () => {
  const { content, updateServices } = useContent();
  const { toast } = useToast();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Globe',
    href: '',
    image: '',
    visible: true,
    order: 1
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      href: service.href,
      image: service.image,
      visible: service.visible,
      order: service.order
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    const maxOrder = Math.max(...content.services.map(s => s.order), 0);
    setFormData({
      title: '',
      description: '',
      icon: 'Globe',
      href: '',
      image: '',
      visible: true,
      order: maxOrder + 1
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    let updatedServices = [...content.services];
    
    if (editingService) {
      updatedServices = updatedServices.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      );
      toast({
        title: "Service updated",
        description: "Service has been updated successfully.",
      });
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...formData,
      };
      updatedServices.push(newService);
      toast({
        title: "Service created",
        description: "New service has been created successfully.",
      });
    }
    updateServices(updatedServices);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updatedServices = content.services.filter(service => service.id !== id);
    updateServices(updatedServices);
    toast({
      title: "Service deleted",
      description: "Service has been deleted successfully.",
    });
  };

  const toggleVisibility = (id: string) => {
    const updatedServices = content.services.map(service => 
      service.id === id 
        ? { ...service, visible: !service.visible }
        : service
    );
    updateServices(updatedServices);
    
    const service = content.services.find(s => s.id === id);
    toast({
      title: "Service visibility updated",
      description: `${service?.title} is now ${service?.visible ? 'hidden' : 'visible'}`,
    });
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
                  <Label htmlFor="href">Service URL</Label>
                  <Input
                    id="href"
                    value={formData.href}
                    onChange={(e) => setFormData({...formData, href: e.target.value})}
                    placeholder="e.g., /website-design"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Service Image Path</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="e.g., /src/assets/website-design-hero.jpg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 1})}
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
            {content.services.length} services total • {content.services.filter(s => s.visible).length} visible
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
              {content.services.map((service) => (
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
                      <span className="text-sm font-mono">{service.href}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.visible ? "default" : "secondary"}>
                      {service.visible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {service.order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(service.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;