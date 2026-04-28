-- Backfill: link existing auth users to tenant rows by matching email/phone.
-- The trigger added in 20260427120000_profiles only fires AFTER INSERT on
-- auth.users, so accounts created before that migration never get linked.
-- This pass catches them, and a complementary trigger keeps things in sync if
-- a tenant row's email/phone is updated later.

do $$
declare
  matched int;
begin
  with linked as (
    update public.tenants t
    set auth_user_id = u.id
    from auth.users u
    where t.auth_user_id is null
      and (
        (u.email is not null and lower(t.email) = lower(u.email))
        or (
          length(regexp_replace(coalesce(u.phone, ''), '\D', '', 'g')) >= 9
          and regexp_replace(t.phone, '\D', '', 'g')
              = regexp_replace(coalesce(u.phone, ''), '\D', '', 'g')
        )
      )
    returning t.id
  )
  select count(*) into matched from linked;
  raise notice 'Linked % existing tenant rows to auth users', matched;
end $$;

-- Also handle the inverse: when a tenant row is later updated with a new
-- email/phone, link to the matching auth user if one exists.
create or replace function public.link_tenant_on_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  matched_user uuid;
  digits_new text;
begin
  if new.auth_user_id is not null then
    return new;
  end if;

  digits_new := regexp_replace(coalesce(new.phone, ''), '\D', '', 'g');

  select u.id into matched_user
  from auth.users u
  where (new.email is not null and lower(u.email) = lower(new.email))
     or (length(digits_new) >= 9
         and regexp_replace(coalesce(u.phone, ''), '\D', '', 'g') = digits_new)
  limit 1;

  if matched_user is not null then
    new.auth_user_id := matched_user;
  end if;

  return new;
end;
$$;

drop trigger if exists tenants_link_on_update on public.tenants;
create trigger tenants_link_on_update
  before update of email, phone on public.tenants
  for each row execute function public.link_tenant_on_update();
