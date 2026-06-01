// @ts-check
import { test } from '../playwright/fixtures.js';
import { users } from '../data/testData.js';

const emptyStorageState = { cookies: [], origins: [] };

test.describe('login', () => {
  test.use({ storageState: emptyStorageState });

  test('login page loads for unauthenticated visitors', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
  });

  test('standard user can log in and log out', async ({ loginPage, inventoryPage, generalPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.expectLoaded();

    await generalPage.logout();
    await loginPage.expectLoggedOut();
  });

  test('locked out user sees a login error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await loginPage.expectLoginError('Epic sadface: Sorry, this user has been locked out.');
  });
});
