type AppEnv = 'local' | 'dev' | 'qa' | 'stage' | 'prod';
type TraceMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';

type FrameworkEnv = {
  appEnv: AppEnv;
  baseUrl: string;
  apiBaseUrl: string;
  trace: TraceMode;
};

const appEnv = (process.env.APP_ENV ?? 'local') as AppEnv;

export const env: FrameworkEnv = {
  appEnv,
  baseUrl: process.env.BASE_URL ?? 'https://playwright.dev',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  trace: (process.env.TRACE ?? 'retain-on-failure') as TraceMode,
};
