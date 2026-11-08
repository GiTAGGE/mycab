import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ops",
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: LayoutProps<"/ops">) {
  return children;
}
