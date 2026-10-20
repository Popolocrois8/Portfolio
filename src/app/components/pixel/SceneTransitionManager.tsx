"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import ParallaxSky from "./ParallaxSky";
import SpeedStreaks, { PanDirection } from "./SpeedStreaks";
import {
  SkyThemeKey,
  SKY_THEMES,
  SkyThemeConfig,
  resolveSkyTheme,
} from "./skyThemes";

interface ActiveTransition {
  from: SkyThemeKey;
  to: SkyThemeKey;
  direction: PanDirection;
}

interface SkyContextValue {
  activeTheme: SkyThemeKey;
  setTheme: (theme: SkyThemeKey, direction?: PanDirection) => void;
  availableThemes: SkyThemeConfig[];
  isTransitioning: boolean;
}

const SkyContext = createContext<SkyContextValue | null>(null);

export function useSkyTheme(): SkyContextValue {
  const context = useContext(SkyContext);
  if (!context) {
    throw new Error("useSkyTheme must be used within a SceneTransitionManager");
  }
  return context;
}

// Route to sky theme mapping for all pages
export const DEFAULT_ROUTE_SCENE_MAP: Record<string, SkyThemeKey> = {
  "/": "sunset-pink",            // Home: Clouds 4 (Afternoon Pink / Sunset)
  "/about": "day-blue",          // About: Clouds 1 (Day Blue)
  "/projects": "night-blue",     // Projects: Clouds 3 (Night Dark Blue)
  "/skills": "afternoon-orange", // Skills: Clouds 6 (Afternoon Orange)
  "/contact": "night-purple",    // Contact: Clouds 8 (Night Purple)
};

const ROUTE_ORDER = ["/", "/about", "/projects", "/skills", "/contact"];

const ALL_THEME_KEYS: SkyThemeKey[] = [
  "day-blue",
  "afternoon",
  "night-blue",
  "sunset-pink",
  "day-grey",
  "afternoon-orange",
  "afternoon-warm",
  "night-purple",
];

function getThemeForPath(path: string): SkyThemeKey {
  if (path in DEFAULT_ROUTE_SCENE_MAP) {
    return DEFAULT_ROUTE_SCENE_MAP[path];
  }
  return path.startsWith("/projects") ? "night-blue" : "sunset-pink";
}

function getPanDirection(fromPath: string, toPath: string): PanDirection {
  const fromIndex = ROUTE_ORDER.indexOf(fromPath);
  const toIndex = ROUTE_ORDER.indexOf(toPath);

  if (fromIndex !== -1 && toIndex !== -1) {
    return toIndex >= fromIndex ? "right" : "left";
  }
  return "right";
}

export default function SceneTransitionManager({
  children,
}: {
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const initialTheme = getThemeForPath(pathname);

  const [activeTheme, setActiveTheme] = useState<SkyThemeKey>(initialTheme);
  const [transition, setTransition] = useState<ActiveTransition | null>(null);

  const prevPathRef = useRef(pathname);
  const currentThemeRef = useRef(initialTheme);
  const isInitialMount = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger transition between any two themes using Option 1 (Parallax Velocity Cross-Dissolve)
  const triggerTransition = useCallback(
    (targetTheme: SkyThemeKey, direction: PanDirection = "right") => {
      const fromTheme = currentThemeRef.current;
      if (fromTheme === targetTheme) return;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      currentThemeRef.current = targetTheme;
      setActiveTheme(targetTheme);
      setTransition({
        from: fromTheme,
        to: targetTheme,
        direction,
      });

      // 550ms Option 1 transition window
      timerRef.current = setTimeout(() => {
        setTransition(null);
        timerRef.current = null;
      }, 550);
    },
    []
  );

  // Manual setTheme API for buttons, selectors, or page triggers
  const setTheme = useCallback(
    (theme: SkyThemeKey, direction: PanDirection = "right") => {
      const resolved = resolveSkyTheme(theme);
      triggerTransition(resolved, direction);
    },
    [triggerTransition]
  );

  // Route-based transition coordinator across all pages
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathRef.current = pathname;
      currentThemeRef.current = initialTheme;
      setActiveTheme(initialTheme);
      return;
    }

    const previousPath = prevPathRef.current;
    if (previousPath === pathname) return;
    prevPathRef.current = pathname;

    const targetTheme = getThemeForPath(pathname);
    const direction = getPanDirection(previousPath, pathname);

    triggerTransition(targetTheme, direction);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname, initialTheme, triggerTransition]);

  // CSS class assignment for each persistent layer
  const getLayerClass = (themeKey: SkyThemeKey): string => {
    if (!transition) {
      // Idle state
      return themeKey === activeTheme
        ? "opacity-100 z-0"
        : "opacity-0 -z-10 pointer-events-none";
    }

    // Outgoing layer: drifts 15vw and fades out smoothly without resetting clouds
    if (themeKey === transition.from) {
      return transition.direction === "right"
        ? "animate-dissolve-out-left z-0"
        : "animate-dissolve-out-right z-0";
    }

    // Incoming layer: drifts in 15vw and fades in smoothly
    if (themeKey === transition.to) {
      return transition.direction === "right"
        ? "animate-dissolve-in-from-right z-10"
        : "animate-dissolve-in-from-left z-10";
    }

    return "opacity-0 -z-10 pointer-events-none";
  };

  const contextValue: SkyContextValue = {
    activeTheme,
    setTheme,
    availableThemes: Object.values(SKY_THEMES),
    isTransitioning: Boolean(transition),
  };

  return (
    <SkyContext.Provider value={contextValue}>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden"
      >
        {/* All Sky Layers Persistently Mounted (Option 1: 15vw bleed, continuous cloud drift) */}
        {ALL_THEME_KEYS.map((themeKey) => (
          <div
            key={themeKey}
            className={`fixed inset-y-0 -left-[15vw] -right-[15vw] ${getLayerClass(
              themeKey
            )}`}
          >
            <ParallaxSky theme={themeKey} className="absolute inset-0" />
          </div>
        ))}

        {/* Anime Speed Streaks: rendered inside background system */}
        {transition && <SpeedStreaks direction={transition.direction} />}
      </div>

      {children}
    </SkyContext.Provider>
  );
}
