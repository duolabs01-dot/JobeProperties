"use client";

import { motion } from "framer-motion";
import { RevealItem, RevealSection } from "@/components/reveal-section";

type Testimonial = {
  quote: string;
  name: string;
  since: string;
  phase: string;
};

// TODO: replace with real quotes
const testimonials: Testimonial[] = [
  {
    quote:
      "Moving into Jobe was the best decision I made when I started working in Sandton. Close enough that the commute is manageable, affordable enough that I could actually save.",
    name: "T. Mokoena",
    since: "2022",
    phase: "Location 3",
  },
  {
    quote:
      "The security here is real. Biometric access and someone always around. I sleep better here than I did in the flat I had before.",
    name: "N. Dlamini",
    since: "2023",
    phase: "Location 5",
  },
  {
    quote:
      "The lifestyle corner downstairs changes everything. I don't need to go far for anything. Food, barber, internet — it's all right there.",
    name: "K. Sithole",
    since: "2021",
    phase: "Location 4",
  },
];

function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
            <RevealItem key={testimonial.name}>
              <motion.article
                whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(17,24,15,0.1)" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col justify-between rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-[0_18px_48px_rgba(17,24,15,0.06)]"
              >
                <div className="space-y-5">
                  <p className="font-display text-[5rem] leading-none text-[color:var(--accent)]/30">“</p>
                  <p className="-mt-8 text-sm leading-7 text-[color:var(--muted)] italic">{testimonial.quote}</p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] font-display text-lg text-[color:var(--accent)]">
                    {getInitials(testimonial.name)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[color:var(--ink)]">{testimonial.name}</p>
                    <p className="text-xs text-[color:var(--muted)]">
                      Resident since {testimonial.since} · {testimonial.phase}
                    </p>
                  </div>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
