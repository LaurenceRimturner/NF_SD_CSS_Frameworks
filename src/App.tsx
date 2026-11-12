import BookCard from "./components/BookCard";
import { useBooks } from "./useBooks";

export default function App() {
  const { books } = useBooks();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <header className="mb-12 flex items-baseline justify-between border-b-2 border-rule pb-4">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
          Reading List
        </h1>
        <p className="text-sm font-bold tabular-nums">{books.length} books</p>
      </header>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </ul>
    </main>
  );
}
