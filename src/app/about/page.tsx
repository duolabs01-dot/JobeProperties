import Link from "next/link";
import { aboutStats, aboutStory, foundationUrl } from "@/lib/property-data";

export default function AboutPage() {
  return (
    <div className="bg-[color:var(--paper)]">
      <section className="mx-auto w-full max-w-7xl px-5 py-20 pt-28 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-8">
            <h1 className="font-display text-5xl leading-none text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
              Built from Alexandra. Built for Alexandra.
            </h1>

            <div className="space-y-6 text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <div className="aspect-square rounded-[2rem] border-2 border-[color:var(--sand)] bg-[linear-gradient(135deg,rgba(215,196,149,0.28),rgba(255,255,255,0.2))]" />
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.75rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-6 py-6"
            >
              <p className="font-display text-4xl leading-none text-[color:var(--ink)]">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Community</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Beyond the apartment.
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Jobe Propco is part of the Jobe Enterprise group. The Dr Sithole Foundation runs alongside the property business — focused on education, community development, and creating opportunity in Alexandra. Every unit rented is part of something larger.
          </p>
          <Link
            href={foundationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
          >
            Visit the Foundation →
          </Link>
        </div>
      </section>
    </div>
  );
}
