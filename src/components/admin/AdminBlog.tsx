import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import { Plus, Edit, Trash2, Eye, EyeOff, Ban, Calendar, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  published: boolean;
  blocked: boolean;
  author: string;
  publish_date: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    published: false,
    author: 'Admin',
    publish_date: ''
  });

  // Rich text editor configuration
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch posts');
      console.error(error);
    } else {
      setPosts(data || []);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url || '',
      published: post.published,
      author: post.author,
      publish_date: post.publish_date
    });
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      published: false,
      author: 'Admin',
      publish_date: new Date().toISOString().split('T')[0]
    });
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image_url || null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      toast.error('Failed to upload image');
      console.error(uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
    const imageUrl = await uploadImage();

    const postData = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      image_url: imageUrl,
      published: formData.published,
      author: formData.author,
      publish_date: formData.publish_date,
      blocked: editingPost?.blocked || false
    };

    if (editingPost) {
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', editingPost.id);

      if (error) {
        toast.error('Failed to update post');
        console.error(error);
      } else {
        toast.success('Post updated successfully');
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) {
        toast.error('Failed to create post');
        console.error(error);
      } else {
        toast.success('Post created successfully');
        fetchPosts();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete post');
      console.error(error);
    } else {
      toast.success('Post deleted successfully');
      fetchPosts();
    }
  };

  const togglePublished = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', id);

      if (error) {
        toast.error('Failed to update post');
        console.error(error);
      } else {
        toast.success('Post updated successfully');
        fetchPosts();
      }
    }
  };

  const toggleBlocked = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      const { error } = await supabase
        .from('blog_posts')
        .update({ blocked: !post.blocked })
        .eq('id', id);

      if (error) {
        toast.error('Failed to update post');
        console.error(error);
      } else {
        toast.success('Post updated successfully');
        fetchPosts();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">Create and manage your blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Edit Blog Post' : 'Create New Post'}
              </DialogTitle>
              <DialogDescription>
                {editingPost ? 'Update blog post information' : 'Create a new blog post'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter post title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className="border rounded-md">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData({...formData, content})}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your blog post content with rich formatting..."
                    className="min-h-[300px]"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Use the toolbar to format text, add headings, insert images, and more
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {formData.image_url && !imageFile && (
                  <div className="mt-2">
                    <img src={formData.image_url} alt="Current" className="h-20 w-20 object-cover rounded" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="Author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish_date">Publish Date</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({...formData, publish_date: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({...formData, published: checked})}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>
            {posts.length} posts total • {posts.filter(p => p.published).length} published • {posts.filter(p => p.blocked).length} blocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[300px]">
                        {post.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                      {post.blocked && (
                        <Badge variant="destructive">Blocked</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {post.publish_date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublished(post.id)}
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBlocked(post.id)}
                        title={post.blocked ? 'Unblock' : 'Block'}
                      >
                        <Ban className={`w-4 h-4 ${post.blocked ? 'text-red-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
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

export default AdminBlog;