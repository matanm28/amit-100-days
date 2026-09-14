import { describe, expect, it } from 'vitest';
import { countdownValues, getCellState, getCompletedDays } from '../src/utils/countdown';

describe('the deterministic 100-day board', () => {
  it('has exactly 100 descending, unique, complete integer values', () => {
    expect(countdownValues).toHaveLength(100);
    expect(countdownValues[0]).toBe(100);
    expect(countdownValues[99]).toBe(1);
    expect(new Set(countdownValues).size).toBe(100);
    expect(countdownValues.every(value => Number.isInteger(value) && value >= 1 && value <= 100)).toBe(true);
    expect([...countdownValues].sort((a, b) => a - b)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    expect(countdownValues).toEqual(Array.from({ length: 100 }, (_, i) => 100 - i));
  });
  it('marks 100 through 64 as past when 63 days remain', () => {
    expect(countdownValues.filter(value => getCellState(value, 63) === 'past')).toHaveLength(37);
    expect(getCellState(63, 63)).toBe('current');
    expect(countdownValues.filter(value => getCellState(value, 63) === 'future')).toHaveLength(62);
  });
  it.each([101, 123, null])('keeps all cells unmarked before countdown: %s', days => {
    expect(countdownValues.every(value => getCellState(value, days) === 'future')).toBe(true);
    expect(getCompletedDays(days)).toBe(0);
  });
  it.each([0, -1, -200])('marks all cells as past on or after release: %s', days => {
    expect(countdownValues.every(value => getCellState(value, days) === 'past')).toBe(true);
    expect(getCompletedDays(days)).toBe(100);
  });
});
