import Link from "next/link";
import { adminMetrics } from "@/lib/site-data";

export default function AdminPage() {
  return (
    <div className="bg-[color:var(--paper)]">
      <section className="mx-auto w-full max-w-7xl px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Professionally managed</p>
        <div className="mt-4 max-w-4xl space-y-5">
          <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Professionally managed. Every unit, every month.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            The basics are handled properly: rent is tracked, maintenance is followed up, and the paperwork is there when needed.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-20 sm:px-8 lg:grid-cols-3 lg:px-12">
        {adminMetrics.map((metric) => (
          <article key={metric.label} className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-7 shadow-[0_20px_80px_rgba(17,24,15,0.06)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">{metric.label}</p>
            <p className="mt-5 font-display text-5xl leading-none text-[color:var(--ink)]">{metric.value}</p>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 border-t border-[color:var(--line)] px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Why tenants trust it</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Good management shows up in the small things.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Quicker answers, clearer records, and less back-and-forth make the whole place feel easier to live in.
          </p>
          <Link
            href="/partners"
            transitionTypes={["nav-forward"]}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
          >
            For businesses
          </Link>
        </div>

        <div className="space-y-8">
          <div className="border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Payments</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Rent is tracked properly, with receipts kept in one place.</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">Clear records matter when people need proof quickly.</p>
          </div>
          <div className="border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Waiting list</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">When a studio opens, someone is already next in line.</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">That helps good units fill faster without a scramble.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Maintenance</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Issues are logged clearly and followed up fast.</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">People notice when repairs do not disappear into silence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
