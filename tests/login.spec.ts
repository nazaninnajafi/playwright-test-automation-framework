import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { validUser, invalidCredentials } from "../utils/testData";
import path from "path";

/**
 * Login Test Suite
 *
 * Skills demonstrated:
 *   ✔ Page Object Model (LoginPage)
 *   ✔ Centralised test data (testData.ts)
 *   ✔ Positive & negative test cases
 *   ✔ Pre-condition setup via beforeEach
 *   ✔ Assertions on text, URL, and visibility
 *   ✔ Step-level screenshots attached to HTML report
 *   ✔ Error screenshots on failure for debugging
 */

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

test.describe("Login Functionality", () => {

  test("should display the login page correctly", async ({ page }, testInfo) => {
    await loginPage.expectLoginPageVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // Screenshot: login page visible
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Login Page Displayed", {
      body: screenshot,
      contentType: "image/png",
    });
    console.log("✅ Login page displayed correctly");
  });

  test("should login successfully with valid credentials", async ({ page }, testInfo) => {
    // Step 1 — Fill credentials & submit
    await loginPage.login(validUser.username, validUser.password);

    const screenshotStep1 = await page.screenshot({ fullPage: true });
    await testInfo.attach("Step 1: Credentials Submitted", {
      body: screenshotStep1,
      contentType: "image/png",
    });
    console.log("✅ Step 1: Credentials submitted");

    // Step 2 — Verify secure area
    await loginPage.expectSuccessMessage();
    await loginPage.expectSecureAreaVisible();

    const screenshotStep2 = await page.screenshot({ fullPage: true });
    await testInfo.attach("Step 2: Secure Area Visible", {
      body: screenshotStep2,
      contentType: "image/png",
    });
    console.log("✅ Step 2: Secure area displayed");
  });

  test("should show error for invalid username", async ({ page }, testInfo) => {
    const { username, password } = invalidCredentials.wrongUsername;
    await loginPage.login(username, password);
    await loginPage.expectInvalidUsernameError();

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Invalid Username Error", {
      body: screenshot,
      contentType: "image/png",
    });
    console.log("✅ Invalid username error displayed");
  });

  test("should show error for invalid password", async ({ page }, testInfo) => {
    const { username, password } = invalidCredentials.wrongPassword;
    await loginPage.login(username, password);
    await loginPage.expectInvalidPasswordError();

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Invalid Password Error", {
      body: screenshot,
      contentType: "image/png",
    });
    console.log("✅ Invalid password error displayed");
  });

  test("should logout successfully after login", async ({ page }, testInfo) => {
    // Step 1 — Login
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.expectSecureAreaVisible();

    const screenshotStep1 = await page.screenshot({ fullPage: true });
    await testInfo.attach("Step 1: Logged In", {
      body: screenshotStep1,
      contentType: "image/png",
    });
    console.log("✅ Step 1: Logged in successfully");

    // Step 2 — Logout
    await loginPage.logout();
    await loginPage.expectRedirectedToLogin();

    const screenshotStep2 = await page.screenshot({ fullPage: true });
    await testInfo.attach("Step 2: Logged Out", {
      body: screenshotStep2,
      contentType: "image/png",
    });
    console.log("✅ Step 2: Logged out and redirected to login");
  });
});
