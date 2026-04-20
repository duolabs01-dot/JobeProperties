"use client";

import { motion } from "framer-motion";
import { aboutStats, aboutStory, foundationUrl } from "@/lib/property-data";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealItem, RevealSection, revealItemVariants } from "@/components/reveal-section";
import { ButtonLink } from "@/components/ui/button-link";
import { useInView } from "@/hooks/use-in-view";

export default function AboutPage() {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>();

  return (
    <div className="bg-[color:var(--paper)]">
      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 pt-28 sm:px-8 lg:px-12 lg:py-24" stagger>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <RevealItem className="space-y-8">
            <h1 className="font-display text-5xl leading-none text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
              Built from Alexandra. Built for Alexandra.
            </h1>

            <div className="space-y-6 text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="lg:pt-4">
            <div className="flex aspect-square flex-col items-center justify-center rounded-[2rem] border border-[color:var(--sand)]/70 bg-[color:var(--ink)] px-8 text-center shadow-[0_28px_80px_rgba(17,24,15,0.2)]">
              <p className="font-display text-[64px] leading-none tracking-[0.08em] text-[color:var(--sand)]">DS</p>
              <div className="mt-8 h-[2px] w-10 bg-[color:var(--sand)]" />
              <p className="mt-6 text-base font-semibold text-white">Dr Nhlanhla Sithole</p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/50">
                Founder, Jobe Propco · Est. 2016
              </p>
            </div>
          </RevealItem>
        </div>
      </RevealSection>

      <section className="border-y border-[color:var(--line)] bg-white">
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
          className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12"
        >
          {aboutStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={revealItemVariants}
              className="rounded-[1.75rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-6 py-6"
            >
              <p className="font-display text-4xl leading-none text-[color:var(--ink)]">
                {stat.label === "Founded" ? (
                  <AnimatedCounter start={2010} end={2016} duration={1200} active={statsInView} />
                ) : null}
                {stat.label === "Phases" ? (
                  <AnimatedCounter start={0} end={6} duration={800} active={statsInView} />
                ) : null}
                {stat.label === "Monthly from" ? (
                  <AnimatedCounter
                    start={0}
                    end={4300}
                    duration={1400}
                    active={statsInView}
                    formatValue={(value) => `R${new Intl.NumberFormat("en-ZA").format(Math.round(value))}`}
                  />
                ) : null}
                {stat.label === "To Sandton" ? (
                  <AnimatedCounter
                    start={0}
                    end={9}
                    duration={800}
                    active={statsInView}
                    formatValue={(value) => `${Math.round(value)}km`}
                  />
                ) : null}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Community</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Beyond the apartment.
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Jobe Propco is part of the Jobe Enterprise group. The Dr Sithole Foundation runs alongside the property business — focused on education, community development, and creating opportunity in Alexandra. Every unit rented is part of something larger.
          </p>
          <ButtonLink
            href={foundationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
          >
            Visit the Foundation →
          </ButtonLink>
        </div>
      </RevealSection>
    </div>
  );
}
