import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const siteBuildId = process.env.SITE_BUILD_ID || new Date().toISOString();
process.env.SITE_BUILD_ID = siteBuildId;

const indexable = process.env.INDEXABLE === "true";
const isDev = process.env.NODE_ENV === "development";

const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  isDev ? "'unsafe-eval'" : "",
  "https://www.googletagmanager.com",
  "https://*.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://googleads.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://connect.facebook.net",
]
  .filter(Boolean)
  .join(" ");

const connectSrc = [
  "connect-src 'self'",
  isDev ? "ws: wss:" : "",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://analytics.google.com",
  "https://*.analytics.google.com",
  "https://www.googletagmanager.com",
  "https://*.googletagmanager.com",
  "https://www.google.com",
  "https://googleads.g.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://connect.facebook.net",
  "https://www.facebook.com",
  "https://graph.facebook.com",
]
  .filter(Boolean)
  .join(" ");

const contentSecurityPolicy = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://*.g.doubleclick.net https://www.googleadservices.com https://www.facebook.com",
  "font-src 'self' data:",
  connectSrc,
  "frame-src https://www.googletagmanager.com",
  "base-uri 'self'",
  "form-action 'self' http://127.0.0.1:* http://localhost:*",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  ...(indexable
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  env: {
    SITE_BUILD_ID: siteBuildId,
  },
  async redirects() {
    return [
      {
        source: "/hubli-to-murudheshwara-cab",
        destination: "/hubli-to-murudeshwar-cab",
        permanent: true,
      },
      {
        source: "/hubli-to-hosapete-cab",
        destination: "/hubli-to-hospet-cab",
        permanent: true,
      },
      {
        source: "/:city/one-way-cabs",
        destination: "/:city/outstation-cabs",
        permanent: true,
      },
      {
        source: "/:city/round-trip-cabs",
        destination: "/:city/outstation-cabs",
        permanent: true,
      },
      {
        source: "/cab-service-in-:city",
        destination: "/:city",
        permanent: true,
      },
      {
        source: "/:city-tours-and-travels",
        destination: "/:city/tours",
        permanent: true,
      },
      {
        source: "/tempo-traveller-rental-:city",
        destination: "/:city/tempo-traveller",
        permanent: true,
      },
      {
        source: "/:city-car-rental",
        destination: "/:city/car-rental",
        permanent: true,
      },
      {
        source: "/hubli-to-goa-taxi",
        destination: "/hubli-to-goa-cab",
        permanent: true,
      },
    ];
  },
  async headers() {
    const htmlCache = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";
    const privateNoStore = "private, no-store";
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:path((?!api$|api/|ops$|ops/|_next/).*)",
        headers: [{ key: "Cache-Control", value: htmlCache }],
      },
      { source: "/", headers: [{ key: "Cache-Control", value: htmlCache }] },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: privateNoStore }] },
      {
        source: "/ops",
        headers: [
          { key: "Cache-Control", value: privateNoStore },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/ops/:path*",
        headers: [
          { key: "Cache-Control", value: privateNoStore },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
