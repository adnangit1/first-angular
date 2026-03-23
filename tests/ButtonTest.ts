const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:4200/');

  await page.waitForLoadState('networkidle');

  const buttons = await page.locator('button, input[type="button"], input[type="submit"]').all();

  console.log(`Found ${buttons.length} buttons\n`);

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    try {

      let name = await button.innerText().catch(() => '');
      if (!name) {
        name = await button.getAttribute('value');
      }
      if (!name) {
        name = await button.getAttribute('aria-label');
      }

      name = name?.trim() || `[Unnamed button ${i}]`;

      await button.scrollIntoViewIfNeeded();

      await button.click({ timeout: 3000 });

      console.log(`Clicked: ${name}`);
    } catch (err) {
      console.log(`❌ Failed: ${i}`);
    }
  }

  await browser.close();
})();