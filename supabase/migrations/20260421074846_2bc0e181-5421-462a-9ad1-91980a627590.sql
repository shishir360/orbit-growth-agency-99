
CREATE TABLE IF NOT EXISTS public.ai_bot_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL UNIQUE,
  is_enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_bot_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read ai bot settings"
ON public.ai_bot_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage ai bot settings"
ON public.ai_bot_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_ai_bot_settings_updated_at
BEFORE UPDATE ON public.ai_bot_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.ai_bot_settings (platform, is_enabled) VALUES
  ('whatsapp', true),
  ('messenger', true),
  ('instagram', true)
ON CONFLICT (platform) DO NOTHING;
