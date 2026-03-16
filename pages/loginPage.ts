import { type Locator, type Page, expect } from "@playwright/test";

/**
 * LoginPage — Page Object Model
 *
 * Encapsulates all locators and actions for the login page.
 * Target site: https://the-internet.herokuapp.com/login
 */
export class LoginPage {
  // ── Locators ──────────────────────────────────────────
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly flashMessage: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('button[type="submit"]');
    this.logoutButton = page.getByRole("link", { name: /Logout/i });
    this.flashMessage = page.locator("#flash");
    this.heading = page.getByRole("heading", { level: 2 });
  }

  // ── Actions ───────────────────────────────────────────

  /** Navigate to the login page */
  async navigate() {
    await this.page.goto("https://the-internet.herokuapp.com/login");
  }

  /** Fill in credentials and click Login */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Click the Logout button (after a successful login) */
  async logout() {
    await this.logoutButton.click();
  }

  // ── Screenshots ───────────────────────────────────────

  /** Take a screenshot and attach it to the test report */
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  // ── Assertions ────────────────────────────────────────

  async expectLoginPageVisible() {
    await expect(this.heading).toHaveText("Login Page");
  }

  async expectSuccessMessage() {
    await expect(this.flashMessage).toContainText(
      "You logged into a secure area!"
    );
  }

  async expectInvalidUsernameError() {
    await expect(this.flashMessage).toContainText(
      "Your username is invalid!"
    );
  }

  async expectInvalidPasswordError() {
    await expect(this.flashMessage).toContainText(
      "Your password is invalid!"
    );
  }

  async expectSecureAreaVisible() {
    await expect(this.heading).toHaveText("Secure Area");
  }

  async expectRedirectedToLogin() {
    await expect(this.page).toHaveURL(/\/login/);
  }
}
