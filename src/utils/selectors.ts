import type { Locator, Page } from '@playwright/test';

type SelectorRoot = Page | Locator;
type RoleOptions = Parameters<Page['getByRole']>[1];

export class SelectorFactory {
  constructor(private readonly root: SelectorRoot) {}

  byRole(role: Parameters<Page['getByRole']>[0], options?: RoleOptions): Locator {
    return this.root.getByRole(role, options);
  }

  byTestId(testId: string | RegExp): Locator {
    return this.root.getByTestId(testId);
  }

  byPlaceholder(text: string | RegExp): Locator {
    return this.root.getByPlaceholder(text);
  }

  byText(text: string | RegExp): Locator {
    return this.root.getByText(text);
  }

  byLabel(text: string | RegExp): Locator {
    return this.root.getByLabel(text);
  }

  byTitle(text: string | RegExp): Locator {
    return this.root.getByTitle(text);
  }

  byCss(selector: string): Locator {
    return this.root.locator(selector);
  }

  byXpath(xpath: string): Locator {
    return this.root.locator(`xpath=${xpath}`);
  }

  first(locator: Locator): Locator {
    return locator.first();
  }

  withText(locator: Locator, text: string | RegExp): Locator {
    return locator.filter({ hasText: text });
  }
}

export function selectors(root: SelectorRoot): SelectorFactory {
  return new SelectorFactory(root);
}
