import { useEffect, useRef } from 'react';

export function Celebration({ active }: { active: boolean }) {
  const celebrated = useRef(false);
  useEffect(() => {
    if (!active || celebrated.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;
    let cancelled = false;
    void import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled || reducedMotion.matches || celebrated.current) return;
      celebrated.current = true;
      void confetti({ particleCount: 120, spread: 85, origin: { y: 0.65 },
        colors: ['#59643b', '#d4a72c', '#b6a57a', '#f4f0e5'], disableForReducedMotion: true });
    }).catch(() => { /* The release message remains usable if the optional effect cannot load. */ });
    return () => { cancelled = true; };
  }, [active]);
  return null;
}
