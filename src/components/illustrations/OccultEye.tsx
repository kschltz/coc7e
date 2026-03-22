import { SVGProps } from "react";

export function OccultEye(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 60"
      fill="currentColor"
      {...props}
    >
      {/* Outer eye shape */}
      <path
        d="M5 30 Q25 5 50 5 Q75 5 95 30 Q75 55 50 55 Q25 55 5 30Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Iris */}
      <circle cx="50" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Pupil */}
      <ellipse cx="50" cy="30" rx="6" ry="10" opacity="0.8" />
      {/* Light reflection */}
      <circle cx="46" cy="25" r="2.5" fill="var(--color-weird-paper, white)" opacity="0.6" />
      {/* Rays emanating */}
      <line x1="50" y1="0" x2="50" y2="5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="55" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="20" y1="10" x2="25" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="80" y1="10" x2="75" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="20" y1="50" x2="25" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="80" y1="50" x2="75" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}
