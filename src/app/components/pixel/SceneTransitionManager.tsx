"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  CSSProperties,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import ParallaxSky from "./ParallaxSky";
import {
  SkyThemeKey,
  SKY_THEMES,
  SkyThemeConfig,
  resolveSkyTheme,
  CardBorderMode,
  BentoPalette,
  getBentoPalette,
} from "./skyThemes";

interface SkyContextValue {
  activeTheme: SkyThemeKey;
  setTheme: (theme: SkyThemeKey, direction?: string) => void;
  availableThemes: SkyThemeConfig[];
  isTransitioning: boolean;
  isRevealing: boolean;
  triggerRectangleReveal: (targetPath?: string) => void;
  palette: BentoPalette;
  borderMode: CardBorderMode;
  setBorderMode: (mode: CardBorderMode) => void;
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

type CurtainPhase = "idle" | "covering" | "holding" | "opening";

interface CurtainColumnConfig {
  splitPct: number;
  coverTopDelay: number;
  coverBottomDelay: number;
  coverTopDuration: number;
  coverBottomDuration: number;
  revealTopDelay: number;
  revealBottomDelay: number;
  revealTopDuration: number;
  revealBottomDuration: number;
}

const CURTAIN_COL_COUNT = 10;
const CURTAIN_HOLD_MS = 160;
const REVEAL_CYCLE_THEMES: SkyThemeKey[] = [
  "day-blue",
  "afternoon-orange",
  "sunset-pink",
  "night-blue",
];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// Fresh randomized left-to-right column timing and contact height on every transition
function generateCurtainColumns(): CurtainColumnConfig[] {
  return Array.from({ length: CURTAIN_COL_COUNT }, (_, i) => {
    const splitPct = Math.round(randomBetween(16, 84));

    const coverBase = i * 48;
    const coverTopDelay = Math.max(
      0,
      Math.round(coverBase + randomBetween(-25, 65))
    );
    const coverBottomDelay = Math.max(
      0,
      Math.round(coverBase + randomBetween(-25, 65))
    );
    const coverTopDuration = Math.round(randomBetween(360, 490));
    const coverBottomDuration = Math.round(randomBetween(360, 490));

    const revealBase = i * 44;
    const revealTopDelay = Math.max(
      0,
      Math.round(revealBase + randomBetween(-20, 55))
    );
    const revealBottomDelay = Math.max(
      0,
      Math.round(revealBase + randomBetween(-20, 55))
    );
    const revealTopDuration = Math.round(randomBetween(340, 460));
    const revealBottomDuration = Math.round(randomBetween(340, 460));

    return {
      splitPct,
      coverTopDelay,
      coverBottomDelay,
      coverTopDuration,
      coverBottomDuration,
      revealTopDelay,
      revealBottomDelay,
      revealTopDuration,
      revealBottomDuration,
    };
  });
}

export default function SceneTransitionManager({
  children,
}: {
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const initialTheme = getThemeForPath(pathname);

  const [activeTheme, setActiveTheme] = useState<SkyThemeKey>(initialTheme);
  const [borderMode, setBorderMode] = useState<CardBorderMode>("soft");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>("idle");
  const [curtainColumns, setCurtainColumns] = useState<CurtainColumnConfig[]>(
    []
  );
  const [reducedMotionFade, setReducedMotionFade] = useState<boolean>(false);
  const [instantSkySwitch, setInstantSkySwitch] = useState<boolean>(false);
  const [revealKey, setRevealKey] = useState<number>(0);

  const curtainTimersRef = useRef<NodeJS.Timeout[]>([]);

  const palette = useMemo(() => getBentoPalette(activeTheme), [activeTheme]);

  const themeCssVars = useMemo(
    () =>
      ({
        "--bento-bg-primary": palette.primary,
        "--bento-bg-secondary": palette.secondary,
        "--bento-surface": palette.surface,
        "--bento-border-soft": palette.softBorder,
        "--bento-border-crisp": palette.crispBorder,
        "--bento-text": palette.text,
        "--bento-text-muted": palette.textMuted,
        "--bento-accent": palette.accent,
        "--bento-accent-text": palette.accentText,
        "--bento-accent-soft": palette.accentSoft,
        "--bento-pill-bg": palette.pillBg,
        "--bento-pill-text": palette.pillText,
        "--bento-shadow-color": palette.shadowColor,
        "--page-text": palette.pageText,
        "--page-text-muted": palette.pageTextMuted,
      }) as Record<string, string>,
    [palette]
  );

  // Sync palette variables to :root so global selection and scrollbars follow the active sky
  useEffect(() => {
    const rootStyle = document.documentElement.style;
    for (const [key, value] of Object.entries(themeCssVars)) {
      rootStyle.setProperty(key, value);
    }
  }, [themeCssVars]);

  const prevPathRef = useRef(pathname);
  const currentThemeRef = useRef(initialTheme);
  const isInitialMount = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pure slow cross-dissolve (1.4s duration, zero lateral drift, uninterrupted clouds)
  const triggerTransition = useCallback((targetTheme: SkyThemeKey) => {
    const fromTheme = currentThemeRef.current;
    if (fromTheme === targetTheme) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    currentThemeRef.current = targetTheme;
    setActiveTheme(targetTheme);
    setIsTransitioning(true);

    timerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      timerRef.current = null;
    }, 1400);
  }, []);

  // Public setTheme API for cards and buttons
  const setTheme = useCallback(
    (theme: SkyThemeKey) => {
      const resolved = resolveSkyTheme(theme);
      triggerTransition(resolved);
    },
    [triggerTransition]
  );

  // Route coordinator
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
    triggerTransition(targetTheme);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname, initialTheme, triggerTransition]);

  const clearCurtainTimers = useCallback(() => {
    for (const t of curtainTimersRef.current) {
      clearTimeout(t);
    }
    curtainTimersRef.current = [];
  }, []);

  // 10-column opposing-bars Curtain Transition (Top & Bottom per column close to varied contact points -> Black Hold -> Part back Up & Down)
  const triggerRectangleReveal = useCallback(
    (targetPath = "/") => {
      clearCurtainTimers();

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const currentIdx = REVEAL_CYCLE_THEMES.indexOf(currentThemeRef.current);
      const nextTheme =
        REVEAL_CYCLE_THEMES[(currentIdx + 1) % REVEAL_CYCLE_THEMES.length];

      const swapScene = () => {
        setInstantSkySwitch(true);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        currentThemeRef.current = nextTheme;
        setActiveTheme(nextTheme);
        setIsTransitioning(false);

        router.push(targetPath);
        setRevealKey((k) => k + 1);
      };

      if (prefersReducedMotion) {
        setReducedMotionFade(true);
        setCurtainPhase("covering");

        const holdTimer = setTimeout(() => {
          setCurtainPhase("holding");
          swapScene();
        }, 190);

        const openTimer = setTimeout(() => {
          setCurtainPhase("opening");
        }, 290);

        const doneTimer = setTimeout(() => {
          setCurtainPhase("idle");
          setReducedMotionFade(false);
          setInstantSkySwitch(false);
          curtainTimersRef.current = [];
        }, 480);

        curtainTimersRef.current = [holdTimer, openTimer, doneTimer];
        return;
      }

      const nextColumns = generateCurtainColumns();
      const coverTotal = Math.max(
        ...nextColumns.map((c) =>
          Math.max(
            c.coverTopDelay + c.coverTopDuration,
            c.coverBottomDelay + c.coverBottomDuration
          )
        )
      );
      const revealTotal = Math.max(
        ...nextColumns.map((c) =>
          Math.max(
            c.revealTopDelay + c.revealTopDuration,
            c.revealBottomDelay + c.revealBottomDuration
          )
        )
      );

      setReducedMotionFade(false);
      setCurtainColumns(nextColumns);

      // Phase 1: Both top & bottom bars per column glide inward (left-to-right + random jitter)
      setCurtainPhase("covering");

      // Phase 2: Hold solid pitch-black screen while page redirects & sky swaps underneath
      const coverEnd = coverTotal + 16;
      const holdTimer = setTimeout(() => {
        setCurtainPhase("holding");
        swapScene();
      }, coverEnd);

      // Phase 3: Top bars retract back UP and bottom bars retract back DOWN (left-to-right + jitter)
      const openStart = coverEnd + CURTAIN_HOLD_MS;
      const openTimer = setTimeout(() => {
        setCurtainPhase("opening");
      }, openStart);

      // Phase 4: Clean up curtain and restore normal slow sky cross-dissolve
      const doneTimer = setTimeout(() => {
        setCurtainPhase("idle");
        setInstantSkySwitch(false);
        curtainTimersRef.current = [];
      }, openStart + revealTotal + 24);

      curtainTimersRef.current = [holdTimer, openTimer, doneTimer];
    },
    [clearCurtainTimers, router]
  );

  useEffect(() => {
    return () => {
      clearCurtainTimers();
    };
  }, [clearCurtainTimers]);

  const isRevealing = curtainPhase !== "idle";

  const contextValue: SkyContextValue = {
    activeTheme,
    setTheme,
    availableThemes: Object.values(SKY_THEMES),
    isTransitioning,
    isRevealing,
    triggerRectangleReveal,
    palette,
    borderMode,
    setBorderMode,
  };

  return (
    <SkyContext.Provider value={contextValue}>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden"
      >
        {/* All Sky Layers Persistently Mounted: Pure Slow Cross-Dissolve (snaps instantly while curtain is black) */}
        {ALL_THEME_KEYS.map((themeKey) => {
          const isActive = themeKey === activeTheme;

          return (
            <div
              key={themeKey}
              className={`fixed inset-0 ${
                instantSkySwitch
                  ? "transition-none"
                  : "transition-opacity duration-[1400ms] ease-in-out"
              } will-change-[opacity] ${
                isActive
                  ? "opacity-100 z-0"
                  : "opacity-0 -z-10 pointer-events-none"
              }`}
            >
              <ParallaxSky theme={themeKey} className="absolute inset-0" />
            </div>
          );
        })}
      </div>

      <div
        key={revealKey}
        data-border-mode={borderMode}
        style={themeCssVars as CSSProperties}
        className="flex-1 flex flex-col"
      >
        {children}
      </div>

      {/* 10-Column Opposing-Bars Curtain Overlay */}
      {curtainPhase !== "idle" &&
        (reducedMotionFade ? (
          <div
            aria-hidden="true"
            className={`fixed inset-0 z-[9999] bg-black pointer-events-auto ${
              curtainPhase === "covering"
                ? "animate-curtain-fade-in"
                : curtainPhase === "opening"
                ? "animate-curtain-fade-out"
                : "opacity-100"
            }`}
          />
        ) : (
          <div
            aria-hidden="true"
            className="fixed inset-0 z-[9999] grid grid-cols-10 overflow-hidden pointer-events-auto"
          >
            {curtainColumns.map((col, i) => {
              const topClass =
                curtainPhase === "covering"
                  ? "animate-rect-drop-in"
                  : curtainPhase === "opening"
                  ? "animate-rect-lift-out"
                  : "";

              const bottomClass =
                curtainPhase === "covering"
                  ? "animate-rect-rise-in"
                  : curtainPhase === "opening"
                  ? "animate-rect-drop-out"
                  : "";

              const topStyle: CSSProperties = {
                height: `calc(${col.splitPct}% + 3px)`,
                ...(curtainPhase === "holding"
                  ? { transform: "translate3d(0, 0%, 0)" }
                  : curtainPhase === "covering"
                  ? {
                      animationDelay: `${col.coverTopDelay}ms`,
                      animationDuration: `${col.coverTopDuration}ms`,
                    }
                  : {
                      animationDelay: `${col.revealTopDelay}ms`,
                      animationDuration: `${col.revealTopDuration}ms`,
                    }),
              };

              const bottomStyle: CSSProperties = {
                height: `calc(${100 - col.splitPct}% + 3px)`,
                ...(curtainPhase === "holding"
                  ? { transform: "translate3d(0, 0%, 0)" }
                  : curtainPhase === "covering"
                  ? {
                      animationDelay: `${col.coverBottomDelay}ms`,
                      animationDuration: `${col.coverBottomDuration}ms`,
                    }
                  : {
                      animationDelay: `${col.revealBottomDelay}ms`,
                      animationDuration: `${col.revealBottomDuration}ms`,
                    }),
              };

              return (
                <div key={i} className="relative h-full">
                  {/* Top bar: glides down to contact height, retracts back up */}
                  <div
                    style={topStyle}
                    className={`absolute top-0 -left-[1px] -right-[1px] bg-black will-change-transform ${topClass}`}
                  />
                  {/* Bottom bar: glides up to contact height, retracts back down */}
                  <div
                    style={bottomStyle}
                    className={`absolute bottom-0 -left-[1px] -right-[1px] bg-black will-change-transform ${bottomClass}`}
                  />
                </div>
              );
            })}
          </div>
        ))}
    </SkyContext.Provider>
  );
}