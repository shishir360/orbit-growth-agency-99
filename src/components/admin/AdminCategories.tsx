import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { Plus, Edit, Trash2, Folder, Hash } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
  createdAt: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Web Development',
      slug: 'web-development',
      description: 'Articles about web development and programming',
      color: '#3B82F6',
      postCount: 12,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Tips and strategies for digital marketing',
      color: '#10B981',
      postCount: 8,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'AI & Automation',
      slug: 'ai-automation',
      description: 'Latest trends in AI and business automation',
      color: '#8B5CF6',
      postCount: 5,
      createdAt: '2024-01-08'
    }
  ]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6'
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3B82F6'
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const handleSubmit = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingCategory) {
      setCategories(categories.map(category => 
        category.id === editingCategory.id 
          ? { ...category, ...formData }
          : category
      ));
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        postCount: 0,
        createdAt: now
      };
      setCategories([...categories, newCategory]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const colorPresets = [
    '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444',
    '#06B6D4', '#84CC16', '#EC4899', '#6B7280', '#1F2937'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories & Tags</h1>
          <p className="text-gray-600 mt-2">Organize your content with categories and tags</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Update category information' : 'Create a new content category'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="category-url-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of this category"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Category Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-12 h-10 p-1 rounded"
                  />
                  <div className="flex gap-1">
                    {colorPresets.map(color => (
                      <button
                        key={color}
                        type="button"
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData({...formData, color})}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingCategory ? 'Update Category' : 'Add Category'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-sm text-gray-600">Total Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.postCount, 0)}</p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{Math.round(categories.reduce((sum, cat) => sum + cat.postCount, 0) / categories.length) || 0}</p>
                <p className="text-sm text-gray-600">Avg Posts/Category</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            Manage your content categories and their properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500 max-w-[200px] truncate">
                          {category.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.slug}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{category.postCount} posts</Badge>
                  </TableCell>
                  <TableCell>{category.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
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

export default AdminCategories;