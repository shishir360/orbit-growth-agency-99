-- Create client feedback screenshots table
CREATE TABLE public.client_feedback_screenshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  image_url TEXT NOT NULL,
  client_name TEXT,
  visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_feedback_screenshots ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Anyone can view visible feedback screenshots"
ON public.client_feedback_screenshots
FOR SELECT
USING (visible = true);

-- Admin full access policy
CREATE POLICY "Admins can manage feedback screenshots"
ON public.client_feedback_screenshots
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for feedback images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('feedback-screenshots', 'feedback-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view feedback screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'feedback-screenshots');

CREATE POLICY "Admins can upload feedback screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'feedback-screenshots');

CREATE POLICY "Admins can delete feedback screenshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'feedback-screenshots');

-- Add trigger for updated_at
CREATE TRIGGER update_client_feedback_screenshots_updated_at
BEFORE UPDATE ON public.client_feedback_screenshots
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();