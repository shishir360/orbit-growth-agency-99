-- Create a secure function that grants admin to the logged-in user only if their email matches the owner email
create or replace function public.grant_admin_to_self_if_allowed()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select email into v_email from auth.users where id = auth.uid();

  if v_email = 'shishirmd681@gmail.com' then
    insert into public.user_roles (user_id, role)
    values (auth.uid(), 'admin'::public.app_role)
    on conflict (user_id, role) do nothing;
  else
    -- Do nothing for non-owner emails
    null;
  end if;
end;
$$;

-- Allow authenticated users to execute (logic inside restricts to the owner only)
grant execute on function public.grant_admin_to_self_if_allowed() to authenticated;