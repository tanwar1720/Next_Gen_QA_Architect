import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(Number(process.env.CUCUMBER_STEP_TIMEOUT ?? 30_000));
