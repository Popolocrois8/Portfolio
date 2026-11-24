"use client";

import { useSkyTheme } from "../components/pixel/SceneTransitionManager";

export default function ResumePage() {
  const { triggerPixelTransition } = useSkyTheme();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => triggerPixelTransition("/")}
          className="bento-card bento-card-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-[var(--bento-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--bento-accent)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)]"
        >
          ← Back to Home
        </button>
      </div>

      <div className="bento-card bento-card-primary flex flex-1 flex-col rounded-2xl p-3 sm:p-5">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="h-2 w-2 rounded-full bg-[var(--bento-accent)]" />
          <h1 className="text-sm font-bold tracking-tight text-[var(--bento-text)] sm:text-base">
            Here&apos;s my resume
          </h1>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-xl border border-[var(--bento-border-soft)] bg-white">
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&view=FitH"
            title="Here's my resume"
            className="h-[78vh] min-h-[620px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
