import 'dotenv/config';
import { Before } from '@cucumber/cucumber';
import type { BddWorld } from '../world';

Before({ tags: '@mobile-web' }, async function (this: BddWorld) {
  await this.initBrowser({ deviceName: 'Pixel 7' });
});
