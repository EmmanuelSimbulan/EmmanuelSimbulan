"use client";

import type { RefObject } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface SkyLayerProps {
  rootRef?: RefObject<HTMLDivElement | null>;
  cloudsRef?: RefObject<HTMLDivElement | null>;
}

export function SkyLayer({ rootRef, cloudsRef }: SkyLayerProps) {
  const parallaxRef = useMouseParallax<HTMLDivElement>();

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 bg-[linear-gradient(180deg,#BFE6FA_0%,#E4F5FD_45%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#071523_0%,#0D2740_50%,#0A1C2B_100%)]"
      aria-hidden="true"
    >
      {/* Sun bloom / lens flare chain — drifts opposite the cursor, like a real flare */}
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ transform: "translate(calc(var(--mx, 0) * -14px), calc(var(--my, 0) * -14px))", transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div className="absolute top-[6%] right-[10%] w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(79,224,212,0.4)_35%,rgba(79,224,212,0)_70%)] dark:bg-[radial-gradient(circle,rgba(234,247,255,0.6)_0%,rgba(79,224,212,0.3)_35%,rgba(79,224,212,0)_70%)] blur-md" />
        {/* Diagonal glare streak through the bloom */}
        <div className="absolute top-[14%] right-[6%] w-[420px] h-[6px] rounded-full bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent rotate-[28deg] blur-[2px]" />
        <div className="absolute top-[13%] right-[22%] w-16 h-16 rounded-full bg-white/40 dark:bg-white/15 blur-sm" />
        <div className="absolute top-[19%] right-[30%] w-8 h-8 rounded-full bg-accent-light/40 blur-sm" />
        <div className="absolute top-[24%] right-[36%] w-4 h-4 rounded-full bg-white/50 dark:bg-white/20" />
        <div className="absolute top-[30%] right-[42%] w-2.5 h-2.5 rounded-full bg-accent-light/50" />
        <div className="absolute top-[35%] right-[47%] w-1.5 h-1.5 rounded-full bg-white/60 dark:bg-white/25" />
      </div>

      {/* Clouds — scroll parallax-driven */}
      <div ref={cloudsRef} className="absolute inset-0">
        <div className="absolute top-[15%] left-[8%] w-56 h-16 rounded-full bg-white/70 dark:bg-white/10 blur-xl" />
        <div className="absolute top-[22%] left-[18%] w-40 h-12 rounded-full bg-white/60 dark:bg-white/[0.08] blur-lg" />
        <div className="absolute top-[35%] left-[55%] w-72 h-20 rounded-full bg-white/60 dark:bg-white/[0.08] blur-xl" />
        <div className="absolute top-[42%] left-[68%] w-36 h-12 rounded-full bg-white/50 dark:bg-white/[0.06] blur-lg" />
        <div className="absolute top-[10%] left-[45%] w-44 h-14 rounded-full bg-white/55 dark:bg-white/[0.06] blur-lg" />
      </div>
    </div>
  );
}
