// @ts-check
import { test, expect } from '../playwright/fixtures.js';

test('user can log in and see dashboard', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectInventoryPage();
});

test('user can open cart after login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.gotoCart();
  await loginPage.expectCartPage();
});
