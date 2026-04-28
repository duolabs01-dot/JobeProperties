"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticProps = {
  children: React.ReactNode;
  /** Strength of the magnetic pull, 0–1. 0.25 ≈ Apple/Linear feel. */
  strength?: number;
  /** Disable on touch devices (default true). */
  touchDisabled?: boolean;
  className?: string;
};

/**
 * Wraps an element so it gently follows the cursor when hovered.
 * Effect is purely transform-based (cheap), springs back on leave.
 */
export function Magnetic({
  children,
  strength = 0.25,
  touchDisabled = true,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 220, mass: 0.5 });
  const springY = useSpring(y, { damping: 18, stiffness: 220, mass: 0.5 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (
      touchDisabled &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
