"use client";

import { useId } from "react";

export type PanDirection = "right" | "left";

interface SpeedStreaksProps {
  direction?: PanDirection;
  className?: string;
}

// 5 clean, sparse, crisp streaks (1px-2px) that whip across in a single pass
const STREAK_DEFINITIONS = [
  { top: "18%", height: "2px", width: "220px", delay: 0, duration: 320, opacity: 0.9 },
  { top: "35%", height: "1px", width: "160px", delay: 40, duration: 280, opacity: 0.75 },
  { top: "52%", height: "2px", width: "300px", delay: 15, duration: 340, opacity: 0.85 },
  { top: "68%", height: "1px", width: "190px", delay: 50, duration: 290, opacity: 0.7 },
  { top: "84%", height: "2px", width: "240px", delay: 30, duration: 310, opacity: 0.8 },
] as const;

export default function SpeedStreaks({
  direction = "right",
  className = "",
}: SpeedStreaksProps) {
  const baseId = useId();
  const animationName =
    direction === "right" ? "streak-rush-left" : "streak-rush-right";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-30 overflow-hidden ${className}`}
    >
      {STREAK_DEFINITIONS.map((streak, index) => (
        <span
          key={`${baseId}-${index}`}
          className="absolute block bg-white pixelated"
          style={{
            top: streak.top,
            height: streak.height,
            width: streak.width,
            opacity: streak.opacity,
            animation: `${animationName} ${streak.duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${streak.delay}ms 1 forwards`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
