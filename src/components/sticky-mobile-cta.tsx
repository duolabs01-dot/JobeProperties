"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { whatsappUrl } from "@/lib/property-data";

export function StickyMobileCta() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const isMobile = window.innerWidth < 1024;
        setIsVisible(isMobile && window.scrollY > window.innerHeight);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ y: 72 }}
          animate={{ y: 0 }}
          exit={{ y: 72 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] lg:hidden"
        >
          <div className="grid h-[72px] grid-cols-2 gap-3 border-t border-white/10 bg-[color:var(--ink)] px-4 pb-[env(safe-area-inset-bottom)] pt-3">
            <ButtonLink
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M19.05 4.94A9.84 9.84 0 0 0 12.02 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.95L2 22l5.31-1.39a9.88 9.88 0 0 0 4.72 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.8 9.8 0 0 0-2.89-6.97ZM12.03 20.1h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.15.83.84-3.07-.2-.31a8.2 8.2 0 0 1-1.27-4.34c0-4.54 3.69-8.23 8.24-8.23 2.2 0 4.26.86 5.81 2.42a8.15 8.15 0 0 1 2.4 5.83c0 4.54-3.69 8.23-8.22 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.12-.54.13-.16.24-.62.8-.76.97-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.42-.06-.13-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.63.3-.22.24-.84.82-.84 1.99 0 1.18.86 2.32.98 2.48.12.16 1.68 2.57 4.06 3.6.57.24 1.01.39 1.36.5.57.18 1.08.15 1.48.09.45-.07 1.38-.56 1.58-1.1.2-.54.2-1.01.14-1.1-.06-.08-.22-.13-.47-.25Z" />
              </svg>
              WhatsApp us
            </ButtonLink>

            <ButtonLink
              href="/#availability"
              className="inline-flex h-full items-center justify-center rounded-full bg-[color:var(--sand)] px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink)]"
            >
              See availability
            </ButtonLink>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
