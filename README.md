# Next Gen QA Architect

Playwright + TypeScript automation framework for web, API, and mobile web testing.

The framework supports two authoring styles:

- Playwright specs for engineers who prefer direct TypeScript tests.
- Cucumber/Gherkin features for users who prefer business-readable scenarios.

## What This Supports

- Web UI automation with Playwright browser projects.
- API automation with Playwright `APIRequestContext`.
- Mobile web automation through Playwright device profiles.
- Native mobile automation as a planned Appium extension point.
- Shared fixtures, typed config, reports, traces, screenshots, and videos.

## Project Layout

```text
src/
  api/          API clients and request helpers
  config/       Environment and runtime configuration
  fixtures/     Shared Playwright fixtures
  pages/        Page objects grouped by channel
    web/
    mobile-web/
  utils/        Test data and common utilities
tests/
  api/          API specs
  mobile-web/   Mobile browser specs
  web/          Desktop browser specs
features/
  api/          Gherkin API scenarios
  mobile-web/   Gherkin mobile browser scenarios
  web/          Gherkin web scenarios
src/
  bdd/          Cucumber World and hook setup
    hooks/      API, web, mobile-web, and cleanup hooks
  steps/        Gherkin step definitions grouped by test channel
    api/
    mobile-web/
    web/
```

## Setup

```bash
npm install
npm run install:browsers
```

Copy `.env.example` to `.env` if you want to override defaults.

## Commands

```bash
npm test
npm run test:web
npm run test:api
npm run test:mobile
npm run bdd
npm run bdd:web
npm run bdd:api
npm run bdd:mobile
npm run test:headed
npm run test:debug
npm run report
npm run typecheck
```

## CI

GitHub Actions workflow:

```text
.github/workflows/qa-automation.yml
```

The workflow runs on pushes and pull requests to `main` or `master`, and can also be started manually from the Actions tab.

It runs:

```bash
npm ci
npx playwright install --with-deps
npm run typecheck
npm test
npm run bdd
```

Reports and test artifacts are uploaded from:

- `playwright-report/`
- `test-results/`

## Cucumber / Gherkin

Feature files live under `features`.

```gherkin
@web
Feature: Documentation web journey

  Scenario: Open the get started guide
    Given I open the documentation home page
    When I navigate to the get started guide
    Then I should see the installation guide
```

Tags control the right hook setup:

| Tag | Hook behavior |
| --- | --- |
| `@web` | Launches a browser, context, page, tracing, video |
| `@mobile-web` | Launches a browser using the `Pixel 7` Playwright device profile |
| `@api` | Creates a Playwright API request context |

Cucumber artifacts are written to `test-results`:

- `test-results/cucumber-report.html`
- `test-results/cucumber-report.json`
- `test-results/traces/*.zip`
- `test-results/cucumber-videos`

Use `BROWSER=firefox` or `BROWSER=webkit` to change the Cucumber browser project. Use `HEADLESS=false` for headed browser execution.

## Configuration

Default values live in `src/config/env.ts`.

| Variable | Purpose | Default |
| --- | --- | --- |
| `APP_ENV` | Logical target environment | `local` |
| `BASE_URL` | Web app base URL | `https://playwright.dev` |
| `API_BASE_URL` | API base URL | `https://jsonplaceholder.typicode.com` |
| `TRACE` | Playwright trace mode | `retain-on-failure` |

## Native Mobile Direction

Playwright is excellent for browser and API automation, including mobile web through device emulation. It does not drive native Android or iOS apps directly. When native app testing is needed, add Appium with the same conventions used here:

- Keep native specs under `tests/native-mobile`.
- Add screen objects under `src/mobile/screens`.
- Reuse `src/config`, reporting, naming, and test-data utilities.
- Keep Appium driver setup isolated behind fixtures, similar to `src/fixtures/test.ts`.
