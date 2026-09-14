import { expect, test } from '@playwright/test';

test('production page has a complete 10 by 10 RTL board with no overflow or broken local assets', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400) errors.push(response.url());
  });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('100 ימים לשחרור — כי גם לסדרות חינוך יש סוף טוב');
  await expect(page.locator('[data-countdown-value]')).toHaveCount(100);
  const values = await page.locator('[data-countdown-value]').allTextContents();
  expect(values).toEqual(Array.from({ length: 100 }, (_, i) => String(100 - i)));
  expect(new Set(values).size).toBe(100);
  const geometry = await page.locator('.countdown-cell').evaluateAll(cells => cells.map(cell => {
    const rect = cell.getBoundingClientRect();
    return { x: Math.round(rect.x), y: Math.round(rect.y) };
  }));
  expect(new Set(geometry.map(cell => cell.x)).size).toBe(10);
  expect(new Set(geometry.map(cell => cell.y)).size).toBe(10);
  expect(geometry[0].x).toBeGreaterThan(geometry[9].x);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'ללוח הספירה', exact: true }).click();
  await expect(page).toHaveURL(/#countdown-board$/);
  for (const alt of ['עמית במדים', 'עמית באזרחות']) {
    const photo = page.getByAltText(alt, { exact: true });
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect.poll(() => photo.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(photo).toHaveAttribute('src', /^\/amit-100-days\/assets\/.+\.jpeg$/);
  }
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true });
});

test('21 December is day zero with the requested release message', async ({ page }) => {
  // Midnight in Jerusalem, while the UTC calendar date is still 20 December.
  await page.clock.setFixedTime(new Date('2026-12-20T22:00:00Z'));
  await page.goto('./');
  await expect(page.getByRole('status')).toContainText('היום זה היום');
  await expect(page.getByRole('status').locator('.countdown__number')).toHaveText('0');
  await expect(page.locator('.countdown-cell')).toHaveCount(100);
  await expect(page.locator('.countdown-cell[data-state="past"]')).toHaveCount(100);
  await expect(page.locator('[aria-current="date"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
