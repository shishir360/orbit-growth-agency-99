
-- Outreach Leads CRM
CREATE TABLE public.outreach_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  business TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT,
  platform TEXT NOT NULL DEFAULT 'Other',
  niche TEXT NOT NULL DEFAULT 'Other',
  status TEXT NOT NULL DEFAULT 'new',
  country TEXT NOT NULL DEFAULT 'USA',
  website TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outreach Email Log
CREATE TABLE public.outreach_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_to TEXT NOT NULL,
  business TEXT NOT NULL DEFAULT '',
  email_address TEXT,
  subject TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Sent',
  followup_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outreach DM Log
CREATE TABLE public.outreach_dms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL DEFAULT 'Instagram',
  sent_to TEXT NOT NULL,
  business TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Sent',
  reply TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outreach Posts / Content
CREATE TABLE public.outreach_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL DEFAULT 'LinkedIn',
  post_type TEXT NOT NULL DEFAULT 'Tip/Value',
  post_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'Draft',
  content TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outreach Daily Tracker Logs
CREATE TABLE public.outreach_daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE UNIQUE,
  emails_count INTEGER DEFAULT 0,
  dms_count INTEGER DEFAULT 0,
  sms_count INTEGER DEFAULT 0,
  calls_count INTEGER DEFAULT 0,
  proposals_count INTEGER DEFAULT 0,
  closes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outreach Revenue / Deals
CREATE TABLE public.outreach_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  business TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_status TEXT NOT NULL DEFAULT 'Pending',
  deal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outreach Custom Tasks
CREATE TABLE public.outreach_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  time_slot TEXT,
  category TEXT NOT NULL DEFAULT 'blue',
  is_checked BOOLEAN DEFAULT false,
  task_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.outreach_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_dms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_tasks ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for all outreach tables
CREATE POLICY "Admin full access on outreach_leads" ON public.outreach_leads FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin full access on outreach_emails" ON public.outreach_emails FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin full access on outreach_dms" ON public.outreach_dms FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin full access on outreach_posts" ON public.outreach_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin full access on outreach_daily_logs" ON public.outreach_daily_logs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin full access on outreach_deals" ON public.outreach_deals FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin full access on outreach_tasks" ON public.outreach_tasks FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
