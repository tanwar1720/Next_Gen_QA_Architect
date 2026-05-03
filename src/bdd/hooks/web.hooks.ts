import 'dotenv/config';
import { Before } from '@cucumber/cucumber';
import type { BddWorld } from '../world';

Before({ tags: '@web' }, async function (this: BddWorld) {
  await this.initBrowser();
});
