-- =====================================================
-- FIX SECURITY ISSUES: Remove SECURITY DEFINER from view and fix function search paths
-- =====================================================

-- 1. FIX SECURITY DEFINER VIEW
-- The transactions view doesn't need SECURITY DEFINER since it just combines data
-- from tables that already have proper RLS policies. Drop and recreate as SECURITY INVOKER.

DROP VIEW IF EXISTS public.transactions;

CREATE VIEW public.transactions 
WITH (security_invoker = true)
AS
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

-- 2. FIX FUNCTION SEARCH PATH for generate_invoice_number
-- This function needs a stable search_path to prevent security issues

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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