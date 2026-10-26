import { CheckIcon } from "@/components/icons";

export function TrustPills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-[11px] text-accent-dark sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm"
        >
          <CheckIcon className="h-3.5 w-3.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}
