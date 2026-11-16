"use client";

import Image from "next/image";
import { useSkyTheme } from "../pixel/SceneTransitionManager";
import type { SkyThemeKey } from "../pixel/skyThemes";

const PORTRAIT_COMPLEMENT_COLORS: Record<SkyThemeKey, string> = {
  "day-blue": "#FB923C",
  "day-grey": "#FB923C",
  "afternoon-orange": "#38BDF8",
  "afternoon-warm": "#38BDF8",
  "sunset-pink": "#2DD4BF",
  afternoon: "#2DD4BF",
  "night-blue": "#FBBF24",
  "night-purple": "#FBBF24",
};

export default function WelcomeCard() {
  const { activeTheme, triggerPixelTransition } = useSkyTheme();
  const offsetColor = PORTRAIT_COMPLEMENT_COLORS[activeTheme] ?? "#2DD4BF";

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
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-6 pb-4 md:p-8">
          <div className="space-y-4">
            {/* Status badge */}
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
            </div>

            {/* Heading & Bio */}
            <div className="space-y-2">
              <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xl font-bold tracking-tight text-[var(--bento-text)] sm:text-3xl lg:text-4xl transition-colors duration-700">
                <span>Aiman Haqeem</span>
                <span className="font-mono text-sm font-medium text-[var(--bento-pill-text)] sm:text-base transition-colors duration-700">
                  Junior AI/ML Engineer
                </span>
              </h1>
              <p className="max-w-[38ch] text-sm leading-relaxed text-[var(--bento-text-muted)] sm:text-base transition-colors duration-700">
                Hey there, thanks for dropping by~ So hmm i suppose this is where i talk a little bit about myself huh? Let&apos;s see... I&apos;m currently a Junior AI/ML Engineer and im quite interested in AI and how they work. Aside from that i love photography and making/editing videos. Oh and i stream myself playing games sometimes.
              </p>
            </div>
          </div>

          {/* Action CTAs — clean text links anchored to bottom-left */}
          <div className="flex flex-col items-start gap-2 pt-1">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group/resume inline-flex cursor-pointer items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--bento-accent)] transition-opacity duration-200 hover:opacity-80 active:scale-95"
            >
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
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              <span className="group-hover/resume:underline underline-offset-4">
                Here&apos;s my resume if ur interested :)
              </span>
            </a>

            <button
              type="button"
              onClick={() => triggerPixelTransition("/about")}
              className="group/about inline-flex cursor-pointer items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bento-text)] transition-colors duration-200 hover:text-[var(--bento-accent)] active:scale-95"
            >
              <span className="group-hover/about:underline underline-offset-4">
                wanna know more about little old me ? (⸝⸝- ̫ -⸝⸝)
              </span>
              <svg
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/about:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column Spacer on desktop so text doesn't overlap the absolute portrait */}
        <div
          aria-hidden="true"
          className="hidden md:block shrink-0 md:w-[270px] lg:w-[320px] xl:w-[340px]"
        />
      </div>

      {/* Pop-out Cutout Portrait (does not stretch card height on md+) */}
      <div
        className="relative z-20 pointer-events-none flex justify-center -mt-4 sm:-mt-6 md:mt-0 md:absolute md:inset-0"
        style={{
          clipPath: "inset(-300px 0px 1.5px -60px round 0px 0px 1rem 0px)",
        }}
      >
        <div className="relative -mb-4 md:mb-0 md:absolute md:-bottom-4 md:-right-4 lg:-right-6 w-64 sm:w-72 md:w-[350px] lg:w-[410px] xl:w-[445px] max-w-none">
          {/* Offset silhouette highlight behind the portrait on card hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 translate-x-0 translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-95 group-hover:-translate-x-3.5 group-hover:-translate-y-1.5"
            style={{
              backgroundColor: offsetColor,
              WebkitMaskImage: "url('/images/aiman-portrait.png')",
              maskImage: "url('/images/aiman-portrait.png')",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
          <Image
            src="/images/aiman-portrait.png"
            alt="Aiman Haqeem — Junior AI/ML Engineer"
            width={1600}
            height={2400}
            preload
            sizes="(max-width: 768px) 288px, (max-width: 1024px) 350px, (max-width: 1280px) 410px, 445px"
            className="relative z-10 pointer-events-none select-none h-auto w-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 drop-shadow-[0_14px_24px_rgba(15,23,42,0.22)]"
          />
        </div>
      </div>
    </div>
  );
}
