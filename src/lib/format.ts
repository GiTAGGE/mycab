export function inr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function inrFrom(amount: number): string {
  return `From ${inr(amount)}`;
}

export function durationLabel(minutes: number): string {
  if (minutes < 60) return `~${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return `~${hours} hr`;
  return `~${hours} hr ${rest} min`;
}

export function prettyDate(value: string | null): string {
  if (!value) return "Date not set";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function tomorrowISO(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function telHref(value: string): string {
  return `tel:+${phoneDigits(value)}`;
}

export function nationalPhone(value: string): string {
  const digits = phoneDigits(value);
  const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  if (local.length === 10) return `${local.slice(0, 5)} ${local.slice(5)}`;
  return local;
}

export function internationalPhone(value: string): string {
  const digits = phoneDigits(value);
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}
