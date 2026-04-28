"use client";

import { motion } from "framer-motion";

type LivePulseProps = {
  /** Tailwind color class for the inner dot. Default green. */
  dotClassName?: string;
  /** Override the ring color via inline rgb if you need brand match. */
  ringColor?: string;
  className?: string;
};

/**
 * A tiny "live" indicator: solid dot + outward ping. Used next to availability
 * counts and "online" copy. Pure CSS / motion — no DOM observers.
 */
export function LivePulse({
  dotClassName = "bg-[#25D366]",
  ringColor = "rgba(37,211,102,0.45)",
  className,
}: LivePulseProps) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className ?? ""}`}>
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 2.4, 2.4], opacity: [0.6, 0, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: ringColor }}
      />
      <span className={`relative inline-block h-2 w-2 rounded-full ${dotClassName}`} />
    </span>
  );
}
