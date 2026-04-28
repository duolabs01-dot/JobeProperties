"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const WA_URL =
  "https://wa.me/27722293229?text=Hi%2C+I%27m+interested+in+a+Jobe+studio+apartment.+Can+you+help%3F";

const TOOLTIP_FULL = "Reply in 2hrs ↓";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-white">
      <path d="M19.05 4.94A9.84 9.84 0 0 0 12.02 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.95L2 22l5.31-1.39a9.88 9.88 0 0 0 4.72 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.8 9.8 0 0 0-2.89-6.97ZM12.03 20.1h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.15.83.84-3.07-.2-.31a8.2 8.2 0 0 1-1.27-4.34c0-4.54 3.69-8.23 8.24-8.23 2.2 0 4.26.86 5.81 2.42a8.15 8.15 0 0 1 2.4 5.83c0 4.54-3.69 8.23-8.22 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.12-.54.13-.16.24-.62.8-.76.97-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.42-.06-.13-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.63.3-.22.24-.84.82-.84 1.99 0 1.18.86 2.32.98 2.48.12.16 1.68 2.57 4.06 3.6.57.24 1.01.39 1.36.5.57.18 1.08.15 1.48.09.45-.07 1.38-.56 1.58-1.1.2-.54.2-1.01.14-1.1-.06-.08-.22-.13-.47-.25Z" />
    </svg>
  );
}

export function StickyMobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic pull on the button
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 220, mass: 0.5 });
  const springY = useSpring(y, { damping: 18, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = requestAnimationFrame(() => setShow(window.scrollY > 120));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Typewriter effect on hover
  useEffect(() => {
    if (!hovered) {
      setTyped("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TOOLTIP_FULL.slice(0, i));
      if (i >= TOOLTIP_FULL.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [hovered]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.25);
  }

  function handleMouseLeave() {
    setHovered(false);
    x.set(0);
    y.set(0);
  }

  if (pathname.startsWith("/portal") || pathname.startsWith("/admin") || pathname === "/studio") {
    return null;
  }

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-5 right-5 z-[70]"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <motion.div style={{ x: springX, y: springY }}>
            <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
              <Link
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with Jobe Propco on WhatsApp — typically replies within 2 hours"
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <WhatsappIcon />

                <AnimatePresence>
                  {hovered ? (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[color:var(--ink)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg lg:block"
                    >
                      {typed}
                      <motion.span
                        aria-hidden="true"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="ml-0.5 inline-block w-[1px] bg-white"
                      >
                        |
                      </motion.span>
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
