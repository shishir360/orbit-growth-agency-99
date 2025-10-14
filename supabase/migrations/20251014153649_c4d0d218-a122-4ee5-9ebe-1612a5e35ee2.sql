-- Add INSERT, UPDATE, DELETE policies for blog_posts (for admin operations)
CREATE POLICY "Anyone can insert blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete blog posts"
ON public.blog_posts
FOR DELETE
USING (true);

-- Add INSERT, UPDATE, DELETE policies for images
CREATE POLICY "Anyone can insert images"
ON public.images
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update images"
ON public.images
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete images"
ON public.images
FOR DELETE
USING (true);