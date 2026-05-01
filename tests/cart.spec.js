import { test, expect } from '../playwright/fixtures.js';
test('user can open the cart', async ({ loginPage }) => {
     await loginPage.goto();
  await loginPage.gotoCart();
  await loginPage.expectCartPage();
});

test('user can add item to cart and see it in the cart', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.gotoInventory();
  await loginPage.page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await loginPage.gotoCart();
  await expect(loginPage.page.getByText('Sauce Labs Backpack')).toBeVisible();
});

test('user can remove item from cart and see it removed', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.gotoInventory();
  await loginPage.page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await loginPage.gotoCart();
  await expect(loginPage.page.getByText('Sauce Labs Backpack')).toBeVisible();
  await loginPage.page.getByRole('button', { name: 'Remove', exact: true }).first().click();
  await expect(loginPage.page.getByText('Sauce Labs Backpack')).not.toBeVisible();
});