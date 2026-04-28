import type { Metadata } from "next";
import { guesthouseHeroImage } from "@/lib/property-data";

export const metadata: Metadata = {
  title: "Jobe Towers Guesthouse | Short Stays Near Sandton",
  description:
    "Short stay accommodation at Jobe Towers, Alexandra. Clean rooms, daily or weekly rates, minutes from Sandton.",
  openGraph: {
    title: "Jobe Towers Guesthouse | Short Stays Near Sandton",
    description:
      "Short stay accommodation at Jobe Towers, Alexandra. Clean rooms, daily or weekly rates, minutes from Sandton.",
    url: "https://jobepropco.vercel.app/guesthouse",
    siteName: "Jobe Propco",
    images: [
      {
        url: guesthouseHeroImage,
        width: 2560,
        height: 1707,
        alt: "Jobe Towers Guesthouse room",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
};

export default function GuesthouseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
