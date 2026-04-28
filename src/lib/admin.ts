import type { User } from "@supabase/supabase-js";
import { createServerClient, createServiceRoleClient } from "@/lib/supabase";

export const adminTabs = [
  "overview",
  "payments",
  "maintenance",
  "waiting-list",
  "units",
  "team",
  "settings",
] as const;

export type AdminTab = (typeof adminTabs)[number];

/**
 * Synchronous super-admin check. Used in middleware where DB queries are
 * undesirable. Matches a single email from `ADMIN_EMAIL` env var — this is the
 * bootstrap account that can never be locked out and can promote others.
 */
export function isAdminEmail(email: string | null | undefined) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = email?.trim().toLowerCase();
  return Boolean(adminEmail && userEmail && adminEmail === userEmail);
}

/**
 * Authoritative admin check — env super-admin OR profiles.role = 'admin'.
 * Use this everywhere except middleware. Server-side only (touches the DB).
 */
export async function isAdmin(user: User | null | undefined): Promise<boolean> {
  if (!user) return false;
  if (isAdminEmail(user.email)) return true;

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return false;
  return (data as { role?: string }).role === "admin";
}

/**
 * Whether this user is the bootstrap super-admin (env-defined). Used to gate
 * destructive role changes — only the super-admin can promote/demote.
 */
export function isSuperAdmin(user: User | null | undefined): boolean {
  return isAdminEmail(user?.email);
}

export function getAdminTab(value: string | undefined): AdminTab {
  if (value && adminTabs.includes(value as AdminTab)) {
    return value as AdminTab;
  }
  return "overview";
}

export function normaliseSouthAfricanPhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("27")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+27${digits.slice(1)}`;
  }

  return `+27${digits}`;
}

/** Append a row to the admin audit log. Best-effort — never throws. */
export async function logAdminAction(params: {
  actor: User | null | undefined;
  action: string;
  targetUserId?: string | null;
  targetEmail?: string | null;
  metadata?: Record<string, unknown>;
}) {
  try {
    const service = createServiceRoleClient();
    await service.from("admin_audit_log").insert({
      actor_id: params.actor?.id ?? null,
      actor_email: params.actor?.email ?? null,
      action: params.action,
      target_user_id: params.targetUserId ?? null,
      target_email: params.targetEmail ?? null,
      metadata: params.metadata ?? null,
    } as never);
  } catch (err) {
    console.error("[admin-audit] failed to log action", err);
  }
}
