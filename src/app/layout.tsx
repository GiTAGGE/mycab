import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { AttributionTracker } from "@/components/attribution-tracker";
import { ConsentBar } from "@/components/consent-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { brand } from "@/lib/brand";
import { consentDefaultScript } from "@/lib/consent-script";
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
  style: ["normal"],
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

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const measurementEnabled = Boolean(gtmId || pixelId);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {measurementEnabled ? (
          <script dangerouslySetInnerHTML={{ __html: consentDefaultScript() }} />
        ) : null}
        <AttributionTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBar gtmId={gtmId} pixelId={pixelId} />
      </body>
    </html>
  );
}
