export type RuntimeEnv = {
  siteUrl: string;
  gtmId: string;
  metaPixelId: string;
  googleAdsId: string;
  googleAdsLeadLabel: string;
  indexable: boolean;
  ga4MeasurementId: string;
  ga4ApiSecret: string;
  metaCapiToken: string;
  opsPassword: string;
  opsSessionSecret: string;
  accessTeamDomain: string;
  accessAudience: string;
};

function fromProcess(): RuntimeEnv {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://seecabs.seecabs99.workers.dev",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
    googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || "",
    indexable: process.env.INDEXABLE === "true",
    ga4MeasurementId: process.env.GA4_MEASUREMENT_ID || "",
    ga4ApiSecret: process.env.GA4_API_SECRET || "",
    metaCapiToken: process.env.META_CAPI_ACCESS_TOKEN || "",
    opsPassword: process.env.OPS_PASSWORD || "",
    opsSessionSecret: process.env.OPS_SESSION_SECRET || "",
    accessTeamDomain: process.env.CF_ACCESS_TEAM_DOMAIN || "",
    accessAudience: process.env.CF_ACCESS_AUD || "",
  };
}

function prefer(current: string, next: unknown): string {
  return typeof next === "string" && next.length > 0 ? next : current;
}

export async function runtimeEnv(): Promise<RuntimeEnv> {
  const env = fromProcess();
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env: cf } = await getCloudflareContext({ async: true });
    env.siteUrl = prefer(env.siteUrl, cf.NEXT_PUBLIC_SITE_URL);
    env.gtmId = prefer(env.gtmId, cf.NEXT_PUBLIC_GTM_ID);
    env.metaPixelId = prefer(env.metaPixelId, cf.NEXT_PUBLIC_META_PIXEL_ID);
    env.googleAdsId = prefer(env.googleAdsId, cf.NEXT_PUBLIC_GOOGLE_ADS_ID);
    env.googleAdsLeadLabel = prefer(env.googleAdsLeadLabel, cf.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL);
    if (cf.INDEXABLE === "true") env.indexable = true;
    if (cf.INDEXABLE === "false") env.indexable = false;
    env.ga4MeasurementId = prefer(env.ga4MeasurementId, cf.GA4_MEASUREMENT_ID);
    env.ga4ApiSecret = prefer(env.ga4ApiSecret, cf.GA4_API_SECRET);
    env.metaCapiToken = prefer(env.metaCapiToken, cf.META_CAPI_ACCESS_TOKEN);
    env.opsPassword = prefer(env.opsPassword, cf.OPS_PASSWORD);
    env.opsSessionSecret = prefer(env.opsSessionSecret, cf.OPS_SESSION_SECRET);
    env.accessTeamDomain = prefer(env.accessTeamDomain, cf.CF_ACCESS_TEAM_DOMAIN);
    env.accessAudience = prefer(env.accessAudience, cf.CF_ACCESS_AUD);
  } catch {
    // next dev and next start keep working from process.env when the adapter is absent.
  }
  return env;
}
