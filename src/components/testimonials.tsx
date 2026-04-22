"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealItem, RevealSection } from "@/components/reveal-section";

// HOW TO ADD REAL TESTIMONIALS:
// 1. Ask Jobe to share WhatsApp messages from happy tenants (screenshot or transcript)
// 2. Get permission to use the quote (anonymised is fine — "Jobe Towers resident since 2022")
// 3. If they have a photo: add it to /public/testimonials/name.jpg and set photoUrl
// 4. Replace the placeholder text in the testimonials array below

type Testimonial = {
  quote: string;
  attribution: string;
  photoUrl?: string;
};

// ⚠️ REPLACE WITH REAL QUOTES FROM JOBE — ask for WhatsApp screenshots
const testimonials: Testimonial[] = [
  {
    quote:
      "Moving into Jobe was the best decision I made when I started working in Sandton. Close enough that the commute is manageable, affordable enough that I could actually save.",
    attribution: "Jobe Towers resident since 2022",
    photoUrl: undefined,
  },
  {
    quote:
      "The security here is real. Biometric access and someone always around. I sleep better here than I did in the flat I had before.",
    attribution: "Jobe Bel Air resident since 2023",
    photoUrl: undefined,
  },
  {
    quote:
      "The lifestyle corner downstairs changes everything. I don't need to go far for anything. Food, barber, internet — it's all right there.",
    attribution: "Jobe Mews resident since 2021",
    photoUrl: undefined,
  },
];

export function Testimonials() {
  return (
    <RevealSection className="bg-white" stagger>
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <RevealItem className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">What residents say</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            In their own words.
          </h2>
        </RevealItem>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.attribution}>
              <motion.article
                whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(17,24,15,0.1)" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full flex-col justify-between rounded-[2rem] border border-[color:var(--line)] border-l-[3px] border-l-[color:var(--accent)] bg-white p-6 shadow-[0_18px_48px_rgba(17,24,15,0.06)]"
              >
                <div className="space-y-5">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[color:var(--accent-light)] text-sm font-semibold uppercase text-[color:var(--accent-dark)]">
                    {testimonial.photoUrl ? (
                      <Image
                        src={testimonial.photoUrl}
                        alt={testimonial.attribution}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      testimonial.attribution.trim().charAt(0)
                    )}
                  </div>
                  <p className="font-display text-[1.1rem] leading-8 italic text-[color:var(--ink)]">
                    {testimonial.quote}
                  </p>
                </div>

                <p className="mt-8 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  {testimonial.attribution}
                </p>
              </motion.article>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
