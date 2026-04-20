"use client";

import { FaqAccordion } from "@/components/faq-accordion";
import { RevealItem, RevealSection } from "@/components/reveal-section";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { faqPricingImage, moveInFaqs } from "@/lib/property-data";

export default function FaqPage() {
  return (
    <div className="bg-[color:var(--paper)]">
      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-20 pt-28 sm:px-8 lg:px-12 lg:py-24" stagger>
        <RevealItem className="max-w-3xl space-y-4">
          <h1 className="font-display text-5xl leading-none text-[color:var(--ink)] sm:text-6xl">
            Everything you need to know before you move in.
          </h1>
        </RevealItem>

        <RevealItem className="mt-10">
          <FaqAccordion items={moveInFaqs} />
        </RevealItem>
      </RevealSection>

      <RevealSection className="border-t border-[color:var(--line)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] p-4 shadow-[0_24px_70px_rgba(17,24,15,0.08)] sm:p-6">
            <div className="mx-auto max-w-xl">
              <ShimmerImage
                src={faqPricingImage}
                alt="Payment options and deposit breakdown"
                width={724}
                height={1024}
                wrapperClassName="rounded-[1.5rem]"
                className="h-auto w-full rounded-[1.5rem]"
              />
            </div>
            <p className="mt-5 text-center text-sm text-[color:var(--muted)]">
              Payment options and deposit breakdown
            </p>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
