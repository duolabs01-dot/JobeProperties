"use client";

import { usePathname } from "next/navigation";
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCampaignPage = pathname === "/studio";

  return (
    <>
      {isCampaignPage ? null : <SiteHeader />}
      <main className={isCampaignPage ? "min-h-screen" : "min-h-screen pt-18"}>{children}</main>
      {isCampaignPage ? null : <SiteFooter />}
      {isCampaignPage ? null : <StickyMobileCta />}
      {isCampaignPage ? null : <FloatingWhatsAppButton />}
    </>
  );
}
