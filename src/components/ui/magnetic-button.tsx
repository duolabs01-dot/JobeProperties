"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

type MagneticButtonProps = Omit<HTMLMotionProps<"div">, "children" | "onMouseLeave" | "onMouseMove"> & {
  children: React.ReactNode;
  strength?: number;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
};

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  onMouseLeave,
  onMouseMove,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) * strength);
    y.set((event.clientY - centerY) * strength);
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    x.set(0);
    y.set(0);
    onMouseLeave?.(event);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
