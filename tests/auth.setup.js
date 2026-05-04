import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';
import { GeneralPage } from '../pages/generalPage.js';

const authFile = path.resolve('playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await generalPage.expectInventoryPage();

  await page.context().storageState({ path: authFile });
});
