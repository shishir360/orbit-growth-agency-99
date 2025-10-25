import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
import { Plus, Edit, Trash2, Eye, EyeOff, Globe } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  iframe_url?: string | null;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    iframe_url: '',
    visible: true
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load pages');
      console.error(error);
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      iframe_url: page.iframe_url || '',
      visible: page.visible
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      iframe_url: '',
      visible: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (editingPage) {
      const { error } = await supabase
        .from('pages')
        .update(formData)
        .eq('id', editingPage.id);

      if (error) {
        toast.error('Failed to update page');
        console.error(error);
        return;
      }
      toast.success('Page updated successfully');
    } else {
      const { error } = await supabase
        .from('pages')
        .insert([formData]);

      if (error) {
        toast.error('Failed to create page');
        console.error(error);
        return;
      }
      toast.success('Page created successfully');
    }
    
    fetchPages();
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete page');
        console.error(error);
        return;
      }
      
      toast.success('Page deleted successfully');
      fetchPages();
    }
  };

  const toggleVisibility = async (id: string) => {
    const page = pages.find(p => p.id === id);
    if (!page) return;

    const { error } = await supabase
      .from('pages')
      .update({ visible: !page.visible })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update visibility');
      console.error(error);
      return;
    }

    toast.success('Page visibility updated');
    fetchPages();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages Management</h1>
          <p className="text-gray-600 mt-2">Create and manage your website pages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? 'Edit Page' : 'Create New Page'}
              </DialogTitle>
              <DialogDescription>
                {editingPage ? 'Update page information' : 'Create a new page for your website'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter page title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="/page-url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Page Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Enter page content (leave empty if using iframe)..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iframe_url">External Website URL (iframe)</Label>
                <Input
                  id="iframe_url"
                  value={formData.iframe_url}
                  onChange={(e) => setFormData({...formData, iframe_url: e.target.value})}
                  placeholder="https://example.com (optional - embeds external site)"
                />
                <p className="text-xs text-muted-foreground">
                  If provided, this URL will be embedded with your header/footer
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="visible"
                  checked={formData.visible}
                  onCheckedChange={(checked) => setFormData({...formData, visible: checked})}
                />
                <Label htmlFor="visible">Publish page</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingPage ? 'Update Page' : 'Create Page'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>
            {pages.length} pages total • {pages.filter(p => p.visible).length} published
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {page.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gray-400" />
                      <span className="text-sm font-mono">{page.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={page.visible ? "default" : "secondary"}>
                      {page.visible ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(page.id)}
                      >
                        {page.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(page)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(page.id)}
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

export default AdminPages;