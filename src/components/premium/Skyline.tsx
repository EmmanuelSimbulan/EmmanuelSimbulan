type RoofStyle = "antenna" | "setback" | "spire" | "tank";

interface BuildingSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  roof: RoofStyle;
  cols: number;
  rows: number;
}

const buildings: BuildingSpec[] = [
  { x: 60, y: 50, w: 80, h: 170, roof: "antenna", cols: 4, rows: 8 },
  { x: 260, y: 30, w: 100, h: 190, roof: "setback", cols: 5, rows: 9 },
  { x: 480, y: 45, w: 90, h: 175, roof: "spire", cols: 4, rows: 8 },
  { x: 740, y: 20, w: 110, h: 200, roof: "tank", cols: 5, rows: 10 },
  { x: 960, y: 55, w: 85, h: 165, roof: "antenna", cols: 4, rows: 7 },
  { x: 1200, y: 40, w: 95, h: 180, roof: "setback", cols: 4, rows: 8 },
];

function windowGrid(x: number, y: number, w: number, h: number, cols: number, rows: number) {
  const marginX = w * 0.14;
  const marginTop = h * 0.1;
  const marginBottom = h * 0.06;
  const gridW = w - marginX * 2;
  const gridH = h - marginTop - marginBottom;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const winW = cellW * 0.55;
  const winH = cellH * 0.6;

  const windows: { cx: number; cy: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      windows.push({
        cx: x + marginX + col * cellW + (cellW - winW) / 2,
        cy: y + marginTop + row * cellH + (cellH - winH) / 2,
      });
    }
  }

  return { windows, winW, winH };
}

function Roof({ spec }: { spec: BuildingSpec }) {
  const { x, y, w, roof } = spec;
  const cx = x + w / 2;

  switch (roof) {
    case "antenna":
      return (
        <line
          x1={cx}
          y1={y - 26}
          x2={cx}
          y2={y}
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent/40 dark:text-accent-light/40"
        />
      );
    case "setback":
      return (
        <rect
          x={x + w * 0.25}
          y={y - 22}
          width={w * 0.5}
          height={22}
          rx="1.5"
          fill="currentColor"
          className="text-accent/25 dark:text-accent/20"
        />
      );
    case "spire":
      return (
        <polygon
          points={`${cx - 10},${y} ${cx + 10},${y} ${cx},${y - 36}`}
          fill="currentColor"
          className="text-accent/25 dark:text-accent/20"
        />
      );
    case "tank":
      return (
        <g className="text-accent/25 dark:text-accent/20" fill="currentColor">
          <rect x={cx - 14} y={y - 24} width="28" height="16" rx="2" />
          <line
            x1={cx}
            y1={y - 36}
            x2={cx}
            y2={y - 24}
            stroke="currentColor"
            strokeWidth="2"
          />
        </g>
      );
    default:
      return null;
  }
}

function Building({ spec }: { spec: BuildingSpec }) {
  const { x, y, w, h, cols, rows } = spec;
  const { windows, winW, winH } = windowGrid(x, y, w, h, cols, rows);

  return (
    <g className="building">
      <Roof spec={spec} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill="url(#buildingGlass)"
        className="opacity-90 dark:opacity-85"
      />
      <g className="building-windows">
        {windows.map((win, i) => (
          <rect
            key={i}
            x={win.cx}
            y={win.cy}
            width={winW}
            height={winH}
            rx="0.5"
            fill="var(--color-accent-light)"
          />
        ))}
      </g>
    </g>
  );
}

export function Skyline() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-[140px] sm:h-[180px] lg:h-[220px] select-none"
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="buildingGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-light)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Back layer — distant, non-interactive silhouette */}
      <g className="fill-accent-light/20 dark:fill-accent-light/15 pointer-events-none">
        <rect x="20" y="130" width="60" height="90" />
        <rect x="100" y="150" width="40" height="70" />
        <rect x="160" y="90" width="70" height="130" />
        <rect x="250" y="140" width="50" height="80" />
        <rect x="330" y="70" width="90" height="150" />
        <rect x="440" y="150" width="45" height="70" />
        <rect x="510" y="110" width="65" height="110" />
        <rect x="600" y="125" width="50" height="95" />
        <rect x="670" y="80" width="80" height="140" />
        <rect x="780" y="135" width="55" height="85" />
        <rect x="860" y="100" width="70" height="120" />
        <rect x="950" y="60" width="90" height="160" />
        <rect x="1060" y="130" width="50" height="90" />
        <rect x="1130" y="105" width="65" height="115" />
        <rect x="1210" y="150" width="45" height="70" />
        <rect x="1270" y="85" width="80" height="135" />
        <rect x="1370" y="130" width="55" height="90" />
      </g>

      {/* Front layer — closer, interactive glass towers. Hover one to light it up. */}
      {buildings.map((spec) => (
        <Building key={spec.x} spec={spec} />
      ))}
    </svg>
  );
}
