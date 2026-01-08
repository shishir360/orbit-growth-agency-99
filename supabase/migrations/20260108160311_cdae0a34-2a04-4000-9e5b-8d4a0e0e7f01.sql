-- Create completed_clients table for clients whose work is completed
CREATE TABLE public.completed_clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.completed_clients ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Completed clients are viewable by everyone" 
ON public.completed_clients 
FOR SELECT 
USING (visible = true);

-- Admin full access (for authenticated admins)
CREATE POLICY "Admins can manage completed clients" 
ON public.completed_clients 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_completed_clients_updated_at
BEFORE UPDATE ON public.completed_clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();