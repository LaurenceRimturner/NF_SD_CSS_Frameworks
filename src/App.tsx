import { useState } from "react";

import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import Button from "./components/Button";
import ConfirmDelete from "./components/ConfirmDelete";
import EmptyState from "./components/EmptyState";
import Toast from "./components/Toast";
import Toolbar from "./components/Toolbar";
import { filterBooks } from "./books";
import type { Book, NewBook, StatusFilter } from "./types";
import { useBooks } from "./useBooks";

// `null` = closed, `{}` = add a book, `{ book }` = edit that book.
type FormState = { book?: Book } | null;

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const visibleBooks = filterBooks(books, { status, query });

  function handleSave(data: NewBook) {
    if (form?.book) {
      updateBook(form.book.id, data);
      setToast("Book updated");
    } else {
      addBook(data);
      setToast("Book added");
    }
    setForm(null);
  }

  function handleDelete() {
    if (!bookToDelete) return;
    deleteBook(bookToDelete.id);
    setToast("Book deleted");
    setBookToDelete(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
          Reading List
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold tabular-nums">{books.length} books</p>
          <Button variant="primary" onClick={() => setForm({})}>
            + Add book
          </Button>
        </div>
      </header>
      <Toolbar
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />
      {visibleBooks.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              index={index}
              onEdit={(b) => setForm({ book: b })}
              onDelete={setBookToDelete}
            />
          ))}
        </ul>
      )}
      {form && (
        <BookForm
          book={form.book}
          onSave={handleSave}
          onCancel={() => setForm(null)}
        />
      )}
      {bookToDelete && (
        <ConfirmDelete
          book={bookToDelete}
          onConfirm={handleDelete}
          onCancel={() => setBookToDelete(null)}
        />
      )}
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}
