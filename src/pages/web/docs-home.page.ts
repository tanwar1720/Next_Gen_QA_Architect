import type { Locator, Page } from '@playwright/test';
import { selectors } from '@utils/selectors';

export class DocsHomePage {
  readonly getStartedLink: Locator;

  constructor(private readonly page: Page) {
    const $ = selectors(page);

    this.getStartedLink = $.first($.byRole('link', { name: 'Get started' }));
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
