-- Create admin user directly (you'll need to sign up once with this email first)
-- This just adds the admin role once the user signs up

-- Note: The user must sign up through the UI first with email: shishirmd681@gmail.com
-- After signup, this trigger will automatically assign admin role

CREATE OR REPLACE FUNCTION public.assign_admin_role_to_specific_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only assign admin role to the specific email
  IF NEW.email = 'shishirmd681@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-assign admin role for the specific user
DROP TRIGGER IF EXISTS auto_assign_admin_role ON auth.users;
CREATE TRIGGER auto_assign_admin_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_admin_role_to_specific_user();