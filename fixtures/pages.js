/**
 * Test Fixtures
 * 
 * Custom fixtures provide reusable test setup and page objects
 */
const { test as base } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

/**
 * Extended test with page objects
 */
const test = base.extend({
  /**
   * Home page fixture
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

module.exports = { test };
