import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <section className="flex flex-col gap-6 lg:col-span-7">
          <div className="inline-flex w-fit items-center gap-2 border border-border-bright bg-bg-surface px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-accent-warm animate-pulse" />
            <span className="font-pixel text-[10px] text-text-accent">
              PLACEHOLDER
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-pixel text-2xl leading-relaxed text-text-primary sm:text-3xl lg:text-4xl">
              SOMETHING SOMETHING <br />
              I'M <span className="text-accent-primary">AIMAN</span>.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Im a bla bla bla
            </p>
          </div>

          {/* Quest CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/projects"
              className="border-2 border-accent-primary bg-accent-primary px-5 py-3 font-pixel text-xs text-bg-deep shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:bg-accent-primary/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              ▶ EXPLORE QUESTS
            </Link>

            <Link
              href="/about"
              className="border-2 border-border-bright bg-bg-surface px-5 py-3 font-pixel text-xs text-text-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:border-accent-primary hover:text-accent-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              CHARACTER STATS
            </Link>
          </div>
        </section>

        {/* Right Column: Game Scene Viewport Frame (5 cols) */}
        <section className="flex justify-center lg:col-span-5">
          <div className="relative aspect-square w-full max-w-[420px] border-4 border-border-bright bg-bg-surface/50 p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)]">
            {/* Inner CRT/Canvas Frame */}
            <div className="flex h-full w-full flex-col items-center justify-center border-2 border-dashed border-border-bright/60 bg-bg-deep/80 p-6 text-center">
              <span className="font-pixel text-xs text-text-accent animate-pulse">
                [ PIXEL SCENE CANVAS ]
              </span>
              <p className="mt-2 text-xs text-text-secondary">
                Parallax mountain & particle engine will mount here
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
