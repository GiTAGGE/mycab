export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`logo-mark ${className}`}>
      <rect width="32" height="32" rx="9" fill="#1B1512" />
      <circle cx="11" cy="18.5" r="6.15" fill="#F7F6F4" />
      <circle cx="21" cy="18.5" r="6.15" fill="#F7F6F4" />
      <rect x="7.4" y="10.15" width="17.2" height="3.35" rx="1.55" fill="#F7F6F4" />
      <path
        className="logo-route"
        d="M12.1 11.8h7.8"
        fill="none"
        stroke="#D4A24A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M8.15 18.15h5.7l.3 1.7H7.85z" fill="#1B1512" />
      <path d="M9.25 18.15 9.9 16.55h2.25l.65 1.6z" fill="#1B1512" />
      <circle cx="9.35" cy="19.85" r="0.78" fill="#F7F6F4" />
      <circle cx="12.7" cy="19.85" r="0.78" fill="#F7F6F4" />
      <g className="logo-pin">
        <path
          d="M21 14.7c1.35 0 2.35 1 2.35 2.35 0 1.65-2.35 4.3-2.35 4.3s-2.35-2.65-2.35-4.3c0-1.35 1-2.35 2.35-2.35z"
          fill="#8B3A2A"
        />
        <circle cx="21" cy="16.95" r="0.7" fill="#F7F6F4" />
      </g>
    </svg>
  );
}
