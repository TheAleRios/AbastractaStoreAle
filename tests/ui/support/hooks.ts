import { BeforeAll, AfterAll, Before, After} from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import dotenv from 'dotenv';

let browser: Browser;
export let page: Page;

dotenv.config();

BeforeAll(async () => {
  browser = await chromium.launch({headless: false});
});

Before(async () =>{
  page = await browser.newPage();
});

After(async () => {
  await page.close();
});

AfterAll(async () => {
  await browser.close();
});