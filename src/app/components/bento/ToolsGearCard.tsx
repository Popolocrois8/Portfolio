"use client";

import { useState } from "react";

type SkillCategory = "software" | "media";

interface SkillEntry {
  name: string;
  category: SkillCategory;
  badge?: string;
  note?: string;
}

/**
 * Flat, easy-to-edit list of tools and skills.
 * Add a new object with category: "software" or "media" and it renders under that tab.
 */
const SKILLS_DATA: SkillEntry[] = [
  // Software
  { name: "Python", category: "software", badge: "AI & ML", note: "Model training and data pipelines" },
  { name: "PyTorch", category: "software", badge: "Deep Learning", note: "Neural networks and inference" },
  { name: "TypeScript", category: "software", badge: "Type-safe", note: "Strict structural typing" },
  { name: "Next.js", category: "software", badge: "Web", note: "App Router and React Server Components" },
  { name: "Tailwind CSS", category: "software", badge: "UI", note: "Utility-first design systems" },
  { name: "Git & GitHub", category: "software", note: "Version control and collaboration" },

  // Media
  { name: "DaVinci Resolve", category: "media", badge: "Grading", note: "Color grading and post-production" },
  { name: "Adobe Premiere Pro", category: "media", badge: "Editing", note: "Longform and shortform cuts" },
  { name: "Adobe Lightroom", category: "media", badge: "Photo", note: "Color matching and film presets" },
  { name: "OBS Studio", category: "media", badge: "Streaming", note: "Live broadcast scenes and audio" },
  { name: "Sony Alpha Mirrorless", category: "media", badge: "Camera", note: "Stills and 4K video capture" },
];

const TABS: { id: SkillCategory; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "media", label: "Media" },
];

export default function ToolsGearCard() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("software");

  const visibleSkills = SKILLS_DATA.filter(
    (entry) => entry.category === activeTab
  );

  return (
    <div className="bento-card bento-card-4 relative group flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors duration-700 md:p-7">
      {/* Decorative corner crosshairs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-[var(--bento-text-muted)] opacity-45 select-none transition-colors duration-700"
      >
        +
      </div>

      <div>
        {/* Header with 2-tab switcher */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--bento-text)] transition-colors duration-700">
            Tools and Skills
          </h3>

          <div
            role="tablist"
            aria-label="Filter tools and skills by category"
            className="bento-surface flex w-fit items-center gap-1 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-1 transition-colors duration-700"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer rounded-lg px-3 py-1 font-mono text-[11px] transition-colors duration-300 ${
                    isActive
                      ? "bg-[var(--bento-accent)] font-semibold text-[var(--bento-accent-text)] shadow-sm"
                      : "text-[var(--bento-text-muted)] hover:bg-[var(--bento-accent-soft)] hover:text-[var(--bento-text)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[var(--bento-text-muted)] transition-colors duration-700">
          Here are the things that I use to do the things that I do.
        </p>

        {/* Filtered Skill Pills */}
        <div
          role="tabpanel"
          aria-label={activeTab === "software" ? "Software tools" : "Media tools"}
          className="mt-5 flex flex-wrap gap-2"
        >
          {visibleSkills.map((item) => (
            <div
              key={item.name}
              title={item.note}
              className="bento-surface relative flex items-center gap-1.5 rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-3 py-1.5 text-xs font-medium text-[var(--bento-text)] transition-colors duration-300 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-pill-bg)]"
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="rounded-md border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[var(--bento-pill-text)] transition-colors duration-700">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
