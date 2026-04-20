"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

type AnimatedCounterProps = {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 1.4,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const count = useMotionValue(from);
  const spring = useSpring(count, {
    stiffness: 120 / Math.max(duration, 0.6),
    damping: 20,
    mass: 0.8,
  });
  const display = useTransform(
    spring,
    (value) => `${prefix}${Math.round(value).toLocaleString("en-ZA")}${suffix}`,
  );

  useEffect(() => {
    if (inView) {
      count.set(to);
    }
  }, [count, inView, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
