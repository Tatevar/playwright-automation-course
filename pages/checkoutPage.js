import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectInformationPage() {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async fillCustomerInformation({ firstName, lastName, postalCode }) {
    if (firstName !== undefined) {
      await this.firstNameInput.fill(firstName);
    }

    if (lastName !== undefined) {
      await this.lastNameInput.fill(lastName);
    }

    if (postalCode !== undefined) {
      await this.postalCodeInput.fill(postalCode);
    }
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async expectValidationError(message) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async submitCustomerInformation(customer) {
    await this.fillCustomerInformation(customer);
    await this.continueToOverview();
  }

  async expectOverviewPage(productNames) {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.inventoryItemNames).toHaveText(productNames);
    await expect(this.subtotalLabel).toContainText('Item total:');
    await expect(this.taxLabel).toContainText('Tax:');
    await expect(this.totalLabel).toContainText('Total:');
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectCompletePage() {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.cartBadge).toBeHidden();
  }
}
