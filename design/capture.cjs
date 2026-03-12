const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  
  await page.goto('file:///home/kschltz/shared/coc7e/design/art-nouveau.html');
  await page.waitForTimeout(2000);
  
  // Landing
  await page.screenshot({ path: 'design/art-nouveau-landing.png', fullPage: true });
  console.log('✓ Landing');
  
  // Wizard - click somewhere to ensure it's visible
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'design/art-nouveau-wizard.png', fullPage: true });
  console.log('✓ Wizard');
  
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'design/art-nouveau-sheet.png', fullPage: true });
  console.log('✓ Sheet');
  
  await browser.close();
  console.log('Done!');
})().catch(e => console.error(e));
