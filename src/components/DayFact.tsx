import { Hash, Sparkles } from 'lucide-react';
import { getDayFact } from '../data/dayFacts';

export function DayFact({ daysRemaining }: { daysRemaining: number | null }) {
  const fact = getDayFact(daysRemaining);
  if (!fact || daysRemaining === null) return null;

  return (
    <aside className="day-fact" aria-label={`האנקדוטה של יום ${daysRemaining}`}>
      <span className="day-fact__number" aria-hidden="true"><Hash size={16} />{daysRemaining}</span>
      <div>
        <span className="day-fact__label"><Sparkles size={14} aria-hidden="true" /> הידעת? לא חובה למבחן</span>
        <p>{fact}</p>
      </div>
    </aside>
  );
}
