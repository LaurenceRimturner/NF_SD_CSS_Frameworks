import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

type StatusBadgeProps = {
  status: Status;
};

// Color and symbol both carry the status.
const STATUS_STYLES: Record<Status, { symbol: string; color: string }> = {
  "want-to-read": { symbol: "○", color: "bg-sky" },
  reading: { symbol: "◐", color: "bg-amber" },
  done: { symbol: "●", color: "bg-leaf" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { symbol, color } = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-ink/25 bg-linear-to-b from-white/60 from-50% to-white/0 to-50% px-3 py-1 text-xs font-bold shadow-sm shadow-ocean/30 ${color}`}
    >
      <span aria-hidden="true">{symbol}</span>
      {STATUS_LABELS[status]}
    </span>
  );
}
