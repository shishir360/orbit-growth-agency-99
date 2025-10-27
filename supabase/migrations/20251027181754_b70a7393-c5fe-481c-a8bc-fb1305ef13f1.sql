-- Add slug column to pdf_documents table for SEO-friendly URLs
ALTER TABLE public.pdf_documents 
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_pdf_documents_slug ON public.pdf_documents(slug);

-- Create table to track PDF access requests (lead generation)
CREATE TABLE IF NOT EXISTS public.pdf_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pdf_id uuid REFERENCES public.pdf_documents(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on pdf_access_requests
ALTER TABLE public.pdf_access_requests ENABLE ROW LEVEL SECURITY;

-- Admins can view all PDF access requests
CREATE POLICY "Admins can view all PDF access requests"
ON public.pdf_access_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert PDF access requests (lead capture)
CREATE POLICY "Anyone can insert PDF access requests"
ON public.pdf_access_requests
FOR INSERT
WITH CHECK (true);

-- Admins can delete PDF access requests
CREATE POLICY "Admins can delete PDF access requests"
ON public.pdf_access_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_pdf_access_requests_pdf_id ON public.pdf_access_requests(pdf_id);
CREATE INDEX IF NOT EXISTS idx_pdf_access_requests_email ON public.pdf_access_requests(email);
CREATE INDEX IF NOT EXISTS idx_pdf_access_requests_created_at ON public.pdf_access_requests(created_at DESC);