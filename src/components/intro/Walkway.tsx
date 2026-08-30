import type { RefObject } from "react";

interface WalkwayProps {
  rootRef?: RefObject<HTMLDivElement | null>;
}

// Trapezoid path: wide near the viewer at the bottom, narrowing to a point at
// the hero tower's entrance — with paving rungs spaced tighter as they recede,
// faking the perspective of a track leading up to the building.
const BOTTOM_Y = 700;
const TOP_Y = 460;
const BOTTOM_HALF_W = 160;
const TOP_HALF_W = 30;
const CENTER_X = 720;

function widthAt(y: number) {
  const t = (BOTTOM_Y - y) / (BOTTOM_Y - TOP_Y);
  return BOTTOM_HALF_W - t * (BOTTOM_HALF_W - TOP_HALF_W);
}

const rungYs = [700, 640, 590, 550, 520, 495, 475, 460];

export function Walkway({ rootRef }: WalkwayProps) {
  return (
    <div ref={rootRef} className="absolute inset-x-0 bottom-0 h-[75%] origin-bottom" aria-hidden="true">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="walkwayFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <polygon
          points={`${CENTER_X - TOP_HALF_W},${TOP_Y} ${CENTER_X + TOP_HALF_W},${TOP_Y} ${CENTER_X + BOTTOM_HALF_W},${BOTTOM_Y} ${CENTER_X - BOTTOM_HALF_W},${BOTTOM_Y}`}
          fill="url(#walkwayFill)"
        />

        {/* Paving rungs — spacing tightens toward the vanishing point for a sense of distance */}
        <g stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2">
          {rungYs.map((y, i) => {
            const w = widthAt(y);
            return <line key={i} x1={CENTER_X - w} y1={y} x2={CENTER_X + w} y2={y} />;
          })}
        </g>

        {/* Edge lines for definition */}
        <line x1={CENTER_X - TOP_HALF_W} y1={TOP_Y} x2={CENTER_X - BOTTOM_HALF_W} y2={BOTTOM_Y} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
        <line x1={CENTER_X + TOP_HALF_W} y1={TOP_Y} x2={CENTER_X + BOTTOM_HALF_W} y2={BOTTOM_Y} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
      </svg>
    </div>
  );
}
