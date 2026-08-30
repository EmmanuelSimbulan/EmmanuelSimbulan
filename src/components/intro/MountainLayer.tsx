import type { RefObject } from "react";

interface MountainLayerProps {
  rootRef?: RefObject<HTMLDivElement | null>;
}

export function MountainLayer({ rootRef }: MountainLayerProps) {
  return (
    <div
      ref={rootRef}
      className="absolute inset-x-0 bottom-0 h-[75%] origin-bottom"
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="mtnFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-light)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-leaf)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="mtnNear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-leaf)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Distant ridge */}
        <path
          d="M0,320 C180,220 320,300 480,240 C640,180 760,280 920,220 C1080,160 1240,260 1440,200 L1440,700 L0,700 Z"
          fill="url(#mtnFar)"
        />

        {/* Main grassy mountain */}
        <path
          d="M0,460 C160,340 300,420 460,360 C620,300 740,400 900,340 C1060,280 1220,380 1440,320 L1440,700 L0,700 Z"
          fill="url(#mtnNear)"
        />

        {/* Grass blade texture along the near ridge */}
        <g className="fill-leaf/70">
          {[
            120, 180, 260, 340, 420, 500, 580, 660, 740, 820, 900, 980, 1060,
            1140, 1220, 1300, 1380,
          ].map((x, i) => {
            const baseYs = [
              370, 350, 330, 380, 360, 320, 360, 400, 350, 300, 340, 380, 320,
              360, 400, 350, 330,
            ];
            const baseY = baseYs[i];
            const h = 40 + (i % 4) * 8;
            return (
              <path
                key={x}
                d={`M${x},${baseY} Q${x - 4},${baseY - h * 0.5} ${x},${baseY - h} Q${x + 4},${baseY - h * 0.5} ${x + 1},${baseY}`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
