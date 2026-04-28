"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

type DigitFlipProps = {
  to: number;
  /** Optional starting value (defaults to 0). */
  from?: number;
  /** String appended (e.g. "+", "km", "%"). */
  suffix?: string;
  /** String prepended (e.g. "R"). */
  prefix?: string;
  /** Total animation duration in ms. */
  duration?: number;
  className?: string;
};

/**
 * Mechanical digit-flip counter — each digit slides in from below and the old
 * one falls out, like a Linear/Stripe pricing card. Triggers on first scroll
 * into view, then animates from `from` (or 0) up to `to`.
 */
export function DigitFlip({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
}: DigitFlipProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const delta = to - from;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + delta * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, from, to, duration]);

  const display = `${prefix}${value.toLocaleString("en-ZA")}${suffix}`;
  // Split into individual chars for per-digit animation.
  const chars = display.split("");

  return (
    <span ref={ref} className={className}>
      <span className="relative inline-flex items-baseline overflow-hidden align-baseline tabular-nums">
        {chars.map((char, i) => (
          <DigitSlot key={`${i}-${chars.length}`} char={char} />
        ))}
      </span>
    </span>
  );
}

function DigitSlot({ char }: { char: string }) {
  // Non-numeric chars (commas, "+", etc.) don't animate.
  const isDigit = /\d/.test(char);
  if (!isDigit) {
    return <span className="inline-block">{char}</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden">
      {/* Width-keeper: invisible char so layout doesn't reflow per-flip. */}
      <span className="invisible inline-block">0</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 inline-flex items-baseline justify-center"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
