import { renderOGCard } from "@/lib/og-card";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "About Jobe Propco — built from the community since 2016";

export default function OGImage() {
  return renderOGCard({
    eyebrow: "About",
    title: "Built from the community. Built for it.",
    body: "Founded in 2016 by Dr Nhlanhla Sithole. From one location to six.",
    meta: "Alexandra · Far East Bank · 300+ residents",
  });
}
