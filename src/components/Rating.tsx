type RatingProps = {
  rating: number | null;
};

export default function Rating({ rating }: RatingProps) {
  if (rating === null) {
    return <span className="text-sm opacity-80">Not rated</span>;
  }

  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center gap-2"
    >
      <span aria-hidden="true" className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`size-3 border-2 border-current ${n <= rating ? "bg-current" : ""}`}
          />
        ))}
      </span>
      <span aria-hidden="true" className="text-sm font-bold tabular-nums">
        {rating}/5
      </span>
    </span>
  );
}
