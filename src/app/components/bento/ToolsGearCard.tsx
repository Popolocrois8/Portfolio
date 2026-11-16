"use client";

import { useState } from "react";

type CategoryId = "video" | "photo" | "tech";
type FilterId = "all" | CategoryId;

interface ToolItem {
  name: string;
  badge?: string;
  note?: string;
}

interface ToolCategory {
  id: CategoryId;
  title: string;
  items: ToolItem[];
}

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "video", label: "Video" },
  { id: "photo", label: "Photo" },
  { id: "tech", label: "Tech" },
];

const CATEGORIES: ToolCategory[] = [
  {
    id: "video",
    title: "Videography & Motion",
    items: [
      { name: "Sony FX3 / A7SIII", badge: "Primary Cinema", note: "10-bit 4:2:2 DCI 4K" },
      { name: "DaVinci Resolve Studio", badge: "Grading", note: "Color science & Fusion" },
      { name: "Adobe Premiere Pro", badge: "Editing", note: "Longform & Commercial assembly" },
      { name: "Cine Primes & Anamorphics", badge: "Glass", note: "1.33x / 1.6x squeezed flares" },
      { name: "DJI RS3 Pro & Wireless Follow Focus", note: "Stabilized handheld rigs" },
      { name: "RØDE / Sennheiser Audio", note: "Dual-system 32-bit float" },
    ],
  },
  {
    id: "photo",
    title: "Photography & Stills",
    items: [
      { name: "Adobe Lightroom Classic", badge: "Archive", note: "Color matching & film curves" },
      { name: "35mm & Medium Format", badge: "Film", note: "Portra 400 · Kodak Tri-X 400" },
      { name: "Custom Color Grading & LUTs", badge: "Styling", note: "Halation & grain curves" },
      { name: "Fujifilm X & Leica M Mount", note: "Tactile rangefinder workflow" },
      { name: "High-Res Flatbed Scanning", note: "Epson V850 4800dpi lab scans" },
    ],
  },
  {
    id: "tech",
    title: "Web & Creative Tech",
    items: [
      { name: "Next.js 16 (App Router)", badge: "Core", note: "React Server Components" },
      { name: "TypeScript", badge: "Type-safe", note: "Strict structural typing" },
      { name: "Tailwind CSS & PostCSS", badge: "Design System", note: "Modern utility tokens" },
      { name: "GLSL & Canvas Shaders", badge: "Graphics", note: "Fragment / Vertex pipelines" },
      { name: "WebGL / Three.js", note: "Interactive 3D scenes" },
      { name: "Web Audio API", note: "Interactive procedural sound" },
    ],
  },
];

function CategoryIcon({ id }: { id: CategoryId }) {
  if (id === "video") {
    return (
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
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    );
  }

  if (id === "photo") {
    return (
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
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    );
  }

  return (
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
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export default function ToolsGearCard() {
  const [selectedCategory, setSelectedCategory] = useState<FilterId>("all");

  const filteredCategories =
    selectedCategory === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="bento-card bento-card-primary relative group flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-7 transition-colors duration-700">
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
        {/* Header with category switcher */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] px-2.5 py-1 text-xs text-[var(--bento-pill-text)] transition-colors duration-700">
              <svg
                className="h-3 w-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
                <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
              </svg>
              <span className="font-mono text-[11px] font-medium uppercase tracking-wider">
                Arsenal &amp; Stack
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--bento-text)] transition-colors duration-700">
              Tools &amp; Gear Stack
            </h3>
          </div>

          {/* Quick tab filter */}
          <div
            role="group"
            aria-label="Filter tools by category"
            className="bento-surface flex items-center gap-1 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-1 transition-colors duration-700"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors duration-300 ${
                    isActive
                      ? "bg-[var(--bento-accent)] text-[var(--bento-accent-text)] font-semibold shadow-sm"
                      : "text-[var(--bento-text-muted)] hover:bg-[var(--bento-accent-soft)] hover:text-[var(--bento-text)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-2 text-xs text-[var(--bento-text-muted)] leading-relaxed transition-colors duration-700">
          Production gear and modern development pipelines used across on-set filming, post-production color mastering, and interactive visual computing.
        </p>

        {/* Categorized Pill Groups */}
        <div className="mt-5 space-y-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--bento-accent-soft)] text-[var(--bento-pill-text)] transition-colors duration-700">
                  <CategoryIcon id={category.id} />
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--bento-text)] uppercase tracking-wider transition-colors duration-700">
                  {category.title}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    title={item.note}
                    className="bento-surface group/pill relative flex items-center gap-1.5 rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] px-3 py-1.5 text-xs font-medium text-[var(--bento-text)] transition-colors duration-300 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-pill-bg)]"
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
          ))}
        </div>
      </div>

      {/* Footer metadata */}
      <div className="mt-5 flex items-center justify-between border-t border-[var(--bento-border-soft)] pt-3 font-mono text-[10px] text-[var(--bento-text-muted)] transition-colors duration-700">
        <span>Hardware calibrated: calibrated Rec.709 &amp; DCI-P3</span>
        <span>Tokyo / KL Kits Ready</span>
      </div>
    </div>
  );
}
