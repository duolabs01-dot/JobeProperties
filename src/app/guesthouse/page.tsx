"use client";

import Image from "next/image";
import { ImageLightboxGallery } from "@/components/image-lightbox-gallery";
import { RevealItem, RevealSection } from "@/components/reveal-section";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import {
  guesthouseGalleryGroups,
  guesthouseHeroImage,
  guesthousePricingImage,
  whatsappNumber,
  whatsappUrl,
} from "@/lib/property-data";

export default function GuesthousePage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[color:var(--ink)] text-white">
        <Image
          src={guesthouseHeroImage}
          alt="Jobe Towers Guesthouse room"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,25,23,0.94)_0%,rgba(28,25,23,0.76)_48%,rgba(28,25,23,0.42)_100%)]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent)]">Guesthouse</p>
            <h1 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
              Jobe Towers Guesthouse.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              Short stays, clean rooms, and everything you need within walking distance of Sandton.
            </p>
          </div>
        </div>
      </section>

      <RevealSection className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24" stagger>
        <RevealItem className="space-y-5">
          <div className="mx-auto max-w-sm rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-4">
            <ShimmerImage
              src={guesthousePricingImage}
              alt="Jobe Towers Guesthouse pricing sheet"
              width={724}
              height={1024}
              wrapperClassName="rounded-[1.5rem] border border-[color:var(--line)]"
              className="h-auto w-full rounded-[1.5rem]"
            />
          </div>
          <p className="text-center text-sm text-[color:var(--muted)]">Current room rates.</p>
          <div className="flex justify-center">
            <ButtonLink
              href="https://wa.me/27722293229?text=Hi%2C+I%27d+like+to+book+the+guesthouse.+Can+you+share+availability%3F"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-[color:var(--accent-dark)]"
            >
              WhatsApp to book
            </ButtonLink>
          </div>
        </RevealItem>

        <RevealItem className="flex flex-col justify-center space-y-5">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            See the rates, then book straight away.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            If the dates work for you, WhatsApp is the fastest way to lock in your stay.
          </p>
        </RevealItem>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-12 lg:pb-24" stagger>
        <RevealItem className="max-w-3xl space-y-4">
          <SectionLabel>Photo gallery</SectionLabel>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Rooms, bathrooms, and shared spaces before you arrive.
          </h2>
        </RevealItem>

        <RevealItem className="mt-10">
          <ImageLightboxGallery groups={guesthouseGalleryGroups} />
        </RevealItem>
      </RevealSection>

      <RevealSection className="bg-[color:var(--surface)]" stagger>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24">
          <RevealItem className="space-y-5">
            <SectionLabel>Staying short, thinking long?</SectionLabel>
            <h2 className="max-w-2xl font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Most of our long-term tenants started with a short stay.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              If you&apos;re new to the area, job-hunting, or still deciding — a week or two at the guesthouse is a good way to see what the neighbourhood is actually like. And if you like it, the apartments are right here.
            </p>
            <div>
              <ButtonLink
                href="/#availability"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
              >
                See apartment availability →
              </ButtonLink>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="grid gap-4 rounded-[2rem] bg-[color:var(--ink)] p-6 text-[color:var(--accent)] shadow-[0_28px_80px_rgba(17,24,15,0.18)] sm:grid-cols-3 sm:p-8">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/4 px-5 py-6">
                <p className="font-display text-3xl leading-none sm:text-[2.3rem]">From R4,300 / month</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/65">Long-term apartments</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/4 px-5 py-6">
                <p className="font-display text-3xl leading-none sm:text-[2.3rem]">No lease required</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/65">Move in, move on when you need to</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/4 px-5 py-6">
                <p className="font-display text-3xl leading-none sm:text-[2.3rem]">Same precinct</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/65">Walk from guesthouse to apartment viewing</p>
              </div>
            </div>
          </RevealItem>
        </div>
      </RevealSection>

      <RevealSection className="border-t border-[color:var(--line)] bg-[color:var(--ink)] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <h2 className="font-display text-4xl leading-none text-white sm:text-5xl">
            Book your stay.
          </h2>

          <ButtonLink
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-[color:var(--accent-dark)]"
          >
            WhatsApp to book → {whatsappNumber}
          </ButtonLink>
        </div>
      </RevealSection>
    </div>
  );
}
