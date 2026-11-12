type RatingProps = {
  rating: number | null;
};

export default function Rating({ rating }: RatingProps) {
  if (rating === null) {
    return <span className="text-sm">Not rated</span>;
  }

  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center gap-2"
    >
      <span aria-hidden="true" className="text-lg leading-none text-amber">
        {"★".repeat(rating)}
        <span className="text-ocean/40">{"☆".repeat(5 - rating)}</span>
      </span>
      <span aria-hidden="true" className="text-sm font-bold tabular-nums">
        {rating}/5
      </span>
    </span>
  );
}
