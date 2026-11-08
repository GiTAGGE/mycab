import { ATTR_STORAGE_KEY } from "@/lib/brand";
import type { Attribution } from "@/types";

export const ATTR_COOKIE = "sc_attr";
export const CLIENT_ID_COOKIE = "sc_cid";

export const emptyAttribution = (): Attribution => ({
  firstTouchSource: null,
  firstTouchCampaign: null,
  firstTouchKeyword: null,
  firstTouchContent: null,
  firstLandingPage: null,
  lastTouchSource: null,
  lastTouchCampaign: null,
  gclid: null,
  fbclid: null,
  gbraid: null,
  wbraid: null,
  msclkid: null,
  utmSource: null,
  utmCampaign: null,
  utmContent: null,
  landingPage: null,
});

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution();
  try {
    const raw = window.localStorage.getItem(ATTR_STORAGE_KEY);
    if (!raw) return emptyAttribution();
    return { ...emptyAttribution(), ...JSON.parse(raw) };
  } catch {
    return emptyAttribution();
  }
}

export function captureAttributionFromLocation(): Attribution {
  if (typeof window === "undefined") return emptyAttribution();
  const params = new URLSearchParams(window.location.search);
  const existing = readAttribution();
  const gclid = params.get("gclid");
  const fbclid = params.get("fbclid");
  const gbraid = params.get("gbraid");
  const wbraid = params.get("wbraid");
  const msclkid = params.get("msclkid");
  const utmSource = params.get("utm_source");
  const utmCampaign = params.get("utm_campaign");
  const utmContent = params.get("utm_content");
  const keyword = params.get("utm_term") || params.get("keyword");

  let source = utmSource;
  if (!source && gclid) source = "google";
  if (!source && fbclid) source = "meta";
  if (!source && document.referrer) {
    try {
      const host = new URL(document.referrer).host;
      if (host && host !== window.location.host) source = "referral";
    } catch {
      source = "referral";
    }
  }

  const landingPage = window.location.pathname;
  const hasSignal = Boolean(source || gclid || fbclid || gbraid || wbraid || msclkid || utmCampaign);

  const next: Attribution = {
    ...existing,
    lastTouchSource: source ?? existing.lastTouchSource,
    lastTouchCampaign: utmCampaign ?? existing.lastTouchCampaign,
    gclid: gclid ?? existing.gclid,
    fbclid: fbclid ?? existing.fbclid,
    gbraid: gbraid ?? existing.gbraid,
    wbraid: wbraid ?? existing.wbraid,
    msclkid: msclkid ?? existing.msclkid,
    utmSource: utmSource ?? existing.utmSource,
    utmCampaign: utmCampaign ?? existing.utmCampaign,
    utmContent: utmContent ?? existing.utmContent,
    landingPage,
  };

  if (hasSignal && !existing.firstTouchSource) {
    next.firstTouchSource = source ?? null;
    next.firstTouchCampaign = utmCampaign;
    next.firstTouchKeyword = keyword;
    next.firstTouchContent = utmContent;
    next.firstLandingPage = landingPage;
  } else if (!existing.firstLandingPage) {
    next.firstLandingPage = landingPage;
    next.firstTouchSource = existing.firstTouchSource ?? source ?? "direct";
  }

  window.localStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(next));
  writeCookie(ATTR_COOKIE, JSON.stringify(next), 90);
  if (!readCookie(CLIENT_ID_COOKIE)) writeCookie(CLIENT_ID_COOKIE, crypto.randomUUID(), 730);
  return next;
}

function writeCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  const prefix = `${name}=`;
  const found = document.cookie.split("; ").find((part) => part.startsWith(prefix));
  return found ? decodeURIComponent(found.slice(prefix.length)) : null;
}

export function readRequestCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  const prefix = `${name}=`;
  const found = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix));
  if (!found) return null;
  try {
    return decodeURIComponent(found.slice(prefix.length));
  } catch {
    return null;
  }
}

export function attributionFromCookie(header: string | null): Attribution {
  const raw = readRequestCookie(header, ATTR_COOKIE);
  if (!raw) return emptyAttribution();
  try {
    return { ...emptyAttribution(), ...JSON.parse(raw) };
  } catch {
    return emptyAttribution();
  }
}

export function mergeAttribution(base: Attribution, extra: Partial<Attribution> | undefined): Attribution {
  const next = { ...base };
  if (!extra) return next;
  (Object.keys(next) as Array<keyof Attribution>).forEach((key) => {
    const value = extra[key];
    if (typeof value === "string" && value.length > 0) next[key] = value;
  });
  return next;
}

export function sourceLabel(attribution: Attribution): string {
  return (
    attribution.lastTouchSource ||
    attribution.firstTouchSource ||
    "direct"
  );
}
