"use client";

import { useState, useEffect, useCallback } from "react";

interface PhotoSeries {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  framesCount: number;
  filmStock: string;
  lens: string;
  exif: string;
  gradient: string;
  accent: string;
  description: string;
  frames: {
    title: string;
    caption: string;
    setting: string;
    colorA: string;
    colorB: string;
  }[];
}

const PHOTO_SERIES: PhotoSeries[] = [
  {
    id: "street-chronicles",
    title: "Street Chronicles",
    subtitle: "Tokyo Nocturne & Rainy Neon",
    location: "Shinjuku & Shibuya, Tokyo",
    framesCount: 18,
    filmStock: "Cinestill 800T & Portra 400",
    lens: "Leica Summicron 35mm f/2",
    exif: "f/2.0 · 1/125s · ISO 800",
    gradient: "from-blue-600/30 via-purple-600/20 to-pink-600/30",
    accent: "text-sky-300",
    description:
      "A candid nocturnal exploration of Tokyo alleyways, wet asphalt reflections, umbrella silhouettes, and halogen lantern glows.",
    frames: [
      {
        title: "Memory Lane (Omoide Yokocho)",
        caption: "Smoke curling past izakaya paper lanterns in the narrow alley.",
        setting: "f/2.0 · 1/60s · ISO 800",
        colorA: "#3b1622",
        colorB: "#0f172a",
      },
      {
        title: "Scramble Rain Crossing",
        caption: "Translucent umbrellas catching cold cyan pedestrian crossing LED lights.",
        setting: "f/2.8 · 1/125s · ISO 1600",
        colorA: "#0284c7",
        colorB: "#1e1b4b",
      },
      {
        title: "Subway Platform at 01:14 AM",
        caption: "Empty yellow tactile paving guiding lone commuters home.",
        setting: "f/2.0 · 1/80s · ISO 640",
        colorA: "#ca8a04",
        colorB: "#09090b",
      },
    ],
  },
  {
    id: "editorial-night",
    title: "Editorial Night",
    subtitle: "Cinematic High-Contrast Portraits",
    location: "Kuala Lumpur & Studio",
    framesCount: 16,
    filmStock: "Kodak Tri-X 400 pushed to 1600",
    lens: "Sony FE 50mm f/1.2 GM",
    exif: "f/1.4 · 1/250s · ISO 400",
    gradient: "from-pink-600/30 via-rose-950/20 to-purple-900/30",
    accent: "text-pink-300",
    description:
      "Editorial lighting compositions working with high-key neon tubes, practical rim lights, and intimate emotive close-ups.",
    frames: [
      {
        title: "Neon Solitude",
        caption: "Subject illuminated by single crimson tube key light against deep velvet shadows.",
        setting: "f/1.4 · 1/250s · ISO 400",
        colorA: "#e11d48",
        colorB: "#18181b",
      },
      {
        title: "Prism Refraction",
        caption: "Optical triangular crystal glass held before the front element.",
        setting: "f/1.2 · 1/320s · ISO 320",
        colorA: "#9333ea",
        colorB: "#3b0764",
      },
    ],
  },
  {
    id: "golden-hour-horizons",
    title: "Golden Hour Horizons",
    subtitle: "Analog 35mm Warmth & Coastlines",
    location: "Penang & Enoshima Coast",
    framesCount: 14,
    filmStock: "Kodak Gold 200 / Portra 160",
    lens: "Minolta Rokkor 58mm f/1.4",
    exif: "f/2.8 · 1/500s · ISO 200",
    gradient: "from-amber-600/30 via-orange-950/20 to-rose-900/30",
    accent: "text-amber-300",
    description:
      "Sun-bleached horizons, warm oceanic spray, retro coastal railways, and natural golden hour flaring captured straight to 35mm negative.",
    frames: [
      {
        title: "Shonan Coastline Enoden",
        caption: "Retro green tram passing the sparkling seaside crossing at dusk.",
        setting: "f/4.0 · 1/500s · ISO 200",
        colorA: "#d97706",
        colorB: "#1c1917",
      },
      {
        title: "Golden Tide",
        caption: "Distant surfers catching the amber highlights of the setting sun.",
        setting: "f/2.8 · 1/1000s · ISO 160",
        colorA: "#f59e0b",
        colorB: "#292524",
      },
    ],
  },
];

interface PhotographyCardProps {
  isModalOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
}

export default function PhotographyCard({
  isModalOpen: controlledIsOpen,
  onOpenModal,
  onCloseModal,
}: PhotographyCardProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [activeSeries, setActiveSeries] = useState<PhotoSeries>(PHOTO_SERIES[0]);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const handleOpen = () => {
    if (onOpenModal) onOpenModal();
    else setInternalIsOpen(true);
  };

  const handleClose = useCallback(() => {
    if (onCloseModal) onCloseModal();
    else setInternalIsOpen(false);
  }, [onCloseModal]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleClose]);

  return (
    <>
      {/* Bento Grid Card (Primary Pastel) */}
      <div
        onClick={handleOpen}
        className="bento-card bento-card-3 relative group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-7 transition-colors duration-700 active:scale-[0.995]"
      >
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
              <span className="font-mono text-[11px] font-medium uppercase tracking-wider">
                Photo Series & Stills
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--bento-text-muted)] transition-colors duration-700">
              <span className="rounded border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-2 py-0.5 text-[var(--bento-text-muted)] transition-colors duration-700">
                48 FRAMES
              </span>
              <span className="font-semibold text-[var(--bento-pill-text)]">
                35MM & DIGITAL
              </span>
            </div>
          </div>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--bento-text)] group-hover:text-[var(--bento-pill-text)] transition-colors duration-700">
            Photography Projects
          </h3>
          <p className="mt-1 text-xs text-[var(--bento-text-muted)] leading-relaxed transition-colors duration-700">
            Curated photographic series exploring urban solitude, neon night portraiture, and analog coastal horizons.
          </p>
        </div>

        {/* Interactive Mini Gallery Preview Strip */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {PHOTO_SERIES.map((series, idx) => {
            const isSelected = activeSeries.id === series.id;

            return (
              <div
                key={series.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-xl border p-3 transition-all duration-300 ${
                  isSelected
                    ? "border-[var(--bento-accent)] bg-[var(--bento-surface)] ring-1 ring-[var(--bento-accent)]/35 shadow-sm"
                    : "border-[var(--bento-border-soft)] bg-[var(--bento-surface)] group-hover:border-[var(--bento-accent)]/50"
                }`}
              >
                {/* Pastel simulated photo contact frame */}
                <div className="relative aspect-[4/3] w-full rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-bg-secondary)] p-2 flex flex-col justify-between overflow-hidden transition-colors duration-700">
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${series.gradient} opacity-65`}
                  />
                  <div className="relative z-10 flex justify-between font-mono text-[8px] font-medium text-[var(--bento-text-muted)]">
                    <span>0{idx + 1}</span>
                    <span>{series.framesCount}F</span>
                  </div>
                  <div className="relative z-10 text-center font-mono text-[10px] text-[var(--bento-text)] font-bold truncate">
                    {series.title}
                  </div>
                  <div className="relative z-10 flex justify-between font-mono text-[7px] font-medium text-[var(--bento-text-muted)]">
                    <span>35mm</span>
                    <span>RAW</span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="font-semibold text-xs text-[var(--bento-text)] truncate transition-colors duration-700">
                    {series.title}
                  </div>
                  <div className="font-mono text-[9px] text-[var(--bento-text-muted)] truncate transition-colors duration-700">
                    {series.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Meta & Lightbox Trigger */}
        <div className="mt-4 flex items-center justify-between border-t border-[var(--bento-border-soft)] pt-3 font-mono text-[10px] text-[var(--bento-text-muted)] transition-colors duration-700">
          <span>EXIF: f/1.4 · 1/250s · ISO 400</span>
          <span className="font-semibold text-[var(--bento-pill-text)] group-hover:underline">
            Open Lightbox Viewer →
          </span>
        </div>
      </div>

      {/* Photography Lightbox Modal (Dark-themed for accurate media viewing) */}
      {isModalOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-200"
        >
          <div
            className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-950 p-4 sm:p-6 shadow-2xl shadow-purple-500/10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-pink-500/20 px-2 py-0.5 font-mono text-[10px] text-pink-300 border border-pink-500/30">
                    {activeSeries.location}
                  </span>
                  <span className="font-mono text-xs text-white/50">
                    {activeSeries.filmStock}
                  </span>
                </div>
                <h2 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-white">
                  {activeSeries.title} {"//"} {activeSeries.subtitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
                title="Close Lightbox (Esc)"
                aria-label="Close Lightbox"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Lightbox Main Stage */}
            <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black flex flex-col justify-between p-6">
              {/* Frame Canvas Simulation */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${
                    activeSeries.frames[activeFrameIndex % activeSeries.frames.length].colorA
                  } 0%, ${
                    activeSeries.frames[activeFrameIndex % activeSeries.frames.length].colorB
                  } 100%)`,
                }}
              />

              {/* Viewfinder Frame Crosshairs & Grid */}
              <div className="pointer-events-none absolute inset-4 border border-white/20" />
              <div className="pointer-events-none absolute left-1/2 top-4 bottom-4 border-l border-white/10 border-dashed" />
              <div className="pointer-events-none absolute top-1/2 left-4 right-4 border-t border-white/10 border-dashed" />

              {/* Frame Top HUD */}
              <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/80">
                <span className="rounded bg-black/60 px-2 py-1 backdrop-blur-sm">
                  FRAME #{activeFrameIndex + 1} OF {activeSeries.frames.length}
                </span>
                <span className="rounded bg-black/60 px-2 py-1 backdrop-blur-sm">
                  {activeSeries.frames[activeFrameIndex % activeSeries.frames.length].setting}
                </span>
              </div>

              {/* Center Frame Title */}
              <div className="relative z-10 text-center max-w-lg mx-auto bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/10">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {activeSeries.frames[activeFrameIndex % activeSeries.frames.length].title}
                </h4>
                <p className="mt-1 text-xs text-slate-300">
                  {activeSeries.frames[activeFrameIndex % activeSeries.frames.length].caption}
                </p>
              </div>

              {/* Frame Bottom Navigation Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveFrameIndex(
                      (prev) => (prev - 1 + activeSeries.frames.length) % activeSeries.frames.length
                    )
                  }
                  className="rounded-lg bg-black/60 px-3 py-1.5 font-mono text-xs text-white hover:bg-pink-500 transition-all border border-white/20"
                >
                  ← Prev Frame
                </button>

                <div className="flex gap-1.5">
                  {activeSeries.frames.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveFrameIndex(i)}
                      aria-label={`Select frame ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        activeFrameIndex === i ? "w-6 bg-pink-400" : "w-2 bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveFrameIndex((prev) => (prev + 1) % activeSeries.frames.length)
                  }
                  className="rounded-lg bg-black/60 px-3 py-1.5 font-mono text-xs text-white hover:bg-pink-500 transition-all border border-white/20"
                >
                  Next Frame →
                </button>
              </div>
            </div>

            {/* Series Switcher Tabs */}
            <div className="mt-4 flex flex-wrap gap-2">
              {PHOTO_SERIES.map((series) => (
                <button
                  key={series.id}
                  type="button"
                  onClick={() => {
                    setActiveSeries(series);
                    setActiveFrameIndex(0);
                  }}
                  className={`rounded-xl border px-3.5 py-2 font-mono text-xs transition-all ${
                    activeSeries.id === series.id
                      ? "border-pink-500 bg-pink-500/20 text-white font-semibold"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {series.title} ({series.framesCount}F)
                </button>
              ))}
            </div>

            {/* Description footnote */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-slate-400">
              <p className="line-clamp-2 text-slate-300">
                {activeSeries.description}
              </p>
              <span className="font-mono text-[10px] text-white/50 shrink-0">
                Lens: {activeSeries.lens}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
