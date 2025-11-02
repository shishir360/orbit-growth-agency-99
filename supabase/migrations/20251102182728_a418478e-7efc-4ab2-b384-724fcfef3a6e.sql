-- Create work_types table for predefined work types
CREATE TABLE IF NOT EXISTS public.work_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.work_types ENABLE ROW LEVEL SECURITY;

-- Create policies for work_types
CREATE POLICY "Anyone can view work types" 
ON public.work_types 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert work types" 
ON public.work_types 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update work types" 
ON public.work_types 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete work types" 
ON public.work_types 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add work_types column to clients table (stores array of work type names)
ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS work_types TEXT[] DEFAULT '{}';

-- Insert some default work types
INSERT INTO public.work_types (name) VALUES
  ('Website Design'),
  ('AI Automation'),
  ('Google Ads Management'),
  ('SEO Optimization'),
  ('Social Media Marketing'),
  ('Content Creation'),
  ('Email Marketing'),
  ('Consulting')
ON CONFLICT (name) DO NOTHING;