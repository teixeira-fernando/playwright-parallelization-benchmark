// @ts-check
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const baseConfig = require('./playwright.config');

module.exports = defineConfig(
  baseConfig,
  createAzurePlaywrightConfig(baseConfig, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    forbidOnly: true,
    retries: 2,
    reporter: [
      ['blob', { outputDir: 'blob-report' }],
      ['json', { outputFile: 'test-results/results.json' }],
      ['junit', { outputFile: 'test-results/junit.xml' }],
      ['list'],
    ],
    projects: [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
          viewport: { width: 1920, height: 1080 },
          channel: 'chromium',
        },
      },
      {
        name: 'firefox',
        use: {
          ...devices['Desktop Firefox'],
          viewport: { width: 1920, height: 1080 },
        },
      },
      {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
          viewport: { width: 1920, height: 1080 },
        },
      },
    ],
    outputDir: 'test-results',
  },
);
