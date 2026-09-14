import { useEffect, useState } from 'react';
import { getDaysRemaining, millisecondsUntilNextDay } from '../utils/date';

export function useCountdown(releaseDate: string | null, timezone: string) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const current = new Date();
      setNow(current);
      timer = setTimeout(refresh, millisecondsUntilNextDay(current, timezone));
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    refresh();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', refresh);
    };
  }, [timezone]);

  if (!releaseDate) return { daysRemaining: null, error: false };
  try {
    return { daysRemaining: getDaysRemaining(releaseDate, now, timezone), error: false };
  } catch {
    return { daysRemaining: null, error: true };
  }
}
