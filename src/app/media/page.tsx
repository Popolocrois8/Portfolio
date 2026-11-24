"use client";

import { useState } from "react";
import { useSkyTheme } from "../components/pixel/SceneTransitionManager";

type MediaKind = "photo" | "video";
type MediaFilter = "all" | MediaKind;

interface ArchiveMediaEntry {
  id: string;
  title: string;
  caption: string;
  kind: MediaKind;
  src: string;
  poster?: string;
  spanClass: string;
  aspectClass: string;
}

/**
 * Placeholder media archive items matching the homepage 3D portal.
 * Swap `src` (and optional `poster`) with Cloudflare R2 bucket URLs when ready
 * (e.g., `https://<bucket>.r2.dev/media/...`).
 */
const ARCHIVE_MEDIA: ArchiveMediaEntry[] = [
  {
    id: "golden-horizon",
    title: "Golden Hour Ridge",
    caption: "Warm evening haze drifting across alpine peaks.",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80",
    spanClass: "md:col-span-7",
    aspectClass: "aspect-[16/10]",
  },
  {
    id: "sintel-reel",
    title: "Sintel Motion Clip",
    caption: "Cinematic animated reel excerpt for motion playback testing.",
    kind: "video",
    src: "https://mdn.github.io/shared-assets/videos/sintel-short.mp4",
    spanClass: "md:col-span-5",
    aspectClass: "aspect-video",
  },
  {
    id: "camera-study",
    title: "Studio Lens Study",
    caption: "Low-key optical framing and shallow depth of field.",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1000&q=80",
    spanClass: "md:col-span-4",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "flower-timelapse",
    title: "Petal Bloom Timelapse",
    caption: "Short atmospheric loop for seamless background playback.",
    kind: "video",
    src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
    spanClass: "md:col-span-4",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "dusk-surf",
    title: "Twilight Tide",
    caption: "Long-exposure ocean swell beneath indigo clouds.",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=1000&q=80",
    spanClass: "md:col-span-4",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "alpine-night",
    title: "Midnight Summit",
    caption: "Crisp night exposure under clear mountain stars.",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
    spanClass: "md:col-span-5",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "tears-of-steel-reel",
    title: "Tears of Steel Reel",
    caption: "Cinematic sci-fi clip demonstrating 16:9 looping playback.",
    kind: "video",
    src: "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4",
    poster:
      "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg",
    spanClass: "md:col-span-7",
    aspectClass: "aspect-video",
  },
  {
    id: "coastal-valley",
    title: "Valley Overlook",
    caption: "Wide daylight frame looking toward distant cliffs.",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80",
    spanClass: "md:col-span-12",
    aspectClass: "aspect-[21/9]",
  },
];

const FILTER_OPTIONS: { id: MediaFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
];

export default function MediaPage() {
  const { triggerPixelTransition } = useSkyTheme();
  const [activeFilter, setActiveFilter] = useState<MediaFilter>("all");

  const visibleItems =
    activeFilter === "all"
      ? ARCHIVE_MEDIA
      : ARCHIVE_MEDIA.filter((item) => item.kind === activeFilter);

  const counts: Record<MediaFilter, number> = {
    all: ARCHIVE_MEDIA.length,
    photo: ARCHIVE_MEDIA.filter((item) => item.kind === "photo").length,
    video: ARCHIVE_MEDIA.filter((item) => item.kind === "video").length,
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => triggerPixelTransition("/")}
          className="bento-card bento-card-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-[var(--bento-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--bento-accent)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] motion-reduce:transition-colors motion-reduce:hover:translate-y-0"
        >
          ← Back to Home
        </button>
      </div>

      <section
        aria-labelledby="media-archive-heading"
        className="bento-card bento-card-primary relative overflow-hidden rounded-2xl p-6 transition-colors duration-700 sm:p-8"
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

        {/* Archive Header & Filter Tabs */}
        <div className="flex flex-col gap-4 border-b border-[var(--bento-border-soft)] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1
              id="media-archive-heading"
              className="text-2xl font-bold tracking-tight text-[var(--bento-text)] transition-colors duration-700 sm:text-3xl"
            >
              Media Archive
            </h1>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-[var(--bento-text-muted)] transition-colors duration-700">
              Curated photography stills and video motion reels. Placeholder
              assets below are structured to swap cleanly with Cloudflare R2
              links.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter media archive by format"
            className="bento-surface flex w-fit items-center gap-1 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-1 transition-colors duration-700"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(option.id)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] ${
                    isSelected
                      ? "bg-[var(--bento-accent)] text-[var(--bento-accent-text)] shadow-sm"
                      : "text-[var(--bento-text-muted)] hover:bg-[var(--bento-accent-soft)] hover:text-[var(--bento-text)]"
                  }`}
                >
                  {option.label} ({counts[option.id]})
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Gallery */}
        <div
          role="tabpanel"
          aria-label={`${activeFilter} media items`}
          className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-12"
        >
          {visibleItems.map((item) => {
            const layoutSpan =
              activeFilter === "all" ? item.spanClass : "md:col-span-6";
            const frameAspect =
              activeFilter === "all" ? item.aspectClass : "aspect-video";

            return (
              <figure
                key={item.id}
                className={`group/tile flex flex-col overflow-hidden rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] shadow-[0_8px_22px_-6px_var(--bento-shadow-color)] transition-colors duration-300 hover:border-[var(--bento-accent)] ${layoutSpan}`}
              >
                <div
                  className={`relative w-full grow overflow-hidden bg-[var(--bento-bg-secondary)] ${frameAspect}`}
                >
                  {item.kind === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/tile:scale-100"
                    />
                  )}
                </div>

                <figcaption className="flex items-start justify-between gap-3 border-t border-[var(--bento-border-soft)] px-4 py-3.5">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-[var(--bento-text)]">
                      {item.title}
                    </h2>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--bento-text-muted)]">
                      {item.caption}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--bento-pill-text)]">
                    {item.kind === "video" ? "Video" : "Photo"}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Cloudflare R2 storage note */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--bento-border-soft)] pt-4 text-xs text-[var(--bento-text-muted)]">
          <span>
            Ready for custom stills &amp; 4K reels hosted via Cloudflare R2.
          </span>
          <span className="font-mono text-[11px] text-[var(--bento-pill-text)]">
            https://&lt;bucket&gt;.r2.dev/...
          </span>
        </div>
      </section>
    </div>
  );
}
