import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border-bright bg-bg-surface/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform active:scale-95"
        >
          {/* Pixel Avatar Box */}
          <div className="flex h-9 w-9 items-center justify-center border-2 border-border-bright bg-bg-deep font-pixel text-xs text-accent-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] group-hover:border-accent-primary">
            A
          </div>

          <div className="flex flex-col">
            <span className="font-pixel text-[11px] tracking-wider text-text-primary group-hover:text-accent-primary">
              Popolocrois8
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 animate-pulse" />
              <span className="font-pixel text-[8px] text-text-secondary">
                LVL.67 MAGE
              </span>
            </div>
          </div>
        </Link>
        <nav
          aria-label="Main Game Menu"
          className="hidden md:flex items-center gap-1"
        >
          <Link
            href="/about"
            className="group flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[10px] text-text-secondary transition-colors duration-100 hover:bg-bg-elevated hover:text-accent-primary"
          >
            <span className="text-accent-primary opacity-0 group-hover:opacity-100">
              &gt;
            </span>
            <span>01 // ABOUT</span>
          </Link>
          <Link
            href="/projects"
            className="group flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[10px] text-text-secondary transition-colors duration-100 hover:bg-bg-elevated hover:text-accent-primary"
          >
            <span className="text-accent-primary opacity-0 group-hover:opacity-100">
              &gt;
            </span>
            <span>02 // PROJECTS</span>
          </Link>
          <Link
            href="/skills"
            className="group flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[10px] text-text-secondary transition-colors duration-100 hover:bg-bg-elevated hover:text-accent-primary"
          >
            <span className="text-accent-primary opacity-0 group-hover:opacity-100">
              &gt;
            </span>
            <span>03 // SKILLS</span>
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[10px] text-text-secondary transition-colors duration-100 hover:bg-bg-elevated hover:text-accent-primary"
          >
            <span className="text-accent-primary opacity-0 group-hover:opacity-100">
              &gt;
            </span>
            <span>04 // CONTACT</span>
          </Link>
        </nav>
        {/* Right: HUD Mini Stat / CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 border border-border px-2.5 py-1 bg-bg-deep/60">
            <span className="font-pixel text-[9px] text-text-accent">HP</span>
            <div className="h-2 w-16 bg-bg-surface border border-border-bright p-[1px]">
              <div className="h-full w-full bg-accent-primary" />
            </div>
            <span className="font-pixel text-[8px] text-text-secondary">
              100%
            </span>
          </div>
          {/* Quick Action Button */}
          <Link
            href="/contact"
            className="border-2 border-accent-primary bg-accent-primary/10 px-3 py-1.5 font-pixel text-[9px] text-accent-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] transition-all hover:bg-accent-primary hover:text-bg-deep active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            START QUEST
          </Link>
        </div>
      </div>
    </header>
  );
}
