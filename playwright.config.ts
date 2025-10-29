import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries:1,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
 // workers:2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',

  reporter:[
    ['html'],
    ['list'],
    ['dot'],
    ['allure-playwright']

     
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
     video: 'retain-on-failure',
     screenshot:'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

   
  ],

  
});
