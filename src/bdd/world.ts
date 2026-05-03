import { setWorldConstructor, type IWorldOptions, World } from '@cucumber/cucumber';
import {
  chromium,
  devices,
  firefox,
  request as playwrightRequest,
  webkit,
  type APIRequestContext,
  type APIResponse,
  type Browser,
  type BrowserContext,
  type BrowserType,
  type Page,
} from '@playwright/test';
import { env } from '@config/env';

type BrowserName = 'chromium' | 'firefox' | 'webkit';
type DeviceName = keyof typeof devices;

const browserTypes: Record<BrowserName, BrowserType> = {
  chromium,
  firefox,
  webkit,
};

export class BddWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  api?: APIRequestContext;
  lastResponse?: APIResponse;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async initBrowser(options: { deviceName?: DeviceName } = {}): Promise<void> {
    if (this.page) {
      return;
    }

    const browserName = (process.env.BROWSER ?? 'chromium') as BrowserName;
    const browserType = browserTypes[browserName] ?? chromium;
    const device = options.deviceName ? devices[options.deviceName] : undefined;

    this.browser = await browserType.launch({
      headless: process.env.HEADLESS !== 'false',
    });
    this.context = await this.browser.newContext({
      ...device,
      baseURL: env.baseUrl,
      recordVideo: {
        dir: 'test-results/cucumber-videos',
      },
    });

    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    this.page = await this.context.newPage();
  }

  async initApi(): Promise<void> {
    if (this.api) {
      return;
    }

    this.api = await playwrightRequest.newContext({
      baseURL: env.apiBaseUrl,
    });
  }

  async close(): Promise<void> {
    await this.api?.dispose();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(BddWorld);
