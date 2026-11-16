"use client";

import { useSkyTheme } from "./components/pixel/SceneTransitionManager";
import WelcomeCard from "./components/bento/WelcomeCard";
import ProjectsCard from "./components/bento/ProjectsCard";
import SocialsCard from "./components/bento/SocialsCard";
import ToolsGearCard from "./components/bento/ToolsGearCard";
import InterestsCard from "./components/bento/InterestsCard";
import MediaShowcaseCard from "./components/bento/MediaShowcaseCard";

export default function Home() {
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
    <div className="relative min-h-screen px-4 pt-16 pb-8 sm:px-6 sm:pt-24 md:pt-36 xl:pt-44 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Main 12-Column Asymmetrical Interlocking Bento Grid */}
      <div
        aria-label="Bento portfolio grid"
        className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5"
      >
        <section className="col-span-1 md:col-span-6 lg:col-span-8 lg:row-span-2 flex flex-col">
          <WelcomeCard />
        </section>

        <section className="col-span-1 md:col-span-3 lg:col-span-4 lg:row-span-1 flex flex-col">
          <ProjectsCard />
        </section>

        <section className="col-span-1 md:col-span-3 lg:col-span-4 lg:row-span-2 flex flex-col">
          <SocialsCard />
        </section>

        <section className="col-span-1 md:col-span-6 lg:col-span-4 lg:row-span-3 flex flex-col">
          <ToolsGearCard />
        </section>

        <section className="col-span-1 md:col-span-6 lg:col-span-4 lg:row-span-1 flex flex-col">
          <InterestsCard />
        </section>

        <section className="col-span-1 md:col-span-6 lg:col-span-8 lg:row-span-2 flex flex-col">
          <MediaShowcaseCard />
        </section>
      </div>

      {/* Minimal Footer */}
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
          className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-2xl border px-4 py-2.5 font-mono text-[11px] backdrop-blur-sm transition-colors duration-700"
        >
          <span>© 2026 Aiman Haqeem. All rights reserved.</span>
          <span style={{ color: "var(--page-text)" }} className="font-medium">
            Junior AI/ML Engineer
          </span>
        </div>
      </footer>
    </div>
  );
}
