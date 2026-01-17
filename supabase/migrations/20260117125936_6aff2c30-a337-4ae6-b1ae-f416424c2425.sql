-- Create wallet_transactions table for multi-currency tracking
CREATE TABLE public.wallet_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(15, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  amount_in_usd DECIMAL(15, 2),
  exchange_rate DECIMAL(15, 6) DEFAULT 1,
  purpose TEXT NOT NULL,
  description TEXT,
  category TEXT,
  payment_method TEXT DEFAULT 'cash',
  country TEXT,
  source TEXT DEFAULT 'admin',
  telegram_message_id TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admins can manage wallet transactions"
ON public.wallet_transactions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_wallet_transactions_updated_at
BEFORE UPDATE ON public.wallet_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create supported currencies table
CREATE TABLE public.supported_currencies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  country TEXT,
  exchange_rate_to_usd DECIMAL(15, 6) DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.supported_currencies ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admins can manage currencies"
ON public.supported_currencies
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create policy for public read
CREATE POLICY "Anyone can view currencies"
ON public.supported_currencies
FOR SELECT
USING (true);

-- Insert common currencies
INSERT INTO public.supported_currencies (code, name, symbol, country, exchange_rate_to_usd) VALUES
('USD', 'US Dollar', '$', 'United States', 1),
('BDT', 'Bangladeshi Taka', '৳', 'Bangladesh', 0.0091),
('EUR', 'Euro', '€', 'European Union', 1.08),
('GBP', 'British Pound', '£', 'United Kingdom', 1.27),
('INR', 'Indian Rupee', '₹', 'India', 0.012),
('AED', 'UAE Dirham', 'د.إ', 'United Arab Emirates', 0.27),
('SAR', 'Saudi Riyal', '﷼', 'Saudi Arabia', 0.27),
('MYR', 'Malaysian Ringgit', 'RM', 'Malaysia', 0.21),
('SGD', 'Singapore Dollar', 'S$', 'Singapore', 0.74),
('CAD', 'Canadian Dollar', 'C$', 'Canada', 0.74),
('AUD', 'Australian Dollar', 'A$', 'Australia', 0.65),
('JPY', 'Japanese Yen', '¥', 'Japan', 0.0067),
('CNY', 'Chinese Yuan', '¥', 'China', 0.14),
('PKR', 'Pakistani Rupee', '₨', 'Pakistan', 0.0036),
('PHP', 'Philippine Peso', '₱', 'Philippines', 0.018);

-- Create trigger for currencies updated_at
CREATE TRIGGER update_supported_currencies_updated_at
BEFORE UPDATE ON public.supported_currencies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();