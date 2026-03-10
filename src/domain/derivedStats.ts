export function calculateMaxHP(con: number, siz: number): number {
  return Math.floor((con + siz) / 10);
}

export function calculateMaxMP(pow: number): number {
  return Math.floor(pow / 5);
}

export function calculateStartingSAN(pow: number): number {
  return pow;
}

export function calculateMaxSAN(cthulhuMythos: number): number {
  return 99 - cthulhuMythos;
}

export function calculateMOV(
  dex: number,
  str: number,
  siz: number,
  age: number,
): number {
  let mov = 8;
  if (dex < siz && str < siz) {
    mov = 7;
  } else if (dex > siz && str > siz) {
    mov = 9;
  }

  if (age >= 40 && age <= 49) mov -= 1;
  else if (age >= 50 && age <= 59) mov -= 2;
  else if (age >= 60 && age <= 69) mov -= 3;
  else if (age >= 70 && age <= 79) mov -= 4;
  else if (age >= 80 && age <= 89) mov -= 5;

  return Math.max(1, mov);
}

export function calculateBuildAndDamageBonus(
  str: number,
  siz: number,
): { build: number; damageBonus: string } {
  const total = str + siz;
  if (total >= 2 && total <= 64) return { build: -2, damageBonus: "-2" };
  if (total >= 65 && total <= 84) return { build: -1, damageBonus: "-1" };
  if (total >= 85 && total <= 124) return { build: 0, damageBonus: "0" };
  if (total >= 125 && total <= 164) return { build: 1, damageBonus: "+1D4" };
  if (total >= 165 && total <= 204) return { build: 2, damageBonus: "+1D6" };
  if (total >= 205 && total <= 284) return { build: 3, damageBonus: "+2D6" };
  if (total >= 285 && total <= 364) return { build: 4, damageBonus: "+3D6" };
  if (total >= 365 && total <= 444) return { build: 5, damageBonus: "+4D6" };
  if (total >= 445 && total <= 524) return { build: 6, damageBonus: "+5D6" };
  // Fallback for extreme cases
  const extra = Math.floor((total - 445) / 80);
  return { build: 6 + extra, damageBonus: `+${5 + extra}D6` };
}
