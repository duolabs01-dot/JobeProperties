"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MotionButton } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--surface-veil)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-baseline gap-3" transitionTypes={["nav-back"]}>
          <span className="font-display text-xl tracking-[0.18em] text-[color:var(--sand)] sm:text-2xl">
            JOBE
          </span>
          <span className="text-[10px] uppercase tracking-[0.36em] text-white/56 sm:text-xs">
            Propco
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-white/62 xl:gap-6 xl:text-xs xl:tracking-[0.28em] lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-300 hover:text-white"
              transitionTypes={item.href.startsWith("/") && !item.href.startsWith("/#") ? ["nav-forward"] : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/partners"
            transitionTypes={["nav-forward"]}
            className="rounded-full border border-transparent px-3 py-2 text-[10px] font-medium normal-case tracking-[0.02em] text-white/40 transition-all duration-300 hover:border-white/14 hover:text-white/72"
          >
            For businesses
          </Link>
        </nav>

        <MagneticButton className="hidden lg:block">
          <ButtonLink
            href="/#availability"
            className="hidden items-center justify-center rounded-full border border-[color:var(--sand)]/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--sand)] hover:border-[color:var(--sand)] hover:bg-[color:var(--sand)] hover:text-[color:var(--ink)] sm:px-5 lg:inline-flex"
          >
            See availability
          </ButtonLink>
        </MagneticButton>

        <Sheet open={open} onOpenChange={setOpen}>
          <MotionButton
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 p-3 text-white lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </MotionButton>

          <SheetContent side="right" className="flex flex-col px-6 py-6">
            <div className="flex items-start justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-3"
                transitionTypes={["nav-back"]}
              >
                <span className="font-display text-xl tracking-[0.18em] text-[color:var(--sand)] sm:text-2xl">
                  JOBE
                </span>
                <span className="text-[10px] uppercase tracking-[0.36em] text-white/56 sm:text-xs">
                  Propco
                </span>
              </Link>

              <MotionButton
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 p-3 text-white"
              >
                <X className="h-5 w-5" />
              </MotionButton>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[28px] font-medium tracking-[-0.04em] text-white/80 transition-colors duration-300 hover:text-white"
                  transitionTypes={item.href.startsWith("/") && !item.href.startsWith("/#") ? ["nav-forward"] : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 w-full border-t border-white/10 pt-6">
                <Link
                  href="/partners"
                  onClick={() => setOpen(false)}
                  className="text-[22px] font-medium tracking-[-0.03em] text-white/50 transition-colors duration-300 hover:text-white/72"
                  transitionTypes={["nav-forward"]}
                >
                  For businesses
                </Link>
              </div>
            </nav>

            <ButtonLink
              href="/#availability"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--sand)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] hover:bg-white"
            >
              See availability
            </ButtonLink>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
