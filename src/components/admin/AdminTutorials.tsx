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
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen, Play } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

const AdminTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([
    {
      id: '1',
      title: 'Setting up Google Analytics 4',
      description: 'Learn how to properly set up GA4 for your website',
      category: 'Analytics',
      difficulty: 'beginner',
      duration: '15 min',
      published: true,
      views: 1243,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Advanced Facebook Ads Targeting',
      description: 'Master Facebook ads targeting for better ROAS',
      category: 'Advertising',
      difficulty: 'advanced',
      duration: '45 min',
      published: true,
      views: 892,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Building AI Chatbots with Dialogflow',
      description: 'Step-by-step guide to creating intelligent chatbots',
      category: 'AI Automation',
      difficulty: 'intermediate',
      duration: '30 min',
      published: false,
      views: 0,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    }
  ]);

  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    published: boolean;
  }>({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    duration: '',
    published: true
  });

  const handleEdit = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial);
    setFormData({
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      difficulty: tutorial.difficulty,
      duration: tutorial.duration,
      published: tutorial.published
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingTutorial(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      difficulty: 'beginner',
      duration: '',
      published: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingTutorial) {
      setTutorials(tutorials.map(tutorial => 
        tutorial.id === editingTutorial.id 
          ? { ...tutorial, ...formData, updatedAt: now }
          : tutorial
      ));
    } else {
      const newTutorial: Tutorial = {
        id: Date.now().toString(),
        ...formData,
        views: 0,
        createdAt: now,
        updatedAt: now
      };
      setTutorials([...tutorials, newTutorial]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setTutorials(tutorials.filter(tutorial => tutorial.id !== id));
  };

  const togglePublished = (id: string) => {
    setTutorials(tutorials.map(tutorial => 
      tutorial.id === id 
        ? { ...tutorial, published: !tutorial.published }
        : tutorial
    ));
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tutorials Management</h1>
          <p className="text-gray-600 mt-2">Create and manage educational content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Create Tutorial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingTutorial ? 'Edit Tutorial' : 'Create New Tutorial'}
              </DialogTitle>
              <DialogDescription>
                {editingTutorial ? 'Update tutorial information' : 'Create a new tutorial for your audience'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tutorial Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter tutorial title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of the tutorial"
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Analytics, SEO"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 15 min"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({...formData, published: checked})}
                />
                <Label htmlFor="published">Publish tutorial</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingTutorial ? 'Update Tutorial' : 'Create Tutorial'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{tutorials.length}</p>
                <p className="text-sm text-gray-600">Total Tutorials</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{tutorials.filter(t => t.published).length}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{tutorials.reduce((sum, t) => sum + t.views, 0)}</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{new Set(tutorials.map(t => t.category)).size}</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tutorials</CardTitle>
          <CardDescription>
            {tutorials.length} tutorials total • {tutorials.filter(t => t.published).length} published
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutorial</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorials.map((tutorial) => (
                <TableRow key={tutorial.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tutorial.title}</div>
                      <div className="text-sm text-gray-500 max-w-[300px] truncate">
                        {tutorial.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tutorial.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyBadge(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{tutorial.duration}</TableCell>
                  <TableCell>{tutorial.views}</TableCell>
                  <TableCell>
                    <Badge variant={tutorial.published ? "default" : "secondary"}>
                      {tutorial.published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublished(tutorial.id)}
                      >
                        {tutorial.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(tutorial)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(tutorial.id)}
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

export default AdminTutorials;