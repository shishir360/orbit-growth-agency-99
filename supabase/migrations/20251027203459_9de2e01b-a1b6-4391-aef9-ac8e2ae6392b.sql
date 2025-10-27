-- Fix RLS policy for contact_submissions to allow anonymous inserts
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;

CREATE POLICY "Anyone can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);