import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { AttributionTracker } from "@/components/attribution-tracker";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { brand } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
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
    default: `${brand.name} — fare first`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Local cabs, airport transfers, car rentals and outstation trips from Hubli, Dharwad, Belgaum, Bangalore and Mangalore. See the fare before you confirm.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <AttributionTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
