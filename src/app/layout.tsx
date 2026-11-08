import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { AttributionTracker } from "@/components/attribution-tracker";
import { Measurement } from "@/components/measurement";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { brand } from "@/lib/brand";
import { consentDefaultScript, gtmBootstrapScript } from "@/lib/consent-script";
import { runtimeEnv } from "@/lib/runtime-env";
import { isIndexable, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brand.name} — ${brand.tagline.replace(/\.$/, "")}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Local cabs, airport transfers, car rentals and outstation trips from Hubli, Dharwad, Belgaum, Bangalore and Mangalore. Starting fares, then confirm on the phone or WhatsApp.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${brand.name} — ${brand.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  robots: isIndexable()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const env = await runtimeEnv();
  const gtmId = env.gtmId;
  const pixelId = env.metaPixelId;
  const gtmBoot = gtmBootstrapScript(gtmId);
  const measurementEnabled = Boolean(gtmBoot || pixelId);

  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {measurementEnabled ? (
          <script dangerouslySetInnerHTML={{ __html: consentDefaultScript() }} />
        ) : null}
        {gtmBoot ? <script dangerouslySetInnerHTML={{ __html: gtmBoot }} /> : null}
        {gtmBoot ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <AttributionTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Measurement gtmId={gtmId} pixelId={pixelId} />
      </body>
    </html>
  );
}
