import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2, GripVertical, Image, Eye, EyeOff } from "lucide-react";

interface TrustedLogo {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
  visible: boolean;
}

const AdminTrustedLogos = () => {
  const [logos, setLogos] = useState<TrustedLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLogo, setNewLogo] = useState({ name: "", logo_url: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    const { data, error } = await supabase
      .from("trusted_logos")
      .select("*")
      .order("display_order");
    
    if (error) {
      toast.error("Failed to fetch logos");
      return;
    }
    setLogos(data || []);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `trusted-logos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Failed to upload image");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    setNewLogo({ ...newLogo, logo_url: urlData.publicUrl });
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const addLogo = async () => {
    if (!newLogo.name || !newLogo.logo_url) {
      toast.error("Please fill in all fields");
      return;
    }

    const maxOrder = logos.length > 0 ? Math.max(...logos.map(l => l.display_order)) : 0;

    const { error } = await supabase.from("trusted_logos").insert({
      name: newLogo.name,
      logo_url: newLogo.logo_url,
      display_order: maxOrder + 1,
    });

    if (error) {
      toast.error("Failed to add logo");
      return;
    }

    toast.success("Logo added!");
    setNewLogo({ name: "", logo_url: "" });
    fetchLogos();
  };

  const deleteLogo = async (id: string) => {
    const { error } = await supabase.from("trusted_logos").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete logo");
      return;
    }
    toast.success("Logo deleted!");
    fetchLogos();
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    const { error } = await supabase
      .from("trusted_logos")
      .update({ visible: !visible })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update visibility");
      return;
    }
    fetchLogos();
  };

  const updateOrder = async (id: string, newOrder: number) => {
    const { error } = await supabase
      .from("trusted_logos")
      .update({ display_order: newOrder })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update order");
      return;
    }
    fetchLogos();
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trusted By Logos</h2>
        <p className="text-muted-foreground">
          Manage logos that appear in the "Trusted By" section
        </p>
      </div>

      {/* Add New Logo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Logo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                placeholder="e.g., Google"
                value={newLogo.name}
                onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Logo Image</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </div>
              {newLogo.logo_url && (
                <div className="mt-2 p-4 bg-gray-900 rounded-lg inline-block">
                  <img src={newLogo.logo_url} alt="Preview" className="h-12 object-contain" />
                </div>
              )}
            </div>
          </div>
          <Button onClick={addLogo} disabled={uploading || !newLogo.name || !newLogo.logo_url}>
            <Plus className="w-4 h-4 mr-2" />
            Add Logo
          </Button>
        </CardContent>
      </Card>

      {/* Logo List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Current Logos ({logos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No logos added yet. Add your first logo above!
            </p>
          ) : (
            <div className="space-y-3">
              {logos.map((logo, index) => (
                <div
                  key={logo.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    logo.visible ? "bg-background" : "bg-muted/50 opacity-60"
                  }`}
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                  
                  <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center p-2">
                    <img
                      src={logo.logo_url}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{logo.name}</p>
                    <p className="text-sm text-muted-foreground">Order: {logo.display_order}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={logo.display_order}
                      onChange={(e) => updateOrder(logo.id, parseInt(e.target.value))}
                      className="w-20"
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleVisibility(logo.id, logo.visible)}
                  >
                    {logo.visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteLogo(logo.id)}
                    className="text-destructive hover:text-destructive"
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

export default AdminTrustedLogos;
