"use client";

import Image from "next/image";
import Link from "next/link";
import { Building, CreditCard, LayoutDashboard, Settings, Users, Wrench } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { ComponentType } from "react";
import { LogoutButton } from "@/components/portal/logout-button";
import { type AdminTab, getAdminTab } from "@/lib/admin";
import { cn } from "@/lib/utils";

const LOGO_URL = "/logo-cropped-20260424.png";

const navItems: Array<{
  id: AdminTab;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "waiting-list", label: "Waiting list", icon: Users },
  { id: "units", label: "Units", icon: Building },
  { id: "settings", label: "Settings", icon: Settings },
];

function SidebarNav({
  activeTab,
  onNavigate,
  className,
}: {
  activeTab: AdminTab;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={cn("space-y-2", className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeTab;

        return (
          <Link
            key={item.id}
            href={`/admin?tab=${item.id}`}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium transition-colors duration-300",
              isActive
                ? "bg-[color:var(--accent)] text-white shadow-[0_14px_30px_rgba(200,103,58,0.18)]"
                : "text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--ink)]",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({
  tenantCount,
  adminEmail,
}: {
  tenantCount: number;
  adminEmail: string;
}) {
  const searchParams = useSearchParams();
  const activeTab = getAdminTab(searchParams.get("tab") ?? undefined);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-[color:var(--line-strong)] bg-[color:#fbf8f2] lg:flex lg:flex-col">
        <div className="border-b border-[color:var(--line)] px-5 py-6">
          <Link href="/admin" className="inline-flex rounded-[1rem] bg-[color:var(--ink)] px-3 py-2">
            <Image src={LOGO_URL} alt="Jobe Propco" width={180} height={121} className="h-16 w-auto object-contain" />
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[color:var(--accent-dark)]">Command centre</p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{adminEmail}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <SidebarNav activeTab={activeTab} />
        </div>

        <div className="border-t border-[color:var(--line)] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Tenants</p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{tenantCount}</p>
          <LogoutButton
            redirectTo="/"
            className="mt-5 w-full justify-center border-[color:var(--line-strong)] bg-white text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
          />
        </div>
      </aside>

      <div className="border-b border-[color:var(--line)] bg-[color:#fbf8f2] px-5 py-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="inline-flex rounded-[1rem] bg-[color:var(--ink)] px-3 py-2">
            <Image src={LOGO_URL} alt="Jobe Propco" width={168} height={113} className="h-14 w-auto object-contain" />
          </Link>
          <LogoutButton
            redirectTo="/"
            className="border-[color:var(--line-strong)] bg-white text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
          />
        </div>

        <div className="mt-5 overflow-x-auto pb-1">
          <SidebarNav activeTab={activeTab} className="flex min-w-max gap-2 space-y-0" />
        </div>
      </div>
    </>
  );
}
