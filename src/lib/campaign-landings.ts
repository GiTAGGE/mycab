import { liveCities } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { servicePath } from "@/lib/urls";

export type CampaignLanding = {
  keyword: string;
  path: string;
  why: string;
};

/**
 * Final URLs for our own Google Ads campaigns.
 * Nothing is placed on the site — these are the pages a click should open.
 */
export function campaignLandingMap(): CampaignLanding[] {
  const rows: CampaignLanding[] = [
    {
      keyword: "cabs near me / taxi near me",
      path: "/hubli",
      why: "Near-me searches need a city. Default Hubli; do not buy this as a national keyword.",
    },
    {
      keyword: "cab booking / car rental (no city)",
      path: "/hubli/car-rental",
      why: "Attach a city in the ad. Generic terms waste spend.",
    },
  ];

  for (const city of liveCities()) {
    rows.push(
      {
        keyword: `cab in ${city.name.toLowerCase()} / cab service / taxi booking`,
        path: `/${city.slug}`,
        why: "City booking page — the page a city-branded ad should open.",
      },
      {
        keyword: `${city.name.toLowerCase()} car rental / car rental with driver`,
        path: servicePath(city, "car-rental"),
        why: "Driver included. Not a self-drive counter.",
      },
      {
        keyword: `${city.name.toLowerCase()} local taxi`,
        path: servicePath(city, "local-cabs"),
        why: "Hours in the city, not an A-to-B drop.",
      },
      {
        keyword: `${city.name.toLowerCase()} airport cab / airport taxi`,
        path: servicePath(city, "airport-taxi"),
        why: "Airport transfer page with the real airport code.",
      },
      {
        keyword: `${city.name.toLowerCase()} outstation taxi`,
        path: servicePath(city, "outstation-cabs"),
        why: "Intercity list. A specific route ad should use the route URL.",
      },
      {
        keyword: `${city.name.toLowerCase()} tours and travels`,
        path: servicePath(city, "tours"),
        why: "Multi-day / multi-stop, same car.",
      },
      {
        keyword: `tempo traveller in ${city.name.toLowerCase()}`,
        path: servicePath(city, "tempo-traveller"),
        why: "Group vehicle page, not the sedan homepage.",
      },
    );
  }

  rows.push(
    { keyword: "hubli to gokarna cab", path: "/hubli-to-gokarna-cab", why: "Route final URL." },
    { keyword: "hubli to goa cab", path: "/hubli-to-goa-cab", why: "Route final URL." },
    { keyword: "hubli to dandeli taxi", path: "/hubli-to-dandeli-cab", why: "Route final URL." },
    { keyword: "hubli to belgaum taxi", path: "/hubli-to-belgaum-cab", why: "Route final URL." },
    { keyword: "hubli to bangalore taxi", path: "/hubli-to-bangalore-cab", why: "Route final URL." },
    { keyword: "hubli to hampi cab", path: "/hubli-to-hampi-cab", why: "Route final URL." },
  );

  return rows;
}

export function taggedCampaignUrl(path: string, source: "google" | "meta", keyword: string): string {
  const url = new URL(path, SITE_URL);
  const slug = keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  url.searchParams.set("utm_source", source === "google" ? "google" : "meta");
  url.searchParams.set("utm_medium", source === "google" ? "cpc" : "paid");
  url.searchParams.set("utm_campaign", slug || "campaign");
  url.searchParams.set("utm_content", path.replace(/^\//, "") || "home");
  return url.toString();
}
