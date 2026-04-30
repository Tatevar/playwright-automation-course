// @ts-check
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';

/**
 * @typedef {import('@playwright/test').PlaywrightTestArgs &
 *   import('@playwright/test').PlaywrightTestOptions & {
 *     loginPage: LoginPage
 *   }} Fixtures
 */

/**
 * @typedef {import('@playwright/test').PlaywrightWorkerArgs &
 *   import('@playwright/test').PlaywrightWorkerOptions} WorkerFixtures
 */

/** @type {import('@playwright/test').TestType<Fixtures, WorkerFixtures>} */
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect };
