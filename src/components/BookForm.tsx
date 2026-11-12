import { useId, useState } from "react";
import type { FormEvent } from "react";

import { STATUS_LABELS } from "../books";
import type { Book, NewBook, Status } from "../types";
import Button from "./Button";
import Dialog from "./Dialog";
import Field from "./Field";

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
    <Dialog title={book ? "Edit book" : "Add book"} onClose={onCancel}>
      <form onSubmit={handleSubmit} noValidate className="vstack gap-3">
        <Field id={`${uid}-title`} label="Title" error={titleError}>
          <input
            id={`${uid}-title`}
            className={`form-control ${titleError ? "is-invalid" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? `${uid}-title-error` : undefined}
          />
        </Field>
        <Field id={`${uid}-author`} label="Author" error={authorError}>
          <input
            id={`${uid}-author`}
            className={`form-control ${authorError ? "is-invalid" : ""}`}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            aria-invalid={!!authorError}
            aria-describedby={authorError ? `${uid}-author-error` : undefined}
          />
        </Field>
        <div className="row g-3">
          <div className="col-6">
            <Field id={`${uid}-status`} label="Status">
              <select
                id={`${uid}-status`}
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="col-6">
            <Field id={`${uid}-rating`} label="Rating">
              <select
                id={`${uid}-rating`}
                className="form-select"
                value={rating ?? ""}
                onChange={(e) =>
                  setRating(e.target.value ? Number(e.target.value) : null)
                }
              >
                <option value="">Not rated</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
        <Field id={`${uid}-notes`} label="Notes">
          <textarea
            id={`${uid}-notes`}
            rows={4}
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
        <div className="d-flex gap-2 mt-2">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Dialog>
  );
}
