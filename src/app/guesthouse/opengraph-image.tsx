import { renderOGCard } from "@/lib/og-card";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jobe Towers Guesthouse — short-stay rooms in Alexandra";

export default function OGImage() {
  return renderOGCard({
    eyebrow: "Guesthouse",
    title: "Short-stay rooms next to the conference venue.",
    body: "Daily, weekly, monthly rates. 80-delegate event venue downstairs.",
    meta: "Jobe Towers · Alexandra · WhatsApp to book",
  });
}
