import type { Locator, Page } from '@playwright/test';

export class DocsHomePage {
  readonly getStartedLink: Locator;

  constructor(private readonly page: Page) {
    this.getStartedLink = page.getByRole('link', { name: 'Get started' }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
