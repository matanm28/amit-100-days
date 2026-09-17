import { useState } from 'react';
import { Share2 } from 'lucide-react';

export function getShareMessage(name: string, daysRemaining: number | null) {
  if (daysRemaining === null) return `הלוח של ${name} בדרך לאזרחות`;
  if (daysRemaining > 0) return `עוד ${daysRemaining} ימים לשחרור של ${name}!`;
  if (daysRemaining === 0) return `היום ${name} משתחררת! 🎉`;
  return `${name} כבר משוחררת ${Math.abs(daysRemaining)} ימים! 🎉`;
}

export function ShareCountdown({ name, daysRemaining }: {
  name: string;
  daysRemaining: number | null;
}) {
  const [feedback, setFeedback] = useState('');

  const share = async () => {
    const url = window.location.href;
    const text = getShareMessage(name, daysRemaining);

    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: `סופרים לשחרור של ${name}`, text, url });
        setFeedback('העמוד שותף');
        return;
      }

      if (typeof navigator.clipboard?.writeText === 'function') {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setFeedback('הקישור הועתק');
        return;
      }

      setFeedback('השיתוף אינו זמין בדפדפן הזה');
    } catch (error) {
      setFeedback(error instanceof DOMException && error.name === 'AbortError'
        ? 'השיתוף בוטל'
        : 'לא הצלחנו לשתף כרגע');
    }
  };

  return (
    <div className="share-countdown">
      <button type="button" className="share-countdown__button" onClick={share}>
        <Share2 size={17} aria-hidden="true" />
        שיתוף הספירה
      </button>
      <span className="share-countdown__feedback" aria-live="polite" aria-atomic="true">
        {feedback}
      </span>
    </div>
  );
}
