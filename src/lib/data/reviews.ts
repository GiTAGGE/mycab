import type { ServiceKind } from "@/types";

export type Review = {
  id: string;
  citySlug: string;
  name: string;
  place: string;
  trip: string;
  rating: 5 | 4;
  date: string;
  body: string;
  photo?: string;
  routeId?: string;
  service?: ServiceKind;
};

/** Public reviews stay empty until they come from a real, sourced booking. */
export const reviews: Review[] = [];

export function reviewsForCity(citySlug: string): Review[] {
  return reviews.filter((review) => review.citySlug === citySlug);
}

export function reviewsForService(citySlug: string, service?: ServiceKind): Review[] {
  const city = reviewsForCity(citySlug);
  if (!service) return city;
  const matched = city.filter((review) => review.service === service);
  return matched.length >= 3 ? matched : city;
}

export function reviewStats(list: Review[]): { count: number; average: number } {
  if (list.length === 0) return { count: 0, average: 0 };
  return {
    count: list.length,
    average:
      Math.round((list.reduce((total, review) => total + review.rating, 0) / list.length) * 10) /
      10,
  };
}

export function networkReviews(perCity = 2): Review[] {
  const slugs = ["hubli", "dharwad", "belgaum", "bangalore", "mangalore"];
  return slugs.flatMap((slug) => reviewsForCity(slug).slice(0, perCity));
}
