import {
  SkyThemeKey,
  SkyThemeAlias,
  SKY_THEMES,
  getThemeLayers,
  resolveSkyTheme,
} from "./skyThemes";

export interface ParallaxSkyProps {
  theme?: SkyThemeKey | SkyThemeAlias;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxSky({
  theme = "sunset-pink",
  className = "fixed inset-0",
  style,
}: ParallaxSkyProps) {
  const resolvedKey = resolveSkyTheme(theme);
  const themeConfig = SKY_THEMES[resolvedKey];
  const { baseSrc, driftingLayers } = getThemeLayers(resolvedKey);

  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: themeConfig.baseColor,
        ...style,
      }}
      className={`overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Base Sky Plane (Layer 1) */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pixelated"
        style={{ backgroundImage: `url(${baseSrc})` }}
      >
        {/* Looping Cloud Parallax Layers */}
        {driftingLayers.map((layer) => (
          <div
            key={layer.id}
            className={`absolute inset-0 w-[200%] h-full flex ${layer.speedClass} ${layer.opacity}`}
          >
            {/* Seamless 2-part infinite horizontal loop */}
            <div
              className="w-1/2 h-full bg-cover bg-bottom bg-repeat-x pixelated"
              style={{ backgroundImage: `url(${layer.src})` }}
            />
            <div
              className="w-1/2 h-full bg-cover bg-bottom bg-repeat-x pixelated"
              style={{ backgroundImage: `url(${layer.src})` }}
            />
          </div>
        ))}

        {/* Atmospheric Vignette & Tint Overlay */}
        <div className={`absolute inset-0 ${themeConfig.overlayClass}`} />
      </div>
    </div>
  );
}
