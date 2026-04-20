"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionButtonProps = HTMLMotionProps<"button">;

export function MotionButton({ className, children, ...props }: MotionButtonProps) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} className={cn("transition duration-300", className)} {...props}>
      {children}
    </motion.button>
  );
}
