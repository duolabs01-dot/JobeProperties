import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/portal/logout-button";
import { MaintenanceRequestsPanel } from "@/components/portal/maintenance-requests-panel";
import { PayNowButton } from "@/components/portal/pay-now-button";
import { PaymentHistoryTable } from "@/components/portal/payment-history-table";
import { PortalStatusBadge } from "@/components/portal/portal-status-badge";
import { Badge } from "@/components/ui/badge";
import { formatLocationLabel } from "@/lib/property-data";
import {
  createServerClient,
  type LeaseRow,
  type MaintenanceRequestRow,
  type PaymentRow,
  type TenantRow,
  type UnitRow,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string | null) {
  if (!value) {
    return "Month to month";
  }

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatUnitType(value: string) {
  return value.replace(/-/g, " ");
}

type PortalPageProps = {
  searchParams: Promise<{
    paid?: string;
  }>;
};

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const params = await searchParams;
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: tenantData } = await supabase
    .from("tenants")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  const tenant = tenantData as TenantRow | null;

  if (!tenant) {
    return (
      <div className="bg-[color:var(--surface)]">
        <section className="mx-auto min-h-screen w-full max-w-4xl px-5 pb-20 pt-28 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-8 shadow-[0_24px_80px_rgba(17,24,15,0.08)]">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Setup required</p>
            <h1 className="mt-4 font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Your account is being set up.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              Your account needs to be linked to your unit. WhatsApp us and we&apos;ll set it up in
              minutes.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/27722293229?text=Hi%2C+I%27ve+just+logged+in+to+the+Jobe+tenant+portal+but+my+account+isn%27t+linked+yet.+My+name+is+[name]+and+my+unit+is+[unit].+Can+you+help%3F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
                  <path d="M19.05 4.94A9.84 9.84 0 0 0 12.02 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.95L2 22l5.31-1.39a9.88 9.88 0 0 0 4.72 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.8 9.8 0 0 0-2.89-6.97Z" />
                </svg>
                WhatsApp us to link your account
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const [{ data: unitData }, { data: leaseData }, { data: paymentsData }, { data: maintenanceData }] = await Promise.all([
    tenant.unit_id ? supabase.from("units").select("*").eq("id", tenant.unit_id).maybeSingle() : Promise.resolve({ data: null }),
    supabase
      .from("leases")
      .select("*")
      .eq("tenant_id", tenant.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("payments")
      .select("*")
      .eq("tenant_id", tenant.id)
      .order("due_date", { ascending: false })
      .limit(12),
    supabase
      .from("maintenance_requests")
      .select("*")
      .eq("tenant_id", tenant.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  const unit = unitData as UnitRow | null;
  const lease = leaseData as LeaseRow | null;
  const payments = (paymentsData ?? []) as PaymentRow[];
  const maintenanceRequests = (maintenanceData ?? []) as MaintenanceRequestRow[];

  const paymentList = payments;
  const nextPayment =
    paymentList
      .filter((payment) => payment.status === "pending" || payment.status === "overdue")
      .sort((left, right) => new Date(left.due_date).getTime() - new Date(right.due_date).getTime())[0] ??
    paymentList[0] ??
    null;

  return (
    <div className="bg-[color:var(--surface)]">
      <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Tenant portal</p>
            <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Hi {tenant.full_name}
            </h1>
          </div>

          <LogoutButton />
        </div>

        {params.paid === "true" ? (
          <div className="mt-6 rounded-[1.5rem] border border-[color:var(--success)]/20 bg-[color:var(--success-bg)] px-5 py-4 text-sm text-[color:var(--success)]">
            Payment received by PayFast. Your portal will reflect it as soon as the confirmation comes through.
          </div>
        ) : null}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Unit</p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
              {unit?.unit_number ?? "Not linked"}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {unit?.phase ? <Badge variant="highlight">{formatLocationLabel(unit.phase)}</Badge> : null}
              {unit?.unit_type ? <Badge variant="unit">{formatUnitType(unit.unit_type)}</Badge> : null}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Next payment</p>
            {nextPayment ? (
              <>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                  {formatDate(nextPayment.due_date)}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  {formatCurrency(Number(nextPayment.amount))}
                </p>
                <div className="mt-4">
                  <PortalStatusBadge kind="payment" value={nextPayment.status} />
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">No payment record yet.</p>
            )}
          </article>

          <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Lease</p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
              {lease ? `${formatDate(lease.start_date)} to ${lease.end_date ? formatDate(lease.end_date) : "Month to month"}` : "Month to month"}
            </p>
            {lease?.signed_document_url ? (
              <a
                href={lease.signed_document_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-[color:var(--accent-dark)] underline-offset-4 hover:underline"
              >
                Open signed lease
              </a>
            ) : null}
          </article>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Payments</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Payment history</h2>
              </div>

              {nextPayment && (nextPayment.status === "pending" || nextPayment.status === "overdue") ? <PayNowButton /> : null}
            </div>

            <PaymentHistoryTable payments={paymentList} />
          </div>

          <MaintenanceRequestsPanel
            requests={maintenanceRequests ?? []}
            tenantId={tenant.id}
            unitId={tenant.unit_id}
          />
        </div>
      </section>
    </div>
  );
}
