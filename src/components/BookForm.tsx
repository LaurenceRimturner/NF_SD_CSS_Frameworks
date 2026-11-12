import { useId, useState } from "react";
import type { FormEvent } from "react";

import { STATUS_LABELS } from "@/books";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import type { Book, NewBook, Status } from "@/types";

import FormField from "./FormField";

type BookFormProps = {
  book?: Book;
  onSave: (book: NewBook) => void;
  onCancel: () => void;
};

const STATUSES = Object.keys(STATUS_LABELS) as Status[];

export default function BookForm({ book, onSave, onCancel }: BookFormProps) {
  const uid = useId();
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [status, setStatus] = useState<Status>(book?.status ?? "want-to-read");
  const [rating, setRating] = useState<number | null>(book?.rating ?? null);
  const [notes, setNotes] = useState(book?.notes ?? "");
  const [submitted, setSubmitted] = useState(false);

  const titleError =
    submitted && !title.trim() ? "Title is required" : undefined;
  const authorError =
    submitted && !author.trim() ? "Author is required" : undefined;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!title.trim() || !author.trim()) return;
    onSave({
      title: title.trim(),
      author: author.trim(),
      status,
      rating,
      notes: notes.trim(),
    });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl leading-snug font-bold">
            {book ? "Edit book" : "Add book"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField id={`${uid}-title`} label="Title" error={titleError}>
            <Input
              id={`${uid}-title`}
              className="h-9"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={!!titleError}
              aria-describedby={titleError ? `${uid}-title-error` : undefined}
            />
          </FormField>
          <FormField id={`${uid}-author`} label="Author" error={authorError}>
            <Input
              id={`${uid}-author`}
              className="h-9"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              aria-invalid={!!authorError}
              aria-describedby={authorError ? `${uid}-author-error` : undefined}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField id={`${uid}-status`} label="Status">
              <NativeSelect
                id={`${uid}-status`}
                className="w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
              >
                {STATUSES.map((s) => (
                  <NativeSelectOption key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormField>
            <FormField id={`${uid}-rating`} label="Rating">
              <NativeSelect
                id={`${uid}-rating`}
                className="w-full"
                value={rating ?? ""}
                onChange={(e) =>
                  setRating(e.target.value ? Number(e.target.value) : null)
                }
              >
                <NativeSelectOption value="">Not rated</NativeSelectOption>
                {[1, 2, 3, 4, 5].map((n) => (
                  <NativeSelectOption key={n} value={n}>
                    {n}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormField>
          </div>
          <FormField id={`${uid}-notes`} label="Notes">
            <Textarea
              id={`${uid}-notes`}
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormField>
          <div className="mt-2 flex gap-3">
            <Button type="submit">Save</Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
