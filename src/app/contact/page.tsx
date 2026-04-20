import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { whatsappNumber, whatsappUrl } from "@/lib/property-data";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-7xl px-5 py-20 pt-28 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Contact</p>
          <h1 className="font-display text-5xl leading-none text-[color:var(--ink)] sm:text-6xl">
            Get in touch.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            WhatsApp is the fastest way to reach us. We typically respond within a few hours.
          </p>
          <div>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[color:var(--olive)]"
            >
              WhatsApp {whatsappNumber}
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <ContactForm />
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--paper)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_24px_70px_rgba(17,24,15,0.08)]">
            <iframe
              title="Jobe Propco map"
              src="https://www.google.com/maps?q=503%20S%20Africa%20Blvd%2C%20Far%20East%20Bank%2C%20Sandton%2C%202014&output=embed"
              className="h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="max-w-xl rounded-[2rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] p-6">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Address</p>
          <p className="mt-4 text-lg leading-8 text-[color:var(--ink)]">
            1191 S Africa Loop, Far East Bank, Alexandra, 2014
          </p>
          <p className="mt-2 text-base text-[color:var(--muted)]">WhatsApp: {whatsappNumber}</p>
        </div>
      </section>
    </div>
  );
}
