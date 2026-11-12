import type { Book, Status } from "../types";
import Rating from "./Rating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  index: number;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
};

// Each status gets its own surface: outlined, signal yellow, inverted.
// They follow the theme, see `src/index.scss`.
const SURFACES: Record<Status, string> = {
  "want-to-read": "surface-outline",
  reading: "surface-signal",
  done: "surface-inverse",
};

const BUTTON = "btn btn-sm fw-bold text-uppercase";

export default function BookCard({
  book,
  index,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <li className="col">
      <article className={`card h-100 ${SURFACES[book.status]}`}>
        <div className="card-body d-flex flex-column gap-3">
          <div className="d-flex align-items-start justify-content-between gap-3">
            <span
              aria-hidden="true"
              className="display-3 fw-bold lh-1 font-monospace"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="d-flex flex-column align-items-end gap-1 pt-1">
              <StatusBadge status={book.status} />
              <Rating rating={book.rating} />
            </div>
          </div>
          <div>
            <h2 className="card-title h3 fw-bold">{book.title}</h2>
            <p className="card-subtitle fs-5 mb-0">{book.author}</p>
          </div>
          {book.notes && (
            <p className="card-text border-start border-2 ps-3 mb-0">
              {book.notes}
            </p>
          )}
          <div className="d-flex gap-2 mt-auto">
            <button
              type="button"
              className={`${BUTTON} btn-outline-ink`}
              onClick={() => onEdit?.(book)}
            >
              Edit
            </button>
            <button
              type="button"
              className={`${BUTTON} btn-ink`}
              onClick={() => onDelete?.(book)}
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}
