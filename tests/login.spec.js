// @ts-check
import { test, expect } from '../playwright/fixtures.js';

test('user can log in and see dashboard', async ({ loginPage }) => {
  await loginPage.goto();
});