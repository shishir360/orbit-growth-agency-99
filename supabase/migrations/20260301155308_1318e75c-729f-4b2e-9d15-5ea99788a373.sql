
-- ============================================================
-- FIX 1: Permissive RLS policies on business-critical tables
-- ============================================================

-- apartment_bookings: allow public INSERT, admin-only UPDATE/DELETE/SELECT(all)
DROP POLICY IF EXISTS "Anyone can delete apartment bookings" ON public.apartment_bookings;
DROP POLICY IF EXISTS "Anyone can insert apartment bookings" ON public.apartment_bookings;
DROP POLICY IF EXISTS "Anyone can update apartment bookings" ON public.apartment_bookings;
DROP POLICY IF EXISTS "Anyone can view all apartment bookings" ON public.apartment_bookings;

CREATE POLICY "Anyone can insert apartment bookings" ON public.apartment_bookings
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update apartment bookings" ON public.apartment_bookings
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete apartment bookings" ON public.apartment_bookings
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all apartment bookings" ON public.apartment_bookings
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

-- clients: admin-only
DROP POLICY IF EXISTS "Anyone can delete clients" ON public.clients;
DROP POLICY IF EXISTS "Anyone can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Anyone can update clients" ON public.clients;
DROP POLICY IF EXISTS "Anyone can view clients" ON public.clients;

CREATE POLICY "Admins can manage clients" ON public.clients
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- invoices: admin-only
DROP POLICY IF EXISTS "Anyone can delete invoices" ON public.invoices;
DROP POLICY IF EXISTS "Anyone can insert invoices" ON public.invoices;
DROP POLICY IF EXISTS "Anyone can update invoices" ON public.invoices;
DROP POLICY IF EXISTS "Anyone can view invoices" ON public.invoices;

CREATE POLICY "Admins can manage invoices" ON public.invoices
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- invoice_items: admin-only
DROP POLICY IF EXISTS "Anyone can delete invoice items" ON public.invoice_items;
DROP POLICY IF EXISTS "Anyone can insert invoice items" ON public.invoice_items;
DROP POLICY IF EXISTS "Anyone can update invoice items" ON public.invoice_items;
DROP POLICY IF EXISTS "Anyone can view invoice items" ON public.invoice_items;

CREATE POLICY "Admins can manage invoice items" ON public.invoice_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- reviews: public INSERT, public SELECT visible, admin-only UPDATE/DELETE
DROP POLICY IF EXISTS "Anyone can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can view visible reviews" ON public.reviews;

CREATE POLICY "Anyone can insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view visible reviews" ON public.reviews
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can view all reviews" ON public.reviews
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update reviews" ON public.reviews
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete reviews" ON public.reviews
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- testimonials: admin-only write, public SELECT visible
DROP POLICY IF EXISTS "Anyone can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can view visible testimonials" ON public.testimonials;

CREATE POLICY "Public can view visible testimonials" ON public.testimonials
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- services: admin-only write, public SELECT visible
DROP POLICY IF EXISTS "Anyone can delete services" ON public.services;
DROP POLICY IF EXISTS "Anyone can insert services" ON public.services;
DROP POLICY IF EXISTS "Anyone can update services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view visible services" ON public.services;

CREATE POLICY "Public can view visible services" ON public.services
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- pricing: admin-only write, public SELECT visible
DROP POLICY IF EXISTS "Anyone can delete pricing" ON public.pricing;
DROP POLICY IF EXISTS "Anyone can insert pricing" ON public.pricing;
DROP POLICY IF EXISTS "Anyone can update pricing" ON public.pricing;
DROP POLICY IF EXISTS "Anyone can view visible pricing" ON public.pricing;

CREATE POLICY "Public can view visible pricing" ON public.pricing
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage pricing" ON public.pricing
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- pages: admin-only write, public SELECT visible
DROP POLICY IF EXISTS "Anyone can delete pages" ON public.pages;
DROP POLICY IF EXISTS "Anyone can insert pages" ON public.pages;
DROP POLICY IF EXISTS "Anyone can update pages" ON public.pages;
DROP POLICY IF EXISTS "Anyone can view visible pages" ON public.pages;
DROP POLICY IF EXISTS "Anyone can view pages" ON public.pages;

CREATE POLICY "Public can view visible pages" ON public.pages
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage pages" ON public.pages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- company_info: admin-only write, public SELECT
DROP POLICY IF EXISTS "Anyone can delete company info" ON public.company_info;
DROP POLICY IF EXISTS "Anyone can insert company info" ON public.company_info;
DROP POLICY IF EXISTS "Anyone can insert company" ON public.company_info;
DROP POLICY IF EXISTS "Anyone can update company info" ON public.company_info;
DROP POLICY IF EXISTS "Anyone can view company info" ON public.company_info;

CREATE POLICY "Public can view company info" ON public.company_info
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage company info" ON public.company_info
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- images: admin-only write, public SELECT
DROP POLICY IF EXISTS "Anyone can delete images" ON public.images;
DROP POLICY IF EXISTS "Anyone can insert images" ON public.images;
DROP POLICY IF EXISTS "Anyone can update images" ON public.images;
DROP POLICY IF EXISTS "Anyone can view images" ON public.images;

CREATE POLICY "Public can view images" ON public.images
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage images" ON public.images
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- pdf_landing_pages: fix admin policy to use role check
DROP POLICY IF EXISTS "Admin can manage PDF landing pages" ON public.pdf_landing_pages;
DROP POLICY IF EXISTS "Anyone can view active PDF landing pages" ON public.pdf_landing_pages;

CREATE POLICY "Public can view active PDF landing pages" ON public.pdf_landing_pages
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage PDF landing pages" ON public.pdf_landing_pages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- pdf_leads: fix admin policy to use role check
DROP POLICY IF EXISTS "Admin can manage PDF leads" ON public.pdf_leads;
DROP POLICY IF EXISTS "Anyone can submit PDF leads" ON public.pdf_leads;

CREATE POLICY "Anyone can submit PDF leads" ON public.pdf_leads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage PDF leads" ON public.pdf_leads
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- ============================================================
-- FIX 2: feedback-screenshots storage bucket policies
-- ============================================================

DROP POLICY IF EXISTS "Admins can upload feedback screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete feedback screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view feedback screenshots" ON storage.objects;

CREATE POLICY "Admins can upload feedback screenshots" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'feedback-screenshots' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update feedback screenshots" ON storage.objects
  FOR UPDATE USING (bucket_id = 'feedback-screenshots' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete feedback screenshots" ON storage.objects
  FOR DELETE USING (bucket_id = 'feedback-screenshots' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view feedback screenshots" ON storage.objects
  FOR SELECT USING (bucket_id = 'feedback-screenshots');
