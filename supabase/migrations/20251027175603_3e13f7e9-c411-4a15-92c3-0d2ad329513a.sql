-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can insert contact submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create PDF documents table for admin uploads
CREATE TABLE public.pdf_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  category TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pdf_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for PDF documents
CREATE POLICY "Anyone can view visible PDF documents"
ON public.pdf_documents
FOR SELECT
USING (visible = true);

CREATE POLICY "Admins can view all PDF documents"
ON public.pdf_documents
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert PDF documents"
ON public.pdf_documents
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update PDF documents"
ON public.pdf_documents
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete PDF documents"
ON public.pdf_documents
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_pdf_documents_updated_at
  BEFORE UPDATE ON public.pdf_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('contact-pdfs', 'contact-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for contact-pdfs
CREATE POLICY "Anyone can view contact PDFs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'contact-pdfs');

CREATE POLICY "Admins can upload contact PDFs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'contact-pdfs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact PDFs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'contact-pdfs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact PDFs"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'contact-pdfs' AND public.has_role(auth.uid(), 'admin'));