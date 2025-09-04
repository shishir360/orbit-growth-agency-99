import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Edit, Trash2, Eye } from 'lucide-react';

const AdminPortfolio = () => {
  const [projects] = useState([
    { id: '1', title: 'E-commerce Website', category: 'Web Design', status: 'published', views: 234 },
    { id: '2', title: 'SaaS Dashboard', category: 'UI/UX', status: 'draft', views: 0 }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-gray-600 mt-2">Showcase your best work and projects</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
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
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'published').length}</p>
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
                <p className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.views, 0)}</p>
                <p className="text-sm text-gray-600">Total Views</p>
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
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={project.status === 'published' ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                  <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPortfolio;