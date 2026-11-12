import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/types";

import Rating from "./Rating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  index: number;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
};

// The leathers of the covers. Written out, so Tailwind finds the classes.
const COVERS = [
  "bg-cover-1",
  "bg-cover-2",
  "bg-cover-3",
  "bg-cover-4",
  "bg-cover-5",
];

// A book stands on its shelf plank: a leather cover with the gilt title,
// the spine on the left, and the parchment page with the details.
export default function BookCard({
  book,
  index,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <li className="flex flex-col">
      <Card
        className={`relative w-full flex-1 gap-0 rounded-l-sm rounded-r-2xl py-0 pl-5 text-cover-foreground ${COVERS[index % COVERS.length]}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-5 border-r-2 border-gilt/60 bg-black/25"
        />
        <div className="flex flex-col gap-1 px-4 pt-5 pb-4">
          <h2 className="font-serif text-2xl leading-tight font-bold text-gilt">
            {book.title}
          </h2>
          <p className="text-base">{book.author}</p>
        </div>
        <CardContent className="mr-3 mb-3 flex flex-1 flex-col gap-4 rounded-md bg-card py-4 pages text-card-foreground">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StatusBadge status={book.status} />
            <Rating rating={book.rating} />
          </div>
          {book.notes && (
            <p className="border-l-2 border-accent pl-3 font-serif text-sm leading-relaxed italic">
              {book.notes}
            </p>
          )}
          <div className="mt-auto flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => onEdit?.(book)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete?.(book)}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      <div aria-hidden="true" className="plank mt-3 h-3 rounded-sm" />
    </li>
  );
}
