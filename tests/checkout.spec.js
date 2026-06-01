import { test } from '../playwright/fixtures.js';
import { checkoutCustomer, products } from '../data/testData.js';

test.describe('checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.startCheckout();

    await checkoutPage.expectInformationPage();
  });

  test('requires customer information before continuing', async ({ checkoutPage }) => {
    await checkoutPage.continueToOverview();
    await checkoutPage.expectValidationError('Error: First Name is required');

    await checkoutPage.fillCustomerInformation({ firstName: checkoutCustomer.firstName });
    await checkoutPage.continueToOverview();
    await checkoutPage.expectValidationError('Error: Last Name is required');

    await checkoutPage.fillCustomerInformation({ lastName: checkoutCustomer.lastName });
    await checkoutPage.continueToOverview();
    await checkoutPage.expectValidationError('Error: Postal Code is required');
  });

  test('shows checkout overview for selected products', async ({ checkoutPage }) => {
    await checkoutPage.submitCustomerInformation(checkoutCustomer);

    await checkoutPage.expectOverviewPage([products.backpack]);
  });

  test('shopper can complete checkout', async ({ checkoutPage }) => {
    await checkoutPage.submitCustomerInformation(checkoutCustomer);
    await checkoutPage.expectOverviewPage([products.backpack]);

    await checkoutPage.finishOrder();

    await checkoutPage.expectCompletePage();
  });
});
