import Link from "next/link";
import { whatsappNumber } from "@/lib/property-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--ink)] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.9fr_0.6fr] lg:px-12">
        <div className="space-y-3">
          <p className="font-display text-2xl tracking-[0.18em] text-[color:var(--sand)]">JOBE</p>
          <p className="max-w-xl text-sm leading-7 text-white/66">
            1191 S Africa Loop, Far East Bank, Alexandra, 2014 · WhatsApp {whatsappNumber} · Studio apartments in Alexandra. 9km from Sandton. R4,200/month.
          </p>
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
          <Link href="/contact" transitionTypes={["nav-forward"]}>
            Contact
          </Link>
          <Link href="/#availability">
            See availability
          </Link>
          <Link href="/portal" transitionTypes={["nav-forward"]}>
            Tenant portal
          </Link>
          <Link href="/advertise" transitionTypes={["nav-forward"]}>
            Advertise with us
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-xs text-white/56">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sand)]">Owners</p>
          <Link href="/admin" transitionTypes={["nav-forward"]} className="text-sm text-white/70">
            Owner dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
