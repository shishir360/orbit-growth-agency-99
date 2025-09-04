import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Menu, Eye, EyeOff } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';

const AdminNavigation = () => {
  const { content, updateNavigation } = useContent();
  const { toast } = useToast();

  const toggleVisibility = (id: string) => {
    const updatedNavigation = content.navigation.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    updateNavigation(updatedNavigation);
    
    const item = content.navigation.find(item => item.id === id);
    toast({
      title: `Navigation updated`,
      description: `${item?.name} is now ${item?.visible ? 'hidden' : 'visible'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Navigation Management</h1>
        <p className="text-gray-600 mt-2">Control which menu items appear in your website header</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Header Menu Items</CardTitle>
          <CardDescription>
            Toggle visibility of navigation menu items. {content.navigation.filter(item => item.visible).length} of {content.navigation.length} items visible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {content.navigation.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Menu className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.href}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge variant={item.visible ? "default" : "secondary"}>
                    {item.visible ? 'Visible' : 'Hidden'}
                  </Badge>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.visible}
                      onCheckedChange={() => toggleVisibility(item.id)}
                    />
                    <Label className="text-sm">
                      {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNavigation;