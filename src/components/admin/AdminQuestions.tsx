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
import { Plus, Edit, Trash2, Eye, EyeOff, HelpCircle, Search } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

const AdminQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What services do you offer?',
      answer: 'We offer comprehensive digital marketing services including website design, Google Ads management, Facebook advertising, and AI automation solutions.',
      category: 'Services',
      published: true,
      featured: true,
      views: 245,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      question: 'How long does it take to build a website?',
      answer: 'Typically, a standard business website takes 2-4 weeks to complete, depending on the complexity and specific requirements.',
      category: 'Website Design',
      published: true,
      featured: false,
      views: 189,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      question: 'What is your pricing structure?',
      answer: 'Our pricing varies based on the specific services and project scope. Contact us for a customized quote.',
      category: 'Pricing',
      published: false,
      featured: false,
      views: 67,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    published: true,
    featured: false
  });

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      answer: question.answer,
      category: question.category,
      published: question.published,
      featured: question.featured
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingQuestion(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
      published: true,
      featured: false
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingQuestion) {
      setQuestions(questions.map(question => 
        question.id === editingQuestion.id 
          ? { ...question, ...formData, updatedAt: now }
          : question
      ));
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        ...formData,
        views: 0,
        createdAt: now,
        updatedAt: now
      };
      setQuestions([...questions, newQuestion]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const togglePublished = (id: string) => {
    setQuestions(questions.map(question => 
      question.id === id 
        ? { ...question, published: !question.published }
        : question
    ));
  };

  const toggleFeatured = (id: string) => {
    setQuestions(questions.map(question => 
      question.id === id 
        ? { ...question, featured: !question.featured }
        : question
    ));
  };

  const categories = [...new Set(questions.map(q => q.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600 mt-2">Manage frequently asked questions and answers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </DialogTitle>
              <DialogDescription>
                {editingQuestion ? 'Update question information' : 'Create a new FAQ entry'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="What is the question?"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  placeholder="Provide a comprehensive answer..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="e.g., Services, Pricing, General"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({...formData, published: checked})}
                  />
                  <Label htmlFor="published">Publish</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingQuestion ? 'Update Question' : 'Add Question'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{questions.length}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{questions.filter(q => q.published).length}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Badge className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{questions.filter(q => q.featured).length}</p>
                <p className="text-sm text-gray-600">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search questions, answers, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Questions</CardTitle>
          <CardDescription>
            {filteredQuestions.length} of {questions.length} questions shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium max-w-[300px] truncate">{question.question}</div>
                      <div className="text-sm text-gray-500 max-w-[300px] truncate">
                        {question.answer}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{question.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={question.published ? "default" : "secondary"}>
                        {question.published ? 'Published' : 'Draft'}
                      </Badge>
                      {question.featured && (
                        <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{question.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublished(question.id)}
                        title={question.published ? 'Unpublish' : 'Publish'}
                      >
                        {question.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFeatured(question.id)}
                        title={question.featured ? 'Remove from featured' : 'Make featured'}
                      >
                        <Badge className={`w-4 h-4 ${question.featured ? 'text-purple-600' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(question)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(question.id)}
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

export default AdminQuestions;