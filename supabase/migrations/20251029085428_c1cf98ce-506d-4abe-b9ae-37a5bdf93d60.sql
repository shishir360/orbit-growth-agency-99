-- Create table to store Web Push subscriptions
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  is_admin boolean not null default true,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.push_subscriptions enable row level security;

-- Allow anyone to insert their own subscription (no auth required)
create policy "Allow insert for all" on public.push_subscriptions
for insert
with check (true);

-- Only allow service role to select (used by backend functions)
create policy "Service role can select" on public.push_subscriptions
for select
using (auth.role() = 'service_role');

-- Only allow service role to delete/update (cleanup invalid subscriptions)
create policy "Service role can modify" on public.push_subscriptions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- Helpful index for cleanup/queries
create index if not exists idx_push_subscriptions_created_at on public.push_subscriptions(created_at desc);