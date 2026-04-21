import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { CursorGlow } from "@/components/ui/cursor-glow";
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
  title: "Jobe Propco | Studio apartments near Sandton",
  description:
    "Studio apartments in Alexandra. 9km from Sandton. From R4,300/month. No lease required. 24/7 security.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Jobe Propco | Studio apartments near Sandton",
    description: "Studio apartments in Alexandra. 9km from Sandton. From R4,300/month. No lease required. 24/7 security.",
    url: "https://jobepropco.vercel.app",
    siteName: "Jobe Propco",
    images: [
      {
        url: "https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page-1-2-scaled-e1748765134734-1024x657.jpg",
        width: 1024,
        height: 657,
        alt: "Jobe Propco studio apartments in Alexandra",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
};

const realEstateSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Jobe Propco",
  description: "Studio apartments in Alexandra, 9km from Sandton. From R4,300/month.",
  url: "https://jobepropco.vercel.app",
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
    <html lang="en" className={`${display.variable} ${sans.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
        />
      </head>
      <body className="min-h-full bg-white font-sans text-[color:var(--ink)] antialiased">
        <CursorGlow />
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
