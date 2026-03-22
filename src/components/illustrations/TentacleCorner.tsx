import { SVGProps } from "react";

export function TentacleCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="currentColor"
      {...props}
    >
      {/* Main tentacle curling from corner */}
      <path
        d="M0 0 Q5 20 12 35 Q20 55 35 65 Q50 72 60 68 Q68 62 62 55 Q55 50 48 55 Q42 60 46 66"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Second tentacle */}
      <path
        d="M0 5 Q10 15 20 28 Q30 45 45 55 Q55 60 58 52 Q60 44 52 42 Q45 42 44 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Third thin tentacle */}
      <path
        d="M5 0 Q15 10 28 20 Q42 30 55 35 Q65 38 68 30 Q70 22 62 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Suction cups on main tentacle */}
      <circle cx="20" cy="42" r="2.5" opacity="0.4" />
      <circle cx="30" cy="55" r="2.5" opacity="0.4" />
      <circle cx="42" cy="62" r="2" opacity="0.35" />
      <circle cx="52" cy="62" r="1.5" opacity="0.3" />
    </svg>
  );
}
