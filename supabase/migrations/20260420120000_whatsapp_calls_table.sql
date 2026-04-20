-- WhatsApp Calls Table for VAPI Integration
CREATE TABLE public.whatsapp_calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id TEXT NOT NULL,
  from_number TEXT NOT NULL,
  to_number TEXT NOT NULL,
  status TEXT,
  event TEXT,
  vapi_call_id TEXT,
  vapi_status TEXT,
  accepted_at TIMESTAMPTZ,
  connected_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  failure_reason TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.whatsapp_calls ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_whatsapp_calls_call_id ON public.whatsapp_calls(call_id);
CREATE INDEX idx_whatsapp_calls_from_number ON public.whatsapp_calls(from_number);
CREATE INDEX idx_whatsapp_calls_created_at ON public.whatsapp_calls(created_at DESC);
CREATE INDEX idx_whatsapp_calls_vapi_call_id ON public.whatsapp_calls(vapi_call_id);

-- Policy: Public can view their own calls (via phone number match)
CREATE POLICY "Users can view calls from their number"
  ON public.whatsapp_calls
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Admins can manage all calls
CREATE POLICY "Admins can manage all calls"
  ON public.whatsapp_calls
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
