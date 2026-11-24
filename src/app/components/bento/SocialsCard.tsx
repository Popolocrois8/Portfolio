"use client";

type SocialId = "instagram" | "twitch" | "tiktok" | "youtube" | "linkedin";

interface SocialLink {
  id: SocialId;
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com",
  },
  {
    id: "twitch",
    name: "Twitch",
    url: "https://twitch.tv",
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://tiktok.com",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com",
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
    case "twitch":
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
          <path d="M21 2H3v16h5v4l4-4h5l4-4V2z" />
          <path d="M11 11V7" />
          <path d="M16 11V7" />
        </svg>
      );
    case "tiktok":
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
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
    case "linkedin":
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
          <rect width="18" height="18" x="3" y="3" rx="3" />
          <path d="M8 11v5" />
          <path d="M8 8v.01" />
          <path d="M12 16v-5" />
          <path d="M16 16v-3a2 2 0 0 0-4 0" />
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
  return (
    <div
      id="contact-card"
      className="bento-card bento-card-3 relative group flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-7 transition-colors duration-700"
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

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--bento-text)] transition-colors duration-700">
          Socials &amp; Connect
        </h3>

        {/* Social Links */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bento-surface group/link flex items-center justify-between rounded-xl border border-[var(--bento-border-soft)] bg-[var(--bento-surface)] p-3 transition-colors duration-300 hover:border-[var(--bento-accent)] hover:bg-[var(--bento-pill-bg)] ${
                index === SOCIAL_LINKS.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] text-[var(--bento-pill-text)] transition-colors duration-700 group-hover/link:bg-[var(--bento-accent-soft)]">
                  <SocialIcon id={link.id} />
                </span>
                <span className="truncate text-xs font-semibold text-[var(--bento-text)] group-hover/link:text-[var(--bento-pill-text)] transition-colors duration-300">
                  {link.name}
                </span>
              </div>
              <span className="shrink-0 text-[var(--bento-text-muted)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[var(--bento-accent)] transition-all duration-200">
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Plain selectable email */}
      <div className="mt-4 flex items-center gap-2.5 border-t border-[var(--bento-border-soft)] pt-3.5 transition-colors duration-700">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--bento-border-soft)] bg-[var(--bento-pill-bg)] text-[var(--bento-pill-text)] transition-colors duration-700">
          <svg
            className="h-3.5 w-3.5"
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
        <span className="select-all font-mono text-xs font-medium text-[var(--bento-text)] sm:text-sm transition-colors duration-700">
          manqeem88@gmail.com
        </span>
      </div>
    </div>
  );
}
