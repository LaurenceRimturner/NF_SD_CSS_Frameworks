import { LibraryBigIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 text-center">
        <LibraryBigIcon aria-hidden="true" className="size-10 text-primary" />
        <p className="font-serif text-xl font-bold">No books found</p>
        <p className="text-base">
          The shelf is empty. Try another search or filter, or add a new book.
        </p>
      </CardContent>
    </Card>
  );
}
