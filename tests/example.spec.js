/**
 * Example Test
 * 
 * This is a simple example test that demonstrates the framework works
 * without requiring external website access.
 */
const { expect } = require('@playwright/test');
const { test } = require('../fixtures/pages');

test.describe('Example Tests - Framework Validation', () => {
  test('should create a page object successfully', async ({ page }) => {
    // Navigate to about:blank to avoid external dependencies
    await page.goto('about:blank');
    
    // Verify page was created
    expect(page).toBeTruthy();
    
    // Verify page title
    const title = await page.title();
    expect(title).toBe('');
  });

  test('should use custom fixture successfully', async ({ homePage }) => {
    // Verify fixture was created
    expect(homePage).toBeTruthy();
    expect(homePage.page).toBeTruthy();
  });

  test('should run tests in parallel', async ({ page }) => {
    // This test verifies parallel execution works
    await page.goto('about:blank');
    
    // Add some content to the page
    await page.setContent('<h1>Playwright Test Framework</h1>');
    
    // Verify content
    const heading = await page.locator('h1').textContent();
    expect(heading).toBe('Playwright Test Framework');
  });

  test('should support multiple assertions', async ({ page }) => {
    await page.goto('about:blank');
    await page.setContent(`
      <html lang="de">
        <head><title>Test Page</title></head>
        <body>
          <h1>Welcome</h1>
          <p>This is a test</p>
        </body>
      </html>
    `);
    
    // Multiple assertions
    expect(await page.title()).toBe('Test Page');
    expect(await page.locator('h1').textContent()).toBe('Welcome');
    expect(await page.locator('p').textContent()).toBe('This is a test');
    expect(await page.locator('html').getAttribute('lang')).toBe('de');
  });
});
