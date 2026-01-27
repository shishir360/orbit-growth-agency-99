import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, Image, GripVertical, Eye, EyeOff, Star, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackScreenshot {
  id: string;
  title: string;
  category: string;
  image_url: string;
  client_name: string | null;
  visible: boolean;
  display_order: number;
  created_at: string;
}

const categories = [
  { value: 'general', label: 'General Feedback' },
  { value: 'website', label: 'Website Design' },
  { value: 'ads', label: 'Ads Management' },
  { value: 'ai', label: 'AI Automation' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'social', label: 'Social Media' },
];

const AdminFeedbackScreenshots: React.FC = () => {
  const [screenshots, setScreenshots] = useState<FeedbackScreenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newScreenshot, setNewScreenshot] = useState({
    title: '',
    category: 'general',
    client_name: '',
    image: null as File | null
  });

  useEffect(() => {
    fetchScreenshots();
  }, []);

  const fetchScreenshots = async () => {
    try {
      const { data, error } = await supabase
        .from('client_feedback_screenshots')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setScreenshots(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch screenshots: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('feedback-screenshots')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('feedback-screenshots')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddScreenshot = async () => {
    if (!newScreenshot.title || !newScreenshot.image) {
      toast.error('Please provide a title and image');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await handleImageUpload(newScreenshot.image);

      const { error } = await supabase
        .from('client_feedback_screenshots')
        .insert({
          title: newScreenshot.title,
          category: newScreenshot.category,
          client_name: newScreenshot.client_name || null,
          image_url: imageUrl,
          display_order: screenshots.length
        });

      if (error) throw error;

      toast.success('Feedback screenshot added!');
      setNewScreenshot({ title: '', category: 'general', client_name: '', image: null });
      fetchScreenshots();
    } catch (error: any) {
      toast.error('Failed to add screenshot: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Extract filename from URL
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('feedback-screenshots').remove([fileName]);
      }

      const { error } = await supabase
        .from('client_feedback_screenshots')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Screenshot deleted');
      fetchScreenshots();
    } catch (error: any) {
      toast.error('Failed to delete: ' + error.message);
    }
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    try {
      const { error } = await supabase
        .from('client_feedback_screenshots')
        .update({ visible: !visible })
        .eq('id', id);

      if (error) throw error;
      fetchScreenshots();
    } catch (error: any) {
      toast.error('Failed to update visibility');
    }
  };

  const updateOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('client_feedback_screenshots')
        .update({ display_order: newOrder })
        .eq('id', id);

      if (error) throw error;
      fetchScreenshots();
    } catch (error: any) {
      toast.error('Failed to update order');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
          <MessageSquare className="h-6 w-6 text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Client Feedback Screenshots
          </h2>
          <p className="text-muted-foreground text-sm">
            Upload screenshots of client feedback to display on homepage
          </p>
        </div>
      </div>

      {/* Add New Screenshot */}
      <Card className="bg-card/50 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5 text-green-400" />
            Add New Feedback Screenshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="e.g., WhatsApp feedback from John"
                value={newScreenshot.title}
                onChange={(e) => setNewScreenshot(prev => ({ ...prev, title: e.target.value }))}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Client Name (Optional)</Label>
              <Input
                placeholder="e.g., John Doe"
                value={newScreenshot.client_name}
                onChange={(e) => setNewScreenshot(prev => ({ ...prev, client_name: e.target.value }))}
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newScreenshot.category}
                onValueChange={(value) => setNewScreenshot(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Screenshot Image *</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewScreenshot(prev => ({ ...prev, image: file }));
                    }
                  }}
                  className="bg-background/50"
                />
              </div>
            </div>
          </div>

          {newScreenshot.image && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/10">
              <img
                src={URL.createObjectURL(newScreenshot.image)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Button
            onClick={handleAddScreenshot}
            disabled={uploading || !newScreenshot.title || !newScreenshot.image}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Add Screenshot
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Screenshots Grid */}
      <Card className="bg-card/50 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Image className="h-5 w-5 text-purple-400" />
              All Screenshots ({screenshots.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {screenshots.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No feedback screenshots yet</p>
              <p className="text-sm">Add your first screenshot above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {screenshots.map((screenshot, index) => (
                  <motion.div
                    key={screenshot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`relative group rounded-xl overflow-hidden border ${
                      screenshot.visible ? 'border-white/10' : 'border-red-500/30 opacity-60'
                    } bg-background/30`}
                  >
                    <div className="aspect-square">
                      <img
                        src={screenshot.image_url}
                        alt={screenshot.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-medium truncate">{screenshot.title}</p>
                        {screenshot.client_name && (
                          <p className="text-white/70 text-xs">{screenshot.client_name}</p>
                        )}
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-purple-500/30 text-purple-300">
                          {categories.find(c => c.value === screenshot.category)?.label}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        onClick={() => toggleVisibility(screenshot.id, screenshot.visible)}
                      >
                        {screenshot.visible ? (
                          <Eye className="h-4 w-4 text-green-400" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-red-400" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-black/50 hover:bg-red-500/50"
                        onClick={() => handleDelete(screenshot.id, screenshot.image_url)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>

                    {/* Order badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/50 text-xs text-white/70">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFeedbackScreenshots;
