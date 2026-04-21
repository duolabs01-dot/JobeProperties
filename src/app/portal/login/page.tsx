import type { Metadata } from "next";
import { PortalLoginForm } from "@/components/portal/portal-login-form";

export const metadata: Metadata = {
  title: "Tenant Login | Jobe Propco",
};

type PortalLoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

export default async function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  const params = await searchParams;

  return (
    <div className="bg-[color:var(--surface)]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="max-w-2xl space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Tenant portal</p>
          <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Tenant login
          </h1>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Enter your phone number or email. We&apos;ll send you a link — no password needed.
          </p>
        </div>

        <PortalLoginForm redirectTo={params.redirectTo} />
      </section>
    </div>
  );
}
