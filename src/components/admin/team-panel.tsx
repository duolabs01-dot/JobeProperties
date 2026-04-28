"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export type TeamMember = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  role: "tenant" | "admin" | "partner" | "lead";
  created_at: string;
  is_super_admin: boolean;
  is_self: boolean;
};

export type AuditEntry = {
  id: string;
  actor_email: string | null;
  action: string;
  target_email: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function roleVariant(role: TeamMember["role"]) {
  if (role === "admin") return "highlight" as const;
  if (role === "partner") return "unit" as const;
  if (role === "lead") return "available" as const;
  return "unit" as const;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function TeamPanel({
  members,
  audit,
  canManageRoles,
}: {
  members: TeamMember[];
  audit: AuditEntry[];
  canManageRoles: boolean;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  async function changeRole(userId: string, role: TeamMember["role"]) {
    setPendingId(userId);
    try {
      const response = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, role }),
      });
      const payload = (await response.json()) as { message: string };
      if (!response.ok) throw new Error(payload.message);

      toast({ variant: "success", title: "Role updated", description: payload.message });
      startTransition(() => router.refresh());
    } catch (err) {
      toast({
        variant: "error",
        title: "Couldn't update role",
        description: err instanceof Error ? err.message : "Try again.",
      });
    } finally {
      setPendingId(null);
    }
  }

  const admins = members.filter((m) => m.role === "admin" || m.is_super_admin);
  const others = members.filter((m) => !(m.role === "admin" || m.is_super_admin));

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Team</p>
        <h2 className="font-display text-3xl text-[color:var(--ink)] sm:text-4xl">
          Who can access the admin
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
          {canManageRoles
            ? "You're the super-admin. Promote or demote any account here. The super-admin (set via ADMIN_EMAIL) is permanent and cannot be edited."
            : "Only the super-admin can change roles. Talk to them to add or remove access."}
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Admins ({admins.length})
        </h3>
        <div className="grid gap-3">
          {admins.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              canManageRoles={canManageRoles}
              isPending={pendingId === m.id}
              onChange={changeRole}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Other accounts ({others.length})
        </h3>
        <div className="grid gap-3">
          {others.length === 0 ? (
            <p className="text-sm text-[color:var(--muted)]">No other accounts yet.</p>
          ) : (
            others.map((m) => (
              <MemberRow
                key={m.id}
                member={m}
                canManageRoles={canManageRoles}
                isPending={pendingId === m.id}
                onChange={changeRole}
              />
            ))
          )}
        </div>
      </section>

      {audit.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Recent role changes
          </h3>
          <div className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-white">
            <ul className="divide-y divide-[color:var(--line)] text-sm">
              {audit.map((a) => (
                <li key={a.id} className="px-5 py-3">
                  <p className="text-[color:var(--ink)]">
                    <span className="font-medium">{a.actor_email ?? "Unknown"}</span>
                    {" "}
                    {a.action}
                    {a.target_email ? (
                      <>
                        {" → "}
                        <span className="font-medium">{a.target_email}</span>
                      </>
                    ) : null}
                  </p>
                  <p className="text-xs text-[color:var(--muted)]">{formatDate(a.created_at)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

function MemberRow({
  member,
  canManageRoles,
  isPending,
  onChange,
}: {
  member: TeamMember;
  canManageRoles: boolean;
  isPending: boolean;
  onChange: (userId: string, role: TeamMember["role"]) => void;
}) {
  const isAdminRole = member.role === "admin" || member.is_super_admin;
  const editable = canManageRoles && !member.is_super_admin && !member.is_self;

  return (
    <article className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--line-strong)] bg-white p-5 shadow-[0_8px_30px_rgba(17,24,15,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-[color:var(--ink)]">
            {member.full_name || member.email || "Unnamed"}
          </p>
          <Badge variant={roleVariant(member.role)}>
            {member.is_super_admin ? "super-admin" : member.role}
          </Badge>
          {member.is_self ? (
            <Badge variant="unit">you</Badge>
          ) : null}
        </div>
        <p className="text-xs text-[color:var(--muted)]">
          {member.email}
          {member.phone ? ` · ${member.phone}` : ""}
        </p>
      </div>

      {editable ? (
        <div className="flex flex-wrap gap-2">
          {isAdminRole ? (
            <button
              type="button"
              disabled={isPending}
              onClick={() => onChange(member.id, "tenant")}
              className="rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition hover:bg-[color:var(--ink)] hover:text-white disabled:opacity-50"
            >
              {isPending ? "…" : "Demote"}
            </button>
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() => onChange(member.id, "admin")}
              className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[color:var(--accent-dark)] disabled:opacity-50"
            >
              {isPending ? "…" : "Make admin"}
            </button>
          )}
        </div>
      ) : null}
    </article>
  );
}
