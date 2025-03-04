import { BeforeAll, AfterAll, Before, After, Status, setWorldConstructor, World, IWorldOptions} from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

let browser: Browser;
export let page: Page;

dotenv.config();

class CustomWorld extends World {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);


BeforeAll(async () => {
  browser = await chromium.launch({headless: false});
});

Before(async () =>{
  page = await browser.newPage();
});

After(async function(scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = path.resolve(`reports/screenshots/${sanitizeFileName(scenario.pickle.name)}.png`);
    // Nos aseguramos de que el directorio exista
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    const imageBuffer = fs.readFileSync(screenshotPath);
    // Adjuntamos la captura de pantalla al reporte
    this.attach(imageBuffer, 'image/png');
  }
  await page.close();
});

AfterAll(async () => {
  await browser.close();
});

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}