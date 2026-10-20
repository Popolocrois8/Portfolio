import ParallaxSky, { ParallaxSkyProps } from "./ParallaxSky";

export default function CloudBackground(props: ParallaxSkyProps = {}) {
  return <ParallaxSky theme="sunset-pink" {...props} />;
}
