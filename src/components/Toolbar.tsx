import { STATUS_LABELS } from "../books";
import type { Status, StatusFilter } from "../types";

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
    <div className="row g-3 mb-4 align-items-center justify-content-between">
      <div className="col-12 col-md-5">
        <label htmlFor="search" className="visually-hidden">
          Search by title
        </label>
        <input
          id="search"
          type="search"
          className="form-control"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-auto">
        <div
          role="group"
          aria-label="Filter by status"
          className="btn-group flex-wrap"
        >
          {OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={status === value}
              onClick={() => onStatusChange(value)}
              className={`btn btn-outline-ink fw-bold text-uppercase ${
                status === value ? "active" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
