import { inr } from "@/lib/format";
import { OpsNav } from "@/components/ops/nav";

export function OpsFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <p className="text-sm font-medium text-accent-dark">Internal</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="display text-4xl">Operating system</h1>
        <form action="/api/ops/logout" method="post">
          <button type="submit" className="text-sm text-muted hover:text-ink">
            Log out
          </button>
        </form>
      </div>
      <OpsNav />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function OpsTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
}) {
  return (
    <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-line/70 last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function fareLabel(amount: number | null): string {
  return amount == null ? "—" : inr(amount);
}
