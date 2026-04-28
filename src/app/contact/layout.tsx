import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Jobe Propco | WhatsApp 072 229 3229",
  description:
    "Get in touch with Jobe Propco. WhatsApp us on 072 229 3229 or fill in the enquiry form. We respond fast.",
  openGraph: {
    title: "Contact Jobe Propco | WhatsApp 072 229 3229",
    description:
      "Get in touch with Jobe Propco. WhatsApp us on 072 229 3229 or fill in the enquiry form. We respond fast.",
    url: "https://jobepropco.vercel.app/contact",
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
