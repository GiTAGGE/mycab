import { campaignLandingMap, taggedCampaignUrl } from "@/lib/campaign-landings";
import { OpsTable } from "@/components/ops/frame";

export const dynamic = "force-dynamic";

export default function OpsCampaignsPage() {
  const rows = campaignLandingMap();
  return (
    <>
      <p className="max-w-2xl text-sm text-ink-soft">
        A click should open the city or route page, never the homepage. Copy the final URL into Google Ads or Meta with the tags already filled.
      </p>
      <OpsTable
        columns={["Keyword", "Page", "Google", "Meta"]}
        rows={rows.map((row) => [
          row.keyword,
          row.path,
          <CopyValue key={`${row.path}-google`} value={taggedCampaignUrl(row.path, "google", row.keyword)} />,
          <CopyValue key={`${row.path}-meta`} value={taggedCampaignUrl(row.path, "meta", row.keyword)} />,
        ])}
      />
    </>
  );
}

function CopyValue({ value }: { value: string }) {
  return (
    <input
      readOnly
      value={value}
      className="w-full min-w-56 rounded-lg border border-line bg-paper px-2 py-1 text-xs"
      aria-label={value}
    />
  );
}
