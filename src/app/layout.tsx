import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";
import { Toaster } from "@/components/ui/toast";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jobe Propco | Studio apartments in Alexandra",
  description:
    "Studio apartments in Alexandra, 9km from Sandton, with current availability, WhatsApp enquiries, and tenant support from your phone.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[color:var(--paper)] font-sans text-[color:var(--ink)] antialiased">
        <SiteHeader />
        <main className="min-h-screen pt-18">{children}</main>
        <SiteFooter />
        <StickyMobileCta />
        <FloatingWhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
