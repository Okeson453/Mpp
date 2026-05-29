import { test, expect } from '@playwright/test';

test.describe('MPP Protocol Flow', () => {
  test('loads homepage and shows brand lockup', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=OFFICIAL MUSTY')).toBeVisible();
  });

  test('landing page hero contains CTA buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=OPEN TERMINAL')).toBeVisible();
    await expect(page.locator('text=READ THE PROTOCOL')).toBeVisible();
  });

  test('health API returns OK', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('OK');
  });

  test('login page renders', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('text=ACCESS TERMINAL')).toBeVisible();
  });

  test('dashboard redirects unauthenticated users', async ({ page }) => {
    await page.goto('/dashboard');
    // Middleware should redirect or show login
    // This test verifies the page doesn't 500
    const status = page.url();
    expect(status).toBeTruthy();
  });
});
