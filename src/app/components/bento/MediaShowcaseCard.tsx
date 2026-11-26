"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useSkyTheme } from "../pixel/SceneTransitionManager";
import { Marquee } from "../ui/marquee";
import {
  CLOUDINARY_TAG,
  fetchCloudinaryTaggedPhotos,
  type ArchiveMediaEntry,
} from "@/lib/media";

const MAX_MARQUEE_PHOTOS = 16;
const SKELETON_TILES = [0, 1, 2, 3];

function MarqueePhotoTile({ item }: { item: ArchiveMediaEntry }) {
  return (
    <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] shadow-[0_6px_14px_-6px_var(--bento-shadow-color)] transition-colors duration-700 sm:h-28 sm:w-48">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.caption || item.title}
        loading="eager"
        decoding="async"
        draggable={false}
        className="pointer-events-none h-full w-full select-none object-cover object-center"
      />
    </div>
  );
}

function MarqueeSkeletonRow() {
  return (
    <div className="flex shrink-0 gap-3 overflow-hidden">
      {SKELETON_TILES.map((idx) => (
        <div
          key={idx}
          className="h-24 w-40 shrink-0 animate-pulse rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] opacity-70 sm:h-28 sm:w-48"
        />
      ))}
    </div>
  );
}

export default function MediaShowcaseCard() {
  const { triggerPixelTransition } = useSkyTheme();
  const [photos, setPhotos] = useState<ArchiveMediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    fetchCloudinaryTaggedPhotos(undefined, undefined, controller.signal, 640)
      .then((fetched) => {
        if (controller.signal.aborted) return;
        setPhotos(fetched.slice(0, MAX_MARQUEE_PHOTOS));
        setHasError(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setHasError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const { firstRow, secondRow, rowRepeat, firstDuration, secondDuration } =
    useMemo(() => {
      if (photos.length === 0) {
        return {
          firstRow: [] as ArchiveMediaEntry[],
          secondRow: [] as ArchiveMediaEntry[],
          rowRepeat: 3,
          firstDuration: "26s",
          secondDuration: "26s",
        };
      }

      if (photos.length === 1) {
        return {
          firstRow: photos,
          secondRow: photos,
          rowRepeat: 6,
          firstDuration: "22s",
          secondDuration: "22s",
        };
      }

      const rowA: ArchiveMediaEntry[] = [];
      const rowB: ArchiveMediaEntry[] = [];
      photos.forEach((photo, index) => {
        if (index % 2 === 0) rowA.push(photo);
        else rowB.push(photo);
      });

      const shortestRow = Math.min(rowA.length, rowB.length);
      const repeat = Math.max(3, Math.ceil(6 / Math.max(1, shortestRow)));

      return {
        firstRow: rowA,
        secondRow: rowB,
        rowRepeat: repeat,
        firstDuration: `${Math.max(20, Math.round(rowA.length * 6.5))}s`,
        secondDuration: `${Math.max(20, Math.round(rowB.length * 6.5))}s`,
      };
    }, [photos]);

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

      {/* Dual-direction contained photo marquee */}
      <div
        aria-hidden="true"
        className="relative mt-5 flex w-full flex-1 flex-col justify-center gap-3 overflow-hidden"
      >
        {isLoading ? (
          <>
            <MarqueeSkeletonRow />
            <MarqueeSkeletonRow />
          </>
        ) : photos.length > 0 ? (
          <>
            <Marquee
              pauseOnHover
              repeat={rowRepeat}
              style={{ "--duration": firstDuration } as CSSProperties}
              className="p-0 [--gap:0.75rem]"
            >
              {firstRow.map((item) => (
                <MarqueePhotoTile key={item.id} item={item} />
              ))}
            </Marquee>

            <Marquee
              reverse
              pauseOnHover
              repeat={rowRepeat}
              style={{ "--duration": secondDuration } as CSSProperties}
              className="p-0 [--gap:0.75rem]"
            >
              {secondRow.map((item) => (
                <MarqueePhotoTile key={item.id} item={item} />
              ))}
            </Marquee>
          </>
        ) : (
          <div className="flex min-h-[12.75rem] flex-col items-center justify-center rounded-xl border border-dashed border-[var(--bento-border-soft)] bg-[var(--bento-surface)]/60 px-6 py-8 text-center sm:min-h-[14.75rem]">
            <p className="text-xs font-medium text-[var(--bento-text-muted)]">
              {hasError
                ? "Could not load photo previews from Cloudinary."
                : `Tag photos with "${CLOUDINARY_TAG}" in Cloudinary to preview them here.`}
            </p>
          </div>
        )}

        {/* Soft horizontal edge fades blended into the card surface */}
        {photos.length > 0 && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--bento-card-bg,var(--bento-bg-primary))] to-transparent transition-colors duration-700 sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--bento-card-bg,var(--bento-bg-primary))] to-transparent transition-colors duration-700 sm:w-16" />
          </>
        )}
      </div>
    </button>
  );
}
