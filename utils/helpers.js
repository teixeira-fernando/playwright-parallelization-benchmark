/**
 * Test Helpers
 * 
 * Utility functions for tests
 */

/**
 * @deprecated Use Playwright's built-in waiting mechanisms instead (waitForSelector, waitForLoadState, etc.)
 * 
 * Wait for a specific amount of time - AVOID USING THIS
 * This helper is provided for edge cases only. Prefer Playwright's auto-waiting features.
 * 
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
async function wait(ms) {
  console.warn('WARNING: Using arbitrary timeout. Consider using Playwright auto-waiting instead.');
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string}
 */
function randomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email
 * @returns {string}
 */
function randomEmail() {
  return `test.${randomString(8)}@example.com`;
}

/**
 * Format date to German format
 * @param {Date} date - Date object
 * @returns {string}
 */
function formatDateDE(date) {
  return date.toLocaleDateString('de-DE');
}

/**
 * Retry an async operation
 * @param {Function} operation - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<any>}
 */
async function retry(operation, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await wait(delay);
      }
    }
  }
  
  throw lastError;
}

module.exports = {
  wait,
  randomString,
  randomEmail,
  formatDateDE,
  retry
};
