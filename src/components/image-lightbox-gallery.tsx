"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import type { GalleryGroup } from "@/lib/property-data";

type ImageLightboxGalleryProps = {
  groups: GalleryGroup[];
};

export function ImageLightboxGallery({ groups }: ImageLightboxGalleryProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const items = activeGroup?.items ?? [];
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeItem === null) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight" && items.length > 1) {
        setActiveIndex((current) => (current === null ? 0 : (current + 1) % items.length));
      }

      if (event.key === "ArrowLeft" && items.length > 1) {
        setActiveIndex((current) => (current === null ? 0 : (current - 1 + items.length) % items.length));
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeItem, items.length]);

  return (
    <div className="space-y-8">
      {groups.length > 1 ? (
        <div className="flex flex-wrap gap-3">
          {groups.map((group) => {
            const isActive = group.id === activeGroup.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  setActiveGroupId(group.id);
                  setActiveIndex(null);
                }}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-[color:var(--ink)] bg-[color:var(--sand)] text-[color:var(--ink)]"
                    : "border-[color:var(--line-strong)] bg-white text-[color:var(--muted)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)]"
                }`}
              >
                {group.label}
              </button>
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

      {activeItem ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(17,24,15,0.92)] px-4 py-8">
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setActiveIndex(null)}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative z-10 flex w-full max-w-6xl items-center justify-center gap-3">
            {items.length > 1 ? (
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setActiveIndex((current) => (current === null ? 0 : (current - 1 + items.length) % items.length))}
                className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18 md:inline-flex"
              >
                Prev
              </button>
            ) : null}

            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--ink)] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-5">
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition hover:bg-white/18"
              >
                Close
              </button>

              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[82vh] w-full rounded-[1.4rem] object-contain"
              />
              <p className="mt-4 px-2 text-sm leading-7 text-white/76">{activeItem.alt}</p>
            </div>

            {items.length > 1 ? (
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setActiveIndex((current) => (current === null ? 0 : (current + 1) % items.length))}
                className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18 md:inline-flex"
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
