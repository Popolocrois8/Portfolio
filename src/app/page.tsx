"use client";

import { useState } from "react";
import { useSkyTheme } from "./components/pixel/SceneTransitionManager";
import WelcomeCard from "./components/bento/WelcomeCard";
import AtmosphereCard from "./components/bento/AtmosphereCard";
import VideographyCard from "./components/bento/VideographyCard";
import PhotographyCard from "./components/bento/PhotographyCard";
import ToolsGearCard from "./components/bento/ToolsGearCard";
import SocialsCard from "./components/bento/SocialsCard";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { activeTheme } = useSkyTheme();

  const isBrightSky = activeTheme === "day-blue" || activeTheme === "day-grey";

  const chromePillStyle = {
    backgroundColor: isBrightSky
      ? "rgba(244, 249, 255, 0.78)"
      : "rgba(15, 12, 28, 0.36)",
    borderColor: isBrightSky
      ? "var(--bento-border-soft)"
      : "rgba(255, 255, 255, 0.14)",
    textShadow: isBrightSky ? "none" : "0 1px 4px rgba(0, 0, 0, 0.4)",
  };

  return (
    <div className="relative min-h-screen px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Bento Grid Header / Micro Breadcrumb */}
      <header className="mb-14 sm:mb-20 flex items-center justify-between gap-4">
        <div
          style={chromePillStyle}
          className="flex items-center gap-3 rounded-full border px-3.5 py-1.5 backdrop-blur-sm transition-colors duration-700"
        >
          <div
            style={{
              backgroundColor: "var(--bento-accent)",
              boxShadow: "0 0 8px var(--bento-accent)",
            }}
            className="h-2 w-2 rounded-full animate-pulse transition-colors duration-700"
          />
          <span
            style={{ color: "var(--page-text)" }}
            className="font-mono text-xs uppercase tracking-widest font-medium transition-colors duration-700"
          >
            Aiman // Creative Archive &amp; Laboratory
          </span>
        </div>

        <div
          style={{
            ...chromePillStyle,
            color: "var(--page-text-muted)",
          }}
          className="hidden sm:flex items-center gap-4 rounded-full border px-3.5 py-1.5 font-mono text-[11px] backdrop-blur-sm transition-colors duration-700"
        >
          <span>SYSTEM: ONLINE</span>
          <span>PARALLAX DRIFT: ACTIVE</span>
          <span
            style={{
              backgroundColor: "var(--bento-pill-bg)",
              color: "var(--bento-pill-text)",
              borderColor: "var(--bento-border-soft)",
              textShadow: "none",
            }}
            className="rounded-full border px-2 py-0.5 font-semibold transition-colors duration-700"
          >
            v2.4.0
          </span>
        </div>
      </header>

      {/* Main 12-Column Responsive Bento Grid */}
      <div
        aria-label="Bento portfolio grid"
        className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5"
      >
        {/* Row 1: Big Welcome Card (8 cols) + Atmosphere Controller (4 cols) */}
        <section className="col-span-1 md:col-span-6 lg:col-span-8 flex flex-col">
          <WelcomeCard
            onOpenReel={() => setIsVideoModalOpen(true)}
            onOpenGallery={() => setIsPhotoModalOpen(true)}
          />
        </section>

        <section className="col-span-1 md:col-span-6 lg:col-span-4 flex flex-col">
          <AtmosphereCard />
        </section>

        {/* Row 2: Videography Works Card (6 cols) + Photography Projects Card (6 cols) */}
        <section className="col-span-1 md:col-span-6 lg:col-span-6 flex flex-col">
          <VideographyCard
            isModalOpen={isVideoModalOpen}
            onOpenModal={() => setIsVideoModalOpen(true)}
            onCloseModal={() => setIsVideoModalOpen(false)}
          />
        </section>

        <section className="col-span-1 md:col-span-6 lg:col-span-6 flex flex-col">
          <PhotographyCard
            isModalOpen={isPhotoModalOpen}
            onOpenModal={() => setIsPhotoModalOpen(true)}
            onCloseModal={() => setIsPhotoModalOpen(false)}
          />
        </section>

        {/* Row 3: Tools & Gear Stack (7 cols) + Socials & Connect (5 cols) */}
        <section className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col">
          <ToolsGearCard />
        </section>

        <section className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col">
          <SocialsCard />
        </section>
      </div>

      {/* Bento Footer */}
      <footer
        style={{
          borderColor: isBrightSky
            ? "color-mix(in srgb, var(--page-text) 20%, transparent)"
            : "rgba(255, 255, 255, 0.14)",
        }}
        className="mt-8 border-t pt-4 transition-colors duration-700"
      >
        <div
          style={{
            ...chromePillStyle,
            color: "var(--page-text-muted)",
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 font-mono text-[11px] backdrop-blur-sm transition-colors duration-700"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© 2026 AIMAN. ALL RIGHTS RESERVED.</span>
            <span>•</span>
            <span>CINEMATOGRAPHY · SHADERS · CODE</span>
          </div>

          <div className="flex items-center gap-3">
            <span>PIXEL BACKDROP ENGINE</span>
            <span>•</span>
            <span style={{ color: "var(--page-text)" }} className="font-medium">
              CRAFTED WITH PRECISION
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}