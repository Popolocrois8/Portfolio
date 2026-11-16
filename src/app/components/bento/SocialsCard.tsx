"use client";

import { useState } from "react";

type SocialId = "instagram" | "youtube" | "github" | "x";

interface SocialLink {
  id: SocialId;
  name: string;
  handle: string;
  url: string;
  badge: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@aiman.visuals",
    url: "https://instagram.com",
    badge: "Stills & Reels",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@aimanfilms",
    url: "https://youtube.com",
    badge: "4K Showreels",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "github.com/aiman",
    url: "https://github.com",
    badge: "Creative Code",
  },
  {
    id: "x",
    name: "X / Twitter",
    handle: "@aimantech",
    url: "https://x.com",
    badge: "Thoughts & WIPs",
  },
];

function SocialIcon({ id }: { id: SocialId }) {
  switch (id) {
    case "instagram":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <polygon points="10 9 16 12 10 15 10 9" />
        </svg>
      );
    case "github":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "x":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      );
  }
}

function ArrowUpRightIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function SocialsCard() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "hello@aiman.design";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      id="contact-card"
      className="bento-card bento-card-secondary relative group flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-7 transition-colors duration-700"
    >
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
        <div className="flex items-center justify-between gap-2">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider">
              Network &amp; Inquiries
            </span>
          </div>
          <span className="font-mono text-[10px] font-medium text-[var(--bento-text-muted)] transition-colors duration-700">
            Open for Q2/Q3 2026
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--bento-text)] transition-colors duration-700">
          Socials &amp; Connect
        </h3>
        <p className="mt-1 text-xs text-[var(--bento-text-muted)] leading-relaxed transition-colors duration-700">
          Open for freelance direction, cinematography assignments, creative tech consultations, and exhibition collaborations.
        </p>

        {/* Email Copy Hero Box */}
        <div className="bento-surface mt-4 rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-3.5 flex flex-wrap items-center justify-between gap-3 transition-colors duration-700">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-accent-soft)] text-[var(--bento-pill-text)] transition-colors duration-700">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--bento-text-muted)] transition-colors duration-700">
                Direct Inquiries
              </div>
              <div className="truncate font-mono text-xs sm:text-sm font-semibold text-[var(--bento-text)] transition-colors duration-700">
                {emailAddress}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs transition-colors duration-300 active:scale-95 ${
                copied
                  ? "border border-[var(--bento-accent)] bg-[var(--bento-accent-soft)] font-semibold text-[var(--bento-pill-text)]"
                  : "border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] font-medium text-[var(--bento-pill-text)] hover:bg-[var(--bento-accent-soft)]"
              }`}
            >
              {copied ? (
                <>
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
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
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
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[var(--bento-accent)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--bento-accent-text)] hover:opacity-90 transition-all active:scale-95"
            >
              <span>Send Mail</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Social Pills Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-surface group/link flex items-center justify-between rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-3 transition-colors duration-300 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-pill-bg)]"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] text-[var(--bento-pill-text)] transition-colors duration-700 group-hover/link:bg-[var(--bento-accent-soft)]">
                  <SocialIcon id={link.id} />
                </span>
                <div className="truncate">
                  <div className="text-xs font-semibold text-[var(--bento-text)] group-hover/link:text-[var(--bento-pill-text)] transition-colors duration-300">
                    {link.name}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--bento-text-muted)] truncate transition-colors duration-700">
                    {link.handle}
                  </div>
                </div>
              </div>
              <span className="shrink-0 text-[var(--bento-text-muted)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[var(--bento-accent)] transition-all duration-200">
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Status */}
      <div className="mt-5 flex items-center justify-between border-t border-[var(--bento-border-soft)] pt-3 font-mono text-[10px] text-[var(--bento-text-muted)] transition-colors duration-700">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          <span>Typical response: &lt; 24h</span>
        </span>
        <span>UTC+8 / UTC+9</span>
      </div>
    </div>
  );
}
