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
import { Plus, Edit, Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image_url?: string;
  visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    role: '',
    company: '',
    image_url: '',
    visible: true,
    display_order: 1
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
      return;
    }

    setTestimonials(data || []);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      role: testimonial.role,
      company: testimonial.company,
      image_url: testimonial.image_url || '',
      visible: testimonial.visible,
      display_order: testimonial.display_order
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    const maxOrder = Math.max(...testimonials.map(t => t.display_order), 0);
    setFormData({
      quote: '',
      author: '',
      role: '',
      company: '',
      image_url: '',
      visible: true,
      display_order: maxOrder + 1
    });
    setIsDialogOpen(true);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
    let imageUrl = formData.image_url;
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const testimonialData = {
      quote: formData.quote,
      author: formData.author,
      role: formData.role,
      company: formData.company,
      image_url: imageUrl,
      visible: formData.visible,
      display_order: formData.display_order,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', editingTestimonial.id);

      if (error) {
        console.error('Error updating testimonial:', error);
        toast.error('Failed to update testimonial');
        return;
      }

      toast.success('Testimonial updated successfully');
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([testimonialData]);

      if (error) {
        console.error('Error creating testimonial:', error);
        toast.error('Failed to create testimonial');
        return;
      }

      toast.success('Testimonial created successfully');
    }

    setIsDialogOpen(false);
    setImageFile(null);
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
      return;
    }

    toast.success('Testimonial deleted successfully');
    fetchTestimonials();
  };

  const toggleVisibility = async (testimonial: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ visible: !testimonial.visible })
      .eq('id', testimonial.id);

    if (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
      return;
    }

    toast.success(testimonial.visible ? 'Testimonial hidden' : 'Testimonial visible');
    fetchTestimonials();
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
                  required
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="e.g., CEO"
                    required
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {editingTestimonial?.image_url && !imageFile && (
                  <p className="text-sm text-gray-500 mt-1">Current image will be kept</p>
                )}
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
            {testimonials.length} testimonials total • {testimonials.filter(t => t.visible).length} visible
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
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {testimonial.image_url && (
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
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
                    {testimonial.display_order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(testimonial)}
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
          {testimonials.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No testimonials yet. Click "Add Testimonial" to create one.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestimonials;
