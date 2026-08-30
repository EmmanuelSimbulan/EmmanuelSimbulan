"use client";

import { useMouseParallax } from "@/hooks/useMouseParallax";

interface BubbleSpec {
  size: number;
  top: string;
  left: string;
  delay: string;
  depth: number;
}

const bubbles: BubbleSpec[] = [
  { size: 36, top: "28%", left: "14%", delay: "", depth: 18 },
  { size: 22, top: "48%", left: "8%", delay: "animate-float-delay-2", depth: 10 },
  { size: 54, top: "62%", left: "22%", delay: "animate-float-delay-4", depth: 26 },
  { size: 18, top: "20%", left: "78%", delay: "animate-float-delay-2", depth: -12 },
  { size: 30, top: "58%", left: "85%", delay: "", depth: -20 },
  { size: 44, top: "38%", left: "90%", delay: "animate-float-delay-4", depth: -24 },
  { size: 16, top: "72%", left: "60%", delay: "animate-float-delay-2", depth: 8 },
  { size: 26, top: "10%", left: "32%", delay: "animate-float-delay-4", depth: 14 },
  { size: 14, top: "82%", left: "12%", delay: "", depth: -8 },
  { size: 48, top: "14%", left: "52%", delay: "animate-float-delay-2", depth: -18 },
  { size: 20, top: "34%", left: "42%", delay: "", depth: 12 },
  { size: 32, top: "78%", left: "38%", delay: "animate-float-delay-4", depth: -16 },
  { size: 12, top: "50%", left: "68%", delay: "animate-float-delay-2", depth: 6 },
  { size: 24, top: "88%", left: "72%", delay: "", depth: -10 },
  { size: 40, top: "6%", left: "8%", delay: "animate-float-delay-4", depth: 22 },
  { size: 16, top: "66%", left: "94%", delay: "animate-float-delay-2", depth: -14 },
];

interface BubblesProps {
  animated?: boolean;
}

export function Bubbles({ animated = true }: BubblesProps) {
  const parallaxRef = useMouseParallax<HTMLDivElement>();

  return (
    <div ref={parallaxRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={
            animated
              ? {
                  top: b.top,
                  left: b.left,
                  transform: `translate(calc(var(--mx, 0) * ${b.depth}px), calc(var(--my, 0) * ${b.depth}px))`,
                  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }
              : { top: b.top, left: b.left }
          }
        >
          <div
            className={`relative rounded-full ${animated ? `animate-float ${b.delay}` : ""}`}
            style={{
              width: b.size,
              height: b.size,
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.25) 22%, rgba(79,224,212,0.15) 55%, rgba(79,224,212,0.05) 100%)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 2px 8px rgba(30,167,232,0.15)",
            }}
          >
            <div
              className="absolute rounded-full bg-white/80"
              style={{
                width: b.size * 0.28,
                height: b.size * 0.16,
                top: b.size * 0.18,
                left: b.size * 0.22,
                transform: "rotate(-30deg)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
