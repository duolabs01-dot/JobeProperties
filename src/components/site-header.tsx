"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useScrollY } from "@/hooks/use-scroll-y";
import { MotionButton } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site-data";

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL ?? null;
const lightNavPaths = new Set(["/faq", "/partners", "/about", "/contact"]);

function TextLogo({ onLight = false }: { onLight?: boolean }) {
  return (
    <>
      <span className="font-display text-xl tracking-[0.18em] text-[color:var(--accent)] sm:text-2xl">
        JOBE
      </span>
      <span
        className={cn(
          "text-[10px] uppercase tracking-[0.36em] sm:text-xs",
          onLight ? "text-[color:var(--ink)]/72" : "text-white/72",
        )}
      >
        Propco
      </span>
    </>
  );
}

function LogoMark({ onLight = false }: { onLight?: boolean }) {
  const logoCandidates = useMemo(
    () => [LOGO_URL, "/logo.png"].filter((value): value is string => Boolean(value)),
    [],
  );
  const [logoIndex, setLogoIndex] = useState(0);
  const currentLogo = logoCandidates[logoIndex] ?? null;

  if (!currentLogo) {
    return <TextLogo onLight={onLight} />;
  }

  return (
    <Image
      src={currentLogo}
      alt="Jobe Propco"
      width={208}
      height={74}
      className={cn("h-8 w-auto object-contain", !onLight && "brightness-0 invert")}
      priority
      onError={() => {
        if (logoIndex < logoCandidates.length - 1) {
          setLogoIndex((current) => current + 1);
        } else {
          setLogoIndex(logoCandidates.length);
        }
      }}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const [isLightPage, setIsLightPage] = useState(() => lightNavPaths.has(pathname));

  useEffect(() => {
    const syncTheme = () => {
      const hasLightThemeMarker = document.querySelector('[data-nav-theme="light"]') !== null;
      setIsLightPage(hasLightThemeMarker || lightNavPaths.has(pathname));
    };

    syncTheme();

    const observer = new MutationObserver(() => {
      syncTheme();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-nav-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const useLightChrome = isLightPage || scrollY >= 20;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        useLightChrome
          ? "border-b border-[color:var(--nav-border)] bg-[color:var(--nav-bg)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="group flex shrink-0 items-center" transitionTypes={["nav-back"]}>
          <LogoMark onLight={useLightChrome} />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-4 text-[11px] uppercase tracking-[0.24em] xl:gap-6 xl:text-xs xl:tracking-[0.28em] lg:flex",
            useLightChrome ? "text-[color:var(--nav-text)]" : "text-white/80",
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors duration-300",
                useLightChrome ? "hover:text-[color:var(--nav-text-hover)]" : "hover:text-white",
              )}
              transitionTypes={item.href.startsWith("/") && !item.href.startsWith("/#") ? ["nav-forward"] : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <MagneticButton className="hidden lg:block">
            <ButtonLink
              href="/#availability"
              className={cn(
                "hidden items-center justify-center rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] sm:px-5 lg:inline-flex",
                useLightChrome
                  ? "border-[color:var(--nav-cta-border)] text-[color:var(--nav-cta-text)] hover:bg-[color:var(--nav-cta-hover-bg)] hover:text-white"
                  : "border-white/24 bg-white/8 text-white hover:border-white/38 hover:bg-white/14",
              )}
            >
              See availability
            </ButtonLink>
          </MagneticButton>

          <Link
            href="/portal/login"
            transitionTypes={["nav-forward"]}
            className={cn(
              "text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300",
              useLightChrome ? "text-[color:var(--nav-text)] opacity-60 hover:opacity-100" : "text-white/70 hover:text-white",
            )}
          >
            Tenant login
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <MotionButton
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className={cn(
              "inline-flex items-center justify-center rounded-full p-3 lg:hidden",
              useLightChrome
                ? "border border-[color:var(--line-strong)] bg-[color:var(--surface)] text-[color:var(--ink)]"
                : "border border-white/15 bg-white/10 text-white backdrop-blur-md",
            )}
          >
            <Menu className="h-6 w-6" />
          </MotionButton>

          <SheetContent side="right" className="flex flex-col px-6 py-6">
            <div className="flex items-start justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="group flex items-center"
                transitionTypes={["nav-back"]}
              >
                <LogoMark onLight />
              </Link>

              <MotionButton
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white p-3 text-[color:var(--ink)]"
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
                  className="text-[28px] font-medium tracking-[-0.04em] text-[rgba(17,24,15,0.8)] transition-colors duration-300 hover:text-[color:var(--ink)]"
                  transitionTypes={item.href.startsWith("/") && !item.href.startsWith("/#") ? ["nav-forward"] : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 w-full border-t border-[color:var(--line)] pt-6 text-center">
                <Link
                  href="/portal/login"
                  onClick={() => setOpen(false)}
                  className="text-[18px] font-medium uppercase tracking-[0.2em] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--ink)]"
                  transitionTypes={["nav-forward"]}
                >
                  Tenant login
                </Link>
              </div>
            </nav>

            <ButtonLink
              href="/#availability"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)]"
            >
              See availability
            </ButtonLink>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
