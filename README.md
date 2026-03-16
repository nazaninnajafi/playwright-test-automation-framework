# Playwright Test Automation Framework

A clean, scalable Playwright framework demonstrating industry best practices for UI test automation.

## Project Structure

```
playwright-test-automation-framework
│
├── pages/
│   └── loginPage.ts          # Page Object Model for the Login page
│
├── tests/
│   └── login.spec.ts         # Login test suite (positive & negative cases)
│
├── utils/
│   └── testData.ts           # Centralised test data & credentials
│
├── playwright.config.ts      # Multi-browser config with CI settings
├── package.json
└── README.md
```

## Key Skills Demonstrated

| Skill | Where |
|-------|-------|
| **Page Object Model (POM)** | `pages/loginPage.ts` |
| **Centralised Test Data** | `utils/testData.ts` |
| **Positive & Negative Tests** | `tests/login.spec.ts` |
| **Multi-Browser Testing** | `playwright.config.ts` (Chromium + Firefox) |
| **CI-Ready Configuration** | Retries, parallel workers, artifacts on failure |
| **TypeScript** | Entire project |

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm

### Installation

```bash
npm install
npx playwright install --with-deps
```

### Run Tests

```bash
# Run all tests (all browsers)
npm test

# Run in headed mode (see the browser)
npm run test:headed

# Run only on Chromium
npm run test:chromium

# Run only on Firefox
npm run test:firefox
```

### View HTML Report

```bash
npm run report
```

## Test Cases

| # | Test Case | Type |
|---|-----------|------|
| 1 | Display login page correctly | Positive |
| 2 | Login with valid credentials | Positive |
| 3 | Error for invalid username | Negative |
| 4 | Error for invalid password | Negative |
| 5 | Logout after successful login | Positive |

## Technologies

- **Playwright** — fast, reliable end-to-end testing
- **TypeScript** — type-safe test code
- **HTML Reporter** — built-in rich test reports
