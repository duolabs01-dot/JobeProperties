import { ImageResponse } from "next/og";

const SURFACE = "#f4f1ec";
const INK = "#1c1917";
const GOLD = "#c9a84c";
const MUTED = "rgba(28,25,23,0.6)";

type OGCardProps = {
  eyebrow: string;
  title: string;
  body?: string;
  meta?: string;
};

/**
 * Branded OG card factory. Returns an ImageResponse with the Jobe Propco
 * cream-and-gold layout. Used by per-page opengraph-image.tsx routes.
 */
export function renderOGCard({ eyebrow, title, body, meta }: OGCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: SURFACE,
          padding: 80,
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 70% 30%, rgba(201,168,76,0.18) 0%, rgba(244,241,236,0) 55%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10, zIndex: 1 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Jobe Propco · {eyebrow}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: 0,
              color: INK,
              lineHeight: 1.05,
              display: "flex",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ height: 3, width: 120, background: GOLD, marginTop: 16 }} />
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 800 }}>
            {body ? (
              <div style={{ fontSize: 28, lineHeight: 1.35, color: INK }}>{body}</div>
            ) : null}
            {meta ? (
              <div style={{ fontSize: 20, color: MUTED, marginTop: 8 }}>{meta}</div>
            ) : null}
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            jobepropco.co.za
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
