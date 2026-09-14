import { Flag, Sparkles } from 'lucide-react';
import { milestones } from '../data/milestones';

export function Countdown({ daysRemaining, name, error }: {
  daysRemaining: number | null; name: string; error: boolean;
}) {
  return (
    <div className="countdown" role="status" aria-live="polite" aria-atomic="true">
      {daysRemaining === null ? (
        <><Flag size={27} aria-hidden="true" /><div><strong>{error ? 'תאריך השחרור דורש תיקון' : 'בקרוב מתחילים לספור'}</strong>
          <p>{error ? 'הלוח יתעדכן אחרי תיקון התאריך.' : 'מחכים לתאריך השחרור, ואז כל יום נחשב.'}</p></div></>
      ) : daysRemaining > 100 ? (
        <><Flag size={27} aria-hidden="true" /><div><strong>עוד לא הגענו ל־100 האחרונים...</strong>
          <p>עוד {daysRemaining} ימים לשחרור</p></div></>
      ) : daysRemaining > 0 ? (
        <><span className="countdown__number">{daysRemaining}</span><div><strong>{daysRemaining <= 2 ? milestones[daysRemaining] : 'ימים לשחרור'}</strong>
          <p>עוד קצת, והחופש קורא לך.</p></div><span className="countdown__stamp" aria-hidden="true">סופרים<br />לאחור</span></>
      ) : daysRemaining === 0 ? (
        <><span className="countdown__number">0</span><div><strong>היום זה היום</strong><p>{name} השתחררה! 🎉</p></div></>
      ) : (
        <><Sparkles size={34} aria-hidden="true" /><div><strong>משוחררת כבר {Math.abs(daysRemaining)} ימים 🎉</strong><p>יש חיים אחרי ההשכמה.</p></div></>
      )}
    </div>
  );
}
