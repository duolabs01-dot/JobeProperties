import { Composition } from "remotion";
import { HeroIntro } from "./HeroIntro";

// Compositions are renderable scenes. Run `npm run render:hero` to encode the
// hero intro as MP4 into /public/hero-intro.mp4.
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
    </>
  );
};
