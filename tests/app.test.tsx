import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { siteConfig } from '../src/config/siteConfig';
import { CountdownGrid } from '../src/components/CountdownGrid';

const confetti = vi.hoisted(() => vi.fn());
vi.mock('canvas-confetti', () => ({ default: confetti }));

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-09-14T09:00:00Z'));
  confetti.mockClear();
});

describe('rendered countdown', () => {
  it.each([null, 123, 100, 63, 1, 0, -3])('renders exactly the numeric sequence 100 to 1 for %s days', days => {
    const { container } = render(<CountdownGrid daysRemaining={days} />);
    const cells = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(cells).toHaveLength(100);
    const labels = cells.map(cell => cell.textContent);
    expect(labels).toEqual(Array.from({ length: 100 }, (_, i) => String(100 - i)));
    expect(new Set(labels).size).toBe(100);
    expect(container.querySelectorAll('[aria-current="date"]')).toHaveLength(days !== null && days > 0 && days <= 100 ? 1 : 0);
  });
  it('shows the current day with accessible semantics and a distinct class', () => {
    render(<CountdownGrid daysRemaining={63} />);
    expect(screen.getByRole('listitem', { name: '63 — היום' })).toHaveAttribute('aria-current', 'date');
    expect(screen.getByRole('listitem', { name: '64 — עבר' })).toHaveClass('countdown-cell--past');
    expect(screen.getByRole('listitem', { name: '62 — בהמשך' })).toHaveClass('countdown-cell--future');
  });
  it('displays milestones only on matching days', () => {
    const { rerender } = render(<CountdownGrid daysRemaining={50} />);
    expect(screen.getByRole('note')).toHaveTextContent('חצי דרך. אבל מי סופר?');
    rerender(<CountdownGrid daysRemaining={49} />);
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });
  it('shows a number-specific anecdote for special days and a daily fallback otherwise', () => {
    const { rerender } = render(<CountdownGrid daysRemaining={42} />);
    expect(screen.getByLabelText('האנקדוטה של יום 42')).toHaveTextContent('התשובה לחיים, ליקום ולהכול');
    rerender(<CountdownGrid daysRemaining={41} />);
    expect(screen.getByLabelText('האנקדוטה של יום 41')).toHaveTextContent('מספר הפעמים שמותר להגיד היום');
    rerender(<CountdownGrid daysRemaining={0} />);
    expect(screen.queryByLabelText(/האנקדוטה של יום/)).not.toBeInTheDocument();
  });
  it('shows a truthful unconfigured state and explicit photo placeholders', () => {
    render(<App config={{ ...siteConfig, releaseDate: null, images: { uniform: null, civilian: null } }} />);
    expect(screen.getByRole('status')).toHaveTextContent('בקרוב מתחילים לספור');
    expect(screen.getAllByText('כאן תופיע התמונה שלך')).toHaveLength(2);
    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName(siteConfig.headline);
  });
  it('shows a safe state for an invalid release date', () => {
    render(<App config={{ ...siteConfig, releaseDate: '2026-02-30' }} />);
    expect(screen.getByRole('status')).toHaveTextContent('תאריך השחרור דורש תיקון');
  });
  it('shows the pre-countdown message and an unmarked board', () => {
    const { container } = render(<App config={{ ...siteConfig, releaseDate: '2027-01-15' }} />);
    expect(screen.getByRole('status')).toHaveTextContent('עוד לא הגענו ל־100 האחרונים...');
    expect(container.querySelectorAll('[data-state="future"]')).toHaveLength(100);
  });
  it('celebrates release without confetti when reduced motion is requested', async () => {
    render(<App config={{ ...siteConfig, releaseDate: '2026-09-14' }} />);
    expect(screen.getByRole('status')).toHaveTextContent('עמית השתחררה!');
    await act(async () => { await Promise.resolve(); });
    expect(confetti).not.toHaveBeenCalled();
  });
  it('triggers confetti once on release day when motion is allowed', async () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList);
    const { rerender } = render(<App config={{ ...siteConfig, releaseDate: '2026-09-14' }} />);
    await act(async () => { await Promise.resolve(); });
    expect(confetti).toHaveBeenCalledTimes(1);
    rerender(<App config={{ ...siteConfig, releaseDate: '2026-09-14' }} />);
    expect(confetti).toHaveBeenCalledTimes(1);
  });
  it('uses a positive elapsed count after release', () => {
    render(<App config={{ ...siteConfig, releaseDate: '2026-09-11' }} />);
    expect(screen.getByRole('status')).toHaveTextContent('משוחררת כבר 3 ימים');
    expect(screen.getByRole('status')).not.toHaveTextContent('-3');
  });
  it.each([
    ['2026-12-19T10:00:00Z', '2', 'מחר אומרים מחר!'],
    ['2026-12-20T10:00:00Z', '1', 'מחר!'],
  ])('shows the requested final-days message at %s', (instant, days, message) => {
    vi.setSystemTime(new Date(instant));
    render(<App />);
    const status = screen.getByRole('status');
    expect(status.querySelector('strong')).toHaveTextContent(message);
    expect(status.querySelector('.countdown__number')).toHaveTextContent(days);
    expect(screen.getByRole('note')).toHaveTextContent(message);
  });
  it('counts down to day zero on the confirmed date, then counts days since release', () => {
    vi.setSystemTime(new Date('2026-12-20T21:59:59Z'));
    const { container } = render(<App />);
    expect(container.querySelector('[aria-current="date"]')).toHaveTextContent('1');
    act(() => vi.advanceTimersByTime(1100));
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('היום זה היום');
    expect(status.querySelector('.countdown__number')).toHaveTextContent(/^0$/);
    expect(container.querySelectorAll('.countdown-cell')).toHaveLength(100);
    expect(container.querySelectorAll('[data-state="past"]')).toHaveLength(100);
    act(() => vi.advanceTimersByTime(24 * 3600000));
    expect(screen.getByRole('status')).toHaveTextContent('משוחררת כבר 1 ימים');
    expect(screen.getByRole('status')).not.toHaveTextContent('היום זה היום');
  });
  it('updates an open page at Jerusalem midnight without a reload', () => {
    vi.setSystemTime(new Date('2026-09-14T20:59:59Z'));
    const { container } = render(<App config={{ ...siteConfig, releaseDate: '2026-09-16' }} />);
    expect(container.querySelector('[aria-current="date"]')).toHaveTextContent('2');
    act(() => vi.advanceTimersByTime(1100));
    expect(container.querySelector('[aria-current="date"]')).toHaveTextContent('1');
    act(() => vi.advanceTimersByTime(24 * 3600000));
    expect(screen.getByRole('status')).toHaveTextContent('עמית השתחררה!');
  });
  it('refreshes after the browser wakes or regains focus', () => {
    const { container } = render(<App config={{ ...siteConfig, releaseDate: '2026-09-16' }} />);
    expect(container.querySelector('[aria-current="date"]')).toHaveTextContent('2');
    vi.setSystemTime(new Date('2026-09-15T10:00:00Z'));
    fireEvent.focus(window);
    expect(container.querySelector('[aria-current="date"]')).toHaveTextContent('1');
    vi.setSystemTime(new Date('2026-09-16T10:00:00Z'));
    fireEvent(document, new Event('visibilitychange'));
    expect(screen.getByRole('status')).toHaveTextContent('עמית השתחררה!');
  });
  it('resolves photo paths under the GitHub Pages subdirectory and handles missing images', () => {
    // Vitest 4 serves tests at '/', so explicitly exercise a project-site deployment base.
    vi.stubEnv('BASE_URL', '/amit-100-days/');
    render(<App config={{ ...siteConfig, images: { uniform: 'assets/amit-uniform.jpg', civilian: null } }} />);
    const image = screen.getByAltText('עמית במדים');
    expect(image).toHaveAttribute('src', '/amit-100-days/assets/amit-uniform.jpg');
    fireEvent.error(image);
    expect(screen.getByRole('img', { name: 'עמית במדים — התמונה טרם נוספה' })).toBeInTheDocument();
  });
});
