import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Vertical 9:16 social-post intro: 15s, 30fps. Designed for Instagram Reels,
// TikTok, WhatsApp Status. Pull live availability count via env at render
// time (see remotion render --props).

const SURFACE = "#f4f1ec";
const INK = "#1c1917";
const GOLD = "#c9a84c";
const ACCENT = "#c8673a";

type SocialsHeroProps = {
  availableCount?: number;
  fromPrice?: number;
};

export const SocialsHero: React.FC<SocialsHeroProps> = ({
  availableCount = 3,
  fromPrice = 4300,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 40], [60, 0], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });

  const countScale = spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 100 } });
  const priceScale = spring({ frame: frame - 140, fps, config: { damping: 12, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: SURFACE, fontFamily: "Georgia, serif" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 25%, rgba(201,168,76,0.15) 0%, rgba(244,241,236,0) 55%)",
        }}
      />

      <AbsoluteFill style={{ padding: 80, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              fontSize: 32,
              letterSpacing: 12,
              textTransform: "uppercase",
              color: GOLD,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            Alexandra · Since 2016
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 500,
              letterSpacing: 6,
              color: INK,
              lineHeight: 1,
              marginTop: 32,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            JOBE
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 500,
              letterSpacing: 6,
              color: INK,
              lineHeight: 1,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            PROPCO
          </div>
          <div
            style={{
              height: 4,
              width: 240,
              background: GOLD,
              marginTop: 32,
              opacity: titleOpacity,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
          <div style={{ transform: `scale(${countScale})`, transformOrigin: "left" }}>
            <div style={{ fontSize: 36, color: "rgba(28,25,23,0.55)", letterSpacing: 6, textTransform: "uppercase" }}>
              Studios available
            </div>
            <div style={{ fontSize: 280, fontWeight: 700, color: ACCENT, lineHeight: 1, marginTop: 12 }}>
              {availableCount}
            </div>
          </div>

          <div style={{ transform: `scale(${priceScale})`, transformOrigin: "left" }}>
            <div style={{ fontSize: 36, color: "rgba(28,25,23,0.55)", letterSpacing: 6, textTransform: "uppercase" }}>
              From
            </div>
            <div style={{ fontSize: 200, fontWeight: 600, color: INK, lineHeight: 1, marginTop: 8 }}>
              R{fromPrice.toLocaleString("en-ZA")}
            </div>
            <div style={{ fontSize: 40, color: "rgba(28,25,23,0.55)", marginTop: 8 }}>per month</div>
          </div>

          <div
            style={{
              padding: "32px 48px",
              borderRadius: 999,
              background: ACCENT,
              color: "white",
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              alignSelf: "flex-start",
              opacity: ctaOpacity,
            }}
          >
            jobepropco.co.za
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
