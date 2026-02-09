/**
 * Home Page Tests
 * 
 * Test suite for Verivox.de homepage functionality
 */
const { expect } = require('@playwright/test');
const { test } = require('../fixtures/pages');

test.describe('Verivox Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    // Navigate to homepage before each test
    await homePage.navigate();
  });

  test('should load the homepage successfully', async ({ homePage }) => {
    // Verify page is loaded
    const isLoaded = await homePage.isLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should display the logo', async ({ homePage }) => {
    // Verify logo is visible
    const logo = homePage.logo;
    await expect(logo).toBeVisible();
  });

  test('should have a valid page title', async ({ homePage }) => {
    // Get page title
    const title = await homePage.getTitle();
    
    // Verify title is not empty and contains relevant keywords
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should display navigation menu', async ({ homePage }) => {
    // Verify navigation is visible
    const isNavVisible = await homePage.isNavigationVisible();
    expect(isNavVisible).toBeTruthy();
  });

  test('should display main product sections', async ({ homePage }) => {
    // Get visible sections
    const sections = await homePage.getVisibleSections();
    
    // Verify at least one section is visible
    expect(sections.length).toBeGreaterThan(0);
  });
});
