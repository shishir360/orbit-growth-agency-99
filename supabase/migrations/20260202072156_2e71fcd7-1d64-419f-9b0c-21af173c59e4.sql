-- Tighten security for portfolio table and portfolio-images bucket

-- Portfolio table policies
DROP POLICY IF EXISTS "Anyone can view published portfolio items" ON public.portfolio;
DROP POLICY IF EXISTS "Anyone can insert portfolio items" ON public.portfolio;
DROP POLICY IF EXISTS "Anyone can update portfolio items" ON public.portfolio;
DROP POLICY IF EXISTS "Anyone can delete portfolio items" ON public.portfolio;

-- Public can view published + not blocked
CREATE POLICY "Public can view published portfolio"
ON public.portfolio
FOR SELECT
USING ((published = true) AND (blocked = false));

-- Admin can view all
CREATE POLICY "Admins can view all portfolio"
ON public.portfolio
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Admin-only writes
CREATE POLICY "Admins can insert portfolio"
ON public.portfolio
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update portfolio"
ON public.portfolio
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete portfolio"
ON public.portfolio
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Storage policies for portfolio-images bucket
DROP POLICY IF EXISTS "Anyone can view portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete portfolio images" ON storage.objects;

CREATE POLICY "Public can view portfolio images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update portfolio images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'portfolio-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete portfolio images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'portfolio-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
