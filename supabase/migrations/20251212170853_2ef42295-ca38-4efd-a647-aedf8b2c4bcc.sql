-- Create automation_rules table for Social Automation feature
CREATE TABLE public.automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  trigger_keywords TEXT[] NOT NULL DEFAULT '{}',
  response_message TEXT NOT NULL,
  send_dm BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  dm_count INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

-- Admin-only policies
CREATE POLICY "Admins can view automation rules" ON public.automation_rules
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert automation rules" ON public.automation_rules
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update automation rules" ON public.automation_rules
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete automation rules" ON public.automation_rules
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_automation_rules_updated_at
  BEFORE UPDATE ON public.automation_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();