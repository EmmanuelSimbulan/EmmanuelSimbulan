import type { RefObject } from "react";

type RoofStyle = "antenna" | "setback" | "spire";

interface BuildingSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  roof: RoofStyle;
  cols: number;
  rows: number;
  tint: "accent" | "accent-light";
}

interface BuildingLayerProps {
  rootRef?: RefObject<HTMLDivElement | null>;
  glowRef?: RefObject<SVGGElement | null>;
}

// Index 3 is the hero tower the camera flies toward — everything else is
// deliberately irregular in width/height/roofline/base so the cluster reads
// as an organic skyline rather than a neat, evenly-tapered row.
const buildings: BuildingSpec[] = [
  { x: 10, y: 398, w: 130, h: 260, roof: "setback", cols: 3, rows: 6, tint: "accent-light" },
  { x: 155, y: 182, w: 210, h: 480, roof: "spire", cols: 5, rows: 11, tint: "accent" },
  { x: 373, y: 316, w: 170, h: 340, roof: "antenna", cols: 4, rows: 8, tint: "accent-light" },
  { x: 568, y: 80, w: 300, h: 580, roof: "antenna", cols: 6, rows: 14, tint: "accent" },
  { x: 886, y: 244, w: 195, h: 420, roof: "setback", cols: 4, rows: 10, tint: "accent-light" },
  { x: 1091, y: 358, w: 145, h: 300, roof: "spire", cols: 3, rows: 7, tint: "accent" },
  { x: 1256, y: 221, w: 180, h: 440, roof: "setback", cols: 4, rows: 10, tint: "accent-light" },
];
const HERO_INDEX = 3;

// Small, distant, less-detailed backdrop buildings peeking from behind the main cluster
const backdropBuildings = [
  { x: 80, y: 260, w: 90, h: 220 },
  { x: 690, y: 30, w: 80, h: 190 },
  { x: 1250, y: 270, w: 100, h: 230 },
];

function buildWindows(spec: BuildingSpec, seed: number) {
  const { x, y, w, h, cols, rows } = spec;
  const marginX = w * 0.1;
  const marginTop = h * 0.09;
  const marginBottom = h * 0.14; // leave room for the base/entrance band
  const gridW = w - marginX * 2;
  const gridH = h - marginTop - marginBottom;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const winW = cellW * 0.56;
  const winH = cellH * 0.68;

  const windows: { cx: number; cy: number; lit: number; row: number }[] = [];
  let i = seed;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      i++;
      // Deterministic scatter (no Math.random — keeps SSR/client markup identical)
      const lit = i % 5 === 0 || i % 7 === 0 ? 0.85 : 0.3;
      windows.push({
        cx: x + marginX + col * cellW + (cellW - winW) / 2,
        cy: y + marginTop + row * cellH + (cellH - winH) / 2,
        lit,
        row,
      });
    }
  }
  return { windows, winW, winH, marginTop, marginBottom, gridH, cellH };
}

function Roof({ spec }: { spec: BuildingSpec }) {
  const { x, y, w, roof } = spec;
  const cx = x + w / 2;

  switch (roof) {
    case "antenna":
      return (
        <g className="text-accent/50 dark:text-accent-light/50" stroke="currentColor">
          <rect x={x - 6} y={y - 4} width={w + 12} height="10" rx="2" fill="var(--color-accent)" opacity="0.35" stroke="none" />
          <line x1={cx} y1={y - 46} x2={cx} y2={y} strokeWidth="3" />
          <circle cx={cx} cy={y - 46} r="4" fill="var(--color-accent-light)" stroke="none" />
        </g>
      );
    case "setback":
      return (
        <>
          <rect x={x - 6} y={y - 4} width={w + 12} height="10" rx="2" fill="var(--color-accent)" opacity="0.35" />
          <rect x={x + w * 0.22} y={y - 26} width={w * 0.56} height={26} rx="2" fill="var(--color-accent)" opacity="0.4" />
          {/* Rooftop garden — a little nature-meets-tech touch */}
          <g className="fill-leaf/70">
            {[0.3, 0.42, 0.54, 0.66].map((f, i) => (
              <circle key={i} cx={x + w * f} cy={y - 10} r={i % 2 === 0 ? 6 : 4.5} />
            ))}
          </g>
        </>
      );
    case "spire":
      return (
        <>
          <rect x={x - 6} y={y - 4} width={w + 12} height="10" rx="2" fill="var(--color-accent)" opacity="0.35" />
          <polygon points={`${cx - 12},${y} ${cx + 12},${y} ${cx},${y - 40}`} fill="var(--color-accent)" opacity="0.4" />
        </>
      );
    default:
      return null;
  }
}

function GroundBlades({ x, w, y }: { x: number; w: number; y: number }) {
  const count = 6;
  return (
    <g className="fill-leaf/80">
      {Array.from({ length: count }).map((_, i) => {
        const bx = x + (w / (count - 1)) * i + (i % 2 === 0 ? -4 : 4);
        const h = 14 + (i % 3) * 6;
        return (
          <path
            key={i}
            d={`M${bx},${y} Q${bx - 3},${y - h * 0.5} ${bx},${y - h} Q${bx + 3},${y - h * 0.5} ${bx + 1},${y}`}
          />
        );
      })}
    </g>
  );
}

function Building({
  spec,
  seed,
  windowsRef,
}: {
  spec: BuildingSpec;
  seed: number;
  windowsRef?: RefObject<SVGGElement | null>;
}) {
  const { windows, winW, winH, marginTop, gridH, cellH } = buildWindows(spec, seed);
  const { x, y, w, h } = spec;
  const gradientId = spec.tint === "accent" ? "towerGlassAccent" : "towerGlassLight";
  const shadeW = w * 0.24;
  const baseH = h * 0.09;

  // Floor divider lines every 3 rows
  const floorLines: number[] = [];
  for (let fy = y + marginTop; fy < y + marginTop + gridH; fy += cellH * 3) {
    floorLines.push(fy);
  }

  return (
    <g>
      {/* Ground contact shadow */}
      <ellipse cx={x + w / 2} cy={y + h + 6} rx={w * 0.62} ry={h * 0.045} fill="#06202E" opacity="0.22" filter="url(#groundBlur)" />

      <Roof spec={spec} />

      {/* Body */}
      <rect x={x} y={y} width={w} height={h} rx="4" fill={`url(#${gradientId})`} />

      {/* Windows */}
      <g ref={windowsRef}>
        {windows.map((win, i) => (
          <rect key={i} x={win.cx} y={win.cy} width={winW} height={winH} rx="0.5" fill="var(--color-accent-light)" opacity={win.lit} />
        ))}
      </g>

      {/* Floor divider lines for architectural rhythm */}
      <g stroke="#06202E" strokeOpacity="0.08" strokeWidth="1.5">
        {floorLines.map((fy, i) => (
          <line key={i} x1={x + w * 0.04} y1={fy} x2={x + w * 0.96} y2={fy} />
        ))}
      </g>

      {/* Lit edge on the left — front face catching the light */}
      <rect x={x} y={y} width={w * 0.06} height={h} rx="3" fill="#FFFFFF" opacity="0.25" />

      {/* Shaded side face — simple pseudo-3D depth, light from front-left */}
      <rect x={x + w - shadeW} y={y} width={shadeW} height={h} rx="4" fill="#06202E" opacity="0.14" />

      {/* Diagonal glass gloss streak */}
      <rect x={x} y={y} width={w} height={h} rx="4" fill="url(#towerGloss)" />

      {/* Base / entrance band */}
      <rect x={x} y={y + h - baseH} width={w} height={baseH} rx="3" fill="#06202E" opacity="0.28" />
      <rect x={x + w / 2 - w * 0.06} y={y + h - baseH * 0.72} width={w * 0.12} height={baseH * 0.72} rx="2" fill="var(--color-accent-light)" opacity="0.6" />

      {/* Grass blades overlapping the base — ties the tower into the hillside */}
      <GroundBlades x={x + w * 0.08} w={w * 0.84} y={y + h + 3} />
    </g>
  );
}

export function BuildingLayer({ rootRef, glowRef }: BuildingLayerProps) {
  return (
    <div
      ref={rootRef}
      className="absolute left-1/2 -translate-x-1/2 w-[76%] sm:w-[64%] max-w-[760px]"
      style={{ bottom: "35%", height: "48%" }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 690"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="towerGlassAccent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-light)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="towerGlassLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent-light)" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="towerGloss" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="groundBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Distant backdrop buildings — flat silhouettes, no detail, add cluster depth */}
        <g className="fill-accent-light/25 dark:fill-accent-light/20">
          {backdropBuildings.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3" />
          ))}
        </g>

        {/* Ground plaza — a light paved strip tying the cluster's bases together */}
        <rect x="0" y="654" width="1440" height="20" rx="10" fill="#FFFFFF" opacity="0.18" />

        {/* Buildings render back-to-front by x position; hero tower carries the glow ref */}
        {buildings.map((spec, i) => (
          <Building key={i} spec={spec} seed={i * 100} windowsRef={i === HERO_INDEX ? glowRef : undefined} />
        ))}
      </svg>
    </div>
  );
}
