import { addDays, format, isValid, parseISO } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';

const MS_PER_CALENDAR_DAY = 86_400_000;

/** A calendar date mapped to a UTC day index, not elapsed local-time hours. */
function calendarDayIndex(value: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new RangeError('Release date must use YYYY-MM-DD.');
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (!isValid(date) || date.toISOString().slice(0, 10) !== value) {
    throw new RangeError('Release date must be a valid calendar date.');
  }
  return date.getTime() / MS_PER_CALENDAR_DAY;
}

export function getDaysRemaining(releaseDate: string, now: Date, timezone: string): number {
  const today = formatInTimeZone(now, timezone, 'yyyy-MM-dd');
  // Both dates are normalized to UTC calendar-day indices; DST cannot change their difference.
  return calendarDayIndex(releaseDate) - calendarDayIndex(today);
}

export function millisecondsUntilNextDay(now: Date, timezone: string): number {
  const today = formatInTimeZone(now, timezone, 'yyyy-MM-dd');
  const tomorrow = format(addDays(parseISO(today), 1), 'yyyy-MM-dd');
  const midnight = fromZonedTime(`${tomorrow}T00:00:00`, timezone);
  return Math.max(1, midnight.getTime() - now.getTime() + 50);
}

export function formatReleaseDate(value: string, timezone: string): string {
  calendarDayIndex(value);
  return new Intl.DateTimeFormat('he-IL', {
    timeZone: timezone, day: 'numeric', month: 'long', year: 'numeric',
  }).format(fromZonedTime(`${value}T12:00:00`, timezone));
}
