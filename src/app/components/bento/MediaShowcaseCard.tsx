"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useSkyTheme } from "../pixel/SceneTransitionManager";
import { Marquee } from "../ui/marquee";

interface ShowcaseMediaItem {
  id: string;
  src: string;
  type: "image" | "video";
  alt: string;
  poster?: string;
}

/**
 * 8 showcase media items split across two opposing marquee rows.
 * Swap `src` (and optional `poster`) with Cloudflare R2 asset URLs when ready
 * (e.g., `https://<bucket>.r2.dev/...`).
 */
const SHOWCASE_MEDIA: ShowcaseMediaItem[] = [
  {
    id: "golden-horizon",
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80",
    type: "image",
    alt: "Golden hour horizon across misty mountain peaks",
  },
  {
    id: "sintel-reel",
    src: "https://mdn.github.io/shared-assets/videos/sintel-short.mp4",
    type: "video",
    alt: "Sintel cinematic motion reel clip",
  },
  {
    id: "dusk-surf",
    src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=900&q=80",
    type: "image",
    alt: "Ocean surf breaking beneath dusk clouds",
  },
  {
    id: "camera-study",
    src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=900&q=80",
    type: "image",
    alt: "Camera lens capturing moody studio light",
  },
  {
    id: "flower-timelapse",
    src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
    type: "video",
    alt: "Blooming flower time-lapse motion study",
  },
  {
    id: "alpine-night",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    type: "image",
    alt: "Starry alpine night ridge",
  },
  {
    id: "tears-of-steel-reel",
    src: "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4",
    type: "video",
    poster:
      "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg",
    alt: "Tears of Steel cinematic motion reel",
  },
  {
    id: "coastal-valley",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80",
    type: "image",
    alt: "Sunlit valley opening toward coastal cliffs",
  },
];

const FIRST_ROW = SHOWCASE_MEDIA.slice(0, 4);
const SECOND_ROW = SHOWCASE_MEDIA.slice(4);

function MarqueeMediaTile({
  item,
  shouldReduceMotion,
}: {
  item: ShowcaseMediaItem;
  shouldReduceMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || item.type !== "video") {
      return;
    }

    videoEl.defaultMuted = true;
    videoEl.muted = true;

    let isInView = true;
    const reducedMotionQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const syncPlayback = () => {
      const prefersReduced =
        shouldReduceMotion || Boolean(reducedMotionQuery?.matches);
      if (prefersReduced || document.hidden || !isInView) {
        videoEl.pause();
      } else {
        void videoEl.play().catch(() => {});
      }
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (entry) {
                isInView = entry.isIntersecting;
                syncPlayback();
              }
            },
            { threshold: 0.05 },
          )
        : null;

    if (observer) {
      observer.observe(videoEl);
    }

    reducedMotionQuery?.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer?.disconnect();
      reducedMotionQuery?.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [item.type, item.src, shouldReduceMotion]);

  return (
    <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] shadow-[0_6px_14px_-6px_var(--bento-shadow-color)] transition-colors duration-700 sm:h-28 sm:w-48">
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="pointer-events-none h-full w-full select-none object-cover object-center"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={item.src}
          alt={item.alt}
          loading="eager"
          decoding="async"
          draggable={false}
          className="pointer-events-none h-full w-full select-none object-cover object-center"
        />
      )}
    </div>
  );
}

export default function MediaShowcaseCard() {
  const { triggerPixelTransition } = useSkyTheme();
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <button
      type="button"
      onClick={() => triggerPixelTransition("/media")}
      aria-label="Media Showcase — Photos & Videos — Explore Media"
      className="bento-card bento-card-2 group relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-6 text-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-7"
    >
      {/* Decorative corner crosshairs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 z-20 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 z-20 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 z-20 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </span>

      {/* Header */}
      <div className="relative z-20 flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-[var(--bento-text)] transition-colors duration-700 sm:text-2xl">
            Media Showcase
          </h2>
          <span className="rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-0.5 text-xs font-semibold text-[var(--bento-pill-text)] transition-colors duration-700">
            Photos &amp; Videos
          </span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--bento-text)] transition-colors duration-300 group-hover:border-[var(--bento-accent)] group-hover:bg-[var(--bento-pill-bg)] group-hover:text-[var(--bento-pill-text)]">
          <span>Explore Media</span>
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--bento-pill-bg)] text-[var(--bento-pill-text)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:bg-[var(--bento-accent)] group-hover:text-[var(--bento-accent-text)] motion-reduce:transition-colors motion-reduce:group-hover:translate-x-0"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </span>
      </div>

      {/* Dual-direction contained media marquee */}
      <div
        aria-hidden="true"
        className="relative mt-5 flex w-full flex-1 flex-col justify-center gap-3 overflow-hidden"
      >
        <Marquee pauseOnHover repeat={3} className="p-0 [--duration:26s] [--gap:0.75rem]">
          {FIRST_ROW.map((item) => (
            <MarqueeMediaTile
              key={item.id}
              item={item}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </Marquee>

        <Marquee
          reverse
          pauseOnHover
          repeat={3}
          className="p-0 [--duration:26s] [--gap:0.75rem]"
        >
          {SECOND_ROW.map((item) => (
            <MarqueeMediaTile
              key={item.id}
              item={item}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </Marquee>

        {/* Soft horizontal edge fades blended into the card surface */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--bento-card-bg,var(--bento-bg-primary))] to-transparent transition-colors duration-700 sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--bento-card-bg,var(--bento-bg-primary))] to-transparent transition-colors duration-700 sm:w-16" />
      </div>
    </button>
  );
}
