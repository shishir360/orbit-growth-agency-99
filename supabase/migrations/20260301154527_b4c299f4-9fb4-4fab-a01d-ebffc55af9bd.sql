
-- Fix blog_posts: restrict write operations to admins, allow public read of published posts
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view all blog posts" ON public.blog_posts;

CREATE POLICY "Public can view published posts" ON public.blog_posts
  FOR SELECT USING (published = true AND blocked = false);

CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix blog-images storage: restrict uploads to admins
DROP POLICY IF EXISTS "Anyone can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;

CREATE POLICY "Admins can manage blog images" ON storage.objects
  FOR ALL USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');
