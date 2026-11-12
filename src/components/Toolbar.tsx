import { STATUS_LABELS } from "../books";
import type { Status, StatusFilter } from "../types";
import Button from "./Button";
import { INPUT_CLASSES } from "./Field";
import Panel from "./Panel";

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

// The pressed tab is flat deep blue, without the gloss.
const PRESSED =
  "aria-pressed:border-ocean aria-pressed:bg-ocean aria-pressed:bg-none aria-pressed:text-paper";

export default function Toolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: ToolbarProps) {
  return (
    <Panel className="mb-6 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
      <div className="md:w-96">
        <label htmlFor="search" className="sr-only">
          Search by title
        </label>
        <input
          id="search"
          type="search"
          className={`${INPUT_CLASSES} rounded-full`}
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
          <Button
            key={value}
            aria-pressed={status === value}
            onClick={() => onStatusChange(value)}
            className={PRESSED}
          >
            {label}
          </Button>
        ))}
      </div>
    </Panel>
  );
}
