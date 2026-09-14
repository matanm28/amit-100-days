# MVP — Amit 100-Day IDF Release Countdown

## 1. Product Goal

Build a small, personal, self-hosted website that serves as a digital **100-day countdown to IDF release** for Amit.

The site should automatically update every day, require no manual daily commits, and visually reflect Amit’s service:

- IDF / army theme
- Education Corps
- Educational series
- Guiding and educational tours
- Jerusalem and the surrounding area
- Heritage / educational sites
- Real photos of Amit

The experience should feel celebratory, personal, humorous, and warm — not like an official military website.

### Primary headline

**100 ימים לשחרור — כי גם לסדרות חינוך יש סוף טוב**

---

## 2. Core Product Principles

The following requirements are critical:

1. There must be **exactly 100 countdown cells**.
2. The values must be exactly:

   `100, 99, 98, ... 3, 2, 1`

3. There must be:
   - No duplicate numbers
   - No missing numbers
   - No malformed labels
   - No extra characters next to numbers
4. The countdown grid must be generated **programmatically**, not manually authored and not AI-generated.
5. The page must calculate the countdown automatically based on the configured release date.
6. Date calculations must use the timezone:

   `Asia/Jerusalem`

7. No daily manual updates or commits are required.
8. Do not use stock photos of random soldiers.
9. The only human photos used should be the supplied photos of Amit.
10. Correctness of the countdown logic is more important than visual creativity.

---

## 3. Recommended Repository Location

Create the project under WSL at:

```text
/home/mamalka/repos/matanm28/amit-100-days
```

Recommended repository name:

```text
amit-100-days
```

---

## 4. Recommended Tech Stack

Use:

```text
React
TypeScript
Vite
Tailwind CSS or plain CSS
date-fns
date-fns-tz
Lucide Icons
canvas-confetti
Vitest
React Testing Library
GitHub Pages
```

Do not add a backend unless it becomes necessary later.

Not required for MVP:

```text
Backend
Database
Authentication
API server
Docker
Cloud functions
CMS
```

---

## 5. Page Structure

Single-page experience.

Suggested layout:

```text
┌─────────────────────────────────────┐
│ Hero / Header                       │
│                                     │
│ 100 ימים לשחרור                     │
│ כי גם לסדרות חינוך יש סוף טוב      │
│                                     │
│ [Amit photo in uniform]             │
│                                     │
│ נשארו X ימים                        │
├─────────────────────────────────────┤
│                                     │
│            10 × 10 GRID             │
│                                     │
│ 100  99  98 ...                 91 │
│  90  89  88 ...                 81 │
│  ...                                │
│  10   9   8 ...                  1 │
│                                     │
├─────────────────────────────────────┤
│ Education / Jerusalem / Tours area  │
│ [Second Amit photo]                 │
│ Small personal message              │
└─────────────────────────────────────┘
```

---

## 6. Countdown Grid

The countdown grid is the central feature.

### Grid dimensions

Exactly:

```text
10 columns × 10 rows = 100 cells
```

### Number sequence

The first cell:

```text
100
```

The last cell:

```text
1
```

Generate the values programmatically.

Example:

```ts
export const countdownValues = Array.from(
  { length: 100 },
  (_, index) => 100 - index
);
```

Do not hardcode 100 individual cells in JSX.

---

## 7. Cell States

Each countdown cell has one of three states.

### A. Past day

Example if today has 63 days remaining:

```text
100 → 64
```

These cells have already passed.

Suggested visual treatments:

- Hand-drawn X
- Strike-through
- Faded background
- Checkmark
- Stamp effect

Preferred style:

**A hand-drawn X / marker-like crossed-out appearance.**

### B. Current day

Example:

```text
63
```

This cell should be visually emphasized.

Possible styling:

- Gold border
- Slight pulse
- Badge saying `היום`
- Stronger contrast
- Small highlight glow

### C. Future days

Example:

```text
62 → 1
```

These remain clean and unmarked.

---

## 8. Countdown Calculation

All personal configuration should live in one central file.

Suggested file:

```text
src/config/siteConfig.ts
```

Example:

```ts
export const siteConfig = {
  person: {
    name: "עמית",
  },

  releaseDate: "YYYY-MM-DD",

  timezone: "Asia/Jerusalem",

  headline:
    "100 ימים לשחרור — כי גם לסדרות חינוך יש סוף טוב",

  images: {
    uniform: "/assets/amit-uniform.jpg",
    civilian: "/assets/amit-civilian.jpg",
  },
};
```

### Date calculation requirements

Compute:

```text
daysRemaining = releaseDate - today
```

Where `today` is normalized in:

```text
Asia/Jerusalem
```

Do not do naive calculations such as:

```js
Math.round(milliseconds / 86400000)
```

without proper calendar-date normalization.

This is important because DST transitions can cause off-by-one errors.

Recommended:

```text
date-fns
date-fns-tz
```

---

## 9. Countdown Behavior by Date Range

### More than 100 days remaining

If:

```text
daysRemaining > 100
```

Display:

```text
עוד לא הגענו ל־100 האחרונים...
```

And optionally:

```text
עוד 123 ימים לשחרור
```

The 100-cell grid should remain entirely unmarked.

### Between 100 and 1 days remaining

Normal countdown mode.

### Release day

If:

```text
daysRemaining === 0
```

Display a celebration state.

Suggested text:

```text
עמית השתחררה! 🎉
```

or:

```text
זהו. נגמרו הסדרות 🎉
```

Trigger confetti.

### After release

If:

```text
daysRemaining < 0
```

Never display a negative countdown.

Display:

```text
משוחררת כבר X ימים 🎉
```

---

## 10. Language and RTL

The entire website is in Hebrew.

Use:

```html
<html lang="he" dir="rtl">
```

RTL must be first-class, not patched in later.

Numbers inside the grid must remain visually clear and correctly ordered.

---

## 11. Amit’s Photos

Use the two supplied photos of Amit.

Recommended paths:

```text
public/assets/amit-uniform.jpg
public/assets/amit-civilian.jpg
```

or `.png` depending on the original source format.

### Uniform photo

Use as the primary image, ideally in the Hero section.

Possible presentation styles:

- Polaroid
- Military ID-card inspired frame
- Taped field-photo
- Field notebook photo
- Scrapbook card

Do not alter Amit’s face with AI.

### Civilian photo

Use as a secondary image.

Possible placement:

- Lower section
- “After the army” visual
- Personal note / transition area

### Important image rule

Do not use any random soldier stock photos.

If visual army elements are needed, use:

- Icons
- Illustrations
- Abstract military textures
- Maps
- Generic gear graphics

But no unrelated real people.

---

## 12. Visual Theme

The hierarchy of visual themes should be:

```text
IDF
↓
Education Corps
↓
Educational series
↓
Guiding and tours
↓
Jerusalem and surroundings
```

Jerusalem is context, not the main subject.

### Suggested visual elements

Use tasteful illustrations/icons for:

- Topographic map
- Jerusalem map
- Old City walls
- Map pins
- Notebook
- Clipboard
- Tour bus
- Megaphone
- Backpack
- Compass
- Route line
- Educational tour
- Heritage site
- Army stencil typography
- Olive UI accents
- Dog tags or military-inspired shapes

Avoid trying to imitate official military branding too literally.

---

## 13. Color Palette

Suggested palette:

```css
--army-olive: #59643B;
--olive-dark: #343C25;
--khaki: #B6A57A;
--sand: #DDD2AF;
--cream: #F4F0E5;
--gold: #D4A72C;
--charcoal: #272822;
```

The exact values may be adjusted for contrast and aesthetics.

Primary visual direction:

- Olive green
- Khaki
- Sand
- Off-white
- Charcoal
- Gold accent

---

## 14. Milestone Messages

Add a simple milestone system.

Example:

```ts
export const milestones: Record<number, string> = {
  100: "מתחילים לספור.",
  75: "עוד כמה סדרות, עוד כמה סיורים, וזהו.",
  50: "חצי דרך. אבל מי סופר?",
  30: "פז״ם זה state of mind.",
  14: "כבר אפשר להריח את האזרחות.",
  7: "שבוע אחרון. באמת.",
  3: "שלוש...",
  2: "שתיים...",
  1: "סדרת החינוך האחרונה בהחלט.",
  0: "סוף טוב.",
};
```

If there is no milestone for a given day, display no milestone message.

---

## 15. Automatic Daily Updates

Do **not** create daily commits.

Do **not** require a cron job for normal operation.

The website should calculate the current state on every page load.

Example:

```text
September 12 → 63 days
September 13 → 62 days
September 14 → 61 days
```

No deployment needed between days.

---

## 16. GitHub Pages Deployment

Host the site with GitHub Pages.

Example public URL:

```text
https://<username>.github.io/amit-100-days/
```

Configure deployment so that pushing to `main` deploys automatically.

Recommended approaches:

- GitHub Actions workflow for Vite build and Pages deploy
- Or the current official GitHub Pages Vite deployment workflow

Important: GitHub Actions is only for deployment after code changes, not for daily countdown updates.

---

## 17. Suggested Project Structure

```text
src/
├── App.tsx
│
├── config/
│   └── siteConfig.ts
│
├── components/
│   ├── Hero.tsx
│   ├── Countdown.tsx
│   ├── CountdownGrid.tsx
│   ├── CountdownCell.tsx
│   ├── MilestoneMessage.tsx
│   ├── ServiceStory.tsx
│   └── Footer.tsx
│
├── hooks/
│   └── useCountdown.ts
│
├── utils/
│   ├── date.ts
│   └── countdown.ts
│
├── data/
│   └── milestones.ts
│
└── styles/
    └── globals.css

public/
└── assets/
    ├── amit-uniform.jpg
    └── amit-civilian.jpg

tests/
├── countdown.test.ts
└── date.test.ts
```

---

## 18. Mobile Requirements

The site must work well on phones.

Critical rule:

**The countdown board must remain 10 × 10 on mobile.**

Do not switch to:

```text
5 × 20
```

or another layout.

Instead adjust:

- Cell size
- Font size
- Gap
- Grid width
- Padding

The visual meaning of a classic 100-day board matters.

Horizontal scrolling should be avoided if reasonably possible.

---

## 19. Desktop Requirements

On wide screens, keep the board from becoming excessively large.

Example:

```css
.countdown-grid {
  max-width: 900px;
}
```

The main content should remain centered and visually balanced.

---

## 20. Accessibility

Minimum requirements:

- Meaningful alt text on Amit’s photos
- Good color contrast
- Large enough cell text
- Do not rely only on color for state differences
- Current day should have a non-color indicator
- Past cells should have a visible X / line / icon
- Respect `prefers-reduced-motion`
- Confetti should be disabled for reduced-motion users

---

## 21. SEO and Metadata

Suggested title:

```text
100 ימים לשחרור של עמית
```

Suggested description:

```text
כי גם לסדרות חינוך יש סוף טוב 🎓🫡
```

Add:

- Open Graph title
- Open Graph description
- Favicon
- Optional OG image later

---

## 22. Privacy and Security

The site will be publicly accessible.

Do not include:

- Personal military ID number
- Base name
- Sensitive unit details
- Phone number
- Address
- Operational schedules
- Real-time location
- Classified or sensitive military information
- Internal army systems
- Sensitive tour schedules

The site should contain celebratory, non-sensitive personal content only.

---

## 23. Out of Scope for MVP

Do not build:

- Login
- User accounts
- Database
- CMS
- Admin panel
- Comments
- Social network functionality
- Push notifications
- Backend
- Advanced analytics
- Image uploads from the live website
- Editable release date from UI

---

## 24. Optional V2 Features

Potential future improvements:

### Daily memory

Each day can unlock:

- A photo
- A message
- A memory
- A funny sentence

### Interactive cells

Clicking a countdown cell could show a memory.

Example:

```text
Day 83
→
photo / memory / message
```

### WhatsApp sharing

Example text:

```text
נשארו לעמית 42 ימים 🫡
```

### PWA

Allow installing the website as an app.

### Custom domain

Example:

```text
100.amit.example.com
```

### Milestone confetti

Trigger extra celebration at:

```text
100
50
30
10
7
1
0
```

---

## 25. Required Automated Tests

The countdown logic must be tested.

### Test 1 — Cell count

```ts
expect(countdownValues).toHaveLength(100);
```

### Test 2 — First value

```ts
expect(countdownValues[0]).toBe(100);
```

### Test 3 — Last value

```ts
expect(countdownValues[99]).toBe(1);
```

### Test 4 — Unique values

```ts
expect(new Set(countdownValues).size).toBe(100);
```

### Test 5 — Range

All values must be integers between `1` and `100`.

### Test 6 — No gaps

The values must contain every integer from 1 through 100 exactly once.

Example validation:

```ts
const sorted = [...countdownValues].sort((a, b) => a - b);

expect(sorted).toEqual(
  Array.from({ length: 100 }, (_, i) => i + 1)
);
```

### Test 7 — Jerusalem midnight transition

Verify the countdown decreases by one at midnight in:

```text
Asia/Jerusalem
```

### Test 8 — DST behavior

Test dates around Israeli DST transitions to prevent off-by-one errors.

### Test 9 — Before countdown starts

If there are more than 100 days remaining:

- Grid exists
- No cells are marked as past

### Test 10 — Release day

At `0` days remaining:

- Release state appears
- Countdown does not show negative numbers

### Test 11 — After release

Verify:

```text
משוחררת כבר X ימים
```

with a positive X.

---

## 26. Acceptance Criteria

The MVP is complete only when all of the following are true:

- [ ] Project exists under `/home/mamalka/repos/matanm28/amit-100-days`
- [ ] React + TypeScript + Vite is configured
- [ ] Git repository initialized
- [ ] GitHub Pages deployment is configured
- [ ] Site is fully Hebrew
- [ ] Site uses RTL correctly
- [ ] Headline is exactly:
  **100 ימים לשחרור — כי גם לסדרות חינוך יש סוף טוב**
- [ ] Amit’s real supplied photos are used
- [ ] No random soldier photos appear
- [ ] Exactly 100 countdown cells are rendered
- [ ] Values are exactly 100 through 1
- [ ] Every value appears once
- [ ] No value appears twice
- [ ] No value is missing
- [ ] No malformed countdown labels exist
- [ ] Past days are visually marked
- [ ] Current day is visually emphasized
- [ ] Future days remain unmarked
- [ ] Countdown updates automatically based on date
- [ ] `Asia/Jerusalem` is used
- [ ] DST-safe logic is implemented
- [ ] Release day shows celebration state
- [ ] No backend exists
- [ ] All personal configuration is centralized
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Accessibility minimums are satisfied
- [ ] Automated tests pass
- [ ] Production build succeeds

---

## 27. Implementation Order

Recommended sequence:

1. Create Vite + React + TypeScript project.
2. Initialize Git.
3. Install dependencies.
4. Configure GitHub Pages.
5. Create `siteConfig.ts`.
6. Implement deterministic countdown values.
7. Implement timezone-safe countdown calculation.
8. Write unit tests for countdown values.
9. Write unit tests for date logic and DST.
10. Build the 10 × 10 countdown board.
11. Add past/current/future states.
12. Add Amit’s real photos.
13. Build the military / Education Corps visual theme.
14. Add Jerusalem / educational-tour details.
15. Add milestone messages.
16. Add release-day celebration.
17. Add responsive styling.
18. Add accessibility support.
19. Add metadata / SEO.
20. Run all tests.
21. Run production build.
22. Deploy to GitHub Pages.
23. Validate the live site.
24. Programmatically verify again that all 100 cells are present and unique.

---

## 28. Codex Execution Rules

Codex must follow these rules:

### Grid correctness

Do not use AI-generated text or images to construct the 100-day grid.

The grid is programmatic UI.

Correctness of the `100 → 1` sequence is more important than visual creativity.

### Final verification

Before considering the task complete, programmatically verify:

```text
exactly 100 rendered countdown values
```

and:

```text
every integer from 1 through 100 appears exactly once
```

### Photos

Only use Amit’s supplied photos for real people.

Do not replace them with stock soldiers.

### Configuration

Do not scatter personal constants throughout the codebase.

Keep the following in one central config:

- Name
- Release date
- Timezone
- Headline
- Image paths

### No unnecessary backend

The countdown should work entirely as a static client-side site.

---

## 29. Final Codex Prompt

Use the following as the initial Codex task:

> Create and implement the full Amit 100-day IDF release countdown project in `/home/mamalka/repos/matanm28/amit-100-days`.
>
> Follow this MVP specification exactly.
>
> Use React + TypeScript + Vite.
>
> The site must be fully Hebrew and RTL.
>
> The countdown board must contain exactly 100 programmatically generated cells in a 10×10 grid, with every integer from 100 down to 1 appearing exactly once.
>
> Do not use generative AI for countdown numbers.
>
> Use timezone-safe date calculations based on `Asia/Jerusalem`, including correct behavior around DST.
>
> The site must automatically update based on the current date without daily commits or redeployments.
>
> Use the exact headline:
>
> `100 ימים לשחרור — כי גם לסדרות חינוך יש סוף טוב`
>
> Use Amit’s two supplied real photos and do not use stock photos of random soldiers.
>
> The visual theme should prioritize IDF / military style, then Education Corps, educational series, guiding and tours, and Jerusalem / surrounding educational sites.
>
> Add milestone messages, past/current/future countdown states, a release-day celebration, responsive mobile and desktop layouts, accessibility support, tests, and GitHub Pages deployment.
>
> Centralize all personal configuration in one config file.
>
> Before finishing, run all tests, run the production build, and programmatically verify that the rendered countdown contains exactly 100 unique values covering every integer from 1 through 100 exactly once.
>
> If the release date has not yet been provided, create a clearly marked placeholder in `siteConfig.ts` and stop only when that is the sole remaining required input.

---

## 30. Remaining Required Input

Before the countdown can be finalized, one value must be confirmed:

```text
Amit’s exact release date
```

Store it in:

```text
src/config/siteConfig.ts
```

Example:

```ts
releaseDate: "2026-12-31"
```

Do not guess the release date.
