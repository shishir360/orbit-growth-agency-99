import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Plus, Edit, Trash2, Eye, Upload, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: string;
  image_url?: string;
  project_url?: string;
  technologies?: string[];
  published: boolean;
  blocked: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const slugify = (v: string) => v.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '',
    project_url: '',
    technologies: '',
    published: true,
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
      return;
    }

    setProjects(data || []);
  };

  const handleEdit = (project: PortfolioItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: project.content || '',
      category: project.category,
      project_url: project.project_url || '',
      technologies: project.technologies?.join(', ') || '',
      published: project.published,
      featured: project.featured,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      content: '',
      category: '',
      project_url: '',
      technologies: '',
      published: true,
      featured: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const normalizedSlug = slugify(formData.slug || formData.title);

      let imageUrl = editingProject?.image_url || undefined;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) {
          toast.error('Failed to upload image');
          return;
        }
        imageUrl = uploadedUrl;
      }

      const techArray = formData.technologies
        ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      const projectData = {
        title: formData.title.trim(),
        slug: normalizedSlug,
        description: formData.description.trim(),
        content: formData.content?.trim() || null,
        category: formData.category.trim(),
        image_url: imageUrl || null,
        project_url: formData.project_url?.trim() || null,
        technologies: techArray,
        published: formData.published,
        blocked: false,
        featured: formData.featured,
      };

      const schema = z.object({
        title: z.string().trim().min(2).max(150),
        slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        description: z.string().trim().min(10).max(500),
        content: z.string().nullable().optional(),
        category: z.string().trim().min(2).max(100),
        image_url: z.string().url().nullable().optional(),
        project_url: z.string().url().nullable().optional(),
        technologies: z.array(z.string()).optional(),
        published: z.boolean(),
        blocked: z.boolean(),
        featured: z.boolean(),
      });

      const validData = schema.parse(projectData);

      if (editingProject) {
      const { error } = await supabase
        .from('portfolio')
        .update(validData as any)
        .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([validData as any]);

        if (error) throw error;
        toast.success('Project created successfully');
      }

      setIsDialogOpen(false);
      setImageFile(null);
      fetchProjects();
    } catch (err: any) {
      console.error('Save failed:', err);
      toast.error(err?.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      return;
    }

    toast.success('Project deleted successfully');
    fetchProjects();
  };

  const togglePublished = async (project: PortfolioItem) => {
    const { error } = await supabase
      .from('portfolio')
      .update({ published: !project.published })
      .eq('id', project.id);

    if (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      return;
    }

    toast.success(project.published ? 'Project unpublished' : 'Project published');
    fetchProjects();
  };

  const toggleFeatured = async (project: PortfolioItem) => {
    const { error } = await supabase
      .from('portfolio')
      .update({ featured: !project.featured })
      .eq('id', project.id);

    if (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      return;
    }

    toast.success(project.featured ? 'Removed from featured' : 'Added to featured');
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-gray-600 mt-2">Showcase your best work and projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e-commerce-website"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Website Design, AI Automation, Ads Management"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Full Content (optional)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="project_url">Project URL (optional)</Label>
                <Input
                  id="project_url"
                  type="url"
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>
              <div>
                <Label htmlFor="image">Featured Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {editingProject?.image_url && !imageFile && (
                  <p className="text-sm text-gray-500 mt-1">Current image will be kept</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Mark as featured</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-sm text-gray-600">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{projects.filter(p => p.published).length}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{projects.filter(p => p.featured).length}</p>
                <p className="text-sm text-gray-600">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Projects</CardTitle>
          <CardDescription>Manage your portfolio showcase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">
                    <a 
                      href={`/portfolio/${project.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary hover:underline"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{project.category}</p>
                  <p className="text-xs text-gray-400 mt-1">{project.description.substring(0, 80)}...</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={project.published ? "default" : "secondary"}>
                    {project.published ? 'Published' : 'Draft'}
                  </Badge>
                  {project.featured && <Badge variant="outline">Featured</Badge>}
                  <Link to={`/portfolio/${project.slug}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Now
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => togglePublished(project)}
                  >
                    {project.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleFeatured(project)}
                  >
                    {project.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No projects yet. Click "Add Project" to create your first portfolio item.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPortfolio;