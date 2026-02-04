-- Create blog_categories table for categorizing blog posts
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view categories
CREATE POLICY "Anyone can view categories"
ON public.blog_categories
FOR SELECT
USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can manage categories"
ON public.blog_categories
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.blog_categories (name, slug, description, color, display_order) VALUES
('Web Development', 'web-development', 'Articles about web development and programming', '#3B82F6', 1),
('Digital Marketing', 'digital-marketing', 'Tips and strategies for digital marketing', '#10B981', 2),
('AI & Automation', 'ai-automation', 'Latest trends in AI and business automation', '#8B5CF6', 3),
('SEO', 'seo', 'Search engine optimization tips and guides', '#F59E0B', 4),
('Business Growth', 'business-growth', 'Strategies for growing your business', '#EF4444', 5);