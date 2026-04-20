import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { AvailabilityPanel } from "@/components/availability-panel";
import {
  adPlacements,
  adminMetrics,
  faqs,
  gallery,
  ownerSignals,
  portalMoments,
} from "@/lib/site-data";

export default function Home() {
  return (
    <div className="bg-[color:var(--paper)]">
      <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-[color:var(--ink)] text-white">
        <ViewTransition name="hero-image" share="morph">
          <Image
            src="https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page-1-2-scaled-e1748765134734-1024x657.jpg"
            alt="Jobe Propco apartments"
            fill
            priority
            className="object-cover object-center"
          />
        </ViewTransition>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,196,149,0.25),transparent_32%),linear-gradient(90deg,rgba(17,24,15,0.9)_0%,rgba(17,24,15,0.74)_42%,rgba(17,24,15,0.28)_70%,rgba(17,24,15,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,15,0.16)_0%,rgba(17,24,15,0.72)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-18">
          <div className="max-w-3xl space-y-7">
            <p className="text-xs uppercase tracking-[0.42em] text-[color:var(--sand)]">
              Studio apartments in Alexandra · 9km to Sandton
            </p>
            <div className="space-y-5">
              <p className="font-display text-5xl leading-none tracking-[0.2em] text-[color:var(--sand)] sm:text-6xl lg:text-7xl">
                JOBE PROPCO
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                9km to Sandton. Alexandra still feels like home.
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              Close to the Gautrain, easy on the work commute, and rooted in a neighbourhood that still feels familiar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#availability"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--sand)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:translate-y-[-1px] hover:bg-white"
              >
                See what's available
              </Link>
              <Link
                href="https://wa.me/27722293229"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white hover:bg-white/10"
              >
                WhatsApp us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="living" className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Life at Jobe</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Light, storage, and a place that feels easy to come back to.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Studios made for simple move-ins, long workdays, and daily life that still feels local. Sandton is close. Alexandra still feels like home.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <ViewTransition key={item.src} name={`gallery-${index}`}>
              <figure className="space-y-4">
                <div className="relative aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[color:var(--stone)]">
                  <Image src={item.src} alt={item.alt} fill className="object-cover" />
                </div>
                <figcaption className="max-w-sm text-sm leading-7 text-[color:var(--muted)]">{item.caption}</figcaption>
              </figure>
            </ViewTransition>
          ))}
        </div>
      </section>

      <section id="availability" className="border-y border-[color:var(--line)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <AvailabilityPanel />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Tenant portal</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Everything you need to sort, sorted from your phone.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Pay rent, report a repair, and pull up your lease without asking around or making a trip to the bank.
          </p>
          <Link
            href="/portal"
            transitionTypes={["nav-forward"]}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
          >
            Open tenant portal
          </Link>
        </div>

        <div className="space-y-8 border-t border-[color:var(--line)] pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {portalMoments.map((item) => (
            <div key={item} className="border-b border-[color:var(--line)] pb-6">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--ink)] text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--sand)]">Professionally managed</p>
            <h2 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
              Professionally managed. Every unit, every month.
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/70">
              Rent is tracked, maintenance is followed up, and empty units do not sit for long.
            </p>
            <Link
              href="/admin"
              transitionTypes={["nav-forward"]}
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--sand)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:bg-white"
            >
              See how it's managed
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {adminMetrics.map((metric) => (
              <div key={metric.label} className="space-y-3 border-t border-white/16 pt-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sand)]">{metric.label}</p>
                <p className="font-display text-5xl leading-none text-white">{metric.value}</p>
                <p className="text-sm leading-7 text-white/66">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Advertise with us</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Your business, in front of every Jobe resident.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Reach tenants across 6 phases. People who live, eat, and spend within walking distance of your door.
          </p>
          <Link
            href="/advertise"
            transitionTypes={["nav-forward"]}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:border-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
          >
            Send an enquiry
          </Link>
        </div>

        <div className="space-y-8 border-t border-[color:var(--line)] pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {adPlacements.map((placement) => (
            <div key={placement.title} className="border-b border-[color:var(--line)] pb-6">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{placement.title}</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">{placement.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--paper)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-24">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Why it matters</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              The small things matter when you're renting.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
              When rent, repairs, and paperwork are easy to deal with, everyday life runs better.
            </p>
          </div>

          <div className="space-y-8">
            {ownerSignals.map((signal) => (
              <div key={signal.title} className="border-b border-[color:var(--line)] pb-6">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{signal.title}</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{signal.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">FAQ</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              What people usually ask first.
            </h2>
          </div>

          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[color:var(--line)] pb-6">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{faq.question}</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
