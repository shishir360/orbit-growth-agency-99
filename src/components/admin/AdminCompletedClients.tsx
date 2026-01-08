import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, GripVertical, ExternalLink, Upload } from "lucide-react";

interface CompletedClient {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  visible: boolean;
}

const AdminCompletedClients = () => {
  const [clients, setClients] = useState<CompletedClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newClient, setNewClient] = useState({ name: '', logo_url: '', website_url: '' });
  const [isUploading, setIsUploading] = useState(false);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('completed_clients')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch clients');
      return;
    }
    setClients(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
    
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(`completed-clients/${fileName}`, file);

    if (uploadError) {
      toast.error('Failed to upload image');
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(`completed-clients/${fileName}`);

    setNewClient(prev => ({ ...prev, logo_url: publicUrl }));
    setIsUploading(false);
    toast.success('Image uploaded');
  };

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.logo_url) {
      toast.error('Please fill in name and upload a logo');
      return;
    }

    const maxOrder = clients.reduce((max, c) => Math.max(max, c.display_order), 0);
    
    const { error } = await supabase
      .from('completed_clients')
      .insert({
        name: newClient.name,
        logo_url: newClient.logo_url,
        website_url: newClient.website_url || null,
        display_order: maxOrder + 1,
        visible: true
      });

    if (error) {
      toast.error('Failed to add client');
      return;
    }

    toast.success('Client added successfully');
    setNewClient({ name: '', logo_url: '', website_url: '' });
    fetchClients();
  };

  const handleDeleteClient = async (id: string) => {
    const { error } = await supabase
      .from('completed_clients')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete client');
      return;
    }

    toast.success('Client deleted');
    fetchClients();
  };

  const handleToggleVisibility = async (id: string, visible: boolean) => {
    const { error } = await supabase
      .from('completed_clients')
      .update({ visible })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update visibility');
      return;
    }

    fetchClients();
  };

  const handleUpdateWebsite = async (id: string, website_url: string) => {
    const { error } = await supabase
      .from('completed_clients')
      .update({ website_url: website_url || null })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update website');
      return;
    }

    toast.success('Website updated');
    fetchClients();
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Completed Clients</h1>
        <p className="text-muted-foreground">Manage clients whose projects are completed</p>
      </div>

      {/* Add New Client */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Client</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Client Name *</Label>
              <Input
                placeholder="Client name"
                value={newClient.name}
                onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input
                placeholder="https://example.com"
                value={newClient.website_url}
                onChange={(e) => setNewClient(prev => ({ ...prev, website_url: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Logo *</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          {newClient.logo_url && (
            <div className="flex items-center gap-4">
              <img src={newClient.logo_url} alt="Preview" className="h-12 object-contain" />
              <span className="text-sm text-muted-foreground">Logo preview</span>
            </div>
          )}
          
          <Button onClick={handleAddClient} disabled={isUploading}>
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </CardContent>
      </Card>

      {/* Clients List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clients ({clients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No clients added yet</p>
          ) : (
            <div className="space-y-3">
              {clients.map((client) => (
                <div 
                  key={client.id} 
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                  
                  <div className="w-16 h-12 bg-background rounded border flex items-center justify-center">
                    <img 
                      src={client.logo_url} 
                      alt={client.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium">{client.name}</p>
                    {client.website_url && (
                      <a 
                        href={client.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {client.website_url}
                      </a>
                    )}
                  </div>
                  
                  <Input
                    placeholder="Website URL"
                    defaultValue={client.website_url || ''}
                    className="w-48"
                    onBlur={(e) => handleUpdateWebsite(client.id, e.target.value)}
                  />
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Visible</Label>
                    <Switch
                      checked={client.visible}
                      onCheckedChange={(checked) => handleToggleVisibility(client.id, checked)}
                    />
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCompletedClients;
