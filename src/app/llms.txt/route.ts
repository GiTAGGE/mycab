import { liveCities, networkServices } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export function GET() {
  const cities = liveCities();
  const lines = [
    "# SeeCabs",
    "Karnataka cabs. See the fare before you confirm.",
    "",
    "Live cities:",
    ...cities.map((city) => `- ${city.name}: ${absoluteUrl(`/${city.slug}`)}`),
    "",
    "Services, each with its own URL in every live city:",
    ...networkServices().map((service) => `- ${service.name} (/${service.slug})`),
    "",
    "Each route has its own URL and a starting sedan fare. Tolls, parking, and waiting are confirmed before payment.",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
  ];
  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
