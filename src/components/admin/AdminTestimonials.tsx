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
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { useContent, Testimonial } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';

const AdminTestimonials = () => {
  const { content, updateTestimonials } = useContent();
  const { toast } = useToast();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    role: '',
    company: '',
    image: '',
    visible: true,
    order: 1
  });

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      role: testimonial.role,
      company: testimonial.company,
      image: testimonial.image,
      visible: testimonial.visible,
      order: testimonial.order
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    const maxOrder = Math.max(...content.testimonials.map(t => t.order), 0);
    setFormData({
      quote: '',
      author: '',
      role: '',
      company: '',
      image: '',
      visible: true,
      order: maxOrder + 1
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    let updatedTestimonials = [...content.testimonials];
    
    if (editingTestimonial) {
      updatedTestimonials = updatedTestimonials.map(testimonial => 
        testimonial.id === editingTestimonial.id 
          ? { ...testimonial, ...formData }
          : testimonial
      );
      toast({
        title: "Testimonial updated",
        description: "Testimonial has been updated successfully.",
      });
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...formData,
      };
      updatedTestimonials.push(newTestimonial);
      toast({
        title: "Testimonial created",
        description: "New testimonial has been created successfully.",
      });
    }
    updateTestimonials(updatedTestimonials);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updatedTestimonials = content.testimonials.filter(testimonial => testimonial.id !== id);
    updateTestimonials(updatedTestimonials);
    toast({
      title: "Testimonial deleted",
      description: "Testimonial has been deleted successfully.",
    });
  };

  const toggleVisibility = (id: string) => {
    const updatedTestimonials = content.testimonials.map(testimonial => 
      testimonial.id === id 
        ? { ...testimonial, visible: !testimonial.visible }
        : testimonial
    );
    updateTestimonials(updatedTestimonials);
    
    const testimonial = content.testimonials.find(t => t.id === id);
    toast({
      title: "Testimonial visibility updated",
      description: `Testimonial by ${testimonial?.author} is now ${testimonial?.visible ? 'hidden' : 'visible'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
          <p className="text-gray-600 mt-2">Manage customer testimonials and reviews</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'Update testimonial information' : 'Create a new customer testimonial'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quote">Testimonial Quote</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData({...formData, quote: e.target.value})}
                  placeholder="Enter the customer's testimonial..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Customer Name</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="e.g., Sarah Johnson"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="e.g., CEO"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g., TechStartup Inc"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://images.unsplash.com/photo-..."
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
                {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>
            {content.testimonials.length} testimonials total • {content.testimonials.filter(t => t.visible).length} visible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Quote Preview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face';
                        }}
                      />
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate text-sm text-gray-600">
                      "{testimonial.quote}"
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={testimonial.visible ? "default" : "secondary"}>
                      {testimonial.visible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {testimonial.order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(testimonial.id)}
                      >
                        {testimonial.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(testimonial.id)}
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

export default AdminTestimonials;