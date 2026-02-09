/**
 * Navigation Tests
 * 
 * Test suite for navigation functionality on Verivox.de
 */
const { expect } = require('@playwright/test');
const { test } = require('../fixtures/pages');

test.describe('Verivox Navigation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should be able to click logo and stay on homepage', async ({ homePage, page }) => {
    // Click on logo
    await homePage.clickLogo();
    
    // Verify we're still on the homepage
    await expect(page).toHaveURL(/verivox\.de/);
    
    // Verify page is loaded
    const isLoaded = await homePage.isLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should have accessible navigation elements', async ({ page }) => {
    // Check for nav element or role
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();
  });

  test('should handle page refresh correctly', async ({ homePage, page }) => {
    // Reload the page
    await page.reload();
    await homePage.waitForPageLoad();
    
    // Verify page is still loaded correctly
    const isLoaded = await homePage.isLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should maintain responsive design', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });
});
