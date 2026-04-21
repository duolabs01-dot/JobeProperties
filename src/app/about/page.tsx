"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { aboutStats, aboutStory, foundationUrl } from "@/lib/property-data";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealItem, RevealSection, revealItemVariants } from "@/components/reveal-section";
import { ButtonLink } from "@/components/ui/button-link";
import { WordReveal } from "@/components/ui/word-reveal";
import { useInView } from "@/hooks/use-in-view";

const timelineItems = [
  {
    year: "2016",
    text: "Jobe Propco founded. First phase of studio apartments in Far East Bank, Alexandra.",
  },
  {
    year: "2022",
    text: "Jobe Lifestyle Corner opens. The buy-and-braai spot becomes a full precinct: restaurant, bar, salon, car wash.",
  },
  {
    year: "2023",
    text: "Jobe Towers Guesthouse. Short-stay accommodation added for visitors, contractors, and guests.",
  },
  {
    year: "2024",
    text: "Jobe Lifestyle Corner expands. Internet café, fashion, ATM, and 80-delegate conference venue added.",
  },
  {
    year: "2026",
    text: "Six residential phases across Far East Bank. The precinct now serves hundreds of residents and daily visitors.",
  },
];

export default function AboutPage() {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>();

  return (
    <div data-nav-theme="light" className="bg-[color:var(--paper)]">
      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 pt-28 sm:px-8 lg:px-12 lg:py-24" stagger>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <RevealItem className="space-y-8">
            <h1 className="font-display text-5xl leading-none text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
              <WordReveal text="Built from Alexandra. Built for Alexandra." />
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
                  <AnimatedCounter from={2010} to={2016} duration={1.2} />
                ) : null}
                {stat.label === "Phases" ? (
                  <AnimatedCounter from={0} to={6} suffix=" phases" duration={0.8} />
                ) : null}
                {stat.label === "Monthly from" ? (
                  <AnimatedCounter
                    from={4000}
                    to={4300}
                    prefix="R"
                    duration={1.4}
                  />
                ) : null}
                {stat.label === "To Sandton" ? (
                  <AnimatedCounter from={0} to={9} suffix="km" duration={0.8} />
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

      <RevealSection className="border-t border-[color:var(--line)] bg-white" stagger>
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <RevealItem className="max-w-4xl space-y-5">
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              One vision. Eight years. Six businesses.
            </h2>
            <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Dr Sithole didn&apos;t build a property company. He built a community ecosystem — and the apartments are the foundation.
            </p>
          </RevealItem>

          <div className="mt-12 border-l-2 border-[color:var(--sand)] pl-6 sm:pl-8">
            {timelineItems.map((item) => (
              <RevealItem key={item.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[34px] top-2 h-1.5 w-1.5 rounded-full bg-[color:var(--sand)] sm:-left-[42px]" />
                <div className="grid gap-2 sm:grid-cols-[96px_1fr] sm:gap-6">
                  <p className="font-display text-[1.2rem] leading-none text-[color:var(--sand)]">{item.year}</p>
                  <p className="text-[13px] leading-7 text-[color:var(--muted)]">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[color:var(--olive)]">
            <Link
              href="https://jobelifestyle.co.za"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-[color:var(--ink)]"
            >
              Jobe Lifestyle Corner ↗
            </Link>
            <Link
              href={foundationUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-[color:var(--ink)]"
            >
              Dr Sithole Foundation ↗
            </Link>
          </RevealItem>
        </div>
      </RevealSection>
    </div>
  );
}
