export function calculateSanityLoss(current: number, loss: number): number {
  return Math.max(0, current - loss);
}

export function calculateSanityGain(
  current: number,
  gain: number,
  max: number,
): number {
  return Math.min(max, current + gain);
}
