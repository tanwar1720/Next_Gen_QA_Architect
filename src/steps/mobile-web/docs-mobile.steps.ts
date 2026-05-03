import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DocsMobilePage } from '@mobile-pages/docs-mobile.page';
import type { BddWorld } from '@bdd/world';

Given('I open the documentation home page on mobile', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @mobile-web tag to this scenario.');
  }

  const docsMobilePage = new DocsMobilePage(this.page);
  await docsMobilePage.goto();
});

Then('the documentation home page should be usable on mobile', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @mobile-web tag to this scenario.');
  }

  const docsMobilePage = new DocsMobilePage(this.page);

  await expect(docsMobilePage.heroHeading).toBeVisible();
  await expect(docsMobilePage.getStartedLink).toBeVisible();
});
