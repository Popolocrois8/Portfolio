interface NightCloudBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const NIGHT_CLOUD_LAYERS = [
  {
    id: "night-sky-base",
    src: "/backgrounds/clouds-night/1.png",
    speedClass: "",
    opacity: "opacity-100",
  },
  {
    id: "night-clouds-distant",
    src: "/backgrounds/clouds-night/2.png",
    speedClass: "animate-cloud-slow",
    opacity: "opacity-90",
  },
  {
    id: "night-clouds-mid",
    src: "/backgrounds/clouds-night/3.png",
    speedClass: "animate-cloud-mid",
    opacity: "opacity-85",
  },
  {
    id: "night-clouds-fore",
    src: "/backgrounds/clouds-night/4.png",
    speedClass: "animate-cloud-fast",
    opacity: "opacity-80",
  },
] as const;

export default function NightCloudBackground({
  className = "fixed inset-0",
  style,
}: NightCloudBackgroundProps = {}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`overflow-hidden pointer-events-none select-none bg-[#070b19] ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pixelated"
        style={{ backgroundImage: `url(${NIGHT_CLOUD_LAYERS[0].src})` }}
      >
        {NIGHT_CLOUD_LAYERS.slice(1).map((layer) => (
          <div
            key={layer.id}
            className={`absolute inset-0 w-[200%] h-full flex ${layer.speedClass} ${layer.opacity}`}
          >
            {/* Seamless looping cloud strip */}
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

        {/* Night atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070b19]/25 to-[#070b19]/75" />
      </div>
    </div>
  );
}
