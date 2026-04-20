import Image from "next/image";
import Link from "next/link";
import { ImageLightboxGallery } from "@/components/image-lightbox-gallery";
import {
  apartmentGalleryGroups,
  apartmentHeroImage,
  apartmentPhases,
  apartmentSpecs,
  whatsappNumber,
  whatsappUrl,
} from "@/lib/property-data";

export default function ApartmentsPage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[color:var(--ink)] text-white">
        <Image
          src={apartmentHeroImage}
          alt="Jobe Propco apartments exterior"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,15,0.92)_0%,rgba(17,24,15,0.74)_48%,rgba(17,24,15,0.38)_100%)]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--sand)]">Apartments</p>
            <h1 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
              Studio apartments built for real life.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              15–20sqm. Private kitchenette. Private bathroom. Built-in cupboards. Biometric entry. From R4,300/month.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Inside the apartments</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Open plan, practical, and easy to move into.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Browse the rooms, bathrooms, storage, balconies, and exterior before you set up a viewing.
          </p>
        </div>

        <div className="mt-10">
          <ImageLightboxGallery groups={apartmentGalleryGroups} />
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--paper)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-3 lg:gap-4">
            {apartmentSpecs.map((spec) => (
              <div
                key={spec}
                className="inline-flex items-center rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm text-[color:var(--ink)] shadow-[0_10px_30px_rgba(17,24,15,0.04)]"
              >
                {spec}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Six phases</p>
          <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Pick the phase that suits your route.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Each phase sits close to Alexandra life, with Sandton and the Gautrain still within easy reach.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {apartmentPhases.map((phase) => (
            <article
              key={phase.badge}
              className="overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_22px_70px_rgba(17,24,15,0.08)]"
            >
              <div className="relative aspect-[4/3] bg-[color:var(--stone)]">
                <Image src={phase.image} alt={phase.name} fill className="object-cover" />
              </div>
              <div className="space-y-4 p-6">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full bg-[color:var(--sand)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)]">
                    {phase.badge}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                      {phase.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{phase.address}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={phase.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white"
                  >
                    Google Maps
                  </Link>
                  <Link
                    href={phase.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[color:var(--olive)]"
                  >
                    WhatsApp us
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--ink)] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <h2 className="font-display text-4xl leading-none text-white sm:text-5xl">
            Ready to view a unit?
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--sand)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] transition duration-300 hover:bg-white"
            >
              WhatsApp {whatsappNumber}
            </Link>
            <Link
              href="/#availability"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-white/10"
            >
              See what&apos;s available
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
