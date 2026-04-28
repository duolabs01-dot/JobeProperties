alter table public.payments
add column if not exists reminded_at timestamptz;
