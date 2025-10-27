-- Create expenses table for tracking all business expenses
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL,
  vendor TEXT,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  receipt_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'paid'
);

-- Create income table for tracking all revenue
CREATE TABLE IF NOT EXISTS public.income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  source TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  receipt_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'received'
);

-- Create transactions view for combined income/expense reporting
CREATE OR REPLACE VIEW public.transactions AS
SELECT 
  id,
  'expense' as type,
  date,
  description,
  amount * -1 as amount,
  category as category,
  payment_method,
  client_id,
  invoice_id,
  status,
  created_at
FROM public.expenses
UNION ALL
SELECT 
  id,
  'income' as type,
  date,
  description,
  amount,
  source as category,
  payment_method,
  client_id,
  invoice_id,
  status,
  created_at
FROM public.income
ORDER BY date DESC, created_at DESC;

-- Enable RLS
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for expenses
CREATE POLICY "Admins can view all expenses"
  ON public.expenses FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert expenses"
  ON public.expenses FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update expenses"
  ON public.expenses FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete expenses"
  ON public.expenses FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for income
CREATE POLICY "Admins can view all income"
  ON public.income FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert income"
  ON public.income FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update income"
  ON public.income FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete income"
  ON public.income FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updating updated_at
CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_income_updated_at
  BEFORE UPDATE ON public.income
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();