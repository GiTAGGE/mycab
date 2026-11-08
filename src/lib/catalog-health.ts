import { cities, faqsFor, routes, services } from "@/lib/data";
import { guideFaqs, serviceFaqsFor } from "@/lib/guides";
import { routeSeo, serviceSeo } from "@/lib/landing-copy";
import { cityName } from "@/lib/trip-intent";

export type HealthIssue = {
  path: string;
  issue: string;
};

const TITLE_LIMIT = 60;

function mentionsFare(text: string): boolean {
  return /₹|\bfare\b/i.test(text);
}

export function catalogHealth(): HealthIssue[] {
  const issues: HealthIssue[] = [];

  for (const city of cities) {
    if (city.status !== "live") continue;
    const path = `/${city.slug}`;
    if (!city.seoTitle.trim()) issues.push({ path, issue: "Missing title" });
    else if (city.seoTitle.length > TITLE_LIMIT) {
      issues.push({ path, issue: `Title is ${city.seoTitle.length} characters` });
    }
    if (!city.seoDescription.trim()) issues.push({ path, issue: "Missing description" });
    else if (!mentionsFare(city.seoDescription)) {
      issues.push({ path, issue: "Description does not mention a fare" });
    }
    if (faqsFor({ citySlug: city.slug }).length === 0) issues.push({ path, issue: "No FAQ" });

    for (const service of services) {
      if (!city.availableServiceIds.includes(service.id)) continue;
      if (service.id === "one-way" || service.id === "round-trip") continue;
      const servicePath = `/${city.slug}/${service.slug}`;
      const seo = serviceSeo(city, service);
      if (!seo.title.trim()) issues.push({ path: servicePath, issue: "Missing title" });
      else if (seo.title.length > TITLE_LIMIT) {
        issues.push({ path: servicePath, issue: `Title is ${seo.title.length} characters` });
      }
      if (!seo.description.trim()) issues.push({ path: servicePath, issue: "Missing description" });
      else if (!mentionsFare(seo.description)) {
        issues.push({ path: servicePath, issue: "Description does not mention a fare" });
      }
      if (serviceFaqsFor(city.slug, service.kind).length === 0) {
        issues.push({ path: servicePath, issue: "No FAQ" });
      }
    }
  }

  for (const route of routes) {
    if (route.status !== "live") continue;
    const path = `/${route.pageSlug}`;
    if (!route.pageSlug) {
      issues.push({ path: route.id, issue: "Missing canonical path" });
      continue;
    }
    const seo = routeSeo(cityName(route.originCitySlug), route);
    if (seo.title.length > TITLE_LIMIT) issues.push({ path, issue: `Title is ${seo.title.length} characters` });
    if (!mentionsFare(seo.description)) issues.push({ path, issue: "Description does not mention a fare" });
    const routeFaqs = faqsFor({ citySlug: route.originCitySlug, routeId: route.id });
    if (guideFaqs(route.id).length === 0 && routeFaqs.length === 0) {
      issues.push({ path, issue: "No FAQ" });
    }
  }

  return issues;
}
