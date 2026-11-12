import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

type StatusBadgeProps = {
  status: Status;
};

// The symbol carries the status too, the color comes from the card.
const SYMBOLS: Record<Status, string> = {
  "want-to-read": "○",
  reading: "◐",
  done: "●",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="fw-bold text-uppercase small">
      <span aria-hidden="true">{SYMBOLS[status]}</span> {STATUS_LABELS[status]}
    </span>
  );
}
