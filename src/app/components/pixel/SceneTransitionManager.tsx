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

type TransitionKind = "none" | "bars" | "pixel";

interface SkyContextValue {
  activeTheme: SkyThemeKey;
  setTheme: (theme: SkyThemeKey, direction?: string) => void;
  availableThemes: SkyThemeConfig[];
  isTransitioning: boolean;
  isRevealing: boolean;
  activeTransitionKind: TransitionKind;
  triggerRectangleReveal: (targetPath?: string) => void;
  triggerPixelTransition: (targetPath?: string) => void;
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
  "/": "sunset-pink",          // Home: Clouds 4 (Twilight Pink)
  "/about": "sunset-pink",     // About: Clouds 4 (Twilight Pink)
  "/projects": "sunset-pink",  // Projects: Clouds 4 (Twilight Pink)
  "/interests": "sunset-pink", // Interests: Clouds 4 (Twilight Pink)
  "/skills": "sunset-pink",    // Skills: Clouds 4 (Twilight Pink)
  "/contact": "sunset-pink",   // Contact: Clouds 4 (Twilight Pink)
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
  return "sunset-pink";
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

type PixelDirection = "up" | "down";

const PIXEL_CELL_DURATION = 190;
const PIXEL_WAVE_SPREAD = 460;
const PIXEL_HOLD_MS = 95;

interface PixelCellConfig {
  coverDelay: number;
  revealDelay: number;
}

interface PixelGridConfig {
  cols: number;
  rows: number;
  cells: PixelCellConfig[];
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// Codrops-style directional wave pixel matrix (bottom->top or top->bottom with soft wave edge)
function generatePixelGrid(
  width: number,
  height: number,
  direction: PixelDirection
): PixelGridConfig {
  const cols = Math.max(10, Math.min(20, Math.round(width / 92)));
  const cellWidth = width / cols;
  const rows = Math.max(7, Math.round(height / Math.max(cellWidth, 1)));
  const cells: PixelCellConfig[] = [];

  const coverPhase = Math.random() * Math.PI * 2;
  const revealPhase = Math.random() * Math.PI * 2;

  for (let r = 0; r < rows; r++) {
    const normRow =
      direction === "up"
        ? (rows - 1 - r) / Math.max(1, rows - 1)
        : r / Math.max(1, rows - 1);

    for (let c = 0; c < cols; c++) {
      const waveCover =
        Math.sin((c / Math.max(1, cols)) * Math.PI * 2 + coverPhase) * 0.08;
      const waveReveal =
        Math.sin((c / Math.max(1, cols)) * Math.PI * 2 + revealPhase) * 0.08;

      const coverT = clamp01(
        normRow * 0.78 + 0.11 + waveCover + randomBetween(-0.085, 0.085)
      );
      const revealT = clamp01(
        normRow * 0.78 + 0.11 + waveReveal + randomBetween(-0.085, 0.085)
      );

      cells.push({
        coverDelay: Math.round(coverT * PIXEL_WAVE_SPREAD),
        revealDelay: Math.round(revealT * PIXEL_WAVE_SPREAD),
      });
    }
  }

  return { cols, rows, cells };
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
  const [borderMode, setBorderMode] = useState<CardBorderMode>("crisp");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeTransitionKind, setActiveTransitionKind] =
    useState<TransitionKind>("none");
  const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>("idle");
  const [curtainColumns, setCurtainColumns] = useState<CurtainColumnConfig[]>(
    []
  );
  const [pixelGrid, setPixelGrid] = useState<PixelGridConfig>({
    cols: 12,
    rows: 8,
    cells: [],
  });
  const [pixelDirection, setPixelDirection] = useState<PixelDirection>("up");
  const [pixelMotionDuration, setPixelMotionDuration] = useState<{
    cover: number;
    reveal: number;
  }>({ cover: 650, reveal: 650 });
  const nextPixelDirRef = useRef<PixelDirection>("up");
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

  // Shared lifecycle coordinator for both page transition styles
  const runTransitionLifecycle = useCallback(
    (
      kind: Exclude<TransitionKind, "none">,
      targetPath: string,
      coverDurationMs: number,
      holdDurationMs: number,
      revealDurationMs: number
    ) => {
      clearCurtainTimers();

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const nextTheme = currentThemeRef.current;

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

      setActiveTransitionKind(kind);

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
          setActiveTransitionKind("none");
          setReducedMotionFade(false);
          setInstantSkySwitch(false);
          curtainTimersRef.current = [];
        }, 480);

        curtainTimersRef.current = [holdTimer, openTimer, doneTimer];
        return;
      }

      setReducedMotionFade(false);
      setCurtainPhase("covering");

      const coverEnd = coverDurationMs + 16;
      const holdTimer = setTimeout(() => {
        setCurtainPhase("holding");
        swapScene();
      }, coverEnd);

      const openStart = coverEnd + holdDurationMs;
      const openTimer = setTimeout(() => {
        setCurtainPhase("opening");
      }, openStart);

      const doneTimer = setTimeout(() => {
        setCurtainPhase("idle");
        setActiveTransitionKind("none");
        setInstantSkySwitch(false);
        curtainTimersRef.current = [];
      }, openStart + revealDurationMs + 24);

      curtainTimersRef.current = [holdTimer, openTimer, doneTimer];
    },
    [clearCurtainTimers, router]
  );

  // Transition A: 10-column opposing-bars Curtain (Top & Bottom per column close -> Hold -> Part Up & Down)
  const triggerRectangleReveal = useCallback(
    (targetPath = "/") => {
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

      setCurtainColumns(nextColumns);
      runTransitionLifecycle(
        "bars",
        targetPath,
        coverTotal,
        CURTAIN_HOLD_MS,
        revealTotal
      );
    },
    [runTransitionLifecycle]
  );

  // Transition B: Codrops-style Directional Pixel Wave + Parallax Page Glide
  const triggerPixelTransition = useCallback(
    (targetPath = "/") => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1280;
      const height = typeof window !== "undefined" ? window.innerHeight : 720;
      const dir = nextPixelDirRef.current;
      nextPixelDirRef.current = dir === "up" ? "down" : "up";

      const nextGrid = generatePixelGrid(width, height, dir);
      const phaseDuration = PIXEL_WAVE_SPREAD + PIXEL_CELL_DURATION;

      setPixelDirection(dir);
      setPixelMotionDuration({ cover: phaseDuration, reveal: phaseDuration });
      setPixelGrid(nextGrid);
      runTransitionLifecycle(
        "pixel",
        targetPath,
        phaseDuration,
        PIXEL_HOLD_MS,
        phaseDuration
      );
    },
    [runTransitionLifecycle]
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
    activeTransitionKind,
    triggerRectangleReveal,
    triggerPixelTransition,
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
        className={`relative flex-1 flex flex-col ${
          isRevealing ? "overflow-hidden" : ""
        }`}
      >
        <div
          key={revealKey}
          data-border-mode={borderMode}
          style={{
            ...(themeCssVars as CSSProperties),
            ...(activeTransitionKind === "pixel" && !reducedMotionFade
              ? curtainPhase === "covering"
                ? { animationDuration: `${pixelMotionDuration.cover}ms` }
                : curtainPhase === "holding"
                ? {
                    transform:
                      pixelDirection === "up"
                        ? "translate3d(0, 64px, 0)"
                        : "translate3d(0, -64px, 0)",
                    opacity: 0.35,
                  }
                : curtainPhase === "opening"
                ? { animationDuration: `${pixelMotionDuration.reveal}ms` }
                : undefined
              : undefined),
          }}
          className={`flex-1 flex flex-col will-change-[transform,opacity] ${
            activeTransitionKind === "pixel" && !reducedMotionFade
              ? curtainPhase === "covering"
                ? pixelDirection === "up"
                  ? "animate-page-out-up"
                  : "animate-page-out-down"
                : curtainPhase === "opening"
                ? pixelDirection === "up"
                  ? "animate-page-in-up"
                  : "animate-page-in-down"
                : ""
              : ""
          }`}
        >
          {children}
        </div>
      </div>

      {/* Active Page Transition Overlay (Opposing Bars OR Codrops Pixel Matrix) */}
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
        ) : activeTransitionKind === "pixel" ? (
          <div
            aria-hidden="true"
            style={{
              gridTemplateColumns: `repeat(${pixelGrid.cols}, 1fr)`,
              gridTemplateRows: `repeat(${pixelGrid.rows}, 1fr)`,
            }}
            className="fixed inset-0 z-[9999] grid overflow-hidden pointer-events-auto"
          >
            {pixelGrid.cells.map((cell, idx) => {
              const animClass =
                curtainPhase === "covering"
                  ? "animate-pixel-cell-in"
                  : curtainPhase === "opening"
                  ? "animate-pixel-cell-out"
                  : "";

              const cellStyle: CSSProperties =
                curtainPhase === "holding"
                  ? { opacity: 1, transform: "scale(1)" }
                  : {
                      animationDelay: `${
                        curtainPhase === "covering"
                          ? cell.coverDelay
                          : cell.revealDelay
                      }ms`,
                    };

              return (
                <div
                  key={idx}
                  style={cellStyle}
                  className={`h-[calc(100%+1px)] w-[calc(100%+1px)] bg-black will-change-[opacity,transform] ${animClass}`}
                />
              );
            })}
          </div>
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