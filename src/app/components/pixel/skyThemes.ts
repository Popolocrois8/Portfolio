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

export type CardBorderMode = "soft" | "crisp";

export type CardColorTuple = readonly [string, string, string, string, string];

export interface BentoPalette {
  primary: string;
  secondary: string;
  cardColors: CardColorTuple;
  surface: string;
  softBorder: string;
  crispBorder: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  pillBg: string;
  pillText: string;
  shadowColor: string;
  pageText: string;
  pageTextMuted: string;
}

const DAY_BLUE_PALETTE: BentoPalette = {
  primary: "#DCEEFF",
  secondary: "#F4F9FF",
  cardColors: ["#DCEEFF", "#DCF6FA", "#DCFAEE", "#DCE4FA", "#E6DCFA"],
  surface: "#FFFFFF",
  softBorder: "#A6CEFA",
  crispBorder: "#0F2942",
  text: "#0F2942",
  textMuted: "#466685",
  accent: "#2563EB",
  accentText: "#FFFFFF",
  accentSoft: "#DBEAFE",
  pillBg: "#EBF4FF",
  pillText: "#1E40AF",
  shadowColor: "rgba(30, 64, 175, 0.14)",
  pageText: "#0F2942",
  pageTextMuted: "#1E3A5F",
};

const AFTERNOON_ORANGE_PALETTE: BentoPalette = {
  primary: "#FFE7D1",
  secondary: "#FFF6EC",
  cardColors: ["#FFE7D1", "#FFF1D1", "#FBEAD1", "#FADCD4", "#F7F6D4"],
  surface: "#FFFDF9",
  softBorder: "#F7BE91",
  crispBorder: "#3B2012",
  text: "#3B2012",
  textMuted: "#7A533E",
  accent: "#B45309",
  accentText: "#FFFFFF",
  accentSoft: "#FFE3C2",
  pillBg: "#FFF1E3",
  pillText: "#9A3412",
  shadowColor: "rgba(180, 83, 9, 0.14)",
  pageText: "#FFF7ED",
  pageTextMuted: "#FED7AA",
};

const SUNSET_PINK_PALETTE: BentoPalette = {
  primary: "#FADCE8",
  secondary: "#FFF2F7",
  cardColors: ["#FADCE8", "#FADCFA", "#FADEDC", "#F0DCFA", "#FAE3DC"],
  surface: "#FFFFFF",
  softBorder: "#F2B1CC",
  crispBorder: "#2E162B",
  text: "#2E162B",
  textMuted: "#6E4768",
  accent: "#DB2777",
  accentText: "#FFFFFF",
  accentSoft: "#FCE7F3",
  pillBg: "#FDF2F8",
  pillText: "#9D174D",
  shadowColor: "rgba(157, 23, 77, 0.14)",
  pageText: "#FDF2F8",
  pageTextMuted: "#FBCFE8",
};

const NIGHT_BLUE_PALETTE: BentoPalette = {
  primary: "#E3E1FC",
  secondary: "#F4F3FF",
  cardColors: ["#E3E1FC", "#ECDCFA", "#DCE4FC", "#F2DCFA", "#DCEEFB"],
  surface: "#FFFFFF",
  softBorder: "#BEB9F0",
  crispBorder: "#181A38",
  text: "#181A38",
  textMuted: "#4E527D",
  accent: "#5B4CE6",
  accentText: "#FFFFFF",
  accentSoft: "#E8E6FF",
  pillBg: "#EEF2FF",
  pillText: "#3730A3",
  shadowColor: "rgba(49, 46, 129, 0.18)",
  pageText: "#EEF2FF",
  pageTextMuted: "#C7D2FE",
};

export const BENTO_PALETTES: Record<SkyThemeKey, BentoPalette> = {
  "day-blue": DAY_BLUE_PALETTE,
  "day-grey": DAY_BLUE_PALETTE,
  "afternoon-orange": AFTERNOON_ORANGE_PALETTE,
  "afternoon-warm": AFTERNOON_ORANGE_PALETTE,
  "sunset-pink": SUNSET_PINK_PALETTE,
  "afternoon": SUNSET_PINK_PALETTE,
  "night-blue": NIGHT_BLUE_PALETTE,
  "night-purple": NIGHT_BLUE_PALETTE,
};

export function getBentoPalette(theme: SkyThemeKey): BentoPalette {
  return BENTO_PALETTES[theme] ?? SUNSET_PINK_PALETTE;
}

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
