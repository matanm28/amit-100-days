export interface SiteConfig {
  person: { name: string };
  releaseDate: string | null;
  timezone: string;
  headline: string;
  description: string;
  images: { uniform: string | null; civilian: string | null };
  personalMessage: string;
}

export const siteConfig: SiteConfig = {
  person: { name: 'עמית' },
  // Confirmed release date; this calendar day is day 0 in Asia/Jerusalem.
  releaseDate: '2026-12-21',
  timezone: 'Asia/Jerusalem',
  headline: '100 ימים לשחרור — כי גם לסדרות חינוך יש סוף טוב',
  description: 'כי גם לסדרות חינוך יש סוף טוב 🎓🫡',
  images: {
    // Vite bundles these supplied originals with GitHub Pages-aware URLs.
    uniform: uniformPhoto,
    civilian: civilianPhoto,
  },
  personalMessage:
    'בין סדרת חינוך לעוד סיור, בין הסיפורים של ירושלים לכל האנשים שבדרך — עוד קצת, ומתחיל הפרק שלך. עם פחות השכמות, יותר חופש, וכל כך הרבה סיפורים לקחת הלאה.',
};
import uniformPhoto from '../../assets/soldier.jpeg';
import civilianPhoto from '../../assets/cevilian.jpeg';
