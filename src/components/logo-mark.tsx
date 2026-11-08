import { useId } from "react";

export function LogoMark({ className = "h-[0.98em]" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const fillL = `${uid}-fillL`;
  const fillR = `${uid}-fillR`;
  const prism = `${uid}-prism`;

  return (
    <svg viewBox="0 0 52 32" aria-hidden="true" className={`logo-mark ${className}`}>
      <defs>
        <radialGradient id={fillL} cx="34%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="48%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <radialGradient id={fillR} cx="34%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f6d2c4" />
          <stop offset="50%" stopColor="#a34b38" />
          <stop offset="100%" stopColor="#8b3a2a" />
        </radialGradient>
        <linearGradient id={prism} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="48%" stopColor="#d4a24a" />
          <stop offset="100%" stopColor="#8b3a2a" />
        </linearGradient>
      </defs>
      <g className="logo-breathe">
        <g className="logo-lens-l">
          <circle cx="16" cy="16" r="13.4" fill={`url(#${fillL})`} />
          <circle cx="16" cy="16" r="13.4" fill="none" stroke="#b91c1c" strokeWidth="1.2" />
          <path
            d="M8.4 11.2A8.4 8.4 0 0 1 18.2 7.6"
            fill="none"
            stroke="#fff7ed"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity=".75"
          />
        </g>
        <g className="logo-lens-r">
          <circle cx="36" cy="16" r="13.4" fill={`url(#${fillR})`} />
          <circle cx="36" cy="16" r="13.4" fill="none" stroke="#6f2e22" strokeWidth="1.2" />
          <path
            d="M28.4 11.2A8.4 8.4 0 0 1 38.2 7.6"
            fill="none"
            stroke="#fff7ed"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity=".6"
          />
        </g>
        <path
          d="M21.5 6.8Q26 3.8 30.5 6.8"
          fill="none"
          stroke="#d4a24a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <g className="logo-prism">
          <path d="M26 11.4 29.2 16 26 20.6 22.8 16Z" fill={`url(#${prism})`} />
        </g>
        <circle cx="26" cy="16" r="1.05" fill="#fff7ed" />
      </g>
    </svg>
  );
}
