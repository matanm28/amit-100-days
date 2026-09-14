import { describe, expect, it } from 'vitest';
import { getDaysRemaining, millisecondsUntilNextDay } from '../src/utils/date';

const timezone = 'Asia/Jerusalem';
describe('Jerusalem calendar dates', () => {
  it('decreases at Jerusalem midnight, not UTC midnight', () => {
    expect(getDaysRemaining('2026-11-14', new Date('2026-09-13T20:59:59Z'), timezone)).toBe(62);
    expect(getDaysRemaining('2026-11-14', new Date('2026-09-13T21:00:00Z'), timezone)).toBe(61);
  });
  it.each([
    ['2026-03-26T21:59:59Z', 3], ['2026-03-26T22:00:00Z', 2],
    ['2026-03-26T23:59:59Z', 2], ['2026-03-27T00:00:00Z', 2],
    ['2026-03-27T20:59:59Z', 2], ['2026-03-27T21:00:00Z', 1],
  ])('spring DST: %s has %i calendar days remaining', (instant, expected) => {
    expect(getDaysRemaining('2026-03-29', new Date(instant), timezone)).toBe(expected);
  });
  it.each([
    ['2026-10-24T20:59:59Z', 3], ['2026-10-24T21:00:00Z', 2],
    ['2026-10-24T22:59:59Z', 2], ['2026-10-24T23:00:00Z', 2],
    ['2026-10-25T21:59:59Z', 2], ['2026-10-25T22:00:00Z', 1],
  ])('autumn DST: %s has %i calendar days remaining', (instant, expected) => {
    expect(getDaysRemaining('2026-10-27', new Date(instant), timezone)).toBe(expected);
  });
  it('schedules midnight across 23-hour and 25-hour days', () => {
    expect(millisecondsUntilNextDay(new Date('2026-03-26T22:00:00Z'), timezone)).toBe(23 * 3600000 + 50);
    expect(millisecondsUntilNextDay(new Date('2026-10-24T21:00:00Z'), timezone)).toBe(25 * 3600000 + 50);
  });
  it('handles leap days and year boundaries', () => {
    expect(getDaysRemaining('2028-03-01', new Date('2028-02-28T12:00:00Z'), timezone)).toBe(2);
    expect(getDaysRemaining('2027-01-01', new Date('2026-12-31T12:00:00Z'), timezone)).toBe(1);
  });
  it.each(['YYYY-MM-DD', '2026-02-29', '2026-04-31', '2026-13-01', '2026-1-01', '2026-01-01T00:00:00Z', ''])('rejects invalid configuration: %s', releaseDate => {
    expect(() => getDaysRemaining(releaseDate, new Date('2026-01-01T00:00:00Z'), timezone)).toThrow(RangeError);
  });
});
