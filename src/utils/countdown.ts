export const countdownValues = Object.freeze(Array.from({ length: 100 }, (_, index) => 100 - index));

export type CellState = 'past' | 'current' | 'future';

export function getCellState(value: number, daysRemaining: number | null): CellState {
  if (daysRemaining === null || daysRemaining > 100) return 'future';
  if (value > daysRemaining) return 'past';
  return value === daysRemaining ? 'current' : 'future';
}

export function getCompletedDays(daysRemaining: number | null): number {
  return daysRemaining === null ? 0 : Math.min(100, Math.max(0, 100 - daysRemaining));
}
