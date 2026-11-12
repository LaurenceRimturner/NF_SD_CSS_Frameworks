import type { Book } from "../types";
import Button from "./Button";
import Dialog from "./Dialog";

type ConfirmDeleteProps = {
  book: Book;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDelete({
  book,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <Dialog title="Delete book?" onClose={onCancel}>
      <p className="mb-6 text-lg">
        &ldquo;{book.title}&rdquo; will be removed from your list.
      </p>
      <div className="flex gap-3">
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Dialog>
  );
}
