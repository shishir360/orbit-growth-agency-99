-- Add payment receipt URL column to invoices table
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS payment_receipt_url text;

-- Create storage bucket for invoice receipts
INSERT INTO storage.buckets (id, name, public) 
VALUES ('invoice-receipts', 'invoice-receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for invoice receipts
CREATE POLICY "Anyone can view invoice receipts"
ON storage.objects FOR SELECT
USING (bucket_id = 'invoice-receipts');

CREATE POLICY "Authenticated users can upload invoice receipts"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'invoice-receipts');

CREATE POLICY "Authenticated users can update invoice receipts"
ON storage.objects FOR UPDATE
USING (bucket_id = 'invoice-receipts');

CREATE POLICY "Authenticated users can delete invoice receipts"
ON storage.objects FOR DELETE
USING (bucket_id = 'invoice-receipts');