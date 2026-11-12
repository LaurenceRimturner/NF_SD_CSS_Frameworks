export default function EmptyState() {
  return (
    <div className="border-2 border-dashed border-ink p-8 md:p-12">
      <p className="text-3xl font-bold tracking-tight">No books found</p>
      <p className="mt-2 text-lg">
        Try another search or filter, or add a new book.
      </p>
    </div>
  );
}
