import { expect, test } from '@fixtures/test';
import { DocsMobilePage } from '@mobile-pages/docs-mobile.page';

test.describe('Playwright docs mobile smoke', () => {
  test('renders on a mobile viewport', async ({ page }) => {
    const docsMobilePage = new DocsMobilePage(page);

    await docsMobilePage.goto();

    await expect(docsMobilePage.heroHeading).toBeVisible();
    await expect(docsMobilePage.getStartedLink).toBeVisible();
  });
});
