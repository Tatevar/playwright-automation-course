import { test } from '../playwright/fixtures.js';
import { products } from '../data/testData.js';

test.describe('cart', () => {
  test('authenticated shopper can open an empty cart', async ({ cartPage }) => {
    await cartPage.goto();

    await cartPage.expectLoaded();
    await cartPage.expectEmpty();
  });

  test('shopper can add a product and see it in the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.expectCartBadge(1);

    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductNames([products.backpack]);
  });

  test('shopper can remove a product from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addProductToCart(products.backpack);

    await inventoryPage.openCart();
    await cartPage.removeProduct(products.backpack);

    await cartPage.expectEmpty();
  });

  test('shopper can continue shopping from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addProductToCart(products.backpack);

    await inventoryPage.openCart();
    await cartPage.continueShopping();

    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartBadge(1);
  });
});
