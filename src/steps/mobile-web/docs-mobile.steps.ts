import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DocsHomePage } from '@pages/docs-home.page';
import type { BddWorld } from '@bdd/world';

Given('I open the documentation home page on mobile', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @mobile-web tag to this scenario.');
  }

  const docsHomePage = new DocsHomePage(this.page);
  await docsHomePage.goto();
});

Then('the documentation home page should be usable on mobile', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @mobile-web tag to this scenario.');
  }

  await expect(this.page.getByRole('heading', { name: /Playwright enables reliable/ })).toBeVisible();
  await expect(this.page.getByRole('link', { name: 'Get started' }).first()).toBeVisible();
});
