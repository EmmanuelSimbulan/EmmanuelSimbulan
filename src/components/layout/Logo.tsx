const sizeClasses = {
  sm: { box: "w-8 h-8", text: "text-sm" },
  lg: { box: "w-16 h-16", text: "text-2xl" },
};

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export function Logo({ size = "sm", className = "" }: LogoProps) {
  const { box, text } = sizeClasses[size];

  return (
    <div
      className={`aero-gloss ${box} rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25 ${className}`}
    >
      <span className={`relative z-10 text-white font-bold ${text}`}>E</span>
    </div>
  );
}
