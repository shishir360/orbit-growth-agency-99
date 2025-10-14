-- Create pages table for dynamic page management
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages
CREATE POLICY "Anyone can view visible pages"
ON public.pages
FOR SELECT
USING (visible = true);

CREATE POLICY "Anyone can insert pages"
ON public.pages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update pages"
ON public.pages
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete pages"
ON public.pages
FOR DELETE
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create pricing table
CREATE TABLE public.pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  billing_period TEXT, -- 'monthly', 'yearly', 'one-time', etc.
  features TEXT[], -- Array of features included
  popular BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pricing
CREATE POLICY "Anyone can view visible pricing"
ON public.pricing
FOR SELECT
USING (visible = true);

CREATE POLICY "Anyone can insert pricing"
ON public.pricing
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update pricing"
ON public.pricing
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete pricing"
ON public.pricing
FOR DELETE
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_pricing_updated_at
BEFORE UPDATE ON public.pricing
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();