// Single source of truth for the cinematic intro's timing, breakpoints, and copy.
// Tweak values here without touching the scroll-driving logic in CinematicIntro.tsx.

export const introConfig = {
  /** Total scroll distance the pinned sequence consumes, in viewport heights. */
  sequenceVh: 450,

  /** GSAP ScrollTrigger scrub smoothing (seconds of catch-up lag; 1 feels cinematic, true = instant). */
  scrub: 1,

  /** Below this width, skip the scroll-jack entirely and render the static fallback. Matches the
   *  site's existing mobile/desktop breakpoint (see Navbar.tsx's md: usage). */
  mobileBreakpointPx: 768,

  /** Progress (0–1) ranges for each phase of the sequence. */
  phases: {
    approach: [0, 0.35] as [number, number],
    facade: [0.35, 0.62] as [number, number],
    interior: [0.62, 1] as [number, number],
  },

  copy: {
    scrollHint: "Scroll to enter",
    introGreeting: "Hi, I'm",
    introTagline: "Business Analyst & Software Engineer",
  },
};

export type IntroPhase = keyof typeof introConfig.phases;
