# Playwright Testing Framework for Verivox.de

A comprehensive end-to-end testing framework built with Playwright for testing www.verivox.de. This project implements QA best practices including Page Object Model, parallel test execution, and Azure cloud integration.

## 🚀 Features

- ✅ **Page Object Model (POM)** - Maintainable and reusable page objects
- ✅ **Parallel Test Execution** - Run tests concurrently for faster feedback
- ✅ **Multi-Browser Support** - Tests run on Chromium, Firefox, and WebKit
- ✅ **Mobile Testing** - Responsive design testing on mobile viewports
- ✅ **Azure Cloud Integration** - Support for Microsoft Playwright Testing service
- ✅ **Comprehensive Reporting** - HTML, JSON, and JUnit reports
- ✅ **Best Practices** - Following industry-standard QA patterns and practices
- ✅ **TypeScript Support Ready** - JSDoc comments for IntelliSense

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/teixeira-fernando/playwright-parallelization-benchmark.git
cd playwright-parallelization-benchmark
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 📁 Project Structure

```
playwright-parallelization-benchmark/
├── tests/                      # Test specifications
│   ├── example.spec.js        # Example tests (no external dependencies)
│   ├── home.spec.js           # Homepage tests (requires internet)
│   ├── navigation.spec.js     # Navigation tests (requires internet)
│   ├── accessibility.spec.js  # Accessibility tests (requires internet)
│   └── performance.spec.js    # Performance tests (requires internet)
├── pages/                      # Page Object Models
│   ├── BasePage.js            # Base page with common functionality
│   └── HomePage.js            # Homepage page object
├── fixtures/                   # Custom test fixtures
│   └── pages.js               # Page object fixtures
├── utils/                      # Utility functions
│   ├── helpers.js             # Helper functions
│   └── azure-setup.js         # Azure setup configuration
├── playwright.config.js        # Local parallel configuration
├── playwright.config.azure.js  # Azure cloud configuration
└── package.json               # Project dependencies and scripts
```

> **Note:** The Verivox tests (home, navigation, accessibility, performance) require internet access to www.verivox.de. 
> The example.spec.js tests demonstrate the framework functionality without external dependencies.

## 🧪 Running Tests

### Local Parallel Execution

Run all tests in parallel (default configuration):
```bash
npm test
```

Run tests with custom worker count:
```bash
npm run test:parallel
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests with UI mode (interactive):
```bash
npm run test:ui
```

### Browser-Specific Tests

Run tests on specific browsers:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run mobile tests:
```bash
npm run test:mobile
```

### View Test Reports

After running tests, view the HTML report:
```bash
npm run test:report
```

## ☁️ Azure Cloud Execution

### Setup Azure Playwright Testing

1. Create a Microsoft Playwright Testing workspace in Azure Portal
2. Get your workspace URL and access token
3. Set environment variables:

```bash
# Linux/macOS
export PLAYWRIGHT_SERVICE_URL="your-workspace-url"
export PLAYWRIGHT_SERVICE_ACCESS_TOKEN="your-access-token"

# Windows (PowerShell)
$env:PLAYWRIGHT_SERVICE_URL="your-workspace-url"
$env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN="your-access-token"
```

### Run Tests on Azure

Execute tests on Azure cloud infrastructure:
```bash
npm run test:azure
```

Benefits of Azure execution:
- Scalable parallel execution across multiple machines
- No need for local browser installations
- Faster test execution with cloud resources
- Integrated reporting and artifacts storage

## 📊 Test Reports

The framework generates multiple report formats:

- **HTML Report** - Interactive visual report at `playwright-report/index.html`
- **JSON Report** - Machine-readable results at `test-results/results.json`
- **JUnit Report** - CI/CD integration at `test-results/junit.xml` (Azure only)
- **Blob Report** - Azure artifact storage at `blob-report/` (Azure only)

## 🏗️ Page Object Model

The framework uses Page Object Model (POM) for maintainability:

### BasePage
Contains common functionality used across all pages:
- Navigation methods
- Element interaction helpers
- Cookie acceptance
- Screenshot utilities
- Wait helpers

### HomePage
Specific to Verivox.de homepage:
- Logo interaction
- Navigation verification
- Section visibility checks
- Search functionality

### Creating New Page Objects

```javascript
const BasePage = require('./BasePage');

class YourPage extends BasePage {
  constructor(page) {
    super(page);
    this.yourLocator = page.locator('your-selector');
  }

  async yourMethod() {
    // Your implementation
  }
}

module.exports = YourPage;
```

## 🧩 Custom Fixtures

Fixtures provide reusable test setup:

```javascript
const { test } = require('../fixtures/pages');

test('your test', async ({ homePage }) => {
  await homePage.navigate();
  // Your test code
});
```

## ⚙️ Configuration

### Local Configuration (`playwright.config.js`)

- **Parallel execution**: Uses all CPU cores by default
- **Projects**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Workers**: Automatic based on CPU cores (can be overridden)
- **Retries**: 0 for local, 2 for CI
- **Reports**: HTML, JSON, List

### Azure Configuration (`playwright.config.azure.js`)

- **Cloud execution**: Connects to Azure Playwright Testing service
- **Projects**: Chromium, Firefox, WebKit
- **Workers**: 1 (Azure handles parallelization)
- **Retries**: 2
- **Reports**: Blob, JSON, JUnit, List

## 🎯 Best Practices Implemented

1. **Page Object Model** - Separation of test logic and page structure
2. **DRY Principle** - Reusable fixtures and helpers
3. **Parallel Execution** - Faster test runs
4. **Independent Tests** - Each test can run standalone
5. **Proper Waiting** - Using Playwright's auto-waiting features
6. **Error Handling** - Graceful handling of edge cases
7. **Screenshot on Failure** - Visual debugging
8. **Video on Retry** - Capturing retry attempts
9. **Comprehensive Logging** - Clear test output
10. **Multiple Reporters** - Different report formats for different needs

## 🐛 Debugging

Debug a specific test:
```bash
npx playwright test tests/home.spec.js --debug
```

Run with trace viewer:
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## 📝 Test Categories

### Home Tests (`home.spec.js`)
- Homepage loading verification
- Logo visibility
- Page title validation
- Navigation menu checks
- Product sections validation

### Navigation Tests (`navigation.spec.js`)
- Logo click functionality
- Navigation accessibility
- Page refresh handling
- Responsive design verification

### Accessibility Tests (`accessibility.spec.js`)
- HTML structure validation
- Language attribute checks
- SEO meta tags verification
- Viewport configuration

### Performance Tests (`performance.spec.js`)
- Page load time measurement
- Network request monitoring
- Console error tracking
- Critical resource loading

## 🔧 Troubleshooting

### Browsers not installed
```bash
npx playwright install
```

### Port already in use
Kill existing processes or change port in configuration

### Azure connection issues
Verify environment variables:
```bash
echo $PLAYWRIGHT_SERVICE_URL
echo $PLAYWRIGHT_SERVICE_ACCESS_TOKEN
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Run tests locally
6. Submit a pull request

## 📄 License

ISC License

## 👥 Author

Fernando Teixeira

## 🔗 Links

- [Playwright Documentation](https://playwright.dev)
- [Microsoft Playwright Testing](https://aka.ms/mpt/docs)
- [Verivox Website](https://www.verivox.de)
- [GitHub Repository](https://github.com/teixeira-fernando/playwright-parallelization-benchmark)

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/teixeira-fernando/playwright-parallelization-benchmark/issues
- Playwright Community: https://playwright.dev/community/welcome

---

**Happy Testing! 🎭**
