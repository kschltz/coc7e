import { SVGProps } from "react";

export function TentacleDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 40"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      preserveAspectRatio="none"
      {...props}
    >
      {/* Left tentacle reaching toward center */}
      <path
        d="M0 20 Q40 18 80 22 Q120 28 150 18 Q170 12 185 20"
        strokeWidth="3"
        opacity="0.6"
      />
      <path
        d="M0 24 Q50 22 90 28 Q130 32 160 22 Q175 16 188 22"
        strokeWidth="2"
        opacity="0.35"
      />
      {/* Center eye */}
      <ellipse cx="200" cy="20" rx="14" ry="10" strokeWidth="2.5" fill="currentColor" fillOpacity="0.08" />
      <circle cx="200" cy="20" r="4" fill="currentColor" opacity="0.5" />
      {/* Right tentacle reaching toward center */}
      <path
        d="M400 20 Q360 18 320 22 Q280 28 250 18 Q230 12 215 20"
        strokeWidth="3"
        opacity="0.6"
      />
      <path
        d="M400 24 Q350 22 310 28 Q270 32 240 22 Q225 16 212 22"
        strokeWidth="2"
        opacity="0.35"
      />
      {/* Suction cups */}
      <circle cx="60" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="110" cy="25" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="150" cy="17" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="340" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="290" cy="25" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="250" cy="17" r="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}
