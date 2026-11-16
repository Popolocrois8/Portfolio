"use client";

import { useSkyTheme } from "../pixel/SceneTransitionManager";

const INTEREST_TOPICS = [
  "Streaming",
  "Video Editing",
  "Photography",
  "Building Projects",
  "Machine Learning",
] as const;

export default function InterestsCard() {
  const { triggerPixelTransition } = useSkyTheme();

  return (
    <button
      type="button"
      onClick={() => triggerPixelTransition("/interests")}
      className="bento-card bento-card-primary group relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-6 text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 md:p-7"
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

      <div className="w-full">
        <div className="flex w-full items-start justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--bento-text)] transition-colors duration-700 sm:text-3xl">
            Interests
          </h2>

          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] text-[var(--bento-text)] transition-all duration-300 group-hover:border-[var(--bento-accent)] group-hover:bg-[var(--bento-accent)] group-hover:text-[var(--bento-accent-text)]"
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

        <p className="mt-2 text-sm leading-relaxed text-[var(--bento-text-muted)] transition-colors duration-700">
          Here&apos;s what I&apos;ve been working on lately.
        </p>
      </div>

      {/* Subtle topic pills */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {INTEREST_TOPICS.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-1 text-xs font-medium text-[var(--bento-pill-text)] transition-colors duration-300 group-hover:border-[var(--bento-accent)]"
          >
            {topic}
          </span>
        ))}
      </div>
    </button>
  );
}
