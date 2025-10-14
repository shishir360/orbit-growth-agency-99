-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  image_url TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  page_url TEXT NOT NULL,
  image_path TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company_info table
CREATE TABLE public.company_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  logo TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  description TEXT,
  tagline TEXT,
  founded_year TEXT,
  team_size TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews
CREATE POLICY "Anyone can view visible reviews"
ON public.reviews FOR SELECT USING (visible = true);

CREATE POLICY "Anyone can insert reviews"
ON public.reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update reviews"
ON public.reviews FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete reviews"
ON public.reviews FOR DELETE USING (true);

-- RLS Policies for testimonials
CREATE POLICY "Anyone can view visible testimonials"
ON public.testimonials FOR SELECT USING (visible = true);

CREATE POLICY "Anyone can insert testimonials"
ON public.testimonials FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update testimonials"
ON public.testimonials FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete testimonials"
ON public.testimonials FOR DELETE USING (true);

-- RLS Policies for services
CREATE POLICY "Anyone can view visible services"
ON public.services FOR SELECT USING (visible = true);

CREATE POLICY "Anyone can insert services"
ON public.services FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update services"
ON public.services FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete services"
ON public.services FOR DELETE USING (true);

-- RLS Policies for company_info
CREATE POLICY "Anyone can view company info"
ON public.company_info FOR SELECT USING (true);

CREATE POLICY "Anyone can insert company info"
ON public.company_info FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update company info"
ON public.company_info FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete company info"
ON public.company_info FOR DELETE USING (true);

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_info_updated_at
BEFORE UPDATE ON public.company_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default company info
INSERT INTO public.company_info (
  company_name, logo, email, phone, address, website, 
  description, tagline, founded_year, team_size,
  linkedin_url, twitter_url, facebook_url, instagram_url
) VALUES (
  'LUNEXO MEDIA',
  'L',
  'hello@lunexomedia.com',
  '+1 (555) 123-4567',
  '123 Business Street, Suite 100, City, State 12345',
  'https://lunexomedia.com',
  'We help creators and businesses launch custom membership sites and SaaS MVPs—without the dev headache.',
  'Build Membership Sites and SaaS Products That Scale',
  '2024',
  '5-10',
  'https://linkedin.com/company/lunexomedia',
  'https://twitter.com/lunexomedia',
  'https://facebook.com/lunexomedia',
  'https://instagram.com/lunexomedia'
);