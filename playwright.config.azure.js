// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration for Azure Cloud Execution with Microsoft Playwright Testing
 * 
 * This configuration is optimized for running tests on Azure with Playwright workspaces.
 * It uses the Microsoft Playwright Testing service for scalable cloud execution.
 * 
 * @see https://playwright.dev/docs/test-configuration
 * @see https://aka.ms/mpt/docs
 */
module.exports = defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run for
  timeout: 30 * 1000,
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: true,
  
  // Retry failed tests
  retries: 2,
  
  // Number of workers - Azure will handle parallelization
  workers: process.env.PLAYWRIGHT_SERVICE_URL ? 1 : undefined,
  
  // Reporter to use - optimized for CI/CD
  reporter: [
    ['blob', { outputDir: 'blob-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL for navigation
    baseURL: 'https://www.verivox.de',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on retry
    video: 'retain-on-failure',
    
    // Maximum time each action can take
    actionTimeout: 10 * 1000,
    
    // Navigation timeout
    navigationTimeout: 30 * 1000,
    
    // Azure Playwright Testing Service configuration
    connectOptions: process.env.PLAYWRIGHT_SERVICE_URL ? {
      wsEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
      timeout: 30000,
      headers: {
        'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN || ''
      },
      exposeNetwork: '<loopback>'
    } : undefined,
  },

  // Configure projects for major browsers
  // Azure will run these in parallel on cloud infrastructure
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        channel: 'chromium'
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      },
    },
  ],

  // Output folder for test artifacts
  outputDir: 'test-results',
  
  // Global setup/teardown for Azure
  globalSetup: process.env.PLAYWRIGHT_SERVICE_URL ? require.resolve('./utils/azure-setup.js') : undefined,
});
