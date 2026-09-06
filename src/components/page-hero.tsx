import type { ReactNode } from "react";
import { StarRating } from "@/components/star-rating";
import type { LandingCopy } from "@/lib/landing-copy";

export function PageHero({
  copy,
  rating,
  reviewCount,
  children,
  compact = false,
}: {
  copy: LandingCopy;
  rating?: number;
  reviewCount?: number;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="hero-wash">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:pb-12 sm:pt-14">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
          <div className="order-1">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-accent">
              {copy.eyebrow}
            </p>
            <h1
              className={`display title-dual mt-3 ${
                compact
                  ? "text-[2.05rem] leading-[1.08] sm:text-5xl"
                  : "text-[2.2rem] leading-[1.08] sm:text-5xl lg:text-[3.35rem]"
              }`}
            >
              <DualTitle title={copy.title} />
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
              {copy.lead}
            </p>
            {reviewCount ? (
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <StarRating value={rating ?? 5} />
                <span className="font-semibold text-ink">{rating?.toFixed(1)}</span>
                <span className="text-muted">
                  · {reviewCount.toLocaleString("en-IN")} reviews
                  {compact ? "" : " in this city"}
                </span>
              </div>
            ) : null}
            <dl className="mt-6 grid grid-cols-3 gap-2 sm:max-w-md">
              {copy.stats.map((stat) => (
                <div
                  key={`${stat.value}-${stat.label}`}
                  className="rounded-2xl border border-line/80 bg-card/80 px-3 py-3"
                >
                  <dt className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="order-2 lg:sticky lg:top-20">{children}</div>
        </div>
      </div>
    </section>
  );
}

function DualTitle({ title }: { title: string }) {
  const parts = title.split(" — ");
  if (parts.length < 2) return title;
  const lead = parts.slice(0, -1).join(" — ");
  const mark = parts[parts.length - 1];
  return (
    <>
      {lead} — <span className="title-dual-mark">{mark}</span>
    </>
  );
}
