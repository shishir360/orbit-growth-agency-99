import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Plus, Edit, Trash2, Eye, Upload, ExternalLink, Image, Sparkles, TrendingUp, Star, Globe, Loader2 } from 'lucide-react';
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
  const [generatingOg, setGeneratingOg] = useState<string | null>(null);
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
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
      const fileName = `portfolio-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // Use portfolio-images bucket for portfolio uploads
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        toast.error(`Upload failed: ${uploadError.message}`);
        return null;
      }

      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const generateOgImage = async (slug: string) => {
    setGeneratingOg(slug);
    try {
      const { data, error } = await supabase.functions.invoke('generate-og-image', {
        body: { pagePath: `/portfolio/${slug}`, forceRegenerate: true }
      });
      
      if (error) throw error;
      
      if (data?.imageUrl) {
        toast.success('OG image generated successfully!');
      } else if (data?.error) {
        toast.error(data.error);
      }
    } catch (err: any) {
      console.error('OG generation error:', err);
      toast.error('Failed to generate OG image');
    } finally {
      setGeneratingOg(null);
    }
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
        
        // Auto-generate OG image for new published projects
        if (formData.published) {
          setTimeout(() => generateOgImage(normalizedSlug), 1000);
        }
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
    
    // Auto-generate OG image when publishing
    if (!project.published) {
      setTimeout(() => generateOgImage(project.slug), 1000);
    }
    
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

  const publishedCount = projects.filter(p => p.published).length;
  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Portfolio Management</h1>
                <p className="text-white/80">Showcase your premium work</p>
              </div>
            </div>
            
            <div className="flex gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-white">{projects.length}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Total Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-white">{publishedCount}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Published</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-white">{featuredCount}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Featured</div>
              </div>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-white text-emerald-700 hover:bg-white/90 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="My Awesome Project"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="my-awesome-project"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select category...</option>
                    <option value="Website Design">Website Design</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Ads Management">Ads Management</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="description">Short Description (for SEO & cards)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description that appears in previews and search results..."
                    rows={3}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>
                
                <div>
                  <Label htmlFor="content">Full Case Study Content (HTML supported)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="<h2>The Challenge</h2><p>Describe the problem...</p>"
                    rows={8}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project_url">Live Project URL</Label>
                    <Input
                      id="project_url"
                      type="url"
                      value={formData.project_url}
                      onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                      placeholder="https://client-website.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Node.js, AI"
                    />
                  </div>
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
                    <div className="mt-2 flex items-center gap-2">
                      <img src={editingProject.image_url} alt="" className="w-16 h-16 object-cover rounded" />
                      <span className="text-sm text-gray-500">Current image will be kept</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Publish immediately
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Mark as featured
                    </Label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    {editingProject ? 'Update' : 'Create'} Project
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Projects Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            All Projects
          </CardTitle>
          <CardDescription>Manage your portfolio showcase with premium presentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative flex items-center gap-4 p-4 border rounded-xl hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {project.image_url ? (
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                      <Image className="w-6 h-6 text-emerald-400" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
                        <Star className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{project.category}</span>
                    <span>•</span>
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Status Badge */}
                <Badge 
                  variant={project.published ? "default" : "secondary"}
                  className={project.published ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                >
                  {project.published ? 'Published' : 'Draft'}
                </Badge>
                
                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => generateOgImage(project.slug)}
                    disabled={generatingOg === project.slug}
                    title="Generate OG Image"
                  >
                    {generatingOg === project.slug ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    )}
                  </Button>
                  <Link to={`/portfolio/${project.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" title="Preview">
                      <ExternalLink className="w-4 h-4 text-blue-500" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => togglePublished(project)}
                    title={project.published ? 'Unpublish' : 'Publish'}
                  >
                    <Eye className={`w-4 h-4 ${project.published ? 'text-green-500' : 'text-gray-400'}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleFeatured(project)}
                    title={project.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(project)} title="Edit">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
            
            {projects.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-500 mb-4">Create your first portfolio item to showcase your work</p>
                <Button onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPortfolio;
