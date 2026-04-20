import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Apartments | Jobe Propco",
  description:
    "View our studio apartments across 6 phases in Far East Bank, Alexandra. Private kitchenette, bathroom, built-in cupboards. From R4,300/month.",
  openGraph: {
    title: "Studio Apartments | Jobe Propco",
    description:
      "View our studio apartments across 6 phases in Far East Bank, Alexandra. Private kitchenette, bathroom, built-in cupboards. From R4,300/month.",
    url: "https://jobepropco.vercel.app/apartments",
    siteName: "Jobe Propco",
    images: [
      {
        url: "https://jobepropco.co.za/wp-content/uploads/2025/06/DJI_0279-2-scaled.jpg",
        width: 2560,
        height: 1707,
        alt: "Aerial view of Jobe Propco apartments in Alexandra",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
};

export default function ApartmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
