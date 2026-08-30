import { CheckIcon } from "@/components/icons";

export function TrustPills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent-dark"
        >
          <CheckIcon className="h-3.5 w-3.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}
