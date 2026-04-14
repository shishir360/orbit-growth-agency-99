import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, ExternalLink, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

interface AffiliatePage {
  id: string;
  title: string;
  slug: string;
  headline: string;
  subheadline: string | null;
  description: string | null;
  badge_text: string | null;
  cta_text: string;
  cta_link: string;
  hero_image_url: string | null;
  video_url: string | null;
  video_thumbnail_url: string | null;
  features: string[] | null;
  social_proof_text: string | null;
  footer_text: string | null;
  bg_color: string | null;
  accent_color: string | null;
  is_active: boolean;
  created_at: string;
}

const defaultForm = {
  title: "",
  slug: "",
  headline: "Unlimited AI Voice Agents",
  subheadline: "Build, deploy and scale AI voice agents for your business",
  description: "Pay once. Use forever. Save money and time.",
  badge_text: "🔥 For Business Owners",
  cta_text: "Get Lifetime Access",
  cta_link: "https://vapi.ai/?aff=lunexomedia",
  hero_image_url: "",
  video_url: "",
  video_thumbnail_url: "",
  features: "AI Voice Agents, Call Automation, Lead Qualification",
  social_proof_text: "Businesses Are Growing with VAPI",
  footer_text: "© 2026 Lunexo Media. All rights reserved.",
  bg_color: "#ffffff",
  accent_color: "#ef4444",
  is_active: true,
};

export default function AdminAffiliatePages() {
  const [pages, setPages] = useState<AffiliatePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => { fetchPages(); }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from("affiliate_landing_pages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPages(data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load affiliate pages");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: AffiliatePage) => {
    setForm({
      title: page.title,
      slug: page.slug,
      headline: page.headline,
      subheadline: page.subheadline || "",
      description: page.description || "",
      badge_text: page.badge_text || "",
      cta_text: page.cta_text,
      cta_link: page.cta_link,
      hero_image_url: page.hero_image_url || "",
      video_url: page.video_url || "",
      video_thumbnail_url: page.video_thumbnail_url || "",
      features: (page.features || []).join(", "),
      social_proof_text: page.social_proof_text || "",
      footer_text: page.footer_text || "",
      bg_color: page.bg_color || "#ffffff",
      accent_color: page.accent_color || "#ef4444",
      is_active: page.is_active,
    });
    setEditingId(page.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.cta_link) {
      toast.error("Title, slug, and CTA link are required");
      return;
    }

    const featuresArr = form.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      slug: form.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      headline: form.headline,
      subheadline: form.subheadline || null,
      description: form.description || null,
      badge_text: form.badge_text || null,
      cta_text: form.cta_text,
      cta_link: form.cta_link,
      hero_image_url: form.hero_image_url || null,
      video_url: form.video_url || null,
      video_thumbnail_url: form.video_thumbnail_url || null,
      features: featuresArr,
      social_proof_text: form.social_proof_text || null,
      footer_text: form.footer_text || null,
      bg_color: form.bg_color || "#ffffff",
      accent_color: form.accent_color || "#ef4444",
      is_active: form.is_active,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from("affiliate_landing_pages")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Affiliate page updated!");
      } else {
        const { error } = await supabase
          .from("affiliate_landing_pages")
          .insert(payload);
        if (error) throw error;
        toast.success("Affiliate page created!");
      }
      setDialogOpen(false);
      setEditingId(null);
      setForm(defaultForm);
      fetchPages();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to save");
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("affiliate_landing_pages")
      .update({ is_active: !current })
      .eq("id", id);
    if (error) { toast.error("Failed"); return; }
    toast.success("Updated!");
    fetchPages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this affiliate page?")) return;
    const { error } = await supabase
      .from("affiliate_landing_pages")
      .delete()
      .eq("id", id);
    if (error) { toast.error("Failed"); return; }
    toast.success("Deleted!");
    fetchPages();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Affiliate Landing Pages</h2>
          <p className="text-muted-foreground mt-1">
            Create promo landing pages for your affiliate links. Visitors see a clean page without header/footer.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditingId(null); setForm(defaultForm); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> New Affiliate Page</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Create"} Affiliate Page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title (internal)</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="VAPI Promo" />
                </div>
                <div>
                  <Label>URL Slug</Label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="vapi-ai" />
                  <p className="text-xs text-muted-foreground mt-1">Page URL: /promo/{form.slug || "slug"}</p>
                </div>
              </div>

              <div>
                <Label>Badge Text</Label>
                <Input value={form.badge_text} onChange={(e) => setForm({ ...form, badge_text: e.target.value })} placeholder="🔥 For Business Owners" />
              </div>

              <div>
                <Label>Headline</Label>
                <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} placeholder="Unlimited AI Voice Agents" />
              </div>

              <div>
                <Label>Subheadline</Label>
                <Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CTA Button Text</Label>
                  <Input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} />
                </div>
                <div>
                  <Label>CTA Link (Affiliate URL)</Label>
                  <Input value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} placeholder="https://vapi.ai/?aff=lunexomedia" />
                </div>
              </div>

              <div>
                <Label>Hero Image URL</Label>
                <Input value={form.hero_image_url} onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })} placeholder="https://..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Video URL (YouTube/MP4)</Label>
                  <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div>
                  <Label>Video Thumbnail URL</Label>
                  <Input value={form.video_thumbnail_url} onChange={(e) => setForm({ ...form, video_thumbnail_url: e.target.value })} />
                </div>
              </div>

              <div>
                <Label>Features (comma separated)</Label>
                <Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="AI Voice Agents, Call Automation, Lead Qualification" />
              </div>

              <div>
                <Label>Social Proof Text</Label>
                <Input value={form.social_proof_text} onChange={(e) => setForm({ ...form, social_proof_text: e.target.value })} />
              </div>

              <div>
                <Label>Footer Text</Label>
                <Input value={form.footer_text} onChange={(e) => setForm({ ...form, footer_text: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={form.bg_color} onChange={(e) => setForm({ ...form, bg_color: e.target.value })} className="w-14 h-10 p-1" />
                    <Input value={form.bg_color} onChange={(e) => setForm({ ...form, bg_color: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Accent Color (CTA button)</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} className="w-14 h-10 p-1" />
                    <Input value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <Label>Active (visible to public)</Label>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                <Save className="w-4 h-4 mr-2" /> {editingId ? "Update" : "Create"} Page
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>CTA Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell><code className="text-sm">/promo/{page.slug}</code></TableCell>
                <TableCell className="max-w-[200px] truncate text-sm">{page.cta_link}</TableCell>
                <TableCell>
                  {page.is_active ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-muted-foreground">Hidden</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost" onClick={() => window.open(`/promo/${page.slug}`, "_blank")}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toggleActive(page.id, page.is_active)}>
                      {page.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(page)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(page.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No affiliate pages yet. Create your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
