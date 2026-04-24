"use client";

import Image from "next/image";
import Link from "next/link";
import { foundationUrl, whatsappNumber, whatsappUrl } from "@/lib/property-data";

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL ?? "/logo.png";

const ecosystemPartners: ReadonlyArray<{
  initials: string;
  name: string;
  description: string;
  href: string;
  logoSrc: string | null;
  external: boolean;
}> = [
  {
    initials: "JP",
    name: "Jobe Propco",
    description: "Studio apartments & guesthouse",
    href: "/",
    logoSrc: "/logo.png",
    external: false,
  },
  {
    initials: "JL",
    name: "Jobe Lifestyle",
    description: "Restaurant, bar, salon & more",
    href: "https://jobelifestyle.co.za",
    logoSrc: "https://jobelifestyle.co.za/wp-content/uploads/2024/05/JOBE-LIFESTYLE-LLOGO-1.png",
    external: true,
  },
  {
    initials: "DS",
    name: "Dr Sithole Foundation",
    description: "Youth empowerment through education",
    href: foundationUrl,
    logoSrc:
      "https://drsitholefoundation.org/wp-content/uploads/2022/06/cropped-cropped-Green-and-Brown-Circle-Illustrated-Leaves-Environment-Charity-Logo-8-99x83.png",
    external: true,
  },
  {
    initials: "CC",
    name: "CentreConnect",
    description: "Technology & community apps",
    href: "https://centerconnect.co.za",
    logoSrc: "https://centerconnect.co.za/centreconnect-logo.svg",
    external: true,
  },
  {
    initials: "JO",
    name: "Jobe Outdoor Media",
    description: "Out-of-home advertising",
    href: "#",
    logoSrc: "https://drsitholefoundation.org/wp-content/uploads/2022/08/Jobe-Outdoor-Media-7-150x150.png",
    external: false,
  },
];

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M16.45 3c.37 1.92 1.5 3.43 3.55 3.6v2.8a6.4 6.4 0 0 1-3.46-1.15v6.12c0 3.07-2.5 5.63-5.75 5.63S5 17.44 5 14.37s2.5-5.58 5.72-5.58c.33 0 .66.03.98.1v3c-.3-.1-.62-.16-.95-.16-1.55 0-2.8 1.18-2.8 2.64 0 1.54 1.31 2.69 2.83 2.69 1.7 0 2.76-1.31 2.76-3.25V3h2.91Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.5 21v-7.1h2.4l.36-2.8H13.5V9.32c0-.81.22-1.37 1.39-1.37H16.4V5.46c-.26-.04-1.12-.11-2.13-.11-2.1 0-3.55 1.28-3.55 3.64v2.02H8.3v2.8h2.42V21h2.78Z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M19.05 4.94A9.84 9.84 0 0 0 12.02 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.95L2 22l5.31-1.39a9.88 9.88 0 0 0 4.72 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.8 9.8 0 0 0-2.89-6.97ZM12.03 20.1h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.15.83.84-3.07-.2-.31a8.2 8.2 0 0 1-1.27-4.34c0-4.54 3.69-8.23 8.24-8.23 2.2 0 4.26.86 5.81 2.42a8.15 8.15 0 0 1 2.4 5.83c0 4.54-3.69 8.23-8.22 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.12-.54.13-.16.24-.62.8-.76.97-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.42-.06-.13-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.63.3-.22.24-.84.82-.84 1.99 0 1.18.86 2.32.98 2.48.12.16 1.68 2.57 4.06 3.6.57.24 1.01.39 1.36.5.57.18 1.08.15 1.48.09.45-.07 1.38-.56 1.58-1.1.2-.54.2-1.01.14-1.1-.06-.08-.22-.13-.47-.25Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
      {/* Ecosystem partners strip */}
      <section className="border-b border-[color:var(--line)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Part of the Jobe Enterprise ecosystem
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {ecosystemPartners.map((partner) => {
              const content = (
                <div className="rounded-2xl border border-transparent bg-white px-4 py-5 text-center shadow-[0_4px_20px_rgba(28,25,23,0.05)] transition-all duration-200 hover:border-[color:var(--accent-light)] hover:shadow-[0_8px_30px_rgba(28,25,23,0.09)]">
                  <div className="mx-auto flex h-16 w-full max-w-[9rem] items-center justify-center overflow-hidden rounded-xl bg-[color:var(--surface)] px-3">
                    {partner.logoSrc ? (
                      <Image
                        src={partner.logoSrc}
                        alt={partner.name}
                        width={144}
                        height={64}
                        className="h-11 w-auto max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--accent-light)] text-sm font-semibold text-[color:var(--accent-dark)]">
                        {partner.initials}
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-[13px] font-medium text-[color:var(--ink)]">{partner.name}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[color:var(--muted)]">{partner.description}</p>
                </div>
              );

              if (partner.external) {
                return (
                  <Link key={partner.name} href={partner.href} target="_blank" rel="noreferrer" className="block">
                    {content}
                  </Link>
                );
              }

              return (
                <Link key={partner.name} href={partner.href} className="block" transitionTypes={partner.href.startsWith("/") ? ["nav-forward"] : undefined}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main footer body */}
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center" transitionTypes={["nav-back"]}>
              <Image
                src={LOGO_URL}
                alt="Jobe Propco"
                width={224}
                height={80}
                className="h-16 w-auto object-contain sm:h-20"
                priority
              />
            </Link>
            <p className="max-w-xs text-sm leading-7 text-[color:var(--muted)]">
              Studio apartments in Alexandra. 9km from Sandton. Built from the community, built for it.
            </p>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--ink)] transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#25D366]" />
              WhatsApp {whatsappNumber}
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <p className="mb-1 text-xs uppercase tracking-[0.28em] text-[color:var(--accent)]">Explore</p>
            {[
              { label: "Apartments", href: "/apartments" },
              { label: "Guesthouse", href: "/guesthouse" },
              { label: "About", href: "/about" },
              { label: "FAQ", href: "/faq" },
            ].map((link) => (
              <Link key={link.href} href={link.href} transitionTypes={["nav-forward"]} className="text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--ink)]">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <p className="mb-1 text-xs uppercase tracking-[0.28em] text-[color:var(--accent)]">Tenants</p>
            {[
              { label: "Tenant login", href: "/portal/login", transition: true },
              { label: "See availability", href: "/#availability", transition: false },
              { label: "Waiting list", href: "/#availability", transition: false },
              { label: "Contact", href: "/contact", transition: true },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                transitionTypes={link.transition ? ["nav-forward"] : undefined}
                className="text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <p className="mb-1 text-xs uppercase tracking-[0.28em] text-[color:var(--accent)]">Community</p>
            {[
              { label: "Dr Sithole Foundation", href: foundationUrl, external: true },
              { label: "CentreConnect", href: "https://centerconnect.co.za", external: true },
              { label: "Jobe Lifestyle Corner", href: "https://jobelifestyle.co.za", external: true },
              { label: "Partner with us", href: "/partners", external: false },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                transitionTypes={!link.external ? ["nav-forward"] : undefined}
                className="text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[color:var(--line)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-6 text-[11px] text-[color:var(--muted)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-2">
            <p>© 2026 Jobe Propco</p>
            <span className="hidden text-[color:var(--line-strong)] sm:inline">·</span>
            <span className="hidden sm:inline">Jobe Propco (PTY) Ltd · Property &amp; Rental Management</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <p>Built to make dignified housing accessible in Alexandra.</p>
            <div className="flex items-center gap-2">
              <Link
                href="#"
                title="Follow us on Instagram (coming soon)"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line-strong)] text-[color:var(--muted)] transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="#"
                title="Follow us on Facebook (coming soon)"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line-strong)] text-[color:var(--muted)] transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="#"
                title="Follow us on TikTok (coming soon)"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line-strong)] text-[color:var(--muted)] transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <TiktokIcon />
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                title="Chat with us on WhatsApp"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#25D366] bg-[#25D366] text-white transition-transform duration-300 hover:scale-[1.05]"
              >
                <WhatsappIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
