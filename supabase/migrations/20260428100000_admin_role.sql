-- Admin role: hybrid system with env super-admin + DB-promoted admins.
-- - profiles.role already exists ('tenant' | 'admin' | 'partner' | 'lead')
-- - admin_audit_log tracks promotions/demotions
-- - RLS allows admins to read/update all profiles (for /admin/team)

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  actor_email text,
  action text not null,
  target_user_id uuid references auth.users(id) on delete set null,
  target_email text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_log_created_at_idx
  on public.admin_audit_log (created_at desc);

alter table public.admin_audit_log enable row level security;

-- Helper: current authenticated user has profiles.role = 'admin'.
-- Note: env-based super-admin is checked in app code, not here.
create or replace function public.current_user_is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Profiles: admins can read all rows (so /admin/team can list them)
drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.current_user_is_admin());

-- Profiles: admins can update any row (role changes happen via service role,
-- but this lets admins edit names/phones too)
drop policy if exists "Admins update all profiles" on public.profiles;
create policy "Admins update all profiles"
  on public.profiles for update
  using (public.current_user_is_admin())
  with check (public.current_user_is_admin());

-- Audit log: admins can read everything
drop policy if exists "Admins read audit log" on public.admin_audit_log;
create policy "Admins read audit log"
  on public.admin_audit_log for select
  using (public.current_user_is_admin());
