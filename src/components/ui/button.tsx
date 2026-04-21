"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionButtonProps = HTMLMotionProps<"button">;

export function MotionButton({ className, children, ...props }: MotionButtonProps) {
  const isPrimary = Boolean(
    className?.includes("bg-[color:var(--accent)]") ||
      className?.includes("bg-[color:var(--ink)]") ||
      className?.includes("bg-[#25D366]"),
  );

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={isPrimary ? { y: -1 } : undefined}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn("transition duration-300", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
