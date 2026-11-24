"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export type ParallaxMediaItem = {
  src: string;
  type?: "image" | "video";
  alt?: string;
  poster?: string;
};

export type DepthVariant = "default" | "edge-focus" | "scattered";

export interface ParallaxHeroImagesProps {
  images: Array<string | ParallaxMediaItem>;
  className?: string;
  imageClassName?: string;
  variant?: DepthVariant;
  maxOffset?: number;
}

type DepthTier = "deep" | "mid" | "foreground";

interface MediaSlotConfig {
  position: Pick<CSSProperties, "top" | "right" | "bottom" | "left">;
  sizeClass: string;
  depth: number;
  zIndex: number;
  rotate: number;
  tier: DepthTier;
}

interface NormalizedMediaItem {
  src: string;
  mediaType: "image" | "video";
  alt: string;
  poster?: string;
}

const SPRING_CONFIG = { damping: 25, stiffness: 120 } as const;

const TIER_STYLES: Record<
  DepthTier,
  {
    opacity: number;
    frameClass: string;
    recessScrimClass?: string;
  }
> = {
  deep: {
    opacity: 0.86,
    frameClass:
      "bg-[var(--bento-surface)]/80 ring-[var(--bento-border-soft)]/60 shadow-[0_6px_14px_-4px_var(--bento-shadow-color),0_2px_6px_-2px_rgba(15,23,42,0.10)]",
    recessScrimClass: "bg-[var(--bento-bg-primary)]/18",
  },
  mid: {
    opacity: 0.95,
    frameClass:
      "bg-[var(--bento-surface)]/90 ring-[var(--bento-border-soft)]/80 shadow-[0_12px_24px_-6px_var(--bento-shadow-color),0_4px_10px_-3px_rgba(15,23,42,0.14)]",
  },
  foreground: {
    opacity: 1,
    frameClass:
      "bg-[var(--bento-surface)] ring-[var(--bento-border-soft)] shadow-[0_20px_38px_-10px_var(--bento-shadow-color),0_10px_18px_-6px_rgba(15,23,42,0.22)]",
  },
};

const SCATTERED_SLOTS: readonly MediaSlotConfig[] = [
  // Deep plane (top-left edge bleed)
  {
    position: { top: "-6%", left: "-4%" },
    sizeClass: "w-24 h-16 sm:w-36 sm:h-24 md:w-44 md:h-28",
    depth: 0.27,
    zIndex: 2,
    rotate: -4,
    tier: "deep",
  },
  // Foreground plane (center-left hero tile overlapping deep edge)
  {
    position: { top: "18%", left: "7%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.85,
    zIndex: 9,
    rotate: 2.5,
    tier: "foreground",
  },
  // Mid plane (top-center-right edge bleed)
  {
    position: { top: "-8%", left: "45%" },
    sizeClass: "w-28 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32",
    depth: 0.52,
    zIndex: 5,
    rotate: -2.5,
    tier: "mid",
  },
  // Deep plane (center recessed portrait tile tucked behind surrounding planes)
  {
    position: { top: "26%", left: "38%" },
    sizeClass: "w-24 h-28 sm:w-32 sm:h-36 md:w-36 md:h-44",
    depth: 0.34,
    zIndex: 3,
    rotate: 4,
    tier: "deep",
  },
  // Foreground plane (large right-side tile bleeding past right frame)
  {
    position: { top: "15%", right: "-5%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-56 md:h-40",
    depth: 0.94,
    zIndex: 10,
    rotate: -3.5,
    tier: "foreground",
  },
  // Mid plane (bottom-left corner bleed)
  {
    position: { bottom: "-9%", left: "-4%" },
    sizeClass: "w-28 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32",
    depth: 0.58,
    zIndex: 6,
    rotate: 4.5,
    tier: "mid",
  },
  // Foreground plane (lower-center overlapping deep & mid layers)
  {
    position: { bottom: "4%", left: "30%" },
    sizeClass: "w-32 h-20 sm:w-44 sm:h-28 md:w-52 md:h-32",
    depth: 0.78,
    zIndex: 8,
    rotate: -2,
    tier: "foreground",
  },
  // Deep plane (bottom-right recessed edge bleed)
  {
    position: { bottom: "-6%", right: "13%" },
    sizeClass: "w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-28",
    depth: 0.31,
    zIndex: 2,
    rotate: 3,
    tier: "deep",
  },
];

const DEFAULT_SLOTS: readonly MediaSlotConfig[] = [
  {
    position: { top: "5%", left: "5%" },
    sizeClass: "w-28 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32",
    depth: 0.45,
    zIndex: 4,
    rotate: -3,
    tier: "mid",
  },
  {
    position: { top: "3%", left: "37%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.9,
    zIndex: 9,
    rotate: 1.5,
    tier: "foreground",
  },
  {
    position: { top: "6%", right: "5%" },
    sizeClass: "w-28 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32",
    depth: 0.5,
    zIndex: 5,
    rotate: 3,
    tier: "mid",
  },
  {
    position: { bottom: "6%", left: "6%" },
    sizeClass: "w-28 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32",
    depth: 0.55,
    zIndex: 5,
    rotate: 2.5,
    tier: "mid",
  },
  {
    position: { bottom: "3%", left: "36%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.85,
    zIndex: 8,
    rotate: -1.5,
    tier: "foreground",
  },
  {
    position: { bottom: "5%", right: "6%" },
    sizeClass: "w-24 h-16 sm:w-36 sm:h-24 md:w-44 md:h-28",
    depth: 0.4,
    zIndex: 3,
    rotate: -2.5,
    tier: "deep",
  },
];

const EDGE_FOCUS_SLOTS: readonly MediaSlotConfig[] = [
  {
    position: { top: "7%", left: "4%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.85,
    zIndex: 8,
    rotate: -3,
    tier: "foreground",
  },
  {
    position: { top: "5%", left: "38%" },
    sizeClass: "w-24 h-16 sm:w-36 sm:h-24 md:w-44 md:h-28",
    depth: 0.3,
    zIndex: 2,
    rotate: 1,
    tier: "deep",
  },
  {
    position: { top: "6%", right: "4%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.9,
    zIndex: 9,
    rotate: 3,
    tier: "foreground",
  },
  {
    position: { bottom: "7%", left: "5%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.8,
    zIndex: 8,
    rotate: 2.5,
    tier: "foreground",
  },
  {
    position: { bottom: "5%", left: "37%" },
    sizeClass: "w-24 h-16 sm:w-36 sm:h-24 md:w-44 md:h-28",
    depth: 0.35,
    zIndex: 3,
    rotate: -1.5,
    tier: "deep",
  },
  {
    position: { bottom: "6%", right: "5%" },
    sizeClass: "w-32 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36",
    depth: 0.85,
    zIndex: 9,
    rotate: -2.5,
    tier: "foreground",
  },
];

const SLOT_LAYOUTS: Record<DepthVariant, readonly MediaSlotConfig[]> = {
  scattered: SCATTERED_SLOTS,
  default: DEFAULT_SLOTS,
  "edge-focus": EDGE_FOCUS_SLOTS,
};

function isVideoUrl(src: string): boolean {
  const cleanUrl = src.split(/[?#]/)[0] ?? "";
  return /\.(mp4|webm|mov)$/i.test(cleanUrl);
}

function normalizeMediaItem(item: string | ParallaxMediaItem): NormalizedMediaItem {
  if (typeof item === "string") {
    return {
      src: item,
      mediaType: isVideoUrl(item) ? "video" : "image",
      alt: "",
    };
  }

  const isVideo =
    item.type === "video" || (item.type !== "image" && isVideoUrl(item.src));

  return {
    src: item.src,
    mediaType: isVideo ? "video" : "image",
    alt: item.alt ?? "",
    poster: item.poster,
  };
}

interface ParallaxMediaTileProps {
  item: NormalizedMediaItem;
  slot: MediaSlotConfig;
  index: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  maxOffset: number;
  shouldReduceMotion: boolean;
  imageClassName?: string;
}

function ParallaxMediaTile({
  item,
  slot,
  index,
  smoothX,
  smoothY,
  maxOffset,
  shouldReduceMotion,
  imageClassName,
}: ParallaxMediaTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tierStyles = TIER_STYLES[slot.tier];
  const offset = Math.max(0, maxOffset) * slot.depth;

  const parallaxX = useTransform(smoothX, [-1, 1], [-offset, offset]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-offset, offset]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || item.mediaType !== "video") {
      return;
    }

    videoEl.defaultMuted = true;
    videoEl.muted = true;

    let isInView = true;

    const syncPlayback = () => {
      if (shouldReduceMotion || document.hidden || !isInView) {
        videoEl.pause();
      } else {
        void videoEl.play().catch(() => {});
      }
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (entry) {
                isInView = entry.isIntersecting;
                syncPlayback();
              }
            },
            { threshold: 0.05 }
          )
        : null;

    if (observer) {
      observer.observe(videoEl);
    }

    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [item.mediaType, item.src, shouldReduceMotion]);

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0.15,
              scale: 0.94,
              rotate: slot.rotate,
              filter: "blur(6px)",
            }
      }
      animate={{
        opacity: tierStyles.opacity,
        scale: 1,
        rotate: slot.rotate,
        filter: shouldReduceMotion ? "none" : "blur(0px)",
      }}
      transition={
        shouldReduceMotion
          ? {
              opacity: { duration: 0.2, ease: "easeOut" },
              default: { duration: 0 },
            }
          : {
              duration: 0.48,
              delay: Math.min(index * 0.045, 0.32),
              ease: [0.16, 1, 0.3, 1],
            }
      }
      style={{
        ...slot.position,
        zIndex: slot.zIndex,
        x: shouldReduceMotion ? 0 : parallaxX,
        y: shouldReduceMotion ? 0 : parallaxY,
      }}
      className={cn(
        "pointer-events-none absolute select-none overflow-hidden rounded-xl ring-1 transition-shadow duration-700",
        slot.sizeClass,
        tierStyles.frameClass,
        imageClassName
      )}
    >
      {item.mediaType === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="pointer-events-none h-full w-full select-none object-cover"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none h-full w-full select-none object-cover"
        />
      )}

      {tierStyles.recessScrimClass ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0",
            tierStyles.recessScrimClass
          )}
        />
      ) : null}
    </motion.div>
  );
}

/**
 * 3D layered floating media portal supporting images and muted looping videos
 * across three parallax depth planes.
 */
export function ParallaxHeroImages({
  images,
  className,
  imageClassName,
  variant = "scattered",
  maxOffset = 30,
}: ParallaxHeroImagesProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReducedMotion);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    if (shouldReduceMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const viewportWidth = window.innerWidth || 1;
      const viewportHeight = window.innerHeight || 1;
      const normalizedX = (event.clientX / viewportWidth) * 2 - 1;
      const normalizedY = (event.clientY / viewportHeight) * 2 - 1;

      mouseX.set(Math.max(-1, Math.min(1, normalizedX)));
      mouseY.set(Math.max(-1, Math.min(1, normalizedY)));
    };

    const resetMouse = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", resetMouse);
    window.addEventListener("blur", resetMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", resetMouse);
      window.removeEventListener("blur", resetMouse);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  const visibleEntries = useMemo(() => {
    const slots = SLOT_LAYOUTS[variant] ?? SLOT_LAYOUTS.scattered;
    return images.slice(0, slots.length).map((entry, index) => ({
      item: normalizeMediaItem(entry),
      slot: slots[index],
    }));
  }, [images, variant]);

  return (
    <div
      className={cn(
        "pointer-events-none relative h-full w-full select-none overflow-hidden",
        className
      )}
    >
      {visibleEntries.map(({ item, slot }, index) => (
        <ParallaxMediaTile
          key={`${item.src}-${index}`}
          item={item}
          slot={slot}
          index={index}
          smoothX={smoothX}
          smoothY={smoothY}
          maxOffset={maxOffset}
          shouldReduceMotion={shouldReduceMotion}
          imageClassName={imageClassName}
        />
      ))}
    </div>
  );
}
