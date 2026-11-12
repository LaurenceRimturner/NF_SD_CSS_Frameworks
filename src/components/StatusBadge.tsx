import { BookmarkIcon } from "lucide-react";

import { STATUS_LABELS } from "@/books";
import { Badge } from "@/components/ui/badge";
import type { Status } from "@/types";

type StatusBadgeProps = {
  status: Status;
};

// Each status has a bookmark in its own color and a written label, so it
// never depends on color alone.
const RIBBONS: Record<Status, string> = {
  "want-to-read": "fill-ribbon-want text-ribbon-want",
  reading: "fill-ribbon-reading text-ribbon-reading",
  done: "fill-ribbon-done text-ribbon-done",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className="h-6 gap-1 px-2 text-xs font-bold">
      <BookmarkIcon aria-hidden="true" className={RIBBONS[status]} />
      {STATUS_LABELS[status]}
    </Badge>
  );
}
