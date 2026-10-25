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
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:pb-14 sm:pt-8">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-intro">
              <div className={`hero-kicker ${compact ? "hero-kicker-one" : ""}`}>
                <p className="hero-eyebrow">{copy.eyebrow}</p>
                {reviewCount ? (
                  <p className="hero-rating">
                    <StarRating value={rating ?? 5} size="hero-stars" />
                    <span className="font-semibold text-ink">{rating?.toFixed(1)}</span>
                    <span className="text-muted">
                      · {reviewCount.toLocaleString("en-IN")} reviews
                      {compact ? null : <span className="hidden sm:inline"> in this city</span>}
                    </span>
                  </p>
                ) : null}
              </div>
              <h1
                className={`display title-dual mt-2 ${
                  compact
                    ? "hero-title-compact"
                    : "text-[clamp(1.45rem,2.2vw+0.85rem,3.15rem)] leading-[1.08]"
                }`}
              >
                <DualTitle title={copy.title} />
              </h1>
              <p className="hero-lead">{copy.lead}</p>
            </div>
            <dl className="hero-stats">
              {copy.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="hero-stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-form">{children}</div>
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
