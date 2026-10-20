import Link from "next/link";

interface Quest {
  id: string;
  code: string;
  title: string;
  category: string;
  status: "COMPLETED" | "IN PROGRESS";
  level: string;
  summary: string;
  tags: string[];
}

const QUESTS: Quest[] = [
  {
    id: "quest-1",
    code: "Q-01",
    title: "Celestial Parallax Engine",
    category: "Graphics & UI",
    status: "COMPLETED",
    level: "LVL.45",
    summary:
      "Engineered multi-layer pixel sky rendering system with drifting clouds and dynamic camera whip-pan transitions.",
    tags: ["React 19", "Next.js", "Tailwind CSS", "Pixel Art"],
  },
  {
    id: "quest-2",
    code: "Q-02",
    title: "Chrono Citadel Portfolio",
    category: "Full Stack",
    status: "IN PROGRESS",
    level: "LVL.60",
    summary:
      "Interactive retro RPG personal terminal showcasing real-time character stats, quest achievements, and spellbooks.",
    tags: ["TypeScript", "Next.js", "App Router"],
  },
  {
    id: "quest-3",
    code: "Q-03",
    title: "Shadow Dungeon API",
    category: "Backend Architecture",
    status: "COMPLETED",
    level: "LVL.52",
    summary:
      "High-throughput microservices architecture delivering real-time inventory and matchmaking events.",
    tags: ["REST", "Node.js", "PostgreSQL"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-4 pb-8 border-b-2 border-border-bright/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 border border-border-bright bg-bg-surface px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-emerald-400 animate-pulse" />
            <span className="font-pixel text-[10px] text-text-accent">
              NIGHT PATROL // 02 PROJECTS
            </span>
          </div>

          <Link
            href="/"
            className="border-2 border-border-bright bg-bg-surface px-4 py-2 font-pixel text-xs text-text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:border-accent-primary hover:text-accent-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            ◀ RETURN TO HOME (SUNSET)
          </Link>
        </div>

        <div>
          <h1 className="font-pixel text-2xl leading-relaxed text-text-primary sm:text-3xl lg:text-4xl">
            ACTIVE <span className="text-accent-primary">QUEST LOG</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">
            Missions, deployed systems, and crafted digital artifacts under the
            midnight canopy.
          </p>
        </div>
      </div>

      {/* Quest Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {QUESTS.map((quest) => (
          <article
            key={quest.id}
            className="group relative flex flex-col justify-between border-2 border-border-bright bg-bg-surface/70 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs transition-all hover:border-accent-primary hover:-translate-y-1"
          >
            {/* Top metadata */}
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <span className="font-pixel text-[10px] text-accent-warm">
                  {quest.code}
                </span>
                <span
                  className={`font-pixel text-[9px] px-2 py-0.5 border ${
                    quest.status === "COMPLETED"
                      ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-400"
                      : "border-amber-500/60 bg-amber-950/40 text-amber-300"
                  }`}
                >
                  {quest.status}
                </span>
              </div>

              {/* Title & summary */}
              <h2 className="mt-4 font-pixel text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                {quest.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {quest.summary}
              </p>
            </div>

            {/* Bottom tags & stats */}
            <div className="mt-6 pt-4 border-t border-border/60">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {quest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border-bright bg-bg-deep/80 px-2 py-0.5 font-pixel text-[8px] text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between font-pixel text-[9px] text-text-accent">
                <span>{quest.category}</span>
                <span>{quest.level}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
