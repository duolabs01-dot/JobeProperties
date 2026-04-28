"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RevealSection } from "@/components/reveal-section";
import { ButtonLink } from "@/components/ui/button-link";
import { whatsappUrl } from "@/lib/property-data";

// HOW TO ADD REAL TESTIMONIALS:
// 1. Ask Jobe to share WhatsApp messages from happy tenants (screenshot or transcript)
// 2. Get permission to use the quote (anonymised is fine — "Jobe Towers resident since 2022")
// 3. If they have a photo: add it to /public/testimonials/name.jpg and set photoUrl
// 4. Replace the placeholder text in the testimonials array below

type Testimonial = {
  quote: string;
  attribution: string;
  since: string;
  photoUrl?: string;
};

// ⚠️ REPLACE WITH REAL QUOTES FROM JOBE — ask for WhatsApp screenshots
const testimonials: Testimonial[] = [
  {
    quote:
      "Moving into Jobe was the best decision I made when I started working in Sandton. Close enough that the commute is manageable, affordable enough that I could actually save.",
    attribution: "Jobe Towers",
    since: "Resident since 2022",
    photoUrl: undefined,
  },
  {
    quote:
      "The security here is real. Biometric access and someone always around. I sleep better here than I did in the flat I had before.",
    attribution: "Jobe Bel Air",
    since: "Resident since 2023",
    photoUrl: undefined,
  },
  {
    quote:
      "The lifestyle corner downstairs changes everything. I don't need to go far for anything. Food, barber, internet — it's all right there.",
    attribution: "Jobe Mews",
    since: "Resident since 2021",
    photoUrl: undefined,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <RevealSection className="overflow-hidden bg-[color:var(--surface)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">What residents say</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              In their own words.
            </h2>
          </div>
          <ButtonLink
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] hover:text-white"
          >
            WhatsApp us →
          </ButtonLink>
        </div>

        {/* Featured quote */}
        <div className="relative mt-14 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-8 shadow-[0_24px_70px_rgba(28,25,23,0.07)] sm:p-10 lg:p-14">
          {/* Decorative quotation mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 left-10 select-none font-display text-[9rem] leading-none text-[color:var(--accent-light)] lg:text-[12rem]"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <p className="font-display text-2xl italic leading-relaxed text-[color:var(--ink)] sm:text-3xl lg:text-4xl">
                {current.quote}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[color:var(--accent-light)] text-sm font-bold uppercase text-[color:var(--accent-dark)]">
                  {current.photoUrl ? (
                    <Image
                      src={current.photoUrl}
                      alt={current.attribution}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    current.attribution.trim().charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--ink)]">{current.attribution}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">{current.since}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="mt-6 flex items-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[color:var(--accent)]"
                  : "w-2 bg-[color:var(--stone)] hover:bg-[color:var(--muted)]"
              }`}
            />
          ))}
          <p className="ml-2 text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
            {active + 1} / {testimonials.length}
          </p>
        </div>

        {/* Mini grid — other testimonials */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.attribution}
              type="button"
              onClick={() => setActive(i)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`w-[78vw] shrink-0 cursor-pointer rounded-[1.5rem] border p-5 text-left transition-all duration-200 sm:w-auto ${
                i === active
                  ? "border-[color:var(--accent)] bg-[color:var(--accent-light)]"
                  : "border-[color:var(--line-strong)] bg-white hover:border-[color:var(--accent-light)]"
              }`}
            >
              <p className="line-clamp-3 font-display text-sm italic leading-7 text-[color:var(--ink)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {t.attribution} · {t.since}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
