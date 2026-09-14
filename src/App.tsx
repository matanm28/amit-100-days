import { Compass, Heart } from 'lucide-react';
import { siteConfig, type SiteConfig } from './config/siteConfig';
import { useCountdown } from './hooks/useCountdown';
import { Hero } from './components/Hero';
import { CountdownGrid } from './components/CountdownGrid';
import { ServiceStory } from './components/ServiceStory';
import { Celebration } from './components/Celebration';

export default function App({ config = siteConfig }: { config?: SiteConfig }) {
  const { daysRemaining, error } = useCountdown(config.releaseDate, config.timezone);
  return (
    <>
      <a className="skip-link" href="#main">דילוג לתוכן</a>
      <header className="site-header"><a className="wordmark" href="#main" aria-label={`לוח השחרור של ${config.person.name}`}><Compass size={27} strokeWidth={1.5} aria-hidden="true" /><span>{config.person.name}<small>בדרך לאזרחות</small></span></a><span className="header-note">100 ימים. אינסוף תוכניות.</span><a className="header-link" href="#countdown-board">סופרים ביחד <span aria-hidden="true">↙</span></a></header>
      <main id="main"><Hero config={config} daysRemaining={daysRemaining} error={error} /><CountdownGrid daysRemaining={daysRemaining} /><ServiceStory config={config} /></main>
      <footer><span>לכל סדרה יש סוף. לכל סוף יש התחלה.</span><span>נעשה באהבה, בשביל {config.person.name} <Heart size={14} aria-hidden="true" /></span></footer>
      <Celebration active={daysRemaining === 0} />
    </>
  );
}
