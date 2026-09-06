import { brand } from "@/lib/brand";
import type { Review } from "@/lib/data/reviews";
import { reviewStats } from "@/lib/data/reviews";
import type { City } from "@/types";

function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://seacab.netlify.app";
  return `${base.replace(/\/$/, "")}${path}`;
}

export function taxiServiceJsonLd(city: City, reviews: Review[], path: string) {
  const stats = reviewStats(reviews);
  const samples = reviews.filter((review) => review.body.length > 40).slice(0, 8);
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${brand.name} ${city.name}`,
    description: city.seoDescription,
    url: absoluteUrl(path),
    areaServed: {
      "@type": "City",
      name: city.officialName ?? city.name,
      containedInPlace: { "@type": "State", name: city.state },
    },
    telephone: `+${brand.whatsappNumber}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.average.toFixed(1),
      reviewCount: stats.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: samples.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      datePublished: review.date,
      reviewBody: review.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
