"use client";

import { useSkyTheme } from "../pixel/SceneTransitionManager";
import { SkyThemeKey, getBentoPalette } from "../pixel/skyThemes";

interface AtmosphereOption {
  id: SkyThemeKey;
  phase: "Day" | "Afternoon" | "Sunset" | "Night";
  label: string;
  sub: string;
}

const PHASES: AtmosphereOption[] = [
  {
    id: "day-blue",
    phase: "Day",
    label: "Day Blue",
    sub: "Clear 4-layer drift",
  },
  {
    id: "afternoon-orange",
    phase: "Afternoon",
    label: "Golden Hour",
    sub: "6 rich amber planes",
  },
  {
    id: "sunset-pink",
    phase: "Sunset",
    label: "Twilight Pink",
    sub: "Vibrant horizon clouds",
  },
  {
    id: "night-blue",
    phase: "Night",
    label: "Midnight Starfield",
    sub: "Drifting nocturne layers",
  },
];

function PhaseIcon({ id, className }: { id: SkyThemeKey; className?: string }) {
  switch (id) {
    case "day-blue":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    case "afternoon-orange":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 2v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="M20 12h2" />
          <path d="m19.07 4.93-1.41 1.41" />
          <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </svg>
      );
    case "sunset-pink":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 10V3" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m16 6-4 4-4-4" />
          <path d="M16 18a4 4 0 0 0-8 0" />
        </svg>
      );
    case "night-blue":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4" />
          <path d="M21 5h-4" />
        </svg>
      );
  }
}

export default function AtmosphereCard() {
  const {
    activeTheme,
    setTheme,
    isTransitioning,
    isRevealing,
    activeTransitionKind,
    triggerRectangleReveal,
    triggerPixelTransition,
    availableThemes,
    borderMode,
    setBorderMode,
  } = useSkyTheme();

  const currentThemeConfig = availableThemes.find((t) => t.id === activeTheme);

  return (
    <div className="bento-card bento-card-secondary relative group flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors duration-700">
      {/* Subtle corner crosshairs */}
      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-40 select-none transition-colors duration-700">
        +
      </div>
      <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-40 select-none transition-colors duration-700">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-40 select-none transition-colors duration-700">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-40 select-none transition-colors duration-700">
        +
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-1 text-xs text-[var(--bento-pill-text)] transition-colors duration-700">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-[var(--bento-accent)] ${
                  isTransitioning ? "animate-ping opacity-75" : "opacity-40"
                }`}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--bento-accent)]" />
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wide uppercase">
              {isTransitioning ? "Warping Phase..." : "Atmosphere Matrix"}
            </span>
          </div>

          <span className="font-mono text-[11px] text-[var(--bento-text-muted)] transition-colors duration-700">
            {currentThemeConfig?.layerCount || 4} Clouds Active
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--bento-text)] transition-colors duration-700">
          Time & Atmosphere Phase
        </h3>
        <p className="mt-1 text-xs text-[var(--bento-text-muted)] leading-relaxed transition-colors duration-700">
          Switch the moving sky backdrop live. Drives real-time parallax velocity cross-dissolves across the entire viewport.
        </p>
      </div>

      {/* Interactive 4-Phase Grid */}
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {PHASES.map((phase) => {
          const isActive =
            activeTheme === phase.id ||
            (phase.phase === "Night" && activeTheme === "night-purple") ||
            (phase.phase === "Afternoon" && activeTheme === "afternoon");

          const phasePalette = getBentoPalette(phase.id);

          return (
            <button
              key={phase.id}
              type="button"
              disabled={isTransitioning}
              onClick={() => setTheme(phase.id)}
              aria-pressed={isActive}
              className={`relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-300 ${
                isActive
                  ? "border-[var(--bento-accent)] bg-[var(--bento-accent-soft)] ring-1 ring-[var(--bento-accent)]/40 shadow-sm"
                  : "border-[var(--bento-border-soft)] bg-[var(--bento-surface)] hover:border-[var(--bento-accent)]/60 hover:bg-[var(--bento-pill-bg)] active:scale-[0.98]"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  className={`transition-colors duration-700 ${
                    isActive
                      ? "text-[var(--bento-pill-text)]"
                      : "text-[var(--bento-text-muted)]"
                  }`}
                >
                  <PhaseIcon id={phase.id} className="h-4 w-4" />
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Dual-dot pastel preview swatch (primary + companion) */}
                  <span
                    className="inline-flex items-center -space-x-1"
                    aria-hidden="true"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-black/15"
                      style={{ backgroundColor: phasePalette.primary }}
                    />
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-black/15"
                      style={{ backgroundColor: phasePalette.secondary }}
                    />
                  </span>

                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-700 ${
                      isActive
                        ? "text-[var(--bento-pill-text)] font-semibold"
                        : "text-[var(--bento-text-muted)]"
                    }`}
                  >
                    {phase.phase}
                  </span>
                </div>
              </div>

              <div className="mt-1 w-full">
                <div className="text-xs font-semibold text-[var(--bento-text)] truncate transition-colors duration-700">
                  {phase.label}
                </div>
                <div className="font-mono text-[10px] text-[var(--bento-text-muted)] truncate transition-colors duration-700">
                  {phase.sub}
                </div>
              </div>

              {isActive && (
                <div className="absolute right-2 bottom-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--bento-accent)]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Border Style Switcher + Live Ambient Telemetry */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="bento-surface flex items-center justify-between gap-2 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-3 py-2 transition-colors duration-700">
          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--bento-text-muted)] transition-colors duration-700">
            Border Style
          </span>
          <div
            role="group"
            aria-label="Card border style"
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] p-0.5 transition-colors duration-700"
          >
            <button
              type="button"
              onClick={() => setBorderMode("soft")}
              aria-pressed={borderMode === "soft"}
              className={`rounded-md px-2 py-1 font-mono text-[10px] font-medium transition-colors duration-300 ${
                borderMode === "soft"
                  ? "bg-[var(--bento-accent)] text-[var(--bento-accent-text)] shadow-xs"
                  : "text-[var(--bento-pill-text)] hover:bg-[var(--bento-surface)]"
              }`}
            >
              Soft Pastel
            </button>
            <button
              type="button"
              onClick={() => setBorderMode("crisp")}
              aria-pressed={borderMode === "crisp"}
              className={`rounded-md px-2 py-1 font-mono text-[10px] font-medium transition-colors duration-300 ${
                borderMode === "crisp"
                  ? "bg-[var(--bento-accent)] text-[var(--bento-accent-text)] shadow-xs"
                  : "text-[var(--bento-pill-text)] hover:bg-[var(--bento-surface)]"
              }`}
            >
              Crisp Outline
            </button>
          </div>
        </div>

        <div className="bento-surface flex items-center justify-between rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-3 py-2 font-mono text-[11px] text-[var(--bento-text-muted)] transition-colors duration-700">
          <span className="flex items-center gap-1.5 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--bento-accent)] animate-pulse" />
            <span className="truncate font-medium text-[var(--bento-text)]">
              Active:{" "}
              {currentThemeConfig?.label.split("//")[1]?.trim() || activeTheme}
            </span>
          </span>
          <span className="text-[10px] text-[var(--bento-text-muted)] shrink-0">
            1.4s Soft Dissolve
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isRevealing}
            onClick={() => triggerRectangleReveal("/")}
            className="group/reveal flex items-center justify-between gap-2 rounded-xl border border-[var(--bento-accent)]/50 bg-[var(--bento-accent-soft)] px-3 py-2.5 text-left transition-all duration-300 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-accent)] hover:text-[var(--bento-accent-text)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-[var(--bento-text)] group-hover/reveal:text-[var(--bento-accent-text)] transition-colors duration-300 truncate">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M4 3v6M4 15v6" />
                <path d="M10 3v10M10 18v3" />
                <path d="M15 3v4M15 12v9" />
                <path d="M20 3v8M20 16v5" />
              </svg>
              <span className="truncate">
                {activeTransitionKind === "bars" ? "Running..." : "Opposing Bars"}
              </span>
            </span>
          </button>

          <button
            type="button"
            disabled={isRevealing}
            onClick={() => triggerPixelTransition("/")}
            className="group/pixel flex items-center justify-between gap-2 rounded-xl border border-[var(--bento-accent)]/50 bg-[var(--bento-accent-soft)] px-3 py-2.5 text-left transition-all duration-300 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-accent)] hover:text-[var(--bento-accent-text)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-[var(--bento-text)] group-hover/pixel:text-[var(--bento-accent-text)] transition-colors duration-300 truncate">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="5" height="5" />
                <rect x="10" y="3" width="5" height="5" />
                <rect x="16" y="10" width="5" height="5" />
                <rect x="3" y="16" width="5" height="5" />
                <rect x="10" y="10" width="5" height="5" />
                <rect x="16" y="16" width="5" height="5" />
              </svg>
              <span className="truncate">
                {activeTransitionKind === "pixel" ? "Running..." : "Pixel Wave"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
