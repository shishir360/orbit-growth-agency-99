-- Add landing page type to pages table
ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS is_landing_page BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS html_file_url TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.pages.is_landing_page IS 'If true, page renders without header/footer navigation';
COMMENT ON COLUMN public.pages.html_file_url IS 'URL to uploaded HTML file in storage';