import { StarIcon } from "@/components/icons";

export function StarRating({
  value,
  size = "h-4 w-4",
}: {
  value: number;
  size?: string;
}) {
  return (
    <span className="inline-flex items-center gap-0.5 text-accent" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} className={size} filled={star <= Math.round(value)} />
      ))}
    </span>
  );
}
