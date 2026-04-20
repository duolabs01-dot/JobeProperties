"use client";

import Link from "next/link";
import { foundationUrl, whatsappNumber, whatsappUrl } from "@/lib/property-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--ink)] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="mb-6 flex flex-col gap-4 border-b border-white/7 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/30">Part of the Jobe Enterprise group</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="https://jobelifestyle.co.za"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/12 px-3 py-1 text-[10px] text-white/50 transition-colors duration-300 hover:text-white/80"
            >
              Jobe Lifestyle
            </Link>
            <Link
              href="/guesthouse"
              transitionTypes={["nav-forward"]}
              className="rounded-full border border-white/12 px-3 py-1 text-[10px] text-white/50 transition-colors duration-300 hover:text-white/80"
            >
              Jobe Guesthouse
            </Link>
            <Link
              href={foundationUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/12 px-3 py-1 text-[10px] text-white/50 transition-colors duration-300 hover:text-white/80"
            >
              Dr Sithole Foundation
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.75fr_0.75fr_0.7fr]">
        <div className="space-y-3">
          <p className="font-display text-2xl tracking-[0.18em] text-[color:var(--sand)]">JOBE</p>
          <p className="max-w-xl text-sm leading-7 text-white/66">Studio apartments in Alexandra. 9km from Sandton.</p>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-sm text-white/76 transition-colors duration-300 hover:text-white"
          >
            WhatsApp {whatsappNumber}
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sand)]">Explore</p>
          <Link href="/apartments" transitionTypes={["nav-forward"]}>
            Apartments
          </Link>
          <Link href="/guesthouse" transitionTypes={["nav-forward"]}>
            Guesthouse
          </Link>
          <Link href="/about" transitionTypes={["nav-forward"]}>
            About
          </Link>
          <Link href="/faq" transitionTypes={["nav-forward"]}>
            FAQ
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sand)]">Tenants</p>
          <Link href="/portal" transitionTypes={["nav-forward"]}>
            Tenant portal
          </Link>
          <Link href="/#availability">
            See Availability
          </Link>
          <Link href="/#availability">
            Waiting List
          </Link>
          <Link href="/contact" transitionTypes={["nav-forward"]}>
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-xs text-white/56">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sand)]">Owners</p>
          <Link href="/admin" transitionTypes={["nav-forward"]} className="text-sm text-white/70">
            Owner dashboard
          </Link>
          <Link href="/partners" transitionTypes={["nav-forward"]} className="text-sm text-white/70">
            For businesses
          </Link>
          <Link href={foundationUrl} target="_blank" rel="noreferrer" className="text-sm text-white/70">
            Dr Sithole Foundation
          </Link>
        </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 border-t border-white/7 px-5 py-6 text-[11px] text-white/30 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p>© 2026 Jobe Propco</p>
        <p>Built to make dignified housing accessible in Alexandra.</p>
      </div>
    </footer>
  );
}
