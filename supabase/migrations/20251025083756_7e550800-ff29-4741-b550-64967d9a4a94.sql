-- Add iframe_url column to pages table for embedding external websites
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS iframe_url TEXT;