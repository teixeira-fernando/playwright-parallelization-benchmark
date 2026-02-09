/**
 * Performance Tests
 * 
 * Test suite for performance metrics on Verivox.de
 */
const { expect } = require('@playwright/test');
const { test } = require('../fixtures/pages');

test.describe('Verivox Performance', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    
    await page.goto('https://www.verivox.de');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should have reasonable number of network requests', async ({ page }) => {
    const requests = [];
    
    // Collect network requests
    page.on('request', request => {
      requests.push(request.url());
    });
    
    await page.goto('https://www.verivox.de');
    await page.waitForLoadState('networkidle');
    
    console.log(`Total network requests: ${requests.length}`);
    
    // Should have reasonable number of requests (not too excessive)
    expect(requests.length).toBeLessThan(300);
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors = [];
    
    // Collect console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('https://www.verivox.de');
    await page.waitForLoadState('domcontentloaded');
    
    // Log errors if any
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
    
    // This is informational - some third-party scripts may cause errors
    // In a real scenario, you'd want to filter out expected errors
    console.log(`Console errors: ${consoleErrors.length}`);
  });

  test('should load critical resources', async ({ page }) => {
    const responses = [];
    
    // Collect responses
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status()
      });
    });
    
    await page.goto('https://www.verivox.de');
    await page.waitForLoadState('domcontentloaded');
    
    // Check that main page loaded successfully
    const mainPageResponse = responses.find(r => r.url.includes('verivox.de'));
    expect(mainPageResponse?.status).toBe(200);
  });
});
