import type { Book, Status } from "../types";
import Rating from "./Rating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  index: number;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
};

type Tone = {
  card: string;
  edit: string;
  remove: string;
};

// Each status gets its own surface: outlined, signal yellow, solid black.
const TONES: Record<Status, Tone> = {
  "want-to-read": {
    card: "bg-white text-dark border-dark",
    edit: "btn-outline-dark",
    remove: "btn-dark",
  },
  reading: {
    card: "bg-warning text-dark border-warning",
    edit: "btn-outline-dark",
    remove: "btn-dark",
  },
  done: {
    card: "bg-dark text-white border-dark",
    edit: "btn-outline-light",
    remove: "btn-light",
  },
};

const BUTTON = "btn btn-sm fw-bold text-uppercase";

export default function BookCard({
  book,
  index,
  onEdit,
  onDelete,
}: BookCardProps) {
  const tone = TONES[book.status];

  return (
    <li className="col">
      <article className={`card h-100 ${tone.card}`}>
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
              className={`${BUTTON} ${tone.edit}`}
              onClick={() => onEdit?.(book)}
            >
              Edit
            </button>
            <button
              type="button"
              className={`${BUTTON} ${tone.remove}`}
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
