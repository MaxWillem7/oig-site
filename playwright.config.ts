import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  reporter: 'list',
  use: { baseURL: process.env.BASE_URL || 'http://localhost:3100' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobiel', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
})
