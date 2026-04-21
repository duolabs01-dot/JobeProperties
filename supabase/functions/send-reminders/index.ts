import { createClient } from "jsr:@supabase/supabase-js@2";

type PaymentRecord = {
  id: string;
  tenant_id: string;
  lease_id: string | null;
  amount: number;
  due_date: string;
  status: "pending" | "paid" | "overdue" | "failed";
  reminded_at: string | null;
};

type TenantRecord = {
  id: string;
  full_name: string;
  phone: string;
};

type LeaseRecord = {
  id: string;
  unit_id: string;
};

type UnitRecord = {
  id: string;
  unit_number: string;
  phase: string;
};

type ReminderTarget = {
  id: string;
  amount: number;
  dueDate: string;
  fullName: string;
  phone: string;
  unitNumber: string;
  phase: string;
};

function getJohannesburgDateString(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDueDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00+02:00`));
}

function normaliseSouthAfricanPhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("27")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+27${digits.slice(1)}`;
  }

  return `+27${digits}`;
}

async function sendWhatsappMessage(apiKey: string | null, phone: string, message: string) {
  if (!apiKey) {
    console.log("[send-reminders:fallback]", { phone, message });
    return;
  }

  const response = await fetch("https://api.wassenger.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: apiKey,
    },
    body: JSON.stringify({
      phone: normaliseSouthAfricanPhone(phone),
      message,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Wassenger rejected the reminder: ${errorText}`);
  }
}

async function fetchReminderTargets(
  supabase: ReturnType<typeof createClient>,
  kind: "upcoming" | "overdue",
  dateString: string,
) {
  let query = supabase
    .from("payments")
    .select("id, tenant_id, lease_id, amount, due_date, status, reminded_at")
    .eq("status", "pending");

  if (kind === "upcoming") {
    query = query.eq("due_date", dateString).is("reminded_at", null);
  } else {
    query = query.lt("due_date", dateString);
  }

  const { data: paymentData, error: paymentError } = await query;

  if (paymentError) {
    throw paymentError;
  }

  const payments = (paymentData ?? []) as PaymentRecord[];

  if (!payments.length) {
    return [];
  }

  const tenantIds = [...new Set(payments.map((payment) => payment.tenant_id))];
  const leaseIds = [
    ...new Set(
      payments
        .map((payment) => payment.lease_id)
        .filter((leaseId): leaseId is string => Boolean(leaseId)),
    ),
  ];

  const [{ data: tenantData, error: tenantError }, { data: leaseData, error: leaseError }] =
    await Promise.all([
      supabase.from("tenants").select("id, full_name, phone").in("id", tenantIds),
      leaseIds.length
        ? supabase.from("leases").select("id, unit_id").in("id", leaseIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

  if (tenantError) {
    throw tenantError;
  }

  if (leaseError) {
    throw leaseError;
  }

  const leases = (leaseData ?? []) as LeaseRecord[];
  const unitIds = [...new Set(leases.map((lease) => lease.unit_id))];
  const { data: unitData, error: unitError } = unitIds.length
    ? await supabase.from("units").select("id, unit_number, phase").in("id", unitIds)
    : { data: [], error: null };

  if (unitError) {
    throw unitError;
  }

  const tenants = (tenantData ?? []) as TenantRecord[];
  const units = (unitData ?? []) as UnitRecord[];
  const tenantById = new Map(tenants.map((tenant) => [tenant.id, tenant]));
  const leaseById = new Map(leases.map((lease) => [lease.id, lease]));
  const unitById = new Map(units.map((unit) => [unit.id, unit]));

  return payments
    .map((payment) => {
      const tenant = tenantById.get(payment.tenant_id);
      const lease = payment.lease_id ? leaseById.get(payment.lease_id) : null;
      const unit = lease?.unit_id ? unitById.get(lease.unit_id) : null;

      if (!tenant) {
        return null;
      }

      return {
        id: payment.id,
        amount: Number(payment.amount),
        dueDate: payment.due_date,
        fullName: tenant.full_name,
        phone: tenant.phone,
        unitNumber: unit?.unit_number ?? "your unit",
        phase: unit?.phase ?? "Jobe Propco",
      } satisfies ReminderTarget;
    })
    .filter((record): record is ReminderTarget => Boolean(record));
}

Deno.serve(async () => {
  try {
    const supabaseUrl =
      Deno.env.get("SUPABASE_URL") ?? Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") ?? null;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? null;

    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json(
        { success: false, error: "Missing Supabase service role configuration." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const today = new Date();
    const todayDate = getJohannesburgDateString(today);
    const threeDaysFromNow = getJohannesburgDateString(addDays(today, 3));
    const portalUrl = `${Deno.env.get("NEXT_PUBLIC_URL") ?? "https://jobepropco.vercel.app"}/portal`;
    const wassengerApiKey = Deno.env.get("WASSENGER_API_KEY") ?? null;
    const remindedAt = new Date().toISOString();

    const [upcomingTargets, overdueTargets] = await Promise.all([
      fetchReminderTargets(supabase, "upcoming", threeDaysFromNow),
      fetchReminderTargets(supabase, "overdue", todayDate),
    ]);

    for (const payment of upcomingTargets) {
      const message = `Hi ${payment.fullName}, your rent of ${formatCurrency(payment.amount)} for ${payment.unitNumber} in ${payment.phase} is due on ${formatDueDate(payment.dueDate)}. Please pay at: ${portalUrl} or WhatsApp us on 072 229 3229.`;

      await sendWhatsappMessage(wassengerApiKey, payment.phone, message);
      await supabase.from("payments").update({ reminded_at: remindedAt }).eq("id", payment.id);
    }

    for (const payment of overdueTargets) {
      const message = `Hi ${payment.fullName}, your rent for ${payment.unitNumber} in ${payment.phase} was due on ${formatDueDate(payment.dueDate)} and hasn't been received yet. Please pay at: ${portalUrl} or WhatsApp us on 072 229 3229.`;

      await sendWhatsappMessage(wassengerApiKey, payment.phone, message);
      await supabase.from("payments").update({ reminded_at: remindedAt }).eq("id", payment.id);
    }

    return Response.json({
      success: true,
      upcomingSent: upcomingTargets.length,
      overdueSent: overdueTargets.length,
    });
  } catch (error) {
    console.error("[send-reminders:error]", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
});
