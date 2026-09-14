import { Backpack, BookOpen, Compass, Heart, MapPin } from 'lucide-react';
import type { SiteConfig } from '../config/siteConfig';
import { Photo } from './Photo';

export function ServiceStory({ config }: { config: SiteConfig }) {
  return (
    <section className="story" aria-labelledby="story-title">
      <div className="story__photo"><Photo src={config.images.civilian} alt={`${config.person.name} באזרחות`} caption="אותה עמית. קצת יותר חופש." variant="civilian" /><span className="story__sticker"><Heart size={18} aria-hidden="true" /> הפרק הכי טוב עוד לפנייך</span></div>
      <div className="story__copy"><span className="eyebrow">מהדרך הזאת לדרך שלך</span><h2 id="story-title">סוף מסלול.<br /><em>תחילת הסיפור.</em></h2><p>{config.personalMessage}</p>
        <div className="journey" aria-label="זיכרונות מהדרך"><span><BookOpen aria-hidden="true" />סדרות חינוך</span><span><MapPin aria-hidden="true" />סמטאות ירושלים</span><span><Backpack aria-hidden="true" />תיק מלא סיפורים</span></div>
        <p className="story__signoff"><Compass size={20} aria-hidden="true" /> הפעם, את בוחרת את המסלול.</p>
      </div>
    </section>
  );
}
