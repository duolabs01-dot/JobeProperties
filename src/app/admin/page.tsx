import type { Metadata } from "next";
import Link from "next/link";
import { apartmentLocations, formatLocationLabel } from "@/lib/property-data";
import { getAdminTab, isSuperAdmin } from "@/lib/admin";
import {
  formatCurrency,
  formatDate,
  getMaintenanceStatusBadgeVariant,
  getPriorityBadgeVariant,
  type AdminMaintenanceRecord,
  type AdminPaymentRecord,
  type AdminPhaseSection,
  type AdminUnitTile,
  type AdminWaitingListRecord,
} from "@/lib/admin-dashboard";
import {
  createServerClient,
  createServiceRoleClient,
  type LeaseRow,
  type MaintenanceRequestRow,
  type PaymentRow,
  type TenantRow,
  type UnitRow,
  type WaitingListRow,
} from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { ReminderSettingsCard } from "@/components/admin/reminder-settings-card";
import { MaintenanceKanban } from "@/components/admin/maintenance-kanban";
import { PaymentsTable } from "@/components/admin/payments-table";
import { UnitsGrid } from "@/components/admin/units-grid";
import { WaitingListTable } from "@/components/admin/waiting-list-table";
import { TeamPanel, type AuditEntry, type TeamMember } from "@/components/admin/team-panel";

export const metadata: Metadata = {
  title: "Management | Jobe Propco",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminPageProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

function normalisePaymentStatus(payment: PaymentRow) {
  if (payment.status === "pending" && new Date(payment.due_date).getTime() < Date.now()) {
    return "overdue" as const;
  }

  return payment.status;
}

function getPriorityScore(priority: AdminMaintenanceRecord["priority"]) {
  switch (priority) {
    case "high":
      return 0;
    case "medium":
      return 1;
    case "low":
      return 2;
    default:
      return 3;
  }
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const activeTab = getAdminTab(params.tab);
  const supabase = createServiceRoleClient();

  const authClient = await createServerClient();
  const {
    data: { user: currentUser },
  } = await authClient.auth.getUser();
  const currentUserIsSuperAdmin = isSuperAdmin(currentUser);
  const superAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? null;

  const [
    { data: unitsData },
    { data: tenantsData },
    { data: leasesData },
    { data: paymentsData },
    { data: maintenanceData },
    { data: waitingListData },
  ] = await Promise.all([
    supabase.from("units").select("*").order("phase").order("unit_number"),
    supabase.from("tenants").select("*").order("full_name"),
    supabase.from("leases").select("*").order("created_at", { ascending: false }),
    supabase.from("payments").select("*").order("due_date", { ascending: false }),
    supabase.from("maintenance_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("waiting_list").select("*").order("created_at", { ascending: false }),
  ]);

  const units = (unitsData ?? []) as UnitRow[];
  const tenants = (tenantsData ?? []) as TenantRow[];
  const leases = (leasesData ?? []) as LeaseRow[];
  const payments = (paymentsData ?? []) as PaymentRow[];
  const maintenanceRequests = (maintenanceData ?? []) as MaintenanceRequestRow[];
  const waitingList = (waitingListData ?? []) as WaitingListRow[];

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const tenantById = new Map(tenants.map((tenant) => [tenant.id, tenant]));
  const unitById = new Map(units.map((unit) => [unit.id, unit]));
  const tenantByUnitId = new Map(
    tenants
      .filter((tenant) => tenant.unit_id)
      .map((tenant) => [tenant.unit_id as string, tenant]),
  );

  const latestLeaseByTenant = new Map<string, LeaseRow>();
  leases.forEach((lease) => {
    if (!latestLeaseByTenant.has(lease.tenant_id)) {
      latestLeaseByTenant.set(lease.tenant_id, lease);
    }
  });

  const latestPaymentByTenant = new Map<string, PaymentRow>();
  payments.forEach((payment) => {
    if (!latestPaymentByTenant.has(payment.tenant_id)) {
      latestPaymentByTenant.set(payment.tenant_id, payment);
    }
  });

  const paymentRecords: AdminPaymentRecord[] = payments.slice(0, 50).map((payment) => {
    const tenant = tenantById.get(payment.tenant_id);
    const unit = tenant?.unit_id ? unitById.get(tenant.unit_id) : null;

    return {
      id: payment.id,
      tenantId: payment.tenant_id,
      tenantName: tenant?.full_name ?? "Tenant not linked",
      phone: tenant?.phone ?? null,
      unitNumber: unit?.unit_number ?? "—",
      phase: formatLocationLabel(unit?.phase ?? "—"),
      amount: Number(payment.amount),
      dueDate: payment.due_date,
      status: normalisePaymentStatus(payment),
      paidAt: payment.paid_at,
      receiptUrl: payment.receipt_url,
      remindedAt: payment.reminded_at,
    };
  });

  const maintenanceRecords: AdminMaintenanceRecord[] = maintenanceRequests.map((request) => {
    const unit = request.unit_id ? unitById.get(request.unit_id) : null;

    return {
      id: request.id,
      tenantId: request.tenant_id,
      unitId: request.unit_id,
      unitNumber: unit?.unit_number ?? "Not linked",
      phase: formatLocationLabel(unit?.phase ?? "Unassigned"),
      title: request.title,
      description: request.description,
      priority: request.priority,
      status: request.status,
      createdAt: request.created_at,
      photoUrls: request.photo_urls,
    };
  });

  const waitingListRecords: AdminWaitingListRecord[] = waitingList.map((entry) => ({
    id: entry.id,
    name: entry.full_name,
    phone: entry.phone,
    preferredPhase: entry.preferred_phase,
    unitType: entry.preferred_unit_type,
    createdAt: entry.created_at,
    status: entry.status,
  }));

  const unitSections: AdminPhaseSection[] = apartmentLocations.map((location) => ({
    badge: location.badge,
    name: location.name,
    address: location.address,
    units: units
      .filter((unit) => formatLocationLabel(unit.phase) === location.badge)
      .sort((left, right) => left.unit_number.localeCompare(right.unit_number))
      .map((unit) => {
        const tenant = tenantByUnitId.get(unit.id);
        const lease = tenant ? latestLeaseByTenant.get(tenant.id) : null;
        const payment = tenant ? latestPaymentByTenant.get(tenant.id) : null;

        return {
          id: unit.id,
          unitNumber: unit.unit_number,
          phase: formatLocationLabel(unit.phase),
          unitType: unit.unit_type,
          status: unit.status,
          tenantName: tenant?.full_name ?? null,
          tenantPhone: tenant?.phone ?? null,
          leaseStartDate: lease?.start_date ?? null,
          leaseEndDate: lease?.end_date ?? null,
          paymentStatus: payment ? normalisePaymentStatus(payment) : null,
        } satisfies AdminUnitTile;
      }),
  }));

  const totalUnits = units.length;
  const occupiedUnits = units.filter((unit) => unit.status === "occupied").length;
  const occupancyPercentage = totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  const revenueThisMonth = payments
    .filter((payment) => payment.status === "paid" && payment.paid_at && new Date(payment.paid_at).getTime() >= monthStart)
    .reduce((total, payment) => total + Number(payment.amount), 0);
  const overdueCount = payments.filter(
    (payment) =>
      payment.status === "overdue" ||
      (payment.status === "pending" && new Date(payment.due_date).getTime() < now.getTime()),
  ).length;
  const openMaintenanceCount = maintenanceRequests.filter((request) => request.status === "open").length;
  const recentPayments = paymentRecords.slice(0, 10);
  const urgentMaintenance = maintenanceRecords
    .filter((request) => request.status !== "resolved")
    .sort((left, right) => {
      const priorityDiff = getPriorityScore(left.priority) - getPriorityScore(right.priority);
      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    })
    .slice(0, 10);

  // Team panel data — only fetched when the team tab is active and the
  // current user is the super-admin (the only one with manage-roles permission).
  let teamMembers: TeamMember[] = [];
  let teamAudit: AuditEntry[] = [];
  if (activeTab === "team" && currentUserIsSuperAdmin) {
    const [{ data: profilesData }, { data: auditData }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase
        .from("admin_audit_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    type RawProfile = {
      id: string;
      email: string | null;
      full_name: string | null;
      phone: string | null;
      role: TeamMember["role"];
      created_at: string;
    };
    teamMembers = ((profilesData ?? []) as RawProfile[]).map((p) => ({
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      phone: p.phone,
      role: p.role,
      created_at: p.created_at,
      is_super_admin: Boolean(
        superAdminEmail && p.email && p.email.trim().toLowerCase() === superAdminEmail,
      ),
      is_self: p.id === currentUser?.id,
    }));
    teamAudit = ((auditData ?? []) as AuditEntry[]) ?? [];
  }

  const envChecks = [
    { label: "Admin email", value: process.env.ADMIN_EMAIL ? "Configured" : "Missing", ok: Boolean(process.env.ADMIN_EMAIL) },
    { label: "Supabase URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configured" : "Missing", ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) },
    { label: "Service role key", value: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Configured" : "Missing", ok: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY) },
    { label: "PayFast", value: process.env.PAYFAST_MERCHANT_ID ? "Configured" : "Missing", ok: Boolean(process.env.PAYFAST_MERCHANT_ID) },
    { label: "Wassenger", value: process.env.WASSENGER_API_KEY ? "Configured" : "Fallback to console", ok: Boolean(process.env.WASSENGER_API_KEY) },
  ];

  return (
    <div className="px-5 pb-12 pt-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Owner dashboard</p>
        <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
          Dr Sithole&apos;s command centre.
        </h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
          Watch collections, maintenance, vacancies, and the next tenant in line from one place.
        </p>
      </div>

      <div className="mt-8">
        {activeTab === "overview" ? (
          <div className="space-y-8">
            <div className="grid gap-5 xl:grid-cols-4">
              <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Occupancy</p>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                  {occupiedUnits}/{totalUnits} units
                </p>
                <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[color:var(--line)]">
                  <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: `${occupancyPercentage}%` }} />
                </div>
                <p className="mt-3 text-sm text-[color:var(--muted)]">{occupancyPercentage}% occupied</p>
              </article>

              <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Collected</p>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                  {formatCurrency(revenueThisMonth)}
                </p>
                <p className="mt-3 text-sm text-[color:var(--muted)]">Revenue recorded this month</p>
              </article>

              <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Overdue</p>
                <p className={`mt-4 text-3xl font-semibold tracking-[-0.04em] ${overdueCount > 0 ? "text-red-700" : "text-[color:var(--ink)]"}`}>
                  {overdueCount} tenants
                </p>
                <p className="mt-3 text-sm text-[color:var(--muted)]">Pending or overdue rent today</p>
              </article>

              <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Open maintenance</p>
                <p className={`mt-4 text-3xl font-semibold tracking-[-0.04em] ${openMaintenanceCount > 0 ? "text-amber-700" : "text-[color:var(--ink)]"}`}>
                  {openMaintenanceCount} open
                </p>
                <p className="mt-3 text-sm text-[color:var(--muted)]">Jobs still waiting to be picked up</p>
              </article>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.58fr_0.42fr]">
              <section className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Recent payments</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Last 10 payments</h2>
                  </div>
                  <Link href="/admin?tab=payments" className="text-sm text-[color:var(--accent-dark)] hover:underline">
                    View all →
                  </Link>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr>
                        <th className="px-3 text-left text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Tenant</th>
                        <th className="px-3 text-left text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Unit</th>
                        <th className="px-3 text-left text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Amount</th>
                        <th className="px-3 text-left text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="rounded-[1.25rem] bg-[color:var(--surface)]">
                          <td className="px-3 py-4 text-sm font-medium text-[color:var(--ink)]">{payment.tenantName}</td>
                          <td className="px-3 py-4 text-sm text-[color:var(--muted)]">{payment.unitNumber}</td>
                          <td className="px-3 py-4 text-sm text-[color:var(--ink)]">{formatCurrency(payment.amount)}</td>
                          <td className="px-3 py-4">
                            <Badge variant={payment.status === "paid" ? "available" : payment.status === "pending" ? "highlight" : "red"}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Maintenance urgent</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Needs attention first</h2>
                  </div>
                  <Link href="/admin?tab=maintenance" className="text-sm text-[color:var(--accent-dark)] hover:underline">
                    Open board →
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {urgentMaintenance.length ? (
                    urgentMaintenance.map((request) => (
                      <article key={request.id} className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-[color:var(--ink)]">{request.unitNumber}</p>
                        <Badge variant="highlight">{request.phase}</Badge>
                          </div>
                          <Badge variant={getPriorityBadgeVariant(request.priority)}>{request.priority}</Badge>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[color:var(--ink)]">{request.title}</p>
                        <p className="mt-2 text-xs text-[color:var(--muted)]">{formatDate(request.createdAt)}</p>
                        <div className="mt-3">
                          <Badge variant={getMaintenanceStatusBadgeVariant(request.status)}>{request.status}</Badge>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-[color:var(--muted)]">No urgent maintenance requests right now.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {activeTab === "payments" ? <PaymentsTable payments={paymentRecords} /> : null}
        {activeTab === "maintenance" ? <MaintenanceKanban requests={maintenanceRecords} /> : null}
        {activeTab === "waiting-list" ? <WaitingListTable entries={waitingListRecords} /> : null}
        {activeTab === "units" ? <UnitsGrid phases={unitSections} /> : null}

        {activeTab === "team" ? (
          currentUserIsSuperAdmin ? (
            <TeamPanel
              members={teamMembers}
              audit={teamAudit}
              canManageRoles={currentUserIsSuperAdmin}
            />
          ) : (
            <div className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-white p-6 text-sm text-[color:var(--muted)]">
              Only the super-admin (set via ADMIN_EMAIL) can manage the team.
            </div>
          )
        ) : null}

        {activeTab === "settings" ? (
          <div className="space-y-6">
            <ReminderSettingsCard />

            <div className="grid gap-5 xl:grid-cols-2">
              {envChecks.map((item) => (
                <article
                  key={item.label}
                  className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">{item.label}</p>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{item.value}</p>
                    </div>
                    <Badge variant={item.ok ? "available" : "highlight"}>
                      {item.ok ? "Ready" : "Check"}
                    </Badge>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
