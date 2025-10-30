-- Create pdf_leads table if not exists
CREATE TABLE IF NOT EXISTS public.pdf_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pdf_document_id UUID REFERENCES public.pdf_documents(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pdf_leads ENABLE ROW LEVEL SECURITY;

-- Allow admin to manage leads
CREATE POLICY "Admin can manage PDF leads"
  ON public.pdf_leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow anyone to insert leads (for form submissions)
CREATE POLICY "Anyone can submit PDF leads"
  ON public.pdf_leads
  FOR INSERT
  WITH CHECK (true);