import 'dotenv/config';
import { Before } from '@cucumber/cucumber';
import type { BddWorld } from '../world';

Before({ tags: '@api' }, async function (this: BddWorld) {
  await this.initApi();
});
