import { SVGProps } from "react";

export function CthulhuSilhouette(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 260"
      fill="currentColor"
      {...props}
    >
      {/* Head - elongated octopoid */}
      <ellipse cx="100" cy="60" rx="38" ry="48" />
      {/* Eyes */}
      <ellipse cx="85" cy="45" rx="8" ry="5" fill="var(--color-weird-teal, currentColor)" opacity="0.7" />
      <ellipse cx="115" cy="45" rx="8" ry="5" fill="var(--color-weird-teal, currentColor)" opacity="0.7" />
      {/* Face tentacles */}
      <path d="M80 70 Q75 100 60 120 Q55 130 58 125 Q70 105 82 78Z" />
      <path d="M88 75 Q85 110 75 135 Q72 142 76 138 Q86 115 92 82Z" />
      <path d="M96 78 Q95 115 90 145 Q88 152 92 148 Q98 120 100 82Z" />
      <path d="M104 78 Q105 115 110 145 Q112 152 108 148 Q102 120 100 82Z" />
      <path d="M112 75 Q115 110 125 135 Q128 142 124 138 Q114 115 108 82Z" />
      <path d="M120 70 Q125 100 140 120 Q145 130 142 125 Q130 105 118 78Z" />
      {/* Body / torso */}
      <path d="M70 95 Q65 100 62 120 L62 180 Q62 200 80 210 L80 210 Q90 215 100 215 Q110 215 120 210 L120 210 Q138 200 138 180 L138 120 Q135 100 130 95 Q115 88 100 88 Q85 88 70 95Z" />
      {/* Wings - left */}
      <path d="M62 120 Q40 100 20 105 Q5 110 2 125 Q0 140 15 150 Q30 155 50 145 Q58 140 62 135Z" opacity="0.85" />
      <path d="M62 130 Q45 120 25 128 Q15 135 18 148 Q22 155 35 155 Q50 152 60 142Z" opacity="0.6" />
      {/* Wings - right */}
      <path d="M138 120 Q160 100 180 105 Q195 110 198 125 Q200 140 185 150 Q170 155 150 145 Q142 140 138 135Z" opacity="0.85" />
      <path d="M138 130 Q155 120 175 128 Q185 135 182 148 Q178 155 165 155 Q150 152 140 142Z" opacity="0.6" />
      {/* Legs */}
      <path d="M80 210 Q78 230 72 250 Q70 258 75 255 Q82 240 85 215Z" />
      <path d="M92 214 Q90 235 88 255 Q87 260 91 257 Q94 240 95 218Z" />
      <path d="M108 214 Q110 235 112 255 Q113 260 109 257 Q106 240 105 218Z" />
      <path d="M120 210 Q122 230 128 250 Q130 258 125 255 Q118 240 115 215Z" />
      {/* Arms / claws */}
      <path d="M62 140 Q45 160 30 175 Q22 185 28 182 Q42 170 55 155 Q60 148 62 145Z" />
      <path d="M138 140 Q155 160 170 175 Q178 185 172 182 Q158 170 145 155 Q140 148 138 145Z" />
    </svg>
  );
}
