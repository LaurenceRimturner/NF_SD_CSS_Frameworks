import type { Book, Status } from "../types";
import Button from "./Button";
import Panel from "./Panel";
import Rating from "./Rating";
import StatusBadge from "./StatusBadge";
import Titlebar from "./Titlebar";
import WindowControls from "./WindowControls";

type BookCardProps = {
  book: Book;
  index: number;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
};

// The glass frame is tinted by status.
const TINTS: Record<Status, string> = {
  "want-to-read": "bg-sky/35",
  reading: "bg-amber/40",
  done: "bg-leaf/35",
};

// A book is a Vista window: glass frame with a title bar and (decorative)
// controls, an opaque white area inside for the content.
export default function BookCard({
  book,
  index,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <li className="flex">
      <Panel tint={TINTS[book.status]} className="flex w-full flex-col p-1.5">
        <Titlebar>
          <span className="text-sm font-bold tabular-nums">
            Book {String(index + 1).padStart(2, "0")}
          </span>
          <WindowControls />
        </Titlebar>
        <div className="flex flex-1 flex-col gap-4 rounded-lg border border-ocean/30 bg-white/90 p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <StatusBadge status={book.status} />
            <Rating rating={book.rating} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl leading-tight font-bold tracking-tight text-ocean">
              {book.title}
            </h2>
            <p className="text-base">{book.author}</p>
          </div>
          {book.notes && (
            <p className="rounded-md border border-ocean/20 bg-sky/10 p-3 text-sm leading-relaxed inset-shadow-sm inset-shadow-ocean/10">
              {book.notes}
            </p>
          )}
          <div className="mt-auto flex gap-3 pt-2">
            <Button onClick={() => onEdit?.(book)}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete?.(book)}>
              Delete
            </Button>
          </div>
        </div>
      </Panel>
    </li>
  );
}
