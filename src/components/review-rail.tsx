"use client";

import { useEffect, useId, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { StarRating } from "@/components/star-rating";
import type { Review } from "@/lib/data/reviews";
import { reviewStats } from "@/lib/data/reviews";

export function ReviewRail({
  title,
  reviews,
  preview = 5,
}: {
  title: string;
  reviews: Review[];
  preview?: number;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const stats = reviewStats(reviews);
  if (reviews.length === 0) return null;
  const shown = reviews.slice(0, preview);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            {stats.average.toFixed(1)} · {stats.count.toLocaleString("en-IN")} reviews
          </p>
          <h2 className="display mt-1 text-3xl">{title}</h2>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4"
        >
          See all reviews
        </button>
      </div>

      <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
        {shown.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {open ? (
        <ReviewModal
          title={title}
          titleId={titleId}
          reviews={reviews}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </section>
  );
}

function ReviewCard({ review, wide = false }: { review: Review; wide?: boolean }) {
  return (
    <article
      className={`snap-start rounded-2xl border border-line bg-card p-5 ${
        wide ? "w-full" : "w-[min(86vw,320px)] shrink-0 sm:w-[300px]"
      }`}
    >
      <div className="flex items-start gap-3">
        {review.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.photo}
            alt=""
            width={44}
            height={44}
            className="mt-0.5 h-11 w-11 rounded-full object-cover"
          />
        ) : null}
        <div className="min-w-0">
          <StarRating value={review.rating} />
          <p className="mt-2 text-sm font-medium text-ink">{review.name}</p>
          <p className="text-xs text-muted">
            {review.trip} · {review.date}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{review.body}</p>
    </article>
  );
}

function ModalList({ reviews }: { reviews: Review[] }) {
  const [shown, setShown] = useState(24);
  const visible = reviews.slice(0, shown);
  return (
    <div className="space-y-3 overflow-y-auto px-5 py-5">
      {visible.map((review) => (
        <ReviewCard key={review.id} review={review} wide />
      ))}
      {shown < reviews.length ? (
        <button
          type="button"
          onClick={() => setShown((count) => count + 24)}
          className="w-full rounded-full border border-line bg-card py-3 text-sm font-medium text-accent"
        >
          Show more reviews
        </button>
      ) : null}
    </div>
  );
}

function ReviewModal({
  title,
  titleId,
  reviews,
  onClose,
}: {
  title: string;
  titleId: string;
  reviews: Review[];
  onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="sheet-enter flex max-h-[88vh] w-full max-w-2xl flex-col rounded-[28px] bg-paper shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 id={titleId} className="display text-2xl">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-ink-soft hover:bg-accent-soft hover:text-ink"
            aria-label="Close reviews"
          >
            <CloseIcon />
          </button>
        </div>
        <ModalList reviews={reviews} />
      </div>
    </div>
  );
}
