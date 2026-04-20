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
            A calmer experience for tenants, and less admin for the owner.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/72">
            This product surface moves routine requests away from WhatsApp into a clean phone-first portal: payments, lease documents, maintenance, and move dates in one place.
          </p>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            Back to marketing site
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-24">
        <div className="space-y-8">
          <div className="space-y-3 border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Unit summary</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Studio B08 · Phase 5</h2>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Rent due 1 May · Move-in completed · Next inspection window opens 20 May.
            </p>
          </div>
          <div className="space-y-3 border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Documents</p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Lease, welcome pack, and payment receipts in one place.</h3>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Tenants stop asking for PDFs over chat because the portal handles it with permanent download access.
            </p>
          </div>
          <div className="space-y-3 border-b border-[color:var(--line)] pb-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Move tracking</p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Move-in and move-out dates are visible, editable, and auditable.</h3>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              That gives the owner a cleaner occupancy pipeline and makes handovers easier to manage.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Payments</p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">PayFast-ready payment visibility with reminders and confirmations.</h3>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              The portal structure is ready for online rent collection, proof-of-payment history, and WhatsApp reminder hooks.
            </p>
          </div>
        </div>

        <EnquiryForm
          endpoint="/api/maintenance"
          eyebrow="Maintenance request"
          title="Report an issue without a call chain."
          description="Tenants can submit maintenance requests with context now, then add photo upload via Supabase Storage next. The owner gets a structured alert instead of a vague message."
          submitLabel="Submit maintenance"
          fields={[
            { name: "name", label: "Tenant name", placeholder: "Full name" },
            { name: "unit", label: "Unit", placeholder: "e.g. Studio B08" },
            { name: "phone", label: "Phone", placeholder: "071 234 5678", type: "tel" },
            { name: "issue", label: "Issue summary", placeholder: "Describe the issue clearly" },
          ]}
        />
      </section>
    </div>
  );
}
