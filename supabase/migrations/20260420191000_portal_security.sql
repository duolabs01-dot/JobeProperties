create unique index if not exists idx_tenants_auth_user_id
on public.tenants(auth_user_id)
where auth_user_id is not null;

alter table public.units enable row level security;
alter table public.tenants enable row level security;
alter table public.leases enable row level security;
alter table public.payments enable row level security;
alter table public.maintenance_requests enable row level security;

drop policy if exists "Tenants can view their own tenant record" on public.tenants;
create policy "Tenants can view their own tenant record"
on public.tenants
for select
to authenticated
using (auth.uid() = auth_user_id);

drop policy if exists "Tenants can view their own unit" on public.units;
create policy "Tenants can view their own unit"
on public.units
for select
to authenticated
using (
  exists (
    select 1
    from public.tenants
    where tenants.unit_id = units.id
      and tenants.auth_user_id = auth.uid()
  )
);

drop policy if exists "Tenants can view their own leases" on public.leases;
create policy "Tenants can view their own leases"
on public.leases
for select
to authenticated
using (
  exists (
    select 1
    from public.tenants
    where tenants.id = leases.tenant_id
      and tenants.auth_user_id = auth.uid()
  )
);

drop policy if exists "Tenants can view their own payments" on public.payments;
create policy "Tenants can view their own payments"
on public.payments
for select
to authenticated
using (
  exists (
    select 1
    from public.tenants
    where tenants.id = payments.tenant_id
      and tenants.auth_user_id = auth.uid()
  )
);

drop policy if exists "Tenants can view their own maintenance requests" on public.maintenance_requests;
create policy "Tenants can view their own maintenance requests"
on public.maintenance_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.tenants
    where tenants.id = maintenance_requests.tenant_id
      and tenants.auth_user_id = auth.uid()
  )
);

drop policy if exists "Tenants can create their own maintenance requests" on public.maintenance_requests;
create policy "Tenants can create their own maintenance requests"
on public.maintenance_requests
for insert
to authenticated
with check (
  exists (
    select 1
    from public.tenants
    where tenants.id = maintenance_requests.tenant_id
      and tenants.auth_user_id = auth.uid()
      and (
        maintenance_requests.unit_id is null
        or tenants.unit_id = maintenance_requests.unit_id
      )
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'maintenance-photos',
  'maintenance-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Tenants can upload their own maintenance photos" on storage.objects;
create policy "Tenants can upload their own maintenance photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'maintenance-photos'
  and exists (
    select 1
    from public.tenants
    where tenants.auth_user_id = auth.uid()
      and tenants.id::text = (storage.foldername(name))[1]
  )
);

drop policy if exists "Tenants can update their own maintenance photos" on storage.objects;
create policy "Tenants can update their own maintenance photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'maintenance-photos'
  and exists (
    select 1
    from public.tenants
    where tenants.auth_user_id = auth.uid()
      and tenants.id::text = (storage.foldername(name))[1]
  )
)
with check (
  bucket_id = 'maintenance-photos'
  and exists (
    select 1
    from public.tenants
    where tenants.auth_user_id = auth.uid()
      and tenants.id::text = (storage.foldername(name))[1]
  )
);

drop policy if exists "Tenants can delete their own maintenance photos" on storage.objects;
create policy "Tenants can delete their own maintenance photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'maintenance-photos'
  and exists (
    select 1
    from public.tenants
    where tenants.auth_user_id = auth.uid()
      and tenants.id::text = (storage.foldername(name))[1]
  )
);
