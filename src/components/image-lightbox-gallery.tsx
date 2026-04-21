"use client";
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MotionButton } from "@/components/ui/button";
import type { GalleryGroup } from "@/lib/property-data";

type ImageLightboxGalleryProps = {
  groups: GalleryGroup[];
};

export function ImageLightboxGallery({ groups }: ImageLightboxGalleryProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const items = activeGroup?.items ?? [];
  const activeItem = activeIndex === null ? null : items[activeIndex];

  const goToNext = useCallback(() => {
    if (items.length <= 1) {
      return;
    }

    setDirection(1);
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % items.length));
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    if (items.length <= 1) {
      return;
    }

    setDirection(-1);
    setActiveIndex((current) => (current === null ? 0 : (current - 1 + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (activeItem === null) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight" && items.length > 1) {
        goToNext();
      }

      if (event.key === "ArrowLeft" && items.length > 1) {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeItem, goToNext, goToPrevious, items.length]);

  const imageMotionVariants = {
    center: { x: 0, opacity: 1 },
    enter: (customDirection: number) => ({
      x: customDirection > 0 ? 60 : -60,
      opacity: 0,
    }),
    exit: (customDirection: number) => ({
      x: customDirection > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-8">
      {groups.length > 1 ? (
        <div className="flex flex-wrap gap-3">
          {groups.map((group) => {
            const isActive = group.id === activeGroup.id;

            return (
              <MotionButton
                key={group.id}
                type="button"
                onClick={() => {
                  setActiveGroupId(group.id);
                  setActiveIndex(null);
                }}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                    : "border-[color:var(--line-strong)] bg-white text-[color:var(--muted)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)]"
                }`}
              >
                {group.label}
              </MotionButton>
            );
          })}
        </div>
      ) : null}

      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <button
            key={`${activeGroup.id}-${item.src}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] bg-[color:var(--stone)] text-left shadow-[0_18px_50px_rgba(17,24,15,0.08)]"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(17,24,15,0.92)] px-4 py-8"
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setActiveIndex(null)}
              className="absolute inset-0 cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex w-full max-w-6xl items-center justify-center gap-3"
            >
              {items.length > 1 ? (
                <MotionButton
                  type="button"
                  aria-label="Previous image"
                  onClick={goToPrevious}
                  className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/18 md:inline-flex"
                >
                  Prev
                </MotionButton>
              ) : null}

              <div
                className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--ink)] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-5"
                onTouchStart={(event) => {
                  touchStartX.current = event.changedTouches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  const startX = touchStartX.current;
                  const endX = event.changedTouches[0]?.clientX;

                  if (startX === null || typeof endX !== "number") {
                    return;
                  }

                  const deltaX = endX - startX;

                  if (deltaX < -50) {
                    goToNext();
                  }

                  if (deltaX > 50) {
                    goToPrevious();
                  }

                  touchStartX.current = null;
                }}
              >
                <MotionButton
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm hover:bg-white/18"
                >
                  Close
                </MotionButton>

                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.img
                    key={activeItem.src}
                    custom={direction}
                    variants={imageMotionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    src={activeItem.src}
                    alt={activeItem.alt}
                    className="max-h-[82vh] w-full rounded-[1.4rem] object-contain"
                  />
                </AnimatePresence>
                <p className="mt-4 px-2 text-sm leading-7 text-white/76">{activeItem.alt}</p>
              </div>

              {items.length > 1 ? (
                <MotionButton
                  type="button"
                  aria-label="Next image"
                  onClick={goToNext}
                  className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/18 md:inline-flex"
                >
                  Next
                </MotionButton>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
