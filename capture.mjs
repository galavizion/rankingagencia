import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:4321/studio', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 5000));
  
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot saved to screenshot.png');
  
  const content = await page.content();
  const crashedMatch = content.match(/The structure tool crashed/i);
  if (crashedMatch) {
    console.log('Found crash message in HTML.');
    const errorText = await page.evaluate(() => document.body.innerText);
    console.log('Page Text:', errorText);
  }
  
  await browser.close();
})();
