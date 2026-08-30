export function GrassDivider() {
  return (
    <div className="relative w-full h-[90px] sm:h-[120px] lg:h-[150px] overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="grassFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:var(--color-leaf)]" stopOpacity="0.55" />
            <stop offset="100%" className="[stop-color:var(--color-success)]" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Rolling hills */}
        <path
          d="M0,90 C120,55 240,115 360,85 C480,55 600,105 720,75 C840,45 960,100 1080,70 C1200,40 1320,90 1440,65 L1440,150 L0,150 Z"
          fill="url(#grassFill)"
        />

        {/* Grass blade texture along the ridge */}
        <g className="fill-leaf/70 dark:fill-leaf/60">
          {[
            60, 95, 140, 185, 230, 280, 330, 380, 430, 480, 530, 580, 630,
            680, 730, 780, 830, 880, 930, 980, 1030, 1080, 1130, 1180, 1230,
            1280, 1330, 1380,
          ].map((x, i) => {
            const heights = [80, 90, 75, 95, 70, 85];
            const baseY = [
              90, 78, 66, 100, 88, 76, 65, 92, 80, 68, 105, 92, 80, 68, 55,
              85, 73, 61, 90, 78, 66, 55, 85, 73, 61, 90, 78, 66,
            ][i];
            const h = heights[i % heights.length];
            return (
              <path
                key={x}
                d={`M${x},${baseY} Q${x - 3},${baseY - h * 0.5} ${x},${baseY - h} Q${x + 3},${baseY - h * 0.5} ${x + 1},${baseY}`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
