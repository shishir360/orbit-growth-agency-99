-- Create table for PDF landing pages
CREATE TABLE IF NOT EXISTS public.pdf_landing_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  
  -- Hero Section
  logo_text TEXT DEFAULT 'Hip2Keto',
  hero_bg_color TEXT DEFAULT '#FFD84D',
  main_headline TEXT DEFAULT '20 Crave-worthy Keto Recipes',
  subheadline TEXT DEFAULT 'Think going keto is hard? Think again.',
  hero_description TEXT,
  hero_image_url TEXT,
  conversion_rate TEXT DEFAULT '88%',
  conversion_badge_color TEXT DEFAULT '#6366f1',
  hero_cta_text TEXT DEFAULT 'Get the Free eBook',
  hero_cta_bg_color TEXT DEFAULT '#ffffff',
  hero_cta_text_color TEXT DEFAULT '#000000',
  
  -- Popup/Modal
  popup_title TEXT DEFAULT 'Ready to get your keto on?',
  popup_subtitle TEXT DEFAULT 'Get these delicious recipes sent to your inbox.',
  popup_button_text TEXT DEFAULT 'SEND ME THE EBOOK',
  popup_button_bg_color TEXT DEFAULT '#FFD84D',
  popup_button_text_color TEXT DEFAULT '#000000',
  privacy_text TEXT DEFAULT 'We hate spam and promise to keep your email address safe.',
  
  -- Mid Section
  mid_headline TEXT DEFAULT 'Yes, you can still eat pizza!',
  mid_description TEXT,
  mid_cta_text TEXT DEFAULT 'Get My Free Cookbook',
  mid_cta_bg_color TEXT DEFAULT '#FFD84D',
  mid_cta_text_color TEXT DEFAULT '#000000',
  
  -- Images for mid section (3 images)
  mid_image_1_url TEXT,
  mid_image_2_url TEXT,
  mid_image_3_url TEXT,
  
  -- PDF Document
  pdf_document_id UUID REFERENCES public.pdf_documents(id),
  
  -- Footer
  footer_bg_color TEXT DEFAULT '#f3f4f6',
  footer_text TEXT DEFAULT '© 2025 All rights reserved.',
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pdf_landing_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active landing pages
CREATE POLICY "Anyone can view active PDF landing pages"
  ON public.pdf_landing_pages
  FOR SELECT
  USING (is_active = true);

-- Admin can do everything (you'll need to add admin auth later)
CREATE POLICY "Admin can manage PDF landing pages"
  ON public.pdf_landing_pages
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE TRIGGER update_pdf_landing_pages_updated_at
  BEFORE UPDATE ON public.pdf_landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();