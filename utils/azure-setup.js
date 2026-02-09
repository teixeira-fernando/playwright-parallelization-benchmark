/**
 * Azure Global Setup
 * 
 * This file is executed once before all tests when running on Azure.
 * It validates the Azure Playwright Testing service configuration.
 */

async function globalSetup(config) {
  console.log('Starting Azure Playwright Testing Setup...');
  
  // Validate Azure service configuration
  if (process.env.PLAYWRIGHT_SERVICE_URL) {
    console.log('✓ Azure Playwright Testing Service URL configured');
    
    if (process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN) {
      console.log('✓ Azure Playwright Testing Service access token configured');
    } else {
      console.warn('⚠ Warning: PLAYWRIGHT_SERVICE_ACCESS_TOKEN not set');
    }
  } else {
    console.log('ℹ Running in local mode (no Azure service URL configured)');
  }
  
  console.log('Azure setup complete.\n');
}

module.exports = globalSetup;
