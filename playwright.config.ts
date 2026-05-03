import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: env.baseUrl,
    trace: env.trace,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'api',
      testMatch: /.*\/api\/.*\.spec\.ts/,
      use: {
        baseURL: env.apiBaseUrl,
      },
    },
    {
      name: 'chromium',
      testMatch: /.*\/web\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /.*\/web\/.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: /.*\/web\/.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: /.*\/mobile-web\/.*\.spec\.ts/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      testMatch: /.*\/mobile-web\/.*\.spec\.ts/,
      use: { ...devices['iPhone 15'] },
    },
  ],
});
