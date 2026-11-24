"use client";

import { useState, useEffect, useCallback } from "react";

interface VideoProject {
  id: string;
  title: string;
  role: string;
  duration: string;
  category: "Narrative" | "Commercial" | "Music Video" | "Experimental";
  description: string;
  gear: string;
  year: string;
  aspect: string;
}

const REEL_PROJECTS: VideoProject[] = [
  {
    id: "reel-main",
    title: "Chrono // 2026 Directorial Showreel",
    role: "Director, DP & Colorist",
    duration: "02:45",
    category: "Commercial",
    description:
      "A fast-paced montage of narrative short films, Tokyo nocturnal street commercial work, automotive high-speed tracking, and kinetic lighting experiments.",
    gear: "Sony FX3 · Sirui 1.33x Anamorphic · DaVinci Resolve",
    year: "2026",
    aspect: "2.39:1 CinemaScope",
  },
  {
    id: "neon-drift",
    title: "Neon Drift // Night Drive",
    role: "Director of Photography",
    duration: "01:15",
    category: "Commercial",
    description:
      "Commercial spec capturing modified classic JDMs cutting through rain-slicked highway tunnels with cyan and magenta atmospheric spill.",
    gear: "Sony FX3 · 35mm T1.5 Cine · Tilta Hydra Arm",
    year: "2025",
    aspect: "2.35:1",
  },
  {
    id: "echoes-tokyo",
    title: "Echoes of Shibuya // Narrative Short",
    role: "Director & Writer",
    duration: "04:30",
    category: "Narrative",
    description:
      "A silent visual study of isolation amidst the bustling streets of Tokyo, blending 35mm film grain overlays with modern low-light digital capture.",
    gear: "Sony A7SIII · Cooke Mini S4/i Primes · Kodak 500T LUT",
    year: "2025",
    aspect: "1.85:1",
  },
  {
    id: "vaporwave-nights",
    title: "Midnight Mirage // Official Music Video",
    role: "Co-Director & Editor",
    duration: "03:20",
    category: "Music Video",
    description:
      "Synthwave audiovisual project featuring retro CRT television walls, practical laser projections, and optical star filter flares.",
    gear: "Sony FX3 · Vintage Canon FD 50mm f/1.4 · Prism Lens FX",
    year: "2024",
    aspect: "4:3 Academy",
  },
];

interface VideographyCardProps {
  isModalOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
}

export default function VideographyCard({
  isModalOpen: controlledIsOpen,
  onOpenModal,
  onCloseModal,
}: VideographyCardProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [selectedProject, setSelectedProject] = useState<VideoProject>(REEL_PROJECTS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(38);

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
      {/* Bento Grid Card (Pastel Companion Tint) */}
      <div
        onClick={handleOpen}
        className="bento-card bento-card-4 relative group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-7 transition-colors duration-700 active:scale-[0.995]"
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
                Directorial Works
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--bento-text-muted)] transition-colors duration-700">
              <span className="rounded border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-2 py-0.5 text-[var(--bento-text-muted)] transition-colors duration-700">
                02:45 REEL
              </span>
              <span className="font-semibold text-[var(--bento-pill-text)]">
                4K DCI
              </span>
            </div>
          </div>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--bento-text)] group-hover:text-[var(--bento-pill-text)] transition-colors duration-700">
            Videography & Motion Showreel
          </h3>
          <p className="mt-1 text-xs text-[var(--bento-text-muted)] leading-relaxed transition-colors duration-700">
            Narrative films, commercial spots, and cinematic music videos. Mastered in 4K DCI color space with anamorphic optics.
          </p>
        </div>

        {/* Cinematic Preview Viewport */}
        <div className="bento-surface relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] transition-colors duration-700">
          {/* Pastel Atmospheric Color Wash */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bento-bg-primary)] via-[var(--bento-accent-soft)] to-[var(--bento-bg-secondary)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Simulated Cinematic Letterbox Matte Bars */}
          <div className="absolute inset-x-0 top-0 h-3.5 border-b border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] transition-colors duration-700" />
          <div className="absolute inset-x-0 bottom-0 h-3.5 border-t border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] transition-colors duration-700" />

          {/* Center Play Indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--bento-surface)] bg-[var(--bento-accent)] text-[var(--bento-accent-text)] shadow-md transition-transform duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-0.5 h-5 w-5"
                aria-hidden="true"
              >
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              <span className="absolute -inset-1 rounded-full border border-[var(--bento-accent)]/40 animate-ping opacity-50" />
            </div>
          </div>

          {/* On-Screen Display Telemetry */}
          <div className="absolute top-5 left-3 flex items-center gap-1.5 font-mono text-[9px] font-semibold text-[var(--bento-text)] transition-colors duration-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--bento-accent)] animate-pulse" />
            <span>PLAY REEL</span>
          </div>

          <div className="absolute top-5 right-3 font-mono text-[9px] font-medium text-[var(--bento-text-muted)] transition-colors duration-700">
            2.39:1 CINEMASCOPE
          </div>

          <div className="absolute bottom-5 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[var(--bento-text-muted)] transition-colors duration-700">
            <span>TC 01:24:18:02</span>
            <span className="font-semibold text-[var(--bento-pill-text)] group-hover:underline">
              Click to Expand Cinema Modal →
            </span>
          </div>
        </div>

        {/* Category Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {["Narrative", "Commercial", "Music Video", "Color Grading"].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--bento-pill-text)] transition-colors duration-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Cinematic Preview Modal (Dark-themed for accurate media viewing) */}
      {isModalOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-200"
        >
          <div
            className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-950 p-4 sm:p-6 shadow-2xl shadow-pink-500/10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                    {selectedProject.title}
                  </h2>
                  <p className="font-mono text-xs text-pink-400">
                    {selectedProject.role} · {selectedProject.year} · {selectedProject.aspect}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
                title="Close Cinema Viewer (Esc)"
                aria-label="Close Cinema Viewer"
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

            {/* Cinema Player Viewport */}
            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black flex flex-col justify-between p-4">
              {/* Animated Cinematic Scene Gradient & Canvas Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-950/60 via-purple-950/40 to-slate-900/80" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-black/80" />

              {/* Viewfinder Grid overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Player Top HUD */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/70">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-red-600 px-1.5 py-0.5 text-white font-bold animate-pulse">
                    REC
                  </span>
                  <span>DCI 4K 23.976 FPS</span>
                  <span className="hidden sm:inline">10-BIT 4:2:2 PRORES</span>
                </div>
                <div>
                  <span>SHUTTER: 1/48s</span>
                </div>
              </div>

              {/* Player Center Visual / Big Title Simulation */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
                  className="group/btn cursor-pointer flex h-16 w-16 items-center justify-center rounded-full border border-pink-400/50 bg-pink-500/20 backdrop-blur-md shadow-lg shadow-pink-500/30 transition-transform hover:scale-110 active:scale-95 text-white"
                >
                  {isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-0.5 h-6 w-6"
                      aria-hidden="true"
                    >
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  )}
                </button>
                <div className="mt-3 font-mono text-xs uppercase tracking-widest text-pink-300">
                  {isPlaying ? "Simulated Stream Running" : "Paused"}
                </div>
              </div>

              {/* Player Controls Bar */}
              <div className="relative z-10 flex flex-col gap-2 rounded-lg bg-black/60 p-2.5 backdrop-blur-md border border-white/5">
                {/* Progress bar scrubber */}
                <div
                  className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-amber-400 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-white/80">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-pink-400"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="inline-flex items-center gap-1 hover:text-pink-400"
                    >
                      {isMuted ? (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          >
                            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                            <line x1="22" x2="16" y1="9" y2="15" />
                            <line x1="16" x2="22" y1="9" y2="15" />
                          </svg>
                          <span>Unmute</span>
                        </>
                      ) : (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          >
                            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                          <span>Audio On</span>
                        </>
                      )}
                    </button>
                    <span className="text-white/40">
                      01:04 / {selectedProject.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-white/40">S-Log3 LUT Applied</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5">DCI P3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Selector Strip & Notes */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2 overflow-y-auto max-h-36">
              {REEL_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    setSelectedProject(proj);
                    setProgress(15);
                  }}
                  className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                    selectedProject.id === proj.id
                      ? "border-pink-500 bg-pink-500/20 text-white"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <span className="font-mono text-[9px] text-pink-300 uppercase">
                    {proj.category}
                  </span>
                  <span className="font-semibold text-xs truncate w-full">
                    {proj.title}
                  </span>
                  <span className="font-mono text-[10px] text-white/50">
                    {proj.duration}
                  </span>
                </button>
              ))}
            </div>

            {/* Description footnote */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-slate-400">
              <p className="line-clamp-2 text-slate-300">
                {selectedProject.description}
              </p>
              <span className="font-mono text-[10px] text-white/50 shrink-0">
                Gear: {selectedProject.gear}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
