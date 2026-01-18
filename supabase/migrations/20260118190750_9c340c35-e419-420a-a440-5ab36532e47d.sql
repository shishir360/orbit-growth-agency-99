-- Create storage bucket for OG images
INSERT INTO storage.buckets (id, name, public)
VALUES ('og-images', 'og-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access
CREATE POLICY "OG images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'og-images');

-- Create policy for service role to upload
CREATE POLICY "Service role can upload OG images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'og-images');

-- Create policy for service role to update
CREATE POLICY "Service role can update OG images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'og-images');

-- Create table to track generated OG images
CREATE TABLE IF NOT EXISTS public.og_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  title TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.og_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "OG images metadata is publicly readable"
ON public.og_images FOR SELECT
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_og_images_updated_at
BEFORE UPDATE ON public.og_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();