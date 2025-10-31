-- Create visitor activities tracking table
CREATE TABLE IF NOT EXISTS public.visitor_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_type TEXT NOT NULL, -- 'contact_form', 'booking', 'pdf_download', 'page_view'
  visitor_ip TEXT,
  visitor_country TEXT,
  visitor_country_code TEXT,
  visitor_city TEXT,
  visitor_region TEXT,
  visitor_timezone TEXT,
  visitor_latitude NUMERIC,
  visitor_longitude NUMERIC,
  visitor_isp TEXT,
  page_url TEXT,
  page_title TEXT,
  user_agent TEXT,
  referrer TEXT,
  related_id UUID, -- Reference to contact_submission, booking, or pdf_lead
  metadata JSONB, -- Additional data like form fields, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_activities ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert activities
CREATE POLICY "Anyone can insert visitor activities"
ON public.visitor_activities
FOR INSERT
WITH CHECK (true);

-- Only admins can view activities
CREATE POLICY "Admins can view all visitor activities"
ON public.visitor_activities
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete activities
CREATE POLICY "Admins can delete visitor activities"
ON public.visitor_activities
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_visitor_activities_type ON public.visitor_activities(activity_type);
CREATE INDEX idx_visitor_activities_created_at ON public.visitor_activities(created_at DESC);
CREATE INDEX idx_visitor_activities_country ON public.visitor_activities(visitor_country);

-- Add location columns to existing tables
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS visitor_ip TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS visitor_country TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS visitor_city TEXT;

ALTER TABLE public.apartment_bookings ADD COLUMN IF NOT EXISTS visitor_ip TEXT;
ALTER TABLE public.apartment_bookings ADD COLUMN IF NOT EXISTS visitor_country TEXT;
ALTER TABLE public.apartment_bookings ADD COLUMN IF NOT EXISTS visitor_city TEXT;

ALTER TABLE public.pdf_leads ADD COLUMN IF NOT EXISTS visitor_ip TEXT;
ALTER TABLE public.pdf_leads ADD COLUMN IF NOT EXISTS visitor_country TEXT;
ALTER TABLE public.pdf_leads ADD COLUMN IF NOT EXISTS visitor_city TEXT;

COMMENT ON TABLE public.visitor_activities IS 'Tracks all visitor activities with IP and location data';