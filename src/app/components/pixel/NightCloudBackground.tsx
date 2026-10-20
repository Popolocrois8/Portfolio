import ParallaxSky, { ParallaxSkyProps } from "./ParallaxSky";

export default function NightCloudBackground(props: ParallaxSkyProps = {}) {
  return <ParallaxSky theme="night-blue" {...props} />;
}
