import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 pb-8 border-b-2 border-border-bright/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 border border-border-bright bg-bg-surface px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-blue-400 animate-pulse" />
            <span className="font-pixel text-[10px] text-text-accent">
              DAY PATROL // 01 ABOUT
            </span>
          </div>

          <Link
            href="/projects"
            className="border-2 border-border-bright bg-bg-surface px-4 py-2 font-pixel text-xs text-text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:border-accent-primary hover:text-accent-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            EXPLORE QUESTS (NIGHT) ▶
          </Link>
        </div>

        <div>
          <h1 className="font-pixel text-2xl leading-relaxed text-text-primary sm:text-3xl lg:text-4xl">
            CHARACTER <span className="text-accent-primary">STATS & LORE</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">
            Level 67 Mage specializing in high-agency frontend engineering, game UI design, and pixel graphics systems.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border-2 border-border-bright bg-bg-surface/70 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs">
          <h2 className="font-pixel text-sm text-accent-warm mb-3">[ CORE ATTRIBUTES ]</h2>
          <div className="space-y-2 text-xs text-text-secondary">
            <div className="flex justify-between border-b border-border/60 py-1">
              <span>AGILITY (Fast Render)</span>
              <span className="font-pixel text-text-primary">98 / 100</span>
            </div>
            <div className="flex justify-between border-b border-border/60 py-1">
              <span>INTELLIGENCE (Architecture)</span>
              <span className="font-pixel text-text-primary">95 / 100</span>
            </div>
            <div className="flex justify-between border-b border-border/60 py-1">
              <span>MANA (Motion Physics)</span>
              <span className="font-pixel text-text-primary">100 / 100</span>
            </div>
          </div>
        </div>

        <div className="border-2 border-border-bright bg-bg-surface/70 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs">
          <h2 className="font-pixel text-sm text-accent-primary mb-3">[ CURRENT LOCATION ]</h2>
          <p className="text-xs leading-relaxed text-text-secondary">
            Floating under the daytime azure canopy. Use the navigation menu above to travel to other biomes and time zones.
          </p>
        </div>
      </div>
    </div>
  );
}
