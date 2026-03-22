import { SVGProps } from "react";

export function ElderSign(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" />
      {/* Inner star - five-pointed */}
      <polygon
        points="50,8 61,38 95,38 67,56 78,88 50,70 22,88 33,56 5,38 39,38"
        fill="currentColor"
        stroke="none"
        opacity="0.15"
      />
      <polygon
        points="50,8 61,38 95,38 67,56 78,88 50,70 22,88 33,56 5,38 39,38"
        fill="none"
      />
      {/* Center eye */}
      <ellipse cx="50" cy="48" rx="12" ry="8" />
      <circle cx="50" cy="48" r="4" fill="currentColor" stroke="none" />
      {/* Branch / tree symbol on top */}
      <line x1="50" y1="18" x2="50" y2="35" />
      <line x1="50" y1="24" x2="42" y2="18" />
      <line x1="50" y1="24" x2="58" y2="18" />
      <line x1="50" y1="29" x2="44" y2="24" />
      <line x1="50" y1="29" x2="56" y2="24" />
      {/* Flame at bottom */}
      <path d="M50 70 Q44 80 46 88 Q48 94 50 90 Q52 94 54 88 Q56 80 50 70Z" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  );
}
