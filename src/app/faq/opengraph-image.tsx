import { renderOGCard } from "@/lib/og-card";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jobe Propco FAQ — pricing, leases, parking, fibre";

export default function OGImage() {
  return renderOGCard({
    eyebrow: "FAQ",
    title: "Everything you need to know before moving in.",
    body: "Pricing plans, deposits, leases, parking, fibre setup — all in one place.",
    meta: "Studios from R4,300 · No lease required",
  });
}
