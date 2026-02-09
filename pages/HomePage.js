/**
 * Home Page Object for Verivox.de
 * 
 * This page object represents the main homepage of Verivox.de
 */
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators
    this.logo = page.locator('[data-testid="logo"], .logo, a[href="/"]').first();
    this.searchBar = page.locator('[data-testid="search"], input[type="search"]').first();
    this.navigationMenu = page.locator('nav, [role="navigation"]').first();
    
    // Main product categories
    this.energySection = page.locator('text=/Strom|Energie/i').first();
    this.internetSection = page.locator('text=/Internet|DSL/i').first();
    this.mobileSection = page.locator('text=/Handy|Mobilfunk/i').first();
    this.insuranceSection = page.locator('text=/Versicherung/i').first();
    this.financeSection = page.locator('text=/Finanzen|Kredit/i').first();
  }

  /**
   * Navigate to the homepage
   */
  async navigate() {
    await this.goto('/');
    await this.waitForPageLoad();
    await this.acceptCookies();
  }

  /**
   * Verify the homepage is loaded
   * @returns {Promise<boolean>}
   */
  async isLoaded() {
    try {
      await this.logo.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the main heading text
   * @returns {Promise<string>}
   */
  async getMainHeading() {
    const heading = this.page.locator('h1, h2').first();
    return await heading.textContent() || '';
  }

  /**
   * Check if navigation menu is visible
   * @returns {Promise<boolean>}
   */
  async isNavigationVisible() {
    return await this.navigationMenu.isVisible();
  }

  /**
   * Check if energy section is available
   * @returns {Promise<boolean>}
   */
  async hasEnergySection() {
    try {
      await this.energySection.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if internet section is available
   * @returns {Promise<boolean>}
   */
  async hasInternetSection() {
    try {
      await this.internetSection.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if mobile section is available
   * @returns {Promise<boolean>}
   */
  async hasMobileSection() {
    try {
      await this.mobileSection.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Search for a term
   * @param {string} searchTerm - The term to search for
   */
  async search(searchTerm) {
    if (await this.searchBar.isVisible()) {
      await this.searchBar.fill(searchTerm);
      await this.searchBar.press('Enter');
      await this.waitForPageLoad();
    }
  }

  /**
   * Click on logo to return to homepage
   */
  async clickLogo() {
    await this.logo.click();
    await this.waitForPageLoad();
  }

  /**
   * Get all visible main sections
   * @returns {Promise<string[]>}
   */
  async getVisibleSections() {
    const sections = [];
    
    if (await this.hasEnergySection()) sections.push('Energy');
    if (await this.hasInternetSection()) sections.push('Internet');
    if (await this.hasMobileSection()) sections.push('Mobile');
    
    return sections;
  }
}

module.exports = HomePage;
