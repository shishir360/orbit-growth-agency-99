-- Create table for received emails
CREATE TABLE public.received_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_email TEXT NOT NULL,
  from_name TEXT,
  to_email TEXT NOT NULL DEFAULT 'hello@lunexomedia.com',
  subject TEXT NOT NULL,
  text_body TEXT,
  html_body TEXT,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_replied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.received_emails ENABLE ROW LEVEL SECURITY;

-- Admin only policies
CREATE POLICY "Admins can view received emails"
  ON public.received_emails FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update received emails"
  ON public.received_emails FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete received emails"
  ON public.received_emails FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow webhook to insert
CREATE POLICY "Service can insert received emails"
  ON public.received_emails FOR INSERT
  WITH CHECK (true);