import { SVGProps } from "react";

export function InvestigatorSilhouette(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 280"
      fill="currentColor"
      {...props}
    >
      {/* Fedora hat */}
      <ellipse cx="60" cy="32" rx="35" ry="6" />
      <path d="M30 32 Q30 12 60 8 Q90 12 90 32Z" />
      <rect x="25" y="30" width="70" height="5" rx="2" />
      {/* Hat band */}
      <rect x="30" y="28" width="60" height="3" fill="var(--color-weird-red, currentColor)" opacity="0.8" />
      {/* Head */}
      <ellipse cx="60" cy="50" rx="18" ry="20" />
      {/* Neck */}
      <rect x="52" y="68" width="16" height="10" />
      {/* Trench coat body */}
      <path d="M35 78 L30 180 Q30 185 35 185 L50 185 L50 180 L42 100 Q45 85 60 82 Q75 85 78 100 L70 180 L70 185 L85 185 Q90 185 90 180 L85 78 Q80 72 60 70 Q40 72 35 78Z" />
      {/* Coat collar - left */}
      <path d="M42 78 L48 95 L55 82 Q50 75 42 78Z" fill="var(--color-weird-teal, currentColor)" opacity="0.5" />
      {/* Coat collar - right */}
      <path d="M78 78 L72 95 L65 82 Q70 75 78 78Z" fill="var(--color-weird-teal, currentColor)" opacity="0.5" />
      {/* Belt */}
      <rect x="38" y="140" width="44" height="4" opacity="0.8" />
      <rect x="57" y="138" width="6" height="8" rx="1" opacity="0.9" />
      {/* Left arm */}
      <path d="M35 82 Q22 90 18 110 L15 145 Q14 150 18 150 L22 150 Q25 150 25 146 L28 115 Q30 100 36 90Z" />
      {/* Right arm holding something (flashlight/book) */}
      <path d="M85 82 Q98 90 102 110 L105 130 Q106 134 102 134 L98 134 Q95 134 95 130 L92 115 Q90 100 84 90Z" />
      {/* Flashlight */}
      <rect x="98" y="126" width="18" height="6" rx="1" opacity="0.9" />
      <path d="M116 126 L122 122 L122 136 L116 132Z" fill="var(--color-weird-yellow, currentColor)" opacity="0.6" />
      {/* Legs */}
      <path d="M42 183 L38 255 Q37 260 42 260 L52 260 Q54 260 54 257 L50 185Z" />
      <path d="M70 183 L74 255 Q75 260 70 260 L60 260 Q58 260 58 257 L62 185Z" />
      {/* Shoes */}
      <path d="M36 255 L34 262 Q33 268 40 268 L54 268 Q58 268 56 262 L54 257Z" />
      <path d="M76 255 L78 262 Q79 268 72 268 L58 268 Q54 268 56 262 L58 257Z" />
    </svg>
  );
}
