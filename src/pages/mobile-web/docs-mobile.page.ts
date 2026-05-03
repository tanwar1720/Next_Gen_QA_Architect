import type { Locator, Page } from '@playwright/test';
import { selectors } from '@utils/selectors';

export class DocsMobilePage {
  readonly heroHeading: Locator;
  readonly getStartedLink: Locator;

  constructor(private readonly page: Page) {
    const $ = selectors(page);

    this.heroHeading = $.byRole('heading', { name: /Playwright enables reliable/ });
    this.getStartedLink = $.first($.byRole('link', { name: 'Get started' }));
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
