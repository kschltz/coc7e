const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const htmlPath = 'file://' + path.resolve('design/art-nouveau.html');
  await page.goto(htmlPath);
  
  // Wait for fonts to load
  await page.waitForTimeout(2000);
  
  // Take screenshot of all pages
  await page.screenshot({ path: 'design/art-nouveau-landing.png', fullPage: true });
  console.log('Landing page screenshot saved');
  
  // Scroll to wizard section
  await page.evaluate(() => {
    const pages = document.querySelectorAll('.page');
    if (pages[1]) pages[1].scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'design/art-nouveau-wizard.png', fullPage: true });
  console.log('Wizard page screenshot saved');
  
  // Scroll to sheet section
  await page.evaluate(() => {
    const pages = document.querySelectorAll('.page');
    if (pages[2]) pages[2].scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'design/art-nouveau-sheet.png', fullPage: true });
  console.log('Sheet page screenshot saved');
  
  await browser.close();
  console.log('All screenshots captured!');
})();
