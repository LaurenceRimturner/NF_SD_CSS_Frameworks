import { useState } from "react";
import { LibraryBigIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { filterBooks } from "@/books";
import type { Book, NewBook, StatusFilter } from "@/types";
import { useBooks } from "@/useBooks";

import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import ConfirmDelete from "./components/ConfirmDelete";
import EmptyState from "./components/EmptyState";
import Toolbar from "./components/Toolbar";

// `null` = closed, `{}` = add a book, `{ book }` = edit that book.
type FormState = { book?: Book } | null;

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const visibleBooks = filterBooks(books, { status, query });

  function handleSave(data: NewBook) {
    if (form?.book) {
      updateBook(form.book.id, data);
      toast.success("Book updated");
    } else {
      addBook(data);
      toast.success("Book added");
    }
    setForm(null);
  }

  function handleDelete() {
    if (!bookToDelete) return;
    deleteBook(bookToDelete.id);
    toast.success("Book deleted");
    setBookToDelete(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-accent pb-4">
        <div className="flex items-center gap-4">
          <LibraryBigIcon aria-hidden="true" className="size-10 text-gilt" />
          <h1 className="font-serif text-3xl leading-snug font-bold text-gilt md:text-4xl">
            Reading List
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold tabular-nums">{books.length} books</p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/85"
            onClick={() => setForm({})}
          >
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
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
      <Toaster position="bottom-right" />
    </main>
  );
}
