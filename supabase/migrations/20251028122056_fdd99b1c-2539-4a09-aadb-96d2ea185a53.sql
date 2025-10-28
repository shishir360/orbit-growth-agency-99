-- Add receipt_url column to invoices table for payment receipt uploads
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS receipt_url text;

-- Add comment to explain the column
COMMENT ON COLUMN public.invoices.receipt_url IS 'URL to uploaded payment receipt screenshot or document';