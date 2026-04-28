"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const pathname = usePathname();

  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-[color:var(--accent)]"
    />
  );
}
