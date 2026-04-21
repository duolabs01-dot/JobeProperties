"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ViewTransition } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AvailabilityPanel } from "@/components/availability-panel";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealItem, RevealSection, revealItemVariants } from "@/components/reveal-section";
import { Testimonials } from "@/components/testimonials";
import { MotionButton } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { useToast } from "@/components/ui/toast";
import { WordReveal } from "@/components/ui/word-reveal";
import { faqs, gallery, ownerSignals, portalMoments, socialProofPhrases } from "@/lib/site-data";

const crecheSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Enter a valid SA number (e.g. 071 234 5678)"),
});

type CrecheValues = z.infer<typeof crecheSchema>;

const lifestyleAmenities = [
  { emoji: "🍖", name: "Restaurant", description: "Kasi-style kitchen. Traditional braai, full menu." },
  { emoji: "🍺", name: "Bar Lounge", description: "Drinks, sport, and somewhere to unwind." },
  { emoji: "✂️", name: "Salon & Barber", description: "Hair salon and barbershop, no appointment needed." },
  { emoji: "🚗", name: "Car Wash", description: "Drive in, come out clean. On-site." },
  { emoji: "💻", name: "Internet Café", description: "Fast internet, printing, and scanning." },
  { emoji: "👗", name: "Fashion", description: "Local designer fashion and apparel." },
  { emoji: "🏧", name: "ATM", description: "Cash on-site. No trip to the mall." },
  { emoji: "🎉", name: "Events", description: "Private functions and 80-delegate conference venue." },
] as const;

export default function Home() {
  const marqueeGallery = [...gallery, ...gallery];
  const marqueeProof = [...socialProofPhrases, ...socialProofPhrases];
  const [heroOffset, setHeroOffset] = useState(0);
  const [isCrecheComplete, setIsCrecheComplete] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields, submitCount },
  } = useForm<CrecheValues>({
    resolver: zodResolver(crecheSchema),
    defaultValues: { name: "", phone: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

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
    <div className="bg-[color:var(--surface)]">
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
            <p className="text-xs uppercase tracking-[0.42em] text-[color:var(--accent)]">
              Alexandra · Johannesburg · Est. 2016
            </p>
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl leading-none tracking-[0.2em] text-[color:var(--accent)] sm:text-6xl lg:text-7xl"
              >
                JOBE PROPCO
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] w-[60px] origin-left bg-[color:var(--accent)]"
              />
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                <WordReveal text="A home where the community is the amenity." delay={0.7} />
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg"
            >
              Elegant studio apartments in Far East Bank. Secure, quiet, and walkable to everything you
              need — with Sandton 9km away.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <ButtonLink
                href="/#availability"
                className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:translate-y-[-1px] hover:bg-[color:var(--accent-dark)] sm:w-auto"
              >
                See what&apos;s available
              </ButtonLink>
              <ButtonLink
                href="/apartments"
                transitionTypes={["nav-forward"]}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white hover:bg-white/10 sm:w-auto"
              >
                View locations
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-10 hidden lg:block">
          <div className="mx-auto flex w-full max-w-7xl items-stretch gap-8 px-5 sm:px-8 lg:px-12">
            {[
              { value: "6", label: "Locations" },
              { value: "300+", label: "Residents" },
              { value: "2016", label: "Est." },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center gap-4 ${index < 2 ? "border-r border-white/15 pr-8" : ""}`}
              >
                <span className="text-xl font-semibold tracking-[-0.05em] text-white">{stat.value}</span>
                <span className="text-[11px] uppercase tracking-[0.28em] text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevealSection
        id="living"
        className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        stagger
      >
        <RevealItem className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Life at Jobe</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Light, storage, and a place that feels easy to come back to.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Studios made for simple move-ins, long workdays, and daily life that still feels local.
            Sandton is close. Alexandra still feels like home.
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
                <figcaption className="max-w-sm text-sm leading-7 text-[color:var(--muted)]">
                  {item.caption}
                </figcaption>
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

      <RevealSection className="border-b border-[color:var(--line)] bg-[color:var(--accent-light)]" stagger>
        <div className="mx-auto w-full max-w-7xl px-5 py-12 text-center sm:px-8 lg:px-12">
          <RevealItem className="space-y-3">
            <p className="font-display text-6xl leading-none text-[color:var(--accent-dark)] sm:text-7xl">
              <AnimatedCounter from={270} to={300} suffix="+" />
            </p>
            <p className="text-sm text-[color:var(--ink-soft)] sm:text-base">residents across Far East Bank</p>
          </RevealItem>

          <RevealItem className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.28em] text-[color:var(--ink-soft)] sm:gap-5">
            <span>6 locations</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" />
            <span>Est. 2016</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" />
            <span>9km to Sandton</span>
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection id="availability" className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <AvailabilityPanel />
        </div>
      </RevealSection>

      <RevealSection
        className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28"
        stagger
      >
        <RevealItem className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Tenant portal</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Pay rent, log repairs, and pull up your lease without chasing anyone.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Pay rent, report a repair, and pull up your lease without asking around or making a trip to
            the bank.
          </p>
          <ButtonLink
            href="/portal"
            transitionTypes={["nav-forward"]}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
          >
            Open tenant portal
          </ButtonLink>
        </RevealItem>

        <div className="space-y-8 border-t border-[color:var(--line)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          {portalMoments.map((item) => (
            <motion.div key={item} variants={revealItemVariants} className="border-b border-[color:var(--line)] pb-6">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{item}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <Testimonials />

      <RevealSection className="bg-[color:var(--surface)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">
              Life at Jobe Lifestyle Corner
            </p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Your barber, your dinner, your internet — downstairs.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              Jobe Lifestyle Corner sits within the precinct. Tenants don&apos;t need to leave the
              neighbourhood for everyday needs.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {lifestyleAmenities.map((amenity) => (
              <div
                key={amenity.name}
                className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(28,25,23,0.05)]"
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
              className="inline-flex items-center text-sm text-[color:var(--accent-dark)] hover:underline"
            >
              Explore Jobe Lifestyle Corner →
            </ButtonLink>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-y border-[color:var(--line)] bg-[color:var(--accent-light)]" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.6fr_0.4fr] lg:px-12">
          <RevealItem className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Coming soon</p>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              A creche inside the community.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
              Jobe is opening a creche in one of our locations — giving working parents a safe,
              close-by option for their children. When your child&apos;s day starts and ends in the same
              building as yours, life gets a little easier.
            </p>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Opening date to be announced. Priority placement for current tenants.
            </p>
          </RevealItem>

          <RevealItem>
            <form
              className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_70px_rgba(28,25,23,0.08)]"
              onSubmit={handleSubmit(async (values) => {
                try {
                  const response = await fetch("/api/waiting-list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...values,
                      preferredPhase: "creche",
                      notes: "creche enquiry",
                    }),
                  });
                  const payload = (await response.json()) as { message: string };

                  if (!response.ok) {
                    throw new Error(payload.message);
                  }

                  toast({
                    variant: "success",
                    title: "You're on the list",
                    description: "We'll let you know when creche registration opens.",
                  });
                  reset();
                  setIsCrecheComplete(true);
                } catch (error) {
                  toast({
                    variant: "error",
                    title: "Something went wrong",
                    description:
                      error instanceof Error ? error.message : "Couldn't save your details. Try again.",
                  });
                }
              })}
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent-light)] text-[color:var(--accent-dark)]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
                    <path d="M4 20h16" />
                    <path d="M6 20V10l6-4 6 4v10" />
                    <path d="M9 20v-5h6v5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                  Be first to know
                </h3>
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  Leave your contact details and we&apos;ll notify you when creche registration opens.
                </p>
              </div>

              {isCrecheComplete ? (
                <div className="mt-6 rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-5 py-4 text-sm font-medium text-[color:var(--accent-dark)]">
                  ✓ You&apos;re on the creche update list.
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                    <span>Name</span>
                    <input
                      {...register("name")}
                      className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                      placeholder="Full name"
                    />
                    {((touchedFields.name || submitCount > 0) && errors.name) ? (
                      <p className="text-xs text-red-600">{errors.name.message}</p>
                    ) : null}
                  </label>

                  <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                    <span>Phone</span>
                    <input
                      {...register("phone", {
                        setValueAs: (value) => (typeof value === "string" ? value.replace(/\s+/g, "") : value),
                      })}
                      type="tel"
                      className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                      placeholder="e.g. 071 234 5678"
                    />
                    {((touchedFields.phone || submitCount > 0) && errors.phone) ? (
                      <p className="text-xs text-red-600">{errors.phone.message}</p>
                    ) : null}
                  </label>

                  <MotionButton
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Notify me"}
                  </MotionButton>
                </div>
              )}
            </form>
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection className="border-y border-[color:var(--line)] bg-white" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-24">
          <RevealItem className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Why it matters</p>
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
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">FAQ</p>
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
