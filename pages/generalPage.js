import { expect } from '@playwright/test';

export class GeneralPage {
  constructor(page) {
    this.page = page;
  }
    async gotoInventory() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async gotoCart() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async expectInventoryPage() {
    await expect(this.page).toHaveURL(/\/inventory/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async expectCartPage() {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }
  }