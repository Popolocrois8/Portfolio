"use client";

import { useSkyTheme } from "./SceneTransitionManager";
import { SkyThemeKey } from "./skyThemes";

export default function SkySelectorHUD() {
  const { activeTheme, setTheme, availableThemes, isTransitioning } =
    useSkyTheme();

  return (
    <div className="border-2 border-border-bright bg-bg-surface/85 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] backdrop-blur-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-none bg-accent-warm animate-pulse" />
          <span className="font-pixel text-[10px] text-text-accent">
            CHRONO DIAL // SKY SELECTOR
          </span>
        </div>
        <span className="font-pixel text-[8px] text-text-secondary">
          {availableThemes.length} TOTAL ATMOSPHERES
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {availableThemes.map((theme, index) => {
          const isActive = theme.id === activeTheme;
          const displayNum = String(index + 1).padStart(2, "0");

          return (
            <button
              key={theme.id}
              disabled={isTransitioning}
              onClick={() => {
                const currentIndex = availableThemes.findIndex(
                  (t) => t.id === activeTheme
                );
                const targetIndex = index;
                const direction = targetIndex >= currentIndex ? "right" : "left";
                setTheme(theme.id as SkyThemeKey, direction);
              }}
              className={`group flex flex-col items-start gap-1 border p-2.5 text-left transition-all ${
                isActive
                  ? "border-accent-primary bg-accent-primary/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
                  : "border-border-bright bg-bg-deep/70 hover:border-text-accent hover:bg-bg-elevated active:translate-x-[1px] active:translate-y-[1px]"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-pixel text-[8px] text-accent-warm">
                  {displayNum}
                </span>
                {isActive && (
                  <span className="h-1.5 w-1.5 bg-accent-primary animate-ping" />
                )}
              </div>
              <span className="font-pixel text-[9px] text-text-primary group-hover:text-accent-primary line-clamp-1">
                {theme.label.split("//")[1]?.trim() || theme.label}
              </span>
              <span className="text-[10px] text-text-secondary line-clamp-1">
                {theme.layerCount} Layers
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
