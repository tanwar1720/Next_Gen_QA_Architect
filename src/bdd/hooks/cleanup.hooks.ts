import { mkdir } from 'node:fs/promises';
import { After, Status } from '@cucumber/cucumber';
import type { BddWorld } from '../world';

After(async function (this: BddWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  if (this.context) {
    await mkdir('test-results/traces', { recursive: true });
    const tracePath = `test-results/traces/${scenario.pickle.id}.zip`;
    await this.context.tracing.stop({ path: tracePath });

    if (scenario.result?.status === Status.FAILED) {
      await this.attach(`Trace: ${tracePath}`, 'text/plain');
    }
  }

  await this.close();
});
