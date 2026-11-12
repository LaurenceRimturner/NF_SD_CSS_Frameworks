import Panel from "./Panel";

export default function EmptyState() {
  return (
    <Panel className="p-8 md:p-12">
      <p className="text-3xl font-bold tracking-tight text-ocean">
        No books found
      </p>
      <p className="mt-2 text-lg">
        Try another search or filter, or add a new book.
      </p>
    </Panel>
  );
}
