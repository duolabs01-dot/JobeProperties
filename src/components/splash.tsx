"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "jobe-splash-seen";

/**
 * First-paint branded splash. Shows once per browser session — uses
 * sessionStorage so it doesn't replay on internal navigation. Skipped when
 * prefers-reduced-motion is set.
 */
export function Splash() {
  // Compute initial visibility synchronously during the first render so we
  // don't violate set-state-in-effect rules. SSR returns false (no flash);
  // the client recomputes on hydrate via useState lazy init.
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return false;
    return true;
  });

  useEffect(() => {
    if (!show) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[color:var(--surface)]"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] uppercase tracking-[0.42em] text-[color:var(--accent)]"
            >
              Alexandra · Since 2016
            </motion.p>
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl tracking-[0.18em] text-[color:var(--ink)] sm:text-6xl"
            >
              JOBE PROPCO
            </motion.p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[2px] w-16 origin-left bg-[color:var(--accent)]"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
