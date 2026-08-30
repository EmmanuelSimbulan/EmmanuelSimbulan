"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { introConfig } from "./intro.config";
import { SkyLayer } from "./SkyLayer";
import { MountainLayer } from "./MountainLayer";
import { Walkway } from "./Walkway";
import { BuildingLayer } from "./BuildingLayer";
import { InteriorSection } from "./InteriorSection";
import { Bubbles } from "./Bubbles";
import { SkyFish } from "./SkyFish";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicIntroProps {
  lenis: Lenis | null;
}

function useIsMobile(breakpointPx: number) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    // Synchronizing with the browser's matchMedia API, not derived from render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpointPx]);

  return isMobile;
}

function IntroLabel() {
  return (
    <div className="absolute inset-x-0 top-[12%] sm:top-[15%] flex flex-col items-center text-center px-6">
      <p className="text-xs sm:text-sm uppercase tracking-widest text-text-secondary mb-2">
        {introConfig.copy.introGreeting}
      </p>
      <h1 className="text-gradient font-[800] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="mt-3 text-sm sm:text-base text-text-secondary">
        {introConfig.copy.introTagline}
      </p>
    </div>
  );
}

function ScrollHint({ bounce = true }: { bounce?: boolean }) {
  return (
    <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1.5 text-text-secondary">
      <span className="text-[10px] sm:text-[11px] uppercase tracking-widest">
        {introConfig.copy.scrollHint}
      </span>
      <div className="w-5 h-8 rounded-full border border-current/40 flex items-start justify-center p-1">
        <div className={`w-1 h-1.5 rounded-full bg-current ${bounce ? "animate-bounce" : ""}`} />
      </div>
    </div>
  );
}

export function CinematicIntro({ lenis }: CinematicIntroProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(introConfig.mobileBreakpointPx);
  const skipAnimation = reducedMotion || isMobile;

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const walkwayRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const buildingGlowRef = useRef<SVGGElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const interiorGlowRef = useRef<HTMLDivElement>(null);
  const interiorWallsRef = useRef<HTMLDivElement>(null);
  const interiorFloorRef = useRef<HTMLDivElement>(null);
  const introLabelRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (skipAnimation || !lenis) return;
    if (!containerRef.current || !stageRef.current) return;

    // Keep ScrollTrigger's pin/progress calculations in sync with Lenis's
    // virtual scroll position — without this the pin fights Lenis and jitters.
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const [approachStart, approachEnd] = introConfig.phases.approach;
    const [facadeStart, facadeEnd] = introConfig.phases.facade;
    const [interiorStart, interiorEnd] = introConfig.phases.interior;

    const ctx = gsap.context(() => {
      // Ground group: mountain, walkway, and buildings all live inside this one wrapper
      // and share a single scale — so the grass and the buildings zoom together as one
      // rigid image with the camera, instead of drifting apart on separate transforms.
      gsap.set(groundRef.current, { scale: 1, transformOrigin: "50% 100%" });
      gsap.set(mountainRef.current, { opacity: 1 });
      gsap.set(walkwayRef.current, { opacity: 1 });
      gsap.set(buildingRef.current, { scale: 0.75, transformOrigin: "50% 100%" });
      gsap.set(buildingGlowRef.current, { opacity: 0.25 });
      gsap.set(washRef.current, { opacity: 0 });
      gsap.set(interiorRef.current, { opacity: 0 });
      gsap.set(interiorGlowRef.current, { scale: 0.65, opacity: 0.5, transformOrigin: "50% 50%" });
      gsap.set(interiorWallsRef.current, { scaleX: 0.55, transformOrigin: "50% 50%" });
      gsap.set(interiorFloorRef.current, { scaleY: 0.4, transformOrigin: "50% 100%" });
      gsap.set(introLabelRef.current, { opacity: 1 });
      gsap.set(bubblesRef.current, { opacity: 1 });
      gsap.set(hintRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: introConfig.scrub,
          pin: stageRef.current,
          anticipatePin: 1,
        },
      });

      // Intro label, bubbles + scroll hint fade almost immediately once the user starts scrolling
      tl.to(introLabelRef.current, { opacity: 0, duration: 0.12, ease: "none" }, 0);
      tl.to(bubblesRef.current, { opacity: 0, duration: 0.15, ease: "none" }, 0);
      tl.to(hintRef.current, { opacity: 0, duration: 0.06 }, 0);

      // Continuous cloud parallax drift across the whole sequence
      tl.to(cloudsRef.current, { x: "-12%", duration: 1, ease: "none" }, 0);

      // Phase: approach — the whole ground (grass + walkway + buildings) zooms forward
      // together as one image, like the camera dollying toward the scene, so nothing
      // drifts relative to anything else. Mountain fades near the end to make room.
      tl.to(groundRef.current, { scale: 1.9, duration: approachEnd - approachStart, ease: "none" }, approachStart);
      tl.to(mountainRef.current, { opacity: 0, duration: 0.15, ease: "none" }, approachEnd - 0.1);

      // Phase: facade — walkway has been "walked" to its end and fades; only now does the
      // building get its own extra scale (mountain is gone, so nothing to drift against)
      // as it fills the screen, windows light up, glass wash sells the pass-through
      tl.to(walkwayRef.current, { opacity: 0, duration: 0.15, ease: "none" }, facadeStart);
      tl.to(buildingRef.current, { scale: 4, duration: facadeEnd - facadeStart, ease: "none" }, facadeStart);
      tl.to(buildingGlowRef.current, { opacity: 1, duration: facadeEnd - facadeStart, ease: "none" }, facadeStart);
      tl.to(washRef.current, { opacity: 1, duration: 0.12, ease: "none" }, facadeEnd - 0.1);

      // Phase: interior — wash clears, then walking-forward parallax: walls spread apart,
      // the glow ahead grows nearer, the floor stretches out underfoot. Being scrubbed to
      // scroll, this reverses cleanly if the user scrolls back up — walking back out.
      tl.to(washRef.current, { opacity: 0, duration: 0.18, ease: "none" }, interiorStart + 0.02);
      tl.to(interiorRef.current, { opacity: 1, duration: 0.2, ease: "none" }, interiorStart);
      tl.to(interiorWallsRef.current, { scaleX: 1.7, duration: interiorEnd - interiorStart, ease: "none" }, interiorStart);
      tl.to(interiorGlowRef.current, { scale: 1.5, opacity: 1, duration: interiorEnd - interiorStart, ease: "none" }, interiorStart);
      tl.to(interiorFloorRef.current, { scaleY: 1.6, duration: interiorEnd - interiorStart, ease: "none" }, interiorStart);
    }, containerRef);

    return () => {
      lenis.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, [skipAnimation, lenis]);

  if (skipAnimation) {
    return (
      <div className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>
        <SkyLayer />
        {!reducedMotion && <SkyFish />}
        <Bubbles animated={!reducedMotion} />
        <MountainLayer />
        <Walkway />
        <BuildingLayer />
        <IntroLabel />
        <ScrollHint bounce={!reducedMotion} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${introConfig.sequenceVh}vh` }}>
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
        <SkyLayer cloudsRef={cloudsRef} />
        <SkyFish />
        <div ref={bubblesRef}>
          <Bubbles />
        </div>
        <div ref={groundRef} className="absolute inset-0">
          <MountainLayer rootRef={mountainRef} />
          <Walkway rootRef={walkwayRef} />
          <BuildingLayer rootRef={buildingRef} glowRef={buildingGlowRef} />
        </div>

        {/* Full-bleed glass wash — fades in to sell "passing through the facade" */}
        <div
          ref={washRef}
          className="pointer-events-none absolute inset-0 opacity-0 bg-white dark:bg-[#EAF7FF]"
        />

        <InteriorSection
          rootRef={interiorRef}
          glowRef={interiorGlowRef}
          wallsRef={interiorWallsRef}
          floorRef={interiorFloorRef}
        />

        <div ref={introLabelRef}>
          <IntroLabel />
        </div>

        <div ref={hintRef}>
          <ScrollHint />
        </div>
      </div>
    </div>
  );
}
