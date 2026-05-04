// @ts-check
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { GeneralPage } from '../pages/generalPage.js';

/**
 * @typedef {Object} Fixtures
 * @property {import('@playwright/test').Page} page
 * @property {LoginPage} loginPage
 * @property {GeneralPage} generalPage
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
  generalPage: async ({ page }, use) => {
    const generalPage = new GeneralPage(page);
    await use(generalPage);
  },
});

export { expect };
