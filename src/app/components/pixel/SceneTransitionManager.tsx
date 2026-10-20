"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CloudBackground from "./CloudBackground";
import NightCloudBackground from "./NightCloudBackground";
import SpeedStreaks, { PanDirection } from "./SpeedStreaks";

type SceneTheme = "sunset" | "night";

interface ActiveTransition {
  from: SceneTheme;
  to: SceneTheme;
  direction: PanDirection;
}

const ROUTE_SCENE_MAP: Record<string, SceneTheme> = {
  "/": "sunset",
  "/about": "sunset",
  "/projects": "night",
  "/skills": "night",
  "/contact": "sunset",
};

const ROUTE_ORDER = ["/", "/about", "/projects", "/skills", "/contact"];

function getSceneForPath(path: string): SceneTheme {
  if (path in ROUTE_SCENE_MAP) {
    return ROUTE_SCENE_MAP[path];
  }
  return path.startsWith("/projects") ? "night" : "sunset";
}

function getPanDirection(fromPath: string, toPath: string): PanDirection {
  const fromIndex = ROUTE_ORDER.indexOf(fromPath);
  const toIndex = ROUTE_ORDER.indexOf(toPath);

  if (fromIndex !== -1 && toIndex !== -1) {
    return toIndex >= fromIndex ? "right" : "left";
  }
  return "right";
}

export default function SceneTransitionManager() {
  const pathname = usePathname();
  const initialScene = getSceneForPath(pathname);

  const [activeScene, setActiveScene] = useState<SceneTheme>(initialScene);
  const [transition, setTransition] = useState<ActiveTransition | null>(null);

  const prevPathRef = useRef(pathname);
  const currentSceneRef = useRef(initialScene);
  const isInitialMount = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip animation on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathRef.current = pathname;
      currentSceneRef.current = initialScene;
      setActiveScene(initialScene);
      return;
    }

    const previousPath = prevPathRef.current;
    if (previousPath === pathname) return;
    prevPathRef.current = pathname;

    const prevScene = currentSceneRef.current;
    const targetScene = getSceneForPath(pathname);

    // If both routes use the same background theme, no transition needed
    if (prevScene === targetScene) {
      return;
    }

    const direction = getPanDirection(previousPath, pathname);

    // Clear any active timer from rapid clicks
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Trigger transition across persistent layers
    currentSceneRef.current = targetScene;
    setActiveScene(targetScene);
    setTransition({
      from: prevScene,
      to: targetScene,
      direction,
    });

    // After animation finishes (550ms), return to idle resting state
    timerRef.current = setTimeout(() => {
      setTransition(null);
      timerRef.current = null;
    }, 550);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname]);

  // Determine the animation or resting state for each persistent layer
  const getLayerClass = (scene: SceneTheme): string => {
    if (!transition) {
      // Idle state: active scene is visible, other scenes are hidden
      return scene === activeScene
        ? "opacity-100 z-0"
        : "opacity-0 -z-10 pointer-events-none";
    }

    // During active transition:
    if (scene === transition.from) {
      // Outgoing layer: drifts and fades out smoothly without resetting its clouds
      return transition.direction === "right"
        ? "animate-dissolve-out-left z-0"
        : "animate-dissolve-out-right z-0";
    }

    if (scene === transition.to) {
      // Incoming layer: drifts in and fades in smoothly
      return transition.direction === "right"
        ? "animate-dissolve-in-from-right z-10"
        : "animate-dissolve-in-from-left z-10";
    }

    return "opacity-0 -z-10 pointer-events-none";
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden"
    >
      {/* Sunset Sky Layer (Permanently mounted: cloud drift animation never resets) */}
      <div
        className={`fixed inset-y-0 -left-[15vw] -right-[15vw] ${getLayerClass(
          "sunset"
        )}`}
      >
        <CloudBackground className="absolute inset-0" />
      </div>

      {/* Night Sky Layer (Permanently mounted: cloud drift animation never resets) */}
      <div
        className={`fixed inset-y-0 -left-[15vw] -right-[15vw] ${getLayerClass(
          "night"
        )}`}
      >
        <NightCloudBackground className="absolute inset-0" />
      </div>

      {/* Anime Speed Streaks: only rendered during active transition */}
      {transition && <SpeedStreaks direction={transition.direction} />}
    </div>
  );
}
