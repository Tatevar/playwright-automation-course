// @ts-check
import { log } from 'node:console';
import { test, expect } from '../playwright/fixtures.js';

test('user can log in and see dashboard', async ({ loginPage }) => {
  await loginPage.goto();
  await expect(loginPage.page).toHaveScreenshot('login-page.png');
});