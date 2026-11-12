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
  hover: string;
  filled: string;
};

// Each status gets its own surface: outlined, signal yellow, solid black.
const TONES: Record<Status, Tone> = {
  "want-to-read": {
    card: "bg-paper text-ink border-2 border-ink",
    hover: "hover:bg-ink hover:text-paper",
    filled: "bg-ink text-paper hover:bg-accent",
  },
  reading: {
    card: "bg-signal text-ink border-2 border-signal",
    hover: "hover:bg-ink hover:text-signal",
    filled: "bg-ink text-signal hover:bg-accent hover:text-paper",
  },
  done: {
    card: "bg-ink text-paper border-2 border-ink",
    hover: "hover:bg-paper hover:text-ink",
    filled: "bg-paper text-ink hover:bg-accent hover:text-paper",
  },
};

const BUTTON =
  "border-2 border-current px-4 py-2 text-sm font-bold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function BookCard({
  book,
  index,
  onEdit,
  onDelete,
}: BookCardProps) {
  const tone = TONES[book.status];

  return (
    <li className={`flex flex-col gap-6 p-5 ${tone.card}`}>
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="text-7xl leading-none font-bold tracking-tighter tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-end gap-2 pt-1">
          <StatusBadge status={book.status} />
          <Rating rating={book.rating} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl leading-tight font-bold tracking-tight">
          {book.title}
        </h2>
        <p className="text-lg opacity-80">{book.author}</p>
      </div>
      {book.notes && (
        <p className="max-w-prose border-l-2 border-current pl-4 text-base leading-relaxed">
          {book.notes}
        </p>
      )}
      <div className="mt-auto flex gap-3">
        <button
          type="button"
          className={`${BUTTON} ${tone.hover}`}
          onClick={() => onEdit?.(book)}
        >
          Edit
        </button>
        <button
          type="button"
          className={`${BUTTON} ${tone.filled}`}
          onClick={() => onDelete?.(book)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
