"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageLightboxGallery } from "@/components/image-lightbox-gallery";
import { RevealItem, RevealSection, revealItemVariants } from "@/components/reveal-section";
import { Badge } from "@/components/ui/badge";
import { MotionButton } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionLabel } from "@/components/ui/section-label";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { useToast } from "@/components/ui/toast";
import { VumaPricingCards } from "@/components/vuma-pricing-cards";
import { WordReveal } from "@/components/ui/word-reveal";
import { useInView } from "@/hooks/use-in-view";
import {
  apartmentGalleryGroups,
  apartmentHeroImage,
  apartmentLocations,
  apartmentSpecs,
  unitTypes,
  whatsappNumber,
  whatsappUrl,
} from "@/lib/property-data";

const futureLocationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Enter a valid SA number (e.g. 071 234 5678)"),
});

type FutureLocationValues = z.infer<typeof futureLocationSchema>;

function LocationCard({ location }: { location: (typeof apartmentLocations)[number] }) {
  return (
    <TiltCard className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_22px_70px_rgba(28,25,23,0.08)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--stone)]">
        <ShimmerImage
          src={location.image}
          alt={location.name}
          fill
          wrapperClassName="h-full w-full bg-[color:var(--stone)]"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,25,23,0.85)] via-[rgba(28,25,23,0.2)] to-transparent transition-all duration-500 group-hover:from-[rgba(28,25,23,0.95)] group-hover:via-[rgba(28,25,23,0.35)]" />
        <div className="absolute right-4 top-4">
          <Badge variant="highlight">{location.badge.split(" · ")[0]}</Badge>
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="font-display text-2xl leading-none text-white sm:text-3xl">{location.name}</h3>
          <p className="mt-2 text-sm text-white/70">{location.address}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 p-5">
        <ButtonLink
          href={location.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
        >
          View map
        </ButtonLink>
        <ButtonLink
          href={location.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[color:var(--accent-dark)]"
        >
          Enquire
        </ButtonLink>
      </div>
    </TiltCard>
  );
}

export default function ApartmentsPage() {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>();
  const { toast } = useToast();
  const [isFutureComplete, setIsFutureComplete] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields, submitCount },
  } = useForm<FutureLocationValues>({
    resolver: zodResolver(futureLocationSchema),
    defaultValues: { name: "", phone: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return (
    <div className="bg-white">
      <section className="grain-overlay relative isolate overflow-hidden bg-[color:var(--surface)]">
        {/* Image panel — right side desktop */}
        <div className="absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
          <div className="ken-burns absolute inset-0">
            <Image
              src={apartmentHeroImage}
              alt="Jobe Propco apartments exterior"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[color:var(--accent)]/5" />
        </div>

        {/* Mobile image strip */}
        <div className="relative h-[40vw] max-h-[40vh] w-full overflow-hidden lg:hidden">
          <Image
            src={apartmentHeroImage}
            alt="Jobe Propco apartments exterior"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--surface)]" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-20 pt-10 sm:px-8 lg:w-[58%] lg:px-12 lg:py-24 lg:pt-32">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
            className="max-w-3xl space-y-5"
          >
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent)]">Apartments</p>
            <motion.h1
              variants={revealItemVariants}
              className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl"
            >
              <WordReveal text="Studio apartments built for real life." />
            </motion.h1>
            <motion.p
              variants={revealItemVariants}
              className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg"
            >
              15–20sqm. Private kitchenette. Private bathroom. Built-in cupboards. Biometric entry.
              From R4,300/month.
            </motion.p>
            <motion.div variants={revealItemVariants} className="flex flex-wrap gap-2">
              {["Biometric security", "No lease", "Fibre-ready"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-[color:var(--line-strong)] bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--ink-soft)]"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24" stagger>
        <RevealItem className="max-w-3xl space-y-4">
          <SectionLabel>Inside the apartments</SectionLabel>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Open plan, practical, and easy to move into.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Browse the rooms, bathrooms, storage, balconies, and exterior before you set up a viewing.
          </p>
        </RevealItem>

        <RevealItem className="mt-10">
          <ImageLightboxGallery groups={apartmentGalleryGroups} />
        </RevealItem>
      </RevealSection>

      <RevealSection className="border-y border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-3 lg:gap-4">
            {apartmentSpecs.map((spec) => (
              <div
                key={spec}
                className="inline-flex items-center rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm text-[color:var(--ink)] shadow-[0_10px_30px_rgba(28,25,23,0.04)]"
              >
                {spec}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24" stagger>
        <RevealItem className="max-w-3xl space-y-4">
          <SectionLabel>Three ways to live here</SectionLabel>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Pick the layout that fits your life.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            All studios share the same finishes, security, and price point. The difference is how the
            space opens up.
          </p>
        </RevealItem>

        <motion.div
          variants={{ visible: { transition: { delayChildren: 0.12, staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {unitTypes.map((unitType) => (
            <motion.article
              key={unitType.id}
              variants={{
                hidden: { opacity: 0, y: 28, boxShadow: "0 22px 70px rgba(28,25,23,0.08)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  boxShadow: "0 22px 70px rgba(28,25,23,0.08)",
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
                hover: {
                  y: -6,
                  boxShadow: "0 24px 60px rgba(28,25,23,0.14)",
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover="hover"
              className="relative overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_22px_70px_rgba(28,25,23,0.08)]"
            >
              <motion.div
                variants={{
                  hidden: { width: 0 },
                  visible: { width: 0 },
                  hover: { width: 3, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="absolute inset-y-0 left-0 z-10 bg-[color:var(--accent)]"
              />
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--stone)]">
                <motion.div
                  variants={{
                    hover: { scale: 1.06, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="h-full w-full"
                >
                  <ShimmerImage
                    src={unitType.image}
                    alt={unitType.name}
                    fill
                    wrapperClassName="h-full w-full bg-[color:var(--stone)]"
                    className="object-cover"
                  />
                </motion.div>
                <Badge variant="unit" className="absolute left-4 top-4">
                  {unitType.name}
                </Badge>
              </div>

              <div className="space-y-4 bg-white p-6">
                <div className="space-y-2">
                  <h3 className="font-display text-[1.4rem] leading-none text-[color:var(--ink)]">
                    {unitType.name}
                  </h3>
                  <p className="text-[0.9rem] italic text-[color:var(--muted)]">{unitType.tagline}</p>
                  <p className="text-sm leading-7 text-[color:var(--muted)]">{unitType.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {unitType.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-[color:var(--line-strong)] px-3 py-2 text-xs text-[color:var(--ink)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <ButtonLink
                  href={`https://wa.me/27722293229?text=${encodeURIComponent(`Hi, I'm interested in a ${unitType.name} studio. Can you tell me more?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center text-sm font-medium text-[color:var(--accent-dark)] hover:underline"
                >
                  Enquire about this type →
                </ButtonLink>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </RevealSection>

      <RevealSection className="border-y border-[color:var(--line)] bg-[color:var(--surface)]" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12 lg:py-24">
          <RevealItem className="space-y-5">
            <SectionLabel>Internet connectivity</SectionLabel>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Fibre internet, ready in your unit.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Every Jobe unit has Vuma Fibre infrastructure installed. Tenants connect directly with
              Webafrica — packages start at R99/month for uncapped 10Mbps. No sharing, no throttling.
            </p>
            <div className="space-y-3 rounded-2xl border border-[color:var(--line-strong)] bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                What &quot;fibre-ready&quot; means
              </p>
              {[
                "The building has Vuma fibre cabling installed",
                "You sign up and pay Webafrica directly",
                "Typical install: 5–7 business days after signup",
                "No contract required on entry-level packages",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-light)]">
                    <svg
                      className="h-3 w-3 text-[color:var(--accent-dark)]"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm leading-6 text-[color:var(--ink-soft)]">{point}</span>
                </div>
              ))}
            </div>
          </RevealItem>

          <RevealItem>
            <VumaPricingCards />
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24" stagger>
        <RevealItem className="max-w-3xl space-y-4">
          <SectionLabel>Our locations</SectionLabel>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Six locations. One community.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            All within Far East Bank — each with its own address, the same quality, and the same easy
            access to Sandton.
          </p>
        </RevealItem>

        <div className="mt-10 -mx-5 sm:-mx-8 lg:mx-0">
          <div className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-6 sm:px-8 lg:hidden">
            {apartmentLocations.map((location) => (
              <motion.article
                key={location.badge}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group w-72 shrink-0 snap-start overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_18px_50px_rgba(28,25,23,0.07)]"
              >
                <LocationCard location={location} />
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={{ visible: { transition: { delayChildren: 0.12, staggerChildren: 0.08 } } }}
            className="hidden gap-6 mt-0 lg:grid lg:grid-cols-2 xl:grid-cols-3"
          >
            {apartmentLocations.map((location) => (
              <motion.article
                key={location.badge}
                variants={{
                  hidden: { opacity: 0, y: 28, boxShadow: "0 22px 70px rgba(28,25,23,0.08)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    boxShadow: "0 22px 70px rgba(28,25,23,0.08)",
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_22px_70px_rgba(28,25,23,0.08)]"
              >
                <LocationCard location={location} />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      <RevealSection className="bg-[color:var(--surface)]" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-24">
          <RevealItem className="max-w-2xl space-y-4">
            <SectionLabel>What&apos;s next</SectionLabel>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              More locations planned.
            </h2>
            <p className="text-base leading-8 text-[color:var(--muted)]">
              Jobe Propco is growing. If you&apos;d like to be first to know when new units open — in the
              current locations or new ones — leave your details and we&apos;ll reach out before anyone
              else.
            </p>
          </RevealItem>

          <RevealItem>
            <form
              className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_70px_rgba(28,25,23,0.08)] sm:p-8"
              onSubmit={handleSubmit(async (values) => {
                try {
                  const response = await fetch("/api/waiting-list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...values,
                      preferredPhase: "future",
                    }),
                  });
                  const payload = (await response.json()) as { message: string };

                  if (!response.ok) {
                    throw new Error(payload.message);
                  }

                  toast({
                    variant: "success",
                    title: "You're first on the list.",
                  });
                  reset();
                  setIsFutureComplete(true);
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
              <AnimatePresence mode="wait">
                {isFutureComplete ? (
                  <motion.div
                    key="future-complete"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-5 py-4 text-sm font-medium text-[color:var(--accent-dark)]"
                  >
                    ✓ We&apos;ll call you before the next release opens up.
                  </motion.div>
                ) : (
                  <motion.div key="future-fields" className="space-y-5">
                    <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                      <span>Name</span>
                      <input
                        {...register("name")}
                        className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                        placeholder="Full name"
                      />
                      <AnimatePresence initial={false}>
                        {(touchedFields.name || submitCount > 0) && errors.name ? (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-red-600"
                          >
                            {errors.name.message}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </label>

                    <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                      <span>Phone number</span>
                      <input
                        {...register("phone", {
                          setValueAs: (value) => (typeof value === "string" ? value.replace(/\s+/g, "") : value),
                        })}
                        type="tel"
                        className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                        placeholder="e.g. 071 234 5678"
                      />
                      <AnimatePresence initial={false}>
                        {(touchedFields.phone || submitCount > 0) && errors.phone ? (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-red-600"
                          >
                            {errors.phone.message}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </label>

                    <MotionButton
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Notify me first"}
                    </MotionButton>

                    <p className="text-xs leading-6 text-[color:var(--muted)]">
                      No spam. Just a call when something opens up.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection className="border-t border-[color:var(--line)] bg-[color:var(--accent-light)]" stagger>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <RevealItem>
            <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Ready to view a unit?
            </h2>
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-4">
            <Magnetic strength={0.22}>
              <ButtonLink
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-[color:var(--accent-dark)]"
              >
                WhatsApp {whatsappNumber}
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.18}>
              <ButtonLink
                href="/#availability"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)]/20 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--surface-strong)]"
              >
                See what&apos;s available
              </ButtonLink>
            </Magnetic>
          </RevealItem>
        </div>
      </RevealSection>
    </div>
  );
}
