import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const astro = spawn('npm', ['run', 'dev'], {
  cwd: process.cwd(),
  env: process.env,
  shell: true,
});

astro.stdout.on('data', (data) => {
  console.log(`ASTRO: ${data}`);
  if (data.toString().includes('Local')) {
    runPuppeteer();
  }
});

astro.stderr.on('data', (data) => {
  console.error(`ASTRO ERR: ${data}`);
});

async function runPuppeteer() {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('requestfailed', request => {
    console.error('PAGE REQ FAIL:', request.url(), request.failure().errorText);
  });

  try {
    await page.goto('http://localhost:4321/studio', { waitUntil: 'networkidle2' });
    console.log('Page loaded. Waiting a bit for any React errors...');
    await new Promise(r => setTimeout(r, 3000));
    const content = await page.content();
    if (content.includes('crashed')) {
      console.log('Found "crashed" in page content!');
    }
  } catch (err) {
    console.error('Puppeteer error:', err);
  } finally {
    await browser.close();
    astro.kill();
    process.exit(0);
  }
}
