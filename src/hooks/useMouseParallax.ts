"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks pointer position and writes it as CSS custom properties (--mx, --my,
 * normalized -1..1) on the returned ref's element. Children read them via
 * `transform: translate(calc(var(--mx, 0) * <depth>px), calc(var(--my, 0) * <depth>px))`
 * with their own depth multiplier — no React re-renders on every mousemove.
 */
export function useMouseParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      el!.style.setProperty("--mx", x.toFixed(3));
      el!.style.setProperty("--my", y.toFixed(3));
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return ref;
}
