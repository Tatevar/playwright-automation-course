import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';

const authFile = path.resolve('playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectInventoryPage();

  await page.context().storageState({ path: authFile });
});
