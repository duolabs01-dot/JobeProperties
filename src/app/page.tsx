"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AvailabilityPanel } from "@/components/availability-panel";
import { AnimatedCounter } from "@/components/animated-counter";
import { AnimatedStatValue } from "@/components/animated-stat-value";
import { RevealItem, RevealSection, revealItemVariants } from "@/components/reveal-section";
import { Testimonials } from "@/components/testimonials";
import { ButtonLink } from "@/components/ui/button-link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { WordReveal } from "@/components/ui/word-reveal";
import {
  adminMetrics,
  faqs,
  gallery,
  ownerSignals,
  portalMoments,
  socialProofPhrases,
} from "@/lib/site-data";

export default function Home() {
  const marqueeGallery = [...gallery, ...gallery];
  const marqueeProof = [...socialProofPhrases, ...socialProofPhrases];
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        if (window.innerWidth < 1024) {
          setHeroOffset(0);
          return;
        }

        setHeroOffset(window.scrollY * 0.4);
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  return (
    <div className="bg-[color:var(--paper)]">
      <section className="relative isolate -mt-18 flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] text-white">
        <ViewTransition name="hero-image" share="morph">
          <motion.div
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.08 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 will-change-transform"
            style={{ y: heroOffset }}
          >
            <Image
              src="https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page-1-2-scaled-e1748765134734-1024x657.jpg"
              alt="Jobe Propco apartments"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </ViewTransition>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.32)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-24 pt-40 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-7">
            <p className="text-xs uppercase tracking-[0.42em] text-[color:var(--sand)]">
              Studio apartments in Alexandra · 9km to Sandton
            </p>
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl leading-none tracking-[0.2em] text-[color:var(--sand)] sm:text-6xl lg:text-7xl"
              >
                JOBE PROPCO
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] w-[60px] origin-left bg-[color:var(--sand)]"
              />
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                <WordReveal text="9km to Sandton. Alexandra still feels like home." delay={0.7} />
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg"
            >
              Close to the Gautrain, easy on the work commute, and rooted in a neighbourhood that still feels familiar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton className="w-full sm:w-auto">
                <ButtonLink
                  href="/#availability"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--sand)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] hover:translate-y-[-1px] hover:bg-white"
                >
                  See what&apos;s available
                </ButtonLink>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <ButtonLink
                  href="https://wa.me/27722293229"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white hover:bg-white/10"
                >
                  WhatsApp us
                </ButtonLink>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      <RevealSection id="living" className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-20 sm:px-8 lg:px-12 lg:py-28" stagger>
        <RevealItem className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Life at Jobe</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Light, storage, and a place that feels easy to come back to.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Studios made for simple move-ins, long workdays, and daily life that still feels local. Sandton is close. Alexandra still feels like home.
          </p>
        </RevealItem>

        <div className="grid gap-5 lg:hidden lg:grid-cols-3">
          {gallery.map((item, index) => (
            <ViewTransition key={item.src} name={`gallery-${index}`}>
              <motion.figure variants={revealItemVariants} className="space-y-4">
                <ShimmerImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  wrapperClassName="aspect-[1.05/1] rounded-[2rem] bg-[color:var(--stone)]"
                  className="object-cover"
                />
                <figcaption className="max-w-sm text-sm leading-7 text-[color:var(--muted)]">{item.caption}</figcaption>
              </motion.figure>
            </ViewTransition>
          ))}
        </div>

        <RevealItem className="hidden overflow-hidden lg:block">
          <div className="group overflow-hidden">
            <div className="flex w-max gap-4 [animation:home-gallery-marquee_24s_linear_infinite] group-hover:[animation-play-state:paused]">
              {marqueeGallery.map((item, index) => (
                <ViewTransition key={`${item.src}-${index}`} name={`gallery-marquee-${index}`}>
                  <figure className="w-max shrink-0 space-y-4">
                    <ShimmerImage
                      src={item.src}
                      alt={item.alt}
                      width={440}
                      height={280}
                      wrapperClassName="rounded-[2rem] bg-[color:var(--stone)]"
                      className="h-[280px] w-auto object-cover"
                    />
                    <figcaption className="max-w-[320px] text-sm leading-7 text-[color:var(--muted)]">
                      {item.caption}
                    </figcaption>
                  </figure>
                </ViewTransition>
              ))}
            </div>
          </div>
        </RevealItem>
      </RevealSection>

      <RevealSection className="border-y border-[color:var(--line)] bg-white py-4">
        <div className="group overflow-hidden">
          <div className="flex w-max gap-4 whitespace-nowrap [animation:home-gallery-marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
            {marqueeProof.map((phrase, index) => (
              <p
                key={`${phrase}-${index}`}
                className="flex items-center gap-4 text-[12px] uppercase tracking-[0.28em] text-[color:var(--muted)]"
              >
                <span>{phrase}</span>
                <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]/40" />
              </p>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="bg-[color:var(--section-alt)] text-[color:var(--ink)]" stagger>
        <div className="mx-auto w-full max-w-7xl px-5 py-12 text-center sm:px-8 lg:px-12">
          <RevealItem className="space-y-3">
            <p className="font-display text-6xl leading-none text-[color:var(--sand)] sm:text-7xl">
              <AnimatedCounter from={270} to={300} suffix="+" />
            </p>
            <p className="text-sm text-[color:var(--muted)] sm:text-base">residents across Far East Bank</p>
          </RevealItem>

          <RevealItem className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)] sm:gap-5">
            <span>6 phases</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" />
            <span>Est. 2016</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" />
            <span>9km to Sandton</span>
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection id="availability" className="border-y border-[color:var(--line)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <AvailabilityPanel />
        </div>
      </RevealSection>

      <RevealSection className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28" stagger>
        <RevealItem className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Tenant portal</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Pay rent, log repairs, and pull up your lease without chasing anyone.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Pay rent, report a repair, and pull up your lease without asking around or making a trip to the bank.
          </p>
          <ButtonLink
            href="/portal"
            transitionTypes={["nav-forward"]}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
          >
            Open tenant portal
          </ButtonLink>
        </RevealItem>

        <div className="space-y-8 border-t border-[color:var(--line)] pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {portalMoments.map((item) => (
            <motion.div key={item} variants={revealItemVariants} className="border-b border-[color:var(--line)] pb-6">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{item}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="bg-[color:var(--paper)] text-[color:var(--ink)]" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28">
          <RevealItem className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Professionally managed</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Professionally managed. Every unit, every month.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Rent is tracked, maintenance is followed up, and empty units do not sit for long.
            </p>
            <ButtonLink
              href="/admin"
              transitionTypes={["nav-forward"]}
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
            >
              See how it&apos;s managed
            </ButtonLink>
          </RevealItem>

          <div className="grid gap-8 sm:grid-cols-3">
            {adminMetrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={revealItemVariants}
                className="space-y-3 border-t border-[color:var(--line-strong)] pt-5"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">{metric.label}</p>
                <p className="font-display text-5xl leading-none text-[color:var(--ink)]">
                  <AnimatedStatValue value={metric.value} />
                </p>
                <p className="text-sm leading-7 text-[color:var(--muted)]">{metric.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      <Testimonials />

      <RevealSection className="bg-[color:var(--paper)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Life at Jobe Lifestyle Corner</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Your barber, your dinner, your internet — downstairs.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              Jobe Lifestyle Corner sits within the precinct. Tenants don&apos;t need to leave the neighbourhood for everyday needs.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { emoji: "🍖", name: "Restaurant", description: "Kasi-style kitchen. Traditional braai, full menu." },
              { emoji: "🍺", name: "Bar Lounge", description: "Drinks, sport, and somewhere to unwind." },
              { emoji: "✂️", name: "Salon & Barber", description: "Hair salon and barbershop, no appointment needed." },
              { emoji: "🚗", name: "Car Wash", description: "Drive in, come out clean. On-site." },
              { emoji: "💻", name: "Internet Café", description: "Fast internet, printing, and scanning." },
              { emoji: "👗", name: "Fashion", description: "Local designer fashion and apparel." },
              { emoji: "🏧", name: "ATM", description: "Cash on-site. No trip to the mall." },
              { emoji: "🎉", name: "Events", description: "Private functions and 80-delegate conference venue." },
            ].map((amenity) => (
              <div
                key={amenity.name}
                className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(17,24,15,0.05)]"
              >
                <p className="text-[28px] leading-none">{amenity.emoji}</p>
                <p className="mt-4 text-[13px] font-medium text-[color:var(--ink)]">{amenity.name}</p>
                <p className="mt-2 text-[11px] leading-6 text-[color:var(--muted)]">{amenity.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink
              href="https://jobelifestyle.co.za"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm text-[color:var(--olive)] hover:underline"
            >
              Explore Jobe Lifestyle Corner →
            </ButtonLink>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-y border-[color:var(--line)] bg-[color:var(--paper)]" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-24">
          <RevealItem className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Why it matters</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              The small things matter when you&apos;re renting.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
              When rent, repairs, and paperwork are easy to deal with, everyday life runs better.
            </p>
          </RevealItem>

          <div className="space-y-8">
            {ownerSignals.map((signal) => (
              <motion.div key={signal.title} variants={revealItemVariants} className="border-b border-[color:var(--line)] pb-6">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{signal.title}</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{signal.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24" stagger>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealItem className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">FAQ</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              What people usually ask first.
            </h2>
          </RevealItem>

          <div className="space-y-8">
            {faqs.map((faq) => (
              <motion.div key={faq.question} variants={revealItemVariants} className="border-b border-[color:var(--line)] pb-6">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{faq.question}</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
