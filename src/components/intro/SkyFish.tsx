interface FishSpec {
  size: number;
  top: string;
  left: string;
  dx: number;
  duration: number;
  delay: number;
  flip: boolean;
  tone: "accent" | "accent-light" | "leaf";
}

const fishes: FishSpec[] = [
  { size: 46, top: "14%", left: "20%", dx: 90, duration: 10, delay: 0, flip: false, tone: "accent-light" },
  { size: 30, top: "26%", left: "62%", dx: -70, duration: 8.5, delay: 1.2, flip: true, tone: "leaf" },
  { size: 60, top: "9%", left: "74%", dx: 100, duration: 12, delay: 0.6, flip: false, tone: "accent" },
  { size: 24, top: "34%", left: "10%", dx: 60, duration: 7, delay: 2, flip: false, tone: "accent-light" },
  { size: 36, top: "18%", left: "42%", dx: -80, duration: 9.5, delay: 0.9, flip: true, tone: "leaf" },
];

function Fish({ size, flip, tone }: { size: number; flip: boolean; tone: FishSpec["tone"] }) {
  const fill = `var(--color-${tone})`;
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 100 55"
      style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.55 }}
    >
      {/* Tail — wiggles independently */}
      <g style={{ transformOrigin: "72px 27px", animation: "tail-wiggle 1.4s ease-in-out infinite" }}>
        <polygon points="70,27 98,10 98,44" fill={fill} opacity="0.7" />
      </g>
      {/* Body */}
      <ellipse cx="42" cy="27" rx="38" ry="17" fill={fill} opacity="0.85" />
      {/* Dorsal fin */}
      <polygon points="35,10 48,10 40,-4" fill={fill} opacity="0.6" />
      {/* Eye */}
      <circle cx="16" cy="23" r="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

export function SkyFish() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {fishes.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: f.top,
            left: f.left,
            animation: `swim-drift ${f.duration}s ease-in-out infinite`,
            animationDelay: `${f.delay}s`,
            // @ts-expect-error -- custom property read by the swim-drift keyframes
            "--swim-dx": `${f.dx}px`,
          }}
        >
          <Fish size={f.size} flip={f.flip} tone={f.tone} />
        </div>
      ))}
    </div>
  );
}
