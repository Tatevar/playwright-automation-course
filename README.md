# Playwright Automation Course

A test automation project built with [Playwright](https://playwright.dev/) for learning and practicing end-to-end testing.

## Overview

This project demonstrates Playwright testing capabilities with example tests running across multiple browsers (Chromium, Firefox, and WebKit). It includes configuration for parallel test execution, HTML reporting, and CI/CD integration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Tatevar/playwright-automation-course.git
cd playwright-automation-course
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
playwright-automation-course/
├── tests/
│   └── example.spec.js          # Example test file with basic Playwright tests
├── playwright.config.js          # Playwright configuration
├── package.json                  # Project dependencies and metadata
└── README.md                      # This file
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in a specific file
```bash
npx playwright test tests/example.spec.js
```

### Run tests in UI mode (interactive)
```bash
npx playwright test --ui
```

### Run tests with debugging
```bash
npx playwright test --debug
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Viewing Test Results

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Configuration

The project is configured in `playwright.config.js` with:
- **Test directory**: `./tests`
- **Parallel execution**: Enabled for faster test runs
- **Reporters**: HTML report generation
- **Browser projects**: Chromium, Firefox, and WebKit
- **Trace collection**: On first retry for debugging failed tests
- **CI/CD settings**: Automatic retry and worker adjustment for CI environments

## Available Test Browsers

- **Chromium** - Desktop Chrome browser
- **Firefox** - Desktop Firefox browser  
- **WebKit** - Desktop Safari browser

Mobile and other browsers can be enabled by uncommenting configurations in `playwright.config.js`.

## Writing Tests

Tests are written using Playwright's test syntax. Example pattern:

```javascript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

See `tests/example.spec.js` for working examples.

## CI/CD Integration

The project is configured to run on CI environments with:
- `forbidOnly: true` - Fails build if `test.only` is left in code
- `retries: 2` - Retries failed tests automatically
- `workers: 1` - Runs tests sequentially on CI

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## License

ISC

## Repository

[GitHub Repository](https://github.com/Tatevar/playwright-automation-course)
