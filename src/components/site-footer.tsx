import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--ink)] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="space-y-3">
          <p className="font-display text-2xl tracking-[0.18em] text-[color:var(--sand)]">JOBE</p>
          <p className="max-w-xl text-sm leading-7 text-white/66">
            Jobe Propco deserves a website that sells trust, simplifies operations, and gives a busy owner time back.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/70">
          <Link href="/portal" transitionTypes={["nav-forward"]}>
            Tenant portal
          </Link>
          <Link href="/admin" transitionTypes={["nav-forward"]}>
            Owner dashboard
          </Link>
          <Link href="/advertise" transitionTypes={["nav-forward"]}>
            Advertise on site
          </Link>
        </div>
      </div>
    </footer>
  );
}
