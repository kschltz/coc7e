export function half(value: number): number {
  return Math.floor(value / 2);
}

export function fifth(value: number): number {
  return Math.floor(value / 5);
}

export function createAttribute(value: number) {
  return {
    value,
    half: half(value),
    fifth: fifth(value),
  };
}
