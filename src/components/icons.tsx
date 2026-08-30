export function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function PlaneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 13.5 10.2 12 21 4.5 19.5 15.5 13.8 17.2 11.5 21 9.8 16.2 3 13.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 15.5h16M5.5 15.5 7 9.2A2 2 0 0 1 8.9 8h6.2A2 2 0 0 1 17 9.2L18.5 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="16.5" r="1.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="16.5" r="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v4.5L15 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 10 17.5 19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.2A9.7 9.7 0 0 0 3.1 16.4L2 22l5.8-1.1A9.8 9.8 0 1 0 12 2.2Zm5.4 13.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5 0-.3 0-.7-.1-1.2-.3-2.1-.8-3.5-2.6-3.6-2.7-.1-.1-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.7 2 .8 2.1.1.2.1.3 0 .5-.1.2-.2.3-.3.5l-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.8 2.1 1.2.9 2.2 1.2 2.5 1.3.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1.1.3.2.5.2.6.4.1.3 0 .8-.2 1.4Z" />
    </svg>
  );
}
