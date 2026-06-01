# Playwright Automation Course

End-to-end Playwright framework for the Saucedemo login, cart, and checkout flows.

## What is covered

- Login page, successful authentication, logout, and locked-out user validation
- Authenticated cart behavior: open cart, add products, remove products, continue shopping
- Checkout validation, overview, totals, and successful order completion
- Reusable page objects and fixtures for cleaner test code
- Auth setup project that stores a logged-in browser state for authenticated specs
- HTML reporting, failure screenshots, retained traces/videos on failure, retries on CI

## Project structure

```text
.
├── data/                    # Shared users, products, and checkout data
├── pages/                   # Page object models
├── playwright/fixtures.js   # Custom Playwright fixtures
├── tests/                   # Login, cart, checkout, setup, and critical-flow specs
└── playwright.config.js     # Projects, auth state, reporters, artifacts, base URL
```

## Setup

```bash
npm install
npx playwright install
```

The default target is `https://www.saucedemo.com`. Override it with `BASE_URL` when needed:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

Standard credentials default to Saucedemo's public demo account. You can override them with `SAUCE_USERNAME` and `SAUCE_PASSWORD`.

## Run tests

```bash
npm test
npm run test:critical
npm run test:headed
npm run test:ui
npm run test:debug
npm run report
```

The `setup` project logs in once and saves storage state to `playwright/.auth/user.json`; that directory is ignored by git.

## CI

GitHub Actions installs dependencies, installs Playwright browsers, runs the suite, and uploads the HTML report from `playwright-report/`.
