import { Composition } from "remotion";
import { HeroIntro } from "./HeroIntro";
import { SocialsHero } from "./SocialsHero";

// Compositions are renderable scenes.
//   npm run render:hero      → /public/hero-intro.mp4 (1920x1080, 6s)
//   npm run render:socials   → /public/socials-availability.mp4 (1080x1920, 9s)
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroIntro"
        component={HeroIntro}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="SocialsHero"
        component={SocialsHero}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ availableCount: 3, fromPrice: 4300 }}
      />
    </>
  );
};
