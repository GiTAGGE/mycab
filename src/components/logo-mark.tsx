export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`logo-mark ${className}`}>
      <rect width="32" height="32" rx="8" fill="#1B1512" />
      <path
        d="M10.2 22.4C11.4 15.2 16.2 12.6 22.4 11.2"
        fill="none"
        stroke="#F4EFE8"
        strokeWidth="2.35"
        strokeLinecap="round"
      />
      <circle cx="10.2" cy="22.4" r="2.55" fill="#F4EFE8" />
      <circle cx="22.4" cy="11.2" r="2.7" fill="#D4A24A" />
    </svg>
  );
}
