const SEGMENT = "grid h-5 place-items-center border";
const GLASS_BLUE =
  "w-7 border-ocean/50 bg-sky/50 bg-linear-to-b from-white/80 from-50% to-white/0 to-50% text-ink";
const GLASS_RED =
  "w-10 border-crimson bg-crimson bg-linear-to-b from-white/60 from-50% to-white/0 to-50% text-paper";

// Minimize, maximize and close, for show only. They do nothing.
export default function WindowControls() {
  return (
    <span aria-hidden="true" className="flex overflow-hidden rounded-sm">
      <span className={`${SEGMENT} ${GLASS_BLUE}`}>
        <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-2">
          <path d="M2 9h8" />
        </svg>
      </span>
      <span className={`${SEGMENT} ${GLASS_BLUE}`}>
        <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-2">
          <rect x="2" y="2" width="8" height="8" />
        </svg>
      </span>
      <span className={`${SEGMENT} ${GLASS_RED}`}>
        <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-2">
          <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
        </svg>
      </span>
    </span>
  );
}
