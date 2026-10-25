import React, { ReactNode } from "react";

export interface HangingRopeSignProps {
  children: ReactNode;
  /** Visual board theme: 'wood' or 'cream' */
  variant?: "wood" | "cream";
  /** Height of the hanging ropes in pixels from the top of the header */
  ropeHeight?: number;
  /** Distance of the ropes from the left and right edges in pixels */
  ropeInset?: number;
  /** Additional container styling */
  className?: string;
  /** Additional inner signboard styling */
  boardClassName?: string;
  /** Whether the sign reacts with a gentle hover sway */
  isInteractive?: boolean;
}

/**
 * HangingRopeSign
 * A pixel-perfect hanging tavern/quest signboard supported by twin retro ropes.
 * Uses 9-slice border-image scaling so the signboard cleanly fits any content width/height
 * while preserving authentic pixel art corners and wooden borders.
 */
export default function HangingRopeSign({
  children,
  variant = "wood",
  ropeHeight = 22,
  ropeInset = 14,
  className = "",
  boardClassName = "",
  isInteractive = true,
}: HangingRopeSignProps) {
  const boardImage =
    variant === "cream"
      ? "/assets/containers/board_cream.png"
      : "/assets/containers/board_wood.png";

  return (
    <div
      className={`group relative flex flex-col items-center select-none pointer-events-auto ${className}`}
      style={{ paddingTop: `${ropeHeight}px` }}
    >
      {/* Left Hanging Rope */}
      <span
        aria-hidden="true"
        className="absolute top-0 block pixelated pointer-events-none"
        style={{
          left: `${ropeInset}px`,
          width: "10px",
          height: `${ropeHeight + 4}px`,
          backgroundImage: "url(/assets/containers/rope_segment.png)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "10px auto",
          zIndex: 0,
        }}
      />

      {/* Right Hanging Rope */}
      <span
        aria-hidden="true"
        className="absolute top-0 block pixelated pointer-events-none"
        style={{
          right: `${ropeInset}px`,
          width: "10px",
          height: `${ropeHeight + 4}px`,
          backgroundImage: "url(/assets/containers/rope_segment.png)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "10px auto",
          zIndex: 0,
        }}
      />

      {/* Main Wooden Signboard (9-slice container) */}
      <div
        className={`relative z-10 w-full transition-transform duration-150 pixelated ${
          isInteractive
            ? "hover:-translate-y-0.5 active:translate-y-0.5"
            : ""
        } ${boardClassName}`}
        style={{
          borderStyle: "solid",
          borderWidth: "22px 10px 10px 10px",
          borderImageSource: `url(${boardImage})`,
          borderImageSlice: "14 6 6 6 fill",
          borderImageRepeat: "repeat",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="text-[#3b1d0e]">{children}</div>
      </div>
    </div>
  );
}
