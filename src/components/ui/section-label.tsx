"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">{children}</p>
      <motion.span
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ transformOrigin: "left" }}
        className="block h-[2px] w-6 bg-[color:var(--accent)]"
      />
    </div>
  );
}
