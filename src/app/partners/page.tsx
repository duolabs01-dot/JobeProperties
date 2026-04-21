import type { Metadata } from "next";
import Link from "next/link";
import { PartnersEnquiryForm } from "@/components/partners-enquiry-form";
import { RevealItem, RevealSection } from "@/components/reveal-section";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { foundationUrl, whatsappUrl } from "@/lib/property-data";

export const metadata: Metadata = {
  title: "For Businesses | Jobe Propco",
  description:
    "Advertising, conference venue, corporate accommodation, and supplier partnerships with Jobe Propco and Jobe Lifestyle Corner in Alexandra.",
};

const opportunityCards = [
  {
    icon: "📢",
    title: "Reach Jobe residents",
    body:
      "Homepage placements, community notice boards, and resident newsletter spots. Your business in front of people who live, eat, and spend within walking distance.",
    href: "/contact?type=business",
    label: "Enquire →",
    target: undefined,
  },
  {
    icon: "🎤",
    title: "Host your next event",
    body:
      "Jobe Lifestyle Corner has an 80-delegate conference venue. Private functions, staff parties, business meetings, bridal showers. Full catering available.",
    href:
      "https://wa.me/27722293229?text=Hi%2C+I%27d+like+to+enquire+about+the+conference+venue.",
    label: "Enquire →",
    target: "_blank",
  },
  {
    icon: "🏨",
    title: "Accommodation for your team",
    body:
      "Short-stay rooms at Jobe Towers Guesthouse for visiting staff, contractors, or delegates. Weekly and monthly rates available. Right next to the conference venue.",
    href: "/guesthouse",
    label: "Enquire →",
    target: undefined,
  },
  {
    icon: "🤝",
    title: "Work with Jobe",
    body:
      "We're always open to partnerships with local suppliers, service providers, and trade businesses who share our values. If you think there's a fit, let's talk.",
    href: "/contact?type=business",
    label: "Enquire →",
    target: undefined,
  },
];

export default function PartnersPage() {
  return (
    <div data-nav-theme="light" className="bg-[color:var(--surface)]">
      <section className="bg-[color:var(--surface)] text-[color:var(--ink)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-24">
          <div className="max-w-4xl space-y-5">
            <SectionLabel>For businesses</SectionLabel>
            <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              The Alexandra community, available to your brand.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Jobe Propco and Jobe Lifestyle Corner give your business direct access to hundreds of residents, tenants, and daily visitors across Far East Bank.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonLink
                href="/contact?type=business"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
              >
                Send a partnership enquiry
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-white"
              >
                WhatsApp us directly
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24" stagger>
        <div className="grid gap-6 md:grid-cols-2">
          {opportunityCards.map((card) => (
            <RevealItem
              key={card.title}
              className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_18px_50px_rgba(17,24,15,0.06)]"
            >
              <div className="space-y-4">
                <p className="text-[28px] leading-none">{card.icon}</p>
                <div className="space-y-3">
                  <h2 className="font-display text-3xl leading-none text-[color:var(--ink)]">{card.title}</h2>
                  <p className="text-sm leading-7 text-[color:var(--muted)]">{card.body}</p>
                </div>
                <ButtonLink
                  href={card.href}
                  target={card.target}
                  rel={card.target === "_blank" ? "noreferrer" : undefined}
                  className="inline-flex items-center text-sm font-medium text-[color:var(--accent-dark)] hover:underline"
                >
                  {card.label}
                </ButtonLink>
              </div>
            </RevealItem>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="enquiry" className="border-t border-[color:var(--line)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <PartnersEnquiryForm />
          </div>
        </div>
      </RevealSection>

      <section className="bg-[color:var(--ink)] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="font-display text-3xl leading-none text-white sm:text-4xl">
            Part of the Jobe Enterprise ecosystem
          </p>

          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link href="/" className="text-white/76 transition-colors duration-300 hover:text-white">
              Jobe Propco apartments →
            </Link>
            <Link
              href="https://jobelifestyle.co.za"
              target="_blank"
              rel="noreferrer"
              className="text-white/76 transition-colors duration-300 hover:text-white"
            >
              Jobe Lifestyle Corner →
            </Link>
            <Link
              href={foundationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white/76 transition-colors duration-300 hover:text-white"
            >
              Dr Sithole Foundation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
