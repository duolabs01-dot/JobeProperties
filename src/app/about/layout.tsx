import type { Metadata } from "next";
import { apartmentHeroImage } from "@/lib/property-data";

export const metadata: Metadata = {
  title: "About Jobe Propco | Founded by Dr Nhlanhla Sithole",
  description:
    "Founded in 2016 by Dr Nhlanhla Sithole. Six phases of affordable, dignified studio accommodation in Far East Bank, Alexandra.",
  openGraph: {
    title: "About Jobe Propco | Founded by Dr Nhlanhla Sithole",
    description:
      "Founded in 2016 by Dr Nhlanhla Sithole. Six phases of affordable, dignified studio accommodation in Far East Bank, Alexandra.",
    url: "https://jobepropco.vercel.app/about",
    siteName: "Jobe Propco",
    images: [
      {
        url: apartmentHeroImage,
        width: 1024,
        height: 768,
        alt: "Exterior view of Jobe Propco apartments",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
