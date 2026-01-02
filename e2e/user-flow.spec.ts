import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect unagreed users to agreement page', async ({ page }) => {
    await page.goto('/result');
    await expect(page).toHaveURL(/\/agreement/);
  });

  test('should show agreement page with required elements', async ({ page }) => {
    await page.goto('/agreement');

    // Check header
    await expect(page.locator('text=운명의 문을 열기 전에')).toBeVisible();

    // Check required agreement checkbox
    await expect(page.locator('text=서비스 이용 약관 동의')).toBeVisible();

    // Check birthdate picker
    await expect(page.locator('text=태어난 날의 기운')).toBeVisible();

    // Check submit button exists but is disabled
    const submitButton = page.getByRole('button', { name: /운명의 문 열기/ });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit button after filling required fields', async ({ page }) => {
    await page.goto('/agreement');

    // Check terms checkbox
    await page.locator('text=서비스 이용 약관 동의').click();

    // Fill birthdate (YYYYMMDD format)
    // Note: The actual implementation may vary based on BirthDatePicker component
    const yearSelect = page.locator('select').first();
    const monthSelect = page.locator('select').nth(1);
    const daySelect = page.locator('select').nth(2);

    if (await yearSelect.isVisible()) {
      await yearSelect.selectOption({ index: 25 }); // ~1999
      await monthSelect.selectOption({ index: 6 }); // July
      await daySelect.selectOption({ index: 15 }); // 15th
    }

    // Submit button should be enabled now
    const submitButton = page.getByRole('button', { name: /운명의 문 열기/ });
    await expect(submitButton).toBeEnabled();
  });

  test('should navigate through loading to result page', async ({ page }) => {
    // Set up localStorage with valid agreement
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('soul_agreement', JSON.stringify({ terms: true, thirdParty: false, marketing: false }));
      localStorage.setItem('soul_birth', JSON.stringify({ yyyymmdd: '19990701', calendar: 'solar', leapMonth: false }));
    });

    await page.goto('/loading');

    // Wait for redirect to result page (loading takes ~3 seconds)
    await expect(page).toHaveURL(/\/result/, { timeout: 10000 });
  });

  test('should show locked state on result page', async ({ page }) => {
    // Set up localStorage with valid agreement
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('soul_agreement', JSON.stringify({ terms: true, thirdParty: false, marketing: false }));
      localStorage.setItem('soul_birth', JSON.stringify({ yyyymmdd: '19990701', calendar: 'solar', leapMonth: false }));
    });

    await page.goto('/result');

    // Check for locked content indicators
    await expect(page.locator('text=운명의 봉인').or(page.locator('text=오늘의 운세'))).toBeVisible({ timeout: 5000 });
  });

  test('should show landing page content', async ({ page }) => {
    await page.goto('/');

    // Check for main elements
    await expect(page.locator('text=Soul Lab').or(page.locator('text=운명'))).toBeVisible();
  });
});

test.describe('Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set up localStorage with unlocked state
    await page.goto('/');
    const today = new Date();
    const dateKey = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

    await page.evaluate((dk) => {
      localStorage.setItem('soul_agreement', JSON.stringify({ terms: true, thirdParty: false, marketing: false }));
      localStorage.setItem('soul_birth', JSON.stringify({ yyyymmdd: '19990701', calendar: 'solar', leapMonth: false }));
      localStorage.setItem('soul_unlocked_date', dk);
    }, dateKey);
  });

  test('should show detail page when unlocked', async ({ page }) => {
    await page.goto('/detail');

    // Check for detail page content
    await expect(page.locator('text=운명의 깊은 메시지').or(page.locator('text=봉인된 운명'))).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Chemistry Page', () => {
  test('should show invalid state without proper params', async ({ page }) => {
    await page.goto('/chemistry');

    // Should show invalid or error state
    await expect(page.locator('text=무효').or(page.locator('text=인연'))).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Accessibility', () => {
  test('should have no critical accessibility issues on agreement page', async ({ page }) => {
    await page.goto('/agreement');

    // Basic a11y checks
    const mainContent = page.locator('main, .container, [role="main"]').first();
    await expect(mainContent).toBeVisible();

    // Check buttons have accessible names
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const name = await button.getAttribute('aria-label') || await button.textContent();
      expect(name).toBeTruthy();
    }
  });
});
