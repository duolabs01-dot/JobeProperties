import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { PageTransition } from "@/components/page-transition";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Splash } from "@/components/splash";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/toast";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "https://jobepropco.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jobe Propco | Studio apartments near Sandton",
  description:
    "Studio apartments in Alexandra. 9km from Sandton. From R4,300/month. No lease required. 24/7 security.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Jobe Propco | Studio apartments near Sandton",
    description: "Studio apartments in Alexandra. 9km from Sandton. From R4,300/month. No lease required. 24/7 security.",
    url: SITE_URL,
    siteName: "Jobe Propco",
    locale: "en_ZA",
    type: "website",
  },
};

const realEstateSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Jobe Propco",
  description: "Studio apartments in Alexandra, 9km from Sandton. From R4,300/month.",
  url: SITE_URL,
  telephone: "+27722293229",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1191 S Africa Loop, Far East Bank",
    addressLocality: "Alexandra",
    addressRegion: "Gauteng",
    postalCode: "2014",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -26.0954,
    longitude: 28.113,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
        />
      </head>
      <body className="min-h-full bg-white font-sans text-[color:var(--ink)] antialiased">
        <SmoothScroll />
        <Splash />
        <ScrollProgress />
        <CursorGlow />
        <PageTransition />
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
