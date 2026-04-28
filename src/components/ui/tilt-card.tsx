"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees on each axis. Default 8°. */
  max?: number;
  /** Lift the card a few px on hover. Default true. */
  lift?: boolean;
};

/**
 * 3D tilt-on-hover wrapper. Reads cursor position relative to the element and
 * applies a perspective rotation. Auto-disables on coarse pointers (touch).
 */
export function TiltCard({ children, className, max = 8, lift = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXraw = useMotionValue(0);
  const rotateYraw = useMotionValue(0);
  const liftY = useMotionValue(0);
  const rotateX = useSpring(rotateXraw, { stiffness: 220, damping: 22, mass: 0.4 });
  const rotateY = useSpring(rotateYraw, { stiffness: 220, damping: 22, mass: 0.4 });
  const liftYSpring = useSpring(liftY, { stiffness: 220, damping: 22, mass: 0.4 });

  // Inner highlight position (cheap radial gradient that follows cursor).
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareXSpring = useSpring(glareX, { stiffness: 200, damping: 25 });
  const glareYSpring = useSpring(glareY, { stiffness: 200, damping: 25 });
  const glareBg = useTransform(
    [glareXSpring, glareYSpring],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)`,
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateYraw.set((px - 0.5) * (max * 2));
    rotateXraw.set(-(py - 0.5) * (max * 2));
    glareX.set(px * 100);
    glareY.set(py * 100);
    if (lift) liftY.set(-4);
  }

  function handleMouseLeave() {
    rotateXraw.set(0);
    rotateYraw.set(0);
    glareX.set(50);
    glareY.set(50);
    liftY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: liftYSpring,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glareBg }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
      />
    </motion.div>
  );
}
