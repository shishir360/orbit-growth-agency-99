import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Upload, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LandingPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  iframe_url: string | null;
  html_file_url: string | null;
  visible: boolean;
  created_at: string;
}

export default function AdminLandingPages() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [visible, setVisible] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("is_landing_page", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error("Error fetching landing pages:", error);
      toast.error("Failed to load landing pages");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from("landing-pages")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("landing-pages")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug) {
      toast.error("Title and slug are required");
      return;
    }

    try {
      let htmlFileUrl = null;
      let content = "";

      if (htmlFile) {
        htmlFileUrl = await handleFileUpload(htmlFile);
        const fileContent = await htmlFile.text();
        content = fileContent;
      } else if (iframeUrl) {
        content = "";
      }

      const pageData = {
        title,
        slug,
        content,
        iframe_url: iframeUrl || null,
        html_file_url: htmlFileUrl,
        visible,
        is_landing_page: true,
      };

      if (editingId) {
        const { error } = await supabase
          .from("pages")
          .update(pageData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Landing page updated successfully");
      } else {
        const { error } = await supabase.from("pages").insert(pageData);

        if (error) throw error;
        toast.success("Landing page created successfully");
      }

      resetForm();
      fetchPages();
    } catch (error) {
      console.error("Error saving landing page:", error);
      toast.error("Failed to save landing page");
    }
  };

  const handleEdit = (page: LandingPage) => {
    setTitle(page.title);
    setSlug(page.slug);
    setIframeUrl(page.iframe_url || "");
    setVisible(page.visible);
    setEditingId(page.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this landing page?")) return;

    try {
      const { error } = await supabase.from("pages").delete().eq("id", id);

      if (error) throw error;
      toast.success("Landing page deleted");
      fetchPages();
    } catch (error) {
      console.error("Error deleting landing page:", error);
      toast.error("Failed to delete landing page");
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from("pages")
        .update({ visible: !currentVisibility })
        .eq("id", id);

      if (error) throw error;
      toast.success("Visibility updated");
      fetchPages();
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast.error("Failed to update visibility");
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setIframeUrl("");
    setHtmlFile(null);
    setVisible(true);
    setEditingId(null);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Landing Pages</h2>
        <p className="text-muted-foreground mt-2">
          Create landing pages without header/footer. Upload HTML files or use iframe URLs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Landing Page"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL path)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-landing-page"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL will be: /{slug}
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="htmlFile">Upload HTML File</Label>
          <Input
            id="htmlFile"
            type="file"
            accept=".html,.htm"
            onChange={(e) => setHtmlFile(e.target.files?.[0] || null)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Upload a complete HTML file (optional)
          </p>
        </div>

        <div>
          <Label htmlFor="iframeUrl">Or use Iframe URL</Label>
          <Input
            id="iframeUrl"
            value={iframeUrl}
            onChange={(e) => setIframeUrl(e.target.value)}
            placeholder="https://example.com/page"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Alternative to HTML file upload
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="visible"
            checked={visible}
            onCheckedChange={(checked) => setVisible(checked as boolean)}
          />
          <Label htmlFor="visible">Visible to public</Label>
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            <Upload className="w-4 h-4 mr-2" />
            {editingId ? "Update" : "Create"} Landing Page
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>
                  <code className="text-sm">/{page.slug}</code>
                </TableCell>
                <TableCell>
                  {page.html_file_url ? "HTML File" : page.iframe_url ? "Iframe" : "Custom"}
                </TableCell>
                <TableCell>
                  {page.visible ? (
                    <span className="text-green-600">Visible</span>
                  ) : (
                    <span className="text-muted-foreground">Hidden</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(page.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        window.open(`/${page.slug}`, "_blank")
                      }
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleVisibility(page.id, page.visible)}
                    >
                      {page.visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(page)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No landing pages yet. Create your first one above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
