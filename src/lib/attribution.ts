import { ATTR_STORAGE_KEY } from "@/lib/brand";
import type { Attribution } from "@/types";

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
  const hasSignal = Boolean(source || gclid || fbclid || utmCampaign);

  const next: Attribution = {
    ...existing,
    lastTouchSource: source ?? existing.lastTouchSource,
    lastTouchCampaign: utmCampaign ?? existing.lastTouchCampaign,
    gclid: gclid ?? existing.gclid,
    fbclid: fbclid ?? existing.fbclid,
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
  return next;
}

export function sourceLabel(attribution: Attribution): string {
  return (
    attribution.lastTouchSource ||
    attribution.firstTouchSource ||
    "direct"
  );
}
