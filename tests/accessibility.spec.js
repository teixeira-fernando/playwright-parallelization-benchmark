/**
 * Accessibility Tests
 * 
 * Test suite for accessibility features on Verivox.de
 */
const { expect } = require('@playwright/test');
const { test } = require('../fixtures/pages');

test.describe('Verivox Accessibility', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should have proper HTML structure', async ({ page }) => {
    // Check for essential HTML elements
    const html = page.locator('html');
    await expect(html).toBeVisible();
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    const main = page.locator('main, [role="main"], #main').first();
    // Main element should exist (though might not be visible if using different structure)
    const mainExists = await main.count() > 0;
    expect(mainExists).toBeTruthy();
  });

  test('should have lang attribute on html element', async ({ page }) => {
    // Get lang attribute
    const langAttr = await page.locator('html').getAttribute('lang');
    
    // Verify lang attribute exists and is set to German
    expect(langAttr).toBeTruthy();
    expect(langAttr?.toLowerCase()).toContain('de');
  });

  test('should have a valid page title for SEO', async ({ page }) => {
    // Get page title
    const title = await page.title();
    
    // Verify title exists and has reasonable length
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(200);
  });

  test('should have meta description', async ({ page }) => {
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute('content');
    
    // Meta description should exist and have content
    if (content) {
      expect(content.length).toBeGreaterThan(10);
    }
  });

  test('should have viewport meta tag for responsive design', async ({ page }) => {
    // Check for viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    const content = await viewport.getAttribute('content');
    
    // Viewport should be configured
    expect(content).toBeTruthy();
  });
});
