import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
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
