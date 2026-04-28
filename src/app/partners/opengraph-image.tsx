import { renderOGCard } from "@/lib/og-card";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jobe Propco for Businesses — partner with us in Alexandra";

export default function OGImage() {
  return renderOGCard({
    eyebrow: "For businesses",
    title: "Reach 300+ Alexandra residents. Host events. Partner up.",
    body: "Advertising, conference venue, corporate accommodation, suppliers.",
    meta: "Jobe Lifestyle Corner · 80-delegate venue · Far East Bank",
  });
}
