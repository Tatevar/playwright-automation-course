import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Your Cart');
    this.cartItems = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  productButtonId(productName) {
    return productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title).toBeVisible();
  }

  async expectProductNames(productNames) {
    await expect(this.cartItems).toHaveText(productNames);
  }

  async expectEmpty() {
    await expect(this.cartItems).toHaveCount(0);
    await expect(this.cartBadge).toBeHidden();
  }

  async removeProduct(productName) {
    await this.page.locator(`[data-test="remove-${this.productButtonId(productName)}"]`).click();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
