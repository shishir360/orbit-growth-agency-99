
CREATE TABLE public.affiliate_landing_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  headline TEXT NOT NULL DEFAULT 'Unlimited AI Voice Agents',
  subheadline TEXT DEFAULT 'Build, deploy and scale AI voice agents for your business',
  description TEXT DEFAULT 'Pay once. Use forever. Save money and time.',
  badge_text TEXT DEFAULT '🔥 For Business Owners',
  cta_text TEXT NOT NULL DEFAULT 'Get Lifetime Access',
  cta_link TEXT NOT NULL DEFAULT 'https://vapi.ai/?aff=lunexomedia',
  hero_image_url TEXT,
  video_url TEXT,
  video_thumbnail_url TEXT,
  features TEXT[] DEFAULT ARRAY['AI Voice Agents', 'Call Automation', 'Lead Qualification']::TEXT[],
  steps JSONB DEFAULT '[]'::JSONB,
  social_proof_text TEXT DEFAULT 'Creators Are Growing with VAPI',
  social_proof_avatars TEXT[] DEFAULT ARRAY[]::TEXT[],
  footer_text TEXT DEFAULT '© 2026 Lunexo Media. All rights reserved.',
  bg_color TEXT DEFAULT '#ffffff',
  accent_color TEXT DEFAULT '#ef4444',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active affiliate landing pages"
  ON public.affiliate_landing_pages
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage affiliate landing pages"
  ON public.affiliate_landing_pages
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
