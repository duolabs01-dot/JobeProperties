import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--ink)] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="space-y-3">
          <p className="font-display text-2xl tracking-[0.18em] text-[color:var(--sand)]">JOBE</p>
          <p className="max-w-xl text-sm leading-7 text-white/66">
            1191 S Africa Loop, Far East Bank, Alexandra, Sandton, 2014 · WhatsApp 072 229 3229 · Studio apartments in Alexandra. 9km from Sandton. R4,200/month.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/70">
          <Link href="/#availability">
            See availability
          </Link>
          <Link href="/portal" transitionTypes={["nav-forward"]}>
            Tenant portal
          </Link>
          <Link href="/advertise" transitionTypes={["nav-forward"]}>
            Advertise with us
          </Link>
        </div>
      </div>
    </footer>
  );
}
