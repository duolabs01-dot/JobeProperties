import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jobe Propco — Studio apartments in Alexandra";

const SURFACE = "#f4f1ec";
const INK = "#1c1917";
const GOLD = "#c9a84c";
const MUTED = "rgba(28,25,23,0.6)";

export default function OGImage() {
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
        {/* Warm radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 70% 30%, rgba(201,168,76,0.18) 0%, rgba(244,241,236,0) 55%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, zIndex: 1 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Alexandra · Since 2016
          </div>
          <div
            style={{
              fontSize: 140,
              fontWeight: 500,
              letterSpacing: 6,
              color: INK,
              lineHeight: 1,
              display: "flex",
            }}
          >
            JOBE PROPCO
          </div>
          <div style={{ height: 3, width: 160, background: GOLD, marginTop: 8 }} />
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
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 700 }}>
            <div style={{ fontSize: 44, lineHeight: 1.1, color: INK, fontWeight: 500 }}>
              Studio apartments. 9km from Sandton. From R4,300/month.
            </div>
            <div style={{ fontSize: 22, color: MUTED, marginTop: 12 }}>
              No lease required · 24/7 security · 6 locations · 300+ residents
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
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
      </div>
    ),
    { ...size },
  );
}
