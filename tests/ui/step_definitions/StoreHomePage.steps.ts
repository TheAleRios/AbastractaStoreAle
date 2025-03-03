import { Given, When, Then } from '@cucumber/cucumber';
import { StoreHomePage } from '../pages/storeHomePage';
import { page } from '../support/hooks';

Given('user goes to the Abstracta store page',{ timeout: 20000 }, async function () {
  await page.goto(StoreHomePage.url);
});

When('the user enters {string} on the searchbar', async function ( item: string) {
  await page.fill(StoreHomePage.selectors.searchField, item);
});

When('user clicks on search button', async function () {
  await page.click(StoreHomePage.selectors.searchButton);
}); 

When('user selects the option {int}', { timeout: 20000 }, async function ( option: number) {

  const productLinks = page.locator(StoreHomePage.selectors.productLinks);
  const count = await productLinks.count();

  if (count === 0){console.log('No products found...'); return;}
  
  if (option <=0 || option > count){
    console.log('Invalid option, selecting the last available product.');
    option = count;
  }

  const index = option - 1;
  await productLinks.nth(index).click();
});

When('user adds the product to the shopping cart',{ timeout: 50000 }, async function () {
  await page.waitForLoadState('load');
  await page.click(StoreHomePage.selectors.addToCartButton);
}); 

When('user clicks on the shopping cart button', async function () {
  await page.click(StoreHomePage.selectors.shoppingCartButton);
}); 

When('user clicks on the view shopping card button', async function () {
  await page.click(StoreHomePage.selectors.viewShoppingCartButton);
}); 

Then('{string} should be on column {string} in the shopping cart', async function ( expectedItem: string, column: string) {
  
  const table = page.locator(StoreHomePage.selectors.ShoppingCartProductTable);
  const headerCells = await table.locator('thead tr td').allTextContents();
  const productNameIndex = headerCells.findIndex(cellText => cellText.trim() === column);

  if (productNameIndex === -1) {
    throw new Error(column+' column not found');
  }

  const productNameInBody = await table.locator(`tbody tr td:nth-child(${productNameIndex + 1})`).textContent();

  if (!productNameInBody?.trim().includes(expectedItem)) {
    throw new Error(`Expected product name to be "${expectedItem}", but got "${productNameInBody}".`);
  }
});

When('user clicks on remove item from the shopping cart', async function () {
  await page.click(StoreHomePage.selectors.removeButton);
}); 

Then('shopping card should be empty', { timeout: 50000 }, async function () {
  await page.locator(StoreHomePage.selectors.contentText).waitFor({ state: 'visible' });
  const contentText = await page.locator(StoreHomePage.selectors.contentText).textContent();

  if(!contentText?.trim().includes("Your shopping cart is empty!")){
    throw new Error(`There are products on the shopping cart`);
  }
}); 