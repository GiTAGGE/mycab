export function BrandRibbon({
  placement = "card",
}: {
  placement?: "card" | "header";
}) {
  return (
    <span className={`brand-ribbon brand-ribbon-${placement}`} aria-hidden>
      <span className="brand-ribbon-run" />
    </span>
  );
}
