/**
 * Base Page Object
 * 
 * This class provides common functionality for all page objects.
 * It follows the Page Object Model (POM) design pattern.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for the page to be loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take a screenshot
   * @param {string} name - Screenshot name
   */
  async screenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Get page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - CSS selector
   */
  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   * @returns {Promise<boolean>}
   */
  async isElementVisible(selector) {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      return await element.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Click on an element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - CSS selector
   * @param {string} value - Value to fill
   */
  async fill(selector, value) {
    await this.page.fill(selector, value);
  }

  /**
   * Get text content of an element
   * @param {string} selector - CSS selector
   * @returns {Promise<string|null>}
   */
  async getTextContent(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Accept cookies if cookie banner is present
   */
  async acceptCookies() {
    try {
      // Common cookie acceptance patterns
      const cookieSelectors = [
        '[data-testid="cookie-accept"]',
        '[id*="cookie"][id*="accept"]',
        'button:has-text("Akzeptieren")',
        'button:has-text("Alle akzeptieren")',
        'button:has-text("Accept")',
        '#onetrust-accept-btn-handler'
      ];

      for (const selector of cookieSelectors) {
        if (await this.isElementVisible(selector)) {
          await this.click(selector);
          // Wait for the cookie banner to disappear after accepting
          await this.page.locator(selector).waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
          break;
        }
      }
    } catch (error) {
      // Cookie banner not found or already accepted
      console.log('Cookie banner handling: ', error.message);
    }
  }
}

module.exports = BasePage;
