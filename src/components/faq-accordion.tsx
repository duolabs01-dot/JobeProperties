"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/property-data";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="border-b border-[color:var(--line)] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
            >
              <span className="text-xl font-semibold tracking-[-0.04em] text-[color:var(--ink)] sm:text-2xl">
                {item.question}
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--olive)]">
                {isOpen ? "Close" : "Open"}
              </span>
            </button>

            {isOpen ? (
              <div className="px-6 pb-6 sm:px-8">
                <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
