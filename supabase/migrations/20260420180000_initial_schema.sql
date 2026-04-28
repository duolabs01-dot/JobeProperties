create extension if not exists "pgcrypto";

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  phase text not null,
  unit_number text not null unique,
  unit_type text not null,
  monthly_rent numeric(10,2) not null,
  status text not null default 'available' check (status in ('available', 'reserved', 'occupied', 'maintenance')),
  available_from date,
  created_at timestamptz not null default now()
);

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  unit_id uuid references public.units(id) on delete set null,
  auth_user_id uuid,
  status text not null default 'active' check (status in ('lead', 'active', 'notice', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.leases (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete restrict,
  start_date date not null,
  end_date date,
  deposit_amount numeric(10,2),
  monthly_rent numeric(10,2) not null,
  signed_document_url text,
  move_in_date date,
  move_out_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  lease_id uuid references public.leases(id) on delete set null,
  amount numeric(10,2) not null,
  due_date date not null,
  paid_at timestamptz,
  status text not null default 'pending' check (status in ('pending', 'paid', 'overdue', 'failed')),
  gateway text,
  gateway_reference text,
  receipt_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete set null,
  unit_id uuid references public.units(id) on delete set null,
  title text not null,
  description text not null,
  photo_urls text[] not null default '{}',
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.waiting_list (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  preferred_phase text,
  preferred_unit_type text,
  notes text,
  contacted_at timestamptz,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists idx_units_status on public.units(status);
create index if not exists idx_tenants_unit_id on public.tenants(unit_id);
create index if not exists idx_payments_status_due_date on public.payments(status, due_date);
create index if not exists idx_maintenance_requests_status on public.maintenance_requests(status);
create index if not exists idx_waiting_list_status on public.waiting_list(status);
