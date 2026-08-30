import type { RefObject } from "react";

interface InteriorSectionProps {
  rootRef?: RefObject<HTMLDivElement | null>;
  glowRef?: RefObject<HTMLDivElement | null>;
  wallsRef?: RefObject<HTMLDivElement | null>;
  floorRef?: RefObject<HTMLDivElement | null>;
}

export function InteriorSection({ rootRef, glowRef, wallsRef, floorRef }: InteriorSectionProps) {
  return (
    <div
      ref={rootRef}
      className="absolute inset-0 opacity-0 bg-surface-primary overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient lobby bloom — grows as if walking toward the light ahead */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(79,224,212,0.18)_0%,rgba(79,224,212,0)_70%)]"
      />

      {/* Glass wall mullions — spread apart as the walls slide past on either side */}
      <div ref={wallsRef} className="absolute inset-0 flex justify-evenly">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-px h-full bg-border" />
        ))}
      </div>

      {/* Floor glow — stretches forward like ground passing underfoot */}
      <div
        ref={floorRef}
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-accent/10 to-transparent"
      />
    </div>
  );
}
