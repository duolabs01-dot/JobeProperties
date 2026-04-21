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
          <div className="space-y-3 pt-3">
            <blockquote className="border-l-2 border-[color:var(--accent)] pl-4 italic text-[color:var(--muted)]">
              &quot;I log maintenance from my phone. It gets sorted. That&apos;s all I needed.&quot;
            </blockquote>
            <cite className="text-xs text-[color:var(--muted)]">— Jobe Towers resident</cite>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-3">
            {[
              { value: "300+", label: "Residents" },
              { value: "6", label: "Locations" },
              { value: "48h", label: "Maintenance response" },
              { value: "R0", label: "Bank visits needed" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-[color:var(--surface)] p-4">
                <p className="font-display text-3xl text-[color:var(--accent)]">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <PortalLoginForm redirectTo={params.redirectTo} />
      </section>
    </div>
  );
}
