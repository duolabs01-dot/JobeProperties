import Link from "next/link";
import { adminMetrics } from "@/lib/site-data";

export default function AdminPage() {
  return (
    <div className="bg-[color:var(--paper)]">
      <section className="mx-auto w-full max-w-7xl px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Owner dashboard</p>
        <div className="mt-4 max-w-4xl space-y-5">
          <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Revenue, occupancy, and unresolved issues in one decisive view.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            This is the pitch surface for a busy doctor-owner: online payments, live arrears visibility, waiting-list demand, and maintenance tracking without operational guesswork.
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
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Why this matters</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Lead with the payment portal, then show the control it unlocks.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            The strongest founder pitch is simple: tenants pay online, the owner gets automated visibility, and empty units get replaced by structured demand through the waiting list.
          </p>
          <Link
            href="/advertise"
            transitionTypes={["nav-forward"]}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
          >
            Show ad revenue lane
          </Link>
        </div>

        <div className="space-y-8">
          <div className="border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Payments</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Who paid, who owes, and who needs a reminder.</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">PayFast integration and reminder automation create the immediate money story.</p>
          </div>
          <div className="border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Waiting list</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">No vacant unit should sit empty while enquiries disappear into chat threads.</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">Every prospect can be captured with preferred phase and contact details for fast follow-up.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Maintenance</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Photo-backed tickets instead of vague tenant descriptions.</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">This turns a frustrating admin burden into a sorted operational queue.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
