import Link from "next/link";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
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
        </nav>

        <Link
          href="/#availability"
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--sand)]/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--sand)] transition duration-300 hover:border-[color:var(--sand)] hover:bg-[color:var(--sand)] hover:text-[color:var(--ink)] sm:px-5"
        >
          See availability
        </Link>
      </div>
    </header>
  );
}
