import { test, expect } from '../playwright/fixtures.js';

const emptyStorageState = { cookies: [], origins: [] };
const password = 'secret_sauce';

test.describe('critical Saucedemo user flows', () => {
  test.describe('authentication', () => {
    test.use({ storageState: emptyStorageState });

    test('standard user can log in and log out', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login('standard_user', password);

      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(page.getByText('Products')).toBeVisible();

      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.getByRole('link', { name: 'Logout' }).click();

      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(loginPage.loginButton).toBeVisible();
    });

    test('locked out user sees a login error', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login('locked_out_user', password);

      await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  test('shopper can add and remove an item from the cart', async ({ generalPage, page }) => {
    await generalPage.gotoInventory();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await generalPage.gotoCart();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
  });

  test('checkout requires customer information before continuing', async ({ generalPage, page }) => {
    await generalPage.gotoInventory();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await generalPage.gotoCart();

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

    await page.locator('[data-test="firstName"]').fill('Sam');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

    await page.locator('[data-test="lastName"]').fill('Shopper');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
  });

  test('shopper can complete checkout for selected products', async ({ generalPage, page }) => {
    await generalPage.gotoInventory();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await generalPage.gotoCart();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
    ]);

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Sam');
    await page.locator('[data-test="lastName"]').fill('Shopper');
    await page.locator('[data-test="postalCode"]').fill('90210');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
    ]);
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total:');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total:');

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
  });
});
