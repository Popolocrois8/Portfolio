interface CloudBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const CLOUD_LAYERS = [
  {
    id: "sky-base",
    src: "/backgrounds/clouds-4/1.png",
    speedClass: "",
    opacity: "opacity-100",
  },
  {
    id: "clouds-distant",
    src: "/backgrounds/clouds-4/2.png",
    speedClass: "animate-cloud-slow",
    opacity: "opacity-90",
  },
  {
    id: "clouds-mid",
    src: "/backgrounds/clouds-4/3.png",
    speedClass: "animate-cloud-mid",
    opacity: "opacity-80",
  },
  {
    id: "clouds-fore",
    src: "/backgrounds/clouds-4/4.png",
    speedClass: "animate-cloud-fast",
    opacity: "opacity-75",
  },
] as const;

export default function CloudBackground({
  className = "fixed inset-0",
  style,
}: CloudBackgroundProps = {}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`overflow-hidden pointer-events-none select-none bg-bg-deep ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pixelated"
        style={{ backgroundImage: `url(${CLOUD_LAYERS[0].src})` }}
      >
        {CLOUD_LAYERS.slice(1).map((layer) => (
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
        {/* Sunset overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/20 to-bg-deep/60" />
      </div>
    </div>
  );
}
