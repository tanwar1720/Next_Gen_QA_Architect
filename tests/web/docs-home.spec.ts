import { expect, test } from '@fixtures/test';

test.describe('Playwright docs web smoke', () => {
  test('opens the get started page', async ({ docsHomePage, page }) => {
    await docsHomePage.goto();
    await docsHomePage.openGetStarted();

    await expect(page).toHaveURL(/.*intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
