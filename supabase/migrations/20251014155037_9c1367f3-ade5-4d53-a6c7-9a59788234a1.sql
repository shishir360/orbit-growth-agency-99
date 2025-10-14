-- Create portfolio table for project showcase
CREATE TABLE public.portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  technologies TEXT[],
  published BOOLEAN NOT NULL DEFAULT false,
  blocked BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio
CREATE POLICY "Anyone can view published portfolio items"
ON public.portfolio
FOR SELECT
USING (published = true AND blocked = false);

CREATE POLICY "Anyone can insert portfolio items"
ON public.portfolio
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update portfolio items"
ON public.portfolio
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete portfolio items"
ON public.portfolio
FOR DELETE
USING (true);

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_updated_at
BEFORE UPDATE ON public.portfolio
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();