import { brand } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import type { City } from "@/types";

export function taxiServiceJsonLd(city: City, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${brand.name} — ${city.name}`,
    description: city.seoDescription,
    url: absoluteUrl(path),
    areaServed: {
      "@type": "City",
      name: city.officialName ?? city.name,
      containedInPlace: { "@type": "State", name: city.state },
    },
    telephone: `+${brand.phoneNumber}`,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: absoluteUrl("/"),
      telephone: `+${brand.phoneNumber}`,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: absoluteUrl("/"),
    telephone: `+${brand.phoneNumber}`,
    description: brand.tagline,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: absoluteUrl("/"),
    description: brand.tagline,
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

export function routeServiceJsonLd(
  originCity: City,
  destination: string,
  path: string,
  details: { distanceKm: number; durationMinutes: number; fare: number; why: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${brand.name} ${originCity.name} to ${destination} cab`,
    description: details.why,
    url: absoluteUrl(path),
    areaServed: [
      {
        "@type": "City",
        name: originCity.officialName ?? originCity.name,
        containedInPlace: { "@type": "State", name: originCity.state },
      },
      { "@type": "Place", name: destination },
    ],
    telephone: `+${brand.phoneNumber}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: details.fare,
      description: `Starting sedan fare. About ${details.distanceKm} km. Fuel and the driver are in the base. Tolls, parking and waiting are confirmed before you pay.`,
    },
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
