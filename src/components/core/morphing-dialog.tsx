"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type Transition,
  type Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

interface MorphingDialogContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MorphingDialogContext =
  React.createContext<MorphingDialogContextValue | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error(
      "useMorphingDialog must be used within a MorphingDialogProvider"
    );
  }
  return context;
}

export interface MorphingDialogProps {
  children: React.ReactNode;
  transition?: Transition;
}

export function MorphingDialog({ children, transition }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
    }),
    [isOpen, uniqueId]
  );

  const effectiveTransition: Transition = prefersReducedMotion
    ? { duration: 0.16, ease: "easeOut" }
    : (transition ?? {
        type: "spring",
        stiffness: 220,
        damping: 26,
        mass: 0.9,
      });

  return (
    <MorphingDialogContext.Provider value={contextValue}>
      <MotionConfig transition={effectiveTransition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

export interface MorphingDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
  ariaLabel,
}: MorphingDialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <motion.button
      ref={triggerRef}
      type="button"
      data-open={isOpen ? "true" : "false"}
      className={cn(
        "relative cursor-pointer bg-transparent text-left",
        isOpen && "pointer-events-none",
        className
      )}
      onClick={handleClick}
      style={style}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

export interface MorphingDialogContainerProps {
  children: React.ReactNode;
  className?: string;
}

const emptySubscribe = () => () => {};

export function MorphingDialogContainer({
  children,
  className,
}: MorphingDialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId, triggerRef } = useMorphingDialog();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isOpen) return;

    const triggerEl = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerEl?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-[90] bg-[#0b0812]/82 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pointer-events-none",
              className
            )}
          >
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export interface MorphingDialogContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: MorphingDialogContentProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      id={`motion-ui-morphing-dialog-content-${uniqueId}`}
      className={cn("pointer-events-auto relative overflow-visible", className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
      aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
}

export function MorphingDialogImage({
  src,
  alt,
  className,
  style,
  loading = "lazy",
}: MorphingDialogImageProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

export interface MorphingDialogVideoProps {
  src: string;
  poster?: string;
  ariaLabel: string;
  className?: string;
  style?: React.CSSProperties;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "none" | "metadata" | "auto";
}

export function MorphingDialogVideo({
  src,
  poster,
  ariaLabel,
  className,
  style,
  controls = false,
  autoPlay = false,
  muted = true,
  loop = true,
  preload = "metadata",
}: MorphingDialogVideoProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.video
      src={src}
      poster={poster}
      aria-label={ariaLabel}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      preload={preload}
      className={cn(className)}
      layoutId={`dialog-video-${uniqueId}`}
      style={style}
    />
  );
}

export interface MorphingDialogTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogTitle({
  children,
  className,
  style,
}: MorphingDialogTitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.h2
      id={`motion-ui-morphing-dialog-title-${uniqueId}`}
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.h2>
  );
}

export interface MorphingDialogSubtitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogSubtitle({
  children,
  className,
  style,
}: MorphingDialogSubtitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
}

export function MorphingDialogDescription({
  children,
  className,
  disableLayoutAnimation,
  variants,
}: MorphingDialogDescriptionProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`motion-ui-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogCloseProps {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
}

export function MorphingDialogClose({
  children,
  className,
  variants,
}: MorphingDialogCloseProps) {
  const { setIsOpen, uniqueId } = useMorphingDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn("cursor-pointer", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )}
    </motion.button>
  );
}
