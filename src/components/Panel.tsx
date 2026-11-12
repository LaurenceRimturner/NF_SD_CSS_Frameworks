import type { ReactNode } from "react";

type PanelProps = {
  /** Background color of the glass, for example `bg-sky/30`. */
  tint?: string;
  className?: string;
  children: ReactNode;
};

// Vista glass: see-through, blurred and saturated, with a bright edge.
// Not `relative` here, a modal <dialog> must keep its own `position: fixed`.
export const GLASS =
  "overflow-hidden rounded-2xl border border-white/70 shadow-lg shadow-ocean/40 backdrop-blur-xl backdrop-saturate-150 inset-shadow-sm inset-shadow-white/70";

// The diagonal light reflection across the upper left. It sits behind the
// content (`-z-10`), so the panel needs its own stacking context (`isolate`).
export function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-linear-155 from-white/45 from-35% to-transparent to-35%"
    />
  );
}

// `className` styles the panel itself, so flex and grid layouts work on it.
export default function Panel({
  tint = "bg-white/25",
  className = "",
  children,
}: PanelProps) {
  return (
    <div className={`relative isolate ${GLASS} ${tint} ${className}`}>
      <Shine />
      {children}
    </div>
  );
}
