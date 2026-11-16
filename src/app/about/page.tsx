"use client";

import { useSkyTheme } from "../components/pixel/SceneTransitionManager";

export default function AboutPage() {
  const { triggerPixelTransition } = useSkyTheme();

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => triggerPixelTransition("/")}
        className="bento-card bento-card-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-[var(--bento-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--bento-accent)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)]"
      >
        ← Back to Home
      </button>
    </div>
  );
}
