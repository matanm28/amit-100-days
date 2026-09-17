import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ShareCountdown } from '../src/components/ShareCountdown';

const setNavigatorFeature = (feature: 'share' | 'clipboard', value: unknown) => {
  Object.defineProperty(navigator, feature, { configurable: true, value });
};

afterEach(() => {
  setNavigatorFeature('share', undefined);
  setNavigatorFeature('clipboard', undefined);
});

describe('ShareCountdown', () => {
  it('uses the Web Share API when it is supported', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    setNavigatorFeature('share', share);
    setNavigatorFeature('clipboard', { writeText: vi.fn() });
    render(<ShareCountdown name="עמית" daysRemaining={42} />);

    fireEvent.click(screen.getByRole('button', { name: 'שיתוף הספירה' }));

    await waitFor(() => expect(share).toHaveBeenCalledWith({
      title: 'סופרים לשחרור של עמית',
      text: 'עוד 42 ימים לשחרור של עמית!',
      url: window.location.href,
    }));
    expect(screen.getByText('העמוד שותף')).toHaveAttribute('aria-live', 'polite');
  });

  it('copies the complete message when Web Share is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setNavigatorFeature('share', undefined);
    setNavigatorFeature('clipboard', { writeText });
    render(<ShareCountdown name="עמית" daysRemaining={7} />);

    fireEvent.click(screen.getByRole('button', { name: 'שיתוף הספירה' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(
      `עוד 7 ימים לשחרור של עמית! ${window.location.href}`,
    ));
    expect(screen.getByText('הקישור הועתק')).toHaveAttribute('aria-live', 'polite');
  });

  it('gives a friendly response when neither capability is available', async () => {
    setNavigatorFeature('share', undefined);
    setNavigatorFeature('clipboard', undefined);
    render(<ShareCountdown name="עמית" daysRemaining={3} />);

    fireEvent.click(screen.getByRole('button', { name: 'שיתוף הספירה' }));

    expect(await screen.findByText('השיתוף אינו זמין בדפדפן הזה')).toHaveAttribute('aria-live', 'polite');
  });

  it.each([
    [0, 'היום עמית משתחררת! 🎉'],
    [-4, 'עמית כבר משוחררת 4 ימים! 🎉'],
  ])('never shares a negative count on or after release day (%s)', async (days, message) => {
    const share = vi.fn().mockResolvedValue(undefined);
    setNavigatorFeature('share', share);
    render(<ShareCountdown name="עמית" daysRemaining={days} />);

    fireEvent.click(screen.getByRole('button', { name: 'שיתוף הספירה' }));

    await waitFor(() => expect(share).toHaveBeenCalledWith(expect.objectContaining({ text: message })));
    expect(share.mock.calls[0][0].text).not.toContain(`-${Math.abs(days)}`);
  });
});
