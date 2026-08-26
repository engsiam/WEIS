interface WorldMapProps {
  className?: string;
}

/**
 * Decorative globe + flight-path backdrop for the dark hero (§8).
 * Everything moves on long, gentle loops:
 *  - dashed routes "flow" like radar traces
 *  - comet markers travel each flight path (CSS motion path)
 *  - origin/destination nodes emit sonar pulses
 *  - the wireframe globe rotates once every 90s
 * All loops are pure CSS transforms/opacity — cheap on the GPU — and are
 * disabled under prefers-reduced-motion.
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
      {/* Wireframe globe — slow rotation */}
      <g
        className="hero-globe"
        stroke="#3b82f6"
        strokeOpacity="0.16"
        strokeWidth="1"
        style={{ transformOrigin: "470px 280px" }}
      >
        <circle cx="470" cy="280" r="212" />
        <circle cx="470" cy="280" r="150" />
        <ellipse cx="470" cy="280" rx="212" ry="82" />
        <ellipse cx="470" cy="280" rx="128" ry="212" />
        <line x1="258" y1="280" x2="682" y2="280" />
        <line x1="470" y1="68" x2="470" y2="492" />
      </g>

      {/* Flight routes — flowing dashes */}
      <g
        stroke="#f2b705"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="3 7"
        strokeLinecap="round"
        className="route-flow"
      >
        <path d="M118 430 Q 330 120 626 214" />
      </g>
      <g
        stroke="#f2545c"
        strokeOpacity="0.38"
        strokeWidth="1.3"
        strokeDasharray="3 7"
        strokeLinecap="round"
        className="route-flow-slow"
      >
        <path d="M92 300 Q 350 372 604 384" />
      </g>

      {/* Sonar pulses on key nodes */}
      <g aria-hidden="true">
        <circle className="node-pulse" cx="118" cy="430" r="5" fill="#f2545c" />
        <circle className="node-pulse node-pulse-delayed" cx="626" cy="214" r="5" fill="#f2b705" />
        <circle className="node-pulse node-pulse-delayed" cx="92" cy="300" r="4" fill="#f2545c" />
        <circle className="node-pulse" cx="604" cy="384" r="4" fill="#f2b705" />
        <circle className="node-pulse node-pulse-delayed" cx="470" cy="280" r="3.5" fill="#3b82f6" />
      </g>

      {/* Static endpoint dots */}
      <g>
        <circle cx="118" cy="430" r="5" fill="#f2545c" />
        <circle cx="626" cy="214" r="5" fill="#f2b705" />
        <circle cx="92" cy="300" r="4" fill="#f2545c" />
        <circle cx="604" cy="384" r="4" fill="#f2b705" />
        <circle cx="470" cy="280" r="3.5" fill="#3b82f6" />
      </g>

      {/* Comets travelling the routes (CSS motion path) */}
      <circle
        className="flight-dot"
        r="4"
        fill="#fbcf3b"
        style={{
          offsetPath: 'path("M118 430 Q 330 120 626 214")',
        }}
      />
      <circle
        className="flight-dot flight-dot-slow"
        r="3.2"
        fill="#f2545c"
        style={{
          offsetPath: 'path("M92 300 Q 350 372 604 384")',
        }}
      />
    </svg>
  );
}
