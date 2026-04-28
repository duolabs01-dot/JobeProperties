"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cream-and-gold mask that sweeps across the screen on route change. Triggers
 * by listening to pathname changes — pairs cleanly with the existing View
 * Transitions API setup so route content swaps under the mask.
 */
export function PageTransition() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (pathname === prevPath.current) return;

    prevPath.current = pathname;
    // Defer to next frame so React doesn't see a synchronous setState as a
    // pure-effect violation; the animation needs to fire as a side effect of
    // the path actually changing, not be derivable from render.
    const raf = requestAnimationFrame(() => setAnimating(true));
    const timeout = setTimeout(() => setAnimating(false), 750);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {animating ? (
        <motion.div
          key={pathname}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1, originX: 0 }}
          exit={{ scaleX: 0, originX: 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] bg-[color:var(--surface)]"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(201,168,76,0.08) 0%, rgba(244,241,236,1) 30%, rgba(244,241,236,1) 70%, rgba(201,168,76,0.06) 100%)",
          }}
        />
      ) : null}
    </AnimatePresence>
  );
}
