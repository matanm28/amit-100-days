import { Check, Flag } from 'lucide-react';
import { countdownValues, getCellState, getCompletedDays } from '../utils/countdown';
import { milestones } from '../data/milestones';
import { DayFact } from './DayFact';

export function CountdownGrid({ daysRemaining }: { daysRemaining: number | null }) {
  const completed = getCompletedDays(daysRemaining);
  const milestone = daysRemaining === null ? undefined : milestones[daysRemaining];
  return (
    <section id="countdown-board" className="board-section" aria-labelledby="board-title">
      <div className="section-heading"><div><span className="eyebrow">יום אחרי יום, איקס אחרי איקס</span><h2 id="board-title">כל יום מקרב אותך הביתה.</h2></div><span className="board-edition">לוח ה־100<br /><span>מהדורה חד־פעמית</span></span></div>
      <div className="board">
        <div className="board__top"><span><Flag size={16} aria-hidden="true" /> הדרך לאזרחות</span><span>{daysRemaining === null ? 'מחכים לתאריך השחרור' : `${completed} מתוך 100 ימים מאחורייך`}</span></div>
        <ol className="countdown-grid" aria-label="לוח מאה הימים, ממאה עד אחת" aria-describedby="board-legend">
          {countdownValues.map(value => {
            const state = getCellState(value, daysRemaining);
            return <li key={value} className={`countdown-cell countdown-cell--${state}`} data-state={state}
              aria-label={`${value} — ${state === 'past' ? 'עבר' : state === 'current' ? 'היום' : 'בהמשך'}`}
              aria-current={state === 'current' ? 'date' : undefined}><span data-countdown-value>{value}</span></li>;
          })}
        </ol>
        <div id="board-legend" className="board__legend"><span><i className="legend-past" aria-hidden="true" /> כבר מאחורייך</span><span><i className="legend-current" aria-hidden="true" /> היום</span><span><i className="legend-future" aria-hidden="true" /> עוד קצת</span></div>
        <div className="board__progress"><div role="progressbar" aria-label="התקדמות במאה הימים האחרונים" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completed} aria-valuetext={daysRemaining === null ? 'ממתינים לתאריך השחרור' : `${completed} מתוך 100 ימים`}><span style={{ width: `${completed}%` }} /></div><Check size={17} aria-hidden="true" /></div>
      </div>
      {milestone && <p className="milestone" role="note"><span aria-hidden="true">✦</span> {milestone}</p>}
      <DayFact daysRemaining={daysRemaining} />
      <p className="board-footnote">הלוח מתעדכן אוטומטית בכל יום, לפי שעון ישראל. את רק צריכה להגיע לחופש.</p>
    </section>
  );
}
