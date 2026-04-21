"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCampaignPage = pathname === "/studio";
  const isAdminPage = pathname.startsWith("/admin");
  const hideChrome = isCampaignPage || isAdminPage;

  return (
    <>
      {hideChrome ? null : <SiteHeader />}
      <main className={hideChrome ? "min-h-screen" : "min-h-screen pt-18"}>{children}</main>
      {hideChrome ? null : <SiteFooter />}
      {hideChrome ? null : <StickyMobileCta />}
    </>
  );
}
