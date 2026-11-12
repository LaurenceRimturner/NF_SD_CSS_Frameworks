import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

type StatusBadgeProps = {
  status: Status;
};

// The shape carries the status too, the color comes from the card (currentColor).
const ICON_CLASSES: Record<Status, string> = {
  "want-to-read": "border-2 border-current",
  reading:
    "border-2 border-current bg-linear-to-r from-current from-50% to-transparent to-50%",
  done: "border-2 border-current bg-current",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
      <span aria-hidden="true" className={`size-3 ${ICON_CLASSES[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
