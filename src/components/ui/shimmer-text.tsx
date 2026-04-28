"use client";

import { motion } from "framer-motion";

type ShimmerTextProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between shimmer passes. */
  interval?: number;
  /** Width of the gold band relative to the text, in viewport %. */
  bandSize?: number;
};

/**
 * A diagonal gold light-band that grazes across the text every `interval`s.
 * Built with bg-clip-text so it tints the actual character glyphs. Honours
 * prefers-reduced-motion automatically (motion config from framer-motion).
 */
export function ShimmerText({
  children,
  className,
  interval = 8,
  bandSize = 30,
}: ShimmerTextProps) {
  return (
    <motion.span
      animate={{
        backgroundPositionX: ["-150%", "150%"],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        repeatDelay: Math.max(0, interval - 2.4),
        ease: "easeInOut",
      }}
      style={{
        backgroundImage: `linear-gradient(105deg, currentColor 0%, currentColor 40%, #f5e6b8 50%, currentColor 60%, currentColor 100%)`,
        backgroundSize: `${100 + bandSize * 2}% 100%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "currentColor",
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
