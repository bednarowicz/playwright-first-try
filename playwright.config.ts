import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
 timeout: 30000,
  globalTimeout: 480000,
  expect:{
    timeout: 15000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },
  testDir: './tests',
  // /* Run tests in files in parallel */
  // fullyParallel: false,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  // retries: process.env.CI ? 2 : 1,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/junitReport.xml'}],
    ['junit', { outputFile: 'test-results/junitReport.xml'}]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200'
      : process.env.STAGING =='1' ? 'http://localhost:4202'
      : 'http://localhost:4200',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    //video: 'on'
    video: {
      mode: 'off', //'on',
      size: { width: 1920, height: 1080}
    }
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 11 Pro']
        // viewport: {width 414, height: 800}
      }

    },
    {
      name: 'stage',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4200' }
    },
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4200' }
    },

    {
      name: 'firefox',
      use: { //...devices['Desktop Firefox']
        browserName: 'firefox',
        video: {
          mode: 'on-first-retry',
          size: { width: 1920, height: 1080}
        }
     },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
      baseURL: 'http://localhost:4200'  }
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080}
      }
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
  //  reuseExistingServer: !process.env.CI,
  },
});
