import { useId } from "react";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const fillL = `${uid}-fillL`;
  const fillR = `${uid}-fillR`;
  const ringL = `${uid}-ringL`;
  const ringR = `${uid}-ringR`;
  const bridge = `${uid}-bridge`;
  const prism = `${uid}-prism`;
  const mix = `${uid}-mix`;
  const soft = `${uid}-soft`;
  const strong = `${uid}-strong`;

  return (
    <svg viewBox="84 112 232 176" aria-hidden="true" className={`logo-mark ${className}`}>
      <defs>
        <radialGradient id={fillL} cx="36%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#ccfbf1" />
          <stop offset="38%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#042f2e" />
        </radialGradient>
        <radialGradient id={fillR} cx="36%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="38%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#2e1065" />
        </radialGradient>
        <linearGradient id={ringL} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id={ringR} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id={bridge} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id={prism} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="50%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <radialGradient id={mix} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a5f3fc" stopOpacity=".55" />
          <stop offset="55%" stopColor="#c4b5fd" stopOpacity=".22" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
        <filter id={soft} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={strong} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="logo-breathe">
        <g fill="none" strokeWidth="1.7" opacity=".55">
          <line className="logo-persp" x1="200" y1="200" x2="46" y2="70" stroke="#5eead4" />
          <line className="logo-persp logo-persp-2" x1="200" y1="200" x2="354" y2="70" stroke="#c084fc" />
          <line className="logo-persp logo-persp-3" x1="200" y1="200" x2="46" y2="330" stroke="#5eead4" />
          <line className="logo-persp logo-persp-4" x1="200" y1="200" x2="354" y2="330" stroke="#c084fc" />
          <line className="logo-persp logo-persp-5" x1="200" y1="200" x2="200" y2="26" stroke="#94a3b8" />
          <line className="logo-persp logo-persp-6" x1="200" y1="200" x2="200" y2="374" stroke="#94a3b8" />
        </g>
        <circle
          className="logo-ring"
          cx="200"
          cy="200"
          r="96"
          fill="none"
          stroke="#64748b"
          strokeWidth="1.6"
          strokeDasharray="2 12"
          strokeLinecap="round"
          opacity=".7"
        />
        <line x1="94" y1="200" x2="306" y2="200" stroke={`url(#${bridge})`} strokeWidth="1" strokeDasharray="3 7" opacity=".18" />
        <g className="logo-lens-l">
          <circle className="logo-glow-l" cx="155" cy="200" r="66" fill="#5eead4" opacity=".28" />
          <circle cx="155" cy="200" r="50" fill={`url(#${fillL})`} />
          <circle cx="155" cy="200" r="58" fill="none" stroke={`url(#${ringL})`} strokeWidth="5" />
          <g stroke="#5eead4" strokeWidth="1.4" opacity=".7">
            <line x1="155" y1="200" x2="119" y2="164" />
            <line x1="155" y1="200" x2="191" y2="164" />
            <line x1="155" y1="200" x2="119" y2="236" />
            <line x1="155" y1="200" x2="191" y2="236" />
          </g>
          <path d="M118 170A50 50 0 0 1 165 152" fill="none" stroke="#99f6e4" strokeWidth="2" strokeLinecap="round" opacity=".55" />
        </g>
        <g className="logo-lens-r">
          <circle className="logo-glow-r" cx="245" cy="200" r="66" fill="#c084fc" opacity=".28" />
          <circle cx="245" cy="200" r="50" fill={`url(#${fillR})`} />
          <circle cx="245" cy="200" r="58" fill="none" stroke={`url(#${ringR})`} strokeWidth="5" />
          <g stroke="#c084fc" strokeWidth="1.4" opacity=".7">
            <line x1="245" y1="200" x2="209" y2="164" />
            <line x1="245" y1="200" x2="281" y2="164" />
            <line x1="245" y1="200" x2="209" y2="236" />
            <line x1="245" y1="200" x2="281" y2="236" />
          </g>
          <path d="M208 170A50 50 0 0 1 255 152" fill="none" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" opacity=".55" />
        </g>
        <ellipse cx="200" cy="200" rx="24" ry="48" fill={`url(#${mix})`} filter={`url(#${soft})`} opacity=".8" />
        <path d="M178 158Q200 146 222 158" fill="none" stroke={`url(#${bridge})`} strokeWidth="2.5" strokeLinecap="round" filter={`url(#${soft})`} opacity=".85" />
        <line className="logo-scan" x1="186" y1="168" x2="214" y2="168" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
        <g className="logo-prism">
          <path d="M200 184L214 200L200 216L186 200Z" fill={`url(#${prism})`} filter={`url(#${strong})`} opacity=".95" />
        </g>
        <circle cx="200" cy="200" r="2.6" fill="#ffffff" opacity=".9" />
        <circle className="logo-particle" cx="102" cy="142" r="3.2" fill="#14b8a6" />
        <circle className="logo-particle logo-particle-2" cx="298" cy="142" r="3.2" fill="#a855f7" />
        <circle className="logo-particle logo-particle-3" cx="102" cy="258" r="2.6" fill="#14b8a6" />
        <circle className="logo-particle logo-particle-4" cx="298" cy="258" r="2.6" fill="#a855f7" />
        <circle className="logo-particle logo-particle-5" cx="200" cy="128" r="2.2" fill="#334155" />
        <circle className="logo-particle logo-particle-6" cx="200" cy="274" r="2.2" fill="#334155" />
      </g>
    </svg>
  );
}
