type RatingProps = {
  rating: number | null;
};

export default function Rating({ rating }: RatingProps) {
  if (rating === null) {
    return <span className="small">Not rated</span>;
  }

  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className="small">
      <span aria-hidden="true">
        {"■".repeat(rating)}
        {"□".repeat(5 - rating)}{" "}
        <strong className="text-nowrap">{rating}/5</strong>
      </span>
    </span>
  );
}
