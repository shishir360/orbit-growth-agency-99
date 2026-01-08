-- Create trusted_logos table for admin-managed logo carousel
CREATE TABLE public.trusted_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trusted_logos ENABLE ROW LEVEL SECURITY;

-- Allow public read access for visible logos
CREATE POLICY "Anyone can view visible logos"
ON public.trusted_logos
FOR SELECT
USING (visible = true);

-- Allow authenticated admins full access
CREATE POLICY "Admins can manage logos"
ON public.trusted_logos
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_trusted_logos_updated_at
BEFORE UPDATE ON public.trusted_logos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();