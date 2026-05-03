import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DocsHomePage } from '@web-pages/docs-home.page';
import type { BddWorld } from '@bdd/world';

Given('I open the documentation home page', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @web tag to this scenario.');
  }

  const docsHomePage = new DocsHomePage(this.page);
  await docsHomePage.goto();
});

When('I navigate to the get started guide', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @web tag to this scenario.');
  }

  const docsHomePage = new DocsHomePage(this.page);
  await docsHomePage.openGetStarted();
});

Then('I should see the installation guide', async function (this: BddWorld) {
  if (!this.page) {
    throw new Error('Page was not initialized. Add the @web tag to this scenario.');
  }

  await expect(this.page).toHaveURL(/.*intro/);
  await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
