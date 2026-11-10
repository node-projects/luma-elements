import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests',testMatch:'**/*.spec.ts',workers:2,fullyParallel:true,reporter:'list',
  use:{baseURL:'http://127.0.0.1:4186',headless:true},
  projects:[{name:'chromium',use:{browserName:'chromium'}}],
  webServer:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:4186',reuseExistingServer:!process.env.CI},
});
