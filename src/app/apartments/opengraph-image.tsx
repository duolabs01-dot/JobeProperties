import { renderOGCard } from "@/lib/og-card";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jobe Propco apartments — 6 locations in Alexandra";

export default function OGImage() {
  return renderOGCard({
    eyebrow: "Apartments",
    title: "6 locations. Studio apartments in Far East Bank.",
    body: "From R4,300/month. No lease required. Move in this week.",
    meta: "300+ residents · 24/7 biometric security · 9km from Sandton",
  });
}
