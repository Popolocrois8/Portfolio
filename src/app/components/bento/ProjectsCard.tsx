"use client";

import { useSkyTheme } from "../pixel/SceneTransitionManager";

const PIXEL_ACCENT_CELLS = [
  { x: 0, y: 0, delay: "0s", opacity: 0.22 },
  { x: 2, y: 0, delay: "0.6s", opacity: 0.35 },
  { x: 4, y: 0, delay: "1.2s", opacity: 0.18 },
  { x: 1, y: 1, delay: "0.3s", opacity: 0.32 },
  { x: 3, y: 1, delay: "0.9s", opacity: 0.26 },
  { x: 5, y: 1, delay: "1.5s", opacity: 0.2 },
  { x: 0, y: 2, delay: "1.1s", opacity: 0.16 },
  { x: 2, y: 2, delay: "0.4s", opacity: 0.28 },
  { x: 4, y: 2, delay: "0.8s", opacity: 0.34 },
];

export default function ProjectsCard() {
  const { triggerPixelTransition } = useSkyTheme();

  return (
    <button
      type="button"
      onClick={() => triggerPixelTransition("/projects")}
      className="bento-card bento-card-secondary group relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-6 text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 md:p-7"
    >
      {/* Decorative corner crosshairs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>

      {/* Top row: animated pixel/geometric backdrop behind heading + arrow */}
      <div className="relative flex w-full items-start justify-between gap-4">
        <div className="relative">
          {/* Subtle animated pixel-grid shimmer behind "My Projects" */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-2 grid grid-cols-6 gap-1.5 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          >
            {Array.from({ length: 18 }).map((_, idx) => {
              const col = idx % 6;
              const row = Math.floor(idx / 6);
              const accent = PIXEL_ACCENT_CELLS.find(
                (c) => c.x === col && c.y === row
              );
              return (
                <span
                  key={idx}
                  style={
                    accent
                      ? {
                          animationDelay: accent.delay,
                          opacity: accent.opacity,
                        }
                      : { opacity: 0.08 }
                  }
                  className={`h-2.5 w-2.5 rounded-[2px] bg-[var(--bento-accent)] transition-transform duration-500 group-hover:scale-110 ${
                    accent ? "motion-safe:animate-pulse" : ""
                  }`}
                />
              );
            })}
          </div>

          <h2 className="relative z-10 text-2xl font-bold tracking-tight text-[var(--bento-text)] transition-colors duration-700 sm:text-3xl">
            My Projects
          </h2>
        </div>

        <span
          aria-hidden="true"
          className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] text-[var(--bento-text)] transition-all duration-300 group-hover:border-[var(--bento-accent)] group-hover:bg-[var(--bento-accent)] group-hover:text-[var(--bento-accent-text)]"
        >
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
      </div>

      {/* Subtext */}
      <p className="relative z-10 mt-6 text-sm leading-relaxed text-[var(--bento-text-muted)] transition-colors duration-700">
        Come check out what I&apos;ve built.
      </p>
    </button>
  );
}
