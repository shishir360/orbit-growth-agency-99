import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Menu, Eye, EyeOff, FileText, Users, LayoutDashboard } from 'lucide-react';
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
    <div className="space-y-6 max-w-6xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Navigation Management</h1>
        <p className="text-muted-foreground">Control which menu items appear in your website header</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Menu className="h-5 w-5 text-primary" />
                Header Menu Items
              </CardTitle>
              <CardDescription className="mt-1.5">
                {content.navigation.filter(item => item.visible).length} of {content.navigation.length} items visible
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {content.navigation.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-4 border rounded-xl hover:border-primary/50 transition-colors bg-card"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Menu className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{item.href}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={item.visible ? "default" : "secondary"}
                    className="px-3 py-1"
                  >
                    {item.visible ? (
                      <><Eye className="w-3 h-3 mr-1" />Visible</>
                    ) : (
                      <><EyeOff className="w-3 h-3 mr-1" />Hidden</>
                    )}
                  </Badge>
                  
                  <Switch
                    checked={item.visible}
                    onCheckedChange={() => toggleVisibility(item.id)}
                  />
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