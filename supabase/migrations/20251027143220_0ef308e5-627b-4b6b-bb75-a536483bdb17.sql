-- Create apartment_bookings table
CREATE TABLE public.apartment_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  meeting_platform TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.apartment_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for apartment_bookings
CREATE POLICY "Anyone can view all apartment bookings"
ON public.apartment_bookings
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert apartment bookings"
ON public.apartment_bookings
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update apartment bookings"
ON public.apartment_bookings
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete apartment bookings"
ON public.apartment_bookings
FOR DELETE
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_apartment_bookings_updated_at
BEFORE UPDATE ON public.apartment_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();