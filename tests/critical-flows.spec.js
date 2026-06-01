import { test } from '../playwright/fixtures.js';
import { checkoutCustomer, products, users } from '../data/testData.js';

const emptyStorageState = { cookies: [], origins: [] };

test.describe('critical Saucedemo user flows', () => {
  test.use({ storageState: emptyStorageState });

  test('standard shopper completes the login-cart-checkout journey', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.boltTShirt);
    await inventoryPage.expectCartBadge(2);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectProductNames([products.backpack, products.boltTShirt]);

    await cartPage.startCheckout();
    await checkoutPage.expectInformationPage();
    await checkoutPage.submitCustomerInformation(checkoutCustomer);
    await checkoutPage.expectOverviewPage([products.backpack, products.boltTShirt]);

    await checkoutPage.finishOrder();
    await checkoutPage.expectCompletePage();
  });
});
