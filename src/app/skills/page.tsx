import Link from "next/link";

export default function SkillsPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 pb-8 border-b-2 border-border-bright/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 border border-border-bright bg-bg-surface px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-amber-400 animate-pulse" />
            <span className="font-pixel text-[10px] text-text-accent">
              GOLDEN HOUR // 03 SKILLS
            </span>
          </div>

          <Link
            href="/contact"
            className="border-2 border-border-bright bg-bg-surface px-4 py-2 font-pixel text-xs text-text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:border-accent-primary hover:text-accent-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            CONTACT GUILD ▶
          </Link>
        </div>

        <div>
          <h1 className="font-pixel text-2xl leading-relaxed text-text-primary sm:text-3xl lg:text-4xl">
            SKILL TREE & <span className="text-accent-primary">SPELLBOOK</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">
            Mastered technical disciplines under the burning afternoon orange horizon.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="border-2 border-border-bright bg-bg-surface/70 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs">
          <span className="font-pixel text-xs text-accent-warm">FRONTEND ARCANA</span>
          <ul className="mt-4 space-y-2 text-xs text-text-secondary">
            <li>• React 19 / Server Components</li>
            <li>• Next.js App Router Architecture</li>
            <li>• Tailwind CSS & Custom Themes</li>
            <li>• GPU Parallax & Speed Streaks</li>
          </ul>
        </div>

        <div className="border-2 border-border-bright bg-bg-surface/70 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs">
          <span className="font-pixel text-xs text-accent-primary">BACKEND SPELLS</span>
          <ul className="mt-4 space-y-2 text-xs text-text-secondary">
            <li>• Node.js & REST APIs</li>
            <li>• PostgreSQL & Relational Schemas</li>
            <li>• High-Throughput Microservices</li>
          </ul>
        </div>

        <div className="border-2 border-border-bright bg-bg-surface/70 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs">
          <span className="font-pixel text-xs text-accent-cool">CRAFT & TASTE</span>
          <ul className="mt-4 space-y-2 text-xs text-text-secondary">
            <li>• Pixel Art World-Building</li>
            <li>• Retro Sound Design & HUDs</li>
            <li>• Kinetic Typography & Motion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
