import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";

export default function PortalPage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[color:var(--ink)] text-white">
        <ViewTransition name="hero-image" share="morph">
          <Image
            src="https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-1-scaled-e1748731339120-1024x638.jpg"
            alt="Jobe Propco apartment interior"
            fill
            priority
            className="object-cover opacity-35"
          />
        </ViewTransition>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,15,0.94)_0%,rgba(17,24,15,0.85)_55%,rgba(17,24,15,0.55)_100%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--sand)]">Tenant portal</p>
          <h1 className="max-w-4xl font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
            Everything you need to sort, sorted from your phone.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/72">
            Pay rent, report a repair, and find your lease without leaving voice notes or making a trip to the bank.
          </p>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-24">
        <div className="space-y-8">
          <div className="space-y-3 border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Your unit</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Studio B08 · Phase 5</h2>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Rent due 1 May · Move-in done · Next inspection window opens 20 May.
            </p>
          </div>
          <div className="space-y-3 border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Documents</p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Your lease, welcome pack, and receipts stay in one place.</h3>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Need a copy quickly? Open it here instead of asking around.
            </p>
          </div>
          <div className="space-y-3 border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Move dates</p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Move-in, move-out, and handover details when you need them.</h3>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Useful when plans shift and you want the dates in black and white.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Rent</p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Pay from your phone and keep every receipt together.</h3>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              No trip to the bank. No scrambling for proof later.
            </p>
          </div>
        </div>

        <EnquiryForm
          endpoint="/api/maintenance"
          eyebrow="Maintenance"
          title="Tell us what's wrong, any time."
          description="Log the issue clearly, add your unit, and we can pick it up faster. No awkward late-night phone call needed."
          submitLabel="Send request"
          fields={[
            { name: "name", label: "Your name", placeholder: "Full name" },
            { name: "unit", label: "Unit number", placeholder: "e.g. Studio B08" },
            { name: "phone", label: "Phone number", placeholder: "071 234 5678", type: "tel" },
            { name: "issue", label: "What needs fixing?", placeholder: "Tap, light, door, leak... tell us what happened" },
          ]}
        />
      </section>
    </div>
  );
}
