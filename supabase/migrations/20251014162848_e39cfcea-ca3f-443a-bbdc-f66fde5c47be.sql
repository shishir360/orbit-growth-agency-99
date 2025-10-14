-- Update RLS policy for blog_posts to allow viewing all posts (including drafts and blocked)
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;

CREATE POLICY "Anyone can view all blog posts" 
ON blog_posts 
FOR SELECT 
TO public
USING (true);

-- Ensure insert, update, and delete policies allow all operations
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON blog_posts;

CREATE POLICY "Anyone can insert blog posts" 
ON blog_posts 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts" 
ON blog_posts 
FOR UPDATE 
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete blog posts" 
ON blog_posts 
FOR DELETE 
TO public
USING (true);