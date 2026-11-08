export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://seecabs.com"
).replace(/\/$/, "");

export function isIndexable(): boolean {
  return process.env.INDEXABLE === "true";
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
