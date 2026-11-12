import { StarIcon } from "lucide-react";

type RatingProps = {
  rating: number | null;
};

export default function Rating({ rating }: RatingProps) {
  if (rating === null) {
    return <span className="text-sm text-muted-foreground">Not rated</span>;
  }

  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center gap-2"
    >
      <span aria-hidden="true" className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon
            key={n}
            className={
              n <= rating
                ? "size-4 fill-accent text-accent-foreground"
                : "size-4 text-page-edge"
            }
          />
        ))}
      </span>
      <span aria-hidden="true" className="text-sm font-bold tabular-nums">
        {rating}/5
      </span>
    </span>
  );
}
