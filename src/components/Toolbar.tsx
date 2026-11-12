import { STATUS_LABELS } from "../books";
import type { Status, StatusFilter } from "../types";
import { INPUT_CLASSES } from "./Field";

type ToolbarProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
};

const OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(STATUS_LABELS) as Status[]).map((s) => ({
    value: s,
    label: STATUS_LABELS[s],
  })),
];

export default function Toolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: ToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="md:w-96">
        <label htmlFor="search" className="sr-only">
          Search by title
        </label>
        <input
          id="search"
          type="search"
          className={INPUT_CLASSES}
          placeholder="Search by title..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div
        role="group"
        aria-label="Filter by status"
        className="flex flex-wrap gap-2"
      >
        {OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={status === value}
            onClick={() => onStatusChange(value)}
            className="cursor-pointer border-2 border-ink px-3 py-2 text-sm font-bold uppercase tracking-wider hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
