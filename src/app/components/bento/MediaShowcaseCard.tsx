"use client";

const PLACEHOLDER_FRAMES = [
  { id: "frame-1", kind: "photo", aspect: "aspect-[4/3]" },
  { id: "frame-2", kind: "video", aspect: "aspect-video" },
  { id: "frame-3", kind: "photo", aspect: "aspect-[4/3]" },
  { id: "frame-4", kind: "video", aspect: "aspect-video" },
] as const;

function FrameIcon({ kind }: { kind: "photo" | "video" }) {
  if (kind === "video") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    );
  }

  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export default function MediaShowcaseCard() {
  return (
    <section
      aria-label="Media Showcase"
      className="bento-card bento-card-primary relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors duration-700 md:p-7"
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

      {/* Header */}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--bento-text)] transition-colors duration-700">
          Media Showcase
        </h3>
        <span className="text-xs font-medium text-[var(--bento-text-muted)] transition-colors duration-700">
          Photos &amp; Videos
        </span>
      </div>

      {/* Placeholder container structured for future dual-direction floating carousel */}
      <div
        data-carousel-container="media-showcase"
        className="mt-4 flex flex-1 flex-col justify-center gap-3 rounded-xl border border-dashed border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-4 transition-colors duration-700 sm:p-5"
      >
        {/* Lane 1: future left-to-right floating track */}
        <div
          data-carousel-lane="ltr"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {PLACEHOLDER_FRAMES.map((frame) => (
            <div
              key={`ltr-${frame.id}`}
              className={`flex ${frame.aspect} items-center justify-center rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] text-[var(--bento-text-muted)] opacity-80 transition-colors duration-700`}
            >
              <FrameIcon kind={frame.kind} />
            </div>
          ))}
        </div>

        {/* Lane 2: future right-to-left floating track */}
        <div
          data-carousel-lane="rtl"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[...PLACEHOLDER_FRAMES].reverse().map((frame) => (
            <div
              key={`rtl-${frame.id}`}
              className={`flex ${frame.aspect} items-center justify-center rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] text-[var(--bento-text-muted)] opacity-60 transition-colors duration-700`}
            >
              <FrameIcon kind={frame.kind} />
            </div>
          ))}
        </div>

        <p className="pt-1 text-center text-xs text-[var(--bento-text-muted)] transition-colors duration-700">
          Photos and video reels carousel coming soon.
        </p>
      </div>
    </section>
  );
}
