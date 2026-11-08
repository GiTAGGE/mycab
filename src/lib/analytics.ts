import { readConsent } from "@/lib/consent";

type DataLayer = unknown[] & { push: (...items: unknown[]) => number };

function dataLayer(): DataLayer {
  const target = window as Window & { dataLayer?: DataLayer };
  target.dataLayer = target.dataLayer || ([] as unknown as DataLayer);
  return target.dataLayer;
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (readConsent() === "denied") return;
  dataLayer().push({ event, ...params });
}

export function trackGenerateLead(params: {
  eventId?: string;
  value: number | null;
  intent?: string;
  path: string;
}) {
  trackEvent("generate_lead", {
    event_id: params.eventId ?? null,
    value: params.value,
    currency: "INR",
    intent: params.intent ?? null,
    path: params.path,
  });
  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function" && params.eventId) {
    fbq("track", "Lead", { value: params.value ?? 0, currency: "INR" }, { eventID: params.eventId });
  }
}

function grantConsent() {
  const layer = dataLayer() as DataLayer & { push: (...items: unknown[]) => number };
  function gtag(...args: unknown[]) {
    layer.push(args);
  }
  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}

export function loadMeasurement(ids: { gtmId: string; pixelId: string }) {
  if (typeof window === "undefined") return;
  grantConsent();
  if (ids.gtmId) loadGtm(ids.gtmId);
  if (ids.pixelId) loadPixel(ids.pixelId);
}

function loadGtm(id: string) {
  if (document.getElementById("gtm-loader")) return;
  if (document.querySelector("script[src*='googletagmanager.com/gtm.js']")) return;
  dataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "gtm-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

type PixelStub = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: PixelStub;
};

function loadPixel(id: string) {
  if (document.getElementById("meta-pixel")) return;
  const target = window as Window & { fbq?: PixelStub; _fbq?: PixelStub };
  if (!target.fbq) {
    const fbq = function pixel(...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as PixelStub;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    target.fbq = fbq;
    target._fbq = fbq;
  }
  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  target.fbq("init", id);
  target.fbq("track", "PageView");
}
