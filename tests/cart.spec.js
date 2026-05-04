import { test, expect } from '../playwright/fixtures.js';
import { GeneralPage } from '../pages/generalPage.js';


test('user can open the cart', async ({ loginPage, generalPage }) => {
  await loginPage.goto();
  await generalPage.gotoCart();
  await generalPage.expectCartPage();
  await expect(generalPage.page).toHaveScreenshot('cart-page.png');
});

test('user can add item to cart and see it in the cart', async ({ loginPage, generalPage }) => {
  await loginPage.goto();
  await generalPage.gotoInventory();
  await loginPage.page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await generalPage.gotoCart();
  await expect(loginPage.page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(generalPage.page).toHaveScreenshot('cart-page-with-item.png');

});

test('user can remove item from cart and see it removed', async ({ loginPage, generalPage }) => {
  await loginPage.goto();
  await generalPage.gotoInventory();
  await loginPage.page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await generalPage.gotoCart();
  await expect(loginPage.page.getByText('Sauce Labs Backpack')).toBeVisible();
  await loginPage.page.getByRole('button', { name: 'Remove', exact: true }).first().click();
  await expect(loginPage.page.getByText('Sauce Labs Backpack')).not.toBeVisible();
    await expect(generalPage.page).toHaveScreenshot('cart-page-removed.png');

});