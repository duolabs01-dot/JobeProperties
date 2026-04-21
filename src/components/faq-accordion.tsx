"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import type { FaqItem } from "@/lib/property-data";
import { revealItemVariants } from "@/components/reveal-section";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [openItem, setOpenItem] = useState("item-0");

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
      className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white"
    >
      <Accordion.Root type="single" collapsible value={openItem} onValueChange={(value) => setOpenItem(value)}>
      {items.map((item, index) => {
        const value = `item-${index}`;
        const isOpen = openItem === value;

        return (
          <motion.div key={item.question} variants={revealItemVariants}>
            <Accordion.Item value={value} className="border-b border-[color:var(--line)] last:border-b-0">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8">
                  <span className="text-xl font-semibold tracking-[-0.04em] text-[color:var(--ink)] sm:text-2xl">
                    {item.question}
                  </span>
                  <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-dark)]">
                    <span>{isOpen ? "Close" : "Open"}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.24 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <Accordion.Content forceMount asChild>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8">
                        <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  </Accordion.Content>
                ) : null}
              </AnimatePresence>
            </Accordion.Item>
          </motion.div>
        );
      })}
      </Accordion.Root>
    </motion.div>
  );
}
