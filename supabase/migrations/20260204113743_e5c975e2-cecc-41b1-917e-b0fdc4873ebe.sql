-- Create video_reviews table for video testimonials
CREATE TABLE public.video_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_type TEXT NOT NULL DEFAULT 'youtube', -- 'youtube' or 'upload'
  youtube_video_id TEXT, -- For YouTube videos
  video_url TEXT, -- For uploaded videos
  thumbnail_url TEXT, -- Custom thumbnail (optional)
  client_name TEXT,
  client_company TEXT,
  portfolio_project_id UUID REFERENCES public.portfolio(id) ON DELETE SET NULL, -- Tag to specific project
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  show_on_homepage BOOLEAN NOT NULL DEFAULT true,
  show_on_reviews BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_reviews ENABLE ROW LEVEL SECURITY;

-- Public can view visible video reviews
CREATE POLICY "Anyone can view visible video reviews"
ON public.video_reviews
FOR SELECT
USING (visible = true);

-- Only admins can manage video reviews
CREATE POLICY "Admins can manage video reviews"
ON public.video_reviews
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_video_reviews_updated_at
BEFORE UPDATE ON public.video_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for video uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('video-reviews', 'video-reviews', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for video uploads
CREATE POLICY "Video reviews are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'video-reviews');

CREATE POLICY "Admins can upload videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'video-reviews' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'video-reviews' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'video-reviews' AND public.has_role(auth.uid(), 'admin'));