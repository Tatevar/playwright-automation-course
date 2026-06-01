import { expect } from '@playwright/test';

export class GeneralPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async gotoInventory() {
    await this.page.goto('/inventory.html');
  }

  async gotoCart() {
    await this.page.goto('/cart.html');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async expectInventoryPage() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async expectCartPage() {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }
}
