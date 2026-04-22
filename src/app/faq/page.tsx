"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaqAccordion } from "@/components/faq-accordion";
import { RevealItem, RevealSection } from "@/components/reveal-section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { moveInFaqs, whatsappNumber, whatsappUrl } from "@/lib/property-data";

type PlanId = "proposal-1" | "proposal-2" | "proposal-3";

const plans = [
  {
    id: "proposal-1" as const,
    title: "Pay upfront",
    badge: "Simplest option",
    badgeVariant: "highlight" as const,
    highlight: "R6,300 total to move in",
    firstMonthCost: "R6,300",
    summary: [
      { label: "Monthly rent", value: "R4,300" },
      { label: "Deposit", value: "R2,000" },
      { label: "Total to move in", value: "R6,300" },
    ],
    whatsappMessage: "Hi, I'd like to move in with the full deposit (Proposal 1). Can we arrange a viewing?",
  },
  {
    id: "proposal-2" as const,
    title: "4-month plan",
    badge: "Most popular",
    badgeVariant: "available" as const,
    highlight: "Only R4,800/month to start",
    firstMonthCost: "R4,800",
    summary: [
      { label: "Monthly rent", value: "R4,300" },
      { label: "Deposit spread", value: "+R500/month for 4 months" },
      { label: "You pay", value: "R4,800/month for first 4 months" },
      { label: "Then", value: "R4,300/month after" },
    ],
    whatsappMessage: "Hi, I'm interested in the 4-month deposit plan (Proposal 2).",
  },
  {
    id: "proposal-3" as const,
    title: "10-month plan",
    badge: "Lowest start",
    badgeVariant: "unit" as const,
    highlight: "Only R4,500/month to start",
    firstMonthCost: "R4,500",
    summary: [
      { label: "Monthly rent", value: "R4,300" },
      { label: "Deposit spread", value: "+R200/month for 10 months" },
      { label: "You pay", value: "R4,500/month for first 10 months" },
      { label: "Then", value: "R4,300/month after" },
    ],
    whatsappMessage: "Hi, I'm interested in the 10-month deposit plan (Proposal 3).",
  },
];

const calculatorOptions = [
  { label: "Proposal 1", value: "proposal-1" as const },
  { label: "Proposal 2", value: "proposal-2" as const },
  { label: "Proposal 3", value: "proposal-3" as const },
];

export default function FaqPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("proposal-2");
  const [calculatorPlan, setCalculatorPlan] = useState<PlanId>("proposal-2");
  const calculatorValue = plans.find((plan) => plan.id === calculatorPlan) ?? plans[1];

  return (
    <div data-nav-theme="light" className="bg-[color:var(--surface)]">
      <section className="bg-[color:var(--surface)] text-[color:var(--ink)]">
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-24">
          <div className="max-w-4xl space-y-5">
            <SectionLabel>FAQ</SectionLabel>
            <h1 className="font-display text-5xl leading-none text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
              Everything you need to know before you move in.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Simple answers to the questions we hear most.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="available">No lease required</Badge>
              <Badge variant="highlight">From R4,300 / month</Badge>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.4fr_0.6fr] lg:px-12 lg:py-24">
          <RevealItem className="lg:sticky lg:top-32 lg:self-start">
            <div className="space-y-5">
              <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
                Got a question that&apos;s not here?
              </h2>
              <ButtonLink
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-[color:var(--accent-dark)]"
              >
                WhatsApp {whatsappNumber}
              </ButtonLink>
              <p className="text-sm leading-7 text-[color:var(--muted)]">We reply fast. Usually within an hour.</p>
            </div>
          </RevealItem>

          <RevealItem>
            <FaqAccordion items={moveInFaqs} />
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection id="pricing" className="border-t border-[color:var(--line)] bg-[color:var(--surface)]" stagger>
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <RevealItem className="max-w-3xl space-y-4">
            <SectionLabel>Payment options for 2026</SectionLabel>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Three ways to get started.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              R4,300/month · R138.80/day. Choose the deposit breakdown that works for you.
            </p>
          </RevealItem>

          <motion.div
            variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
            className="mt-10 grid gap-6 lg:grid-cols-3"
          >
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isDimmed = selectedPlan !== plan.id;

              return (
                <motion.div
                  key={plan.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer rounded-[2rem] border bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.07)] transition duration-300 ${
                    isSelected
                      ? "border-[color:var(--accent)] shadow-[0_24px_80px_rgba(17,24,15,0.1)]"
                      : "border-[color:var(--line-strong)]"
                  } ${isDimmed ? "opacity-75" : "opacity-100"}`}
                >
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-3xl leading-none text-[color:var(--ink)]">{plan.title}</h3>
                      <Badge variant={plan.badgeVariant} className="gap-2">
                        {plan.badge === "Most popular" ? (
                          <span className="home-signal-pulse h-1.5 w-1.5 rounded-full bg-white" />
                        ) : null}
                        <span>{plan.badge}</span>
                      </Badge>
                    </div>

                    <div className="space-y-3 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4">
                      {plan.summary.map((line) => (
                        <div key={line.label} className="flex items-start justify-between gap-4 text-sm text-[color:var(--muted)]">
                          <span>{line.label}</span>
                          <span className="text-right font-medium text-[color:var(--ink)]">{line.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[1.5rem] bg-[color:var(--ink)] px-5 py-4 text-white">
                      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">Highlight</p>
                      <p className="mt-3 font-display text-3xl leading-none">{plan.highlight}</p>
                    </div>

                    <ButtonLink
                      href={`https://wa.me/27722293229?text=${encodeURIComponent(plan.whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center text-sm font-medium text-[color:var(--accent-dark)] hover:underline"
                    >
                      WhatsApp →
                    </ButtonLink>

                    {isSelected ? (
                      <ButtonLink
                        href={`https://wa.me/27722293229?text=${encodeURIComponent(plan.whatsappMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-[color:var(--accent-dark)]"
                      >
                        Selected — WhatsApp to confirm
                      </ButtonLink>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <RevealItem className="mt-10 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent-dark)]">Calculator</p>
                <h3 className="font-display text-3xl leading-none text-[color:var(--ink)] sm:text-4xl">
                  Work out your first month
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-end">
                <label className="space-y-2 text-sm text-[color:var(--ink)]">
                  <span>Which plan?</span>
                  <select
                    value={calculatorPlan}
                    onChange={(event) => setCalculatorPlan(event.target.value as PlanId)}
                    className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                  >
                    {calculatorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-[1.5rem] bg-[color:var(--ink)] px-5 py-5 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">First month cost</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={calculatorValue.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-3 font-display text-4xl leading-none sm:text-5xl"
                    >
                      {calculatorValue.firstMonthCost}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </RevealItem>
        </div>
      </RevealSection>
    </div>
  );
}
