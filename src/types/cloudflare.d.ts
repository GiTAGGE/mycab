import type { SqlDatabase } from "@/lib/db/sql";

declare global {
  interface CloudflareEnv {
    DB?: SqlDatabase;
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_WHATSAPP_NUMBER?: string;
    NEXT_PUBLIC_PHONE_NUMBER?: string;
    NEXT_PUBLIC_GTM_ID?: string;
    NEXT_PUBLIC_META_PIXEL_ID?: string;
    NEXT_PUBLIC_GOOGLE_ADS_ID?: string;
    NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?: string;
    INDEXABLE?: string;
    SITE_BUILD_ID?: string;
    GA4_MEASUREMENT_ID?: string;
    GA4_API_SECRET?: string;
    META_CAPI_ACCESS_TOKEN?: string;
    OPS_PASSWORD?: string;
    OPS_SESSION_SECRET?: string;
    CF_ACCESS_TEAM_DOMAIN?: string;
    CF_ACCESS_AUD?: string;
  }
}

export {};
