export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`logo-mark ${className}`}>
      <rect width="32" height="32" rx="7" fill="#211C19" />
      <path
        d="M8.2 24.2C8.2 15.2 14.6 18.4 23.4 9.2"
        fill="none"
        stroke="#F4EBDD"
        strokeWidth="1.45"
        strokeLinecap="round"
        opacity="0.38"
      />
      <path
        className="route-path"
        d="M8.2 24.2C8.2 15.2 14.6 18.4 23.4 9.2"
        fill="none"
        stroke="#F4EBDD"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <circle cx="8.2" cy="24.2" r="2.2" fill="#F4EBDD" />
      <g className="stop-node">
        <rect
          x="21.25"
          y="7.05"
          width="4.3"
          height="4.3"
          rx="0.55"
          transform="rotate(45 23.4 9.2)"
          fill="#C9963A"
        />
      </g>
    </svg>
  );
}
