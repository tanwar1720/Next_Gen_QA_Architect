import { expect, test } from '@fixtures/test';

test.describe('Playwright docs mobile smoke', () => {
  test('renders on a mobile viewport', async ({ docsHomePage, page }) => {
    await docsHomePage.goto();

    await expect(page.getByRole('heading', { name: /Playwright enables reliable/ })).toBeVisible();
    await expect(docsHomePage.getStartedLink).toBeVisible();
  });
});
