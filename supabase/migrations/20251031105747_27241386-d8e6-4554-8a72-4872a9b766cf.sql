-- Add phone column to pdf_leads table
ALTER TABLE public.pdf_leads 
ADD COLUMN IF NOT EXISTS phone text;