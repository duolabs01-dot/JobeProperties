-- Profiles table mirrors auth.users with public-facing fields.
-- Auto-created on signup; tenant rows are linked by matching email/phone.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  role text not null default 'tenant' check (role in ('tenant', 'admin', 'partner', 'lead')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (lower(email));
create index if not exists profiles_role_idx on public.profiles (role);

alter table public.profiles enable row level security;

drop policy if exists "Profiles selectable by owner" on public.profiles;
create policy "Profiles selectable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles updatable by owner" on public.profiles;
create policy "Profiles updatable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Touch updated_at on profile updates
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'phone', new.phone)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Link existing tenant rows to their auth user on first login
create or replace function public.link_tenant_to_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  digits_new text := regexp_replace(coalesce(new.phone, ''), '\D', '', 'g');
begin
  update public.tenants
  set auth_user_id = new.id
  where auth_user_id is null
    and (
      (new.email is not null and lower(email) = lower(new.email))
      or (
        length(digits_new) >= 9
        and regexp_replace(coalesce(phone, ''), '\D', '', 'g') = digits_new
      )
    );
  return new;
end;
$$;

drop trigger if exists on_auth_user_link_tenant on auth.users;
create trigger on_auth_user_link_tenant
  after insert on auth.users
  for each row execute function public.link_tenant_to_auth();

-- Backfill: profiles for any existing auth users
insert into public.profiles (id, email)
select u.id, u.email
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;
