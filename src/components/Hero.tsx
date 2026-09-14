import { ArrowDown, MapPin, Star } from 'lucide-react';
import type { SiteConfig } from '../config/siteConfig';
import { Photo } from './Photo';
import { Countdown } from './Countdown';
import { formatReleaseDate } from '../utils/date';

export function Hero({ config, daysRemaining, error }: {
  config: SiteConfig; daysRemaining: number | null; error: boolean;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <div className="eyebrow"><span className="eyebrow__line" /> המבצע האחרון: אזרחות</div>
        <h1 id="hero-title" aria-label={config.headline}><span>100 ימים לשחרור</span><span className="hero__subtitle"> — כי גם לסדרות חינוך<br className="desktop-break" /> יש <em>סוף טוב</em></span></h1>
        <p className="hero__intro">{config.person.name}, את כל הדרך הזאת כבר עשית.<br />עכשיו נשאר רק לספור את הימים לפרק הבא.</p>
        <Countdown daysRemaining={daysRemaining} name={config.person.name} error={error} />
        <div className="hero__meta"><span><Star size={15} aria-hidden="true" /> חיל החינוך והנוער</span>
          <span><MapPin size={15} aria-hidden="true" /> ירושלים והסביבה</span></div>
        {config.releaseDate && !error && <p className="release-date">נפגשים באזרחות: <time dateTime={config.releaseDate}>{formatReleaseDate(config.releaseDate, config.timezone)}</time></p>}
        <a className="board-link" href="#countdown-board">ללוח הספירה <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
      <div className="hero__visual">
        <div className="route-doodle" aria-hidden="true"><svg viewBox="0 0 400 410"><path d="M50 60C160 0 350 50 320 140S30 150 80 250s250-60 260 90" /><circle cx="50" cy="60" r="7" /><path d="m325 334 16 9 10-17" /></svg></div>
        <span className="field-tag">יומן מסע / {config.person.name}</span>
        <Photo src={config.images.uniform} alt={`${config.person.name} במדים`} caption="עוד רגע, ואלה תמונות נוסטלגיה." variant="uniform" />
        <span className="hand-note">התחנה הבאה: חופש ♡</span>
      </div>
    </section>
  );
}
