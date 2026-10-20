export type SkyThemeKey =
  | "day-blue"
  | "afternoon"
  | "night-blue"
  | "sunset-pink"
  | "day-grey"
  | "afternoon-orange"
  | "afternoon-warm"
  | "night-purple";

// Aliases for backwards compatibility with earlier names
export type SkyThemeAlias = "sunset" | "night";

export interface SkyLayerConfig {
  id: string;
  src: string;
  speedClass: string;
  opacity: string;
}

export interface SkyThemeConfig {
  id: SkyThemeKey;
  label: string;
  description: string;
  folder: string;
  layerCount: number;
  baseColor: string;
  overlayClass: string;
}

export const SKY_THEMES: Record<SkyThemeKey, SkyThemeConfig> = {
  "day-blue": {
    id: "day-blue",
    label: "Clouds 1 // Day Blue",
    description: "Clear bright daytime sky with soft white cumulus clouds.",
    folder: "/backgrounds/clouds-1",
    layerCount: 4,
    baseColor: "#5c94fc",
    overlayClass:
      "bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/35",
  },
  "afternoon": {
    id: "afternoon",
    label: "Clouds 2 // Afternoon",
    description: "Soft afternoon gradient with lavender and twilight highlights.",
    folder: "/backgrounds/clouds-2",
    layerCount: 4,
    baseColor: "#422858",
    overlayClass:
      "bg-gradient-to-b from-transparent via-purple-900/15 to-purple-950/45",
  },
  "night-blue": {
    id: "night-blue",
    label: "Clouds 3 // Night Dark Blue",
    description: "Deep midnight indigo sky with sparkling stars and drifting nocturnal clouds.",
    folder: "/backgrounds/clouds-3",
    layerCount: 4,
    baseColor: "#070b19",
    overlayClass:
      "bg-gradient-to-b from-transparent via-[#070b19]/25 to-[#070b19]/75",
  },
  "sunset-pink": {
    id: "sunset-pink",
    label: "Clouds 4 // Afternoon Pink (Sunset)",
    description: "Warm pink and purple sunset sky with vibrant horizon clouds.",
    folder: "/backgrounds/clouds-4",
    layerCount: 4,
    baseColor: "hsl(260 40% 10%)",
    overlayClass:
      "bg-gradient-to-b from-transparent via-bg-deep/20 to-bg-deep/60",
  },
  "day-grey": {
    id: "day-grey",
    label: "Clouds 5 // Day Grey",
    description: "Overcast cinematic atmospheric sky with 5 multi-depth cloud planes.",
    folder: "/backgrounds/clouds-5",
    layerCount: 5,
    baseColor: "#293241",
    overlayClass:
      "bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950/60",
  },
  "afternoon-orange": {
    id: "afternoon-orange",
    label: "Clouds 6 // Afternoon Orange",
    description: "Golden hour sunset with 6 rich, dramatic amber and fire-orange cloud layers.",
    folder: "/backgrounds/clouds-6",
    layerCount: 6,
    baseColor: "#3d1410",
    overlayClass:
      "bg-gradient-to-b from-transparent via-amber-950/20 to-amber-950/60",
  },
  "afternoon-warm": {
    id: "afternoon-warm",
    label: "Clouds 7 // Afternoon Orange 2",
    description: "Warm crimson-orange twilight horizon.",
    folder: "/backgrounds/clouds-7",
    layerCount: 4,
    baseColor: "#3b1622",
    overlayClass:
      "bg-gradient-to-b from-transparent via-rose-950/20 to-rose-950/60",
  },
  "night-purple": {
    id: "night-purple",
    label: "Clouds 8 // Night Purple",
    description: "Mystical twilight purple night sky with 6 expansive dark cloud layers.",
    folder: "/backgrounds/clouds-8",
    layerCount: 6,
    baseColor: "#100620",
    overlayClass:
      "bg-gradient-to-b from-transparent via-[#100620]/25 to-[#100620]/75",
  },
};

// Speed classes assigned depending on how many cloud layers the theme has
const LAYER_SPEEDS_4 = [
  "animate-cloud-slow",
  "animate-cloud-mid",
  "animate-cloud-fast",
];

const LAYER_SPEEDS_5 = [
  "animate-cloud-crawl",
  "animate-cloud-slow",
  "animate-cloud-mid",
  "animate-cloud-fast",
];

const LAYER_SPEEDS_6 = [
  "animate-cloud-crawl",
  "animate-cloud-slow",
  "animate-cloud-mid",
  "animate-cloud-fast",
  "animate-cloud-vfast",
];

export function getThemeLayers(themeKey: SkyThemeKey): {
  baseSrc: string;
  driftingLayers: SkyLayerConfig[];
} {
  const theme = SKY_THEMES[themeKey];
  const cloudCount = theme.layerCount - 1; // 1 is the base sky, remainder are drifting clouds

  const speedList =
    cloudCount === 3
      ? LAYER_SPEEDS_4
      : cloudCount === 4
      ? LAYER_SPEEDS_5
      : LAYER_SPEEDS_6;

  const driftingLayers: SkyLayerConfig[] = [];
  for (let i = 2; i <= theme.layerCount; i++) {
    const speedIndex = i - 2;
    driftingLayers.push({
      id: `${theme.id}-layer-${i}`,
      src: `${theme.folder}/${i}.png`,
      speedClass: speedList[speedIndex] || "animate-cloud-mid",
      opacity: i === 2 ? "opacity-90" : i === 3 ? "opacity-85" : "opacity-80",
    });
  }

  return {
    baseSrc: `${theme.folder}/1.png`,
    driftingLayers,
  };
}

// Helper to normalize alias strings ("sunset", "night") to official keys
export function resolveSkyTheme(
  key: string | SkyThemeKey | SkyThemeAlias
): SkyThemeKey {
  if (key === "sunset") return "sunset-pink";
  if (key === "night") return "night-blue";
  if (key in SKY_THEMES) return key as SkyThemeKey;
  return "sunset-pink";
}
