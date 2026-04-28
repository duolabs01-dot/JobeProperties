import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

// Brand-cream background with a Bodoni-style title sequence:
// 0-30f:    eyebrow fades in
// 20-60f:   "JOBE PROPCO" letters cascade down
// 60-90f:   gold underline draws across
// 90-150f:  hold + subtle Ken Burns vibe
// 150-180f: gentle fade-out so the loop is seamless

const SURFACE = "#f4f1ec";
const INK = "#1c1917";
const GOLD = "#c9a84c";

export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const eyebrowOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" });
  const eyebrowExit = interpolate(frame, [150, 180], [1, 0], { extrapolateLeft: "clamp" });

  const underlineWidth = spring({
    frame: frame - 60,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const masterFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const letters = ["J", "O", "B", "E", " ", "P", "R", "O", "P", "C", "O"];

  return (
    <AbsoluteFill style={{ backgroundColor: SURFACE, fontFamily: "Georgia, serif" }}>
      {/* Subtle warm vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(201,168,76,0.06) 0%, rgba(244,241,236,0) 60%)",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", opacity: masterFade }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 14,
              textTransform: "uppercase",
              color: GOLD,
              opacity: Math.min(eyebrowOpacity, eyebrowExit),
              marginBottom: 32,
            }}
          >
            Alexandra · Since 2016
          </div>

          <div
            style={{
              fontSize: 200,
              fontWeight: 500,
              letterSpacing: 12,
              color: INK,
              lineHeight: 1,
              display: "flex",
              gap: 0,
              justifyContent: "center",
            }}
          >
            {letters.map((letter, i) => {
              const enterStart = 20 + i * 4;
              const y = interpolate(
                frame,
                [enterStart, enterStart + 22],
                [80, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              const opacity = interpolate(
                frame,
                [enterStart, enterStart + 22],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    transform: `translateY(${y}px)`,
                    opacity,
                    width: letter === " " ? 60 : "auto",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>

          <div
            style={{
              height: 2,
              width: 320 * underlineWidth,
              background: GOLD,
              margin: "32px auto 0",
            }}
          />

          <div
            style={{
              marginTop: 36,
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(28,25,23,0.55)",
              opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            Studios from R4,300 · 9km from Sandton
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
