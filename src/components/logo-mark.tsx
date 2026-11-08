export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#1B1512" />
      <path d="M5.5 25.2h21" stroke="#3A322C" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="25.2" cy="10.2" r="1.7" fill="#D4A24A" />
      <path
        d="M7.4 19.15h13.1c.5 0 .95.28 1.16.74l.62 1.35c.2.44-.12.91-.6.91H6.15c-.48 0-.8-.47-.6-.91l.62-1.35c.21-.46.66-.74 1.23-.74z"
        fill="#F7F6F4"
      />
      <path
        d="M10.15 19.15l1.55-3.15c.28-.55.84-.88 1.44-.88h3.7c.6 0 1.16.33 1.44.88l1.4 3.15"
        fill="#F7F6F4"
      />
      <path d="M13.35 16.15l.85 2.55h3.05l-.7-2.55h-3.2z" fill="#D4A24A" />
      <circle cx="10.35" cy="22.35" r="1.7" fill="#F7F6F4" />
      <circle cx="10.35" cy="22.35" r="0.72" fill="#1B1512" />
      <circle cx="18.85" cy="22.35" r="1.7" fill="#F7F6F4" />
      <circle cx="18.85" cy="22.35" r="0.72" fill="#1B1512" />
    </svg>
  );
}
