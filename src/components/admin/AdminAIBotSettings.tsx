import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bot, MessageCircle, Instagram, Facebook, ImageIcon, Loader2 } from "lucide-react";

type BotRow = { id: string; platform: string; is_enabled: boolean };

const PLATFORMS = [
  { key: "messenger", label: "Facebook Messenger AI", icon: Facebook, color: "text-blue-500" },
  { key: "whatsapp", label: "WhatsApp AI (Farhan AI)", icon: MessageCircle, color: "text-green-500" },
  { key: "instagram", label: "Instagram DM AI", icon: Instagram, color: "text-pink-500" },
];

export default function AdminAIBotSettings() {
  const { toast } = useToast();
  const [rows, setRows] = useState<BotRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("ai_bot_settings").select("*");
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else {
      setRows(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (platform: string, next: boolean) => {
    setSaving(platform);
    const { error } = await supabase
      .from("ai_bot_settings")
      .update({ is_enabled: next })
      .eq("platform", platform);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setRows((prev) => prev.map((r) => (r.platform === platform ? { ...r, is_enabled: next } : r)));
      toast({
        title: `${platform} AI ${next ? "enabled" : "disabled"}`,
        description: next ? "Bot will now auto-reply." : "Bot will stop auto-replying.",
      });
    }
    setSaving(null);
  };

  const getEnabled = (p: string) => rows.find((r) => r.platform === p)?.is_enabled ?? true;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" /> AI Bot Settings
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Turn AI auto-reply ON/OFF per platform. When OFF, the bot will not respond to incoming messages.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" /> Image Analysis Enabled
          </CardTitle>
          <CardDescription>
            All AI bots can now receive and analyze images sent by users (powered by Gemini Vision).
            No setup needed — just send a photo on WhatsApp, Messenger, or Instagram.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Per-Platform Toggles</CardTitle>
          <CardDescription>Each platform can be turned on/off independently.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            PLATFORMS.map((p) => {
              const Icon = p.icon;
              const enabled = getEnabled(p.key);
              return (
                <div
                  key={p.key}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${p.color}`} />
                    <div>
                      <Label className="text-base font-medium">{p.label}</Label>
                      <div className="mt-1">
                        <Badge variant={enabled ? "default" : "secondary"}>
                          {enabled ? "🟢 Active" : "⚪ Paused"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={enabled}
                    disabled={saving === p.key}
                    onCheckedChange={(v) => toggle(p.key, v)}
                  />
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
