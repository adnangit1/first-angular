const { test } = require('@playwright/test');

test('click all visible elements safely', async ({ page }) => {
  await page.goto('https://ceteq.de/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Accept cookies if present
  try {
    const cookieBtn = page.locator('button:has-text("Akzeptieren"), button:has-text("Accept")');
    if (await cookieBtn.first().isVisible()) {
      await cookieBtn.first().click();
      await page.waitForTimeout(500);
    }
  } catch {}

  const clickables = await page.locator(`
    a[href^="/"], 
    [role="button"], 
    [onclick]
  `).all();

  console.log(`Found ${clickables.length} clickable elements`);

  for (let i = 0; i < clickables.length; i++) {
    const el = page.locator(`
      a[href^="/"], 
      [role="button"], 
      [onclick]
    `).nth(i);

    try {
      if (!(await el.isVisible())) continue;

      const text = (await el.innerText().catch(() => '')).trim() || '[no text]';
      console.log(`Clicking: ${text}`);

      await el.click({ timeout: 2000, noWaitAfter: true }).catch(() => {});
      await page.waitForTimeout(300);
    } catch (err) {
      console.log(`Failed: ${err.message}`);
    }
  }

  console.log('Done clicking all visible elements.');
});