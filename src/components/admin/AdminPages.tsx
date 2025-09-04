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
import { Plus, Edit, Trash2, Eye, EyeOff, Globe } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'About Us',
      slug: '/about',
      content: 'Learn more about our company and mission...',
      visible: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Contact',
      slug: '/contact',
      content: 'Get in touch with our team...',
      visible: true,
      createdAt: '2024-01-16',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Privacy Policy',
      slug: '/privacy',
      content: 'Our privacy policy and data handling...',
      visible: true,
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17'
    }
  ]);

  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    visible: true
  });

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
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
      visible: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingPage) {
      setPages(pages.map(page => 
        page.id === editingPage.id 
          ? { ...page, ...formData, updatedAt: now }
          : page
      ));
    } else {
      const newPage: Page = {
        id: Date.now().toString(),
        ...formData,
        createdAt: now,
        updatedAt: now
      };
      setPages([...pages, newPage]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setPages(pages.map(page => 
      page.id === id 
        ? { ...page, visible: !page.visible }
        : page
    ));
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
                  placeholder="Enter page content..."
                  className="min-h-[100px]"
                />
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
                    {page.updatedAt}
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