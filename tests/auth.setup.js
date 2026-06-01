import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';
import { GeneralPage } from '../pages/generalPage.js';
import { users } from '../data/testData.js';

const authFile = path.resolve('playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await generalPage.expectInventoryPage();

  await page.context().storageState({ path: authFile });
});
