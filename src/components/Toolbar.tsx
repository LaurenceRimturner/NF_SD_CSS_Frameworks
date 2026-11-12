import { SearchIcon } from "lucide-react";

import { STATUS_LABELS } from "@/books";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Status, StatusFilter } from "@/types";

type ToolbarProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
};

const STATUSES = Object.keys(STATUS_LABELS) as Status[];

// The card catalog: a search drawer and the filter by status.
export default function Toolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: ToolbarProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 rounded-md border-2 border-accent bg-card p-4 text-card-foreground md:flex-row md:items-center md:justify-between">
      <div className="relative md:w-96">
        <label htmlFor="search" className="sr-only">
          Search by title
        </label>
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
        />
        <Input
          id="search"
          type="search"
          className="h-9 pl-8"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <ToggleGroup
        aria-label="Filter by status"
        value={[status]}
        onValueChange={(value) => {
          // A pressed item stays pressed, so there is always one filter.
          const next = value[0] as StatusFilter | undefined;
          if (next) onStatusChange(next);
        }}
      >
        <ToggleGroupItem value="all" className="h-9 px-3">
          All
        </ToggleGroupItem>
        {STATUSES.map((s) => (
          <ToggleGroupItem key={s} value={s} className="h-9 px-3">
            {STATUS_LABELS[s]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
