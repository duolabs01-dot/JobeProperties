import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
  title: "Jobe Propco | Elegant living, structured operations",
  description:
    "A Figma-polished redesign for Jobe Propco with a high-converting marketing site, tenant portal, owner dashboard, and structured waiting list.",
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
      </body>
    </html>
  );
}
