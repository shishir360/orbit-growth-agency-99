-- Ensure RLS policies allow updates (WITH CHECK) to avoid violations
alter table public.blog_posts enable row level security;
alter table public.images enable row level security;

-- Recreate UPDATE policies with WITH CHECK
DROP POLICY IF EXISTS "Anyone can update blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update images" ON public.images;
CREATE POLICY "Anyone can update images"
ON public.images
FOR UPDATE
USING (true)
WITH CHECK (true);
