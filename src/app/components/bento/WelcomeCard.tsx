"use client";

import Image from "next/image";

interface WelcomeCardProps {
  onOpenReel?: () => void;
  onOpenGallery?: () => void;
}

export default function WelcomeCard({ onOpenReel, onOpenGallery }: WelcomeCardProps) {
  return (
    <div className="relative group flex h-full flex-col justify-between overflow-visible">
      {/* Inner card background layer: holds pastel surface, border, and clipped decorative shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bento-card bento-card-primary"
      >
        {/* Subtle decorative pastel shapes inside the card */}
        <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full bg-[var(--bento-bg-secondary)] opacity-75 transition-colors duration-700" />
        <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[var(--bento-accent-soft)] opacity-65 transition-colors duration-700" />
        <div className="absolute right-10 bottom-6 h-48 w-48 rounded-full border border-[var(--bento-border-soft)] opacity-45 transition-colors duration-700" />

        {/* Decorative corner crosshairs */}
        <div className="absolute left-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700">
          +
        </div>
        <div className="absolute right-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700">
          +
        </div>
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700">
          +
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700">
          +
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-2 md:flex-row md:items-stretch md:gap-4">
        {/* Left Column: Greeting, Role & Bio */}
        <div className="relative z-10 flex flex-1 flex-col justify-center space-y-4 p-6 pb-2 md:p-8">
          {/* Status badge & location */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-3 py-1 text-xs text-[var(--bento-text)] transition-colors duration-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span className="font-mono text-[11px] font-medium tracking-wide">
                Available for projects
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--bento-pill-text)] transition-colors duration-700">
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Kuala Lumpur / Tokyo / Remote</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--bento-text)] sm:text-3xl lg:text-4xl transition-colors duration-700">
              Aiman
              <span className="ml-3 font-mono text-sm font-medium text-[var(--bento-pill-text)] sm:text-base transition-colors duration-700">
                {"// Creative Technologist, Videographer & Visual Artist"}
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--bento-text-muted)] sm:text-base transition-colors duration-700">
              Crafting high-fidelity digital artifacts at the intersection of cinema, tactile web code, and analog aesthetics. Specializing in narrative cinematography, commercial direction, shader graphics, and interactive craft.
            </p>
          </div>

          {/* Micro Telemetry & Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            <span className="rounded-md border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2 py-0.5 text-[var(--bento-pill-text)] transition-colors duration-700">
              4K 24FPS DCI
            </span>
            <span className="rounded-md border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2 py-0.5 text-[var(--bento-pill-text)] transition-colors duration-700">
              S-Log3 · DaVinci Wide Gamut
            </span>
            <span className="rounded-md border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2 py-0.5 text-[var(--bento-pill-text)] transition-colors duration-700">
              React 19 · WebGL
            </span>
            <span className="rounded-md border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2 py-0.5 text-[var(--bento-pill-text)] transition-colors duration-700">
              Analog 35mm
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenReel}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--bento-accent)] px-4 py-2.5 text-xs font-semibold text-[var(--bento-accent-text)] shadow-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            >
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span>Play Showreel</span>
              <span className="font-mono text-[10px] opacity-85">(02:45)</span>
            </button>

            <button
              type="button"
              onClick={onOpenGallery}
              className="bento-surface inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-4 py-2.5 text-xs font-medium text-[var(--bento-text)] transition-all duration-200 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-pill-bg)] active:scale-95"
            >
              <span>View Photo Series</span>
              <span className="font-mono text-[10px] font-semibold text-[var(--bento-pill-text)]">
                48 frames
              </span>
            </button>

            <a
              href="#contact-card"
              className="inline-flex items-center gap-1.5 rounded-xl border border-transparent px-3 py-2 text-xs font-medium text-[var(--bento-text-muted)] transition-colors hover:bg-[var(--bento-accent-soft)] hover:text-[var(--bento-text)]"
            >
              <span>Connect</span>
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Pop-out Cutout Portrait */}
        <div className="relative z-10 self-center md:self-end shrink-0 md:w-[248px] lg:w-[285px] xl:w-[310px]">
          <div
            className="relative flex justify-center md:justify-end -mt-4 sm:-mt-6 md:-mt-36 xl:-mt-40"
            style={{
              clipPath: "inset(-220px 0px 1.5px -40px round 0px 0px 1rem 0px)",
            }}
          >
            <Image
              src="/images/aiman-portrait.png"
              alt="Aiman — Creative Technologist, Videographer & Visual Artist"
              width={1600}
              height={2400}
              preload
              sizes="(max-width: 768px) 256px, (max-width: 1280px) 384px, 396px"
              className="pointer-events-none select-none h-auto w-60 sm:w-64 md:w-[312px] lg:w-[384px] xl:w-[396px] max-w-none md:-mr-4 lg:-mr-6 drop-shadow-[0_14px_24px_rgba(15,23,42,0.22)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
