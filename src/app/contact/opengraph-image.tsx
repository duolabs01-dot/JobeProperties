import { renderOGCard } from "@/lib/og-card";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Contact Jobe Propco — WhatsApp, email, viewings";

export default function OGImage() {
  return renderOGCard({
    eyebrow: "Contact",
    title: "WhatsApp us. We typically reply in 2 hours.",
    body: "Bookings, viewings, partnerships, support.",
    meta: "+27 72 229 3229 · Alexandra · 9km from Sandton",
  });
}
