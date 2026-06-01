// @ts-check
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { GeneralPage } from '../pages/generalPage.js';
import { InventoryPage } from '../pages/inventoryPage.js';
import { CartPage } from '../pages/cartPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';

/**
 * @typedef {Object} Fixtures
 * @property {import('@playwright/test').Page} page
 * @property {LoginPage} loginPage
 * @property {GeneralPage} generalPage
 * @property {InventoryPage} inventoryPage
 * @property {CartPage} cartPage
 * @property {CheckoutPage} checkoutPage
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
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect };
