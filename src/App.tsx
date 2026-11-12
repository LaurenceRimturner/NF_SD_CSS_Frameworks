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
    <main className="container-xl py-4 py-md-5">
      <header className="d-flex flex-wrap align-items-end justify-content-between gap-3 border-bottom border-2 border-dark pb-3 mb-4">
        <h1 className="display-4 fw-bold mb-0">Reading List</h1>
        <div className="d-flex align-items-center gap-3">
          <p className="fw-bold small mb-0">{books.length} books</p>
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
        <ul className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 list-unstyled">
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
