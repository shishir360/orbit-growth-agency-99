-- Create website_templates table for template showcase
CREATE TABLE public.website_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_templates ENABLE ROW LEVEL SECURITY;

-- Public can view visible templates
CREATE POLICY "Anyone can view visible templates"
ON public.website_templates
FOR SELECT
USING (visible = true);

-- Only admins can manage templates
CREATE POLICY "Admins can manage templates"
ON public.website_templates
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_website_templates_updated_at
BEFORE UPDATE ON public.website_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for template images
INSERT INTO storage.buckets (id, name, public)
VALUES ('template-images', 'template-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for template images
CREATE POLICY "Template images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'template-images');

CREATE POLICY "Admins can upload template images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'template-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update template images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'template-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete template images"
ON storage.objects FOR DELETE
USING (bucket_id = 'template-images' AND public.has_role(auth.uid(), 'admin'));