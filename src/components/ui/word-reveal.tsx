"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type WordRevealProps = {
  text: string;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function WordReveal({ text, delay = 0, className, as: Tag = "span" }: WordRevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const words = text.split(" ");
  const Component = Tag as ElementType;

  return (
    <Component ref={ref} aria-label={text} className={cn("inline", className)} role="text">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.055,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Component>
  );
}
