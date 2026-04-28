"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 200 });
  const springY = useSpring(y, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: "fixed",
        top: -200,
        left: -200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(215,196,149,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "normal",
      }}
      className="hidden lg:block"
    />
  );
}
