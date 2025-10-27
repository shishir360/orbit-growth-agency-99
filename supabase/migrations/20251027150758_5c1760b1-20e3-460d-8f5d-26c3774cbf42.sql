-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT NOT NULL DEFAULT 'USA',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  notes TEXT,
  payment_terms TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoice_items table
CREATE TABLE public.invoice_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients
CREATE POLICY "Anyone can view clients"
  ON public.clients FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert clients"
  ON public.clients FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update clients"
  ON public.clients FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete clients"
  ON public.clients FOR DELETE
  USING (true);

-- RLS Policies for invoices
CREATE POLICY "Anyone can view invoices"
  ON public.invoices FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert invoices"
  ON public.invoices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update invoices"
  ON public.invoices FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete invoices"
  ON public.invoices FOR DELETE
  USING (true);

-- RLS Policies for invoice_items
CREATE POLICY "Anyone can view invoice items"
  ON public.invoice_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert invoice items"
  ON public.invoice_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update invoice items"
  ON public.invoice_items FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete invoice items"
  ON public.invoice_items FOR DELETE
  USING (true);

-- Create trigger for updated_at on clients
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on invoices
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  next_number INTEGER;
  invoice_num TEXT;
BEGIN
  -- Get the next invoice number
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-(\d+)') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.invoices;
  
  -- Format as INV-0001, INV-0002, etc.
  invoice_num := 'INV-' || LPAD(next_number::TEXT, 4, '0');
  
  RETURN invoice_num;
END;
$$;