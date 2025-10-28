-- Create storage bucket for landing page HTML files
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-pages', 'landing-pages', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for landing pages bucket
CREATE POLICY "Admins can upload landing pages"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'landing-pages' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update landing pages"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'landing-pages' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete landing pages"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'landing-pages' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view landing pages"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'landing-pages');