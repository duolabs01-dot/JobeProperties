"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { aboutStats, aboutStory, foundationUrl } from "@/lib/property-data";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealItem, RevealSection, revealItemVariants } from "@/components/reveal-section";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { WordReveal } from "@/components/ui/word-reveal";
import { useInView } from "@/hooks/use-in-view";

const timelineItems = [
  {
    year: "2016",
    text: "Jobe Propco founded. First location of studio apartments in Far East Bank, Alexandra.",
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
    text: "Six residential locations across Far East Bank. The precinct now serves hundreds of residents and daily visitors.",
  },
];

export default function AboutPage() {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>();

  return (
    <div data-nav-theme="light" className="bg-[color:var(--surface)]">
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
            <div className="lg:pt-4">
              <div className="relative">
                <p className="pointer-events-none absolute -left-4 -top-8 select-none font-display text-[5rem] leading-none text-[color:var(--accent-light)]">
                  &quot;
                </p>
                <blockquote className="relative pl-4 pt-6">
                  <p className="font-display text-2xl leading-tight italic text-[color:var(--ink)] sm:text-3xl">
                    The housing close to the economic centre was either unaffordable or undignified. He
                    decided to change that.
                  </p>
                  <cite className="mt-6 block text-xs not-italic uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    — About Dr Nhlanhla Sithole, Founder
                  </cite>
                </blockquote>
              </div>
              <div className="mt-10 rounded-2xl bg-[color:var(--accent-light)] p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[color:var(--accent-dark)]">
                  Founder
                </p>
                <p className="font-display text-2xl text-[color:var(--ink)]">Dr Nhlanhla Sithole</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Medical doctor · Property developer · Community builder
                </p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  Far East Bank, Alexandra · Est. 2016
                </p>
              </div>
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
              className="rounded-[1.75rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-6 py-6"
            >
              <p className="font-display text-4xl leading-none text-[color:var(--ink)]">
                {stat.label === "Founded" ? (
                  <AnimatedCounter from={2010} to={2016} duration={1.2} />
                ) : null}
                {stat.label === "Locations" ? (
                  <AnimatedCounter from={0} to={6} suffix=" locations" duration={0.8} />
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
          <SectionLabel>Community</SectionLabel>
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

          <div className="relative mt-10 space-y-0">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute bottom-0 left-[72px] top-0 w-px bg-[color:var(--line-strong)]"
            />

            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className="relative flex gap-8 pb-10 last:pb-0"
              >
                <div className="relative w-[72px] shrink-0 pt-0.5 text-right">
                  <span className="font-display text-sm font-semibold text-[color:var(--accent)]">
                    {item.year}
                  </span>
                  <div className="absolute -right-[4.5px] top-[5px] h-2.5 w-2.5 rounded-full border-2 border-[color:var(--accent)] bg-white" />
                </div>
                <p className="pt-0.5 text-sm leading-7 text-[color:var(--muted)]">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <RevealItem className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[color:var(--accent-dark)]">
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
