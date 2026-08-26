interface WorldMapProps {
  className?: string;
}

/**
 * Decorative globe + flight-path backdrop for the dark hero. Purely visual,
 * hidden from assistive tech.
 */
export function WorldMap({ className }: WorldMapProps) {
  return (
    <svg
      viewBox="0 0 720 560"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#3b82f6" strokeOpacity="0.16" strokeWidth="1">
        <circle cx="470" cy="280" r="212" />
        <circle cx="470" cy="280" r="150" />
        <ellipse cx="470" cy="280" rx="212" ry="82" />
        <ellipse cx="470" cy="280" rx="128" ry="212" />
        <line x1="258" y1="280" x2="682" y2="280" />
        <line x1="470" y1="68" x2="470" y2="492" />
      </g>
      <g
        stroke="#f2b705"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="3 7"
        strokeLinecap="round"
      >
        <path d="M118 430 Q 330 120 626 214" />
        <path d="M92 300 Q 350 372 604 384" />
      </g>
      <g>
        <circle cx="118" cy="430" r="5" fill="#f2545c" />
        <circle cx="626" cy="214" r="5" fill="#f2b705" />
        <circle cx="92" cy="300" r="4" fill="#f2545c" />
        <circle cx="604" cy="384" r="4" fill="#f2b705" />
        <circle cx="470" cy="280" r="3.5" fill="#3b82f6" />
      </g>
    </svg>
  );
}
