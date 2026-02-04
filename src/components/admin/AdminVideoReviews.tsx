import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ExternalLink, Upload, X, Loader2, Video, Youtube, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VideoReview {
  id: string;
  title: string;
  description: string | null;
  video_type: string;
  youtube_video_id: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  client_name: string | null;
  client_company: string | null;
  portfolio_project_id: string | null;
  display_order: number;
  visible: boolean;
  show_on_homepage: boolean;
  show_on_reviews: boolean;
  created_at: string;
}

interface PortfolioProject {
  id: string;
  title: string;
}

const AdminVideoReviews: React.FC = () => {
  const [videos, setVideos] = useState<VideoReview[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoReview | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_type: 'youtube',
    youtube_video_id: '',
    video_url: '',
    thumbnail_url: '',
    client_name: '',
    client_company: '',
    portfolio_project_id: '',
    visible: true,
    show_on_homepage: true,
    show_on_reviews: true,
  });

  useEffect(() => {
    fetchVideos();
    fetchProjects();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('video_reviews')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (err: any) {
      console.error('Error fetching videos:', err);
      toast.error('Failed to load video reviews');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('id, title')
        .eq('published', true)
        .order('title', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video must be less than 100MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('video-reviews')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('video-reviews')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, video_url: publicUrl }));
      toast.success('Video uploaded successfully');
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `thumb-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('video-reviews')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('video-reviews')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, thumbnail_url: publicUrl }));
      toast.success('Thumbnail uploaded');
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Failed to upload thumbnail');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (formData.video_type === 'youtube' && !formData.youtube_video_id.trim()) {
      toast.error('Please enter YouTube video ID or URL');
      return;
    }

    if (formData.video_type === 'upload' && !formData.video_url.trim()) {
      toast.error('Please upload a video');
      return;
    }

    setSaving(true);
    try {
      const youtubeId = formData.video_type === 'youtube' 
        ? extractYouTubeId(formData.youtube_video_id) 
        : null;

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        video_type: formData.video_type,
        youtube_video_id: youtubeId,
        video_url: formData.video_type === 'upload' ? formData.video_url : null,
        thumbnail_url: formData.thumbnail_url || null,
        client_name: formData.client_name.trim() || null,
        client_company: formData.client_company.trim() || null,
        portfolio_project_id: formData.portfolio_project_id || null,
        visible: formData.visible,
        show_on_homepage: formData.show_on_homepage,
        show_on_reviews: formData.show_on_reviews,
      };

      if (editingVideo) {
        const { error } = await supabase
          .from('video_reviews')
          .update(payload)
          .eq('id', editingVideo.id);

        if (error) throw error;
        toast.success('Video updated successfully');
      } else {
        const maxOrder = videos.length > 0 
          ? Math.max(...videos.map(v => v.display_order)) + 1 
          : 0;

        const { error } = await supabase
          .from('video_reviews')
          .insert({ ...payload, display_order: maxOrder });

        if (error) throw error;
        toast.success('Video added successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchVideos();
    } catch (err: any) {
      console.error('Save error:', err);
      toast.error(err.message || 'Failed to save video');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (video: VideoReview) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      video_type: video.video_type,
      youtube_video_id: video.youtube_video_id || '',
      video_url: video.video_url || '',
      thumbnail_url: video.thumbnail_url || '',
      client_name: video.client_name || '',
      client_company: video.client_company || '',
      portfolio_project_id: video.portfolio_project_id || '',
      visible: video.visible,
      show_on_homepage: video.show_on_homepage,
      show_on_reviews: video.show_on_reviews,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('video_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Video deleted successfully');
      fetchVideos();
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error('Failed to delete video');
    }
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    try {
      const { error } = await supabase
        .from('video_reviews')
        .update({ visible: !visible })
        .eq('id', id);

      if (error) throw error;
      fetchVideos();
    } catch (err: any) {
      console.error('Toggle error:', err);
      toast.error('Failed to update visibility');
    }
  };

  const resetForm = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      video_type: 'youtube',
      youtube_video_id: '',
      video_url: '',
      thumbnail_url: '',
      client_name: '',
      client_company: '',
      portfolio_project_id: '',
      visible: true,
      show_on_homepage: true,
      show_on_reviews: true,
    });
  };

  const getThumbnail = (video: VideoReview) => {
    if (video.thumbnail_url) return video.thumbnail_url;
    if (video.video_type === 'youtube' && video.youtube_video_id) {
      return `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Video Reviews</h2>
          <p className="text-muted-foreground">Manage video testimonials for homepage and reviews page</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Client testimonial video"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the video"
                  rows={2}
                />
              </div>

              <Tabs value={formData.video_type} onValueChange={(v) => setFormData(prev => ({ ...prev, video_type: v }))}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="youtube" className="flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="youtube" className="mt-4">
                  <Label htmlFor="youtube_id">YouTube Video ID or URL *</Label>
                  <Input
                    id="youtube_id"
                    value={formData.youtube_video_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, youtube_video_id: e.target.value }))}
                    placeholder="dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                  />
                  {formData.youtube_video_id && (
                    <div className="mt-2 aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={`https://img.youtube.com/vi/${extractYouTubeId(formData.youtube_video_id)}/maxresdefault.jpg`}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="upload" className="mt-4">
                  {formData.video_url ? (
                    <div className="relative">
                      <video 
                        src={formData.video_url} 
                        className="w-full aspect-video rounded-lg"
                        controls
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({ ...prev, video_url: '' }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                        ) : (
                          <>
                            <Video className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload video (max 100MB)</p>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="video/*"
                        onChange={handleVideoUpload}
                        disabled={uploading}
                      />
                    </label>
                  )}
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="client_company">Company</Label>
                  <Input
                    id="client_company"
                    value={formData.client_company}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_company: e.target.value }))}
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div>
                <Label>Tag to Project (Optional)</Label>
                <Select 
                  value={formData.portfolio_project_id} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, portfolio_project_id: value === 'none' ? '' : value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No project</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visible">Visible</Label>
                  <Switch
                    id="visible"
                    checked={formData.visible}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visible: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show_homepage">Show on Homepage</Label>
                  <Switch
                    id="show_homepage"
                    checked={formData.show_on_homepage}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_on_homepage: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show_reviews">Show on Reviews Page</Label>
                  <Switch
                    id="show_reviews"
                    checked={formData.show_on_reviews}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_on_reviews: checked }))}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex-1">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editingVideo ? 'Update' : 'Add'} Video
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {videos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Video className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No video reviews added yet</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className={`overflow-hidden ${!video.visible ? 'opacity-60' : ''}`}>
              <div className="relative aspect-video group">
                {getThumbnail(video) ? (
                  <img 
                    src={getThumbnail(video)!}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Video className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  {video.video_type === 'youtube' ? (
                    <span className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded">YouTube</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">Uploaded</span>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{video.title}</h3>
                {video.client_name && (
                  <p className="text-sm text-muted-foreground">
                    {video.client_name}{video.client_company && ` - ${video.client_company}`}
                  </p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {video.show_on_homepage && (
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">Homepage</span>
                  )}
                  {video.show_on_reviews && (
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">Reviews</span>
                  )}
                  {video.portfolio_project_id && (
                    <span className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-600 rounded">Tagged</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Switch
                    checked={video.visible}
                    onCheckedChange={() => toggleVisibility(video.id, video.visible)}
                  />
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(video)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(video.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVideoReviews;
