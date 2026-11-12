import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Book } from "@/types";

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
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl leading-snug font-bold">
            Delete book?
          </DialogTitle>
          <DialogDescription className="text-base text-card-foreground">
            &ldquo;{book.title}&rdquo; will be removed from your list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
