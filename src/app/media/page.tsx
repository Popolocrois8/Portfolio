"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useSkyTheme } from "../components/pixel/SceneTransitionManager";
import {
  CLOUDINARY_TAG,
  fetchCloudinaryTaggedMedia,
  groupMediaIntoRows,
  type ArchiveMediaEntry,
  type MediaKind,
} from "@/lib/media";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogVideo,
  MorphingDialogTitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/core/morphing-dialog";

type MediaFilter = MediaKind | "all";

const FILTER_OPTIONS: { id: MediaFilter; label: string }[] = [
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "all", label: "All" },
];

const SKELETON_ROWS = [
  [1.5, 1.0, 0.8],
  [1.35, 1.65],
];

export default function MediaPage() {
  const { activeTheme, triggerPixelTransition } = useSkyTheme();
  const [activeFilter, setActiveFilter] = useState<MediaFilter>("photo");
  const [items, setItems] = useState<ArchiveMediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const isBrightSky = activeTheme === "day-blue" || activeTheme === "day-grey";

  useEffect(() => {
    const controller = new AbortController();

    fetchCloudinaryTaggedMedia(undefined, undefined, controller.signal)
      .then((fetched) => {
        if (controller.signal.aborted) return;
        setItems(fetched);
        setErrorMessage(null);

        // If no photos are tagged yet but videos exist, switch straight to Videos
        const hasPhotos = fetched.some((item) => item.kind === "photo");
        const hasVideos = fetched.some((item) => item.kind === "video");
        if (!hasPhotos && hasVideos) {
          setActiveFilter((prev) => (prev === "photo" ? "video" : prev));
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Could not load media from Cloudinary."
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadNonce]);

  const handleRetry = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setReloadNonce((n) => n + 1);
  };

  const visibleItems = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.kind === activeFilter),
    [activeFilter, items]
  );

  const rows = useMemo(() => groupMediaIntoRows(visibleItems), [visibleItems]);

  const counts: Record<MediaFilter, number> = useMemo(
    () => ({
      photo: items.filter((item) => item.kind === "photo").length,
      video: items.filter((item) => item.kind === "video").length,
      all: items.length,
    }),
    [items]
  );

  const chromePillStyle: CSSProperties = {
    backgroundColor: isBrightSky
      ? "rgba(244, 249, 255, 0.84)"
      : "rgba(18, 13, 30, 0.56)",
    borderColor: isBrightSky
      ? "var(--bento-border-soft)"
      : "rgba(255, 255, 255, 0.16)",
    color: "var(--page-text)",
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Minimal Top Bar: Back + Simple Photos / Videos / All Tab Switch */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => triggerPixelTransition("/")}
          style={chromePillStyle}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-[0_8px_24px_-8px_rgba(12,8,20,0.45)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div
          role="tablist"
          aria-label="Filter media by type"
          style={chromePillStyle}
          className="inline-flex items-center gap-1 rounded-full border p-1 shadow-[0_8px_24px_-8px_rgba(12,8,20,0.45)] backdrop-blur-md"
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
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] ${
                  isSelected
                    ? "bg-[var(--bento-accent)] text-[var(--bento-accent-text)] shadow-sm"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {option.label}{" "}
                <span className="tabular-nums opacity-75">
                  ({counts[option.id]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unboxed Media Gallery */}
      {isLoading ? (
        <div className="flex flex-col gap-4 sm:gap-5" aria-busy="true" aria-label="Loading media">
          {SKELETON_ROWS.map((ratios, rowIdx) => (
            <div key={rowIdx} className="flex flex-col gap-4 sm:gap-5 md:flex-row">
              {ratios.map((ratio, colIdx) => (
                <div
                  key={colIdx}
                  style={
                    {
                      aspectRatio: ratio,
                      "--tile-ratio": ratio,
                    } as CSSProperties
                  }
                  className="w-full animate-pulse rounded-2xl bg-white/10 ring-1 ring-white/10 md:w-auto md:flex-[var(--tile-ratio)_1_0%]"
                />
              ))}
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <div
          style={chromePillStyle}
          className="mx-auto mt-16 max-w-md rounded-2xl border px-6 py-8 text-center backdrop-blur-md"
        >
          <p className="text-sm font-medium">{errorMessage}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-4 inline-flex cursor-pointer items-center rounded-full bg-[var(--bento-accent)] px-4 py-1.5 text-xs font-semibold text-[var(--bento-accent-text)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)]"
          >
            Try Again
          </button>
        </div>
      ) : visibleItems.length === 0 ? (
        <div
          style={chromePillStyle}
          className="mx-auto mt-16 max-w-md rounded-2xl border px-6 py-10 text-center text-sm backdrop-blur-md"
        >
          {items.length === 0
            ? `No assets tagged "${CLOUDINARY_TAG}" were found in Cloudinary yet.`
            : `No ${activeFilter === "all" ? "media" : `${activeFilter}s`} found under "${CLOUDINARY_TAG}".`}
        </div>
      ) : (
        <div
          role="tabpanel"
          aria-label={`${activeFilter} gallery`}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {rows.map((row, rowIndex) => {
            const isSingleTrailing =
              row.length === 1 && rowIndex === rows.length - 1;
            const singleMaxWidth = isSingleTrailing
              ? row[0].aspectRatio < 1.1
                ? "md:max-w-[44%]"
                : row[0].aspectRatio < 1.65
                  ? "md:max-w-[68%]"
                  : ""
              : "";

            return (
              <div
                key={row.map((item) => item.id).join("|")}
                className={`flex flex-col gap-4 sm:gap-5 md:flex-row ${singleMaxWidth}`}
              >
                {row.map((item) => (
                  <div
                    key={item.id}
                    style={
                      {
                        aspectRatio: item.aspectRatio,
                        "--tile-ratio": item.aspectRatio,
                      } as CSSProperties
                    }
                    className="w-full md:w-auto md:flex-[var(--tile-ratio)_1_0%]"
                  >
                    <MorphingDialog
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 26,
                        mass: 0.9,
                      }}
                    >
                      <MorphingDialogTrigger
                        ariaLabel={`Open ${item.title}`}
                        className="group relative block h-full w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      >
                        {item.kind === "video" ? (
                          <>
                            <MorphingDialogVideo
                              src={item.src}
                              poster={item.poster}
                              ariaLabel={item.title}
                              muted
                              loop
                              preload="metadata"
                              style={{ borderRadius: "16px" }}
                              className="h-full w-full bg-black/40 object-cover shadow-[0_14px_34px_-12px_rgba(12,8,20,0.55)] ring-1 ring-white/15 transition-[box-shadow,filter] duration-300 group-hover:brightness-[1.04] group-hover:shadow-[0_20px_42px_-12px_rgba(12,8,20,0.72)] group-hover:ring-white/35"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute right-3.5 bottom-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0a14]/70 text-[#faf7fb] ring-1 ring-white/20 backdrop-blur-sm transition-opacity duration-200 group-data-[open=true]:opacity-0"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="ml-0.5 h-4 w-4"
                              >
                                <path d="M8 5.14v14l11-7-11-7Z" />
                              </svg>
                            </span>
                          </>
                        ) : (
                          <MorphingDialogImage
                            src={item.src}
                            alt={item.caption || item.title}
                            style={{ borderRadius: "16px" }}
                            className="h-full w-full object-cover shadow-[0_14px_34px_-12px_rgba(12,8,20,0.55)] ring-1 ring-white/15 transition-[box-shadow,filter] duration-300 group-hover:brightness-[1.04] group-hover:shadow-[0_20px_42px_-12px_rgba(12,8,20,0.72)] group-hover:ring-white/35"
                          />
                        )}
                      </MorphingDialogTrigger>

                      <MorphingDialogContainer>
                        <MorphingDialogContent className="relative flex w-full max-w-5xl flex-col items-center pb-8 sm:pb-12">
                          {/* Media lifted slightly above vertical center */}
                          <div className="relative flex w-full justify-center">
                            {item.kind === "video" ? (
                              <MorphingDialogVideo
                                src={item.src}
                                poster={item.poster}
                                ariaLabel={item.title}
                                controls
                                autoPlay
                                muted={false}
                                loop
                                preload="auto"
                                style={{ borderRadius: "16px" }}
                                className="max-h-[68vh] w-auto max-w-full bg-black object-contain shadow-[0_28px_70px_-16px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
                              />
                            ) : (
                              <MorphingDialogImage
                                src={item.src}
                                alt={item.caption || item.title}
                                loading="eager"
                                style={{ borderRadius: "16px" }}
                                className="max-h-[68vh] w-auto max-w-full object-contain shadow-[0_28px_70px_-16px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
                              />
                            )}

                            <MorphingDialogClose
                              className="absolute -top-11 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#140e20]/80 text-[#faf7fb] backdrop-blur-md transition-colors duration-200 hover:bg-[#231836] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)]"
                              variants={{
                                initial: { opacity: 0, scale: 0.9 },
                                animate: {
                                  opacity: 1,
                                  scale: 1,
                                  transition: { delay: 0.12, duration: 0.2 },
                                },
                                exit: {
                                  opacity: 0,
                                  scale: 0.9,
                                  transition: { duration: 0.14 },
                                },
                              }}
                            />
                          </div>

                          {/* Text below the expanded media */}
                          <MorphingDialogDescription
                            disableLayoutAnimation
                            variants={{
                              initial: { opacity: 0, y: 12 },
                              animate: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  delay: 0.1,
                                  duration: 0.28,
                                  ease: [0.16, 1, 0.3, 1],
                                },
                              },
                              exit: {
                                opacity: 0,
                                y: 8,
                                transition: { duration: 0.14, ease: "easeIn" },
                              },
                            }}
                            className="mt-5 w-full max-w-2xl px-2 text-center"
                          >
                            <MorphingDialogTitle className="text-lg font-semibold tracking-tight text-[#faf7fb] sm:text-xl">
                              {item.title}
                            </MorphingDialogTitle>
                            {item.caption && (
                              <p className="mt-1.5 text-sm leading-relaxed text-[#d9cce2]">
                                {item.caption}
                              </p>
                            )}
                          </MorphingDialogDescription>
                        </MorphingDialogContent>
                      </MorphingDialogContainer>
                    </MorphingDialog>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
